"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { revalidateTag } from "next/cache";
// ============================================
export const EditRoleAction = async (
  role: "ADMIN" | "USER" | "SELLER",
  userId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return {
        success: false,
        message: "لا يمكنك إستخدام هذا الإجراء يجب تسجيل الدخول",
      };
    if (userSession.role !== "SUPER_ADMIN")
      return { success: false, message: "لا يمكنك إستخدام هذا الإجراء" };
    if (!userId) return { success: false, message: "لم نتمكن من تغيير الدور" };
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: { id: true, emailVerified: true, role: true },
    });
    if (!user)
      return {
        success: false,
        message: "المستخدم المراد تغيير دوره غير موجود",
      };
    if (!user.emailVerified)
      return {
        success: false,
        message: "لا يمكنك تغيير دور هذا المستخدم بسبب عدم تفعيل حسابه",
      };
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role,
      },
    });
    revalidateTag("users", "");
    revalidateTag("admins", "");
    revalidateTag("newCustomers","")
    return {
      success: true,
      message:
        role === "ADMIN"
          ? "تم تغيير دور هذا المستخدم لمسؤول وسيتم إضافته في قسم المسؤولين"
          : "تم تغيير الدور بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تغيير الدور حاول مرة أخرى",
    };
  }
};
