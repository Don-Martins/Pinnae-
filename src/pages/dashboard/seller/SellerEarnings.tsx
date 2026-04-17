import React from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, Calendar } from 'lucide-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import { useAppContext } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';
import { motion } from 'motion/react';

const SellerEarnings = () => {
  const { products, orders } = useDashboardContext();
  const { user } = useAppContext();

  const sellerProducts = products.filter(p => p.sellerId === user?.id);
  const sellerProductIds = sellerProducts.map(p => p.id);
  
  const sellerOrders = orders.filter(order => 
    order.items.some(item => sellerProductIds.includes(item.productId))
  );

  const sellerRevenue = sellerOrders.reduce((acc, o) => {
    const itemsFromSeller = o.items.filter(item => sellerProductIds.includes(item.productId));
    const itemsTotal = itemsFromSeller.reduce((sum, item) => {
      const product = sellerProducts.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    return acc + itemsTotal;
  }, 0);

  const pendingPayout = sellerRevenue * 0.2; // Mock logic
  const availableBalance = sellerRevenue * 0.8; // Mock logic

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Earnings & Analytics</h1>
        <p className="text-[var(--text-muted)] mt-1">Detailed breakdown of your shop's financial performance.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-premium p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div>
                <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest">Gross Revenue</div>
                <div className="text-3xl font-bold font-display mt-1">${sellerRevenue.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-xs font-bold">
              <TrendingUp size={14} />
              +14.2%
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 60, 40, 75, 50, 90, 70, 85, 45, 65, 80, 95].map((h, i) => (
              <div key={i} className="flex-grow group relative h-full flex items-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="w-full bg-blue-500/20 rounded-t-lg group-hover:bg-blue-500 transition-all cursor-pointer" 
                />
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Month {i + 1}: ${(sellerRevenue / 12 * (h/50)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card-premium p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl shadow-blue-500/20">
            <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Available Balance</div>
            <div className="text-4xl font-bold mb-8 font-display">${availableBalance.toLocaleString()}</div>
            <button className="w-full py-4 bg-white text-blue-600 rounded-2xl text-sm font-bold shadow-lg hover:scale-[1.02] transition-transform active:scale-95">
              Withdraw Funds
            </button>
            <p className="text-[10px] opacity-60 text-center mt-4">Next payout scheduled: May 15, 2026</p>
          </div>

          <div className="card-premium p-6 space-y-6">
            <h3 className="font-bold">Financial Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                <span className="text-sm text-[var(--text-muted)]">Pending Payouts</span>
                <span className="font-bold text-sm">${pendingPayout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                <span className="text-sm text-[var(--text-muted)]">Sales Fee (10%)</span>
                <span className="font-bold text-sm text-red-500">-${(sellerRevenue * 0.1).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-[var(--text-muted)]">Processing Fees</span>
                <span className="font-bold text-sm text-red-500">-${(sellerRevenue * 0.02).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerEarnings;
