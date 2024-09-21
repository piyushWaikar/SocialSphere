import Image from "next/image";
import React, { Suspense } from "react";
import Comments from "./Comments";
import { Post as userPost, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";

type PostType = userPost & { user: User } & { likes: [{ userId: string }] } & {
  _count: { comments: number };
};

const Post = ({ post }: { post: PostType }) => {
  const {userId} = auth()
  return (
    <div className="flex flex-col gap-4">
      {/* user  */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "noAvatar.png"}
            alt=""
            className="rounded-full w-10 h-10"
            width={40}
            height={40}
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
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
        <p>{post.desc}</p>
      </div>

      {/* INTERACTION  */}
      {/* As we are fetching our data in this components we can use suspense  */}
      <Suspense fallback="Loading..."> 
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      <Suspense fallback="Loading...">
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;
