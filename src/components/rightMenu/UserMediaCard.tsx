import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostsRenderer from "./PostsRenderer";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="rounded-lg bg-white shadow-md text-sm p-4 flex flex-col gap-4">
      {/* TOP  */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500">
          See all
        </Link>
      </div>
      {/* BOTTOM  */}
      {/* <div className="flex gap-4 justify-between flex-wrap">
        {postsWithMedia.length
          ? postsWithMedia.map((post) => (
              <div className="relative w-1/5 h-24" key={post.id}>
                <Image
                  src={post.img!}
                  alt=""
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "No media found"}
      </div> */}
      <div className="flex gap-4 justify-between flex-wrap">
        {postsWithMedia.length
          ? postsWithMedia.map((post) => (
              // <div className="relative w-1/5 h-24" key={post.id}>
              //   <Image
              //     src={post.img!}
              //     alt=""
              //     fill
              //     className="object-cover rounded-md"
              //   />
              // </div>
              <PostsRenderer img={post.img!} id={post.id} />
            ))
          : "No media found"}
      </div>
    </div>
  );
};

export default UserMediaCard;
