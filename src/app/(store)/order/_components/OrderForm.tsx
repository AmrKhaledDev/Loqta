"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { User } from "@prisma/client";
import OrderSuccessMessage from "./OrderSuccessMessage";
import SelectCity from "../../../../components/SelectCity/SelectCity";
import { OrderErrors } from "@/lib/types";
import { orderInputs } from "@/lib/data/OrderInputs";
import { handleCreateOrder } from "./handleCreateOrder";
import FormField from "@/components/FormField/FormField";
// =========================================================================================
function OrderForm({ userSession }: { userSession: User }) {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<OrderErrors>({});
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(userSession.name || "");
  const [address, setAddress] = useState(userSession.address || "");
  const [city, setCity] = useState(userSession.city || "");
  const [phone, setPhone] = useState(userSession.phone || "");
  const createOrder = (e: FormEvent) => {
    handleCreateOrder(
      e,
      setLoading,
      setErrors,
      fullName,
      address,
      city,
      phone,
      setOrderSuccess,
      router,
    );
  };
  const inputs = orderInputs(
    fullName,
    setFullName,
    errors,
    phone,
    setPhone,
    address,
    setAddress,
  );
  return (
    <form
      onSubmit={createOrder}
      className="p-5 rounded-2xl h-fit flex-1 shadow-xl flex flex-col gap-5 ring ring-gray-50/20 bg-white/5"
    >
      {errors.serverError && (
        <p className="p-5 bg-red-500 text-red-100 font-semibold">
          {errors.serverError}
        </p>
      )}
      <h2 className="font-semibold text-center text-xl mb-3">بيانات الشحن</h2>
      {inputs.map((input) => (
        <FormField
          key={input.id}
          type={input.type}
          value={input.value}
          placeholder={input.placeholder}
          onChange={input.onChange}
          error={input.error}
          disabled={loading}
        />
      ))}
      <SelectCity city={city} setCity={setCity} error={errors.city} disabled={loading} />
      <button
        disabled={loading}
        className="not-disabled:bgg-ip flex items-center disabled:bg-gray-500 gap-5 justify-center py-3 active:scale-96 mytransition rounded shadow not-disabled:cursor-pointer"
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
