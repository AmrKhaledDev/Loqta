"use client"
function ProductEdit() {
  return (
    <div className="absolute opacity-0 rounded-2xl mytransition border border-cyan-300/40 inset-0 bg-cyan-300/10 backdrop-blur-[2px] group-hover:opacity-100 flex items-center justify-center">
      <button className="bg-white py-2 px-6 rounded-md shadow hover:scale-105 mytransition active:scale-95 cursor-pointer font-bold text-cyan-500">
        تعديل المنتج
      </button>
    </div>
  );
}

export default ProductEdit;
