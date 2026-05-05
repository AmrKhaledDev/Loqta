import { taps } from "@/lib/data/DashTaps";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
// ===================================================
function Taps() {
  return (
    <ul className="flex flex-col gap-2 w-full">
      {taps.map((tap) => (
        <li key={tap.id} className="w-full">
          <Link
            href={tap.href}
            className="flex items-center hover:shadow-2xl shadow-cyan-50/20 hover:scale-105 hover:bg-cyan-500 group mytransition text-shadow-2xs justify-between text-sm ring ring-gray-50/30 bg-white/10 rounded-lg p-3 w-full font-semibold "
          >
            <tap.icon className="size-5 text-indigo-300 group-hover:text-white" />
            {tap.title}
            <ChevronLeft
              strokeWidth={2.75}
              className="p-1 bg-white/15 rounded-full size-5 shadow group-hover:bg-white group-hover:text-black/30"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Taps;
