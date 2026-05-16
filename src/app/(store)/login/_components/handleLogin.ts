import { LoginAction } from "@/lib/Server_Actions/Auth_Actions/Login.action";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
// ===========================================================
const handleLogin = async (
  data: {
    email: string;
    password: string;
  },
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  setSuccess: Dispatch<SetStateAction<string>>,
  router: AppRouterInstance,
) => {
  setLoading(true);
  setError("");
  setSuccess("");
  try {
    const result = await LoginAction(data);
    if (!result.success) return setError(result.message);
    setSuccess(result.message);
    router.refresh();
  } catch (error) {
    console.log(error);
    setError("حدث خطأ أثناء تسجيل الدخول حاول مرة أخرى");
  } finally {
    setLoading(false);
  }
};
export default handleLogin;
