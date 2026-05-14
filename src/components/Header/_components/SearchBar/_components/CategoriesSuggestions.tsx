import { Category } from "@prisma/client";
import Link from "next/link";
// ===========================================
function CategoriesSuggestions({ categories }: { categories: Category[] }) {
  return (
    <div>
      {categories.length > 0 && (
        <>
          <h2 className="text-gray-500 text-xs pr-3">الأصناف المقترحة</h2>
          <ul className="flex items-center gap-2 p-3">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link dir="auto"
                  href={`/category/${cat.id}`}
                  className="bg-white block py-1 px-3 rounded-full cursor-pointer text-gray-700 font-bold sm:text-sm text-xs mytransition hover:shadow"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default CategoriesSuggestions;
