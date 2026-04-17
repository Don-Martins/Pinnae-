import React, { useState } from 'react';
import { Users, Search, MoreVertical, Mail, Shield, Ban, UserCheck, X } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';
import { UserRole } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const AdminUsers = () => {
  const { users, updateUserRole } = useDashboardContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Users & Roles</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage user permissions and platform access levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl text-sm font-bold">
            Total Accounts: {users.length}
          </div>
        </div>
      </div>

      <div className="card-premium p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <motion.div 
            layout
            key={user.id}
            className="card-premium p-6 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[var(--section)] border border-[var(--border)]">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1">
                    <Mail size={12} />
                    {user.email}
                  </div>
                </div>
              </div>
              <div className={cn(
                "px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-widest border",
                user.role === 'admin' ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                user.role === 'seller' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                "bg-gray-500/10 text-gray-500 border-gray-500/20"
              )}>
                {user.role}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-[var(--section)] rounded-xl">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Orders</div>
                <div className="text-lg font-bold">{user.orders.length}</div>
              </div>
              <div className="p-3 bg-[var(--section)] rounded-xl">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Items</div>
                <div className="text-lg font-bold">{user.wishlist.length}</div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Adjust Role</label>
              <div className="flex items-center gap-2">
                <select 
                  value={user.role}
                  onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                  className="flex-grow py-2.5 px-3 bg-[var(--section)] border border-[var(--border)] rounded-xl text-xs font-bold transition-all focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="buyer">Buyer Account</option>
                  <option value="seller">Seller Account</option>
                  <option value="admin">Admin Account</option>
                </select>
                <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl shrink-0">
                  <Shield size={16} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
