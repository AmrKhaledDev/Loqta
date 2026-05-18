import { Prisma } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
// ====================================
export type ProductDbType = Prisma.ProductGetPayload<{
  include: {
    productImages: true;
    category: true;
    opinions: true;
  };
}>;
export type UserSessionWithRelations = Prisma.UserGetPayload<{
  include: {
    userProducts: {
      include: {
        product: {
          include: {
            productImages: true;
          };
        };
      };
    };
  };
}>;
export type OpinionsDbType = Prisma.OpinionGetPayload<{
  include: {
    user: true;
    likes: {
      include: {
        user: true;
      };
    };
  };
}>;
export type UserProductDbType = Prisma.UserProductGetPayload<{
  include: {
    product: {
      include: {
        productImages: true;
      };
    };
  };
}>;
export type OrderDbType = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            productImages: true;
          };
        };
      };
    };
  };
}>;
export type CategoriesOffers = Prisma.CategoryGetPayload<{
  include: {
    products: {
      include: {
        productImages: true;
        category: true;
      };
    };
  };
}>;

export type CategoryDbType = Prisma.CategoryGetPayload<{
  include: {
    products: true;
  };
}>;
export type CreateProductInputsProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  nameError?: string;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  priceError?: string;
  stock: string;
  setStock: Dispatch<SetStateAction<string>>;
  stockError?: string;
  minStock: string;
  setMinStock: Dispatch<SetStateAction<string>>;
  minStockError?: string;
  returnPolicy: string;
  setReturnPolicy: Dispatch<SetStateAction<string>>;
  warranty: string;
  setWarranty: Dispatch<SetStateAction<string>>;
  shippingInfo: string;
  setShippingInfo: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  descriptionError?: string;
};
export type ProductModalErrors = {
  name?: string;
  description?: string;
  price?: string;
  stock?: string;
  minStock?: string;
  categoryId?: string;
  primaryImage?: string;
  serverError?: string;
  discountPrice?: string;
};

export type UserDashDbType = Prisma.UserGetPayload<{
  include: {
    orders: { select: { totalPrice: true } };
    userProducts: true;
    _count: { select: { orders: true } };
  };
}>;