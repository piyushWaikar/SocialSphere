"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("user is not Authenticated");
  }

  try {
    // If we are following the user, check :-
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    // If YES than unfollow it :-
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    }
    // If we were Not following the user, check :-
    else {
      // Now we are checking for the follow request sent :-
      const existingFollowRequest = await prisma.followerRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      // If YES than REMOVE the follow Request :-
      if (existingFollowRequest) {
        await prisma.followerRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      }
      // If NOT than CREATE the follow Request :-
      else {
        await prisma.followerRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went Wrong !!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("user is not Authenticated");
  }
  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Follow Request :-
export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("user is not Authenticated");
  }

  try {
    const existingFollowRequest = await prisma.followerRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followerRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went Wrong !!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("user is not Authenticated");
  }

  try {
    const existingFollowRequest = await prisma.followerRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followerRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went Wrong !!");
  }
};

//Update Profile
export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Like Post
export const switchLike = async (postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("user is not Authenticated");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went Wrong !!");
  }
};

//Comments :-
export const addComment = async (postId: number, desc: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("user is not Authenticated");
  try {
    const createComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went Wrong !!");
  }
};

// Add Post
export const addPost = async (formData: FormData, img: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("user is not Authenticated");

  const desc = formData.get("desc") as string;
  const Desc = z.string().min(1).max(255);
  const validatedDesc = Desc.safeParse(desc);
  if (!validatedDesc.success) {
    // ToDo
    console.log("Description is not validated");
    return;
  }

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/"); // Refreshing page
  } catch (err) {
    console.log(err);
    throw new Error("Something went Wrong !!");
  }
};

// Add Story
export const addStory = async (image: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("user is not Authenticated");

  try {
    // We are going to allow single user to post single story only.
    const exisitingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });
    if (exisitingStory) {
      await prisma.story.delete({
        where: {
          id: exisitingStory.id,
        },
      });
    }

    const createdStory = await prisma.story.create({
      data: {
        userId,
        image,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
    throw new Error("Something went Wrong !!");
  }
};

// Deleting Post
export const deletePost = async (postId: number) => {
  const { userId } = auth();
  if (!userId) throw new Error("user is not Authenticated");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath("/");
  } catch (err) {
    console.log(err);
    throw new Error("Something went Wrong !!");
  }
};
