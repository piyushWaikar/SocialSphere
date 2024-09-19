import Image from "next/image";
import React from "react";
import Comments from "./Comments";
import { Post as userPost, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type PostType = userPost & {user:User} & {likes:[{userId:string}]} & {_count:{comments:number}}

const Post = ({post}:{post:PostType}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* user  */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || 'noAvatar.png'}
            alt=""
            className="rounded-full w-10 h-10"
            width={40}
            height={40}
          />
          <span className="font-medium">{(post.user.name && post.user.surname) ? post.user.name + " " + post.user.surname : post.user.username}</span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>

      {/* DESC  */}
      <div className="flex flex-col gap-4">
      {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              fill
              className="object-cover rounded-md"
              alt=""
            />
          </div>
        )}
        <p>
          {post.desc}
        </p>
      </div>

      {/* INTERACTION  */}
      <PostInteraction postId={post.id} likes={post.likes.map((like)=>like.userId)} commentNumber={post._count.comments} />
      <Comments postId={post.id} />
    </div>
  );
};

export default Post;
