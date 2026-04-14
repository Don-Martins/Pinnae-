import React, { createContext, useContext, useState } from 'react';
import { Product, Project, Bundle, Order, User, Category } from '../types';
import { PRODUCTS, PROJECTS, BUNDLES, ORDERS, USERS } from '../mockData';

interface AdminContextType {
  products: Product[];
  projects: Project[];
  bundles: Bundle[];
  orders: Order[];
  users: User[];
  categories: string[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addBundle: (bundle: Omit<Bundle, 'id'>) => void;
  updateBundle: (id: string, bundle: Partial<Bundle>) => void;
  deleteBundle: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  toggleUserStatus: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [bundles, setBundles] = useState<Bundle[]>(BUNDLES);
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [users, setUsers] = useState<User[]>(USERS);
  const [categories] = useState<string[]>(['Microcontrollers', 'Sensors', 'Actuators', 'Power', 'Kits']);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `p${Date.now()}` } as Product;
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: `proj${Date.now()}` } as Project;
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addBundle = (bundle: Omit<Bundle, 'id'>) => {
    const newBundle = { ...bundle, id: `b${Date.now()}` } as Bundle;
    setBundles(prev => [newBundle, ...prev]);
  };

  const updateBundle = (id: string, updates: Partial<Bundle>) => {
    setBundles(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBundle = (id: string) => {
    setBundles(prev => prev.filter(b => b.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const toggleUserStatus = (id: string) => {
    // In a real app we might have an 'isActive' field
    console.log(`Toggling status for user ${id}`);
  };

  return (
    <AdminContext.Provider value={{
      products, projects, bundles, orders, users, categories,
      addProduct, updateProduct, deleteProduct,
      addProject, updateProject, deleteProject,
      addBundle, updateBundle, deleteBundle,
      updateOrderStatus, toggleUserStatus
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdminContext must be used within AdminProvider');
  return context;
};
