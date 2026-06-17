import { Metadata } from "next";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";
// ===========================================================================
export const metadata :Metadata = {
  title:"لُقطة | نسيت كلمة السر",
  description:"هل نسيت كلمة السر؟ أدخل البريد الإلكتروني الخاص بك وسيتم إرسال رمز التحقق"
}
function ForgotPassword() {
  return (
    <main className="text-white pt-30 min-h-[70vh] flex items-center justify-center">
      <ForgotPasswordForm />
    </main>
  );
}

export default ForgotPassword;
