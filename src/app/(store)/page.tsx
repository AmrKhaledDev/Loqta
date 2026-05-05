import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
// ================================================
export default function Home() {
  return (
    <main className="section-p">
      <div className="mycontainer space-y-10">
        <Hero />
        <Features />
      </div>
    </main>
  );
}
