"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { revalidateTag } from "next/cache";
// =======================================
export const EditUserImageProfileAction = async (
  image: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return {
        success: false,
        message: "يتعذر حفظ الصورة برجاء تسجيل الدخول ",
      };
    const user = await prisma.user.findUnique({
      where: {
        id: userSession.id,
      },
      select: {
        id: true,
      },
    });
    if (!user)
      return {
        success: false,
        message: "يتعذر حفظ الصورة لديك برجاء إنشاء حسابك أولاً",
      };
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image,
      },
    });
    revalidateTag("users", "");
    revalidateTag("admins", "");
    return {
      success: true,
      message: "تم تعديل صورتك بنجاح سيتم عرضها عند كتابة رأي",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "حدث خطأ أثناء حفظ الصورة الخاص بك" };
  }
};
