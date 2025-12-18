"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import type { Message, Conversation, Module } from "@/lib/types"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"

type ModuleSlug = "nexagpt" | "agro" | "code" | "weather" | "health"

interface ChatContextType {
  modules: Module[]
  conversations: Conversation[]
  currentConversation: Conversation | null
  messages: Message[]
  isLoading: boolean
  isStreaming: boolean
  activeModule: ModuleSlug
  setActiveModule: (module: ModuleSlug) => void
  sendMessage: (content: string, images?: string[]) => Promise<void>
  createNewConversation: (moduleSlug?: ModuleSlug) => Promise<void>
  selectConversation: (id: string) => Promise<void>
  deleteConversation: (id: string) => Promise<void>
  renameConversation: (id: string, title: string) => Promise<void>
  clearAllConversations: () => Promise<void>
  setIsLoading: (loading: boolean) => void
  goHome: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [modules, setModules] = useState<Module[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [activeModule, setActiveModule] = useState<ModuleSlug>("nexagpt")

  const { user } = useAuth()
  const supabase = getSupabaseBrowserClient()

  // Load modules from database
  useEffect(() => {
    const loadModules = async () => {
      const { data } = await supabase.from("modules").select("*").eq("is_active", true).order("sort_order")
      if (data) setModules(data)
    }
    loadModules()
  }, [supabase])

  // Load conversations
  useEffect(() => {
    if (!user) return
    const loadConversations = async () => {
      const { data } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
      if (data) setConversations(data)
    }
    loadConversations()
  }, [user, supabase])

  // Load messages for current conversation
  useEffect(() => {
    if (!currentConversation) {
      setMessages([])
      return
    }
    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", currentConversation.id)
        .order("created_at")
      if (data) setMessages(data)
    }
    loadMessages()
  }, [currentConversation, supabase])

  const goHome = useCallback(() => {
    setCurrentConversation(null)
    setMessages([])
  }, [])

  const createNewConversation = useCallback(
    async (moduleSlug?: ModuleSlug) => {
      const slug = moduleSlug || activeModule
      setActiveModule(slug)
      goHome()
    },
    [activeModule, goHome],
  )

  const selectConversation = useCallback(
    async (id: string) => {
      const conversation = conversations.find((c) => c.id === id)
      if (conversation) {
        setCurrentConversation(conversation)
        if (conversation.module_slug) {
          setActiveModule(conversation.module_slug as ModuleSlug)
        }
      }
    },
    [conversations],
  )

  const deleteConversation = useCallback(
    async (id: string) => {
      await supabase.from("conversations").delete().eq("id", id)
      setConversations((prev) => prev.filter((c) => c.id !== id))
      if (currentConversation?.id === id) {
        goHome()
      }
    },
    [currentConversation, supabase, goHome],
  )

  const renameConversation = useCallback(
    async (id: string, title: string) => {
      await supabase.from("conversations").update({ custom_title: title, title }).eq("id", id)
      setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title, custom_title: title } : c)))
      if (currentConversation?.id === id) {
        setCurrentConversation((prev) => (prev ? { ...prev, title, custom_title: title } : null))
      }
    },
    [currentConversation, supabase],
  )

  const clearAllConversations = useCallback(async () => {
    if (!user) return
    await supabase.from("conversations").delete().eq("user_id", user.id)
    setConversations([])
    goHome()
  }, [user, supabase, goHome])

  const sendMessage = useCallback(
    async (content: string, images?: string[]) => {
      if (!user) return

      let conversationId = currentConversation?.id

      if (!conversationId) {
        const { data } = await supabase
          .from("conversations")
          .insert({
            user_id: user.id,
            module_slug: activeModule,
            title: "New conversation",
          })
          .select()
          .single()

        if (data) {
          conversationId = data.id
          setConversations((prev) => [data, ...prev])
          setCurrentConversation(data)
        } else return
      }

      // Add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        conversation_id: conversationId,
        role: "user",
        content,
        metadata: images ? { images } : undefined,
        created_at: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMessage])

      // Save user message to database
      await supabase.from("messages").insert({
        conversation_id: conversationId,
        role: "user",
        content,
        metadata: images ? { images } : {},
      })

      if (messages.length === 0) {
        try {
          const titleResponse = await fetch("/api/generate-title", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
          })
          const { title } = await titleResponse.json()

          await supabase.from("conversations").update({ title }).eq("id", conversationId)

          setConversations((prev) => prev.map((c) => (c.id === conversationId ? { ...c, title } : c)))
          setCurrentConversation((prev) => (prev ? { ...prev, title } : null))
        } catch {
          // Fallback to truncated content
          const fallbackTitle = content.slice(0, 50) + (content.length > 50 ? "..." : "")
          await supabase.from("conversations").update({ title: fallbackTitle }).eq("id", conversationId)
        }
      }

      // Get AI response with streaming
      setIsStreaming(true)
      const currentModule = modules.find((m) => m.slug === activeModule)

      try {
        const useGroq = activeModule === "code"

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
            module: activeModule,
            systemPrompt: currentModule?.system_prompt,
            images,
            useGroq,
          }),
        })

        if (!response.ok) throw new Error("Failed to get response")

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          conversation_id: conversationId,
          role: "assistant",
          content: "",
          created_at: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, assistantMessage])

        let fullContent = ""

        while (reader) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") continue

              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  fullContent += parsed.content
                  setMessages((prev) =>
                    prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: fullContent } : m)),
                  )
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        // Save assistant message to database
        await supabase.from("messages").insert({
          conversation_id: conversationId,
          role: "assistant",
          content: fullContent,
        })
      } catch (error) {
        console.error("[v0] Chat error:", error)
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            conversation_id: conversationId!,
            role: "assistant",
            content: "Kechirasiz, xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.",
            created_at: new Date().toISOString(),
          },
        ])
      } finally {
        setIsStreaming(false)
      }
    },
    [user, currentConversation, activeModule, messages, modules, supabase],
  )

  return (
    <ChatContext.Provider
      value={{
        modules,
        conversations,
        currentConversation,
        messages,
        isLoading,
        isStreaming,
        activeModule,
        setActiveModule,
        sendMessage,
        createNewConversation,
        selectConversation,
        deleteConversation,
        renameConversation,
        clearAllConversations,
        setIsLoading,
        goHome,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
