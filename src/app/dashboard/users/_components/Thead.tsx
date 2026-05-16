function Thead() {
  const thList = [
    "الصورة",
    "الإسم",
    "الإيميل",
    "الدور",
    "تاريخ الإنشاء",
    "الإجراءات",
    "رقم الهاتف",
    "إجمالي الإنفاق",
    "عدد الطلبات",
    "في السلة",
  ];
  return (
    <thead className="bg-white/5 border-b border-b-gray-50/10">
      <tr>
        {thList.map((t) => (
          <th className="p-3 font-normal text-gray-200" key={t}>
            {t}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
