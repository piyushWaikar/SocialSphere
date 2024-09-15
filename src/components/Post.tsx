import Image from "next/image";
import React from "react";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* user  */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/23483901/pexels-photo-23483901/free-photo-of-portrait-of-a-beautiful-brunette-standing-in-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="rounded-full w-10 h-10"
            width={40}
            height={40}
          />
          <span className="font-medium">Jack McBride</span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>

      {/* DESC  */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/27390130/pexels-photo-27390130/free-photo-of-a-bird-perched-on-a-tree-branch-with-people-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            fill
            className="object-cover rounded-md"
            alt=""
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          dignissimos sunt, in magnam tempora quidem, maiores odit quos, fuga
          modi voluptatem quaerat nisi. Excepturi nulla laboriosam expedita
          libero unde enim?
        </p>
      </div>

      {/* INTERACTION  */}
      <div className="flex items-center justify-between text-sm flex-wrap my-4">
        {/* left  */}
        <div className="flex gap-4">
        <div className="flex items-center gap-4 rounded-xl bg-slate-100 p-2 ">
          <Image
            src="/like.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            123 <span className="hidden md:inline">Likes</span>
          </span>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-slate-100 p-2 ">
          <Image
            src="/comment.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            123 <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      {/* right  */}
      <div className="flex">
        <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-2 ">
          <Image
            src="/share.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            123 <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
      </div>
      <Comments/>
    </div>
  );
};

export default Post;
