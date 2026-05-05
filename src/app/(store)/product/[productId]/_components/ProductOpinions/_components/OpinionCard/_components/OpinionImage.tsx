import { OpinionsDbType } from "@/lib/types";
import Image from "next/image";
// ===================================================
function OpinionImage({opinion}:{opinion:OpinionsDbType}) {
  return (
    <>
      {opinion.user.image ? (
        <Image
          src={opinion.user.image}
          alt="user image"
          width={60}
          height={60}
          className="rounded-full object-cover size-11 ring ring-gray-50/50"
        />
      ) : (
        <div className="size-11 rounded-full text-white bgg-ip flex items-center justify-center capitalize font-bold text-[17px]">
          {opinion.user.name.slice(0, 1)}
        </div>
      )}
    </>
  );
}

export default OpinionImage;
