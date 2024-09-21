import React, { Suspense } from "react";
import FriendRequest from "./FriendRequest";
import Birthday from "./Birthday";
import Ad from "../Ad";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
        {/* we are using suspense block because we are fetching heavy data , at the time when the data is fetching or components will render in meantime */}
          <Suspense fallback="loading..."> 
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequest />
      <Birthday />
      <Ad size={"md"} />
    </div>
  );
};

export default RightMenu;
