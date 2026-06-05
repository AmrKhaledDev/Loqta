"use server";
import { prisma } from "@/lib/prisma";
import { createHash, randomUUID } from "node:crypto";
// ===============================================================
export const generateVerificationToken = async (email: string) => {
  if (!email) return { error: "برجاء ادخال الايميل الخاص بك" };
  const token = randomUUID();
  const tokenHashed = createHash("sha256").update(token).digest("hex");
  try {
    await prisma.$transaction(async (tx) => {
      await tx.verificationToken.deleteMany({
        where: {
          identifier: email,
        },
      });
      await tx.verificationToken.create({
        data: {
          token: tokenHashed,
          identifier: email,
          expires: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
    });
    return { token };
  } catch (err) {
    console.log(err);
    return { error: "حدث خطأ أثناء انشاء رمز التحقق الخاص بك" };
  }
};
