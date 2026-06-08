import { OrderStatus } from "@prisma/client";
// ============================================================
export const OrdersStatuses = [
    OrderStatus.PENDING,
    OrderStatus.CANCELLED,
    OrderStatus.CONFIRMED,
    OrderStatus.DELIVERED,
    OrderStatus.NO_ANSWER,
    OrderStatus.REFUNDED,
    OrderStatus.SHIPPED,
  ];