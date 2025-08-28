"use client";

import { FaXTwitter } from "react-icons/fa6";
import { HiDotsHorizontal, HiHome } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const supabase = createClient();
  const router = useRouter();

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="sticky flex flex-col justify-between h-screen gap-4 top-0 z-50">
      <div>
        <Link href="/">
          <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out" />
        </Link>
        <Link
          href="/"
          className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out gap-2 w-fit"
        >
          <HiHome className="w-7 h-7" />
          <span className="font-bold hidden xl:inline">Home</span>
        </Link>

        {user ? (
          <button
            onClick={handleSignOut}
            className="bg-blue-400 text-white font-semibold cursor-pointer hover:brightness-95 rounded-full w-48 h-9 transition duration-150 ease-in-out hidden lg:inline shadow-md"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => router.push("/signin")}
            className="bg-blue-400 text-white font-semibold cursor-pointer hover:brightness-95 rounded-full w-48 h-9 transition duration-150 ease-in-out hidden lg:inline shadow-md"
          >
            Sign In
          </button>
        )}
      </div>
      {user && (
        <div className="text-gray-700 flex justify-between items-center hover:bg-gray-100 rounded-full transition-all duration-100">
          <Image
            src={
              user.user_metadata.avatar_url ||
              "/profile-picture-placeholder.jpg"
            }
            alt={user.user_metadata.name}
            height={40}
            width={40}
            className="h-10 w-10 rounded-full xl:mr-2"
          />
          <div className="w-fit p-2 hidden xl:inline">
            <h4 className="font-semibold">
              {user.user_metadata.name || "User"}
            </h4>
            <p className="text-sm">{`@${user.user_metadata.name?.split(" ").join("").toLocaleLowerCase() || "user"}`}</p>
          </div>
          <HiDotsHorizontal className="h-5 xl:ml-7 hidden xl:inline" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
