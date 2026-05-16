import DashAlertMessage from "@/app/dashboard/_components/DashAlertMessage/DashAlertMessage";
// ========================================================================================
function ProductModalFormField({
  type,
  placeholder,
  label,
  id,
  typeField,
  register,
}: {
  type: string;
  placeholder: string;
  label: string;
  id: string;
  typeField: string;
  register: any;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="italic w-fit" htmlFor={id}>
        {label}
      </label>
      <div className="w-full flex flex-col gap-2">
        {typeField == "textarea" ? (
          <textarea
            rows={6}
            {...register(id)}
            className="p-2 resize-none ring focus:ring-2 ring-cyan-400 outline-none focus:ring-white mytransition cursor-pointer rounded text-white placeholder:text-gray-300"
            placeholder={placeholder}
            id={id}
          />
        ) : (
          <input
            {...register(id)}
            className="p-2 ring focus:ring-2 ring-cyan-400 outline-none focus:ring-white mytransition cursor-pointer rounded text-white placeholder:text-gray-300"
            type={type}
            placeholder={placeholder}
            id={id}
          />
        )}
      </div>
    </div>
  );
}

export default ProductModalFormField;
