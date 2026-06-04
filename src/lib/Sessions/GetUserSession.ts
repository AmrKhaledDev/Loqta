"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
// ======================================
export const GetUserSession = async () => {
  try {
    const session = await auth();
    if (session && session.user) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });
      return user || null;
    }
    return null
  } catch (error) {
    console.log(error);
    return null;
  }
};
