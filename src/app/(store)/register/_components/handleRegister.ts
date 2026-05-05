import { RegisterAction } from "@/lib/Server_Actions/Auth_Actions/Register.action";
import { RegisterErrors } from "@/lib/types";
import { RegisterSchema } from "@/lib/Zod_Schemas/Auth_Schemas/Register.schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, FormEvent, SetStateAction } from "react";
// ==================================================
export const handleRegister = async (
  e: FormEvent,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setName: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  setConfirmPassword: Dispatch<SetStateAction<string>>,
  router: AppRouterInstance,
  setErrors: Dispatch<SetStateAction<RegisterErrors>>,
  setSuccess: Dispatch<SetStateAction<string>>,
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  e.preventDefault();
  setLoading(true);
  setErrors({});
  setSuccess("");
  try {
    const validation = RegisterSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!validation.success) {
      const formattedErrors = validation.error.flatten().fieldErrors;
      setErrors({
        name: formattedErrors.name?.[0],
        email: formattedErrors.email?.[0],
        password: formattedErrors.password?.[0],
        confirmPassword: formattedErrors.confirmPassword?.[0],
      });
      return;
    }
    const result = await RegisterAction({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!result.success)
      return setErrors((prev) => ({ ...prev, serverError: result.message }));
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSuccess(result.message);
    router.refresh();
  } catch (error) {
    console.log(error);
    return setErrors((prev) => ({
      ...prev,
      serverError: "حدث خطأ أثناء إنشاء الحساب",
    }));
  } finally {
    setLoading(false);
  }
};
