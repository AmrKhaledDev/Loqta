import { OpinionDBType } from "@/lib/types/types";
import { Star } from "lucide-react";
// =============================================
function OpinionStars({opinion}:{opinion:OpinionDBType}) {
  return (
    <div className="flex items-center gap-1">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            className={`size-4.5 
                        ${i + 1 <= opinion.rating ? "fill-yellow-400 text-yellow-400" : " text-slate-700"}
                        `}
          />
        ))}
    </div>
  );
}

export default OpinionStars;
