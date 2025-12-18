"use client"

import { Bot } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "@/contexts/theme-context"

interface CodeModuleProps {
  code?: string
  language?: string
}

const defaultCode = `import React, { useState, useEffect } from "react";
import { defineProperties } from "figma:react";

export default function AnalogClock({
  updateInterval = 1000,
  secondHandColor = "red",
  minuteHandColor = "black",
  hourHandColor = "black",
}) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateClock = () => {
      // Get London's local time using en-GB format
      const londonTimeString = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
        hour12: false
      });
      const [hoursStr, minutesStr, secondsStr] = londonTimeString.split(":");
      setTime({
        hours: parseInt(hoursStr, 10),
        minutes: parseInt(minutesStr, 10),
        seconds: parseInt(secondsStr, 10),
      });
    };

    updateClock();
    const timerId = setInterval(updateClock, updateInterval);
    return () => clearInterval(timerId);
  }, [updateInterval]);`

export function CodeModule({ code = defaultCode, language = "typescript" }: CodeModuleProps) {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col gap-4 py-8 max-w-3xl mx-auto">
      {/* AI Response */}
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
          <Bot className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm mb-4">
            Sure. Here is a Typescript code block for your Analog Clock project. It is built using React, and uses the
            local time for London, England as standard. Let me know if you would like to make any refinements to the
            code.
          </p>

          <div className="rounded-lg border border-border overflow-hidden">
            <div className="bg-muted px-4 py-2 text-xs text-muted-foreground border-b border-border flex items-center gap-2">
              <span className="font-mono">{language}</span>
            </div>
            <SyntaxHighlighter
              style={theme === "dark" ? oneDark : oneLight}
              language={language}
              showLineNumbers
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: "0.875rem",
              }}
              lineNumberStyle={{
                minWidth: "2.5em",
                paddingRight: "1em",
                color: theme === "dark" ? "#666" : "#999",
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  )
}
