import { db } from "@/lib/db";
import type { UserProps } from "@/lib/types";

export const createUser = async (user: UserProps) => {
  const { clerkId, email, fullName } = user;

  const userData = {
    clerkId,
    email,
    fullName,
  };

  return await db.user.create({ data: userData });
};

export const getUserByClerkId = async (clerkId: string) => {
  const user = await db.user.findFirst({
    where: {
      clerkId,
    },
  });

  return user;
};
