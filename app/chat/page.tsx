"use client"

import { ChatProvider } from "@/contexts/chat-context"
import { Sidebar } from "@/components/sidebar"
import { ChatArea } from "@/components/chat-area"
import { SearchModal } from "@/components/search-modal"
import { SettingsModal } from "@/components/settings-modal"
import { AccountModal } from "@/components/account-modal"
import { useState, useEffect } from "react"

export default function ChatPage() {
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === "Escape") {
        setShowSearch(false)
        setShowSettings(false)
        setShowAccount(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <ChatProvider>
      <div className="flex h-[100dvh] overflow-hidden bg-background">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onOpenSearch={() => setShowSearch(true)}
          onOpenSettings={() => setShowSettings(true)}
          onOpenAccount={() => setShowAccount(true)}
        />
        <main className="flex flex-1 flex-col overflow-hidden">
          <ChatArea onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        </main>

        <SearchModal open={showSearch} onClose={() => setShowSearch(false)} />
        <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
        <AccountModal open={showAccount} onClose={() => setShowAccount(false)} />
      </div>
    </ChatProvider>
  )
}
