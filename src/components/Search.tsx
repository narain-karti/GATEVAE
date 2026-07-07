import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useState, useMemo } from 'react';
import { products } from '../data';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleProductClick = (product: any) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/product/${product.id}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 liquid-glass bg-white/80 z-[1000] flex flex-col rounded-none"
        >
          <div className="max-w-[1200px] mx-auto w-full px-6 pt-[clamp(3rem,8vh,6rem)] pb-6 flex items-center gap-4 border-b border-black/10">
            <SearchIcon size={32} className="text-[#202020]" />
            <input
              autoFocus
              type="text"
              placeholder="Search products, categories..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 text-[clamp(1.5rem,4vw,3rem)] font-bold outline-none placeholder:text-gray-400 bg-transparent text-[#202020]"
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="p-4 hover:bg-black/5 rounded-full transition-colors text-[#202020]"
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-12 max-w-[1200px] mx-auto w-full no-scrollbar">
            {query && (
              <p className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-8">
                {filteredProducts.length} Results Found
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,3vw,2rem)]">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleProductClick(product)}
                  className="flex gap-6 items-center p-4 bg-white/50 backdrop-blur-sm hover:bg-white rounded-[24px] cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                >
                  <div className="w-24 h-24 bg-white rounded-[16px] overflow-hidden flex-shrink-0 p-2">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1 block">
                      {product.brand} • {product.category}
                    </span>
                    <h3 className="font-bold text-lg leading-tight text-[#202020]">{product.name}</h3>
                    <p className="text-gray-600 mt-1 font-semibold">₹{product.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

