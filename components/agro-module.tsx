"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Camera, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface AgroModuleProps {
  onAnalyze: (type: "info" | "disease", imageUrl?: string) => void
}

export function AgroModule({ onAnalyze }: AgroModuleProps) {
  const [activeTab, setActiveTab] = useState<"info" | "disease">("info")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onAnalyze(activeTab, url)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* AI Welcome Message */}
      <div className="flex items-start gap-3 max-w-2xl">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
          <Bot className="h-4 w-4" />
        </div>
        <p className="text-sm">Salom, men Agro AI man sizga men agro boyicha yordam beraman.</p>
      </div>

      {/* Action Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("info")}
          className={cn(
            "rounded-full border px-6 py-2 text-sm font-medium transition-colors",
            activeTab === "info" ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted",
          )}
        >
          Get information
        </button>
        <button
          onClick={() => setActiveTab("disease")}
          className={cn(
            "rounded-full border px-6 py-2 text-sm font-medium transition-colors",
            activeTab === "disease"
              ? "border-foreground bg-foreground text-background"
              : "border-border hover:bg-muted",
          )}
        >
          Disease detector
        </button>
      </div>

      {/* Upload Area */}
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-gradient-to-r from-green-50 to-purple-50 dark:from-green-950/20 dark:to-purple-950/20 p-1">
        <div className="grid grid-cols-2 divide-x divide-border">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 p-12 transition-colors hover:bg-muted/50 rounded-l-xl">
            <Upload className="h-8 w-8" />
            <span className="text-sm font-medium">Upload photo of product or something</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 p-12 transition-colors hover:bg-muted/50 rounded-r-xl">
            <Camera className="h-8 w-8" />
            <span className="text-sm font-medium">Take photo of product or something</span>
            <input type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}
