"use client";

import { TestProductSchema, TestProductType } from "@/lib/test.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { keyof } from "zod";

export default function TestFormSimple() {
  const FORM_INPUTS = [
    { id: "name", label: "اسم المنتج *", type: "text" },
    { id: "price", label: "السعر الأساسي *", type: "number" },
    { id: "discountPrice", label: "السعر بعد الخصم", type: "number" },
    { id: "stock", label: "الكمية المتاحة *", type: "number" },
    { id: "minStock", label: "الحد الأدنى للمخزون *", type: "number" },
    { id: "brandName", label: "اسم الشركة / الماركة *", type: "text" },
    { id: "brandWebsite", label: "موقع الويب للماركة", type: "text" },
    { id: "warranty", label: "تفاصيل الضمان", type: "text" },
    { id: "shippingInfo", label: "معلومات الشحن", type: "text" },
    { id: "description", label: "وصف المنتج *", type: "text" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TestProductSchema),
  });

  const onMySubmit = (data: any) => {
    console.log("🔥 يا عمرو الداتا كلها اهي في Object واحد وعالمقاس:");
    console.log(data);
  };

  return (
    <div
      className="max-w-4xl mx-auto my-10 p-6 bg-slate-900 text-white rounded-2xl shadow-xl"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold mb-6 text-cyan-400">
        📝 اختبار لقط البيانات بـ React Hook Form
      </h1>

      <form
        onSubmit={handleSubmit(onMySubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {FORM_INPUTS.map((inp) => {
          const fieldError = errors[inp.id as keyof typeof errors];
          return (
            <div key={inp.id} className="flex flex-col gap-1">
              <label className="text-sm font-medium">{inp.label}</label>
              <input
                {...register(inp.id as any)}
                type={inp.type}
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-cyan-500"
              />
              {fieldError && <p>{fieldError.message}</p>}
            </div>
          );
        })}

        <button
          type="submit"
          className="md:col-span-2 mt-4 p-3 bg-cyan-500 hover:bg-cyan-600 font-bold rounded-lg transition"
        >
          أطبع الداتا في الـ Console 🚀
        </button>
      </form>
    </div>
  );
}
