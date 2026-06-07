function Thead() {
  const titles = [
    "رقم الطلب",
    "إسم صاحب الطلب",
    "عنوان صاحب الطلب",
    "مدينة صاحب الطلب",
    "رقم صاحب الطلب",
    "حالة الطلب",
    "الإجمالي",
    "تاريخ الطلب",
    "عدد المنتجات",
    "الإجراءات",
  ];
  return (
    <thead className="bg-white/10">
      <tr>
        {titles.map((title) => (
          <td
            key={title}
            className="p-3 whitespace-nowrap font-semibold text-gray-300 text-center text-sm"
          >
            {title}
          </td>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
