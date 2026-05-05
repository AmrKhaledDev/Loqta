import { Metadata } from "next";
import RegisterForm from "./_components/RegisterForm";
// ==================================================================
export const metadata: Metadata = {
  title: "لُقطة | إنشاء حساب",
  description: "أنشئ حساب جديد في لُقطة بسرعة وأمان للاستفادة من جميع الخدمات وإدارة طلباتك بكل سهولة.",
};
function Register() {
  return (
    <main className="section-p">
      <div className="mycontainer pt-25 text-white">
      <RegisterForm/>
      </div>
    </main>
  );
}

export default Register;
