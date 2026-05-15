"use client";

function CheckBox({
  
  label,
}: {
  
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
       
        type="checkbox"
        id="isOnSale"
        className="size-4 cursor-pointer appearance-none border border-cyan-400 rounded
          checked:bg-cyan-400 relative
             checked:after:content-['✔']
             checked:after:text-[13px]
             checked:after:absolute
             checked:after:text-white
             checked:after:top-1/2
             checked:after:left-1/2
             checked:after:-translate-y-1/2
             checked:after:-translate-x-1/2
            "
      />
      <label htmlFor="isOnSale" className="font-bold">
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
