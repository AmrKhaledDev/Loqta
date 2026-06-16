import { prisma } from "@/lib/prisma";
import { GetUserSessionWithRelations } from "@/lib/Sessions/GetUserSessionWithRelations";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProductDetails from "./_components/ProductDetails/ProductDetails";
import ProductOpinions from "./_components/ProductOpinions/ProductOpinions";
import { Metadata } from "next";
import SimilarProducts from "./_components/SimilarProducts";
// ========================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  if (!productId)
    return { title: "المنتج غير موجود", description: "هذا المنتج غير موجود" };
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: { name: true, description: true, isDeleted: true },
  });
  if (!product)
    return { title: "المنتج غير موجود", description: "هذا المنتج غير موجود" };
  if (product.isDeleted) return { title: "تم حذف هذا المنتج" };
  return {
    title: product.name,
    description: product.description,
    icons: "/fav-icon.png",
  };
}
async function Product({ params }: { params: Promise<{ productId: string }> }) {
  const userSession = await GetUserSessionWithRelations();
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      productImages: true,
      category: {
        include: {
          products: {
            include: {
              productImages: true,
              category: true,
              opinions: true,
            },
            where:{
              isDeleted:false
            }
          },
        },
      },
      opinions: {
        include: {
          user: true,
          likes: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!product) return redirect("/categories");
  if (product.isDeleted) return redirect("/categories");
  return (
    <main className="section-p text-white">
      <div className="mycontainer flex flex-col gap-20">
        {!userSession && (
          <Link
            href={"/login"}
            className="shadow w-fit bgg-ip text-white py-2 px-5 rounded text-sm text-center mx-auto font-bold"
          >
            سجل الدخول لترك رأيك عن هذا المنتج
          </Link>
        )}
        <ProductDetails product={product} userSession={userSession} />
        {product.category.products.length > 1 && (
          <SimilarProducts
            singleProduct={product}
            products={product.category.products}
            userSession={userSession}
          />
        )}
        <ProductOpinions
          opinions={product.opinions}
          userSession={userSession}
          productId={product.id}
        />
      </div>
    </main>
  );
}

export default Product;
