import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const createClient = () => {
    return createClientComponentClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
};