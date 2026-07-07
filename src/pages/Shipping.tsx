import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Truck, CheckCircle2, Search } from 'lucide-react';

export default function Shipping() {
  const [orderId, setOrderId] = useState('');
  const [trackingStatus, setTrackingStatus] = useState<null | 'searching' | 'found' | 'error'>(null);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    setTrackingStatus('searching');
    
    // Simulate API call
    setTimeout(() => {
      if (orderId.length > 5) {
        setTrackingStatus('found');
      } else {
        setTrackingStatus('error');
      }
    }, 1200);
  };

  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#202020] mb-8">
          Shipping & Tracking
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest text-[#202020]">Track Your Order</h2>
            <p className="text-gray-500 mb-8">Enter your order ID to get real-time updates on your shipment status.</p>
            
            <form onSubmit={handleTrackOrder} className="relative">
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Order ID (e.g., GTV-10293)"
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
              <button 
                type="submit"
                disabled={trackingStatus === 'searching'}
                className="absolute right-2 top-2 bottom-2 w-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors disabled:opacity-50"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!trackingStatus && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center text-gray-400"
                >
                  <Package size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Enter an order ID to view details.</p>
                </motion.div>
              )}
              
              {trackingStatus === 'searching' && (
                <motion.div 
                  key="searching"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 border-4 border-gray-100 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Locating your package...</p>
                </motion.div>
              )}
              
              {trackingStatus === 'error' && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center text-red-500"
                >
                  <p className="font-bold mb-2">Order Not Found</p>
                  <p className="text-sm text-gray-500">Please check the ID and try again.</p>
                </motion.div>
              )}
              
              {trackingStatus === 'found' && (
                <motion.div 
                  key="found"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order</div>
                      <div className="font-black text-xl">{orderId}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Est. Delivery</div>
                      <div className="font-black text-xl text-primary">Tomorrow</div>
                    </div>
                  </div>
                  
                  <div className="relative pt-4">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100 -z-10" />
                    
                    <div className="flex gap-6 mb-8 relative">
                      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 z-10 shadow-lg shadow-black/10">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <div className="font-bold">Order Confirmed</div>
                        <div className="text-sm text-gray-500">Yesterday, 10:24 AM</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-6 relative">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 z-10 shadow-lg shadow-primary/20">
                        <Truck size={20} />
                      </div>
                      <div>
                        <div className="font-bold">Out for Delivery</div>
                        <div className="text-sm text-gray-500">Today, 08:15 AM</div>
                        <div className="mt-2 text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block">
                          Driver is nearby
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
