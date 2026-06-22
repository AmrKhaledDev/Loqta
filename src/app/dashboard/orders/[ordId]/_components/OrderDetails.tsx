import { formatCurrency } from "@/lib/formates/formatCurrency";
import { OrderDbType } from "@/lib/types/types";
import dayjs from "dayjs";
import OrderProducts from "./OrderProducts";
import React from "react";
// ============================================================
function OrderDetails({ currentOrder }: { currentOrder: OrderDbType }) {
  return (
    <div className="flex flex-col gap-2">
      <P>
        تاريخ الطلب :
        <Span> {dayjs(currentOrder.createdAt).format("D/M/YYYY")}</Span>
      </P>
      <P>
        إسم صاحب الطلب :<Span> {currentOrder.fullName}</Span>
      </P>
      <P>
        رقم صاحب الطلب :<Span>{currentOrder.phone}</Span>
      </P>
      <P>
        عنوان صاحب الطلب :<Span>{currentOrder.address}</Span>
      </P>
      <P>
        مدينة صاحب الطلب :<Span>{currentOrder.city}</Span>
      </P>
      <P>
        إجمالي سعر الطلب :
        <span className="font-extrabold text-green-400 rounded-full sm:text-2xl text-xl">
          {formatCurrency.format(Number(currentOrder.totalPrice))}
        </span>
      </P>
      <p className="mt-3 font-semibold text-gray-200 font-mono">( المنتجات )</p>
      <OrderProducts currentOrder={currentOrder} />
    </div>
  );
}

export default OrderDetails;

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-normal text-gray-300 flex items-center gap-2 sm:text-[15px] text-sm">
      {children}
    </p>
  );
}
function Span({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-white">{children}</span>;
}
