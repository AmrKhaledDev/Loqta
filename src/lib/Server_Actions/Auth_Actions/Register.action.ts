"use server";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/Zod_Schemas/Auth_Schemas/Register.schema";
import { sendVerificationToken } from "@/lib/email/sendVerificationToken";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import bcrypt from "bcryptjs";
import z from "zod";
// ======================================================================
export const RegisterAction = async (
  data: z.infer<typeof RegisterSchema>,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validation = RegisterSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues[0].message,
      };
    }
    const { email, password, name } = validation.data;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return {
        success: false,
        message: "هذا الحساب موجود بالفعل",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const verificationToken = await generateVerificationToken(email);

    if (verificationToken.error || !verificationToken.token) {
      return {
        success: false,
        message: verificationToken.error || "حدث خطأ في إنشاء رمز التحقق",
      };
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    try {
      await sendVerificationToken(email, verificationToken.token);
    } catch (emailError) {
      console.log(emailError);

      await prisma.user.delete({
        where: { email },
      });

      return {
        success: false,
        message:
          "لم نتمكن من إرسال رمز التحقق إلى بريدك تأكد من الإنترنت أو أعد المحاولة",
      };
    }

    return {
      success: true,
      message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إنشاء الحساب",
    };
  }
};
