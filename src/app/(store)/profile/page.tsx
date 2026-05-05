import ProfileDetails from "./_components/ProfileDetails";
import { redirect } from "next/navigation";
import { GetUserSessionWithRelations } from "@/lib/Sessions/GetUserSessionWithRelations";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
// ================================================================
export const metadata: Metadata = {
  title: "الملف الشخصي",
  description: "إدارة حسابك في متجر لُقطة وتحديث بياناتك بسهولة.",
};
async function Profile() {
  const userSession = await GetUserSessionWithRelations();
  if (!userSession) return redirect("/login");
  const PurchasedProducts = await prisma.order.findMany({
    where: {
      userId: userSession.id,
      status: {
        in: ["PENDING", "SHIPPED", "CONFIRMED"],
      },
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              productImages: true,
            },
          },
        },
      },
    },
  });
  return (
    <main className="section-p min-h-screen">
      <div className="mycontainer">
        <ProfileDetails
          productsInCart={userSession.userProducts}
          orders={PurchasedProducts}
          userSession={userSession}
        />
      </div>
    </main>
  );
}

export default Profile;
