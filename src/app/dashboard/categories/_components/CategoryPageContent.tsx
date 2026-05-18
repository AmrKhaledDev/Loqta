"use client";
import { CategoryDbType } from "@/lib/types/types";
import DashSectionHead from "../../_components/DashSectionHead/DashSectionHead";
import SearchBar from "../../_components/SearchBar/SearchBar";
import CategeoryCard from "./CategeoryCard";
import { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";
import { Category } from "@prisma/client";
import axios from "axios";
import CategoryLoading from "./CategoryLoading";
// ================================================
function CategoryPageContent({ cates }: { cates: CategoryDbType[] }) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<CategoryDbType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<"edit" | "create" | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  useEffect(() => {
    const FETCH_DATA = async () => {
      if (!search.trim()) return;
      setLoading(true);
      const res = await axios.get(`/api/category_search?q=${search}`);
      setLoading(false);
      const dataFetch: CategoryDbType[] | { error: string } = res.data;
      if ("error" in dataFetch) return setError(dataFetch.error);
      setData(dataFetch);
    };
    FETCH_DATA();
  }, [search]);
  const categories = data && search ? data : cates;
  return (
    <>
      <DashSectionHead
        setAction={setActionType}
        setItem={setCategory}
        title="إدارة الأصناف"
        buttonName="إضافة صنف جديد"
      />
      <SearchBar value={search} setValue={setSearch} error={error} />
      {loading ? (
        <CategoryLoading />
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {categories.map((cat: CategoryDbType) => (
            <CategeoryCard
              key={cat.id}
              category={cat}
              setAction={setActionType}
              setCategoryEdit={setCategory}
            />
          ))}
        </ul>
      )}
      {actionType !== null && (
        <CategoryModal
          actionType={actionType}
          setAction={setActionType}
          category={category}
        />
      )}
    </>
  );
}

export default CategoryPageContent;
