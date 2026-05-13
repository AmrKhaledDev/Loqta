import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import AuthLinks from "./_components/AuthLinks";
import MenuItems from "./_components/MenuItems";
import UserMenu from "./_components/UserMenu";
import { GetUserSessionWithRelations } from "@/lib/Sessions/GetUserSessionWithRelations";
import SearchBar from "./_components/SearchBar/SearchBar";
// ===========================================================
async function Header() {
  const userSession = await GetUserSessionWithRelations();
  const totalProducts = userSession?.userProducts.reduce(
    (acc, p) => acc + p.quantity,
    0,
  );
  return (
    <header className="bg-linear-to-r sm:py-2 py-1.5 to-indigo-900 from-pink-900 z-50 text-white sticky top-0 shadow border-b border-b-gray-50/20">
      <div className="mycontainer header_res flex items-center justify-between sm:flex-nowrap flex-wrap gap-5">
        <Link
          title="لُقطة"
          href={"/"}
          className="flex items-center gap-1 text-xl shrink-0"
        >
          <Image
            src={"/store-logo.png"}
            alt="logo"
            width={80}
            height={80}
            className="sm:w-18 w-12 sm:h-14 h-10"
          />
        </Link>
        <div className="flex items-center lg:flex-row flex-row-reverse sm:gap-5 gap-2">
          <MenuItems />
          <div className="flex items-center sm:gap-4 gap-2.5 sm:flex-nowrap flex-wrap ">
            {userSession ? (
              <>
                <SearchBar />
                <Link href={"/cart"} className="relative">
                  <ShoppingCart className="sm:size-6 size-5" />
                  <span className="absolute sm:-top-2 -top-1 sm:-right-2 -right-1.5 bg-red-500 shadow rounded-full sm:size-4.5 size-3.5 sm:text-sm text-xs flex items-center justify-center  text-white">
                    {totalProducts}
                  </span>
                </Link>
                <UserMenu userSession={userSession} />
                {userSession.role === "ADMIN" && (
                  <Link
                    href={"/dashboard"}
                    className="sm:mr-7 sm:text-[15px] text-xs bg-white/15 hover:-rotate-3 ring hover:shadow-xl mytransition cursor-pointer font-bold ring-gray-50/30 sm:py-2 py-1.5 sm:px-6 px-4 rounded-md flex items-center gap-2 flex-row-reverse sm:text-sm"
                  >
                    لوحة التحكم <LayoutDashboard className="sm:size-5 size-4" />
                  </Link>
                )}
              </>
            ) : (
              <AuthLinks />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
