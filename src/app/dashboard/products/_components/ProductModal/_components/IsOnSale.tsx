"use client";

import { Dispatch, SetStateAction } from "react";
import CheckBox from "./CheckBox";
import ProductModalFormField from "./ProductModalFormField";
import DashAlertMessage from "@/app/dashboard/_components/DashAlertMessage/DashAlertMessage";
// ==================================================
function IsOnSale({
  isOnSale,
  setIsOnSale,
  value,
  onChange,
  error,
}: {
  isOnSale: boolean;
  setIsOnSale: Dispatch<SetStateAction<boolean>>;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <CheckBox state={isOnSale} setState={setIsOnSale} label="خصم" />
      {isOnSale == true && (
        <div className="flex flex-col gap-2">
          <ProductModalFormField
            id="discountPrice"
            label="السعر بعد الخصم"
            placeholder="أكتب سعر المنتج بعد الخصم"
            type="number"
            typeField="input"
            value={value}
            onChange={onChange}
          />
          {error && <DashAlertMessage type="error" message={error} />}
        </div>
      )}
    </div>
  );
}

export default IsOnSale;
