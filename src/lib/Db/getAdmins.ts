import { Cache } from "../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ====================================================================
export const getAdmins = Cache(
  async () => {
    const admins = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      take: 10,
    });
    return admins;
  },
  ["admins"],
  {
    revalidate: 3600,
    tags: ["admins"],
  },
);
