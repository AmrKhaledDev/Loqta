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
            className="lg:p-3 p-2 whitespace-nowrap font-semibold text-gray-300 text-center lg:text-sm text-xs"
          >
            {title}
          </td>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
