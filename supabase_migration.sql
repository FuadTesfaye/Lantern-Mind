-- Lantern-Mind Supabase Database Migration & Schema
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)

-- 1. Create Community Posts Table
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'Anonymous',
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- 4. Policies for community_posts
-- Allow public to read approved posts
CREATE POLICY "Public read approved posts"
    ON public.community_posts
    FOR SELECT
    USING (status = 'Approved');

-- Allow anyone to submit a new post (pending approval)
CREATE POLICY "Public insert posts"
    ON public.community_posts
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users (Admins) to read, update, delete all posts
CREATE POLICY "Admin full access posts"
    ON public.community_posts
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Policies for newsletter_subscriptions
CREATE POLICY "Public subscribe to newsletter"
    ON public.newsletter_subscriptions
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin access newsletter"
    ON public.newsletter_subscriptions
    FOR ALL
    TO authenticated
    USING (true);

-- 6. Insert Initial Demo Approved Community Post
INSERT INTO public.community_posts (title, slug, excerpt, content, author, status)
VALUES (
    'Finding Quiet in the Noise',
    'finding-quiet-in-the-noise',
    'How slowing down for 5 minutes a day restored my perspective during burnout.',
    'Full story on how taking intentional quiet breaks reformed my daily routine and nervous system state...',
    'Anonymous Traveler',
    'Approved'
)
ON CONFLICT (slug) DO NOTHING;
