import React from 'react'


interface CategoriesProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}
const FilterElement = ({ categories, selectedCategory, setSelectedCategory }: CategoriesProps) => {
  return (
     <div className="mb-8 flex flex-wrap gap-3">
           <button
              key={0}
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === 'All'
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-rose-50'
              }`}
              >
              {'All'}
            </button>
          {categories.map((cat: any) => (

            <button
              key={cat.category_id}
              onClick={() => setSelectedCategory(cat.category_name)}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === cat.category_name
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-rose-50'
              }`}
              >
              {cat.category_name}
            </button>
          ))}
    </div>
  )
}

export default FilterElement
