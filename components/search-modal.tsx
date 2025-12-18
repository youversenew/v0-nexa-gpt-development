"use client"

import { useState, useEffect, useRef } from "react"
import { useChat } from "@/contexts/chat-context"
import { Search, MessageSquare, X, Clock, ArrowRight, Leaf, Code, Cloud, Heart, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import type React from "react"

const iconMap: Record<string, React.ElementType> = {
  bot: Bot,
  leaf: Leaf,
  code: Code,
  cloud: Cloud,
  heart: Heart,
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const { conversations, modules, selectConversation, createNewConversation } = useChat()

  useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const filteredConversations = conversations.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))

  const filteredModules = modules.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) || m.description?.toLowerCase().includes(query.toLowerCase()),
  )

  const allResults = [
    ...filteredModules.map((m) => ({ type: "module" as const, data: m })),
    ...filteredConversations.map((c) => ({ type: "conversation" as const, data: c })),
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, allResults.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && allResults[selectedIndex]) {
      e.preventDefault()
      handleSelect(allResults[selectedIndex])
    }
  }

  const handleSelect = (result: (typeof allResults)[0]) => {
    if (result.type === "module") {
      createNewConversation(result.data.slug as "nexagpt" | "agro" | "code" | "weather" | "health")
    } else {
      selectConversation(result.data.id)
    }
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal - macOS Finder Style */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Qidirish..."
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded bg-muted px-2 py-1 text-xs text-muted-foreground sm:inline">ESC</kbd>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted sm:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {/* Modules Section */}
          {filteredModules.length > 0 && (
            <div className="mb-2">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground">Modullar</p>
              {filteredModules.map((module, index) => {
                const Icon = iconMap[module.icon] || Bot
                const resultIndex = index
                return (
                  <button
                    key={module.id}
                    onClick={() => handleSelect({ type: "module", data: module })}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      selectedIndex === resultIndex ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: module.theme_color }}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{module.name}</p>
                      <p
                        className={cn(
                          "text-xs truncate",
                          selectedIndex === resultIndex ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      >
                        {module.description}
                      </p>
                    </div>
                    <ArrowRight
                      className={cn("h-4 w-4", selectedIndex === resultIndex ? "opacity-100" : "opacity-0")}
                    />
                  </button>
                )
              })}
            </div>
          )}

          {/* Conversations Section */}
          {filteredConversations.length > 0 && (
            <div>
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground">Suhbatlar</p>
              {filteredConversations.slice(0, 10).map((conversation, index) => {
                const resultIndex = filteredModules.length + index
                return (
                  <button
                    key={conversation.id}
                    onClick={() => handleSelect({ type: "conversation", data: conversation })}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      selectedIndex === resultIndex ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{conversation.title}</p>
                      <p
                        className={cn(
                          "text-xs flex items-center gap-1",
                          selectedIndex === resultIndex ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      >
                        <Clock className="h-3 w-3" />
                        {new Date(conversation.updated_at).toLocaleDateString("uz-UZ")}
                      </p>
                    </div>
                    <ArrowRight
                      className={cn("h-4 w-4", selectedIndex === resultIndex ? "opacity-100" : "opacity-0")}
                    />
                  </button>
                )
              })}
            </div>
          )}

          {/* Empty State */}
          {query && allResults.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>Hech narsa topilmadi</p>
            </div>
          )}

          {/* Initial State */}
          {!query && allResults.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <p>Modul yoki suhbat qidiring</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted px-1.5 py-0.5">↑</kbd>
              <kbd className="rounded bg-muted px-1.5 py-0.5">↓</kbd>
              navigatsiya
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted px-1.5 py-0.5">↵</kbd>
              tanlash
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
