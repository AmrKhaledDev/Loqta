import { OrderStatus } from "@prisma/client";
// ============================================================
export const OrdersStatuses = [
  OrderStatus.DELIVERED,
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
  OrderStatus.SHIPPED,
  OrderStatus.NO_ANSWER,
  OrderStatus.REFUNDED,
  OrderStatus.CANCELLED,
];
