export const formatCustomersCount = (customersCount: number) => {
  if (customersCount === 1) return `عميل واحد`;
  if (customersCount === 2) return `عميلان`;
  if (customersCount >= 3 && customersCount <= 10) return `${customersCount} عملاء`;
  return `${customersCount} عميل`;
};
