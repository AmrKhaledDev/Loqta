import z from "zod";
// ==============================
export const ChangePasswordSchema = z
  .object({
    password: z.string().nonempty({ message: "كلمة السر الحالية مطلوبة" }),
    newPassword: z
      .string({ message: "صيغة كلمة السر غير صحيحة" })
      .nonempty({ message: "كلمة السر الجديدة مطلوبة" })
      .min(8, { message: "كلمة السر الجديدة يجب ألا تقل عن 8 حروف / أرقام" })
      .max(50, {
        message: "كلمة السر الجديدة طويلة للغاية يجب ألا تزيد عن 50 حرف / رقم",
      }),
    confirmPassword: z.string().nonempty({ message: "تأكيد كلمة السر مطلوب" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "تأكيد كلمة السر غير متطابق مع كلمة السر الجديدة",
    path: ["confirmPassword"],
  });
