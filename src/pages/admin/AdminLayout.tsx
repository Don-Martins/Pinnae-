import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Cpu, 
  Box, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Bell, 
  Sun, 
  Moon,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { AdminProvider } from '../../context/AdminContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Admin Pages
import AdminOverview from './AdminOverview';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminProjects from './AdminProjects';
import AdminBundles from './AdminBundles';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';

const AdminLayout = () => {
  const { user, theme, toggleTheme, logout } = useAppContext();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Simple admin check (for prototype purposes, we check if name is 'admin' or email contains 'admin')
  const isAdmin = user?.email.includes('admin') || user?.name.toLowerCase() === 'admin' || user?.email === 'donmartinz725@gmail.com';

  if (!user) return <Navigate to="/dashboard/login" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Projects', path: '/admin/projects', icon: Cpu },
    { name: 'Bundles', path: '/admin/bundles', icon: Box },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const Sidebar = ({ mobile = false }) => (
    <div className={cn(
      "flex flex-col h-full bg-[var(--card)] border-r border-[var(--border)] transition-all duration-300",
      mobile ? "w-72" : (isSidebarCollapsed ? "w-20" : "w-72")
    )}>
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
            <Cpu size={24} />
          </div>
          {(!isSidebarCollapsed || mobile) && (
            <span className="font-display font-bold text-xl tracking-tight truncate">
              Pinnacle<span className="text-blue-500">Admin</span>
            </span>
          )}
        </Link>
        {!mobile && (
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-1.5 hover:bg-[var(--section)] rounded-lg text-[var(--text-muted)] transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setIsMobileSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                  : "text-[var(--text-muted)] hover:bg-[var(--section)] hover:text-[var(--text)]"
              )}
            >
              <item.icon size={20} className="shrink-0" />
              {(!isSidebarCollapsed || mobile) && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
              {isSidebarCollapsed && !mobile && (
                <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-4 border-t border-[var(--border)]">
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all",
            isSidebarCollapsed && !mobile ? "justify-center" : ""
          )}
        >
          <LogOut size={20} />
          {(!isSidebarCollapsed || mobile) && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <AdminProvider>
      <div className="min-h-screen bg-[var(--section)] flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed inset-y-0 left-0 z-30">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 z-50 lg:hidden"
              >
                <Sidebar mobile />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={cn(
          "flex-grow flex flex-col transition-all duration-300",
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
        )}>
          {/* Topbar */}
          <header className="h-20 bg-[var(--card)] border-b border-[var(--border)] px-6 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-[var(--section)] rounded-lg text-[var(--text-muted)]"
              >
                <Menu size={24} />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="pl-10 pr-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500 w-64 lg:w-96 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="p-2 hover:bg-[var(--section)] rounded-xl text-[var(--text-muted)] transition-colors"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button className="p-2 hover:bg-[var(--section)] rounded-xl text-[var(--text-muted)] relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--card)]" />
              </button>
              <div className="w-px h-6 bg-[var(--border)] mx-2" />
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold leading-none">{user?.name}</div>
                  <div className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">Administrator</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Routes>
                  <Route path="/" element={<AdminOverview />} />
                  <Route path="/products" element={<AdminProducts />} />
                  <Route path="/categories" element={<AdminCategories />} />
                  <Route path="/projects" element={<AdminProjects />} />
                  <Route path="/bundles" element={<AdminBundles />} />
                  <Route path="/orders" element={<AdminOrders />} />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/settings" element={<AdminSettings />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
