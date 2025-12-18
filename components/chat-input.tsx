"use client"

import type React from "react"
import { useState, useRef, type FormEvent } from "react"
import { useChat } from "@/contexts/chat-context"
import { useLanguage } from "@/contexts/language-context"
import { Mic, ImageIcon, Send, Square, Loader2, Upload, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpeechRecognitionResult {
  transcript: string
  confidence: number
}

interface SpeechRecognitionResultList {
  [index: number]: { [index: number]: SpeechRecognitionResult }
  length: number
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionInstance {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: Event) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognitionInstance
    SpeechRecognition: new () => SpeechRecognitionInstance
  }
}

export function ChatInput() {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  const { sendMessage, isStreaming, activeModule, modules } = useChat()
  const { t } = useLanguage()
  const currentModule = modules.find((m) => m.slug === activeModule)

  const layoutActions = currentModule?.layout?.actions || []
  const hasUpload = layoutActions.some((a: any) => a.type === "upload")
  const hasCamera = layoutActions.some((a: any) => a.type === "camera")

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    if ((!message.trim() && selectedImages.length === 0) || isStreaming) return

    const content = message.trim() || "Bu rasmni tahlil qiling"
    await sendMessage(content, selectedImages.length > 0 ? selectedImages : undefined)
    setMessage("")
    setSelectedImages([])

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    // Auto-resize
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleCameraInput = () => {
    cameraInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const base64 = event.target?.result as string
          setSelectedImages((prev) => [...prev, base64])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleVoiceInput = () => {
    if (typeof window === "undefined") return

    const hasSpeechRecognition = "webkitSpeechRecognition" in window || "SpeechRecognition" in window
    if (!hasSpeechRecognition) {
      alert("Voice input is not supported in this browser")
      return
    }

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      return
    }

    const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognitionAPI()
    recognitionRef.current = recognition

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "uz-UZ"

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = ""
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setMessage(transcript)
    }

    recognition.onerror = () => {
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
    setIsRecording(true)
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-4 pb-4">
      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {selectedImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img || "/placeholder.svg"}
                alt="Selected"
                className="h-16 w-16 object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2 rounded-2xl border border-input bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring/20">
        {/* Voice Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
            isRecording ? "bg-red-500 text-white animate-pulse" : "hover:bg-muted",
          )}
          title="Voice input"
        >
          {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-5 w-5 text-muted-foreground" />}
        </button>

        {hasUpload && (
          <button
            type="button"
            onClick={handleImageUpload}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-muted"
            title="Upload photo"
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
          </button>
        )}

        {hasCamera && (
          <button
            type="button"
            onClick={handleCameraInput}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-muted"
            title="Take photo"
          >
            <Camera className="h-5 w-5 text-muted-foreground" />
          </button>
        )}

        {!hasUpload && !hasCamera && (
          <button
            type="button"
            onClick={handleImageUpload}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-muted"
            title="Upload image"
          >
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={`${currentModule?.name || "NexaGPT"}ga ${t("typeMessage")}`}
          disabled={isStreaming}
          rows={1}
          className="flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 max-h-[200px]"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={(!message.trim() && selectedImages.length === 0) || isStreaming}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
            message.trim() || selectedImages.length > 0
              ? "bg-foreground text-background hover:opacity-90"
              : "text-muted-foreground",
            isStreaming && "opacity-50",
          )}
        >
          {isStreaming ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </button>
      </div>
    </form>
  )
}
