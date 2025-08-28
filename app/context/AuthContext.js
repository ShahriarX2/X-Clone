'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const supabase = createClient();

    

    const ensureUserStorageDirectory = useCallback(async (userId) => {
        if (!userId) return;
        try {
            // Attempt to list files in the user's directory to check if it exists
            const { data, error } = await supabase.storage.from('user_files').list(userId + '/', { limit: 1 });

            if (error && error.statusCode === '404') {
                // Directory does not exist, create a dummy file to implicitly create it
                const dummyFile = new File([''], '.keep', { type: 'text/plain' });
                const { error: uploadError } = await supabase.storage.from('user_files').upload(`${userId}/.keep`, dummyFile);
                if (uploadError) {
                    console.error('Error creating user storage directory:', uploadError);
                }
            } else if (error) {
                console.error('Error checking user storage directory:', error);
            }
        } catch (err) {
            console.error('Unexpected error in ensureUserStorageDirectory:', err);
        }
    }, [supabase.storage]);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                ensureUserStorageDirectory(user.id);
            }
        }
        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                ensureUserStorageDirectory(session.user.id);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [supabase.auth, ensureUserStorageDirectory]);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
