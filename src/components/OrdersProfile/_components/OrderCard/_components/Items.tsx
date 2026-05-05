import { UserProductDbType } from "@/lib/types";
import ItemCard from "./ItemCard";
// ===========================================
function Items({items}:{items:UserProductDbType[]}) {
  return (
    <ul className="flex flex-col gap-1.5 mt-2">
      <h2 className="font-bold">المنتجات</h2>
      {items.map((item) => (
        <ItemCard item={item} key={item.id} />
      ))}
    </ul>
  );
}

export default Items;
