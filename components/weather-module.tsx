"use client"

import { useState } from "react"
import { Bot, ChevronLeft, ChevronRight, Wind, Cloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface WeatherData {
  temperature: number
  condition: string
  location: string
  wind_speed: number
  date: string
}

interface WeatherModuleProps {
  onGetWeather: (date: Date, location?: string) => void
}

export function WeatherModule({ onGetWeather }: WeatherModuleProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [weatherData] = useState<WeatherData>({
    temperature: 21,
    condition: "Partly Cloudy",
    location: "Uzbekistan, Guzar",
    wind_speed: 18.12,
    date: new Date().toISOString(),
  })

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["SUN", "MON", "WED", "THU", "FRI", "SAT", "SUN"]

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(newDate)
    onGetWeather(newDate)
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* AI Welcome Message */}
      <div className="flex items-start gap-3 max-w-2xl w-full">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
          <Bot className="h-4 w-4" />
        </div>
        <p className="text-sm">Salom, men Weather AI man sizga men ob havo boyicha yordam beraman.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="rounded-full border border-border px-6 py-2 text-sm font-medium transition-colors hover:bg-muted">
          Get information
        </button>
        <button className="rounded-full border border-border px-6 py-2 text-sm font-medium transition-colors hover:bg-muted">
          More informations
        </button>
      </div>

      {/* Date & Time Display */}
      <div className="flex gap-3">
        <span className="rounded-full bg-muted px-4 py-2 text-sm">
          {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <span className="rounded-full bg-muted px-4 py-2 text-sm">
          {selectedDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
        </span>
      </div>

      {/* Calendar and Weather Card */}
      <div className="flex gap-0 rounded-2xl border border-border overflow-hidden max-w-3xl w-full">
        {/* Calendar */}
        <div className="bg-background p-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-blue-600">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()} {">"}
            </span>
            <div className="flex gap-1">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-muted rounded">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={handleNextMonth} className="p-1 hover:bg-muted rounded">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-2">
            {dayNames.map((day, i) => (
              <div key={i} className="text-center py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const isSelected =
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth.getMonth() &&
                selectedDate.getFullYear() === currentMonth.getFullYear()

              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={cn(
                    "h-8 w-8 rounded-full text-sm transition-colors",
                    isSelected ? "bg-blue-600 text-white" : "hover:bg-muted",
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Time</span>
            <span className="text-sm bg-muted px-3 py-1 rounded">9:41 AM</span>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-gradient-to-b from-blue-800 to-blue-900 text-white p-8 flex flex-col items-center justify-center min-w-[280px]">
          <div className="relative mb-4">
            <div className="h-20 w-20 rounded-full bg-yellow-400 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-yellow-300" />
            </div>
            <Cloud className="absolute -bottom-2 -right-4 h-12 w-12 text-white/90" />
          </div>

          <div className="text-6xl font-light mb-2">{weatherData.temperature}°C</div>

          <div className="text-lg mb-6">{weatherData.location}</div>

          <div className="flex items-center gap-2 text-sm">
            <Wind className="h-5 w-5" />
            <span className="text-xl font-semibold">{weatherData.wind_speed}</span>
            <span className="text-xs text-white/70">Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
