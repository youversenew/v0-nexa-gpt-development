"use client"

import { useRef, useEffect } from "react"
import { useChat } from "@/contexts/chat-context"
import { WelcomeScreen } from "./welcome-screen"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import { ModuleTabs } from "./module-tabs"
import { Menu } from "lucide-react"

interface ChatAreaProps {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

export function ChatArea({ onToggleSidebar, sidebarOpen }: ChatAreaProps) {
  const { messages, isStreaming, activeModule, modules } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentModule = modules.find((m) => m.slug === activeModule)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-full flex-col">
      {/* Header with Tabs */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 py-3">
        <button onClick={onToggleSidebar} className="rounded-lg p-2 hover:bg-muted lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1 flex justify-center">
          <ModuleTabs />
        </div>
        <div className="w-10 lg:hidden" />
      </header>

      {/* Chat Area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <WelcomeScreen module={currentModule} />
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id || index}
                  message={message}
                  isStreaming={isStreaming && index === messages.length - 1 && message.role === "assistant"}
                />
              ))}
            </div>
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="sticky bottom-0 border-t border-border bg-background p-4">
        <ChatInput />
      </div>
    </div>
  )
}
