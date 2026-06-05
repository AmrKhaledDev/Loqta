"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { ForgotPasswordAction } from "@/lib/Server_Actions/Auth_Actions/ForgotPassword.action";
import { FormEvent, useState } from "react";
// ============================================================
function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSendVerificationToken = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const result = await ForgotPasswordAction(email);
    setLoading(false)
    if (!result.success) return setError(result.message);
    setSuccess(result.message);
  };
  return (
    <form
      onSubmit={handleSendVerificationToken}
      className="w-100 ring ring-gray-50/20 flex flex-col gap-5 bg-white/5 rounded-2xl p-5 mx-auto"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-2xl">نسيت كلمة مروري</h2>
        <p className="text-sm font-normal text-gray-300">
          أدخل الإيميل وسيتم إرسال رابط تحقق خاص بك.
        </p>
      </div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="border border-gray-50/20 rounded-xl outline-none focus:border-cyan-300 mytransition cursor-pointer py-2 px-4"
        placeholder="البريد الإلكتروني"
      />
      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}
      <button
        type="submit"
        disabled={loading}
        className="bg-cyan-600 rounded-xl disabled:bg-gray-300 disabled:text-gray-500 not-disabled:hover:scale-103 not-disabled:hover:bg-cyan-400 mytransition not-disabled:cursor-pointer shadow py-4 font-semibold"
      >
        {loading ? "برجاء الإنتظار . . ." : " إرسال الرابط"}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
