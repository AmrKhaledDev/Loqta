"use client";
import { OpinionsDbType } from "@/lib/types";
import { User } from "@prisma/client";
import { Star } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import OpinionActions from "./_components/OpinionActions";
import OpinionImage from "./_components/OpinionImage";
import BoxEditOpinion from "./_components/BoxEditOpinion";
// ==============================================
function OpinionCard({
  opinion,
  userSession,
  isEditOpinion,
  setIsEditOpinion,
}: {
  opinion: OpinionsDbType;
  userSession: User | null;
  isEditOpinion: string;
  setIsEditOpinion: Dispatch<SetStateAction<string>>;
}) {
  return (
    <li
      key={opinion.id}
      className="flex bg-black p-3 rounded-2xl w-180 ring ring-gray-50/10 gap-3 relative"
    >
      <OpinionImage opinion={opinion} />
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-[17px] capitalize text-white">
          {opinion.user.name}
        </h2>
        {isEditOpinion === opinion.id ? (
          <BoxEditOpinion
            setIsEditOpinion={setIsEditOpinion}
            opinion={opinion}
          />
        ) : (
          <p className="text-gray-300 text-sm">{opinion.opinion}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Star
                  key={index}
                  className={`size-4.5 
                        ${index + 1 <= opinion.rating ? "fill-yellow-400 text-yellow-400" : " text-slate-700"}
                        `}
                />
              ))}
          </div>
          <OpinionActions
            isEditOpinion={isEditOpinion}
            setIsEditOpinion={setIsEditOpinion}
            opinion={opinion}
            userSession={userSession}
          />
        </div>
      </div>
    </li>
  );
}

export default OpinionCard;
