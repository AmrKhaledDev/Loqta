"use client";
import AuthFormField from "@/components/AuthFormField/AuthFormField";
import AuthRedirect from "@/components/AuthRedirect/AuthRedirect";
import ButtonSubmit from "@/components/ButtonSubmit/ButtonSubmit";
import { LoginErrors } from "@/lib/types";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { motion } from "framer-motion";
import AuthIcon from "@/components/AuthIcon/AuthIcon";
import handleLogin from "./handleLogin";
// ===================================================================
function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [success, setSuccess] = useState("");
  const submit = (e: FormEvent) => {
    handleLogin(e, setLoading, setErrors, setSuccess, email, password, router);
  };
  return (
    <motion.form
      initial={{ opacity: 1, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      onSubmit={submit}
      className="p-5 ring ring-gray-50/15 bg-white/5 rounded-2xl max-w-110 shadow mx-auto flex flex-col items-center gap-5"
    >
      <AuthIcon Icon={User} />
      <h1 className="font-semibold md:text-2xl sm:text-xl">تسجيل الدخول</h1>
      <div className="w-full flex flex-col gap-3">
        {errors.serverError && (
          <AlertMessage type="error" message={errors.serverError} />
        )}
        {success && <AlertMessage type="success" message={success} />}
        <div className="w-full flex flex-col gap-3">
          <AuthFormField
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={setEmail}
            error={errors.email}
          />
          <AuthFormField
            type={showPassword ? "text" : "password"}
            placeholder="كلمة السر"
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            value={password}
            onChange={setPassword}
            error={errors.password}
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
