"use client";
import { ProductDbType } from "@/lib/types/types";
import ProductCard from "./_components/ProductCard/ProductCard";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
// ====================================================================
function Products({
  products,
  userSession,
  singleProduct,
}: {
  products: ProductDbType[];
  userSession: User | null;
  singleProduct?: ProductDbType;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 140 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3 gap-1 "
    >
      {products.map(
        (product) =>
          product.id !== singleProduct?.id && (
            <ProductCard
              product={product}
              key={product.id}
              userSession={userSession}
            />
          ),
      )}
    </motion.div>
  );
}

export default Products;
