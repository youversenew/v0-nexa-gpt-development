import { GoogleGenerativeAI } from "@google/generative-ai"
import { Groq } from "groq-sdk"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt, images, useGroq = false } = await req.json()

    /* =========================
       GROQ (text only)
    ========================== */
    if (useGroq && (!images || images.length === 0)) {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemPrompt || "Sen NexaGPT – foydali va professional AI yordamchisan.",
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 4096,
        stream: true,
      })

      const encoder = new TextEncoder()

      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content
              if (content) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                )
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"))
            controller.close()
          } catch (e) {
            controller.error(e)
          }
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    }

    /* =========================
       GEMINI
    ========================== */
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt ||
        "Sen NexaGPT – foydali va professional AI yordamchisan. Markdown formatida yoz.",
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    })

    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))

    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    })

    const last = messages[messages.length - 1]

    let parts: any[] = [{ text: last.content }]

    if (images?.length) {
      parts = [
        { text: last.content },
        ...images.map((img: string) => {
          const base64 = img.split(",")[1] ?? img
          const mimeType =
            img.startsWith("data:image/png") ? "image/png" : "image/jpeg"

          return {
            inlineData: { data: base64, mimeType },
          }
        }),
      ]
    }

    const result = await chat.sendMessageStream(parts)

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text && text.trim()) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`)
              )
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        } catch (e) {
          controller.error(e)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Failed to generate response",
        details: error?.message || "Unknown error",
      }),
      { status: 500 }
    )
  }
}
