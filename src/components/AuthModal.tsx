import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import React, { useState } from 'react';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, setUser } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      setUser({ name: 'Tech Enthusiast', email });
    } else {
      setUser({ name, email });
    }
    setIsAuthOpen(false);
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="bg-white/90 backdrop-blur-xl rounded-[32px] w-full max-w-md p-[clamp(1.5rem,4vw,2.5rem)] shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative border border-white/40"
            >
              <button 
                onClick={() => setIsAuthOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold uppercase tracking-tight mb-2 text-[#202020]">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-500 mb-8 text-[clamp(0.875rem,1.5vw,1rem)]">
                {isLogin ? 'Sign in to access your orders.' : 'Join the future of technology shopping.'}
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} required className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-[#202020]" />
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-[#202020]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-[#202020]" />
                </div>
                {!isLogin && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Confirm Password</label>
                    <input type="password" required className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-[#202020]" />
                  </div>
                )}

                <button type="submit" className="w-full bg-[#202020] text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-[#5E0ED7] hover:scale-[1.02] transition-all duration-300 mt-4 shadow-lg shadow-black/10">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

