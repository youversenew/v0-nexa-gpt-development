import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { image, prompt, module } = await req.json()

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" })

    // Convert base64 image to proper format
    const imageData = image.replace(/^data:image\/\w+;base64,/, "")

    let contextPrompt = prompt || "Describe this image in detail."

    if (module === "agro") {
      contextPrompt = `As an agricultural expert, analyze this plant/crop image. Identify the plant, any diseases or issues, and provide recommendations for care and treatment. ${prompt || ""}`
    } else if (module === "health") {
      contextPrompt = `Analyze this health-related image. Provide general observations but remind the user to consult healthcare professionals for medical advice. ${prompt || ""}`
    }

    const result = await model.generateContent([
      contextPrompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData,
        },
      },
    ])

    const response = await result.response
    const text = response.text()

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Vision API error:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}
