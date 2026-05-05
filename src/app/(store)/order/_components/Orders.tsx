import { formatCurrency } from "@/lib/formatCurrency";
import { UserSessionWithRelations } from "@/lib/types";
import Image from "next/image";
// ================================================
function Orders({userSession}:{userSession:UserSessionWithRelations}) {
  return (
    <div className="flex flex-col gap-2">
      {userSession.userProducts.map((product) => (
        <div
          key={product.id}
          className="p-5 rounded-2xl group shadow-xl flex items-center gap-6 ring ring-gray-50/20 bg-white/5"
        >
          <div className="p-2 rounded-md ring shadow ring-gray-50/20 bg-white/5">
            <div className="relative size-30 overflow-hidden rounded-md bg-white group-hover:scale-105 mytransition ">
              <Image
                src={product.product.productImages[0].image}
                alt={product.product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">{product.product.name}</h2>
            <p className="flex items-center gap-2">
              الكمية :
              <span className="size-6 flex items-center justify-center rounded-full ring ring-gray-50/20 bg-white/5">
                {product.quantity}
              </span>
            </p>
            <p className="font-semibold text-xl text-[#75c2de]">
              {formatCurrency.format(product.priceAtAdd)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
