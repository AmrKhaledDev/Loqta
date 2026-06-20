function Thead({ usersType }: { usersType: "ADMINS" | "USERS" }) {
  const primaryThList = [
    "الصورة",
    "الإسم",
    "الإيميل",
    "الدور",
    "تاريخ الإنشاء",
    "الإجراءات",
    "رقم الهاتف",
    "حالة الحساب",
  ];
  const usersThList = [
    ...primaryThList,
    "إجمالي الإنفاق",
    "عدد الطلبات",
    "في السلة",
  ];
  const adminsThList = [...primaryThList];
  const thList = usersType === "USERS" ? usersThList : adminsThList;
  return (
    <thead className="bg-white/5 border-b border-b-gray-50/10">
      <tr>
        {thList.map((t) => (
          <th
            className="lg:p-3 p-2 font-normal text-gray-300 lg:text-sm text-xs whitespace-nowrap"
            key={t}
          >
            {t}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
