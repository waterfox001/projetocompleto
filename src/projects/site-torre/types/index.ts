export type UnitId = 'fortaleza' | 'porto-alegre' | 'recife' | 'sao-paulo-congonhas' | 'salvador';

export interface Unit {
  id: UnitId;
  name: string;
  state: string;
  fullName: string;
  airportName: string;
  airportCode: string;
  address: string;
  neighborhood: string;
  hours: string;
  whatsapp: string;
  phone: string;
  deliveryFee: number;
  coordinates: { x: number; y: number }; // For custom map rendering
  stats: {
    familiesServed: number;
    activeRentals: number;
    topProduct: string;
    satisfactionRate: number;
  };
}

export type ProductCategory =
  | 'Todos'
  | 'Carrinhos'
  | 'Bebê Conforto'
  | 'Cadeirinhas'
  | 'Berços'
  | 'Alimentação'
  | 'Brinquedos'
  | 'Banho & Cuidados'
  | 'Andadores';

export type AgeFilter =
  | 'all'
  | 'newborn' // Recém-nascido (0-3m)
  | '3m_plus' // +3 meses
  | '6m_plus' // +6 meses
  | '8m_plus' // +8 meses
  | 'toddler'; // +1 ano

export type AvailabilityStatus = 'available' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  ageGroup: string;
  ageFilterGroup: AgeFilter[];
  weightLimit: string;
  dailyPrice: number;
  originalDailyPrice?: number;
  imageUrl: string;
  galleryUrls?: string[];
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  idealFor: string[];
  specs: {
    weightKg: number;
    foldType: 'Ultracompacto (Bagageiro Avião)' | 'Guarda-chuva' | 'Livro / 1 Mão' | 'Dobrável com bolsa' | 'Fixo com Isofix';
    cabinApproved?: boolean;
    dimensions?: string;
    sanitizationType: string;
  };
  stockByUnit: Partial<Record<UnitId, AvailabilityStatus>>;
  complementaryProductIds: string[];
  isBestSeller?: boolean;
}

export interface ReadyKit {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  productIds: string[];
  itemsList: string[];
  dailyPrice: number;
  originalPrice: number;
  idealFor: string;
  weightSavedKg: number;
  imageUrl?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  startDate: string;
  endDate: string;
  days: number;
  unitId: UnitId;
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  babyName?: string;
  babyAgeMonths?: number;
  unitId: UnitId;
  startDate: string;
  endDate: string;
  days: number;
  deliveryType: 'airport' | 'hotel' | 'pickup';
  deliveryAddress: string;
  flightNumber?: string;
  hotelRoom?: string;
  items: {
    productId: string;
    productName: string;
    category: string;
    quantity: number;
    dailyPrice: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'pix' | 'credit_card';
  status: 'confirmed' | 'preparing' | 'sanitized' | 'in_transit' | 'delivered' | 'completed';
  createdAt: string;
  progressStep: number; // 0 to 5
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  destination: string;
  quote: string;
  babyAge: string;
  productsRented: string[];
  rating: number;
  avatarText: string;
}

export interface TravelGuide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  snippet: string;
  content: string[];
  tips: string[];
}
