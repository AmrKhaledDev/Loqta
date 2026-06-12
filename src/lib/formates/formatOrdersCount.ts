export const formateOrdersCount = (ordersCount: number) => {
  if (ordersCount === 1) return `طلب واحد`;
  if (ordersCount === 2) return `طلبان`;
  if (ordersCount >= 3 && ordersCount <= 10) return `${ordersCount} طلبات`;
  return `${ordersCount} طلب`;
};
