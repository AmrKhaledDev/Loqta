"use client";
import { CameraIcon } from "lucide-react";
import Tabs from "./Tabs";
import { useState } from "react";
import Settings from "./Settings";
import { OrderDbType, UserProductDbType } from "@/lib/types";
import UserProductsInCart from "./UserProductsInCart";
import OrderProductsList from "./OrderProductsList";
import { User } from "@prisma/client";
// ==========================================================
function ProfileDetails({
  productsInCart,
  orders,
  userSession,
}: {
  productsInCart: UserProductDbType[];
  orders: OrderDbType[];
  userSession: User;
}) {
  const [activeTab, setActiveTab] = useState("purchased");
  return (
    <div className="flex items-center flex-col gap-30">
      <div className="relative">
        <div className="w-200 h-90 bg-white/5 ring ring-gray-50/10 rounded-2xl flex items-center justify-center text-white" />
        <div className="ring cursor-pointer hover:bg-white/20 mytransition ring-gray-50/40 backdrop-blur-2xl bg-white/10 rounded-full size-40 absolute left-1/2 flex items-center justify-center text-white -bottom-20 -translate-x-1/2">
          <CameraIcon className="size-7" />
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "ordered" && <OrderProductsList orders={orders} />}
        {activeTab === "settings" && <Settings userSession={userSession} />}
        {activeTab === "cart" && (
          <UserProductsInCart products={productsInCart} />
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
