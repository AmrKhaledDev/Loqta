import z from "zod";
import { ZodIssueCode } from "zod/v3";
// ========================================================
export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty({ message: "كلمة السر الجديدة مطلوبة" })
      .min(8, {
        message: "كلمة السر الجديدة صغيرة يجب ألا تقل عن 8 أرقام / حروف",
      })
      .max(50, {
        message: "كلمة السر طويلة للغاية يجب ألا تزيد عن 50 حرف / رقم",
      }),
    confirmPassword: z.string().nonempty({ message: "تأكيد كلمة السر مطلوب" }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "تأكيد كلمة السر غير متطابقة مع كلمة السر الجديدة",
        path: ["confirmPassword"],
      });
    }
  });
