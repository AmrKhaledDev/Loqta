export const CreateProductInputs = () => {
  return [
    {
      id: "name",
      label: "إسم المنتج",
      placeholder: "أكتب إسم المنتج",
      type: "text",
      typeField: "input",
    },
    {
      id: "price",
      label: "سعر المنتج",
      placeholder: "أكتب سعر للمنتج",
      type: "number",
      typeField: "input",
    },
    {
      id: "stock", 
      label: "كمية المنتج",
      placeholder: "أكتب كمية المنتج المخزنه",
      type: "number",
      typeField: "input",
    },
    {
      id: "minStock", 
      label: "أقل كمية",
      placeholder: "أكتب أقل كمية لهذا المنتج للتنبيه",
      type: "number",
      typeField: "input",
    },
    {
      id: "returnPolicy", 
      label: "سياسة الإرجاع ( اختياري )",
      placeholder: "أكتب أقصى مدة لإرجاع المنتج",
      type: "text",
      typeField: "input",
    },
    {
      id: "warranty",
      label: "الضمان",
      placeholder: "أكتب فترة الضمان الخاصة بالمنتج",
      type: "text",
      typeField: "input",
    },
    {
      id: "shippingInfo",
      label: "التوصيل",
      placeholder: "أكتب فترة توصيل المنتج",
      type: "text",
      typeField: "input",
    },
    {
      id: "description",
      label: "الوصف",
      placeholder: "أكتب وصف عن هذا المنتج",
      type: "text",
      typeField: "textarea",
    },
  ];
};