import type { Metadata } from "next";
import { Almarai, Geist } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
// ===============================================================
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "لُقطة",
  description: "متجر لُقطة لشراء المنتجات وتقديم الطلبات بسهولة وأمان مع تجربة تسوق بسيطة وسريعة.",
  icons: "fav-icon.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className={cn("h-full", almarai.className, "font-sans", geist.variable)}>
      <body
        dir="rtl"
        className="min-h-full flex flex-col bg-linear-to-r to-indigo-950 from-pink-950 [word-break:break-word]"
      >
        <ToastContainer />
        {children} 
      </body>
    </html>
  );
}