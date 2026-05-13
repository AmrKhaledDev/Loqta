import { Prisma } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
// ====================================
export type LoginErrors = {
  email?: string;
  password?: string;
  serverError?: string;
};
export type RegisterErrors = LoginErrors & {
  name?: string;
  confirmPassword?: string;
};
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

export type OrderErrors = {
  fullName?: string;
  address?: string;
  city?: string;
  phone?: string;
  serverError?: string;
};

export type CategoryDbType = Prisma.CategoryGetPayload<{
  include: {
    products: true;
  };
}>;
export type CreateProductInputsProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  stock: string;
  setStock: Dispatch<SetStateAction<string>>;
  minStock: string;
  setMinStock: Dispatch<SetStateAction<string>>;
  returnPolicy: string;
  setReturnPolicy: Dispatch<SetStateAction<string>>;
  warranty: string;
  setWarranty: Dispatch<SetStateAction<string>>;
  shippingInfo: string;
  setShippingInfo: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};