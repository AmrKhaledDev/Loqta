"use client";

import { formatCurrency } from "@/lib/formates/formatCurrency";
import { OrderDbType } from "@/lib/types/types";
import dayjs from "dayjs";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import Thead from "./_components/Thead";
import DropDown from "./_components/DropDown";
import TdTable from "@/components/TdTable/TdTable";
import { useState } from "react";
// =======================================================================================
function TableOrders({
  orders,
}: {
  orders: OrderDbType[];
}) {
  const [dropDown, setDropDown] = useState("");
  return (
    <div className="overflow-x-auto rounded-2xl w-full ">
      <table className="ring ring-gray-50/10 bg-white/5 w-full">
        <Thead />
        <tbody>
          {orders.map((ord) => (
            <tr key={ord.id} className="text-center">
              <TdTable>
                <p className="font-extrabold">{ord.order_num} #</p>
              </TdTable>
              <TdTable>{ord.fullName}</TdTable>
              <TdTable>{ord.address}</TdTable>
              <TdTable>{ord.city}</TdTable>
              <TdTable>
                <p className="font-mono font-semibold text-sm text-gray-200 py-1 px-3 rounded-full bg-white/5">
                  {ord.phone}
                </p>
              </TdTable>
              <DropDown
                dropDown={dropDown}
                setDropDown={setDropDown}
                ord={ord}
              />
              <TdTable>
                <p className="font-extrabold text-green-400">
                  {formatCurrency.format(ord.totalPrice)}
                </p>
              </TdTable>
              <TdTable>
                <p className="font-semibold font-mono text-sm text-gray-200">
                  {dayjs(ord.createdAt).format("D/M/YYYY")}
                </p>
              </TdTable>
              <TdTable>
                <p className="size-7 text-sm font-extrabold shadow text-cyan-400 flex items-center justify-center mx-auto bg-white/10 ring ring-gray-50/20 rounded-full">
                  {ord.items.reduce((acc, item) => acc + item.quantity, 0)}
                </p>
              </TdTable>
              <TdTable>
                <Link
                target="_blank"
                  href={`/dashboard/orders/${ord.id}`}
                  className="bg-white/10 flex text-gray-400 hover:text-white mytransition group items-center gap-2 ring ring-gray-50/20 font-semibold shadow py-1 px-4 text-xs rounded-full"
                >
                  تفاصيل
                  <ArrowLeftCircle className="size-4 group-hover:-translate-x-1 mytransition" />
                </Link>
              </TdTable>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableOrders;
