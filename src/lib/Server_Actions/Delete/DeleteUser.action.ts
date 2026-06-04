"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { revalidateTag } from "next/cache";
// ================================================
export const DeleteUserAction = async (
  userId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return {
        success: false,
        message: "برجاء تسجيل الدخول أولاً قبل تنفيذ هذا الإجراء",
      };
    if (userSession.role !== "SUPER_ADMIN")
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء" };
    if (!userId)
      return { success: false, message: "لم نستطع حذف المستخدم / المسؤول" };
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: { id: true },
    });
    if (!user)
      return {
        success: false,
        message: "المستخدم / المسؤول المراد حذفه غير موجود",
      };
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    revalidateTag("users", "");
    revalidateTag("admins", "");
    return { success: true, message: "تم الحذف بنجاح" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء حذف المستخدم / المسؤول حاول مرة أخرى",
    };
  }
};
