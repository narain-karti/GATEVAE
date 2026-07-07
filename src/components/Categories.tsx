import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data';
import { fadeUp } from '../utils/animations';
import { useStore } from '../context/StoreContext';
import { SkeletonCategory } from './Skeletons';
import { Link } from 'react-router-dom';

export default function Categories() {
  const { isLoading } = useStore();

  return (
    <section className="py-[clamp(4rem,10vw,8rem)] px-[clamp(1.5rem,5vw,5rem)] bg-white">
      <div className="max-w-[1920px] mx-auto">
        <motion.div {...fadeUp} className="mb-[clamp(3rem,6vw,5rem)]">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold uppercase tracking-tight mb-4 leading-none">SHOP BY CATEGORY</h2>
          <p className="text-[clamp(1rem,2vw,1.5rem)] text-gray-500">Discover technology crafted around your lifestyle</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[clamp(1rem,3vw,2rem)]">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCategory key={idx} />
            ))
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="block group relative h-[clamp(250px,35vw,400px)] rounded-[32px] overflow-hidden cursor-pointer bg-black"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 p-[clamp(1.5rem,3vw,2.5rem)] flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-white text-[clamp(1.25rem,2.5vw,2rem)] font-bold uppercase tracking-wider mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-300 font-medium text-[clamp(0.875rem,1.5vw,1.125rem)]">
                          {category.count} Products
                        </p>
                      </div>
                      <div className="w-[clamp(2.5rem,5vw,3.5rem)] h-[clamp(2.5rem,5vw,3.5rem)] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform w-[clamp(1rem,2vw,1.5rem)] h-[clamp(1rem,2vw,1.5rem)]" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-[32px] transition-colors duration-500 pointer-events-none" />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
