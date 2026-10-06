import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, HubCityId, LockerSize, LuggageItem } from '../types';
import { HUBS } from '../data/hubs';

interface BookingContextType {
  selectedHubId: HubCityId;
  setSelectedHubId: (id: HubCityId) => void;
  selectedSize: LockerSize;
  setSelectedSize: (size: LockerSize) => void;
  activeBooking: Booking | null;
  bookingsHistory: Booking[];
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isSizeRecommenderOpen: boolean;
  setIsSizeRecommenderOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  hubDetailModalId: HubCityId | null;
  setHubDetailModalId: (id: HubCityId | null) => void;
  // Booking creation & actions
  createBooking: (bookingData: Partial<Booking>) => Booking;
  extendBooking: (hours: number) => void;
  adjustFlightTime: (newFlightTime: string) => void;
  addLuggageItemToActive: (item: Omit<LuggageItem, 'id'>) => void;
}

const DEFAULT_BOOKING: Booking = {
  id: 'SC-10482',
  hubId: 'fortaleza',
  lockerSize: 'medium',
  lockerNumber: 'M-07',
  date: '06/10/2026',
  startTime: '13:00',
  endTime: '18:30',
  flightCode: 'LA-3419',
  customerName: 'Nayra Silva',
  customerEmail: 'nayraemail10@gmail.com',
  customerPhone: '+55 85 99841-2290',
  paymentMethod: 'pix',
  paymentStatus: 'paid',
  totalPrice: 49,
  status: 'stored',
  digitalPin: '849201',
  qrCodeToken: 'STP-SEC-FOR-M07-849201-TOKEN',
  luggageItems: [
    {
      id: 'lug-1',
      type: 'mala-bordo',
      name: 'Mala Preta Samsonite 10kg',
      description: 'Mala rígida de bordo com fita identificadora azul ciano e tag StopCase #04',
      tagColor: '#0EA5E9',
    },
    {
      id: 'lug-2',
      type: 'mochila',
      name: 'Mochila Notebook Bellroy',
      description: 'Mochila cinza escura resistente à água com bolso frontal',
      tagColor: '#64748B',
    },
  ],
  timeline: [
    { time: '12:45', label: 'Reserva confirmada online', completed: true },
    { time: '13:02', label: 'Locker M-07 aberto via QR Code', completed: true },
    { time: '13:05', label: 'Bagagens armazenadas e trancadas', completed: true, current: true },
    { time: '17:45', label: 'Lembrete de aproximação de voo', completed: false },
    { time: '18:15', label: 'Retirada das malas no aeroporto', completed: false },
  ],
  createdAt: '2026-10-06T12:45:00.000Z',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode; initialHubId?: HubCityId }> = ({
  children,
  initialHubId,
}) => {
  const [selectedHubId, setSelectedHubId] = useState<HubCityId>(initialHubId || 'sao-paulo-congonhas');
  const [selectedSize, setSelectedSize] = useState<LockerSize>('medium');
  const [activeBooking, setActiveBooking] = useState<Booking | null>(DEFAULT_BOOKING);
  const [bookingsHistory, setBookingsHistory] = useState<Booking[]>([DEFAULT_BOOKING]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSizeRecommenderOpen, setIsSizeRecommenderOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [hubDetailModalId, setHubDetailModalId] = useState<HubCityId | null>(null);

  const createBooking = (data: Partial<Booking>): Booking => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const hub = HUBS.find((h) => h.id === (data.hubId || selectedHubId)) || HUBS[0];
    const prefix = data.lockerSize === 'large' ? 'G' : data.lockerSize === 'medium' ? 'M' : 'P';
    const lockerNum = `${prefix}-${Math.floor(1 + Math.random() * 20).toString().padStart(2, '0')}`;

    const newBooking: Booking = {
      id: `SC-${randomNum}`,
      hubId: data.hubId || selectedHubId,
      lockerSize: data.lockerSize || selectedSize,
      lockerNumber: lockerNum,
      date: data.date || new Date().toLocaleDateString('pt-BR'),
      startTime: data.startTime || '14:00',
      endTime: data.endTime || '19:30',
      flightCode: data.flightCode || 'G3-1402',
      customerName: data.customerName || 'Viajante StopCase',
      customerEmail: data.customerEmail || 'viajante@email.com',
      customerPhone: data.customerPhone || '+55 11 99999-0000',
      paymentMethod: data.paymentMethod || 'pix',
      paymentStatus: 'paid',
      totalPrice: data.totalPrice || 49,
      status: 'reserved',
      digitalPin: pin,
      qrCodeToken: `STP-SEC-${hub.airportCode}-${lockerNum}-${pin}-TOKEN`,
      luggageItems: data.luggageItems && data.luggageItems.length > 0 ? data.luggageItems : [
        {
          id: 'lug-auto-1',
          type: 'mala-bordo',
          name: 'Mala Principal',
          description: 'Cadastrada na reserva',
          tagColor: '#0EA5E9',
        },
      ],
      timeline: [
        { time: data.startTime || '14:00', label: 'Reserva confirmada & Locker liberado', completed: true, current: true },
        { time: '+15 min', label: 'Chegada ao locker no aeroporto', completed: false },
        { time: data.endTime || '19:30', label: 'Retirada das bagagens para embarque', completed: false },
      ],
      createdAt: new Date().toISOString(),
    };

    setActiveBooking(newBooking);
    setBookingsHistory((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const extendBooking = (hours: number) => {
    if (!activeBooking) return;
    const [currentHour, currentMinute] = activeBooking.endTime.split(':').map(Number);
    const newHour = Math.min(23, currentHour + hours);
    const newEndTime = `${newHour.toString().padStart(2, '0')}:${(currentMinute || 0).toString().padStart(2, '0')}`;

    const updated: Booking = {
      ...activeBooking,
      endTime: newEndTime,
      totalPrice: activeBooking.totalPrice + hours * 15,
      timeline: [
        ...activeBooking.timeline,
        {
          time: newEndTime,
          label: `Extensão de +${hours}h confirmada (Nova retirada: ${newEndTime})`,
          completed: false,
        },
      ],
    };

    setActiveBooking(updated);
    setBookingsHistory((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const adjustFlightTime = (newFlightTime: string) => {
    if (!activeBooking) return;
    const [flightHour, flightMin] = newFlightTime.split(':').map(Number);
    // Safe buffer: pickup luggage 1h before flight
    const pickupHour = Math.max(0, flightHour - 1);
    const newEndTime = `${pickupHour.toString().padStart(2, '0')}:${(flightMin || 0).toString().padStart(2, '0')}`;

    const updated: Booking = {
      ...activeBooking,
      flightCode: activeBooking.flightCode ? `${activeBooking.flightCode} (Horário ajustado)` : undefined,
      endTime: newEndTime,
      timeline: [
        ...activeBooking.timeline,
        {
          time: newFlightTime,
          label: `Ajuste de voo para às ${newFlightTime} (Retirada sugerida às ${newEndTime})`,
          completed: false,
        },
      ],
    };

    setActiveBooking(updated);
  };

  const addLuggageItemToActive = (item: Omit<LuggageItem, 'id'>) => {
    if (!activeBooking) return;
    const newItem: LuggageItem = {
      ...item,
      id: `lug-${Date.now()}`,
    };
    const updated: Booking = {
      ...activeBooking,
      luggageItems: [...activeBooking.luggageItems, newItem],
    };
    setActiveBooking(updated);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedHubId,
        setSelectedHubId,
        selectedSize,
        setSelectedSize,
        activeBooking,
        bookingsHistory,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isSizeRecommenderOpen,
        setIsSizeRecommenderOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        hubDetailModalId,
        setHubDetailModalId,
        createBooking,
        extendBooking,
        adjustFlightTime,
        addLuggageItemToActive,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};
