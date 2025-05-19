
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: number | null;
  setActiveCategory: (id: number | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-3 px-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all ${
              activeCategory === null 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-sm font-medium">Todos</span>
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all ${
                activeCategory === category.id 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl mb-1">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
