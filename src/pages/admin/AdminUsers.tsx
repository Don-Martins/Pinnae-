import React, { useState } from 'react';
import { Users, Search, MoreVertical, Mail, Shield, Ban, UserCheck } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const AdminUsers = () => {
  const { users, toggleUserStatus } = useAdminContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Users Management</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage customer accounts and permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl text-sm font-bold">
            Total Users: {users.length}
          </div>
        </div>
      </div>

      <div className="card-premium p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
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
              <button className="p-2 hover:bg-[var(--section)] rounded-lg text-[var(--text-muted)]">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-[var(--section)] rounded-xl">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Orders</div>
                <div className="text-lg font-bold">{user.orders.length}</div>
              </div>
              <div className="p-3 bg-[var(--section)] rounded-xl">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Wishlist</div>
                <div className="text-lg font-bold">{user.wishlist.length}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleUserStatus(user.id)}
                className="flex-grow flex items-center justify-center gap-2 py-2.5 bg-red-500/10 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
              >
                <Ban size={14} />
                Disable Account
              </button>
              <button className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                <Shield size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
