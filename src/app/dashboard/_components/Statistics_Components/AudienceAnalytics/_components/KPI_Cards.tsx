"use client";
import { formatCustomersCount } from "@/lib/formates/formatCustomersCount";
import { formatAccounts } from "@/lib/formates/formatAccounts";
import { ShoppingBag, TrendingUp, Users, UserX } from "lucide-react";
// ====================================================================
function KPI_Cards({
  totalAudiences,
  activeCustomers,
  accountsWithoutPurchases,
}: {
  totalAudiences: number;
  activeCustomers: number;
  accountsWithoutPurchases: number;
}) {
  const KPI_CARDS = [
    {
      id: "TotalAudience",
      title: "إجمالي الحسابات",
      content: formatAccounts(totalAudiences),
      icon: Users,
      textColor: "text-blue-400",
    },
    {
      id: "ActiveCustomers",
      title: "العملاء الحقيقيين",
      content: formatCustomersCount(activeCustomers),
      icon: ShoppingBag,
      textColor: "text-emerald-400",
    },
    {
      id: "AccountsWithoutPurchases",
      title: "حسابات بلا مشتريات",
      content: formatAccounts(accountsWithoutPurchases),
      icon: UserX,
      textColor: "text-amber-400",
    },
    {
      id: "ConversionRate",
      title: "معدل التحويل",
      content:
        Math.round(
          totalAudiences > 0 && activeCustomers > 0
            ? (activeCustomers / totalAudiences) * 100
            : 0,
        ) + "%",
      icon: TrendingUp,
      textColor: "text-indigo-400",
    },
  ];
  return (
    <ul className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-3 gap-1.5">
      {KPI_CARDS.map((card) => (
        <li key={card.id} className="kpiCardDesign">
          <card.icon className={`kpiCardIconDesign ${card.textColor}`} />
          <h2 className="xl:text-xl">{card.title}</h2>
          <p className={`${card.textColor} font-extrabold`}>
            ( {card.content} )
          </p>
        </li>
      ))}
    </ul>
  );
}

export default KPI_Cards;
