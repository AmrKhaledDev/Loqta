function UserPhone({ phone }: { phone: string | null | undefined }) {
  return (
    <td className="font-mono font-bold text-sm">
      <span
        className={` bg-white/5 ring ring-gray-50/10 py-1.5 px-4 rounded-lg ${phone ? "text-gray-200" : "text-red-400/60"}`}
      >
        {phone ? phone : "غير معروف"}
      </span>
    </td>
  );
}

export default UserPhone;
