export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  paymentMethods: string[];
  seller: {
    name: string;
    rating: number;
  };
  stock: number;
}