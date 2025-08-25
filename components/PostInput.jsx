"use client";

import Image from "next/image";
import {useSession} from "next-auth/react";
import {HiOutlinePhotograph} from "react-icons/hi";
import {MdOutlineGifBox} from "react-icons/md";

const PostInput = () => {
    const {data : session} = useSession();
    return (
        <div className="flex border-b border-gray-200 space-x-3 p-3 w-full">
            <Image
                src={session.user.image}
                alt={session.user.name}
                height={400}
                width={400}
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            />
            <div className="w-full divide-y divide-gray-200">
                <input
                    type="text"
                    placeholder="What&apos;s happening?"
                    className="w-full border-none outline-none tracking-wide min-h-[3.125rem] text-gray-700"
                />
                <div className="flex justify-between items-center pt-2.5">
                    <div className="flex justify-start items-center text-blue-400">
                        <HiOutlinePhotograph className="h-10 w-10 p-2 hover:bg-sky-100 rounded-full cursor-pointer" />
                        <MdOutlineGifBox className="h-10 w-10 p-2 hover:bg-sky-100 rounded-full cursor-pointer"/>
                    </div>
                    <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Post</button>
                </div>
            </div>
        </div>
    );
}

export default PostInput;