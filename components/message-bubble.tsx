"use client"

import type { Message } from "@/lib/types"
import { Bot, User, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "@/contexts/theme-context"
import { useState } from "react"

interface MessageBubbleProps {
  message: Message
  isStreaming?: boolean
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const { theme } = useTheme()
  const isUser = message.role === "user"
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className={cn("flex gap-4", isUser ? "justify-end" : "justify-start")}>
      {/* Avatar */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
          <Bot className="h-4 w-4" />
        </div>
      )}

      {/* Message Content */}
      <div className={cn("max-w-[85%] md:max-w-[75%]", isUser && "order-first")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser ? "bg-foreground text-background rounded-br-md" : "bg-muted text-foreground rounded-bl-md",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    const codeString = String(children).replace(/\n$/, "")
                    const codeId = `code-${Math.random()}`

                    if (!match) {
                      return (
                        <code className="rounded bg-background/50 px-1.5 py-0.5 font-mono text-xs" {...props}>
                          {children}
                        </code>
                      )
                    }

                    return (
                      <div className="my-3 overflow-hidden rounded-lg border border-border bg-background">
                        <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
                          <span className="text-xs font-medium text-muted-foreground">{match[1]}</span>
                          <button
                            onClick={() => copyToClipboard(codeString, codeId)}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {copied === codeId ? (
                              <>
                                <Check className="h-3 w-3" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <SyntaxHighlighter
                          style={theme === "dark" ? oneDark : oneLight}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            fontSize: "0.8rem",
                            background: "transparent",
                          }}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    )
                  },
                  p({ children }) {
                    return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
                  },
                  ul({ children }) {
                    return <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>
                  },
                  ol({ children }) {
                    return <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>
                  },
                  li({ children }) {
                    return <li className="leading-relaxed">{children}</li>
                  },
                  h1({ children }) {
                    return <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0">{children}</h1>
                  },
                  h2({ children }) {
                    return <h2 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h2>
                  },
                  h3({ children }) {
                    return <h3 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h3>
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className="border-l-4 border-muted-foreground/30 pl-4 my-3 italic text-muted-foreground">
                        {children}
                      </blockquote>
                    )
                  },
                  table({ children }) {
                    return (
                      <div className="my-3 overflow-x-auto">
                        <table className="min-w-full border border-border rounded-lg">{children}</table>
                      </div>
                    )
                  },
                  th({ children }) {
                    return <th className="border border-border bg-muted px-3 py-2 text-left font-medium">{children}</th>
                  },
                  td({ children }) {
                    return <td className="border border-border px-3 py-2">{children}</td>
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
              {isStreaming && (
                <span className="inline-block w-2 h-4 bg-foreground/70 animate-pulse ml-1 align-middle" />
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className={cn("mt-1 text-xs text-muted-foreground", isUser && "text-right")}>
          {new Date(message.created_at).toLocaleTimeString("uz-UZ", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
