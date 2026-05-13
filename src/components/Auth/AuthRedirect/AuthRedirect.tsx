import Link from "next/link";
// ===========================================
function AuthRedirect({
  qTxt,
  redirectUrl,
  redirectTxt,
}: {
  qTxt: string;
  redirectUrl: string;
  redirectTxt: string;
}) {
  return (
    <span className="text-sm text-gray-300 flex items-center gap-2">
      {qTxt}
      <Link
        href={redirectUrl}
        className="font-semibold py-1.5 px-3 rounded-md ring ring-gray-50/20 shadow bg-white/5 text-xs hover:bg-white/15 mytransition"
      >
        {redirectTxt}
      </Link>
    </span>
  );
}

export default AuthRedirect;
