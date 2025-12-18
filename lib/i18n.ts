export const translations = {
  uz: {
    // Common
    newChat: "Yangi suhbat",
    search: "Qidirish",
    settings: "Sozlamalar",
    account: "Mening hisobim",
    logout: "Chiqish",
    darkMode: "Qorong'i rejim",
    lightMode: "Yorug' rejim",
    recent: "So'nggi suhbatlar",
    moreModules: "Ko'proq modullar",

    // Auth
    login: "Kirish",
    signup: "Ro'yxatdan o'tish",
    email: "Email",
    password: "Parol",
    fullName: "To'liq ism",

    // Chat
    typeMessage: "Xabar yozing...",
    sending: "Yuborilmoqda...",
    thinking: "O'ylayapman...",

    // Actions
    rename: "Nomini o'zgartirish",
    delete: "O'chirish",
    clearAll: "Hammasini tozalash",
    cancel: "Bekor qilish",
    save: "Saqlash",
    confirm: "Tasdiqlash",

    // Warnings
    deleteWarning: "Bu suhbatni o'chirishni xohlaysizmi?",
    clearAllWarning: "Barcha suhbatlarni o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.",

    // Modules
    nexagpt: "NexaGPT",
    agroAi: "AgroAi",
    coderAi: "CoderAi",
    weatherAi: "WeatherAi",
    healthAi: "HealthAi",

    // Welcome
    examples: "Misollar",
    capabilities: "Imkoniyatlar",
    limitations: "Cheklovlar",
  },
  en: {
    // Common
    newChat: "New chat",
    search: "Search",
    settings: "Settings",
    account: "My account",
    logout: "Log out",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    recent: "Recent",
    moreModules: "More modules",

    // Auth
    login: "Login",
    signup: "Sign up",
    email: "Email",
    password: "Password",
    fullName: "Full name",

    // Chat
    typeMessage: "Type a message...",
    sending: "Sending...",
    thinking: "Thinking...",

    // Actions
    rename: "Rename",
    delete: "Delete",
    clearAll: "Clear all",
    cancel: "Cancel",
    save: "Save",
    confirm: "Confirm",

    // Warnings
    deleteWarning: "Are you sure you want to delete this conversation?",
    clearAllWarning: "Are you sure you want to clear all conversations? This action cannot be undone.",

    // Modules
    nexagpt: "NexaGPT",
    agroAi: "AgroAi",
    coderAi: "CoderAi",
    weatherAi: "WeatherAi",
    healthAi: "HealthAi",

    // Welcome
    examples: "Examples",
    capabilities: "Capabilities",
    limitations: "Limitations",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.uz
