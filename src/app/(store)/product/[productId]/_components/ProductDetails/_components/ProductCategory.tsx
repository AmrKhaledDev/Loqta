function ProductCategory({ category }: { category: string }) {
  return (
    <p>
      الفئة :
      <span className="font-bold bgg-ip px-6 rounded shadow mr-2 text-sm">
        {category}
      </span>
    </p>
  );
}

export default ProductCategory;
