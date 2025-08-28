"use client";

import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";
import { IoMdStats } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";

const PostActions = () => {
  return (
    <div className="flex justify-between px-3 w-full">
      <HiOutlineChatBubbleOvalLeft
        size={25}
        className="p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out"
      />
      <GoHeart
        size={25}
        className="p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out"
      />
      <IoMdStats
        size={25}
        className="p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out"
      />
      <HiOutlineUpload
        size={25}
        className="p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out"
      />
    </div>
  );
};

export default PostActions;
