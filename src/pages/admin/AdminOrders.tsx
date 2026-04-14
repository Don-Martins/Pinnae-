import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, MoreVertical, Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';
import { Order } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         o.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses: Order['status'][] = ['Pending', 'Paid', 'Shipped', 'Delivered'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Orders Management</h1>
          <p className="text-[var(--text-muted)] mt-1">Track and manage customer orders and fulfillment.</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Filters & Search */}
      <div className="card-premium p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card-premium p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--section)] border-b border-[var(--border)]">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Customer</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Total</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--section)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm font-medium">{order.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs font-bold">
                        {order.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{order.userName}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">Customer ID: {order.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-sm">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all",
                        order.status === 'Delivered' ? "bg-green-500/10 text-green-500" :
                        order.status === 'Shipped' ? "bg-blue-500/10 text-blue-500" :
                        order.status === 'Paid' ? "bg-purple-500/10 text-purple-500" :
                        "bg-orange-500/10 text-orange-500"
                      )}
                    >
                      {statuses.map(s => (
                        <option key={s} value={s} className="bg-[var(--card)] text-[var(--text)]">{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-blue-500/10 hover:text-blue-500 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-[var(--section)] rounded-lg text-[var(--text-muted)]">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
