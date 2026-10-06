import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Truck,
  RotateCcw,
  Navigation,
  Clock,
  Phone,
  User,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Search,
  Plus,
  Compass,
  Gauge,
  UserCheck,
  Check,
  X,
  MessageCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DriverItem {
  id: string;
  name: string;
  vehicle: string;
  plate: string;
  phone: string;
  status: 'em_entrega' | 'em_coleta' | 'disponivel' | 'atrasado';
  currentDelivery: string;
  client: string;
  destination: string;
  eta: string;
  lastLocation: string;
  distance: string;
  speed: string;
  battery: string;
  completedToday: number;
  totalPending: number;
  pos: { top: string; left: string };
  stops: {
    order: number;
    type: 'entrega' | 'coleta';
    code: string;
    client: string;
    address: string;
    item: string;
    timeWindow: string;
    status: 'concluida' | 'em_andamento' | 'pendente';
  }[];
}

interface IncidentItem {
  id: string;
  driverName: string;
  driverPhone: string;
  code: string;
  client: string;
  type: string;
  description: string;
  time: string;
  status: 'aberto' | 'resolvido';
}

interface LogisticsMapViewProps {
  subTab?: string;
}

export const LogisticsMapView: React.FC<LogisticsMapViewProps> = ({ subTab }) => {
  const { openWhatsAppModal } = useApp();

  const [activeTab, setActiveTab] = useState<'mapa' | 'rastreamento' | 'rotas' | 'motoristas' | 'ocorrencias' | 'performance'>('mapa');
  const [selectedDriverId, setSelectedDriverId] = useState<string>('drv-1');
  const [filterType, setFilterType] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
  const [isNewDriverModalOpen, setIsNewDriverModalOpen] = useState(false);
  const [isNewIncidentModalOpen, setIsNewIncidentModalOpen] = useState(false);
  const [isNewRouteModalOpen, setIsNewRouteModalOpen] = useState(false);

  // New Driver Form State
  const [newDriverName, setNewDriverName] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');
  const [newVehicleModel, setNewVehicleModel] = useState('');
  const [newVehiclePlate, setNewVehiclePlate] = useState('');

  // New Incident Form State
  const [newIncidentDriver, setNewIncidentDriver] = useState('João Silva');
  const [newIncidentType, setNewIncidentType] = useState('Cliente Ausente no Local');
  const [newIncidentCode, setNewIncidentCode] = useState('#LOC-1024');
  const [newIncidentDesc, setNewIncidentDesc] = useState('');

  // New Route Form State
  const [newRouteRegion, setNewRouteRegion] = useState('Zona Sul - Morumbi & Campo Belo');
  const [newRouteDriver, setNewRouteDriver] = useState('João Silva');
  const [newRouteDate, setNewRouteDate] = useState('2026-10-06');

  // Sync subTab from navigation
  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'driver_tracking') setActiveTab('rastreamento');
    else if (subTab === 'routes_logistics') setActiveTab('rotas');
    else if (subTab === 'drivers_list') setActiveTab('motoristas');
    else if (subTab === 'logistics_incidents') setActiveTab('ocorrencias');
    else if (subTab === 'logistics_performance') setActiveTab('performance');
    else setActiveTab('mapa');
  }, [subTab]);

  // Initial Drivers Data
  const [drivers, setDrivers] = useState<DriverItem[]>([
    {
      id: 'drv-1',
      name: 'João Silva',
      vehicle: 'Fiorino Refrigerada Kids #01',
      plate: 'BRA-9E82',
      phone: '(11) 98888-1101',
      status: 'em_entrega',
      currentDelivery: '#LOC-1024 (Cadeirinha CC-024)',
      client: 'Mariana Costa Silveira',
      destination: 'Rua Bela Cintra, 1420 - Jardins',
      eta: '10:45 (Em 12 min)',
      lastLocation: 'Av. Paulista próx. Al. Campinas',
      distance: '2.4 km restantes',
      speed: '34 km/h',
      battery: '94%',
      completedToday: 3,
      totalPending: 2,
      pos: { top: '38%', left: '42%' },
      stops: [
        { order: 1, type: 'entrega', code: '#LOC-1021', client: 'Beatriz Vasconcelos', address: 'Rua Oscar Freire, 820', item: 'Carrinho YOYO²', timeWindow: '08:30 - 09:30', status: 'concluida' },
        { order: 2, type: 'entrega', code: '#LOC-1022', client: 'Camila Peixoto', address: 'Al. Lorena, 1100', item: 'Berço Next2Me', timeWindow: '09:30 - 10:15', status: 'concluida' },
        { order: 3, type: 'coleta', code: '#LOC-1019', client: 'Renato Faria', address: 'Rua Bela Cintra, 650', item: 'Cadeira Tripp Trapp', timeWindow: '10:15 - 10:45', status: 'concluida' },
        { order: 4, type: 'entrega', code: '#LOC-1024', client: 'Mariana Costa Silveira', address: 'Rua Bela Cintra, 1420', item: 'Cadeirinha CC-024', timeWindow: '10:45 - 11:30', status: 'em_andamento' },
        { order: 5, type: 'coleta', code: '#LOC-1020', client: 'Sabrina Sato Maia', address: 'Rua Augusta, 2400', item: 'Bebê Conforto Cybex', timeWindow: '11:45 - 12:30', status: 'pendente' }
      ]
    },
    {
      id: 'drv-2',
      name: 'Marcos Santos',
      vehicle: 'Kwid Cargo Urbano #02',
      plate: 'KID-4421',
      phone: '(11) 98888-1102',
      status: 'em_coleta',
      currentDelivery: 'Coleta #LOC-1031 (Banheira BN-003)',
      client: 'Renata Vasconcellos',
      destination: 'Alameda Lorena, 1890 - Cerqueira César',
      eta: '14:20 (Janela da tarde)',
      lastLocation: 'Rua Augusta próx. Oscar Freire',
      distance: '1.1 km restantes',
      speed: '28 km/h',
      battery: '88%',
      completedToday: 2,
      totalPending: 3,
      pos: { top: '52%', left: '49%' },
      stops: [
        { order: 1, type: 'entrega', code: '#LOC-1027', client: 'Diego Nogueira', address: 'Av. Brigadeiro Luis Antonio, 3400', item: 'Carrinho Priam Lux', timeWindow: '09:00 - 10:00', status: 'concluida' },
        { order: 2, type: 'coleta', code: '#LOC-1023', client: 'Carolina Ferraz', address: 'Rua Pamplona, 950', item: 'Cadeirinha Matrix', timeWindow: '10:30 - 11:30', status: 'concluida' },
        { order: 3, type: 'coleta', code: '#LOC-1031', client: 'Renata Vasconcellos', address: 'Al. Lorena, 1890', item: 'Banheira BN-003', timeWindow: '14:00 - 15:00', status: 'em_andamento' },
        { order: 4, type: 'entrega', code: '#LOC-1032', client: 'Felipe Alcantara', address: 'Rua Haddock Lobo, 400', item: 'Cadeirinha Maxi-Cosi', timeWindow: '15:15 - 16:00', status: 'pendente' }
      ]
    },
    {
      id: 'drv-3',
      name: 'Felipe Santana',
      vehicle: 'Doblò Maxi Carga #03',
      plate: 'SPK-7712',
      phone: '(11) 98888-1103',
      status: 'atrasado',
      currentDelivery: 'Tentativa Reagendada #LOC-1022',
      client: 'Rodrigo Santoro Filho',
      destination: 'Rua Itambé, 450 - Higienópolis',
      eta: 'Atrasado em 25 min (Trânsito pesado)',
      lastLocation: 'Av. Rebouças próx. Marginal Pinheiros',
      distance: '4.8 km restantes',
      speed: '12 km/h',
      battery: '62%',
      completedToday: 1,
      totalPending: 4,
      pos: { top: '32%', left: '33%' },
      stops: [
        { order: 1, type: 'entrega', code: '#LOC-1022', client: 'Rodrigo Santoro Filho', address: 'Rua Itambé, 450', item: 'Cadeira Isofix 36kg', timeWindow: '10:00 - 11:00', status: 'em_andamento' },
        { order: 2, type: 'entrega', code: '#LOC-1026', client: 'Fernanda Lima', address: 'Rua Maranhão, 280', item: 'Berço Desmontável', timeWindow: '11:15 - 12:00', status: 'pendente' },
        { order: 3, type: 'coleta', code: '#LOC-1018', client: 'Luciana Gimenez', address: 'Av. Angélica, 1200', item: 'Carrinho YOYO', timeWindow: '14:00 - 15:00', status: 'pendente' }
      ]
    },
    {
      id: 'drv-4',
      name: 'Carlos Expedição',
      vehicle: 'Base Matriz / Galpão Moema',
      plate: 'BASE-01',
      phone: '(11) 98888-1104',
      status: 'disponivel',
      currentDelivery: 'Aguardando Carregamento Lote 14h',
      client: 'Doca Central',
      destination: 'Galpão Operacional Moema',
      eta: 'Disponível na doca',
      lastLocation: 'Base Central Moema Pássaros',
      distance: '0 km',
      speed: '0 km/h (Parado)',
      battery: '100%',
      completedToday: 4,
      totalPending: 0,
      pos: { top: '65%', left: '58%' },
      stops: []
    }
  ]);

  // Incidents Data
  const [incidents, setIncidents] = useState<IncidentItem[]>([
    {
      id: 'inc-1',
      driverName: 'Felipe Santana',
      driverPhone: '(11) 98888-1103',
      code: '#LOC-1022',
      client: 'Rodrigo Santoro Filho',
      type: 'Trânsito Intenso / Lentidão',
      description: 'Bloqueio parcial na Av. Rebouças devido a acidente. Rota atrasada em aproximadamente 25 minutos.',
      time: '10:20',
      status: 'aberto'
    },
    {
      id: 'inc-2',
      driverName: 'Marcos Santos',
      driverPhone: '(11) 98888-1102',
      code: '#LOC-1015',
      client: 'Fernanda Diniz',
      type: 'Cliente Ausente na Entrega',
      description: 'Portaria informou que morador estava em consulta pediátrica. Reagendado para janela das 16:30.',
      time: '09:40',
      status: 'resolvido'
    },
    {
      id: 'inc-3',
      driverName: 'João Silva',
      driverPhone: '(11) 98888-1101',
      code: '#LOC-1011',
      client: 'Eduardo Galeano',
      type: 'Endereço sem Estacionamento',
      description: 'Necessário auxílio do cliente na calçada pois rua é estreita com fiscalização CET ativa.',
      time: 'Ontem',
      status: 'resolvido'
    }
  ]);

  // Active Routes Data
  const [routesList, setRoutesList] = useState([
    { id: 'rt-1', name: 'Rota Centro-Jardins #R1', driver: 'João Silva', vehicle: 'Fiorino #01', paradas: 5, concluidas: 3, status: 'Em rota', sla: '100%' },
    { id: 'rt-2', name: 'Rota Paulista-Pinheiros #R2', driver: 'Marcos Santos', vehicle: 'Kwid #02', paradas: 4, concluidas: 2, status: 'Em rota', sla: '95%' },
    { id: 'rt-3', name: 'Rota Higienópolis-Pacaembu #R3', driver: 'Felipe Santana', vehicle: 'Doblò #03', paradas: 3, concluidas: 1, status: 'Atrasado', sla: '82%' },
    { id: 'rt-4', name: 'Rota Tarde Moema-Ibirapuera #R4', driver: 'Carlos Expedição', vehicle: 'Base #01', paradas: 6, concluidas: 0, status: 'Planejada', sla: '100%' }
  ]);

  const selectedDriver = drivers.find(d => d.id === selectedDriverId) || drivers[0];

  const filteredDrivers = drivers.filter(d => {
    const matchesFilter = filterType === 'TODOS' || d.status === filterType;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.plate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Action: Mark stop as concluded in selected driver itinerary
  const handleToggleStopStatus = (driverId: string, order: number) => {
    setDrivers(prev =>
      prev.map(drv => {
        if (drv.id !== driverId) return drv;
        const updatedStops = drv.stops.map(st => {
          if (st.order === order) {
            const nextStatus: 'concluida' | 'pendente' = st.status === 'concluida' ? 'pendente' : 'concluida';
            return { ...st, status: nextStatus };
          }
          return st;
        });
        const completed = updatedStops.filter(s => s.status === 'concluida').length;
        const pending = updatedStops.filter(s => s.status !== 'concluida').length;
        return {
          ...drv,
          stops: updatedStops,
          completedToday: completed,
          totalPending: pending
        };
      })
    );
  };

  // Action: Add New Driver
  const handleCreateDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriverName.trim()) return;

    const newDrv: DriverItem = {
      id: `drv-${Date.now()}`,
      name: newDriverName,
      phone: newDriverPhone || '(11) 98888-0000',
      vehicle: newVehicleModel || 'Fiorino Cargo Kids #04',
      plate: newVehiclePlate || 'KID-9900',
      status: 'disponivel',
      currentDelivery: 'Disponível para nova rota',
      client: 'Base Central',
      destination: 'Aguardando despacho',
      eta: 'Pronto na base',
      lastLocation: 'Pátio Operacional Moema',
      distance: '0 km',
      speed: '0 km/h',
      battery: '100%',
      completedToday: 0,
      totalPending: 0,
      pos: { top: '50%', left: '50%' },
      stops: []
    };

    setDrivers(prev => [...prev, newDrv]);
    setIsNewDriverModalOpen(false);
    setNewDriverName('');
    setNewDriverPhone('');
    setNewVehicleModel('');
    setNewVehiclePlate('');
  };

  // Action: Add New Incident
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncidentDesc.trim()) return;

    const newInc: IncidentItem = {
      id: `inc-${Date.now()}`,
      driverName: newIncidentDriver,
      driverPhone: '(11) 98888-1100',
      code: newIncidentCode,
      client: 'Cliente em Rota',
      type: newIncidentType,
      description: newIncidentDesc,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'aberto'
    };

    setIncidents(prev => [newInc, ...prev]);
    setIsNewIncidentModalOpen(false);
    setNewIncidentDesc('');
  };

  // Action: Resolve Incident
  const handleResolveIncident = (id: string) => {
    setIncidents(prev =>
      prev.map(inc => (inc.id === id ? { ...inc, status: 'resolvido' } : inc))
    );
  };

  // Action: Create Route
  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const newRt = {
      id: `rt-${Date.now()}`,
      name: `Rota ${newRouteRegion.split(' - ')[0]} #${Math.floor(10 + Math.random() * 90)}`,
      driver: newRouteDriver,
      vehicle: 'Veículo da Região',
      paradas: 4,
      concluidas: 0,
      status: 'Planejada',
      sla: '100%'
    };
    setRoutesList(prev => [...prev, newRt]);
    setIsNewRouteModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Logística & Gestão de Frotas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoramento de rotas, itinerários com paradas, status de motoristas e controle de ocorrências
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'mapa', label: 'Mapa Geral' },
            { id: 'rastreamento', label: 'Rastreamento GPS' },
            { id: 'rotas', label: 'Rotas & Itinerários' },
            { id: 'motoristas', label: 'Motoristas & Frotas' },
            { id: 'ocorrencias', label: `Ocorrências (${incidents.filter(i => i.status === 'aberto').length})` },
            { id: 'performance', label: 'Performance & SLA' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white shadow-xs text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: MAPA GERAL                                    */}
      {/* ======================================================== */}
      {activeTab === 'mapa' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Simulated Map Area */}
            <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-200 p-4 shadow-xs relative min-h-[460px] flex flex-col justify-between overflow-hidden">
              {/* Simulated Street Grid */}
              <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:18px_18px]" />

              {/* Map Top Controls Overlay */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-900">Rotas Metropolitanas • São Paulo</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Entrega</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Coleta</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>Atraso</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Livre</span>
                  </span>
                </div>
              </div>

              {/* Interactive Markers on Map */}
              <div className="relative flex-1 my-4">
                {drivers.map(drv => {
                  const isSelected = drv.id === selectedDriverId;
                  const markerBg =
                    drv.status === 'atrasado'
                      ? 'bg-rose-500'
                      : drv.status === 'em_coleta'
                      ? 'bg-amber-500'
                      : drv.status === 'disponivel'
                      ? 'bg-emerald-500'
                      : 'bg-blue-600';

                  return (
                    <button
                      key={drv.id}
                      onClick={() => setSelectedDriverId(drv.id)}
                      style={{ top: drv.pos.top, left: drv.pos.left }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        isSelected ? 'scale-115 z-30 ring-4 ring-blue-400/40' : 'hover:scale-105 z-20'
                      }`}
                    >
                      <div className={`px-2.5 py-1.5 rounded-xl text-white shadow-md flex items-center space-x-1.5 ${markerBg}`}>
                        <Truck className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">{drv.name.split(' ')[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map Bottom Status Bar */}
              <div className="relative z-10 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between shadow-xs">
                <span>Clique em um motorista para ver o roteiro detalhado e gerenciar paradas</span>
                <span className="text-[11px] text-blue-600 font-mono font-medium">GPS Sync Ativo • 4 Veículos Conectados</span>
              </div>
            </div>

            {/* Selected Driver Detailed Dossier Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-xs">
                      {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{selectedDriver.name}</h3>
                      <div className="text-[11px] text-slate-400 font-mono">{selectedDriver.vehicle} • {selectedDriver.plate}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      selectedDriver.status === 'atrasado'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : selectedDriver.status === 'em_coleta'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : selectedDriver.status === 'disponivel'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {selectedDriver.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Target Details */}
                <div className="mt-4 space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Atividade Atual</div>
                    <div className="font-bold text-slate-900 text-xs">{selectedDriver.currentDelivery}</div>
                    <div className="text-slate-600">Cliente: <strong>{selectedDriver.client}</strong></div>
                  </div>

                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{selectedDriver.destination}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Previsão: <strong className="text-slate-900">{selectedDriver.eta}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Navigation className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Último ponto: {selectedDriver.lastLocation}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 font-mono">
                    <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                      <span className="text-[10px] text-emerald-800 font-semibold block">Concluídas Hoje</span>
                      <span className="text-base font-bold text-emerald-900 tabular-nums">{selectedDriver.completedToday}</span>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-xl border border-blue-100 text-center">
                      <span className="text-[10px] text-blue-800 font-semibold block">Pendentes Rota</span>
                      <span className="text-base font-bold text-blue-900 tabular-nums">{selectedDriver.totalPending}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openWhatsAppModal({
                    phone: selectedDriver.phone,
                    customerName: selectedDriver.name,
                    defaultText: 'Olá, atualização operacional sobre sua rota de entregas Torre de Bebel.',
                    type: 'endereco'
                  })}
                  className="flex items-center space-x-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Motorista</span>
                </button>
                <button
                  onClick={() => setIsItineraryModalOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Ver Roteiro Completo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: RASTREAMENTO GPS                              */}
      {/* ======================================================== */}
      {activeTab === 'rastreamento' && (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Telemetria & Rastreamento em Tempo Real</h3>
              <p className="text-xs text-slate-500">Status de velocidade, bateria do dispositivo, última localização e conectividade</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Filtrar motorista ou placa..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Motorista / Veículo</th>
                  <th className="py-2.5 px-3">Status Rota</th>
                  <th className="py-2.5 px-3">Velocidade Atual</th>
                  <th className="py-2.5 px-3">Bateria GPS</th>
                  <th className="py-2.5 px-3">Último Ponto Transmitido</th>
                  <th className="py-2.5 px-3">Distância p/ Destino</th>
                  <th className="py-2.5 px-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDrivers.map(drv => (
                  <tr key={drv.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{drv.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{drv.vehicle} • {drv.plate}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                        drv.status === 'atrasado' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        drv.status === 'em_coleta' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        drv.status === 'disponivel' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {drv.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-medium text-slate-700">{drv.speed}</td>
                    <td className="py-3 px-3 font-mono text-slate-600">{drv.battery}</td>
                    <td className="py-3 px-3 text-slate-600">{drv.lastLocation}</td>
                    <td className="py-3 px-3 font-mono text-slate-700">{drv.distance}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => openWhatsAppModal({
                          phone: drv.phone,
                          customerName: drv.name,
                          defaultText: `Olá ${drv.name}, verificação de status de telemetria da rota.`,
                          type: 'endereco'
                        })}
                        className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
                      >
                        Contatar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: ROTAS & ITINERÁRIOS                          */}
      {/* ======================================================== */}
      {activeTab === 'rotas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Roteirização Inteligente de Cargas & Entregas</h3>
              <p className="text-xs text-slate-500">Rotas agrupadas por macro-regiões metropolitanas para economia de combustível e tempo</p>
            </div>
            <button
              onClick={() => setIsNewRouteModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Criar Nova Rota</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routesList.map(rt => (
              <div key={rt.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{rt.name}</h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">Motorista: <strong className="text-slate-800">{rt.driver}</strong> ({rt.vehicle})</div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${
                    rt.status === 'Em rota' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    rt.status === 'Atrasado' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {rt.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Total Paradas</span>
                    <strong className="text-slate-900">{rt.paradas}</strong>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <span className="text-[10px] text-emerald-700 block">Concluídas</span>
                    <strong className="text-emerald-800">{rt.concluidas}</strong>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-blue-700 block">SLA Previsto</span>
                    <strong className="text-blue-800">{rt.sla}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">Otimizado por IA</span>
                  <button
                    onClick={() => {
                      setSelectedDriverId(drivers.find(d => d.name === rt.driver)?.id || 'drv-1');
                      setIsItineraryModalOpen(true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Ver Paradas & Detalhes →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 4: MOTORISTAS & FROTAS                          */}
      {/* ======================================================== */}
      {activeTab === 'motoristas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Quadro de Motoristas & Frota de Veículos</h3>
              <p className="text-xs text-slate-500">Cadastro de motoristas próprios/terceirizados, placas, CNH e capacidade de transporte</p>
            </div>
            <button
              onClick={() => setIsNewDriverModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Novo Motorista</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {drivers.map(drv => (
              <div key={drv.id} className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-xs">
                    {drv.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{drv.name}</h4>
                    <div className="text-[11px] text-slate-500 font-mono">{drv.phone}</div>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="text-[11px] text-slate-600">Veículo: <strong>{drv.vehicle}</strong></div>
                  <div className="text-[11px] text-slate-600 font-mono">Placa: <strong>{drv.plate}</strong></div>
                  <div className="text-[11px] text-slate-500">Capacidade: Até 6 cadeirinhas + 3 carrinhos</div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    drv.status === 'atrasado' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    drv.status === 'disponivel' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {drv.status.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => openWhatsAppModal({
                      phone: drv.phone,
                      customerName: drv.name,
                      defaultText: 'Mensagem direta da central de logística',
                      type: 'endereco'
                    })}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 5: OCORRÊNCIAS EM ROTA                           */}
      {/* ======================================================== */}
      {activeTab === 'ocorrencias' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Central de Ocorrências Logísticas</h3>
              <p className="text-xs text-slate-500">Incidentes reportados por motoristas, clientes ausentes, atrasos e desvios de rota</p>
            </div>
            <button
              onClick={() => setIsNewIncidentModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>+ Reportar Ocorrência</span>
            </button>
          </div>

          <div className="space-y-3">
            {incidents.map(inc => (
              <div key={inc.id} className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {inc.type}
                    </span>
                    <span className="font-mono text-xs text-blue-600 font-semibold">{inc.code}</span>
                    <span className="text-xs text-slate-500">• {inc.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{inc.description}</p>
                  <div className="text-[11px] text-slate-500">
                    Motorista: <strong>{inc.driverName}</strong> ({inc.driverPhone}) • Cliente: {inc.client}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {inc.status === 'aberto' ? (
                    <button
                      onClick={() => handleResolveIncident(inc.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                    >
                      Marcar Resolvido
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ✓ Resolvido
                    </span>
                  )}
                  <button
                    onClick={() => openWhatsAppModal({
                      phone: inc.driverPhone,
                      customerName: inc.driverName,
                      defaultText: `Olá sobre a ocorrência no pedido ${inc.code}: ${inc.type}`,
                      type: 'endereco'
                    })}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                    title="Falar no WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 6: PERFORMANCE & SLA                            */}
      {/* ======================================================== */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">SLA Geral de Entrega</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">96.4%</div>
              <span className="text-[11px] text-slate-500">Janelas cumpridas no prazo</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Tempo Médio de Rota</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">38 min</div>
              <span className="text-[11px] text-slate-500">Por ponto de entrega</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Entregas no Mês</span>
              <div className="text-2xl font-bold text-blue-600 mt-1 font-mono tabular-nums">248</div>
              <span className="text-[11px] text-slate-500">+18% vs mês anterior</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Índice de Reagendamento</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">2.1%</div>
              <span className="text-[11px] text-emerald-600">Abaixo do limite de 4%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Ranking de Eficiência dos Motoristas (Outubro 2026)
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'João Silva', pontualidade: '98.5%', entregas: 84, km: '480 km', score: 'Excelente' },
                { name: 'Marcos Santos', pontualidade: '96.0%', entregas: 72, km: '410 km', score: 'Muito Bom' },
                { name: 'Felipe Santana', pontualidade: '89.2%', entregas: 58, km: '380 km', score: 'Atenção Trânsito' },
                { name: 'Carlos Expedição', pontualidade: '100%', entregas: 34, km: '190 km', score: 'Doca/Apoio' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="text-slate-900">{item.name}</strong>
                      <div className="text-[10px] text-slate-500">{item.entregas} entregas concluídas • {item.km} rodados</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 font-mono">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block">Pontualidade</span>
                      <strong className="text-emerald-700">{item.pontualidade}</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: ROTEIRO COMPLETO DO MOTORISTA                   */}
      {/* ======================================================== */}
      {isItineraryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Itinerário de Paradas: {selectedDriver.name}
                </h3>
                <div className="text-xs text-slate-500 font-mono">
                  {selectedDriver.vehicle} • {selectedDriver.plate}
                </div>
              </div>
              <button
                onClick={() => setIsItineraryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              <p className="text-xs text-slate-600 mb-2">
                Ordem otimizada de entrega e coleta. Clique na caixa de seleção para concluir a parada em tempo real:
              </p>

              {selectedDriver.stops.map(stop => (
                <div
                  key={stop.order}
                  className={`p-3.5 rounded-xl border transition-all text-xs flex items-start justify-between gap-3 ${
                    stop.status === 'concluida'
                      ? 'bg-slate-50/80 border-slate-200 opacity-70'
                      : stop.status === 'em_andamento'
                      ? 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-400/30'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => handleToggleStopStatus(selectedDriver.id, stop.order)}
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                        stop.status === 'concluida'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 hover:border-blue-500 bg-white'
                      }`}
                    >
                      {stop.status === 'concluida' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] uppercase tracking-wider ${
                          stop.type === 'entrega' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {stop.type}
                        </span>
                        <strong className="text-slate-900">{stop.client}</strong>
                        <span className="text-slate-400 font-mono">({stop.code})</span>
                      </div>
                      <div className="text-slate-700 font-medium">{stop.item}</div>
                      <div className="text-[11px] text-slate-500">{stop.address}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Janela: {stop.timeWindow}</div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    stop.status === 'concluida' ? 'text-emerald-700 bg-emerald-50' :
                    stop.status === 'em_andamento' ? 'text-blue-700 bg-blue-100' : 'text-slate-500 bg-slate-100'
                  }`}>
                    {stop.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
              <span className="text-xs text-slate-500">
                {selectedDriver.stops.filter(s => s.status === 'concluida').length} de {selectedDriver.stops.length} paradas concluídas
              </span>
              <button
                onClick={() => setIsItineraryModalOpen(false)}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
              >
                Salvar & Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CADASTRAR NOVO MOTORISTA                        */}
      {/* ======================================================== */}
      {isNewDriverModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Cadastrar Motorista & Veículo</h3>
              <button onClick={() => setIsNewDriverModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDriver} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nome Completo do Motorista</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Roberto Nascimento"
                  value={newDriverName}
                  onChange={e => setNewDriverName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="(11) 97777-8899"
                  value={newDriverPhone}
                  onChange={e => setNewDriverPhone(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Modelo do Veículo</label>
                  <input
                    type="text"
                    placeholder="Ex: Fiorino Furgão"
                    value={newVehicleModel}
                    onChange={e => setNewVehicleModel(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Placa</label>
                  <input
                    type="text"
                    placeholder="BRA-2E19"
                    value={newVehiclePlate}
                    onChange={e => setNewVehiclePlate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 font-mono uppercase"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewDriverModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Cadastrar Motorista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: REPORTAR OCORRÊNCIA                            */}
      {/* ======================================================== */}
      {isNewIncidentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Reportar Ocorrência em Rota</h3>
              <button onClick={() => setIsNewIncidentModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Motorista</label>
                <select
                  value={newIncidentDriver}
                  onChange={e => setNewIncidentDriver(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  {drivers.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.vehicle})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tipo de Ocorrência</label>
                <select
                  value={newIncidentType}
                  onChange={e => setNewIncidentType(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option value="Cliente Ausente no Local">Cliente Ausente no Local</option>
                  <option value="Trânsito Intenso / Lentidão">Trânsito Intenso / Lentidão</option>
                  <option value="Endereço Incorreto / Não Localizado">Endereço Incorreto / Não Localizado</option>
                  <option value="Avaria Identificada no Despacho">Avaria Identificada no Despacho</option>
                  <option value="Problema Mecânico Veículo">Problema Mecânico Veículo</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Código do Pedido / Locação</label>
                <input
                  type="text"
                  placeholder="#LOC-1024"
                  value={newIncidentCode}
                  onChange={e => setNewIncidentCode(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descrição / Providência Imediata</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detalhes sobre a ocorrência e próximo passo..."
                  value={newIncidentDesc}
                  onChange={e => setNewIncidentDesc(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewIncidentModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold"
                >
                  Registrar Ocorrência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: CRIAR NOVA ROTA                                 */}
      {/* ======================================================== */}
      {isNewRouteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Planejar Nova Rota de Entregas</h3>
              <button onClick={() => setIsNewRouteModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRoute} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Região de Atendimento</label>
                <select
                  value={newRouteRegion}
                  onChange={e => setNewRouteRegion(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option value="Zona Sul - Morumbi & Campo Belo">Zona Sul - Morumbi & Campo Belo</option>
                  <option value="Zona Oeste - Pinheiros, Perdizes & Vila Madalena">Zona Oeste - Pinheiros, Perdizes & Vila Madalena</option>
                  <option value="Zona Leste - Tatuapé & Mooca">Zona Leste - Tatuapé & Mooca</option>
                  <option value="Zona Norte - Santana & Tucuruvi">Zona Norte - Santana & Tucuruvi</option>
                  <option value="ABC Paulista - Santo André & SBC">ABC Paulista - Santo André & SBC</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Motorista Responsável</label>
                <select
                  value={newRouteDriver}
                  onChange={e => setNewRouteDriver(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  {drivers.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.vehicle})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Data da Rota</label>
                <input
                  type="date"
                  value={newRouteDate}
                  onChange={e => setNewRouteDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewRouteModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Gerar Rota Otimizada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
