"use client";
import { CreateLikeAction } from "@/lib/Server_Actions/Create_Actions/CreateLike.action";
import { OpinionsDbType } from "@/lib/types";
import { User } from "@prisma/client";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// ============================================
function ButtonLike({
  userSession,
  opinion,
}: {
  userSession: User | null;
  opinion: OpinionsDbType;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const CreateLike = async () => {
    setLoading(true);
    const result = await CreateLikeAction(opinion.id);
    setLoading(false);
    if (!result.success) return;
    router.refresh();
  };
  const isExistingLike = opinion.likes.find(
    (like) => like.userId === userSession?.id,
  );
  return (
    <button disabled={loading} className="flex items-center gap-1.5 text-white">
      <ThumbsUp
        onClick={() => {
          if (!userSession) return router.push("/login");
          CreateLike();
        }}
        className={`size-4.5 cursor-pointer ${isExistingLike ? "text-blue-300 fill-blue-900" : ""} `}
      />
      <span className="font-serif">{opinion.likes.length}</span>
    </button>
  );
}

export default ButtonLike;
