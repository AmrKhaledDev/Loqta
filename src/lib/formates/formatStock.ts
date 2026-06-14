export const formatStock = (stock: number) => {
  if (stock === 1) return `قطعة`;
  if (stock === 2) return `قطعتان`;
  if (stock >= 3 && stock <= 10) return `قطع`;
  return `قطعة`;
};
