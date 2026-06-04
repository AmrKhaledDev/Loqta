"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { revalidateTag } from "next/cache";
// =================================================================
export const DeleteUserOpinionInDashAction = async (
  opinionId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return {
        success: false,
        message: "برجاء تسجيل الدخول أولاً قبل تنفيذ هذا الإجراء",
      };
    if (!opinionId)
      return { success: false, message: "لم نتمكن من حذف هذا التقيمم" };
    const opinion = await prisma.opinion.findUnique({
      where: {
        id: opinionId,
      },
      select: { id: true },
    });
    if (!opinion)
      return { success: false, message: "التقييم المراد حذفه غير موجود" };
    await prisma.opinion.delete({
      where: {
        id: opinionId,
      },
    });
    revalidateTag("opinions","")
    return {success:true,message:"تم حذف التقييم بنجاح"}
  } catch (error) {
    console.log(error);
    return { success: false, message: "حدث خطأ أثناء حذف هذا التقييم" };
  }
};
