"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Profile, UserSettings } from "@/lib/types"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  settings: UserSettings | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<void>
  updateSettings: (data: Partial<UserSettings>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        setProfile(profileData)

        const { data: settingsData } = await supabase.from("user_settings").select("*").eq("user_id", user.id).single()
        setSettings(settingsData)
      }

      setIsLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()
        setProfile(profileData)

        const { data: settingsData } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", session.user.id)
          .single()
        setSettings(settingsData)
      } else {
        setProfile(null)
        setSettings(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message || null }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
      },
    })
    return { error: error?.message || null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setSettings(null)
  }

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return
    const { data: updated } = await supabase.from("profiles").update(data).eq("id", user.id).select().single()
    if (updated) setProfile(updated)
  }

  const updateSettings = async (data: Partial<UserSettings>) => {
    if (!user) return
    const { data: updated } = await supabase.from("user_settings").update(data).eq("user_id", user.id).select().single()
    if (updated) setSettings(updated)
  }

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
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
