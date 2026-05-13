"use client";
function ButtonSubmit({
  buttonName,
  loading,
}: {
  buttonName: string;
  loading: boolean;
}) {
  return (
    <button
      disabled={loading}
      className="py-2 w-full sm:text-[15px] text-sm disabled:cursor-default flex items-center justify-center not-disabled:active:scale-95 mytransition bg-linear-to-r from-pink-700 to-indigo-700 shadow disabled:from-indigo-300 disabled:to-pink-300 not-disabled:hover:bgg-ip rounded-md cursor-pointer my-3"
    >
      {loading ? (
        <div className="border-3 border-white rounded-full border-t-transparent animate-spin size-5" />
      ) : (
        buttonName
      )}
    </button>
  );
}

export default ButtonSubmit;
