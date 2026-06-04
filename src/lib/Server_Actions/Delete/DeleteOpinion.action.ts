"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { log } from "console";
// ================================
export const DeleteOpinionAction = async (
  opinionId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return { success: false, message: "برجاء تسجيل الدخول أولاً" };
    if (!opinionId)
      return { success: false, message: "الرأي المراد حذفه غير موجود" };
    const opinion = await prisma.opinion.findUnique({
      where: {
        id: opinionId,
      },
      select: { id: true, userId: true },
    });
    if (!opinion)
      return {
        success: false,
        message: "الرأي المراد حذفه غير موجود ",
      };
    if (opinion.userId!== userSession.id)
      return { success: false, message: "لا يمكنك حذف هذا الرأي" };
    await prisma.opinion.delete({
      where: {
        id: opinion.id,
      },
    });
    return { success: false, message: "تم الحذف بنجاح" };
  } catch (error) {
    log(error);
    return { success: false, message: "حدث خطأ غير متوقع" };
  }
};
