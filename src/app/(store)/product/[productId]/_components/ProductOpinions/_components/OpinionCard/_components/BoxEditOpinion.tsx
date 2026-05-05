"use client";

import { EditOpinionAction } from "@/lib/Server_Actions/Edit/EditOpinion.action";
import { OpinionsDbType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
//========================================================
function BoxEditOpinion({
  setIsEditOpinion,
  opinion,
}: {
  setIsEditOpinion: Dispatch<SetStateAction<string>>;
  opinion: OpinionsDbType;
}) {
  const router = useRouter();
  const [newOpinion, setNewOpinion] = useState(opinion.opinion);
  const [loading, setLoading] = useState(false);
  const editOpinion = async () => {
    setLoading(true);
    const result = await EditOpinionAction(opinion.id, newOpinion);
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    setIsEditOpinion("");
    toast.success(result.message, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div className="flex items-center justify-between boxEditOpinion border border-white rounded-md overflow-hidden">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") editOpinion();
        }}
        value={newOpinion}
        className="text-xs py-1.5 px-2 flex-1 outline-none text-gray-300"
        onChange={(e) => setNewOpinion(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={editOpinion}
        className="text-xs ring  ring-gray-50/30 ml-1 hover:bg-white/20 mytransition bg-white/15 cursor-pointer rounded-full py-0.5 px-2"
      >
        تعديل
      </button>
    </div>
  );
}

export default BoxEditOpinion;
