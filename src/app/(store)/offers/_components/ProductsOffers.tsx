"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ProductDbType } from "@/lib/types/types";
import Link from "next/link";
import { User } from "@prisma/client";
import ProductOfferImage from "./ProductOfferImage";
import LowStockWarning from "@/components/LowStockWarning/LowStockWarning";
import ProductCardFooter from "@/components/ProductCardFooter/ProductCardFooter";
// ==================================================
function ProductsOffers({
  products,
  userSession,
}: {
  products: ProductDbType[];
  userSession: User | null;
}) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      spaceBetween={10}
      slidesPerView={"auto"}
      className="w-full py-3!"
    >
      {products.map((p) => {
        let discountPercentage = null;
        if (p.price && p.discountPrice && p.price > p.discountPrice) {
          discountPercentage = Math.round(
            ((p.price - p.discountPrice) / p.price) * 100,
          );
        }
        return (
          p.stock > 0 && (
            <SwiperSlide
              key={p.id}
              className="ring hover:shadow-2xl flex! hover:-translate-y-1 flex-col justify-between gap-3 sm:w-60! w-45! ring-gray-50/20 bg-white/5 mytransition! sm:p-5 p-3  rounded-2xl"
            >
              <ProductOfferImage product={p} />
              <Link
                href={p.stock > 0 ? `/product/${p.id}` : ""}
                className={`line-clamp-1 ${p.stock > 0 ? "hover:underline" : "cursor-default"} font-semibold sm:text-[15px] text-xs`}
              >
                {p.name}
              </Link>
              <p className="sm:text-sm text-xs text-gray-300 sm:line-clamp-2 line-clamp-3 ">
                {p.description}
              </p>
              <ProductCardFooter userSession={userSession} product={p} />
              <LowStockWarning product={p} />
              <span className="absolute top-1 shadow left-1 bg-red-500 sm:py-1 py-0.5 px-3 rounded-full font-extrabold sm:text-xs text-[10px]">
                خصم {discountPercentage || 0}%
              </span>
            </SwiperSlide>
          )
        );
      })}
    </Swiper>
  );
}

export default ProductsOffers;
