"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
// ==================================================
function Links() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 250 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-3"
    >
      <Link
        href={"/categories"}
        title="تسوق الآن"
        className="flex sm:text-[15px] text-xs items-center gap-2 w-fit bg-indigo-500 sm:py-3 py-2 sm:px-6 px-5 rounded-md font-semibold shadow hover:scale-105 active:scale-95 mytransition"
      >
        <ShoppingCart className="md:size-6 size-4.5" /> تسوق الآن
      </Link>
      <Link
        href={"/offers"}
        title="تصفح الخصومات"
        className="w-fit sm:text-[15px] text-xs ring ring-gray-50/20 bg-white/5 sm:py-3 py-2 sm:px-6 px-5 rounded-md font-semibold shadow mytransition hover:scale-105 active:scale-95"
      >
        تصفح الخصومات
      </Link>
    </motion.div>
  );
}

export default Links;
