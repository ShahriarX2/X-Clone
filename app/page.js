"use client";

import {useSession} from "next-auth/react";
import PostInput from "@/components/PostInput";

export default function Home() {
    const {data : session} = useSession();
    return (
        <div className="max-w-xl mx-auto border-r border-l min-h-screen border-gray-200">
            <div className="w-100 flex justify-between items-stretch font-bold text-gray-700 text-lg border-b border-gray-200 sticky top-0 z-50 bg-white">
                <div className="flex flex-col items-stretch justify-center py-3 hover:bg-gray-200 transition-all duration-200">
                    <button className="min-w-14 px-4">For you</button>
                </div>
                <div className="flex flex-col items-stretch justify-center py-3 hover:bg-gray-200 transition-all duration-200">
                    <button className="min-w-14 px-4">Following</button>
                </div>
            </div>
            {session && (
                <PostInput />
            )}
        </div>
    );
}