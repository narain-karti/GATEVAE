import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';

function NavLink({ to, children, onClick, isScrolled }: { to: string, children: React.ReactNode, onClick?: () => void, isScrolled?: boolean }) {
  return (
    <Link to={to} onClick={onClick} className={`relative text-[12px] uppercase tracking-[0.08em] group flex items-center transition-colors duration-300 ${isScrolled ? 'text-[#202020] font-medium' : 'text-white font-bold'}`}>
      <motion.span 
        className="block transition-transform duration-300 group-hover:-translate-y-[2px]"
      >
        {children}
      </motion.span>
      <span className={`absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out ${isScrolled ? 'bg-[#202020]' : 'bg-white'}`} />
    </Link>
  );
}

export default function Navbar() {
  const { cart, setIsCartOpen, setIsSearchOpen, user, setIsAuthOpen } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleUserClick = () => {
    if (user) {
      navigate('/account');
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-[56px] md:h-[60px] transition-all duration-500 ${isScrolled ? 'border-b border-white/20' : ''}`}
        style={{
          background: isScrolled ? 'rgba(220, 235, 238, 0.55)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(18px)' : 'none',
        }}
      >
        <div className="max-w-[1600px] mx-auto h-full px-6 flex items-center justify-between relative">
          
          {/* Mobile Menu Button */}
          <div className="flex-1 md:hidden flex justify-start">
            <button 
              className={`transition-colors duration-300 ${isScrolled ? 'text-[#202020]' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Left Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-start gap-[15px] lg:gap-[30px] xl:gap-[40px]">
            <NavLink to="/shop" isScrolled={isScrolled}>SHOP</NavLink>
            <NavLink to="/devices" isScrolled={isScrolled}>DEVICES</NavLink>
            <NavLink to="/gadgets" isScrolled={isScrolled}>GADGETS</NavLink>
            <NavLink to="/trending" isScrolled={isScrolled}>TRENDING</NavLink>
          </div>

          {/* Center Logo Island */}
          <div className="flex-shrink-0 flex justify-center h-full z-10">
            <Link 
              to="/"
              className="w-[160px] md:w-[200px] h-[56px] md:h-[60px] flex items-center justify-center transition-transform hover:scale-[1.02]"
              style={{
                background: 'rgba(245, 245, 245, 0.92)',
                borderBottomLeftRadius: '30px',
                borderBottomRightRadius: '30px',
                boxShadow: '0px 10px 40px rgba(0,0,0,0.08)'
              }}
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-[#111] text-[20px] md:text-[24px] font-bold tracking-[-0.05em]"
              >
                GateVae
              </motion.span>
            </Link>
          </div>

          {/* Right Navigation & Actions */}
          <div className="flex-1 flex items-center justify-end gap-[15px] lg:gap-[30px] xl:gap-[40px]">
            <div className="hidden lg:flex items-center gap-[30px] xl:gap-[40px]">
              <NavLink to="/new-arrivals" isScrolled={isScrolled}>NEW ARRIVALS</NavLink>
              <NavLink to="/accessories" isScrolled={isScrolled}>ACCESSORIES</NavLink>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="w-[42px] h-[42px] rounded-full bg-[#202020] flex items-center justify-center hover:scale-105 hover:bg-[#5E0ED7] transition-all duration-300 text-white"
              >
                <Search size={18} />
              </button>
              
              <button 
                onClick={handleUserClick}
                aria-label="User Account"
                className="hidden md:flex items-center justify-center h-[42px] px-[28px] rounded-full bg-[#202020] text-white text-[11px] font-bold uppercase tracking-widest hover:scale-105 hover:bg-[#5E0ED7] transition-all duration-300"
              >
                {user ? 'PROFILE' : 'SIGN IN / UP'}
              </button>

              <button 
                onClick={() => navigate('/cart')}
                aria-label="Shopping Cart"
                className="relative w-[42px] h-[42px] rounded-full bg-[#202020] flex items-center justify-center hover:scale-105 hover:bg-[#5E0ED7] transition-all duration-300 text-white"
              >
                <ShoppingBag size={18} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[#5E0ED7] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-[#202020]">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col md:hidden"
          >
            <div className="p-6 flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Mobile Menu" className="p-2 text-[#202020]">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {['SHOP', 'DEVICES', 'GADGETS', 'TRENDING', 'NEW ARRIVALS', 'ACCESSORIES'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold uppercase tracking-widest text-[#202020] hover:text-[#5E0ED7] transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Link 
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold uppercase tracking-widest text-[#202020] hover:text-[#5E0ED7] transition-colors"
                >
                  ACCOUNT
                </Link>
              </motion.div>
            </div>

            <div className="p-8 flex flex-col gap-4 mt-auto">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleUserClick(); }}
                className="w-full py-4 rounded-full bg-[#202020] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#5E0ED7] transition-colors"
              >
                {user ? 'PROFILE' : 'SIGN IN'}
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); navigate('/cart'); }}
                className="w-full py-4 rounded-full border-2 border-[#202020] text-[#202020] font-bold uppercase tracking-widest text-sm hover:bg-gray-50 transition-colors"
              >
                CART ({cartItemsCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
