-- MogulMomma Platform Database Schema
-- Run this in your Supabase SQL editor

-- Enable Row Level Security
ALTER POLICY ON ALL TABLES IN SCHEMA public FORCE ROW LEVEL SECURITY;

-- Users/Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  professional_title TEXT,
  bio TEXT,
  industry TEXT,
  location TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  allow_connections BOOLEAN DEFAULT true,
  show_in_directory BOOLEAN DEFAULT true,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  member_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Member connections table
CREATE TABLE IF NOT EXISTS public.member_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID REFERENCES public.profiles(id),
  recipient_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'cancelled', 'expired')),
  plan_type TEXT DEFAULT 'monthly' CHECK (plan_type IN ('monthly', 'yearly')),
  amount DECIMAL(10,2) DEFAULT 97.00,
  currency TEXT DEFAULT 'USD',
  paypal_subscription_id TEXT,
  paypal_plan_id TEXT,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliates table
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  affiliate_code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'inactive')),
  commission_rate DECIMAL(5,2) DEFAULT 30.00, -- 30% commission
  total_referrals INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  paypal_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment results table
CREATE TABLE IF NOT EXISTS public.assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  assessment_type TEXT DEFAULT 'mogul_mama_clarity',
  responses JSONB, -- Store all assessment answers
  results JSONB, -- Store calculated results and recommendations
  score INTEGER,
  category TEXT, -- Result category (e.g., 'ready_to_transition', 'need_clarity', etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT TRUE
);

-- Referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID REFERENCES public.affiliates(id),
  affiliate_code TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id),
  referred_email TEXT,
  conversion_type TEXT CHECK (conversion_type IN ('signup', 'subscription', 'assessment')),
  commission_amount DECIMAL(10,2) DEFAULT 0.00,
  commission_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin activities/logs table
CREATE TABLE IF NOT EXISTS public.admin_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT,
  action_type TEXT, -- 'login', 'export', 'user_update', etc.
  description TEXT,
  metadata JSONB, -- Additional data about the action
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website analytics/events table
CREATE TABLE IF NOT EXISTS public.website_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id), -- nullable for anonymous events
  event_type TEXT NOT NULL, -- 'page_view', 'assessment_start', 'assessment_complete', etc.
  page_url TEXT,
  user_agent TEXT,
  ip_address INET,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_email ON public.subscriptions(user_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON public.subscriptions(created_at);

CREATE INDEX IF NOT EXISTS idx_affiliates_code ON public.affiliates(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_affiliates_email ON public.affiliates(email);
CREATE INDEX IF NOT EXISTS idx_affiliates_status ON public.affiliates(status);

CREATE INDEX IF NOT EXISTS idx_assessment_results_email ON public.assessment_results(user_email);
CREATE INDEX IF NOT EXISTS idx_assessment_results_created_at ON public.assessment_results(created_at);

CREATE INDEX IF NOT EXISTS idx_referrals_affiliate_code ON public.referrals(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON public.referrals(created_at);

CREATE INDEX IF NOT EXISTS idx_admin_activities_created_at ON public.admin_activities(created_at);
CREATE INDEX IF NOT EXISTS idx_website_events_created_at ON public.website_events(created_at);

-- Row Level Security Policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Subscriptions policies (admin access only for now)
CREATE POLICY "Admin can view all subscriptions" ON public.subscriptions FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND email = 'sabral@me.com')
);

-- Affiliates policies
CREATE POLICY "Affiliates can view own data" ON public.affiliates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can view all affiliates" ON public.affiliates FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND email = 'sabral@me.com')
);

-- Assessment results policies
CREATE POLICY "Users can view own assessments" ON public.assessment_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create assessments" ON public.assessment_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin can view all assessments" ON public.assessment_results FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND email = 'sabral@me.com')
);

-- Functions to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON public.affiliates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate affiliate codes
CREATE OR REPLACE FUNCTION public.generate_affiliate_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check INTEGER;
BEGIN
  LOOP
    -- Generate a random 8-character code
    code := upper(substr(md5(random()::text), 1, 8));
    
    -- Check if it already exists
    SELECT COUNT(*) INTO exists_check FROM public.affiliates WHERE affiliate_code = code;
    
    IF exists_check = 0 THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Sample data for testing (optional)
INSERT INTO public.subscriptions (user_email, status, amount, created_at) VALUES
  ('user1@example.com', 'active', 97.00, NOW() - INTERVAL '30 days'),
  ('user2@example.com', 'active', 97.00, NOW() - INTERVAL '15 days'),
  ('user3@example.com', 'pending', 97.00, NOW() - INTERVAL '2 days')
ON CONFLICT DO NOTHING;

INSERT INTO public.affiliates (full_name, email, affiliate_code, status, total_referrals, total_earnings) VALUES
  ('Sarah Johnson', 'sarah@example.com', 'SARAH123', 'active', 5, 145.50),
  ('Lisa Martinez', 'lisa@example.com', 'LISA456', 'active', 3, 87.30),
  ('Amy Chen', 'amy@example.com', 'AMY789', 'pending', 0, 0.00)
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.assessment_results (user_email, assessment_type, score, category, created_at) VALUES
  ('test1@example.com', 'mogul_mama_clarity', 85, 'ready_to_transition', NOW() - INTERVAL '5 days'),
  ('test2@example.com', 'mogul_mama_clarity', 65, 'need_support', NOW() - INTERVAL '3 days'),
  ('test3@example.com', 'mogul_mama_clarity', 92, 'entrepreneurial_ready', NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;