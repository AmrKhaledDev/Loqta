"use client";

import { EditUserImageProfileAction } from "@/lib/Server_Actions/Edit/EditUserImageProfile.action";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
// ================================================
function SaveImageButton({
  imageFile,
  setImageFile,
}: {
  imageFile: File | null;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const SaveImage = async () => {
    try {
      setLoading(true);
      if (!imageFile)
        return toast.error("برجاء رفع صورة أولاً", { className: "toast-font" });
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("pathname", "Loqta-users-images");
      const image: { error: string } | { url: string } = (
        await axios.post("/api/uploader", formData)
      ).data;
      if ("error" in image)
        return toast.error(image.error, { className: "toast-font" });
      const result = await EditUserImageProfileAction(image.url);
      setImageFile(null);
      router.refresh();
      toast.success(result.message, { className: "toast-font" });
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء حفظ الصورة الخاص بك", {
        className: "toast-font",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={SaveImage}
      disabled={loading}
      className="text-white ring disabled:ring-gray-50/10 disabled:bg-white/3 disabled:text-gray-300 disabled:animate-pulse text-xs not-disabled:active:scale-95 ring-gray-50/20 bg-white/5 rounded-full not-disabled:cursor-pointer py-2 px-6 font-semibold not-disabled:hover:scale-105 mytransition"
    >
      {loading ? "برجاء الإنتظار . . ." : "حفظ الصورة"}
    </button>
  );
}

export default SaveImageButton;
