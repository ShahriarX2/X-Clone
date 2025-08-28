import { HiOutlineDotsHorizontal, HiOutlineUpload } from "react-icons/hi";
import { LuDot } from "react-icons/lu";
import { useCallback } from "react";
import PostActions from "./PostActions";

const Post = ({ post }) => {
  const username = post.author?.full_name
    .split(" ")
    .join("")
    .toLocaleLowerCase();
  const formatTime = useCallback((timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diff = now.getTime() - postDate.getTime();
    const diffSeconds = Math.floor(diff / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return `${diffSeconds}s`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else {
      return postDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  }, []);

  return (
    <div className="flex w-full p-3 space-x-4 border-t border-gray-200">
      <img
        src={post.author?.avatar_url || "/profile-picture-placeholder.jpg"}
        alt="profile-picture"
        className="h-10 w-10 rounded-full"
      />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 items-center text-gray-800">
            <h4 className="font-bold">
              {post.author?.full_name || "Unknown Author"}
            </h4>
            <span className="font-light text-sm">@{username}</span>
            <LuDot size={25} />
            <span className="font-light text-sm">
              {formatTime(post.created_at)}
            </span>
          </div>
          <HiOutlineDotsHorizontal
            size={25}
            className="p-1 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out"
          />
        </div>
        <p className="mb-2 py-2">{post.text}</p>
        {post.image_url && (
          <div className="flex items-center justify-center w-full">
            <img
              src={post.image_url}
              alt="Image"
              className="max-h-96 w-auto rounded-lg mb-2 self-center"
            />
          </div>
        )}
        <PostActions />
      </div>
    </div>
  );
};

export default Post;
