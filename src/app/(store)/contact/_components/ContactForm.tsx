"use client";
import ContactFormField from "./ContactFormField";
import ContactHead from "./ContactHead";
import { motion } from "framer-motion";
// ===================================================
function ContactForm() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 70 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-170 shadow-2xl flex flex-col gap-10 p-5 bg-white/5 ring ring-gray-50/20 rounded-md"
    >
      <ContactHead />
      <div className="flex flex-col gap-4">
        <ContactFormField
          placeholder="أكتب إسمك ثلاثي"
          type="text"
          label="إسمك ثلاثي"
          typeField="input"
          id="name"
        />
        <ContactFormField
          placeholder="أكتب بريدك الإلكتروني"
          type="text"
          label="بريدك الإلكتروني"
          typeField="input"
          id="email"
        />
        <ContactFormField
          placeholder="أكتب رقم هاتفك"
          type="text"
          label="رقم الهاتف"
          typeField="input"
          id="phone"
        />
        <ContactFormField
          placeholder="أكتب رقم هاتف أخرى "
          type="text"
          label="رقم هاتف آخر ( إختياري )"
          typeField="input"
          id="phone_2"
        />
        <ContactFormField
          placeholder="أكتب رسالتك / شكوتك وسنرد عليك في أسرع وقت"
          type="text"
          label="رسالتك :"
          typeField="textarea"
          id="message"
        />
      </div>
      <button className="py-4 bg-white/15 hover:bg-white/25 mytransition hover:ring-gray-50/50 ring ring-gray-50/40 font-semibold shadow rounded-lg cursor-pointer">
        إرسال الرسالة
      </button>
    </motion.form>
  );
}

export default ContactForm;
