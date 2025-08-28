"use client";

import PostInput from "@/components/PostInput";
import Posts from "@/components/Posts";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && user.user_metadata) {
        setUser(user);
      }
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
        } else if (event === "SIGNED_IN" && session) {
          setUser(session.user);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto border-r border-l min-h-screen border-gray-200">
      <div className="w-full flex justify-center items-center text-gray-700 text-lg border-b border-gray-200 sticky top-0 z-50 bg-white">
        <button className="w-1/2 flex justify-center py-3 hover:bg-gray-200 transition-all duration-200 relative font-bold">
          <span className="relative z-10">For you</span>
          <span className="absolute bottom-0 w-16 h-1 bg-blue-500 rounded-full"></span>
        </button>
        <button
          className={`w-1/2 flex justify-center py-3 hover:bg-gray-200 transition-all duration-200 relative ${false && "font-bold"}`}
        >
          <span className="relative z-10">Following</span>
          {/*<span className="absolute bottom-0 w-21 h-1 bg-blue-500 rounded-full"></span>*/}
        </button>
      </div>
      {user && <PostInput />}
      <Posts />
    </div>
  );
}
