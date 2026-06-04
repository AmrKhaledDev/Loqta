"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { revalidateTag } from "next/cache";
// ============================================
export const ActivationAction = async (
  userId: string,
  typeActive: "active" | "deactivation",
): Promise<{ success: boolean; message: string }> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return {
        success: false,
        message: "لا يمكنك إستخدام هذا الإجراء عند عدم تسجيل الدخول",
      };
    if (userSession.role !== "SUPER_ADMIN")
      return { success: false, message: "لا يمكنك إستخدام هذا الإجراء" };
    if (!userId)
      return {
        success: false,
        message: "يتعذر تفعيل / إلغاء تفعيل هذا الحساب",
      };
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: { id: true },
    });
    if (!user)
      return {
        success: false,
        message: "المستخدم المراد تفعيل / إلغاء تفعيل حسابه غير موجود",
      };
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: typeActive === "active" ? true : false,
      },
    });
    revalidateTag("users", "");
    revalidateTag("admins", "");
    return {
      success: true,
      message:
        typeActive === "active" ? "تم تفعيل الحساب " : "تم إلغاء تفعيل الحساب",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        typeActive == "active"
          ? "حدث خطأ أثناء تفعيل هذا الحساب"
          : "حدث خطأ أثناء إلغاء تفعيل هذا الحساب",
    };
  }
};
