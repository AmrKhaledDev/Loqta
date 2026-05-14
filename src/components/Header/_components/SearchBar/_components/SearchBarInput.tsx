"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
// ======================================
function SearchBarInput({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  return (
    <div className="w-full focus-within:border-2 border pr-4 border-indigo-500 rounded-xl overflow-hidden flex md:h-14 sm:h-12 h-10 items-center gap-2.5">
      <button>
        <Search className="text-gray-400 md:size-5 size-4" />
      </button>
      <span className="h-5 w-px block bg-black/5 rounded-full" />
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (!search.trim()) return;
            router.push(`/search?q=${search}`);
          }
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="ما الذي تبحث عنه؟"
        className="placeholder:text-gray-400 text-gray-400 flex-1 md:text-xl h-full outline-none"
      />
    </div>
  );
}

export default SearchBarInput;
