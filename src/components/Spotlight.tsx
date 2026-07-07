import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { fadeUp } from '../utils/animations';

export default function Spotlight() {
  const features = [
    'Ultra Fast Performance',
    'Premium Materials',
    'AI Optimized',
    'Long Battery Life'
  ];

  return (
    <section className="py-32 px-6 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left: Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full aspect-square"
          >
            <img 
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop" 
              alt="Spotlight Product" 
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(94,14,215,0.4)]"
            />
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2">
          <motion.div {...fadeUp}>
            <span className="inline-block border border-white/20 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
              LIMITED EDITION
            </span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.1] mb-8">
              ENGINEERED FOR THE NEXT GENERATION
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-lg">
              Experience technology accessories designed with precision, performance, and futuristic craftsmanship.
            </p>

            <div className="space-y-4 mb-12">
              {features.map((feature, i) => (
                <motion.div 
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check size={14} className="text-primary" />
                  </div>
                  <span className="font-medium tracking-wide">{feature}</span>
                </motion.div>
              ))}
            </div>

            <button className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300">
              Buy Now
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
