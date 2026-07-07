import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import ProductCard from '../components/ProductCard';
import { fadeUp } from '../utils/animations';
import { useStore } from '../context/StoreContext';
import { SkeletonProduct } from '../components/Skeletons';

export default function Shop() {
  const { category } = useParams();
  const { isLoading } = useStore();

  let filteredProducts = products;
  let title = "ALL PRODUCTS";
  let subtitle = "Discover our entire collection of futuristic technology";

  if (category) {
    const formattedCat = category.replace('-', ' ');
    if (formattedCat === 'devices') {
      filteredProducts = products.filter(p => ['Smartphones', 'Tablets'].includes(p.category));
      title = "DEVICES";
      subtitle = "Next generation phones and tablets";
    } else if (formattedCat === 'gadgets') {
      filteredProducts = products.filter(p => ['Headphones', 'Gaming Gear', 'Smart Watches'].includes(p.category));
      title = "GADGETS";
      subtitle = "Wearables and essential tech gadgets";
    } else if (formattedCat === 'trending') {
      filteredProducts = products.filter(p => p.rating >= 4.8);
      title = "TRENDING";
      subtitle = "The most popular products right now";
    } else if (formattedCat === 'new arrivals') {
      filteredProducts = products.filter(p => p.isNew);
      title = "NEW ARRIVALS";
      subtitle = "The latest additions to our store";
    } else if (formattedCat === 'accessories') {
      filteredProducts = products.filter(p => ['Laptop Accessories', 'Accessories'].includes(p.category));
      title = "ACCESSORIES";
      subtitle = "Enhance your technology ecosystem";
    }
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">{title}</h1>
          <p className="text-xl text-gray-500">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonProduct key={idx} />
            ))
          ) : (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
