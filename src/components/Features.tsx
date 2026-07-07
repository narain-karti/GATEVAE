import { motion } from 'motion/react';
import { Truck, Shield, BadgeCheck, Headphones } from 'lucide-react';
import { fadeUp } from '../utils/animations';

export default function Features() {
  const features = [
    { name: 'FAST DELIVERY', icon: Truck },
    { name: 'SECURE PAYMENTS', icon: Shield },
    { name: 'PREMIUM QUALITY', icon: BadgeCheck },
    { name: '24/7 SUPPORT', icon: Headphones },
  ];

  return (
    <section className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">BUILT DIFFERENT</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-black rounded-[32px] p-10 flex flex-col items-center justify-center text-center hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] transition-all duration-500"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-white font-bold uppercase tracking-widest">{feature.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
