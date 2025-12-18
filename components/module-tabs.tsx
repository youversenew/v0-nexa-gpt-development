"use client"

import { useChat } from "@/contexts/chat-context"
import { cn } from "@/lib/utils"
import { LayoutGrid, Search, Leaf, Code, Cloud, Heart, Bot } from "lucide-react"
import type React from "react"

type ModuleSlug = "nexagpt" | "agro" | "code" | "weather" | "health"

const iconMap: Record<string, React.ElementType> = {
  bot: Bot,
  leaf: Leaf,
  code: Code,
  cloud: Cloud,
  heart: Heart,
}

const tabOrder: ModuleSlug[] = ["nexagpt", "code", "agro", "health", "weather"]

export function ModuleTabs() {
  const { activeModule, setActiveModule, createNewConversation, modules } = useChat()

  const handleTabClick = (slug: ModuleSlug) => {
    if (slug !== activeModule) {
      setActiveModule(slug)
      createNewConversation(slug)
    }
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-muted p-1 overflow-x-auto max-w-full">
      {tabOrder.map((slug) => {
        const module = modules.find((m) => m.slug === slug)
        if (!module) return null

        const Icon = iconMap[module.icon] || Bot
        const isActive = activeModule === slug

        return (
          <button
            key={slug}
            onClick={() => handleTabClick(slug)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap",
              isActive
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
            )}
          >
            {slug === "nexagpt" ? (
              <LayoutGrid className="h-4 w-4" />
            ) : (
              <Icon className="h-4 w-4" style={{ color: isActive ? module.theme_color : undefined }} />
            )}
            <span className="hidden sm:inline">{module.name.replace("AI", "").trim()}</span>
          </button>
        )
      })}

      <button className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-background/50 text-muted-foreground">
        <Search className="h-4 w-4" />
      </button>
    </div>
  )
}
