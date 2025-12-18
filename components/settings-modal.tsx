"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { useChat } from "@/contexts/chat-context"
import { X, Sun, Moon, Monitor, Trash2, AlertTriangle, Bell, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsModalProps {
  open: boolean
  onClose: () => void
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme()
  const { settings, updateSettings } = useAuth()
  const { clearAllConversations, conversations } = useChat()
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  const handleClearConversations = async () => {
    setIsClearing(true)
    await clearAllConversations()
    setIsClearing(false)
    setShowClearConfirm(false)
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    updateSettings({ theme: newTheme })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Sozlamalar</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Mavzu</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleThemeChange("light")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                  theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground",
                )}
              >
                <Sun className="h-6 w-6" />
                <span className="text-sm">Yorug'</span>
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                  theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground",
                )}
              >
                <Moon className="h-6 w-6" />
                <span className="text-sm">Qorong'i</span>
              </button>
              <button
                onClick={() => handleThemeChange("system")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                  theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground",
                )}
              >
                <Monitor className="h-6 w-6" />
                <span className="text-sm">Tizim</span>
              </button>
            </div>
          </div>

          {/* Voice Settings */}
          <div>
            <h3 className="text-sm font-medium mb-3">Ovoz sozlamalari</h3>
            <label className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <span>Ovozli kiritish</span>
              </div>
              <input
                type="checkbox"
                checked={settings?.voice_enabled ?? true}
                onChange={(e) => updateSettings({ voice_enabled: e.target.checked })}
                className="h-5 w-5 rounded border-border"
              />
            </label>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-sm font-medium mb-3">Bildirishnomalar</h3>
            <label className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span>Bildirishnomalar</span>
              </div>
              <input
                type="checkbox"
                checked={settings?.notifications_enabled ?? true}
                onChange={(e) => updateSettings({ notifications_enabled: e.target.checked })}
                className="h-5 w-5 rounded border-border"
              />
            </label>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-destructive">Xavfli zona</h3>
            {!showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                disabled={conversations.length === 0}
                className="flex w-full items-center justify-between rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Barcha suhbatlarni o'chirish</p>
                    <p className="text-xs text-destructive/70">{conversations.length} ta suhbat</p>
                  </div>
                </div>
              </button>
            ) : (
              <div className="rounded-xl border border-destructive bg-destructive/10 p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Ishonchingiz komilmi?</p>
                    <p className="text-sm text-destructive/70">
                      Bu amalni qaytarib bo'lmaydi. Barcha suhbatlar o'chiriladi.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={handleClearConversations}
                    disabled={isClearing}
                    className="flex-1 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
                  >
                    {isClearing ? "O'chirilmoqda..." : "O'chirish"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
