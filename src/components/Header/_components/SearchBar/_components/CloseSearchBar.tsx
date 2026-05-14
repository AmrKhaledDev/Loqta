import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =====================================
function CloseSearchBar({
  setShowSearchBar,
}: {
  setShowSearchBar: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setShowSearchBar(false)}
      className="hover:bg-gray-100 p-2 rounded-full group mytransition"
    >
      <X className="text-black group-hover:rotate-180 mytransition md:size-6 size-5" />
    </button>
  );
}

export default CloseSearchBar;
