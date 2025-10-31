export interface Furniture {
  id?: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  length?: number;
  width?: number;
  height?: number;
  category?: string;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  user: {
    id: number;
    name?: string;
  };
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface OrderItem {
  id: number;
  furnitureId: number;
  quantity: number;
  price: number;
  // Optional relation
  furniture?: {
    id: number;
    name: string;
    image?: string;
    price: number;
  };
}

export type OrderStatus = "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string; // ISO date string
  // Optional relation
  user?: {
    id: number;
    name: string;
    email: string;
  };
}
