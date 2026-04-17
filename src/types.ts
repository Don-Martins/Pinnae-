export type UserRole = 'buyer' | 'seller' | 'admin';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  sellerId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  videoUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  bundleId: string;
  components: string[]; // List of product IDs
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  projectIds: string[];
  productIds: string[];
  discountPercentage: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  wishlist: string[]; // Product IDs
  savedProjects: string[]; // Project IDs
  orders: string[]; // Order IDs
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
  items: { productId: string; quantity: number }[];
}

export type Category = 'Microcontrollers' | 'Sensors' | 'Actuators' | 'Power' | 'Kits';
