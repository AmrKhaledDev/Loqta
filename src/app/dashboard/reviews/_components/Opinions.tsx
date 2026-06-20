import { OpinionDBType } from "@/lib/types/types";
import ProductOpinioned from "./ProductOpinioned";
import OpinionStars from "./OpinionStars";
import OwnerOpinionDetails from "./OwnerOpinionDetails";
import ButtonDeleteOpinion from "./ButtonDeleteOpinion";
// =======================================================================
function Opinions({ opinions }: { opinions: OpinionDBType[] }) {
  return (
    <ul className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
      {opinions.map((opinion) => (
        <li
          key={opinion.id}
          className="lg:p-4 p-2 bg-black rounded-2xl shadow flex flex-col gap-3"
        >
          <ProductOpinioned opinion={opinion} />
          <OwnerOpinionDetails opinion={opinion} />
          <p className="text-xs line-clamp-1">{opinion.opinion}</p>
          <OpinionStars opinion={opinion} />
          <ButtonDeleteOpinion opinion={opinion}/>
        </li>
      ))}
    </ul>
  );
}

export default Opinions;
