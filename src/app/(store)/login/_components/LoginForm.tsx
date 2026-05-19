"use client";
import AuthFormField from "@/components/Auth/AuthFormField/AuthFormField";
import AuthRedirect from "@/components/Auth/AuthRedirect/AuthRedirect";
import ButtonSubmit from "@/components/Auth/ButtonSubmit/ButtonSubmit";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { motion } from "framer-motion";
import AuthIcon from "@/components/Auth/AuthIcon/AuthIcon";
import handleLogin from "./handleLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/Zod_Schemas/Auth_Schemas/Login.schema";
import z from "zod";
// ===================================================================
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const submit = (data: z.infer<typeof LoginSchema>) => {
    handleLogin(data, setLoading, setError, setSuccess, router);
  };
  return (
    <motion.form
      initial={{ opacity: 1, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(submit)}
      className="p-5 ring ring-gray-50/15 bg-white/5 rounded-2xl max-w-110 shadow mx-auto flex flex-col items-center gap-5"
    >
      <AuthIcon Icon={User} />
      <h1 className="font-semibold md:text-2xl sm:text-xl">تسجيل الدخول</h1>
      <div className="w-full flex flex-col gap-3">
        {error && <AlertMessage type="error" message={error} />}
        {success && <AlertMessage type="success" message={success} />}
        <div className="w-full flex flex-col gap-3">
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
            register={register}
            id="password"
          />
          <Link
            href={"/forgot-password"}
            className="text-sm text-indigo-200 hover:underline mx-auto w-fit"
          >
            نسيت كلمة السر؟
          </Link>
        </div>
      </div>
      <ButtonSubmit loading={loading} buttonName="تسجيل الدخول" />
      <AuthRedirect
        qTxt="ليس لديك حساب؟"
        redirectTxt="انشاء حساب"
        redirectUrl="/register"
      />
    </motion.form>
  );
}

export default LoginForm;
