"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useMemo, // Performance uchun
} from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profile, UserSettings } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  settings: UserSettings | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  updateSettings: (data: Partial<UserSettings>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Clientni bir marta olamiz
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  // Ma'lumotlarni yuklash uchun yordamchi funksiya
  const fetchUserData = async (userId: string) => {
    try {
      const [profileRes, settingsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase.from("user_settings").select("*").eq("user_id", userId).single(),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
    } catch (error) {
      console.error("User data fetch error:", error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // 1. Hozirgi sessiyani tekshiramiz
        const { data: { user: currentUser } } = await supabase.auth.getUser();

        if (mounted) {
          setUser(currentUser);
          if (currentUser) {
            await fetchUserData(currentUser.id);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    // 2. Auth o'zgarishlarini tinglaymiz
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]); // `user` dependency olib tashlandi, loop bo'lmasligi uchun

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          window.location.origin,
      },
    });
    return { error: error?.message || null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSettings(null);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return;
    const { data: updated } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", user.id)
      .select()
      .single();
    if (updated) setProfile(updated);
  };

  const updateSettings = async (data: Partial<UserSettings>) => {
    if (!user) return;
    const { data: updated } = await supabase
      .from("user_settings")
      .update(data)
      .eq("user_id", user.id)
      .select()
      .single();
    if (updated) setSettings(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        settings,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        updateSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}