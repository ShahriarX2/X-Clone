"use client";

import { FaXTwitter } from "react-icons/fa6";
import {HiDotsHorizontal, HiHome} from "react-icons/hi"
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";

const Sidebar = () => {
    const {data : session} = useSession();
    console.log(session)
    return (
        <div className="flex flex-col justify-between h-full gap-4">
            <div>
                <Link href="/">
                    <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out" />
                </Link>
                <Link href="/" className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out gap-2 w-fit">
                    <HiHome className="w-7 h-7"/>
                    <span className="font-bold hidden xl:inline">Home</span>
                </Link>

                {session? (
                    <button onClick={() => signOut()} className="bg-blue-400 text-white font-semibold cursor-pointer hover:brightness-95 rounded-full w-48 h-9 transition duration-150 ease-in-out hidden lg:inline shadow-md">
                        Sign Out
                    </button>
                ) : (
                    <button onClick={() => signIn()} className="bg-blue-400 text-white font-semibold cursor-pointer hover:brightness-95 rounded-full w-48 h-9 transition duration-150 ease-in-out hidden lg:inline shadow-md">
                        Sign In
                    </button>
                )}
            </div>
            {
                session && (
                    <div className="text-gray-700 flex justify-between items-center hover:bg-gray-100 rounded-full transition-all duration-100">
                        <Image src={session.user.image} alt={session.user.name} height={400} width={400} className="h-10 w-10 rounded-full xl:mr-2" />
                        <div className="w-fit p-2 hidden xl:inline">
                            <h4 className="font-semibold">{session.user.name}</h4>
                            <p className="text-sm">{`@${session.user.userName}`}</p>
                        </div>
                        <HiDotsHorizontal className="h-5 xl:ml-7 hidden xl:inline" />
                    </div>
                )
            }
        </div>
    )
}

export default Sidebar;