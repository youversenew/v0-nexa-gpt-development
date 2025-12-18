import { createGroq } from "@ai-sdk/groq"
import { NextResponse } from "next/server"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Convert to buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer())

    // Use Groq's Whisper API
    const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: (() => {
        const form = new FormData()
        form.append("file", new Blob([buffer], { type: audioFile.type }), "audio.webm")
        form.append("model", "whisper-large-v3-turbo")
        return form
      })(),
    })

    const data = await response.json()

    return NextResponse.json({ text: data.text })
  } catch (error) {
    console.error("Transcription error:", error)
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 })
  }
}
