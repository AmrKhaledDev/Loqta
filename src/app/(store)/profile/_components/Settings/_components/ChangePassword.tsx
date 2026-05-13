"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";
// =====================================================
function ChangePassword({ disabled }: { disabled: boolean }) {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, .boxChangePassword")) setModal(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <div>
      <div className="text-white flex items-center gap-5 py-3">
        <h2>كلمة السر : ********</h2>
        <button
          onClick={() => setModal(true)}
          disabled={disabled}
          className="text-white button disabled:text-gray-600 mytransition not-disabled:hover:bg-white/15 ring ring-gray-50/20 bg-white/5 py-2 px-6 text-xs not-disabled:cursor-pointer rounded-md"
        >
          تغيير كلمة السر
        </button>
      </div>
      {modal && <Modal setModal={setModal} />}
    </div>
  );
}

export default ChangePassword;
