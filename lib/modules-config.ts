import { Leaf, Code, Cloud, Heart, Bot, ShoppingBag, BarChart3, User } from "lucide-react"

export const moduleConfigs = {
  nexagpt: {
    name: "NexaGPT",
    icon: Bot,
    color: "#1a1a1a",
    gradient: "from-gray-900 to-gray-700",
    description: "General AI Assistant",
    welcomeMessage: "Hello! I am NexaGPT, your AI assistant. How can I help you today?",
  },
  agro: {
    name: "AgroAI",
    icon: Leaf,
    color: "#22c55e",
    gradient: "from-green-600 to-emerald-500",
    description: "Agricultural Assistant",
    welcomeMessage: "Salom, men Agro AI man sizga men agro boyicha yordam beraman.",
    features: ["Get information", "Disease detector"],
  },
  code: {
    name: "CoderAI",
    icon: Code,
    color: "#3b82f6",
    gradient: "from-blue-600 to-indigo-500",
    description: "Programming Assistant",
    welcomeMessage: "Sure. Here is a Typescript code block for your project.",
  },
  weather: {
    name: "WeatherAI",
    icon: Cloud,
    color: "#0ea5e9",
    gradient: "from-sky-600 to-blue-500",
    description: "Weather Assistant",
    welcomeMessage: "Salom, men Weather AI man sizga men ob havo boyicha yordam beraman.",
    features: ["Get information", "More informations"],
  },
  health: {
    name: "HealthAI",
    icon: Heart,
    color: "#ef4444",
    gradient: "from-red-600 to-rose-500",
    description: "Health & Wellness",
    welcomeMessage: "Hello! I am HealthAI. I can help you with health and wellness questions.",
  },
  shop: {
    name: "Shop",
    icon: ShoppingBag,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-500",
    description: "Shopping Assistant",
  },
  statistics: {
    name: "Statistics",
    icon: BarChart3,
    color: "#8b5cf6",
    gradient: "from-violet-600 to-purple-500",
    description: "Analytics & Stats",
  },
  profile: {
    name: "Profile",
    icon: User,
    color: "#6b7280",
    gradient: "from-gray-600 to-gray-500",
    description: "Your Profile",
  },
} as const

export type ModuleSlug = keyof typeof moduleConfigs
