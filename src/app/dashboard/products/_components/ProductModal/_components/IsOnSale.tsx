"use client";

import { Dispatch, SetStateAction } from "react";
import CheckBox from "./CheckBox";
import ProductModalFormField from "./ProductModalFormField";
// ==================================================
function IsOnSale({
  isOnSale,
  setIsOnSale,
  value,
  onChange,
}: {
  isOnSale: boolean;
  setIsOnSale: Dispatch<SetStateAction<boolean>>;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <CheckBox state={isOnSale} setState={setIsOnSale} label="خصم" />
      {isOnSale == true && (
        <ProductModalFormField
          id="discountPrice"
          label="السعر بعد الخصم"
          placeholder="أكتب سعر المنتج بعد الخصم"
          type="text"
          typeField="input"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default IsOnSale;
