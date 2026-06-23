"use client";
import Image from "next/image";
import Links from "./_components/Links";
import { motion } from "framer-motion";
// ==============================================
function Hero() {
  return (
    <section className=" text-white overflow-x-hidden md:pt-0 pt-3">
      <div className="flex sm:h-[88vh] not-sm:min-h-screen justify-center items-center md:flex-row flex-col md:gap-0 gap-10">
        <div className="flex flex-col md:gap-8 gap-4 items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="block lg:size-4 md:mx-0 mx-auto size-3 bg-indigo-100 rounded-full animate-bounce" />
            <span className="block lg:w-25 w-22 sm:w-30 h-1 bg-indigo-100 rounded-full" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            title="أكتشف أحدث المنتجات مع أفضل التخفيضات"
            className="font-extrabold lg:text-5xl sm:text-4xl text-3xl leading-snug sm:text-start text-center"
          >
            اكتشف أحدث المنتجات <br /> مع أفضل التخفيضات!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            title="تسوق الآن واستمتع بعروض لا تُفوّت على الإلكترونيات، الأزياء، والمنتجات المميزة. احصل على خصومات تصل حتى 50% لفترة محدودة!"
            className="font-normal text-gray-300 md:w-[80%] sm:w-[95%] md:text-start text-center"
          >
            تسوق الآن واستمتع بعروض لا تُفوّت على الإلكترونيات، الأزياء،
            والمنتجات المميزة. احصل على خصومات تصل حتى 50% لفترة محدودة!
          </motion.p>
          <Links />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden lg:w-100 sm:w-140 w-full sm:min-h-50 h-130 relative"
        >
          <Image
            src={"/hero-bg.jpg"}
            alt="hero"
            priority
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 560px, 400px"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
