import React from 'react';
import { motion } from 'motion/react';
import { X, ShoppingCart, Info, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCart } = useStore();
  const navigate = useNavigate();

  // Extract all unique spec keys from all products in compare list
  const allSpecKeys: string[] = Array.from(
    new Set(
      compareList.flatMap(p => Object.keys(p.specs || {}))
    )
  );

  return (
    <div className="pt-24 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex justify-between items-end"
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#202020] mb-2">
            Compare Products
          </h1>
          <p className="text-gray-500 font-medium">Compare technical specifications side-by-side</p>
        </div>
        
        {compareList.length > 0 && (
          <button 
            onClick={clearCompare}
            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors mb-2"
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </button>
        )}
      </motion.div>

      {compareList.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100"
        >
          <Info size={64} className="text-gray-300 mb-6" />
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-6 text-center">Your comparison list is empty</h2>
          <button 
            onClick={() => navigate('/shop')}
            className="px-8 py-4 bg-[#202020] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary transition-all hover:scale-105"
          >
            Browse Products
          </button>
        </motion.div>
      ) : (
        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px]">
            {/* Products Header Row */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="col-span-1 border-r border-gray-100 flex items-center p-6">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-sm">Product Details</span>
              </div>
              
              {compareList.map((product) => (
                <div key={product.id} className="col-span-1 relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
                  <button 
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-1"
                  >
                    <X size={20} />
                  </button>
                  <Link to={`/product/${product.id}`} className="block h-40 w-40 mb-6 relative group">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                    />
                  </Link>
                  <div className="text-primary font-bold text-[10px] uppercase tracking-widest mb-2">{product.brand}</div>
                  <h3 className="font-bold text-lg text-center mb-2 line-clamp-2 h-14 leading-tight">{product.name}</h3>
                  <div className="font-black text-xl mb-6">₹{product.price.toLocaleString()}</div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full py-3 bg-black text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-primary transition-colors flex items-center justify-center gap-2 mt-auto"
                  >
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Specs Rows */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold uppercase tracking-widest text-sm">Technical Specifications</h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {allSpecKeys.map(specKey => (
                  <div key={specKey} className="grid grid-cols-4 gap-6 p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="col-span-1 font-semibold text-gray-600 border-r border-gray-100 flex items-center capitalize pr-4">
                      {specKey.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    {compareList.map(product => (
                      <div key={`${product.id}-${specKey}`} className="col-span-1 text-gray-800 text-sm flex items-center justify-center text-center px-4">
                        {product.specs?.[specKey] || <span className="text-gray-300">—</span>}
                      </div>
                    ))}
                  </div>
                ))}
                
                {allSpecKeys.length === 0 && (
                  <div className="p-8 text-center text-gray-500 italic">
                    No detailed specifications available for these products.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
