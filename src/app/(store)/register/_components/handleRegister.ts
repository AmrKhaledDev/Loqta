import { RegisterAction } from "@/lib/Server_Actions/Auth_Actions/Register.action";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
// ==================================================
export const handleRegister = async (
  data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  setLoading: Dispatch<SetStateAction<boolean>>,
  router: AppRouterInstance,
  setError: Dispatch<SetStateAction<string>>,
  setSuccess: Dispatch<SetStateAction<string>>,
  reset: UseFormReset<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>,
) => {
  setLoading(true);
  setError("");
  setSuccess("");
  try {
    const result = await RegisterAction(data);
    if (!result.success) return setError(result.message);
    reset();
    setSuccess(result.message);
    router.refresh();
  } catch (error) {
    console.log(error);
    return setError("حدث خطأ أثناء إنشاء الحساب");
  } finally {
    setLoading(false);
  }
};
