import { Metadata } from "next";
import FormResetPassword from "./_components/FormResetPassword";
// =====================================================
export const metadata: Metadata = {
  title: "لُقطة | تغيير كلمة السر",
  description:
    "تحديث وتأمين حسابك الشخصي؛ تغيير كلمة المرور الحالية بكلمة جديدة قوية، لتعزيز أمان الحساب وحمايته من الوصول غير المصرح به.",
};
async function ResetPassword({
  params,
}: {
  params: Promise<{ verificationToken: string }>;
}) {
  const { verificationToken } = await params;
  return (
    <main className="min-h-[90vh] flex items-center justify-center">
      <FormResetPassword verificationToken={verificationToken} />
    </main>
  );
}

export default ResetPassword;
