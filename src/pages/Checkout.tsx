import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { supabase } from '../supabaseClient';
import React, { useState } from 'react';

export default function Checkout() {
  const { cart, cartTotal } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSEO({
    title: 'Checkout',
    description: 'Secure checkout for your premium tech gadgets.'
  });

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const orderData = {
      customer_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      customer_email: 'customer@example.com', // In a real app, capture this from form or user context
      customer_address: `${formData.get('address')}, ${formData.get('city')} ${formData.get('postalCode')}`,
      total_amount: cartTotal,
      status: 'pending'
    };

    try {
      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      alert('Order placed successfully! Check the Admin Dashboard.');
      window.location.href = '/';
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 bg-[#FAFAFA] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold uppercase tracking-tight mb-4">Your cart is empty</h2>
        <Link to="/shop" className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Form */}
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Checkout</h2>
          <form className="space-y-6" onSubmit={handleCheckout}>
            <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 border-b border-gray-200 pb-2">Shipping Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                <input name="firstName" type="text" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                <input name="lastName" type="text" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Address</label>
              <input name="address" type="text" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
                <input name="city" type="text" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Postal Code</label>
                <input name="postalCode" type="text" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 border-b border-gray-200 pb-2 pt-8">Payment</h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Card Number</label>
              <input type="text" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Expiry Date</label>
                <input type="text" placeholder="MM/YY" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">CVC</label>
                <input type="text" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-primary transition-colors mt-8 disabled:opacity-50">
              {isSubmitting ? 'Processing...' : `Place Order - ₹${cartTotal.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-[32px] p-8 h-fit shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="font-bold uppercase tracking-widest text-xl mb-8">Order Summary</h3>
          <div className="space-y-6 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm leading-tight">{item.name}</h4>
                  <p className="text-gray-500 text-sm mt-1">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-lg pt-4 border-t border-gray-100">
              <span className="font-bold uppercase tracking-widest">Total</span>
              <span className="font-bold text-primary">₹{cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
