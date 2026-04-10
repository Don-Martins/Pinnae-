export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Microcontrollers' | 'Sensors' | 'Actuators' | 'Power' | 'Kits';
  image: string;
  rating: number;
  reviews: number;
  stock: number;
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
  wishlist: string[]; // Product IDs
  savedProjects: string[]; // Project IDs
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: { productId: string; quantity: number }[];
}
