export type CompanyId = 'all' | 'torre' | 'stop';

export type CityId = 'all' | 'poa' | 'ssa' | 'cgh' | 'for' | 'rec';

export type PeriodId = 'today' | '7d' | 'month' | 'quarter' | 'year';

export type PlatformModuleId =
  | 'dashboard'
  | 'commercial'
  | 'financial'
  | 'operational'
  | 'customers'
  | 'goals'
  | 'reports'
  | 'sites'
  | 'settings';

export interface CityInfo {
  id: CityId;
  name: string;
  state: string;
  airportCode: string;
  airportName: string;
  terminalTorre: string;
  terminalStop: string;
  activeTorreRentals: number;
  activeStopVolumes: number;
  monthlyRevenueTorre: number;
  monthlyRevenueStop: number;
  managerTorre: string;
  managerStop: string;
}

export interface SiteDescriptor {
  id: string;
  name: string;
  company: 'torre' | 'stop';
  cityId: CityId;
  cityName: string;
  state: string;
  airportCode: string;
  airportName: string;
  domain: string;
  status: 'active' | 'maintenance' | 'deploying';
  uptime: string;
  latency: string;
  pagesCount: number;
  pages: string[];
  monthlyVisitors: number;
  leadsCount: number;
  conversionRate: number;
  activeOrders: number;
  ticketAverage: number;
  address: string;
  phone: string;
  whatsapp: string;
  heroHeadline: string;
}

export interface ConsolidatedMetric {
  title: string;
  totalFormatted: string;
  torreFormatted: string;
  stopFormatted: string;
  torrePercent: number;
  stopPercent: number;
  trend: string;
  trendPositive: boolean;
  unit: string;
}

export interface CityComparisonData {
  cityId: CityId;
  cityName: string;
  state: string;
  airportCode: string;
  revenueTorre: number;
  revenueStop: number;
  revenueTotal: number;
  targetTotal: number;
  targetPercent: number;
  rentalsCount: number;
  volumesCount: number;
  conversionRate: number;
  ticketAverage: number;
  rank: number;
}
