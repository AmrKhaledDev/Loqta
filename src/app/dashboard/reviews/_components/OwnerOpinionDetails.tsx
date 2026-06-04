import { OpinionDBType } from "@/lib/types/types";
import Image from "next/image";
// ==================================================
function OwnerOpinionDetails({opinion}:{opinion:OpinionDBType}) {
  return (
    <div className="flex items-center gap-3">
      {opinion.user.image ? (
        <Image
          src={opinion.user.image}
          alt="user image"
          width={60}
          height={60}
          className="rounded-full object-cover size-9 ring ring-gray-50/50"
        />
      ) : (
        <div className="size-9 rounded-full text-white bgg-ip flex items-center justify-center capitalize font-bold text-[17px]">
          {opinion.user.name.slice(0, 1)}
        </div>
      )}
      <h2 className="line-clamp-1 capitalize font-semibold">
        {opinion.user.name}
      </h2>
    </div>
  );
}

export default OwnerOpinionDetails;
