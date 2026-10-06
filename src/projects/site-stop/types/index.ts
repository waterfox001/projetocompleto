export type HubCityId = 'fortaleza' | 'recife' | 'salvador' | 'porto-alegre' | 'sao-paulo-congonhas';

export interface HubCity {
  id: HubCityId;
  name: string;
  state: string;
  airportCode: string;
  airportName: string;
  locationDetails: string;
  openingHours: string;
  is24Hours: boolean;
  status: 'active' | 'expanding';
  coordinates: { lat: number; lng: number };
  lockersCount: {
    small: number;
    medium: number;
    large: number;
  };
  liveOccupancyRate: number; // e.g. 78%
  nearbyHighlights: { name: string; time: string; distance: string }[];
  directions: string[];
  contactPhone: string;
  address: string;
}

export type LockerSize = 'small' | 'medium' | 'large';

export interface LockerType {
  id: LockerSize;
  name: string;
  tagline: string;
  dimensionsVisual: string;
  capacityDescription: string;
  hourlyPrice: number;
  dailyPrice: number;
  popularFor: string;
  maxBagsDescription: string;
  volumeLiters: number;
}

export interface LuggageItem {
  id: string;
  type: 'mala-bordo' | 'mala-despachada' | 'mochila' | 'bolsa' | 'equipamento' | 'outro';
  name: string;
  description: string;
  photoUrl?: string;
  tagColor?: string;
}

export interface Booking {
  id: string; // e.g. "SC-10482"
  hubId: HubCityId;
  lockerSize: LockerSize;
  lockerNumber: string; // e.g. "L-14"
  date: string;
  startTime: string;
  endTime: string;
  flightCode?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: 'pix' | 'credit_card';
  paymentStatus: 'paid' | 'pending';
  totalPrice: number;
  status: 'reserved' | 'stored' | 'ready_for_pickup' | 'completed' | 'cancelled';
  digitalPin: string;
  qrCodeToken: string;
  luggageItems: LuggageItem[];
  timeline: {
    time: string;
    label: string;
    completed: boolean;
    current?: boolean;
  }[];
  createdAt: string;
}

export interface AdminMetrics {
  todayBookings: number;
  activeLockers: number;
  totalCapacity: number;
  todayRevenue: number;
  averageTicket: number;
  topHub: string;
  satisfactionScore: number;
}
