import { motion } from 'motion/react';
import { fadeUp } from '../utils/animations';

export default function Brands() {
  const brands = ['Apple', 'Samsung', 'Sony', 'Logitech', 'Razer', 'Anker', 'Microsoft', 'Bose'];
  
  // Duplicate for seamless marquee
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="py-24 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2 {...fadeUp} className="text-3xl font-bold uppercase tracking-widest text-gray-900">
          TRUSTED TECHNOLOGY ECOSYSTEM
        </motion.h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex gap-8 px-4"
        >
          {marqueeBrands.map((brand, idx) => (
            <div 
              key={`${brand}-${idx}`} 
              className="w-48 h-[120px] rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(94,14,215,0.15)] transition-all duration-300 cursor-pointer"
            >
              <span className="text-2xl font-black text-gray-300 uppercase tracking-widest hover:text-primary transition-colors">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
