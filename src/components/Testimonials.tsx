import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { fadeUp } from '../utils/animations';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Alex Rivera",
      text: "The cleanest tech shopping experience I've ever used. The attention to detail is Apple-level.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Sarah Chen",
      text: "Premium products with futuristic design. Delivery was blazing fast and the packaging is gorgeous.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Marcus Johnson",
      text: "Finally a store that understands aesthetics. The entire journey feels like stepping into the future.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">LOVED BY TECH ENTHUSIASTS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gray-50 rounded-[32px] p-10 hover:bg-gray-100 transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={18} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xl font-medium leading-relaxed mb-8">"{review.text}"</p>
              
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                <span className="font-bold uppercase tracking-widest text-sm">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
