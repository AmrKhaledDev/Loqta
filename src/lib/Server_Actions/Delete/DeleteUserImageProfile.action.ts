"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { revalidateTag } from "next/cache";
// ====================================
export const DeleteUserImageProfileAction = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return {
        success: false,
        message: "برجاء تسجيل الدخول أو التسجيل لحذف الصورة الخاصة بك",
      };
    const user = await prisma.user.findUnique({
      where: {
        id: userSession.id,
      },
      select: { id: true },
    });
    if (!user)
      return {
        success: false,
        message: "يتعذر حذف الصورة الخاصة بك برجاء التسجيل",
      };
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: null,
      },
    });
    revalidateTag("getUsers", "");
    revalidateTag("getAdmins", "");
    revalidateTag("getSellers", "");
    return { success: true, message: "تم حذف الصورة بنجاح" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "حدث خطأ أثناء حذف الصورة الخاصة بك" };
  }
};
