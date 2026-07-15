import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Package, ShoppingCart, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: productCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount');

        const orderCount = orders?.length || 0;
        const revenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

        setStats({
          products: productCount || 0,
          orders: orderCount,
          revenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <p className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
            <p className="text-2xl font-bold">{stats.orders}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Products</p>
            <p className="text-2xl font-bold">{stats.products}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
