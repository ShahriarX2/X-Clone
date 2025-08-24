import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi"
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="flex flex-col gap-4">
            <Link href="/">
                <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out" />
            </Link>
            <Link href="/" className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out gap-2 w-fit">
                <HiHome className="w-7 h-7"/>
                <span className="font-bold hidden xl:inline">Home</span>
            </Link>
            <button className="bg-blue-400 text-white font-semibold cursor-pointer hover:brightness-95 rounded-full w-48 h-9 transition duration-150 ease-in-out hidden lg:inline shadow-md">
                Sign In
            </button>
        </div>
    )
}

export default Sidebar;