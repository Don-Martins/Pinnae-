import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import { useAppContext } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';

const SellerOrders = () => {
  const { products, orders } = useDashboardContext();
  const { user } = useAppContext();

  const sellerProductIds = products.filter(p => p.sellerId === user?.id).map(p => p.id);
  const sellerOrders = orders.filter(order => 
    order.items.some(item => sellerProductIds.includes(item.productId))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Orders</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage orders containing your products.</p>
      </div>
      
      <div className="card-premium p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[var(--section)] border-b border-[var(--border)]">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Customer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {sellerOrders.map(order => (
              <tr key={order.id} className="hover:bg-[var(--section)] transition-colors">
                <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{order.userName}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm text-[var(--text-muted)]">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
