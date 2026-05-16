import { FieldErrors } from "react-hook-form";
// ======================================================
export const orderInputs = (
  errors: FieldErrors<{
    fullName: string;
    city: string;
    address: string;
    phone: string;
  }>,
) => {
  return [
    {
      id: "fullName",
      placeholder: "الاسم الكامل",
      type: "text",
      error: errors.fullName?.message,
    },
    {
      id: "phone",
      placeholder: "رقم الهاتف",
      type: "number",
      error: errors.phone?.message,
    },
    {
      id: "address",
      placeholder: "العنوان الكامل",
      type: "text",
      error: errors.address?.message,
    },
  ];
};
