import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface User {
  name: string;
  email: string;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (isOpen: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cartTotal: number;
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('gatevae_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('gatevae_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem('gatevae_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  const [compareList, setCompareList] = useState<Product[]>(() => {
    const savedCompare = localStorage.getItem('gatevae_compare');
    return savedCompare ? JSON.parse(savedCompare) : [];
  });
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem('gatevae_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gatevae_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  useEffect(() => {
    localStorage.setItem('gatevae_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gatevae_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gatevae_user');
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToWishlist = (product: Product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };
  
  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };
  
  const addToCompare = (product: Product) => {
    if (compareList.length < 3 && !compareList.some(item => item.id === product.id)) {
      setCompareList(prev => [...prev, product]);
    }
  };
  
  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(item => item.id !== id));
  };
  
  const clearCompare = () => setCompareList([]);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity,
      isCartOpen, setIsCartOpen,
      isSearchOpen, setIsSearchOpen,
      isAuthOpen, setIsAuthOpen,
      selectedProduct, setSelectedProduct,
      cartTotal,
      isLoading,
      user, setUser,
      wishlist, addToWishlist, removeFromWishlist,
      compareList, addToCompare, removeFromCompare, clearCompare,
      quickViewProduct, setQuickViewProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
