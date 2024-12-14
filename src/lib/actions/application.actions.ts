"use server";

import { db } from "@/lib/db";
import type { FinalVerificationValues } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

export const createApplication = async (
  application: FinalVerificationValues,
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const applicationData = {
    ...application,
    applicantId: user.id,
    applicantFirstName: user.firstName ?? "",
    applicantLastName: user.lastName ?? "",
    applicantEmail: user.primaryEmailAddress?.emailAddress ?? "",
  };

  return await db.application.create({ data: applicationData });
};
