-- NexaGPT Complete Database Schema
-- Run this in Supabase SQL editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modules table with full configuration
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT NOT NULL,
  theme_color TEXT DEFAULT '#8B7EC8',
  gradient_from TEXT,
  gradient_to TEXT,
  system_prompt TEXT NOT NULL,
  ai_model TEXT DEFAULT 'models/gemini-2.0-flash',
  welcome_message TEXT,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User settings
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  language TEXT DEFAULT 'en',
  voice_enabled BOOLEAN DEFAULT true,
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  module_slug TEXT REFERENCES modules(slug) ON DELETE SET NULL,
  title TEXT DEFAULT 'New Chat',
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_updated_at ON conversations(updated_at DESC);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- Insert default modules
INSERT INTO modules (name, slug, description, icon, theme_color, gradient_from, gradient_to, system_prompt, ai_model, welcome_message, features, sort_order) VALUES
  ('NexaGPT', 'nexagpt', 'Umumiy AI yordamchi', 'bot', '#1a1a1a', '#1a1a1a', '#374151', 
   'Sen NexaGPT - professional va foydali AI yordamchisan. Foydalanuvchilarga har qanday savollarda yordam ber. Javoblaringni markdown formatida chiroyli qilib yoz. Uzbek tilida so''rashsa, o''zbek tilida javob ber.',
   'models/gemini-2.0-flash',
   'Salom! Men NexaGPT, sizning AI yordamchingizman. Sizga qanday yordam bera olaman?',
   '[]', 1),
   
  ('AgroAI', 'agro', 'Qishloq xo''jaligi yordamchisi', 'leaf', '#22c55e', '#22c55e', '#10b981',
   'Sen AgroAI - qishloq xo''jaligi bo''yicha ekspert AI yordamchisan. Foydalanuvchilarga dehqonchilik, o''simlik kasalliklari, ekin parvarishi va qishloq xo''jaligi bo''yicha maslahatlar ber. Rasmlarni tahlil qilganda o''simliklarni aniqlash, kasalliklarni topish va davolash tavsiyalarini ber. Javoblaringni markdown formatida yoz.',
   'models/gemini-2.0-flash',
   'Salom, men Agro AI man sizga qishloq xo''jaligi boyicha yordam beraman.',
   '["Ma''lumot olish", "Kasallik aniqlash"]', 2),
   
  ('CoderAI', 'code', 'Dasturlash yordamchisi', 'code', '#3b82f6', '#3b82f6', '#6366f1',
   'Sen CoderAI - professional dasturlash yordamchisan. Foydalanuvchilarga kod yozish, debug qilish va optimizatsiya qilishda yordam ber. Kodlarni syntax highlighting bilan chiroyli formatda ko''rsat. Har doim ishlaydigan, to''g''ri kod yoz.',
   'models/gemini-2.0-flash',
   'Salom! Men CoderAI, dasturlash bo''yicha yordamchingizman. Qanday kod yozishda yordam kerak?',
   '["Kod yozish", "Debug qilish", "Optimizatsiya"]', 3),
   
  ('WeatherAI', 'weather', 'Ob-havo yordamchisi', 'cloud', '#0ea5e9', '#0ea5e9', '#0284c7',
   'Sen WeatherAI - ob-havo va iqlim bo''yicha yordamchisan. Foydalanuvchilarga ob-havo ma''lumotlari, prognozlar va iqlim haqida ma''lumot ber. Javoblaringni markdown formatida yoz.',
   'models/gemini-2.0-flash',
   'Salom, men Weather AI man sizga ob-havo boyicha yordam beraman.',
   '["Ma''lumot olish", "Batafsil prognoz"]', 4),
   
  ('HealthAI', 'health', 'Salomatlik yordamchisi', 'heart', '#ef4444', '#ef4444', '#dc2626',
   'Sen HealthAI - salomatlik va sog''lom turmush tarzi bo''yicha yordamchisan. Foydalanuvchilarga umumiy salomatlik ma''lumotlari, fitness mashqlari va sog''lom ovqatlanish bo''yicha maslahatlar ber. Har doim tibbiy mutaxassisga murojaat qilishni tavsiya qil. Javoblaringni markdown formatida yoz.',
   'models/gemini-2.0-flash',
   'Salom! Men HealthAI, salomatlik bo''yicha yordamchingizman. Sizga qanday yordam bera olaman?',
   '["Maslahat olish", "Mashqlar"]', 5);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User settings policies
CREATE POLICY "Users can view own settings" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON user_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Conversations policies
CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON conversations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conversations" ON conversations FOR DELETE USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages in own conversations" ON messages FOR SELECT 
  USING (conversation_id IN (SELECT id FROM conversations WHERE user_id = auth.uid()));
CREATE POLICY "Users can create messages in own conversations" ON messages FOR INSERT 
  WITH CHECK (conversation_id IN (SELECT id FROM conversations WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete messages in own conversations" ON messages FOR DELETE 
  USING (conversation_id IN (SELECT id FROM conversations WHERE user_id = auth.uid()));

-- Modules public read
CREATE POLICY "Modules are publicly readable" ON modules FOR SELECT TO authenticated, anon USING (true);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  INSERT INTO user_settings (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_conversations_updated_at ON conversations;
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
