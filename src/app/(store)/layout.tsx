import Header from "@/components/Header/Header";
// =============================================================
export const metadata = {
  title: "متجر لُقطة - الرئيسية",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
