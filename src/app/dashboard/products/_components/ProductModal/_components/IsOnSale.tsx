"use client";
import DashAlertMessage from "@/app/dashboard/_components/DashAlertMessage/DashAlertMessage";
import CheckBox from "./CheckBox";
import ProductModalFormField from "./ProductModalFormField";
import { useEffect } from "react";
// ==================================================
function IsOnSale({
  register,
  isOnSale,
  setValue,
  error,
}: {
  register: any;
  isOnSale: boolean;
  setValue: any;
  error?: string;
}) {
  useEffect(() => {
    if (isOnSale == false) {
      setValue("discountPrice", "");
    }
  }, [isOnSale]);
  return (
    <div className="flex flex-col gap-1">
      <CheckBox fieldName="isOnSale" register={register} label="خصم" />
      {isOnSale && (
        <ProductModalFormField
          type="number"
          placeholder="أكتب السعر بعد الخصم"
          label="السعر بعد الخصم"
          id="discountPrice"
          typeField="input"
          register={register}
        />
      )}
      {error && <DashAlertMessage type="error" message={error} />}
    </div>
  );
}

export default IsOnSale;
