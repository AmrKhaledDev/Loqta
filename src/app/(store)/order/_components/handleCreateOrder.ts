import { CreateOrderAction } from "@/lib/Server_Actions/Create_Actions/CreateOrder.action";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
// ============================
export const handleCreateOrder = async (
  data: {
    fullName: string;
    city: string;
    address: string;
    phone: string;
  },
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  setOrderSuccess: Dispatch<SetStateAction<boolean>>,
  router: AppRouterInstance,
) => {
  try {
    setError("");
    setLoading(true);
    const result = await CreateOrderAction(data);
    if (!result.success) return setError(result.message);
    router.refresh();
    setOrderSuccess(true);
  } catch (error) {
    console.log(error);
    setError("حدث خطأ أثناء انشاء طلبك حاول مرة أخرى");
  } finally {
    setLoading(false);
  }
};
