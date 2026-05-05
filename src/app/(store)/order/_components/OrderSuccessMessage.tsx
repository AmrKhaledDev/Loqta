"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
// =============================================================
function OrderSuccessMessage({
  orderSuccess,
  setOrderSuccess,
}: {
  orderSuccess: boolean;
  setOrderSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  const [progress, setProgress] = useState(100);
  const DURATION = 7000;

  useEffect(() => {
    if (orderSuccess) {
      const animationTimeout = setTimeout(() => {
        setProgress(0);
      }, 50);
      const closeTimeout = setTimeout(() => {
        setOrderSuccess(false);
      }, DURATION);
      return () => {
        clearTimeout(animationTimeout);
        clearTimeout(closeTimeout);
      };
    }
  }, [orderSuccess, setOrderSuccess]);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".boxSuccess")) setOrderSuccess(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true }}
      className="fixed inset-0 backdrop-blur flex items-center justify-center min-h-screen bg-black/30 z-60"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="bg-white/10 backdrop-blur boxSuccess ring ring-gray-50/20 relative shadow w-150 flex flex-col items-center justify-center rounded-xl gap-5 py-15 overflow-hidden"
      >
        <Image
          src={"/checked.png"}
          alt="checked"
          width={200}
          height={200}
          loading="eager"
          className="size-30 p-2 bg-white rounded-full shadow animate-pulse"
        />
        <h2 className="font-black text-4xl text-white">
          تم <span className="text-green-400">نجاح</span> إتمام الطلب
        </h2>
        <p className="font-semibold text-white">
          سيتم الإتصال على الرقم الخاص بك لتأكيد الطلب
        </p>
        <span className="flex items-center gap-2 font-semibold">
          حالة الطلب :
          <span className="bg-white py-2 px-6 text-xs text-slate-700 font-black rounded shadow">
            قيد الإنتظار
          </span>
        </span>
        <div
          style={{
            width: `${progress}%`,
            transition: `width ${DURATION}ms linear`,
          }}
          className="absolute left-0 bottom-0 h-1 bg-white"
        />
      </motion.div>
    </motion.div>
  );
}

export default OrderSuccessMessage;
