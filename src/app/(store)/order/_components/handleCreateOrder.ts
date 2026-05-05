import { CreateOrderAction } from "@/lib/Server_Actions/Create_Actions/CreateOrder.action";
import { OrderErrors } from "@/lib/types";
import { OrderFormSchema } from "@/lib/Zod_Schemas/Order_Schemas/OrderForm.schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, FormEvent, SetStateAction } from "react";
// ============================
export const handleCreateOrder = async (
  e: FormEvent,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setErrors: Dispatch<SetStateAction<OrderErrors>>,
  fullName: string,
  address: string,
  city: string,
  phone: string,
  setOrderSuccess: Dispatch<SetStateAction<boolean>>,
  router:AppRouterInstance
) => {
  e.preventDefault();
  try {
    setLoading(true);
    setErrors({});
    const validation = OrderFormSchema.safeParse({
      fullName,
      address,
      city,
      phone,
    });
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors({
        fullName: fieldErrors.fullName?.[0],
        address: fieldErrors.address?.[0],
        city: fieldErrors.city?.[0],
        phone: fieldErrors.phone?.[0],
      });
      return;
    }
    const result = await CreateOrderAction({
      fullName,
      address,
      city,
      phone,
    });
    if (!result.success)
      return setErrors({
        serverError: result.message,
      });
    router.refresh();
    setOrderSuccess(true);
  } catch (error) {
    console.log(error);
    setErrors({ serverError: "حدث خطأ أثناء انشاء طلبك حاول مرة أخرى" });
  } finally {
    setLoading(false);
  }
};
