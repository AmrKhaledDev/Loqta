"use client";
import CheckBox from "./CheckBox";
// ==================================================
function IsOnSale() {
  return (
    <div className="flex flex-col gap-1">
      <CheckBox  label="خصم" />
    </div>
  );
}

export default IsOnSale;
