import React from 'react';
import { motion } from 'motion/react';

export default function Deals() {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#202020] mb-8">
          Deals
        </h1>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[40vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">Content for Deals is coming soon.</p>
        </div>
      </motion.div>
    </div>
  );
}
