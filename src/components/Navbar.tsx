import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Sun, Moon, Search, Menu, X, Cpu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { theme, toggleTheme, cart, user } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isAdmin = user?.email.includes('admin') || user?.name.toLowerCase() === 'admin' || user?.email === 'donmartinz725@gmail.com';

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'DIY Projects', path: '/projects' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
      isScrolled ? 'glass' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Cpu size={24} />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">
            Pinnacle<span className="text-blue-500">Tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-blue-500',
                location.pathname === link.path ? 'text-blue-500' : 'text-[var(--text-muted)]'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--section)] transition-colors text-[var(--text-muted)]"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link to="/cart" className="relative p-2 rounded-full hover:bg-[var(--section)] transition-colors text-[var(--text-muted)]">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to={user ? "/dashboard" : "/dashboard/login"} className="hidden md:flex items-center gap-2 p-1 pr-3 rounded-full bg-[var(--section)] border border-[var(--border)] hover:border-blue-500/50 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                  <User size={16} />
                </div>
              )}
            </div>
            <span className="text-sm font-medium">{user ? user.name : 'Sign In'}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-[var(--section)] transition-colors text-[var(--text-muted)]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--border)] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 border-b border-[var(--border)] last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={user ? "/dashboard" : "/dashboard/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center mt-4"
              >
                {user ? 'Go to Dashboard' : 'Sign In'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
