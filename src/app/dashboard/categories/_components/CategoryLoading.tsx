function CategoryLoading() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="ring ring-gray-50/10 bg-white/5 relative animate-pulse overflow-hidden h-40 rounded-2xl flex items-center flex-col justify-between"
          >
            <div className="w-full flex flex-col h-full justify-center gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-3 w-full px-4">
                    <span className="w-[40%] h-2 bg-gray-300/20 block rounded-full" />
                    <span className="flex-1 h-2 bg-gray-300/20 block rounded-full" />
                  </div>
                ))}
            </div>
            <span className="w-[50%] h-2 block bg-gray-300/20 rounded-full mb-4" />
          </div>
        ))}
    </div>
  );
}

export default CategoryLoading;
