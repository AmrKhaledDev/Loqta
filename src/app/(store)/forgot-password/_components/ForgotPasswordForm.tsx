"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { ForgotPasswordAction } from "@/lib/Server_Actions/Auth_Actions/ForgotPassword.action";
import { MailCheck } from "lucide-react";
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
    setLoading(false);
    if (!result.success) return setError(result.message);
    setSuccess(result.message);
  };
  return (
    <form
      onSubmit={handleSendVerificationToken}
      className="md:w-120 sm:w-100 w-[95%] ring ring-gray-50/15 md:min-h-80 sm:min-h-70 min-h-65 flex flex-col gap-5 bg-white/5 rounded-2xl sm:p-8 p-4 mx-auto justify-between"
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-bold md:text-3xl text-2xl">نسيت كلمة السر ؟</h2>
        <p className="font-normal text-gray-300 text-center md:text-[15px] text-sm">
          أدخل البريد الإلكتروني الخاص بك وسيتم إرسال رابط إعادة تعيين كلمة السر
          إلى بريدك الإلكتروني.
        </p>
      </div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="border shadow sm:text-[15px] text-sm border-gray-50/20 rounded-lg outline-none focus:border-gray-50/50 mytransition cursor-pointer py-3 px-4"
        placeholder="اكتب بريدك الإلكتروني"
      />
      {error && <AlertMessage type="error" message={error} />}
      {success && (
        <p className="w-full flex items-center gap-2 justify-center rounded-md sm:text-xs text-[11px] ring text-center ring-green-500/40 p-2 text-green-400">
          {success}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-cyan-600 rounded-xl flex items-center justify-center gap-3 md:text-[15px] text-sm disabled:bg-gray-300 disabled:text-gray-500 not-disabled:hover:scale-101 not-disabled:hover:bg-cyan-500 mytransition not-disabled:cursor-pointer shadow py-4 font-semibold"
      >
        {loading ? "برجاء الإنتظار . . ." : " إرسال الرابط"}
        <MailCheck />
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
