"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useChat } from "@/contexts/chat-context"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import {
  Plus,
  Sun,
  Moon,
  User,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronDown,
  Settings,
  Search,
  MessageSquare,
  Trash2,
  Menu,
  X,
  Leaf,
  Code,
  Cloud,
  Heart,
  Bot,
  Edit2,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const iconMap: Record<string, React.ElementType> = {
  bot: Bot,
  leaf: Leaf,
  code: Code,
  cloud: Cloud,
  heart: Heart,
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  onOpenSearch: () => void
  onOpenSettings: () => void
  onOpenAccount: () => void
}

export function Sidebar({ isOpen, onToggle, onOpenSearch, onOpenSettings, onOpenAccount }: SidebarProps) {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const {
    modules,
    conversations,
    currentConversation,
    createNewConversation,
    selectConversation,
    deleteConversation,
    renameConversation,
  } = useChat()
  const { signOut, profile } = useAuth()
  const router = useRouter()
  const [moreModulesOpen, setMoreModulesOpen] = useState(false)
  const [hoveredConversation, setHoveredConversation] = useState<string | null>(null)
  const [editingConversation, setEditingConversation] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const mainModules = modules.slice(0, 3)
  const moreModules = modules.slice(3)

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  const handleNewChat = () => {
    createNewConversation()
  }

  const startRename = (id: string, currentTitle: string) => {
    setEditingConversation(id)
    setEditTitle(currentTitle)
  }

  const saveRename = async (id: string) => {
    if (editTitle.trim()) {
      await renameConversation(id, editTitle.trim())
    }
    setEditingConversation(null)
  }

  const confirmDelete = async (id: string) => {
    await deleteConversation(id)
    setDeleteConfirm(null)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 lg:hidden">
          <span className="font-semibold">NexaGPT</span>
          <button onClick={onToggle} className="rounded-lg p-2 hover:bg-sidebar-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8B7EC8] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7A6DB7]"
          >
            <Plus className="h-4 w-4" />
            {t("newChat")}
          </button>
        </div>

        {/* Module Shortcuts */}
        <div className="flex-1 overflow-y-auto px-3">
          {/* Main AI Modules */}
          <div className="space-y-1">
            {mainModules.map((module) => {
              const Icon = iconMap[module.icon] || Bot
              return (
                <button
                  key={module.slug}
                  onClick={() =>
                    createNewConversation(module.slug as "nexagpt" | "agro" | "code" | "weather" | "health")
                  }
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: module.theme_color }}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{module.name}</span>
                </button>
              )
            })}
          </div>

          {/* More Modules Dropdown */}
          {moreModules.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setMoreModulesOpen(!moreModulesOpen)}
                className="flex w-full items-center justify-between rounded-lg bg-sidebar-accent px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent/80"
              >
                <span>{t("moreModules")}</span>
                {moreModulesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>

              {moreModulesOpen && (
                <div className="mt-1 space-y-1 rounded-lg bg-sidebar-accent/50 p-2">
                  {moreModules.map((module) => (
                    <button
                      key={module.slug}
                      onClick={() =>
                        createNewConversation(module.slug as "nexagpt" | "agro" | "code" | "weather" | "health")
                      }
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{"{ }"}</span>
                        <span>{module.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Conversations List */}
          {conversations.length > 0 && (
            <div className="mt-4 space-y-1">
              <p className="px-3 text-xs font-medium text-muted-foreground">{t("recent")}</p>
              {conversations.slice(0, 15).map((conversation) => (
                <div
                  key={conversation.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredConversation(conversation.id)}
                  onMouseLeave={() => setHoveredConversation(null)}
                >
                  {editingConversation === conversation.id ? (
                    <div className="flex items-center gap-1 px-2 py-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveRename(conversation.id)
                          if (e.key === "Escape") setEditingConversation(null)
                        }}
                        onBlur={() => saveRename(conversation.id)}
                        className="flex-1 rounded bg-sidebar-accent px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => selectConversation(conversation.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-left transition-colors hover:bg-sidebar-accent",
                        currentConversation?.id === conversation.id && "bg-sidebar-accent",
                      )}
                    >
                      <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate flex-1">{conversation.custom_title || conversation.title}</span>
                    </button>
                  )}

                  {hoveredConversation === conversation.id && editingConversation !== conversation.id && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          startRename(conversation.id, conversation.custom_title || conversation.title)
                        }}
                        className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        title={t("rename")}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteConfirm(conversation.id)
                        }}
                        className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        title={t("delete")}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          <button
            onClick={onOpenSearch}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">{t("search")}</span>
            <kbd className="hidden rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground sm:inline">⌘K</kbd>
          </button>

          <button
            onClick={() => setLanguage(language === "uz" ? "en" : "uz")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
          >
            <Globe className="h-4 w-4" />
            <span className="flex-1 text-left">{language === "uz" ? "O'zbekcha" : "English"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
          >
            {theme === "light" ? (
              <>
                <Moon className="h-4 w-4" />
                {t("darkMode")}
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                {t("lightMode")}
              </>
            )}
          </button>

          <button
            onClick={onOpenAccount}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
          >
            <User className="h-4 w-4" />
            <span className="flex-1 text-left truncate">{profile?.full_name || t("account")}</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent"
          >
            <Settings className="h-4 w-4" />
            {t("settings")}
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent">
            <HelpCircle className="h-4 w-4" />
            Updates & FAQ
          </button>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent text-destructive"
          >
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      {!isOpen && (
        <button onClick={onToggle} className="fixed left-4 top-4 z-30 rounded-lg bg-background p-2 shadow-md lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg p-6 max-w-sm mx-4 shadow-xl border border-border">
            <h3 className="font-semibold mb-2">{t("delete")}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t("deleteWarning")}</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={() => confirmDelete(deleteConfirm)}
                className="px-4 py-2 text-sm rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
