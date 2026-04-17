/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import DIYProjects from './pages/DIYProjects';
import ProjectDetails from './pages/ProjectDetails';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith('/dashboard');

  if (isDashboardPath) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen pt-20"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardPath && <Navbar />}
      <main className="flex-grow">
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/projects" element={<DIYProjects />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </PageWrapper>
      </main>
      {!isDashboardPath && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

