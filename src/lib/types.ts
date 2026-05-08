import { Prisma } from "@prisma/client";
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