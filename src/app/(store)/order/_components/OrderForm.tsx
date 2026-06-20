"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { User } from "@prisma/client";
import OrderSuccessMessage from "./OrderSuccessMessage";
import SelectCity from "../../../../components/SelectCity/SelectCity";
import { orderInputs } from "@/lib/data/OrderInputs";
import { handleCreateOrder } from "./handleCreateOrder";
import FormField from "@/components/FormField/FormField";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormSchema } from "@/lib/Zod_Schemas/OrderForm.schema";
// =========================================================================================
function OrderForm({ userSession }: { userSession: User }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      fullName: userSession.name,
      city: userSession.city || "",
      address: userSession.address || "",
      phone: userSession.phone || "",
    },
  });
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const city = watch("city");
  const createOrder = (data: any) => {
    handleCreateOrder(data, setLoading, setError, setOrderSuccess, router);
  };
  const inputs = orderInputs(errors);
  return (
    <form
      onSubmit={handleSubmit(createOrder)}
      className="sm:p-5 p-3 rounded-2xl h-fit md:w-150 w-full shadow-xl flex flex-col gap-5 ring ring-gray-50/20 bg-white/5"
    >
      {error && (
        <p className="p-5 bg-red-500 text-red-100 font-semibold">{error}</p>
      )}
      <h2 className="font-semibold text-center text-xl mb-3">بيانات الشحن</h2>
      {inputs.map((input) => (
        <FormField
          key={input.id}
          type={input.type}
          placeholder={input.placeholder}
          error={input.error}
          disabled={loading}
          register={register}
          id={
            input.id as Path<{
              fullName: string;
              city: string;
              address: string;
              phone: string;
            }>
          }
        />
      ))}
      <SelectCity
        setValue={setValue}
        value={city}
        error={errors.city?.message}
        disabled={loading}
      />
      <button
        disabled={loading}
        className="not-disabled:bg-blue-600 font-semibold flex items-center disabled:bg-gray-400 gap-5 justify-center py-3 active:scale-96 mytransition rounded-lg shadow not-disabled:cursor-pointer"
      >
        {loading ? (
          <>
            جاري تأكيد الطلب . . . <Loader />
          </>
        ) : (
          " تأكيد الطلب"
        )}
      </button>
      {orderSuccess && (
        <OrderSuccessMessage
          orderSuccess={orderSuccess}
          setOrderSuccess={setOrderSuccess}
        />
      )}
    </form>
  );
}

export default OrderForm;
