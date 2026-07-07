import { motion } from 'motion/react';
import { fadeUp } from '../utils/animations';

export default function Newsletter() {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div {...fadeUp}>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white mb-6">
            JOIN THE FUTURE
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12">
            Get exclusive launches, offers and technology updates.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white/10 text-white placeholder:text-gray-500 border border-white/20 rounded-full px-8 py-5 outline-none focus:border-primary transition-colors text-lg"
              required
            />
            <button 
              type="submit"
              className="bg-primary text-white font-bold uppercase tracking-widest px-10 py-5 rounded-full hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(94,14,215,0.5)]"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
