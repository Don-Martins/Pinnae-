import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, UserRole } from '../types';
import { PRODUCTS, USERS } from '../mockData';
import { authService } from '../services/authService';
import { cartService } from '../services/cartService';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved && saved !== 'null') return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse cart', e);
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      if (saved && saved !== 'null') return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse wishlist', e);
    }
    return [];
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved && saved !== 'null') {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse user from storage', e);
      localStorage.removeItem('user');
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync cart with backend if user is logged in
  useEffect(() => {
    if (user && user.access_token) {
      cartService.getCart().then(data => {
        if (data.cart && data.cart.items) {
          const apiItems = data.cart.items.map((item: any) => ({
            productId: String(item.product_id),
            quantity: item.quantity,
            id: item.id // Keep the item mapping ID for updates
          }));
          setCart(apiItems);
        }
      }).catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addToCart = async (productId: string, quantity = 1) => {
    if (user && user.access_token) {
      try {
        const data = await cartService.addProduct(productId, quantity);
        if (data.cart && data.cart.items) {
          const apiItems = data.cart.items.map((item: any) => ({
            productId: String(item.product_id),
            quantity: item.quantity,
            id: item.id
          }));
          setCart(apiItems);
        }
      } catch (error) {
        console.error('Failed to add to cart via API', error);
      }
    } else {
      setCart(prev => {
        const existing = prev.find(item => item.productId === productId);
        if (existing) {
          return prev.map(item => 
            item.productId === productId 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          );
        }
        return [...prev, { productId, quantity }];
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (user && user.access_token) {
      // Need the item ID from backend, which we should have in the cart state
      const item = cart.find(i => i.productId === productId);
      if (item && (item as any).id) {
        try {
          await cartService.removeProduct((item as any).id);
          setCart(prev => prev.filter(i => i.productId !== productId));
        } catch (error) {
          console.error('Failed to remove from cart via API', error);
        }
      }
    } else {
      setCart(prev => prev.filter(item => item.productId !== productId));
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (user && user.access_token) {
      const item = cart.find(i => i.productId === productId);
      if (item && (item as any).id) {
        try {
          await cartService.updateQuantity((item as any).id, quantity);
          setCart(prev => prev.map(i => 
            i.productId === productId ? { ...i, quantity } : i
          ));
        } catch (error) {
          console.error('Failed to update quantity via API', error);
        }
      }
    } else {
      setCart(prev => prev.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = async () => {
    if (user && user.access_token) {
      try {
        await cartService.clearCart();
        setCart([]);
      } catch (error) {
        console.error('Failed to clear cart via API', error);
      }
    } else {
      setCart([]);
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const login = async (email: string, password = 'password') => {
    try {
      const data = await authService.login({ email, password });
      
      const loggedUser: User = {
        id: String(data.user.id),
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
        role: data.user.role as UserRole,
        wishlist: [],
        savedProjects: [],
        orders: [],
        access_token: data.access_token,
        token_type: data.token_type
      };
      
      setUser(loggedUser);
    } catch (error) {
      console.error('Login failed', error);
      // Fallback to mock login if API is not available or fails for specific reason
      // But for this task, the goal is to use the API.
      throw error;
    }
  };

  const logout = async () => {
    if (user && user.access_token) {
      try {
        await authService.logout();
      } catch (error) {
        console.error('Logout failed on backend', error);
      }
    }
    setUser(null);
    setCart([]);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser(prev => prev ? { ...prev, role } : null);
    }
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      wishlist, toggleWishlist,
      user, login, logout, switchRole,
      searchQuery, setSearchQuery,
      selectedCategory, setSelectedCategory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
