import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Eye, Layers } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart, wishlist, addToWishlist, removeFromWishlist, compareList, addToCompare, removeFromCompare, setQuickViewProduct } = useStore();
  
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isCompared = compareList.some(item => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCompared) removeFromCompare(product.id);
    else addToCompare(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuickViewProduct(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-[28px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full relative"
    >
      <div className="relative h-[clamp(200px,25vw,280px)] bg-[#F8F9FA] rounded-[20px] mb-6 overflow-hidden flex items-center justify-center">
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
            NEW
          </div>
        )}
        
        {/* Quick actions overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={toggleWishlist}
            aria-label="Toggle Wishlist"
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            title="Wishlist"
          >
            <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
          </button>
          <button 
            onClick={toggleCompare}
            aria-label="Compare Product"
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 ${isCompared ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
            title="Compare"
          >
            <Layers size={18} />
          </button>
          <button 
            onClick={handleQuickView}
            aria-label="Quick View"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-black shadow-sm hover:scale-110 transition-all duration-300"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Persistent Wishlist Heart for mobile/unhovered if already wishlisted */}
        {isWishlisted && (
          <button 
            onClick={toggleWishlist}
            aria-label="Remove from Wishlist"
            className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 lg:hidden"
          >
            <Heart size={18} className="fill-current" />
          </button>
        )}

        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex-1 flex flex-col px-2">
        <span className="text-primary text-[clamp(0.6rem,1vw,0.75rem)] font-bold uppercase tracking-widest mb-2">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-[clamp(1rem,1.5vw,1.125rem)] leading-tight mb-2 cursor-pointer hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-4">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-600">{product.rating}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold">₹{product.price.toLocaleString()}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-black text-white px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vh,0.75rem)] rounded-full text-[clamp(0.7rem,1vw,0.875rem)] font-bold uppercase tracking-widest hover:bg-primary hover:scale-105 transition-all duration-300"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;

