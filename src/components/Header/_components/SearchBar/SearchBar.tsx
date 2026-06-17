"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBarInput from "./_components/SearchBarInput";
import CloseSearchBar from "./_components/CloseSearchBar";
import OpenSearchBar from "./_components/OpenSearchBar";
import Results from "./_components/Results";
import { toast } from "react-toastify";
import axios from "axios";
import { ProductDbType } from "@/lib/types/types";
import { Category } from "@prisma/client";
import { usePathname } from "next/navigation";
// ==============================
function SearchBar() {
  const pathname = usePathname();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<{
    products: ProductDbType[];
    categories: Category[];
  } | null>(null);
  useEffect(() => {
    if (showSearchBar) {
      setShowSearchBar(false);
      setSearch("");
    }
  }, [pathname]);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonShowSearchBar, .boxSearchBar"))
          setShowSearchBar(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);
  useEffect(() => {
    const FETCH_DATA = async () => {
      if (!search.trim()) return;
      const res = await axios.get(
        `/api/search?q=${encodeURIComponent(search)}`,
      );
      const data = res.data as
        | { products: ProductDbType[]; categories: Category[] }
        | { error: string };
      if ("error" in data)
        return toast.error(data.error, { className: "toast-font" });
      setData(data);
    };
    FETCH_DATA();
  }, [search]);
  return (
    <>
      <OpenSearchBar setShowSearchBar={setShowSearchBar} />
      {showSearchBar && (
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          whileInView={{ opacity: 1 }}
          className="fixed inset-0 bg-black/25 backdrop-blur flex justify-center z-55 "
        >
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }} // تعديل هنا
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white lg:px-10 sm:px-5 px-2 md:py-7 py-4 h-fit w-full flex justify-center items-center md:gap-6 sm:gap-3 gap-1 boxSearchBar"
          >
            <div className="lg:w-[65%] w-full relative">
              <SearchBarInput search={search} setSearch={setSearch} />
              {search.trim() && data !== null && (
                <Results
                  products={data.products}
                  categories={data.categories}
                  search={search}
                />
              )}
            </div>
            <CloseSearchBar setShowSearchBar={setShowSearchBar} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default SearchBar;
