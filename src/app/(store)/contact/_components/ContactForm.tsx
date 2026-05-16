"use client";
import { contactInputs } from "@/lib/data/ContactInputs";
import ContactFormField from "./ContactFormField";
import ContactHead from "./ContactHead";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
// ===================================================
function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const inputs = contactInputs();
  const submit = (data: any) => {
    console.log(data);
  };
  return (
    <motion.form
      onSubmit={handleSubmit(submit)}
      initial={{ opacity: 0, y: 70 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-170 shadow-2xl flex flex-col gap-10 p-5 bg-white/5 ring ring-gray-50/20 rounded-md"
    >
      <ContactHead />
      <div className="flex flex-col gap-4">
        {inputs.map((field) => (
          <ContactFormField
            key={field.id}
            placeholder={field.placeholder}
            type={field.type}
            label={field.label}
            typeField={field.typeField}
            id={field.id}
            register={register}
          />
        ))}
      </div>
      <button className="py-4 bg-white/15 hover:bg-white/25 mytransition hover:ring-gray-50/50 ring ring-gray-50/40 font-semibold shadow rounded-lg cursor-pointer">
        إرسال الرسالة
      </button>
    </motion.form>
  );
}

export default ContactForm;
