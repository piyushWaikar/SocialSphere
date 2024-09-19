import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FriendRequestLists from "./FriendRequestLists";

const FriendRequest = async() => {

  const{userId} = auth()
  if(!userId) return null;

  const requests = await prisma.followerRequest.findMany({
    where:{
      receiverId:userId
    },
    include:{
      sender:true
    }
  });

  if(requests.length===0) return null;
  return (
    <div className="rounded-lg bg-white shadow-md text-sm p-4 flex flex-col gap-4">
      {/* TOP  */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500">
          See all
        </Link>
      </div>

      {/* Users  */}
    <FriendRequestLists requests={requests}/>
    </div>
  );
};

export default FriendRequest;
