import { motion } from 'motion/react';
import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { products } from '../data';
import ProductCard from './ProductCard';
import { fadeUp } from '../utils/animations';
import { useStore } from '../context/StoreContext';
import { SkeletonProduct } from './Skeletons';

export default function Products() {
  const { isLoading } = useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="py-[clamp(4rem,10vw,8rem)] px-[clamp(1.5rem,5vw,5rem)] bg-[#FAFAFA]">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[clamp(3rem,6vw,5rem)] gap-6">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold uppercase tracking-tight mb-4 leading-none">TRENDING TECHNOLOGY</h2>
            <p className="text-[clamp(1rem,2vw,1.5rem)] text-gray-500">The most sought-after devices right now</p>
          </motion.div>
          
          <motion.button 
            {...fadeUp}
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 border-2 border-gray-200 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[clamp(0.75rem,1vw,0.875rem)] hover:border-black transition-colors md:hidden"
          >
            <Filter size={18} />
            Filters
          </motion.button>
        </div>

        <div className="flex gap-[clamp(2rem,5vw,4rem)]">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <h3 className="font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">Categories</h3>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[clamp(0.875rem,1vw,1rem)] font-medium tracking-wide transition-colors ${selectedCategory === cat ? 'text-primary font-bold' : 'text-gray-500 hover:text-black'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[clamp(1rem,3vw,2.5rem)]">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <SkeletonProduct key={idx} />
              ))
            ) : (
              filteredProducts.slice(0, 8).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsFilterOpen(false)} />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="relative bg-white rounded-t-[32px] p-6 pb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold uppercase tracking-widest text-xl">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <h4 className="font-bold mb-4">Categories</h4>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsFilterOpen(false);
                  }}
                  className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide border-2 ${selectedCategory === cat ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

