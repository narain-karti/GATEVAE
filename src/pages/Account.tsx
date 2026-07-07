import { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Heart, LogOut, Settings, ShoppingCart, Trash2 } from 'lucide-react';

export default function Account() {
  const { user, setUser, wishlist, removeFromWishlist, addToCart } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('wishlist');

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-[clamp(8rem,15vh,12rem)] pb-24 px-[clamp(1.5rem,5vw,5rem)] bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold uppercase tracking-tight mb-2 text-[#202020]">My Account</h1>
          <p className="text-gray-500 text-[clamp(1rem,1.5vw,1.125rem)]">Welcome back, {user.name}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-[clamp(1.5rem,4vw,3rem)]">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-[24px] p-6 shadow-sm sticky top-24">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">{user.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-gray-500 text-sm mb-6 break-all">{user.email}</p>
              
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'orders' ? 'bg-gray-50 text-[#202020]' : 'text-gray-500 hover:text-[#202020] hover:bg-gray-50'}`}
                >
                  <Package size={16} /> Orders
                </button>
                <button 
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'wishlist' ? 'bg-gray-50 text-[#202020]' : 'text-gray-500 hover:text-[#202020] hover:bg-gray-50'}`}
                >
                  <Heart size={16} /> Wishlist ({wishlist.length})
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'settings' ? 'bg-gray-50 text-[#202020]' : 'text-gray-500 hover:text-[#202020] hover:bg-gray-50'}`}
                >
                  <Settings size={16} /> Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-[32px] p-[clamp(1.5rem,4vw,3rem)] shadow-sm min-h-[400px]">
              {activeTab === 'orders' && (
                <>
                  <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">Recent Orders</h2>
                  
                  <div className="flex flex-col items-center justify-center text-gray-400 py-12 gap-4">
                    <Package size={48} className="opacity-50" />
                    <p className="uppercase tracking-widest font-medium text-sm">No orders yet</p>
                    <button 
                      onClick={() => navigate('/shop')}
                      className="mt-4 px-8 py-3 bg-[#202020] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                </>
              )}
              
              {activeTab === 'wishlist' && (
                <>
                  <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">My Wishlist</h2>
                  
                  {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-gray-400 py-12 gap-4">
                      <Heart size={48} className="opacity-50" />
                      <p className="uppercase tracking-widest font-medium text-sm">Your wishlist is empty</p>
                      <button 
                        onClick={() => navigate('/shop')}
                        className="mt-4 px-8 py-3 bg-[#202020] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors"
                      >
                        Explore Products
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {wishlist.map(product => (
                        <div key={product.id} className="border border-gray-100 rounded-2xl p-4 flex gap-4 relative group">
                          <Link to={`/product/${product.id}`} className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 relative overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                          </Link>
                          
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">{product.brand}</div>
                              <Link to={`/product/${product.id}`}>
                                <h3 className="font-bold text-sm leading-tight hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                              </Link>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-black">₹{product.price.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 bottom-4 justify-between bg-white/90 backdrop-blur pl-2">
                            <button 
                              onClick={() => removeFromWishlist(product.id)}
                              className="p-2 text-gray-400 hover:text-red-500 rounded-full bg-gray-50 hover:bg-red-50 transition-colors"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button 
                              onClick={() => addToCart(product)}
                              className="p-2 text-gray-400 hover:text-primary rounded-full bg-gray-50 hover:bg-primary/10 transition-colors"
                              title="Add to Cart"
                            >
                              <ShoppingCart size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {activeTab === 'settings' && (
                <>
                  <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">Account Settings</h2>
                  
                  <div className="flex flex-col items-center justify-center text-gray-400 py-12 gap-4">
                    <Settings size={48} className="opacity-50" />
                    <p className="uppercase tracking-widest font-medium text-sm">Settings coming soon</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
