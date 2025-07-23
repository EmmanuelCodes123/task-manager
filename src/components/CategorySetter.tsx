import { useState } from "react";
import AddCategory from "./AddCategory";
import Category from "./Category";

export default function CategorySetter({
  title,
  categories,
}: {
  title: "Task Status" | "Task Priority";
  categories: string[];
}) {
  const [categoryToAdd, setCategoryToAdd] = useState<
    "Task Status" | "Task Priority" | null
  >(null);

  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <h2>{title}</h2>
        <p className="text-gray-400" onClick={() => setCategoryToAdd(title)}>
          <span className="text-red-400 font-bold">+</span>Add {title}
        </p>
      </header>
      <div>
        <div className="flex border-b-2 border-gray-400 pb-2">
          <div className="w-10 border-r-2 border-gray-400 flex items-center justify-center">
            <h2>SN</h2>
          </div>
          <div className="flex-1 border-r-2 border-gray-400 flex items-center justify-center">
            <h2>{title}</h2>
          </div>
          <div className="flex-1 border-r-2 border-gray-400 flex items-center justify-center">
            <h2>Action</h2>
          </div>
        </div>
        <div className="space-y-2 mt-2">
          {Array.from({ length: categories.length }, (_, i) => (
            <Category key={i} sn={i + 1} category={categories[i]} />
          ))}
        </div>
      </div>
      {categoryToAdd !== null && (
        <AddCategory
          title={categoryToAdd}
          closeModal={() => setCategoryToAdd(null)}
        />
      )}
    </div>
  );
}
