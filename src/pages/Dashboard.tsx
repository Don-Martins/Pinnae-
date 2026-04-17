import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { DashboardProvider } from '../context/DashboardContext';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Login from './Login';

// Overview Components
import AdminOverview from './dashboard/admin/AdminOverview';
import SellerOverview from './dashboard/seller/SellerOverview';
import BuyerOverview from './dashboard/buyer/BuyerOverview';

// Admin Pages
import AdminProducts from './admin/AdminProducts';
import AdminCategories from './admin/AdminCategories';
import AdminProjects from './admin/AdminProjects';
import AdminBundles from './admin/AdminBundles';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';

// Seller Pages (Mock)
import SellerProducts from './dashboard/seller/SellerProducts';
import SellerOrders from './dashboard/seller/SellerOrders';
import SellerEarnings from './dashboard/seller/SellerEarnings';

// Buyer Pages (Mock)
import BuyerOrders from './dashboard/buyer/BuyerOrders';
import BuyerWishlist from './dashboard/buyer/BuyerWishlist';
import BuyerProjects from './dashboard/buyer/BuyerProjects';

// Global Settings
import DashboardSettings from './admin/AdminSettings'; 

const Dashboard = () => {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user && location.pathname !== '/dashboard/login') {
    return <Navigate to="/dashboard/login" />;
  }

  if (location.pathname === '/dashboard/login') {
    return <Login />;
  }

  const renderOverview = () => {
    switch (user?.role) {
      case 'admin': return <AdminOverview />;
      case 'seller': return <SellerOverview />;
      default: return <BuyerOverview />;
    }
  };

  return (
    <DashboardProvider>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={renderOverview()} />
          
          {/* Admin Routes */}
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/bundles" element={<AdminBundles />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
          {/* Seller Routes */}
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/earnings" element={<SellerEarnings />} />
          
          {/* Buyer Routes */}
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/buyer/wishlist" element={<BuyerWishlist />} />
          <Route path="/buyer/projects" element={<BuyerProjects />} />
          
          {/* Shared Routes */}
          <Route path="/settings" element={<DashboardSettings />} />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default Dashboard;
