import React from 'react';
import { Package } from 'lucide-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import { useAppContext } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

const BuyerOrders = () => {
  const { orders } = useDashboardContext();
  const { user } = useAppContext();

  const buyerOrders = orders.filter(o => o.userId === user?.id);

  if (buyerOrders.length === 0) {
    return (
      <div className="card-premium p-12 text-center">
        <Package size={48} className="mx-auto mb-6 text-[var(--text-muted)]" />
        <h3 className="text-xl font-bold mb-2">No orders yet</h3>
        <p className="text-[var(--text-muted)] mb-8">You haven't placed any orders yet. Start exploring our marketplace!</p>
        <Link to="/marketplace" className="btn-primary inline-flex">Shop Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">My Orders</h1>
        <p className="text-[var(--text-muted)] mt-1">Track and manage your recent purchases.</p>
      </div>
      
      <div className="space-y-4">
        {buyerOrders.map(order => (
          <div key={order.id} className="card-premium p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Package size={24} />
              </div>
              <div>
                <div className="font-bold text-sm">{order.id}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">Placed on {order.date}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Status</div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  order.status === 'Delivered' ? "bg-green-500/10 text-green-500" :
                  order.status === 'Shipped' ? "bg-blue-500/10 text-blue-500" :
                  "bg-orange-500/10 text-orange-500"
                )}>
                  {order.status}
                </span>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Total</div>
                <div className="font-bold text-sm">${order.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerOrders;
