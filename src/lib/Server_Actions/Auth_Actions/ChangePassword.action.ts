"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { ChangePasswordSchema } from "@/lib/Zod_Schemas/Auth_Schemas/ChangePassword.schema";
import bcrypt from "bcryptjs";
import z from "zod";
// ================================================================
export const ChangePasswordAction = async (
  data: z.infer<typeof ChangePasswordSchema>,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession)
      return {
        success: false,
        message: "يتعذر تغيير كلمة السر برجاء تسجيل الدخول",
      };
    const validation = ChangePasswordSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const user = await prisma.user.findUnique({
      where: {
        id: userSession.id,
      },
      select: { id: true, password: true },
    });
    if (!user)
      return {
        success: false,
        message: "يتعذر تغيير كلمة السر حسابك غير موجود",
      };
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch)
      return { success: false, message: "كلمة السر غير صحيحة" };
    const hashedPassword = await bcrypt.hash(data.newPassword, 12);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return { success: true, message: "تم تغيير كلمة السر الخاصه بك" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ غير متوقع أثناء تغيير كلمة السر",
    };
  }
};
