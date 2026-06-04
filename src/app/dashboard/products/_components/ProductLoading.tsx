
function ProductLoading() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/5 flex flex-col gap-4 animate-pulse "
          >
            <span className="w-full h-30 rounded-md mx-auto bg-gray-300/20 block" />
            <div className="flex items-center gap-2">
              <span className="w-[60%] bg-gray-300/20 h-2 rounded-full block" />
              <span className="flex-1 bg-gray-300/20 h-2 rounded-full block" />
            </div>
            <span className="w-full bg-gray-300/20 h-4 rounded-full block" />
            <div className="flex items-center gap-2">
              <span className="w-full bg-gray-300/20 h-2 rounded-full block" />
              <span className="w-full bg-gray-300/20 h-2 rounded-full block" />
              <span className="w-full bg-gray-300/20 h-2 rounded-full block" />
            </div>
            <span className="w-20 bg-gray-300/20 h-2 rounded-full block" />
            <span className="w-full bg-gray-300/20 h-2 rounded-full block" />
          </div>
        ))}
    </div>
  );
}

export default ProductLoading;
