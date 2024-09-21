"use client";
import Image from "next/image";
import React, { useState } from "react";

const PostsRenderer = ({ img, id }: { img: string; id: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail view */}
      <div
        className= "relative w-1/5 h-24"
        key={id}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={img}
          alt=""
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Full-screen view when open */}
      {open && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)} // Close on clicking outside
        >
          {/* Close button */}
          <span className="absolute top-4 right-6 text-6xl text-white cursor-pointer" onClick={() => setOpen(false)}>
            &times;
          </span>
          
          {/* Enlarged image */}
          <div className="relative w-[80%] h-[80%]">
            <Image src={img} alt="Full screen" fill className="object-contain rounded-md" />
          </div>
        </div>
      )}
    </>
  );
};

export default PostsRenderer;
