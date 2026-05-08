"use client"
import { taps } from "@/lib/data/DashTaps";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ===================================================
function Taps() {
  const pathname = usePathname()
  return (
    <ul className="flex flex-col gap-2 w-full">
      {taps.map((tap) => (
        <li key={tap.id} className="w-full">
          <Link 
            href={tap.href}
            className={`flex items-center hover:shadow-2xl shadow-cyan-50/20 hover:scale-105 hover:bg-cyan-500 group mytransition text-shadow-2xs justify-between text-sm  rounded-lg p-3 w-full font-semibold  
              ${pathname == tap.href ? "bg-cyan-500 shadow-2xl scale-105 cursor-default" : "ring ring-gray-50/30 bg-white/10"}`}
          >
            <tap.icon className={`size-5  group-hover:text-white 
              ${pathname == tap.href ? "text-white " : "text-indigo-300"}`} />
            {tap.title}
            <ChevronLeft
              strokeWidth={2.75}
              className={`p-1 rounded-full size-5 shadow group-hover:bg-white group-hover:text-black/30 
                ${pathname == tap.href ? "bg-white text-black/30 " : "bg-white/15 "}`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Taps;
