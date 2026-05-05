import { LoginAction } from "@/lib/Server_Actions/Auth_Actions/Login.action";
import { LoginErrors } from "@/lib/types";
import { LoginSchema } from "@/lib/Zod_Schemas/Auth_Schemas/Login.schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, FormEvent, SetStateAction } from "react";
// ===========================================================
const handleLogin = async (
  e: FormEvent,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setErrors: Dispatch<SetStateAction<LoginErrors>>,
  setSuccess: Dispatch<SetStateAction<string>>,
  email: string,
  password: string,
  router: AppRouterInstance,
) => {
  e.preventDefault();
  setLoading(true);
  setErrors({});
  setSuccess("");
  try {
    const validation = LoginSchema.safeParse({
      email,
      password,
    });
    if (!validation.success) {
      const formattedErrors = validation.error.flatten().fieldErrors;
      setErrors((prev: LoginErrors) => ({
        ...prev,
        email: formattedErrors.email?.[0],
        password: formattedErrors.password?.[0],
      }));
      return;
    }
    const result = await LoginAction({
      email,
      password,
    });
    if (!result.success)
      return setErrors((prev: LoginErrors) => ({
        ...prev,
        serverError: result.message,
      }));
    setSuccess(result.message);
    router.refresh();
  } catch (error) {
    console.log(error);
    setErrors((prev: LoginErrors) => ({
      ...prev,
      serverError: "حدث خطأ أثناء تسجيل الدخول حاول مرة أخرى",
    }));
  } finally {
    setLoading(false);
  }
};
export default handleLogin;
