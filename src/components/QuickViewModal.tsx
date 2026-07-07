import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, addToWishlist, removeFromWishlist, wishlist } = useStore();
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.some(item => item.id === quickViewProduct.id);

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-500 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 bg-[#F5F5F5] relative p-8 flex items-center justify-center">
              {quickViewProduct.isNew && (
                <div className="absolute top-6 left-6 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  New Release
                </div>
              )}
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.name}
                className="w-full h-auto max-h-[400px] object-contain mix-blend-multiply drop-shadow-2xl"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
              <div className="mb-2 text-primary font-bold uppercase tracking-widest text-xs">
                {quickViewProduct.brand} • {quickViewProduct.category}
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">{quickViewProduct.name}</h2>
              <p className="text-2xl font-bold text-gray-900 mb-6">₹{quickViewProduct.price.toLocaleString()}</p>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {quickViewProduct.description}
              </p>
              
              {quickViewProduct.specs && Object.keys(quickViewProduct.specs).length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Key Specs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(quickViewProduct.specs).slice(0, 4).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{key}</div>
                        <div className="text-sm font-medium text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto flex gap-4 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button 
                  onClick={() => {
                    if (isWishlisted) {
                      removeFromWishlist(quickViewProduct.id);
                    } else {
                      addToWishlist(quickViewProduct);
                    }
                  }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border transition-colors ${
                    isWishlisted 
                      ? 'bg-red-50 border-red-100 text-red-500' 
                      : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>
              <button 
                onClick={() => {
                  setQuickViewProduct(null);
                  navigate(`/product/${quickViewProduct.id}`);
                }}
                className="mt-4 text-center text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest underline underline-offset-4 decoration-gray-300"
              >
                View Full Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
