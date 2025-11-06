export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in XLM
  category: 'budget' | 'middle' | 'bulk';
  items: string[]; // List of items in package
  image: string; // Image URL or path
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: Date;
  status: 'pending' | 'paid' | 'confirmed';
  walletAddress?: string;
  transactionHash?: string;
}

export type CategoryType = 'budget' | 'middle' | 'bulk';
