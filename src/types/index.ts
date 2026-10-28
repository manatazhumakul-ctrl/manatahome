export type Language = 'EN' | 'RU' | 'KG' | 'IT' | 'DE';
export type Currency = 'USD' | 'EUR';

export type MainCategory = 'all' | 'home-living' | 'beauty-selfcare';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: Record<Language, string> | Record<string, string>;
  category: 'home-living' | 'beauty-selfcare';
  categoryLabel: Record<Language, string> | Record<string, string>;
  subcategory: Record<Language, string> | Record<string, string>;
  priceUSD: number;
  priceEUR: number;
  isBestseller?: boolean;
  isNew?: boolean;
  shortDesc: Record<Language, string> | Record<string, string>;
  fullDesc: Record<Language, string> | Record<string, string>;
  features: Record<Language, string[]> | Record<string, string[]>;
  specs: Record<Language, ProductSpec[]> | Record<string, ProductSpec[]>;
  illustrationType:
    | 'diffuser'
    | 'roller'
    | 'storage-box'
    | 'glass-jars'
    | 'bamboo-caddy'
    | 'hair-turban'
    | 'cosmetic-stand'
    | 'linen-apron';
  inStock: boolean;
  sampleNotice: Record<Language, string> | Record<string, string>;
  // Optional video demonstration support
  hasVideo?: boolean;
  videoUrl?: string;
  videoTitle?: Record<Language, string> | Record<string, string>;
  videoDuration?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: { label: string; action: string }[];
}

export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'returns' | 'cookies';

// Customer Account types
export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  memberSince: string;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
}

export interface CustomerOrder {
  id: string;
  date: string;
  itemsCount: number;
  totalUSD: number;
  totalEUR: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  carrier: string;
  trackingNumber: string;
  itemsSummary: string;
}
