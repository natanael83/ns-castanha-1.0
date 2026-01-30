
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  benefits: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum AppView {
  LANDING = 'landing',
  SHOP = 'shop',
  ABOUT = 'about'
}
