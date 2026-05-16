"use client";

import { DeleteUserImageProfileAction } from "@/lib/Server_Actions/Delete/DeleteUserImageProfile.action";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
// ===================================================================
function DeleteImageButton({
  setImagePrev,
  imageFile,
  setImageFile,
}: {
  setImagePrev: Dispatch<SetStateAction<string>>;
  imageFile: File | null;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const DeleteImage = async () => {
    try {
      setLoading(true);
      const result = await DeleteUserImageProfileAction();
      if (!result.success)
        return toast.error(result.message, { className: "toast-font" });
      toast.success(result.message, { className: "toast-font" });
      setImagePrev("");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء حذف الصورة الخاصة بك", {
        className: "toast-font",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={() => {
        if (imageFile) {
          setImageFile(null);
          setImagePrev("");
          return;
        }
        DeleteImage();
      }}
      className="absolute right-2.5 disabled:bg-red-300 disabled:animate-pulse disabled:text-red-100 bottom-2.5 not-disabled:active:scale-95 not-disabled:hover:scale-105 mytransition z-40 bg-red-500 p-1 rounded-full text-white shadow not-disabled:cursor-pointer"
    >
      <Trash2 className="size-5" />
    </button>
  );
}

export default DeleteImageButton;
