"use server";
import { sendVerificationTokenForgotPassword } from "@/lib/email/sendVerificationTokenForgotPassword";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { prisma } from "@/lib/prisma";
import z from "zod";
// ==============================================================
export const ForgotPasswordAction = async (
  email: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!email)
      return {
        success: false,
        message: "لم نتمكن من إنشاء رابط التحقق حاول مرة أخرى",
      };
    const validation = z
      .object({
        email: z
          .string()
          .email({ message: "صيغة البريد الإلكتروني غير صحيحة" })
          .nonempty({ message: "البريد الإلكتروني مطلوب" }),
      })
      .safeParse({ email });
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { email: true },
    });
    if (!existingUser)
      return { success: false, message: "هذا الحساب غير موجود" };
    const verificationToken = await generateVerificationToken(email);
    if (verificationToken.error)
      return { success: false, message: verificationToken.error };
    const result = await sendVerificationTokenForgotPassword(
      email,
      verificationToken.token!,
    );
    if (!result.success) return { success: false, message: result.message };
    return { success: true, message: result.message };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إنشاء رابط التحقق الخاص بك",
    };
  }
};
