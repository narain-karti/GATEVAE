import React from 'react';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#202020]">
          Your Cart
        </h1>
      </motion.div>

      {cart.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100"
        >
          <ShoppingBag size={64} className="text-gray-300 mb-6" />
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-6">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/shop')}
            className="px-8 py-4 bg-[#202020] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#5E0ED7] transition-all hover:scale-105"
          >
            Start Shopping
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items List */}
          <div className="flex-1 flex flex-col gap-6">
            {cart.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100"
              >
                <Link to={`/product/${item.id}`} className="w-full sm:w-32 h-32 sm:h-32 bg-[#F5F5F5] rounded-2xl overflow-hidden flex-shrink-0 relative group">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
                  />
                </Link>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-bold text-lg md:text-xl text-[#202020] hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-1 capitalize">{item.category}</p>
                    </Link>
                    <p className="font-bold text-lg whitespace-nowrap">₹{item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 sm:mt-0">
                    <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-[#202020] transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-[#202020] transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[400px]"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold uppercase tracking-widest text-[#202020] mb-6 border-b border-gray-100 pb-4">
                Order Summary
              </h2>
              
              <div className="flex flex-col gap-4 mb-6 text-gray-600 font-medium">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#202020]">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-bold text-[#202020]">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-100">
                <span className="font-bold uppercase tracking-widest text-[#202020]">Total</span>
                <span className="text-2xl font-black text-[#5E0ED7]">₹{cartTotal.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#202020] text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 hover:bg-[#5E0ED7] transition-all duration-300 shadow-lg shadow-black/10 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
