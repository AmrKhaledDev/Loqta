"use client";
import AuthFormField from "@/components/AuthFormField/AuthFormField";
import AuthRedirect from "@/components/AuthRedirect/AuthRedirect";
import ButtonSubmit from "@/components/ButtonSubmit/ButtonSubmit";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { motion } from "framer-motion";
import { RegisterErrors } from "@/lib/types";
import AuthIcon from "@/components/AuthIcon/AuthIcon";
import { handleRegister } from "./handleRegister";
// ================================================================
function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [success, setSuccess] = useState("");
  const submit = async (e: FormEvent) =>
    handleRegister(
      e,
      setLoading,
      setName,
      setEmail,
      setPassword,
      setConfirmPassword,
      router,
      setErrors,
      setSuccess,
      name,
      email,
      password,
      confirmPassword,
    );
  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 1, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="p-5 ring ring-gray-50/15 bg-white/5 rounded-2xl max-w-110 shadow mx-auto flex flex-col items-center gap-5"
    >
      <AuthIcon Icon={UserPlus} />
      <h1 className="font-semibold text-2xl">انشاء حساب</h1>
      <div className="w-full flex flex-col gap-3">
        {errors.serverError && (
          <AlertMessage type="error" message={errors.serverError} />
        )}
        {success && <AlertMessage type="success" message={success} />}
        <div className="w-full flex flex-col gap-3">
          <AuthFormField
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={setName}
            error={errors.name}
          />
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
          <AuthFormField
            type={showConfirmPassword ? "text" : "password"}
            placeholder="تأكيد كلمة السر"
            setShowPassword={setShowConfirmPassword}
            showPassword={showConfirmPassword}
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
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
