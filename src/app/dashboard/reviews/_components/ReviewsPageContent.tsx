"use client";
import { useEffect, useState } from "react";
import SearchBar from "../../_components/SearchBar/SearchBar";
import { OpinionDBType } from "@/lib/types/types";
import Opinions from "./Opinions";
import axios from "axios";
import Loader from "@/components/Loader/Loader";
// ==============================================================
function ReviewsPageContent({
  opinions: opinionsProps,
}: {
  opinions: OpinionDBType[];
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<OpinionDBType[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const FETCH_DATA = async () => {
      if (!value.trim() || value.trim().length < 1) return;
      setLoading(true);
      const res = await axios.get(
        `/api/search-opinions?q=${encodeURIComponent(value)}`,
      );
      setLoading(false);
      const data: { error: string } | OpinionDBType[] = res.data;
      if ("error" in data) return setError(data.error);
      setResult(data);
    };
    FETCH_DATA();
  }, [value]);
  const opinions = value && result ? result : opinionsProps;
  return (
    <>
      <SearchBar value={value} setValue={setValue} error={error} />
      {loading ? (
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <Opinions opinions={opinions} />
      )}
    </>
  );
}

export default ReviewsPageContent;
