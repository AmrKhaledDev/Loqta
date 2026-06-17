"use server";
import { prisma } from "@/lib/prisma";
import { ResetPasswordSchema } from "@/lib/Zod_Schemas/Auth_Schemas/ResetPassword.schema";
import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import z from "zod";
// ============================================
export const ResetPasswordAction = async (
  verificationToken: string,
  data: z.infer<typeof ResetPasswordSchema>,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validation = ResetPasswordSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    if (!verificationToken)
      return { success: false, message: "حدث خطأ غير متوقع" };
    const hashedToken = createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    const token = await prisma.verificationToken.findUnique({
      where: {
        token: hashedToken,
      },
    });
    if (!token)
      return {
        success: false,
        message:
         "عذراً، الرمز المدخل غير موجود. يرجى استخدام رابط 'نسيت كلمة المرور' لإنشاء رمز جديد",
      };
    const isExpired = new Date(token.expires) < new Date();
    if (isExpired)
      return {
        success: false,
        message: "تم إنتهاء صلاحية الرمز الخاص بك برجاء إعادة المحاولة",
      };
    const hashingPassword = await bcrypt.hash(data.newPassword, 12);
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          email: token.identifier,
        },
        data: {
          password: hashingPassword,
        },
      });
      await tx.verificationToken.delete({
        where: {
          token: hashedToken,
        },
      });
    });
    return {
      success: true,
      message: "تم إعادة تعيين كلمة السر الخاصة بك بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إعادة تعيين كلمة السر حاول مرة أخرى",
    };
  }
};
