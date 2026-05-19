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
      className={`mt-4 py-3 disabled:bg-gray-300 group disabled:text-gray-500 w-60 pl-8 shadow-2xl relative mx-auto rounded-md ${bgColor} mytransition not-disabled:hover:scale-102 not-disabled:cursor-pointer font-semibold`}
    >
      {loading ? loadingText : label}
      <Icon
        className={`p-3 size-12.5 shadow bg-white rounded-full absolute -left-3 -top-px group-disabled:text-gray-500 ${textColor}`}
      />
    </button>
  );
}

export default FloatingIconButton;
