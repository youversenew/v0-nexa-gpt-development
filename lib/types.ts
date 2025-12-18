export type ModuleSlug = "nexagpt" | "agro" | "code" | "weather" | "health" | "shop" | "statistics" | "profile"

export interface Module {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  theme_color: string
  gradient_from?: string
  gradient_to?: string
  system_prompt: string
  ai_model: string
  welcome_message?: string
  features?: string[]
  is_active: boolean
  sort_order?: number
}

export interface Conversation {
  id: string
  user_id: string
  module_slug: string | null
  title: string
  is_pinned?: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: "user" | "assistant" | "system"
  content: string
  metadata?: {
    images?: string[]
    code?: boolean
    weather?: WeatherData
  }
  created_at: string
}

export interface UserSettings {
  id: string
  user_id: string
  theme: "light" | "dark" | "system"
  language: string
  voice_enabled: boolean
  notifications_enabled?: boolean
}

export interface WeatherData {
  temperature: number
  condition: string
  location: string
  wind_speed: number
  humidity?: number
  date: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}
