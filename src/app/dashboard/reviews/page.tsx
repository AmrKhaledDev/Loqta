import { getOpinions } from "@/lib/Db/getOpinions";
import ReviewsPageContent from "./_components/ReviewsPageContent";
import { Metadata } from "next";
// ===================================================================
export const metadata: Metadata = {
  title: "لُقطة | تقييمات المستخدمين",
};
async function Reviews() {
  const opinions = await getOpinions();
  return (
    <main className="flex flex-col gap-10">
      <h2 className="font-black text-3xl">إدارة تقييمات العملاء</h2>
      <ReviewsPageContent opinions={opinions} />
    </main>
  );
}

export default Reviews;
