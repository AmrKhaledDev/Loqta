export const formatActiveProductsCount = (activeProductsCount: number) => {
  if (activeProductsCount === 1) return `منتج واحد`;
  if (activeProductsCount === 2) return `منتجان`;
  if (activeProductsCount >= 3 && activeProductsCount <= 10) return `${activeProductsCount} منتجات`;
  return `${activeProductsCount} منتج`;
};
