"use client"

import { useChat } from "@/contexts/chat-context"
import type { Module } from "@/lib/types"
import { MessageSquare, Sparkles, AlertCircle } from "lucide-react"

const examples = [
  '"Explain quantum computing in simple terms"',
  '"Got any creative ideas for a 10 year old\'s birthday?"',
  '"How do I make an HTTP request in Javascript?"',
]

const capabilities = [
  "Remembers what user said earlier in the conversation.",
  "Allows user to provide follow-up corrections.",
  "Trained to decline inappropriate requests.",
]

const limitations = [
  "May occasionally generate incorrect information.",
  "May occasionally produce harmful instructions or biased content.",
  "Limited knowledge of world and events after 2021.",
]

interface WelcomeScreenProps {
  module?: Module
}

export function WelcomeScreen({ module }: WelcomeScreenProps) {
  const { sendMessage } = useChat()

  const handleExampleClick = (example: string) => {
    const cleanExample = example.replace(/^"|"$/g, "")
    sendMessage(cleanExample)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 min-h-[calc(100vh-180px)]">
      <h1 className="mb-8 text-4xl font-bold text-balance text-center">{module?.name || "NexaGPT"}</h1>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">
        {/* Examples */}
        <div className="space-y-3">
          <div className="flex flex-col items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <h2 className="font-semibold">Examples</h2>
          </div>
          <div className="space-y-2">
            {examples.map((example, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(example)}
                className="w-full rounded-lg bg-muted px-4 py-3 text-left text-sm transition-colors hover:bg-muted/80"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="space-y-3">
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <h2 className="font-semibold">Capabilities</h2>
          </div>
          <div className="space-y-2">
            {capabilities.map((capability, i) => (
              <div key={i} className="rounded-lg bg-muted px-4 py-3 text-sm">
                {capability}
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div className="space-y-3">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            <h2 className="font-semibold">Limitations</h2>
          </div>
          <div className="space-y-2">
            {limitations.map((limitation, i) => (
              <div key={i} className="rounded-lg bg-muted px-4 py-3 text-sm">
                {limitation}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
