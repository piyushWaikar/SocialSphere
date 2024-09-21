import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = auth();

  let posts:any[] = [] ;

  // When the user is being searched or in the params , means its profile page.
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }


  // when the username is not available the user is not in params / searched , that means we are on homepage, now we will fetch our friends posts.
  if(!username && userId){ // means username is not available and useId means user is loggedIn.
    const followingsLists = await prisma.follower.findMany({
      where:{
        followerId:userId
      },
      select:{
        followingId:true
      }
    });

    const followingIds = followingsLists.map((f) => f.followingId); // Friends post
    const ids = [userId,...followingIds] // Friends post with Current user(means our post)

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.length ? (posts.map(post=>(
        <Post key={post.id} post={post}/>
      ))) : "No posts found!"}
    </div>
  );
};

export default Feed;
