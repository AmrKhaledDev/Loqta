import z from "zod";
// =====================
export const RegisterSchema = z
  .object({
    name: z
      .string({ message: "الاسم يجب أن يكون نصًا" })
      .nonempty({ message: "الاسم يجب ألا يكون فارغ" })
      .min(3, { message: "الاسم قصير للغاية يجب ألا يقل عن ثلاث حروف" })
      .max(30, { message: "الاسم طويل للغاية يحب ألا يزيد عن 30 حرف" }),
    email: z
      .string({ message: "البريد الإلكتروني يجب أن يكون نصًا" })
      .nonempty({ message: "البريد الإلكتروني يجب ألا يكون فارغ" })
      .email({ message: "برجاء كتابة صيغة صحيحة للبريد الإلكتروني" }),
    password: z
      .string({ message: "صيغة كلمة السر غير صحيحة" })
      .nonempty({ message: "كلمة السر يجب ألا تكون فارغة " })
      .min(8, { message: "كلمة السر صغيرة يجب ألا تقل عن 8 أحرف / أرقام" })
      .max(50, {
        message: "كلمة السر طويلة للغاية يجب ألا تزيد عن 50 حرف / رقم",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "تأكيد كلمة المرور مطلوبة" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا السر غير متطابقتان",
    path: ["confirmPassword"],
  });
