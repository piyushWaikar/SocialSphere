"use client";
import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth(); // we are using this hook instead of cont{userId} = auth()(for server) to fetch the current user because we are using "use client", for client :- const {isLoaded, userId} = useAuth().

  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  // using optimisitic hook for fast user experience :-
  const [optimisiticLike, switchOptimisiticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisiticLike("");
    try {
      switchLike(postId); // server action

      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (err) {}
  };

  return (
    <div className="flex items-center justify-between text-sm flex-wrap my-4">
      {/* left  */}
      <div className="flex gap-4">
        <div className="flex items-center gap-4 rounded-xl bg-slate-100 p-2 ">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisiticLike.isLiked ? "/liked.png" : "/like.png"}
                alt=""
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisiticLike.likeCount}{" "}
            <span className="hidden md:inline">Likes</span>
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
            {commentNumber} <span className="hidden md:inline"> Comments</span>
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
            <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
