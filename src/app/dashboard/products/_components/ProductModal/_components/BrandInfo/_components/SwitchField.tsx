"use client";

// =======================================================================
function SwitchField({
  brandLogoIsImage,
  setValue,
}: {
  brandLogoIsImage: boolean;
  setValue: any;
}) {
  return (
    <div className="flex items-center gap-2">
      <h4 className="text-sm font-bold">رابط</h4>
      <div
        className={`ring relative  py-2.5 w-15 rounded-full ${brandLogoIsImage ? "bg-white/10 ring-gray-50/20 " : "bg-cyan-400/30  ring-cyan-500/20"} `}
      >
        <button
          onClick={() => setValue("brandLogoIsImage", !brandLogoIsImage)}
          type="button"
          className={`absolute cursor-pointer mytransition top-1/2 ${brandLogoIsImage ? "bg-white" : "translate-x-10 bg-cyan-400"} -translate-y-1/2 left-1 size-3 rounded-full }`}
        />
      </div>
    </div>
  );
}

export default SwitchField;
