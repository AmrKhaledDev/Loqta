"use client";

import { useState } from "react";
import OpinionInput from "./_components/OpinionInput";
import Rating from "./_components/Rating";
import Opinions from "./_components/Opinions";
import { User } from "@prisma/client";
import { OpinionsDbType } from "@/lib/types";
import { CreateOpinionAction } from "@/lib/Server_Actions/Create_Actions/CreateOpinion.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// =======================================================================
function ProductOpinions({
  opinions,
  userSession,
  productId,
}: {
  opinions: OpinionsDbType[];
  userSession: User | null;
  productId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState("");
  const [hover, setHover] = useState(0);
  const CreateOpinion = async () => {
    setLoading(true);
    const result = await CreateOpinionAction(opinion, productId, rating);
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    setOpinion("");
    setRating(0);
    toast.success(result.message, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-semibold text-xl text-white">
        ماذا قال العملاء عن هذا المنتج؟
      </h2>
      <div className="flex flex-col gap-4">
        {userSession && (
          <div className="flex items-center gap-10 flex-1">
            <OpinionInput
              disabled={loading}
              value={opinion}
              onChange={setOpinion}
              handle={CreateOpinion}
            />
            <Rating
              hover={hover}
              rating={rating}
              setRating={setRating}
              setHover={setHover}
            />
          </div>
        )}
        {opinions.length > 0 ? (
          <Opinions opinions={opinions} userSession={userSession} />
        ) : (
          <p className="text-gray-400 font-bold">كن أول من يُبدي رأيه</p>
        )}
      </div>
    </div>
  );
}

export default ProductOpinions;
