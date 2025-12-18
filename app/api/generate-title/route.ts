import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { content } = await req.json()

    // Xavfsizlik sozlamalari (Safety Settings) qo'shildi, 
    // aks holda model oddiy matnlarni ham bloklashi mumkin.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    })

    // Agar content bo'sh bo'lsa, xatolik chiqmasligi uchun tekshiruv
    const safeContent = content ? content.slice(0, 200) : "New Conversation"

    const prompt = `Generate a short, concise title (max 40 characters) for this conversation. Only return the title, nothing else:\n\n${safeContent}`

    const result = await model.generateContent(prompt)
    const title = result.response.text().trim().replace(/['"]/g, "").slice(0, 50)

    return new Response(JSON.stringify({ title }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("[v0] Title generation error:", error)
    
    // Fallback title (Xatolik bo'lsa qaytadigan nom)
    const fallbackTitle = "New Chat"
    
    return new Response(JSON.stringify({ title: fallbackTitle }), {
      headers: { "Content-Type": "application/json" },
    })
  }
}
