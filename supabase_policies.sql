-- Supabase RLS Policies and Table Alterations
-- Run these queries in your Supabase project's SQL editor.

-- 1. Alter `posts` table to add necessary columns (if they don't exist)
-- This query adds 'text', 'image_url', 'user_id', and 'created_at' columns to the 'posts' table.
-- Run this ONLY if these columns are missing from your 'posts' table.
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS text text,
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users (id) NOT NULL,
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL;

-- 2. Policy for the `posts` table
-- This policy allows authenticated users to insert into the `posts` table.
CREATE POLICY "Enable insert for authenticated users only" ON "public"."posts"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- 3. Policy for the `storage.objects` table
-- This policy allows authenticated users to insert into the `storage.objects` table.
CREATE POLICY "Enable insert for authenticated users only" ON "storage"."objects"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);
