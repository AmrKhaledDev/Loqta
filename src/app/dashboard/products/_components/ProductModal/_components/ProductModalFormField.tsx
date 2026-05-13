import { Dispatch, SetStateAction } from "react";
// ========================================================
function ProductModalFormField({
  type,
  placeholder,
  label,
  id,
  typeField,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  label: string;
  id: string;
  typeField: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="italic w-fit" htmlFor={id}>
        {label}
      </label>
      {typeField == "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="p-2 resize-none ring focus:ring-2 ring-cyan-400 outline-none focus:ring-white mytransition cursor-pointer  rounded text-white placeholder:text-gray-300"
          placeholder={placeholder}
          id={id}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 ring focus:ring-2 ring-cyan-400 outline-none focus:ring-white mytransition cursor-pointer  rounded text-white placeholder:text-gray-300"
          type={type}
          placeholder={placeholder}
          id={id}
        />
      )}
    </div>
  );
}

export default ProductModalFormField;
