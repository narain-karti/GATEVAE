import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Orders</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-600 text-sm">Order ID</th>
              <th className="px-6 py-4 font-medium text-gray-600 text-sm">Customer</th>
              <th className="px-6 py-4 font-medium text-gray-600 text-sm">Date</th>
              <th className="px-6 py-4 font-medium text-gray-600 text-sm">Total</th>
              <th className="px-6 py-4 font-medium text-gray-600 text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-500">
                  {order.id.split('-')[0]}...
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">{order.customer_name}</p>
                  <p className="text-xs text-gray-500">{order.customer_email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  ₹{order.total_amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
