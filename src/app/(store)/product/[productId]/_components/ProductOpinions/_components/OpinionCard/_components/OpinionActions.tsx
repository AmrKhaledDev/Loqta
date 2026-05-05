"use client";

import { Edit, Trash } from "lucide-react";
import ButtonLike from "./ButtonLike";
import { User } from "@prisma/client";
import { OpinionsDbType } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DeleteOpinionAction } from "@/lib/Server_Actions/Delete/DeleteOpinion.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// ============================================
function OpinionActions({
  userSession,
  opinion,
  isEditOpinion,
  setIsEditOpinion,
}: {
  userSession: User | null;
  opinion: OpinionsDbType;
  isEditOpinion: string;
  setIsEditOpinion: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const DeleteOpinion = async () => {
    setDeleteLoading(true);
    const result = await DeleteOpinionAction(opinion.id);
    if (!result.message)
      return toast.error(result.message, { className: "toast-font" });
    router.refresh();
  };
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonEdit, boxEditOpinion"))
          setIsEditOpinion("");
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);
  return (
    <div className="flex items-center gap-2">
      <ButtonLike userSession={userSession} opinion={opinion} />
      {userSession?.id === opinion.userId && (
        <>
          <button
            onClick={DeleteOpinion || editLoading}
            disabled={deleteLoading}
            className="cursor-pointer hover:scale-103 mytransition active:scale-95 text-slate-500 hover:text-slate-400"
          >
            {deleteLoading ? (
              <div className="border-2 size-3.5 rounded-full border-t-transparent border-red-600 animate-spin" />
            ) : (
              <Trash className="size-4" />
            )}
          </button>
          <button
            onClick={() =>
              setIsEditOpinion((prev) =>
                prev === opinion.id ? "" : opinion.id,
              )
            }
            className="cursor-pointer buttonEdit hover:scale-103 mytransition active:scale-95 text-slate-500 hover:text-slate-400"
          >
            <Edit className="size-4" />
          </button>
        </>
      )}
    </div>
  );
}

export default OpinionActions;
