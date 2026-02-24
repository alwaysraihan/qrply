import React from 'react';
import { motion } from 'framer-motion';

interface CategoryTabsProps {
  activeCategory: 'all' | 'simple' | 'business' | 'creative' | 'social';
  onChange: (category: 'all' | 'simple' | 'business' | 'creative' | 'social') => void;
}

const categories = [
  { id: 'all', label: 'All Templates' },
  { id: 'simple', label: 'Simple' },
  { id: 'business', label: 'Business' },
  { id: 'creative', label: 'Creative' },
  { id: 'social', label: 'Social' },
] as const;

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onChange }) => {
  return (
    <div className="flex gap-1 p-1 bg-secondary rounded-lg overflow-x-auto scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`relative px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
            activeCategory === cat.id
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {activeCategory === cat.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 gradient-primary rounded-md"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
