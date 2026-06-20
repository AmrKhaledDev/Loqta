import { LucideIcon } from "lucide-react";
// =========================================================
function FloatingIconButton({
  label,
  bgColor,
  textColor,
  Icon,
  loading,
  loadingText,
}: {
  label: string;
  bgColor: string;
  textColor: string;
  Icon: LucideIcon;
  loading?: boolean;
  loadingText: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`mt-4 sm:py-3 py-2 disabled:bg-gray-300 group disabled:text-gray-500 sm:w-60 w-50 pl-8 shadow-2xl relative mx-auto rounded-md ${bgColor} mytransition not-disabled:hover:scale-102 not-disabled:cursor-pointer font-semibold`}
    >
      {loading ? loadingText : label}
      <Icon
        className={`sm:p-3 p-2 sm:size-12.5 size-10 shadow bg-white rounded-full absolute -left-3 sm:-top-px top-0 group-disabled:text-gray-500 ${textColor}`}
      />
    </button>
  );
}

export default FloatingIconButton;
