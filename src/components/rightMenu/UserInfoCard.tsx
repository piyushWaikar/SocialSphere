import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserInfoCardInteraction from "./UserInfoCardInteraction";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    //If the user is blocked
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    // Following status : Does the user follow or not check
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });
    followRes ? (isFollowing = true) : (isFollowing = false);

    // Does the we have any follow Req.
    const followReqRes = await prisma.followerRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });
    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  } else{
    return null;
  }
  return (
    <div className="rounded-lg bg-white shadow-md text-sm p-4 flex flex-col gap-4">
      {/* TOP  */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500">
          See all
        </Link>
      </div>
      {/* BOTTOM  */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black ">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.name}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}

        {user.city && (
          <div className="flex gap-2 items-center">
            <Image src="/map.png" alt="" width={16} height={16} />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}

        {user.school && (
          <div className="flex gap-2 items-center">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>
              went to <b>{user.school}</b>
            </span>
          </div>
        )}

        {user.work && (
          <div className="flex gap-2 items-center">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" alt="" width={16} height={16} />
              <Link href={user.website} className="text-blue-500 font-medium">
                {user.name}
              </Link>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        <UserInfoCardInteraction
          userId={user.id}
          currentUserId={currentUserId}
          isUserBlocked={isUserBlocked}
          isFollowing={isFollowing}
          isFollowingSent={isFollowingSent}
        />
      </div>
    </div>
  );
};

export default UserInfoCard;
