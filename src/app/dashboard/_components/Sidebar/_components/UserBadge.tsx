import { User } from "@prisma/client";
import Image from "next/image";
// ========================================
function UserBadge({userSession}:{userSession:User}) {
  return (
    <div className="flex items-center gap-2">
      {userSession.image ? (
        <Image
          src={userSession.image}
          alt="your image"
          width={50}
          height={50}
          className="rounded-full shrink-0 size-10 object-cover"
        />
      ) : (
        <div className="size-10 rounded-full bgg-ip font-extrabold text-xl flex items-center justify-center">
          {userSession.name.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div>
        <h2 className="text-[16px] font-semibold capitalize line-clamp-1">
          {userSession.name}
        </h2>
        <p className="text-xs text-gray-300 line-clamp-1">
          {userSession.email}
        </p>
      </div>
    </div>
  );
}

export default UserBadge;
