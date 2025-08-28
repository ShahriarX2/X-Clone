"use client";

import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineGifBox } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/app/context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const PostInput = () => {
  const imagePickRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [post, setPost] = useState("");
  const { user } = useAuth();

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const supabase = createClient();

  const handleSubmit = async (e) => {
    if (!post && !selectedFile) return;

    let imageUrl = null;
    if (selectedFile) {
      setImageFileUploading(true);

      if (!user) {
        throw new Error("You must be logged in to create a post!");
      }

      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}/${uuidv4()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("user_files")
        .upload(fileName, selectedFile, {
          cacheControl: "3600",
          upsert: true,
          contentType: selectedFile.type,
        });
      if (error) {
        console.error("Error uploading image:", error);
      } else {
        const {
          data: { publicUrl },
        } = supabase.storage.from("user_files").getPublicUrl(fileName);
        imageUrl = publicUrl;
      }
      setImageFileUploading(false);
    }

    const { error } = await supabase
      .from("posts")
      .insert([{ text: post, image_url: imageUrl, user_id: user.id }]);
    if (error) {
      console.error("Error creating post:", error);
    } else {
      setPost("");
      setSelectedFile(null);
      setImageFileUrl(null);
    }
  };

  if (!user) return null;

  return (
    <div className="flex border-b border-gray-200 space-x-3 p-3 w-full">
      <Image
        src={user.user_metadata.avatar_url}
        alt="user image"
        height={400}
        width={400}
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          placeholder="What's happening?"
          rows="2"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="w-full border-none outline-none tracking-wide min-h-[3.125rem] text-gray-700"
        />
        {selectedFile && (
          <img
            src={imageFileUrl}
            alt="uploaded image"
            className="w-full max-h-[15.625rem] object-cover cursor-pointer"
          />
        )}
        <div className="flex justify-between items-center pt-2.5">
          <div className="flex justify-start items-center text-blue-400">
            <HiOutlinePhotograph
              className="h-10 w-10 p-2 hover:bg-sky-100 rounded-full cursor-pointer"
              onClick={() => imagePickRef.current.click()}
            />
            <input
              type="file"
              ref={imagePickRef}
              accept="image/*"
              onChange={addImageToPost}
              hidden
            />
            <MdOutlineGifBox className="h-10 w-10 p-2 hover:bg-sky-100 rounded-full cursor-pointer" />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            disabled={imageFileUploading}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
