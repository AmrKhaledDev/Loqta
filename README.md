# Laqta Store 🛒

A high-fidelity, production-ready Full-Stack E-commerce platform engineered with the **T3 Stack**. The application implements complex business logic, strict runtime validation, dynamic analytical tracking, and resilient data architectures to deliver a seamless shopping experience and a robust administrative control center.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** Auth.js
- **Validation:** Zod
- **Styling & UI:** Tailwind CSS, Lucide Icons
- **Data Visualization:** Recharts

---

## 💎 Key Features & Core Architecture

### 1. Administrative Dashboard & Business Analytics
- **Real-Time KPI Analytics:** Implemented a statistics monitor using Recharts to visualize monthly revenue metrics, active user behavior tracking, and overall order conversion velocity.
- **Role-Based Access Control (RBAC):** Built a multi-level authorization module using Prisma Enums to securely distinguish and manage standard Users, Admins, and Super Admins.
- **Resilient Data Architecture (Soft-Deletes):** Designed a custom soft-delete pattern for product management to prevent database cascading issues, safeguarding historical sales records and financial invoice integrity.
- **Content Moderation:** Integrated dynamic admin control workflows for multi-criteria validation of user-submitted product reviews and inventory listings.

### 2. Storefront Engine & Checkout Workflow
- **Dynamic Shopping Cart:** Developed an optimized client/server-state cart engine that manages real-time quantity mutations, localized pricing data, and interactive state synchronization.
- **Automated Tax & Shipping Matrix:** Engineered a backend calculation pipeline that accurately appends localized shipping costs based on user geographic distribution (Governorates) alongside a standard 14% tax toll.
- **Order Lifecycle Automation:** Formulated an sequential order processing workflow that auto-initializes incoming orders as "Pending" and archives completed fulfillments under a distinct user purchase history layout.

---

## 🛠️ Getting Started

### Prerequisites
Ensure you have Node.js (v18+) and a PostgreSQL instance running.

### Installation

1. Clone the repository:
```bash
   git clone [https://github.com/your-username/laqta-store.git](https://github.com/your-username/laqta-store.git)
   cd laqta-store