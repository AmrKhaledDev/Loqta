"use client";
import { CameraIcon } from "lucide-react";
import Tabs from "./Tabs";
import { useState } from "react";
import Settings from "./Settings/Settings";
import { OrderDbType, UserProductDbType } from "@/lib/types";
import UserProductsInCart from "./UserProductsInCart";
import OrderProductsList from "./OrderProductsList";
import { User } from "@prisma/client";
import PurchasedOrders from "./PurchasedOrders";
// ==========================================================
function ProfileDetails({
  productsInCart,
  ordersPending,
  purchasedOrders,
  userSession,
}: {
  productsInCart: UserProductDbType[];
  ordersPending: OrderDbType[];
  purchasedOrders: OrderDbType[];
  userSession: User;
}) {
  const [activeTab, setActiveTab] = useState("purchased");
  return (
    <div className="flex items-center flex-col gap-10 justify-center">
        <div className="ring cursor-pointer hover:bg-white/20 mytransition ring-gray-50/40 backdrop-blur-2xl bg-white/10 rounded-full md:size-40 size-30 flex items-center justify-center text-white">
          <CameraIcon className="md:size-7 size-5" />
        </div>
      <div className="flex flex-col gap-10 items-center">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "purchased" && (
          <PurchasedOrders orders={purchasedOrders} />
        )}
        {activeTab === "ordered" && (
          <OrderProductsList orders={ordersPending} />
        )}
        {activeTab === "settings" && <Settings userSession={userSession} />}
        {activeTab === "cart" && (
          <UserProductsInCart products={productsInCart} />
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
