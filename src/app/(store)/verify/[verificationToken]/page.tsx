import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight, XCircle } from "lucide-react";
import { UserEmailVerifyAction } from "@/lib/Server_Actions/Auth_Actions/UserEmailVerify.action";
import { Metadata } from "next";
// ======================================================================================
export const metadata: Metadata = {
  title: "لُقطة | التحقق من بريدك",
  description:
    "تأكيد وتفعيل حسابك الشخصي؛ جاري التحقق من الرابط لتأمين بريدك الإلكتروني والبدء في استخدام كافة مميزات المتجر فوراً.",
};
async function Page({
  params,
}: {
  params: Promise<{ verificationToken: string }>;
}) {
  const { verificationToken } = await params;
  const result = await UserEmailVerifyAction(verificationToken);
  const Icon = result.success ? CheckCircle2 : XCircle;
  return (
    <main className="flex items-center justify-center h-[90vh]">
      <div className="sm:w-105 w-[90%] bg-white rounded-2xl relative gap-5 p-8 h-fit shadow overflow-hidden flex items-center justify-between flex-col">
        <div className="absolute top-0 w-full h-2.5 bg-linear-to-r from-green-400 to-green-600" />
        <div className="flex flex-col items-center md:gap-6 gap-4 mt-3 w-full">
          <Icon
            className={`text-2xl ${result.success ? "text-green-500 bg-green-50 " : "text-red-500 bg-red-50 "} animate-pulse shrink-0 p-4 md:size-20 size-17 rounded-full shadow`}
          />
          <h2
            className={`font-extrabold md:text-2xl text-xl ${result.success ? "text-green-500" : " text-red-500"}`}
          >
            {result.success
              ? "تم تفعيل الحساب بنجاح!"
              : "عذراً، فشل تفعيل الحساب!"}
          </h2>
          <p className="text-center text-gray-600 font-normal text-sm">
            {result.message}
          </p>
          <Link
            href={"/login"}
            className="flex items-center md:text-[15px] text-sm hover:bg-slate-600 mytransition gap-4 py-3 w-full justify-center md:rounded-xl rounded-lg bg-slate-900 shadow text-white"
          >
            تسجيل الدخول إلى المتجر{" "}
            <ShoppingBag className="md:size-5.5 size-5" />
          </Link>
          <Link
            href={"/"}
            className="flex items-center gap-3 hover:text-black mytransition text-sm text-gray-500 font-normal group"
          >
            <ArrowRight className="size-4 group-hover:translate-x-1 mytransition" />{" "}
            العودة للرئيسية
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-5 w-full items-center mt-4 h-full">
          <span className="w-full h-px bg-gray-300/30 block rounded-full" />
          <p className="text-xs text-slate-600">
            شكراً لثقتك واختيارك متجرنا الرقمي
          </p>
        </div>
      </div>
    </main>
  );
}

export default Page;
