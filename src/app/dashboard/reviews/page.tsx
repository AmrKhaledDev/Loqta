import { getOpinions } from "@/lib/Db/PublicCaches/getOpinions";
import ReviewsPageContent from "./_components/ReviewsPageContent";
import { Metadata } from "next";
// ===================================================================
export const metadata: Metadata = {
  title: "لُقطة | تقييمات المستخدمين",
  description:
    "مراقبة وإدارة آراء وتقييمات المستخدمين؛ مراجعة التعليقات والتقييمات الواردة على المنتجات.",
};
async function Reviews() {
  const opinions = await getOpinions();
  return (
    <main className="dashSectionStyle">
      <h2 className="dashSectionsHead">إدارة تقييمات العملاء</h2>
      <ReviewsPageContent opinions={opinions} />
    </main>
  );
}

export default Reviews;
