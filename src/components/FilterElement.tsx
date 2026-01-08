import React from 'react'


interface CategoriesProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}
const FilterElement = ({ categories, selectedCategory, setSelectedCategory }: CategoriesProps) => {

  return (
     <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-rose-50'
              }`}
              >
              {cat}
            </button>
          ))}
    </div>
  )
}

export default FilterElement
