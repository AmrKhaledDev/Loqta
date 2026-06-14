function StagnantProductsThead() {
  const titles = [
    "الترتيب",
    "المنتج",
    "المخزون",
    "السعر",
    "عدد الطلبات",
    "تاريخ الإنشاء",
  ];
  return (
    <thead className="border-b border-b-gray-50/10 bg-white/5">
      <tr>
        {titles.map((title) => (
          <th
            key={title}
            className="p-3 whitespace-nowrap font-normal text-gray-400 text-center"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default StagnantProductsThead;
