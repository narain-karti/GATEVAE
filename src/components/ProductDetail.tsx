import { motion } from 'motion/react';
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data';
import ProductCard from './ProductCard';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const selectedProduct = products.find(p => p.id === id);

  useSEO({
    title: selectedProduct ? selectedProduct.name : 'Product Not Found',
    description: selectedProduct ? selectedProduct.description : 'Product details page.'
  });

  if (!selectedProduct) return (
    <div className="min-h-screen pt-[clamp(8rem,15vh,12rem)] pb-24 px-[clamp(1.5rem,5vw,5rem)] bg-[#FAFAFA] flex items-center justify-center">
      <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold uppercase tracking-tight text-[#202020]">Product not found</h2>
    </div>
  );

  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#FAFAFA] pt-[clamp(8rem,15vh,12rem)] pb-24 px-[clamp(1.5rem,5vw,5rem)]"
    >
      <div className="max-w-[1920px] mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#202020] font-bold uppercase tracking-widest text-[clamp(0.75rem,1vw,0.875rem)] mb-[clamp(2rem,5vh,4rem)] transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Store
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,6vw,5rem)] mb-[clamp(4rem,10vh,8rem)]">
          {/* Left: Gallery */}
          <div className="bg-white rounded-[40px] p-[clamp(2rem,6vw,4rem)] aspect-square flex items-center justify-center relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            <span className="text-primary font-bold uppercase tracking-widest mb-4 text-[clamp(0.75rem,1.2vw,0.875rem)]">
              {selectedProduct.brand} • {selectedProduct.category}
            </span>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase tracking-tighter leading-tight mb-6 text-[#202020]">
              {selectedProduct.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} />
                ))}
              </div>
              <span className="font-semibold text-gray-500">{selectedProduct.rating} Reviews</span>
            </div>

            <p className="text-[clamp(2rem,3vw,2.5rem)] font-bold mb-8 text-[#202020]">₹{selectedProduct.price.toLocaleString()}</p>
            
            <p className="text-gray-500 text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed mb-12">
              {selectedProduct.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border-2 border-gray-200 rounded-full h-16 w-full sm:w-32 justify-between px-4 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-black w-8 h-8 flex items-center justify-center font-bold text-xl"
                >-</button>
                <span className="font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-black w-8 h-8 flex items-center justify-center font-bold text-xl"
                >+</button>
              </div>
              <button 
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(selectedProduct);
                  setQuantity(1);
                }}
                className="flex-1 bg-[#202020] text-white rounded-full h-16 font-bold uppercase tracking-widest hover:bg-[#5E0ED7] hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-black/10 text-[clamp(0.875rem,1.2vw,1rem)]"
              >
                Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-gray-200">
              <div className="flex items-center gap-4 bg-white p-4 rounded-[20px]">
                <ShieldCheck className="text-primary" size={24} />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#202020]">1 Year<br/>Warranty</span>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-[20px]">
                <Truck className="text-primary" size={24} />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#202020]">Free<br/>Delivery</span>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-[20px]">
                <RotateCcw className="text-primary" size={24} />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#202020]">30 Day<br/>Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold uppercase tracking-tight mb-[clamp(2rem,4vw,3rem)] text-[#202020]">COMPLETE YOUR SETUP</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[clamp(1rem,3vw,2rem)]">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
