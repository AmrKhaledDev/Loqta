"use client";

import { Star } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =============================================================
function Rating({
  hover,
  rating,
  setRating,
  setHover,
}: {
  hover: number;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  setHover: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center justify-between border border-gray-50/20 bg-white/5 rounded-md w-70 py-2 px-4">
      <h2 className="text-nowrap text-xs text-gray-300"> التقييم :</h2>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHover(star)}
            onClick={() => setRating((prev) => (prev == star ? 0 : star))}
            onMouseLeave={()=>setHover(0)}
          >
            <Star
              className={`size-5 mytransition hover:scale-110 
                      ${star <= (hover || rating) && " text-yellow-500 fill-yellow-500"} `}
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-yellow-500 font-serif">{rating}</p>
    </div>
  );
}

export default Rating;
