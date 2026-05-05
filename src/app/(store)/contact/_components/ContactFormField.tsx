function ContactFormField({
  placeholder,
  type,
  label,
  typeField,
  id,
}: {
  placeholder: string;
  type: string;
  label: string;
  typeField: "input" | "textarea";
  id: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      {typeField == "input" ? (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="py-2 text-sm px-2 border border-gray-50/20 rounded-md outline-none focus:border-gray-50/40 cursor-pointer mytransition"
        />
      ) : (
        <textarea
          placeholder="أكتب رسالتك / شكوتك وسيتم الرد عليك في أقرب وقت"
          rows={8}
          id={id}
          className="py-3 text-sm outline-none px-4 border border-gray-50/20 rounded-md focus:border-gray-50/40 cursor-pointer mytransition"
        />
      )}
    </div>
  );
}

export default ContactFormField;
