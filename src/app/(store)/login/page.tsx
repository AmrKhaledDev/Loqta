import { Metadata } from "next";
import LoginForm from "./_components/LoginForm";
// =================================================
export const metadata:Metadata = {
  title:"لُقطة | تسجيل الدخول",
  description: "سجّل الدخول إلى منصة لُقطة للوصول إلى حسابك وإدارة طلباتك وتجربتك بكل سهولة وأمان.",
}
function Login() {
  return (
    <main>
      <div className="mycontainer pt-30 text-white">
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
