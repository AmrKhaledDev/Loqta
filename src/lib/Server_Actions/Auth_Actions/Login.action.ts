"use server";
import { signIn } from "@/auth";
import { sendVerificationToken } from "@/lib/email/sendVerificationToken";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/Zod_Schemas/Auth_Schemas/Login.schema";
import bcrypt from "bcryptjs";
import z from "zod";
// =======================================
export const LoginAction = async (
  data: z.infer<typeof LoginSchema>,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validation = LoginSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
    });
    if (!existingUser)
      return {
        success: false,
        message: "لم نعثر على حسابك أنشئ حسابك الآن !",
      };
    const passwordMatch = await bcrypt.compare(
      validation.data.password,
      existingUser.password,
    );
    if (!passwordMatch)
      return { success: false, message: "كلمة المرور التي ادخلتها غير صحيحة" };
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );
      if (verificationToken.error)
        return { success: false, message: verificationToken.error };
      if (!verificationToken.token)
        return {
          success: false,
          message: "لم نتمكن من توليد رمز تحقق حاول مرة أخرى",
        };
      try {
        await sendVerificationToken(
          existingUser.email,
          verificationToken.token,
        );
        return {
          success: true,
          message: "تم إرسال رمز تحقق إلى بريدك الإلكتروني",
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: "لم نتمكن من إرسال رمز التحقق إلى بريدك الإلكتروني",
        };
      }
    }
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });
   
    return { success: true, message: "يتم تسجيل دخولك.  أهلاً بك" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تسجيل الدخول حاول مرة أخرى",
    };
  }
};
