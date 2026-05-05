import { Metadata } from "next";
import ContactForm from "./_components/ContactForm";
// ===========================================================
export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق متجر لُقطة للاستفسارات أو الدعم، وسنرد عليك في أقرب وقت.",
};
function Contact() {
  return (
    <main className="text-white section-p">
      <div className="mycontainer flex justify-center items-center">
        <ContactForm />
      </div>
    </main>
  );
}

export default Contact;
