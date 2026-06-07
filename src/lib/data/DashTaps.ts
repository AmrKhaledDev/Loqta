import {
  Package,
  ShoppingCart,
  Users,
  Settings,
  Layers,
  Shield,
  BarChart3,
  MessageSquareQuote,
} from "lucide-react";
// =====================================
export const taps = [
  {
    id: "analytics",
    title: "الإحصائيات",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    id: "orders",
    title: "الطلبات",
    icon: ShoppingCart,
    href: "/dashboard/orders",
  },
  {
    id: "products",
    title: "المنتجات",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    id: "categories",
    title: "الأصناف",
    icon: Layers,
    href: "/dashboard/categories",
  },
  {
    id: "reviews",
    title: "تقييمات العملاء",
    icon: MessageSquareQuote,
    href: "/dashboard/reviews",
  },
  {
    id: "users",
    title: "المستخدمين",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    id: "admins",
    title: "المسؤولين",
    icon: Shield,
    href: "/dashboard/admins",
  },
];
