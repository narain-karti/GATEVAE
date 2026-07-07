export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  brand: string;
  isNew?: boolean;
  specs?: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}
