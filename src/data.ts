import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Ultra Wireless Headphones',
    price: 14999,
    category: 'Headphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    description: 'Experience pure silence with our next-generation active noise cancellation. Crafted with premium materials for all-day comfort and engineered with high-fidelity audio drivers for an immersive soundscape.',
    brand: 'Sony',
    isNew: true
  },
  {
    id: '2',
    name: 'Smart Pro Watch',
    price: 24999,
    category: 'Smart Watches',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    description: 'Your ultimate health and fitness companion. Features a stunning edge-to-edge always-on display, advanced biosensors, and aerospace-grade titanium construction.',
    brand: 'Apple'
  },
  {
    id: '3',
    name: 'Mechanical Gaming Keyboard',
    price: 8999,
    category: 'Gaming Gear',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    description: 'Precision-engineered mechanical switches for lightning-fast actuation. Features customizable RGB per-key lighting, aircraft-grade aluminum frame, and dedicated media controls.',
    brand: 'Razer'
  },
  {
    id: '4',
    name: 'MagSafe Power Station',
    price: 5999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    description: 'Charge all your devices simultaneously with this elegant 3-in-1 magnetic wireless charging stand. Minimalist design fits perfectly on any modern desk.',
    brand: 'Anker'
  },
  {
    id: '5',
    name: 'Vision AR Glasses',
    price: 45999,
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    description: 'Blend digital content with your physical space. Ultra-high-resolution displays and advanced spatial audio create a seamlessly immersive experience.',
    brand: 'Apple',
    isNew: true
  },
  {
    id: '6',
    name: 'Ergonomic Creator Mouse',
    price: 7999,
    category: 'Laptop Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    description: 'Designed for ultimate comfort and precision. Features a sculpted shape, customizable buttons, and seamless cross-computer control for professional creators.',
    brand: 'Logitech'
  },
  {
    id: '7',
    name: 'Next-Gen Smartphone X',
    price: 89999,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    description: 'The future of mobile computing. Featuring a revolutionary camera system, computational photography powered by AI, and the fastest chip ever in a smartphone.',
    brand: 'Samsung'
  },
  {
    id: '8',
    name: 'Portable SSD 2TB',
    price: 12999,
    category: 'Laptop Accessories',
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    description: 'Blazing-fast transfer speeds in a rugged, pocket-sized design. NVMe technology delivers read speeds up to 1050MB/s for seamless editing on the go.',
    brand: 'Samsung'
  }
];

export const categories = [
  { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', count: 24 },
  { name: 'Smart Watches', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop', count: 18 },
  { name: 'Headphones', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop', count: 32 },
  { name: 'Gaming Gear', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop', count: 45 },
  { name: 'Laptop Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop', count: 56 },
  { name: 'Smart Home', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', count: 12 },
];
