import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-black text-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-bottom opacity-60"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[3px] w-12 bg-primary" />
            <span className="uppercase tracking-[0.3em] font-extrabold text-xs">
              NEXT GEN TECH BUILT FOR YOUR LIFE
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1] mb-8"
          >
            Future<br/>
            Tech<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 font-display tracking-tight">
              Unlocked
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg font-semibold text-gray-300 max-w-xl mb-12"
          >
            Premium Technology Accessories Designed For A Smarter Digital Future
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explore Store
          </motion.button>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-6 right-6 md:left-auto md:right-12 flex items-center gap-8 md:gap-16 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0 md:pl-16"
        >
          <div>
            <div className="text-2xl md:text-3xl font-black">+500</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">TECH PRODUCTS</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black">+100K</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">HAPPY USERS</div>
          </div>
          <div className="hidden sm:block">
            <div className="text-2xl md:text-3xl font-black">+50</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">GLOBAL BRANDS</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
