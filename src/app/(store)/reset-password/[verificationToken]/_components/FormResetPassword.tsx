"use client";
import ChangePasswordFormField from "@/components/ChangePasswordFormField/ChangePasswordFormField";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import FloatingIconButton from "@/components/FloatingIconButton/FloatingIconButton";
import { ResetPasswordSchema } from "@/lib/Zod_Schemas/Auth_Schemas/ResetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Repeat2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ResetPasswordAction } from "@/lib/Server_Actions/Auth_Actions/ResetPassword.action";
import Link from "next/link";
// ============================================================================================
function FormResetPassword({
  verificationToken,
}: {
  verificationToken: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    setServerError("");
    setServerSuccess("");
    const result = await ResetPasswordAction(verificationToken, data);
    setLoading(false);
    if (!result.success) return setServerError(result.message);
    setServerSuccess(result.message);
  };
  return (
    <div className="ring text-white ring-gray-50/30 boxChangePassword bg-white/10 rounded-2xl md:w-120 sm:w-[60%] w-[80%] p-4">
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="flex flex-col gap-3"
      >
        <ChangePasswordFormField
          id="newPassword"
          label="كلمة المرور الجديدة"
          error={errors.newPassword?.message}
          register={register}
          disbaled={loading}
          placeholder="أكتب كلمة السر الجديدة"
        />
        <ChangePasswordFormField
          id="confirmPassword"
          label="تأكيد كلمة السر"
          error={errors.confirmPassword?.message}
          register={register}
          disbaled={loading}
          placeholder="أعد كتابة كلمة السر الجديدة"
        />
        {serverError && <AlertMessage type="error" message={serverError} />}
        {serverSuccess && (
          <p className="w-full flex items-center gap-2 justify-center rounded-md sm:text-xs text-[11px] ring text-center ring-green-500/40 p-2 text-green-400">
            {serverSuccess}
          </p>
        )}
        <FloatingIconButton
          bgColor="bg-indigo-500"
          label="إعادة تعيين كلمة السر"
          textColor="text-indigo-500"
          Icon={Repeat2}
          loadingText="جاري تغيير كلمة السر . . ."
          loading={loading}
        />
        <span className="w-full h-px bg-white/5 rounded-full block my-3 " />
          <Link
          href={"/login"}
          className="font-semibold py-1.5 px-3 w-fit mx-auto rounded-md ring ring-gray-50/20 shadow bg-white/5 text-xs hover:bg-white/15 mytransition"
        >
         إعادة تسجيل الدخول
        </Link>
      </form>
    </div>
  );
}

export default FormResetPassword;
