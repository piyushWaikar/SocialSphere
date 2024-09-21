"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  // const {userId} = auth(); // from clerk authentication , where user is login through
  const { user, isLoaded } = useUser(); // Because of client component

  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) return "Loading";

  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex gap-4 justify-between text-sm">
      {/* avatar  */}
      <Image
        src={user?.imageUrl || "noAvatar.png"}
        width={48}
        height={48}
        alt=""
        className="w-12 h-12 object-cover rounded-full"
      />

      {/* post  */}
      <div className="flex-1">
        {/* text input  */}
        <form action={(formData)=>addPost(formData,img?.secure_url || '')} className="flex gap-4">
          <textarea
            placeholder="What's on you mind ?"
            className="bg-slate-100 rounded-lg flex-1 p-2"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div>
            <Image
              src="/emoji.png"
              width={20}
              height={20}
              alt=""
              className="w-5 h-5 cursor-pointer self-end"
            />
            <AddPostButton />
          </div>
        </form>
        {/* post options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="SocialSphere"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div className="flex items-center gap-2 cursor-pointer" onClick={()=> open()}>
                  <Image src="/addimage.png" alt="" width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
