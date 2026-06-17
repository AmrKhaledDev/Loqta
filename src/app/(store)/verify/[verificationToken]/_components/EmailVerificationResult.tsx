function EmailVerificationResult() {
  return (
    <div className="w-100 bg-white rounded-2xl relative gap-5 p-8 h-fit shadow overflow-hidden flex items-center justify-between flex-col">
      <div className="absolute top-0 w-full h-2.5 bg-linear-to-r from-green-400 to-green-600" />
      <div className="flex flex-col items-center gap-6 mt-3">
        <CheckCircle2 className="text-2xl text-green-500 animate-pulse shrink-0 p-4 size-20 rounded-full bg-green-50 shadow" />
        <h2 className="font-semibold text-2xl">تم تفعيل الحساب بنجاح!</h2>
        <p className="text-center text-gray-600 font-normal text-sm">
          {result.message}
        </p>
        <Link
          href={"/login"}
          className="flex items-center hover:bg-slate-600 mytransition gap-4 py-3 w-full justify-center rounded-xl bg-slate-900 shadow text-white"
        >
          تسجيل الدخول إلى المتجر <ShoppingBag />
        </Link>
        <Link
          href={"/"}
          className="flex items-center gap-3 hover:text-black mytransition text-sm text-gray-500 font-normal group"
        >
          <ArrowRight className="size-4 group-hover:translate-x-1 mytransition" />
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
  );
}

export default EmailVerificationResult;
