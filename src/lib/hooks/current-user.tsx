import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";

export const useCurrentUser = async () => {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }
  
  return await db.user.findFirst({
    where: {
      clerkId: user.id
    }
  });
};