"use client";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import { formatProductsCount } from "@/lib/formates/formatProductsCount";
import { AlertTriangle, Coins, PackageX } from "lucide-react";
// =======================================================================
function KpiCards({
  totalInventory,
  productsLowStock,
  productOutOfStock,
}: {
  totalInventory: number;
  productsLowStock: number;
  productOutOfStock: number;
}) {
  const KPI_CARDS = [
    {
      id: "totalValue",
      content: formatCurrency.format(totalInventory),
      title: "إجمالي قيمة المخزون",
      icon: Coins,
      textColor: "text-emerald-400",
    },
    {
      id: "lowStock",
      content: formatProductsCount(productsLowStock),
      title: "منتجات أوشكت على النفاد",
      icon: AlertTriangle,
      textColor: "text-amber-400",
    },
    {
      id: "outOfStock",
      content: formatProductsCount(productOutOfStock),
      title: "منتجات نفذت",
      icon: PackageX,
      textColor: "text-red-400",
    },
  ];
  return (
    <ul className="grid grid-cols-3 gap-5">
      {KPI_CARDS.map((card) => (
        <li key={card.id} className="kpiCardDesign">
          <card.icon className={`${card.textColor} kpiCardIconDesign`} />
          <h2 className="text-2xl ">{card.title}</h2>
          <p className={`font-extrabold ${card.textColor}`}>
            ( {card.content} )
          </p>
        </li>
      ))}
    </ul>
  );
}

export default KpiCards;
