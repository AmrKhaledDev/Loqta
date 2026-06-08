"use client";

import { useEffect, useState } from "react";
import SearchBar from "../../_components/SearchBar/SearchBar";
import { OrderDbType } from "@/lib/types/types";
import Tabs from "./Tabs";
import TableOrders from "./TableOrders/TableOrders";
import axios from "axios";
// =======================================================
function OrdersPageContent({ orders }: { orders: OrderDbType[] }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<OrderDbType[] | null>(null);
  const [activeTab, setActiveTab] = useState("PENDING");
  const filterdOrders = orders.filter((ord) => ord.status === activeTab);
  useEffect(() => {
    const FETCH_DATA = async () => {
      if (!value.trim() || value.trim().length < 1) return;
      const res = await axios.get(
        `/api/search-orders?q=${encodeURIComponent(value)}`,
      );
      const data: { error: string } | OrderDbType[] = res.data;
      if ("error" in data) return setError(data.error);
      const [order] = data;
      setActiveTab(order.status);
      setResult(data);
    };
    FETCH_DATA();
  }, [value]);
  const finallyOrders = value && result ? result : filterdOrders;
  return (
    <>
      <SearchBar
        value={value}
        error={error}
        setValue={setValue}
        placeholder="أكتب رقم الطلب للبحث عنه"
        type="number"
      />
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setValueSearch={setValue}
      />
      {finallyOrders.length > 0 ? (
        <TableOrders
          orders={finallyOrders}
        />
      ) : (
        <p className="text-center text-2xl font-normal text-gray-400 mt-5">
          لا يوجد طلبات حالياً
        </p>
      )}
    </>
  );
}

export default OrdersPageContent;
