(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/contexts/theme-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    _s();
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setMounted(true);
            const savedTheme = localStorage.getItem("nexagpt-theme");
            if (savedTheme) {
                setThemeState(savedTheme);
                document.documentElement.classList.toggle("dark", savedTheme === "dark");
            } else {
                // Check system preference
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const systemTheme = prefersDark ? "dark" : "light";
                setThemeState(systemTheme);
                document.documentElement.classList.toggle("dark", systemTheme === "dark");
            }
        }
    }["ThemeProvider.useEffect"], []);
    const setTheme = (newTheme)=>{
        setThemeState(newTheme);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem("nexagpt-theme", newTheme);
            document.documentElement.classList.toggle("dark", newTheme === "dark");
        }
    };
    const toggleTheme = ()=>{
        setTheme(theme === "light" ? "dark" : "light");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme,
            setTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/theme-context.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, this);
}
_s(ThemeProvider, "DsRJlCeFz4SDfytL//p9Tn9a9gc=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/supabase/client.ts
__turbopack_context__.s([
    "getSupabaseBrowserClient",
    ()=>getSupabaseBrowserClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
let browserClient;
function getSupabaseBrowserClient() {
    if (browserClient) {
        return browserClient;
    }
    const supabaseUrl = ("TURBOPACK compile-time value", "https://hypweqpfjppkszjvoywt.supabase.co");
    const supabaseKey = ("TURBOPACK compile-time value", "sb_publishable_o6tiU8SKYXbxJ6mJ7ikmHg_3Dmj7TDg");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    browserClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseKey);
    return browserClient;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Clientni bir marta olamiz
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[supabase]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])()
    }["AuthProvider.useMemo[supabase]"], []);
    // Ma'lumotlarni yuklash uchun yordamchi funksiya
    const fetchUserData = async (userId)=>{
        try {
            const [profileRes, settingsRes] = await Promise.all([
                supabase.from("profiles").select("*").eq("id", userId).single(),
                supabase.from("user_settings").select("*").eq("user_id", userId).single()
            ]);
            if (profileRes.data) setProfile(profileRes.data);
            if (settingsRes.data) setSettings(settingsRes.data);
        } catch (error) {
            console.error("User data fetch error:", error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            let mounted = true;
            const initializeAuth = {
                "AuthProvider.useEffect.initializeAuth": async ()=>{
                    try {
                        // Enforce max loading time of 5 seconds
                        const timeoutPromise = new Promise({
                            "AuthProvider.useEffect.initializeAuth": (_, reject)=>setTimeout({
                                    "AuthProvider.useEffect.initializeAuth": ()=>reject(new Error("Auth timeout"))
                                }["AuthProvider.useEffect.initializeAuth"], 5000)
                        }["AuthProvider.useEffect.initializeAuth"]);
                        // 1. Check current session
                        const authPromise = {
                            "AuthProvider.useEffect.initializeAuth.authPromise": async ()=>{
                                const { data: { user: currentUser } } = await supabase.auth.getUser();
                                if (mounted) {
                                    setUser(currentUser);
                                    if (currentUser) {
                                        await fetchUserData(currentUser.id);
                                    }
                                }
                            }
                        }["AuthProvider.useEffect.initializeAuth.authPromise"];
                        await Promise.race([
                            authPromise(),
                            timeoutPromise
                        ]);
                    } catch (error) {
                        console.error("Auth initialization error:", error);
                    } finally{
                        if (mounted) setIsLoading(false);
                    }
                }
            }["AuthProvider.useEffect.initializeAuth"];
            initializeAuth();
            // 2. Auth o'zgarishlarini tinglaymiz
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "AuthProvider.useEffect": async (event, session)=>{
                    if (!mounted) return;
                    const currentUser = session?.user ?? null;
                    setUser(currentUser);
                    if (currentUser) {
                        // Faqat user o'zgarganda qayta yuklash
                        if (user?.id !== currentUser.id) {
                            await fetchUserData(currentUser.id);
                        }
                    } else {
                        setProfile(null);
                        setSettings(null);
                        setIsLoading(false); // Logout bo'lganda loadingni o'chirish
                    }
                }
            }["AuthProvider.useEffect"]);
            return ({
                "AuthProvider.useEffect": ()=>{
                    mounted = false;
                    subscription.unsubscribe();
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        supabase
    ]); // `user` dependency olib tashlandi, loop bo'lmasligi uchun
    const signIn = async (email, password)=>{
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return {
            error: error?.message || null
        };
    };
    const signUp = async (email, password, fullName)=>{
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                },
                emailRedirectTo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin
            }
        });
        return {
            error: error?.message || null
        };
    };
    const signOut = async ()=>{
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        setSettings(null);
    };
    const updateProfile = async (data)=>{
        if (!user) return;
        const { data: updated } = await supabase.from("profiles").update(data).eq("id", user.id).select().single();
        if (updated) setProfile(updated);
    };
    const updateSettings = async (data)=>{
        if (!user) return;
        const { data: updated } = await supabase.from("user_settings").update(data).eq("user_id", user.id).select().single();
        if (updated) setSettings(updated);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            profile,
            settings,
            isLoading,
            signIn,
            signUp,
            signOut,
            updateProfile,
            updateSettings
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/auth-context.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "+PvgbbkpQpin5KcnDRiRKmfapeU=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
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
        limitations: "Cheklovlar"
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
        limitations: "Limitations"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/language-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("uz");
    const { user, isLoading: isAuthLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LanguageProvider.useMemo[supabase]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])()
    }["LanguageProvider.useMemo[supabase]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            // Auth yuklanishini kutamiz
            if (!isAuthLoading && user) {
                const loadLanguage = {
                    "LanguageProvider.useEffect.loadLanguage": async ()=>{
                        const { data } = await supabase.from("profiles").select("language").eq("id", user.id).single();
                        if (data?.language) {
                            setLanguageState(data.language);
                        }
                    }
                }["LanguageProvider.useEffect.loadLanguage"];
                loadLanguage();
            }
        }
    }["LanguageProvider.useEffect"], [
        user,
        isAuthLoading,
        supabase
    ]);
    const setLanguage = async (lang)=>{
        setLanguageState(lang);
        if (user) {
            await supabase.from("profiles").update({
                language: lang
            }).eq("id", user.id);
        }
    };
    const t = (key)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][language][key] || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"].uz[key] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/language-context.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(LanguageProvider, "o1NrzOqORSEKlXCIiKeRt0nEW3s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        return {
            language: "uz",
            setLanguage: ()=>{},
            t: (key)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"].uz[key] || key
        };
    }
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_17f375a9._.js.map