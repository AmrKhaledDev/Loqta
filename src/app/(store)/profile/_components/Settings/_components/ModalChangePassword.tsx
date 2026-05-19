"use client";
import FloatingIconButton from "@/components/FloatingIconButton/FloatingIconButton";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { ChangePasswordSchema } from "@/lib/Zod_Schemas/Auth_Schemas/ChangePassword.schema";
import { ChangePasswordAction } from "@/lib/Server_Actions/Auth_Actions/ChangePassword.action";
import { toast } from "react-toastify";
import { Repeat2 } from "lucide-react";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ChangePasswordFormField from "./ChangePasswordFormField";
import z from "zod";
// ======================================================
function ModalChangePassword({
  setOpenChangePassword,
}: {
  setOpenChangePassword: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChangePassword = async (
    data: z.infer<typeof ChangePasswordSchema>,
  ) => {
    setLoading(true);
    const result = await ChangePasswordAction(data);
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    setOpenChangePassword(false);
    toast.success(result.message, { className: "toast-font" });
    router.refresh();
  };
  const inputs = [
    {
      id: "password",
      type: "password",
      placeholder: "أكتب كلمة السر الحالية",
      label: "كلمة السر الحالية",
      error: errors.password?.message,
    },
    {
      id: "newPassword",
      type: "password",
      placeholder: "أكتب كلمة السر الجديدة",
      label: "كلمة السر الجديدة",
      error: errors.newPassword?.message,
    },
    {
      id: "confirmPassword",
      type: "password",
      placeholder: "تأكيد كلمة السر",
      label: "تأكيد كلمة السر",
      error: errors.confirmPassword?.message,
    },
  ];
  
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur z-60 flex items-center justify-center">
      <div className="ring ring-gray-50/30 boxChangePassword bg-white/10 rounded-2xl md:w-120 sm:w-[60%] w-[80%] p-4">
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="flex flex-col gap-3"
        >
          {inputs.map((input) => (
            <ChangePasswordFormField
              key={input.id}
              id={
                input.id as Path<{
                  password: string;
                  newPassword: string;
                  confirmPassword: string;
                }>
              }
              placeholder={input.placeholder}
              label={input.label}
              disbaled={loading}
              error={input.error}
              register={register}
            />
          ))}

          <FloatingIconButton
            bgColor="bg-indigo-500"
            label="تغيير كلمة السر"
            textColor="text-indigo-500"
            Icon={Repeat2}
            loading={loading}
            loadingText="جاري تغيير كلمة السر . . ."
          />
        </form>
      </div>
    </div>
  );
}

export default ModalChangePassword;
