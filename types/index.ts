export interface Product {
  id: number;
  title: string;
  price: number;
}

export interface ProductWithPriceFormatted extends Product {
  priceFormatted: string;
}
