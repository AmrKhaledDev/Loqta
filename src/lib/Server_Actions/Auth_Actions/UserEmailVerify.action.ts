"use server";
import { prisma } from "@/lib/prisma";
import { createHash } from "node:crypto";
// ===================================================
export const UserEmailVerifyAction = async (
  verificationToken: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!verificationToken)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء إكمال عملية التحقق",
      };
    const tokenHashed = createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    const token = await prisma.verificationToken.findUnique({
      where: {
        token: tokenHashed,
      },
    });
    if (!token)
      return { success: false, message: "رمز التحقق الخاص بك غير موجود" };
    const isExpired = new Date(token.expires) < new Date();
    if (isExpired) {
      await prisma.verificationToken.delete({
        where: {
          token: tokenHashed,
        },
      });
      return { success: false, message: "تم إنتهاء صلاحية التوكن الخاص بك" };
    }
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          email: token.identifier,
        },
        data: {
          emailVerified: true,
        },
      });
      await tx.verificationToken.delete({
        where: {
          token: tokenHashed,
        },
      });
    });
    return {
      success: true,
      message:
        "تم التحقق من بريدك الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول والاستمتاع بأقوى العروض والتخفيضات.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إكمال التحقق من بريدك الإلكتروني",
    };
  }
};
