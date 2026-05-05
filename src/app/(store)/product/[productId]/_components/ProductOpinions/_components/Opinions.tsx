"use client";
import { OpinionsDbType } from "@/lib/types";
import { User } from "@prisma/client";
import OpinionCard from "./OpinionCard/OpinionCard";
import { useState } from "react";

// ==========================================================
function Opinions({
  opinions,
  userSession,
}: {
  opinions: OpinionsDbType[];
  userSession: User | null;
}) {
  const [isEditOpinion, setIsEditOpinion] = useState("");
  return (
    <ul className="flex flex-col gap-2">
      {opinions.map((opinion) => (
        <OpinionCard
          key={opinion.id}
          opinion={opinion}
          userSession={userSession}
          isEditOpinion={isEditOpinion}
          setIsEditOpinion={setIsEditOpinion}
        />
      ))}
    </ul>
  );
}

export default Opinions;
