"use client";
import AuthFormField from "@/components/Auth/AuthFormField/AuthFormField";
import AuthRedirect from "@/components/Auth/AuthRedirect/AuthRedirect";
import ButtonSubmit from "@/components/Auth/ButtonSubmit/ButtonSubmit";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { motion } from "framer-motion";
import AuthIcon from "@/components/Auth/AuthIcon/AuthIcon";
import { handleRegister } from "./handleRegister";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/lib/Zod_Schemas/Auth_Schemas/Register.schema";
// ================================================================
function RegisterForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const submit = async (data: any) =>
    handleRegister(data, setLoading, router, setError, setSuccess, reset)
  return (
    <motion.form
      onSubmit={handleSubmit(submit)}
      initial={{ opacity: 1, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="p-5 ring ring-gray-50/15 bg-white/5 rounded-2xl max-w-110 shadow mx-auto flex flex-col items-center gap-5"
    >
      <AuthIcon Icon={UserPlus} />
      <h1 className="font-semibold text-2xl">انشاء حساب</h1>
      <div className="w-full flex flex-col gap-3">
        {error && <AlertMessage type="error" message={error} />}
        {success && <AlertMessage type="success" message={success} />}
        <div className="w-full flex flex-col gap-3">
          <AuthFormField
            type="text"
            placeholder="الاسم الكامل"
            error={errors.name?.message}
            id={"name"}
            register={register}
          />
          <AuthFormField
            type="email"
            placeholder="البريد الإلكتروني"
            error={errors.email?.message}
            id="email"
            register={register}
          />
          <AuthFormField
            type={showPassword ? "text" : "password"}
            placeholder="كلمة السر"
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            error={errors.password?.message}
            id="password"
            register={register}
          />
          <AuthFormField
            type={showConfirmPassword ? "text" : "password"}
            placeholder="تأكيد كلمة السر"
            setShowPassword={setShowConfirmPassword}
            showPassword={showConfirmPassword}
            error={errors.confirmPassword?.message}
            id="confirmPassword"
            register={register}
          />
        </div>
      </div>
      <ButtonSubmit loading={loading} buttonName="تسجيل" />
      <AuthRedirect
        qTxt="لديك حساب بالفعل؟"
        redirectTxt="سجل الدخول"
        redirectUrl="/login"
      />
    </motion.form>
  );
}

export default RegisterForm;
