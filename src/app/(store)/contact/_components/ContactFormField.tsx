function ContactFormField({
  placeholder,
  type,
  label,
  typeField,
  id,
  register,
}: {
  placeholder: string;
  type: string;
  label: string;
  typeField: string;
  id: string;
  register: any;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      {typeField == "textarea" ? (
        <textarea
          {...register(id)}
          placeholder="أكتب رسالتك / شكوتك وسيتم الرد عليك في أقرب وقت"
          rows={8}
          id={id}
          className="py-3 text-sm outline-none px-4 border border-gray-50/20 rounded-md focus:border-gray-50/40 cursor-pointer mytransition"
        />
      ) : (
        <input
          type={type}
          id={id}
          {...register(id)}
          placeholder={placeholder}
          className="py-2 text-sm px-2 border border-gray-50/20 rounded-md outline-none focus:border-gray-50/40 cursor-pointer mytransition"
        />
      )}
    </div>
  );
}

export default ContactFormField;
