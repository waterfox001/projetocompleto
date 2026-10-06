import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';
import { LOCKER_TYPES } from '../../data/lockers';
import { HubCityId } from '../../types';
import {
  X,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Box,
  DollarSign,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    bookingsHistory,
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'metrics' | 'heatmap' | 'lockers' | 'pricing'>('metrics');
  const [selectedHub, setSelectedHub] = useState<HubCityId>('sao-paulo-congonhas');

  // Configurable Prices State Demo
  const [prices, setPrices] = useState({
    smallHourly: 15,
    smallDaily: 35,
    mediumHourly: 22,
    mediumDaily: 49,
    largeHourly: 30,
    largeDaily: 69,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAdminModalOpen) return null;

  const currentHubData = HUBS.find((h) => h.id === selectedHub) || HUBS[0];

  const handleSavePrices = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Generate 24 simulated lockers for the visual matrix
  const matrixLockers = Array.from({ length: 24 }).map((_, idx) => {
    const num = (idx + 1).toString().padStart(2, '0');
    let status: 'free' | 'reserved' | 'in_use' | 'maintenance' = 'free';
    if (idx % 6 === 0) status = 'reserved';
    else if (idx % 3 === 0) status = 'in_use';
    else if (idx === 23) status = 'maintenance';
    return { id: `M-${num}`, status };
  });

  // Demand Heatmap slots (7 days x 6 time blocks)
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const timeSlots = ['06h-09h', '09h-12h', '12h-15h', '15h-18h', '18h-21h', '21h-00h'];
  const heatmapData = [
    [40, 75, 85, 90, 80, 50], // Seg
    [45, 70, 80, 85, 75, 45], // Ter
    [50, 80, 90, 95, 85, 55], // Qua
    [60, 85, 95, 98, 90, 60], // Qui
    [70, 95, 100, 100, 95, 75], // Sex (Pico)
    [65, 85, 80, 75, 70, 50], // Sáb
    [75, 90, 95, 100, 98, 80], // Dom (Retorno)
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700 bg-[#090E1C] shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">
                  Painel de Controle Operacional
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  DEMO ADMINISTRATIVA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gestão multiunidade, inventário de armários e telemetria de ocupação
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-2 text-xs font-semibold gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'border-sky-500 text-sky-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Métricas Globais & Reservas
          </button>
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'heatmap'
                ? 'border-sky-500 text-sky-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Heatmap de Demanda
          </button>
          <button
            onClick={() => setActiveTab('lockers')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'lockers'
                ? 'border-sky-500 text-sky-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Matriz de Ocupação de Armários
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'border-sky-500 text-sky-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Configuração de Preços
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* TAB 1: KPI Metrics */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* KPIs Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400">Reservas Hoje</span>
                  <div className="text-2xl font-black text-white font-display">48</div>
                  <span className="text-[10px] text-emerald-400 font-mono">+18% vs ontem</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400">Taxa de Ocupação Média</span>
                  <div className="text-2xl font-black text-sky-400 font-display">71.4%</div>
                  <span className="text-[10px] text-slate-400 font-mono">112 de 156 em uso</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400">Faturamento Hoje</span>
                  <div className="text-2xl font-black text-emerald-400 font-display">
                    R$ 2.450
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Ticket médio R$ 51,04</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400">Hub Mais Demandado</span>
                  <div className="text-2xl font-black text-white font-display">CGH</div>
                  <span className="text-[10px] text-sky-300 font-mono">São Paulo Congonhas</span>
                </div>
              </div>

              {/* Operational Intelligence Notes (Section 75) */}
              <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Activity className="h-4 w-4" />
                  <span>INTELIGÊNCIA OPERACIONAL DO DIA</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <strong>Fortaleza (FOR):</strong> Alta ocupação (68%). Demanda turística pós-meio dia.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <strong>Recife (REC):</strong> Estabilidade (62%). Giro regular de conexões.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <strong>São Paulo (CGH):</strong> Pico matinal (74%) e fluxo executivo contínuo.
                  </div>
                </div>
              </div>

              {/* Recent Bookings Feed (Section 77) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-display">
                    Últimas Reservas Registradas no Sistema
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">
                    Atualização em tempo real
                  </span>
                </div>

                <div className="space-y-2">
                  {bookingsHistory.map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sky-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {b.id}
                        </span>
                        <div>
                          <span className="font-bold text-white">{b.customerName}</span>
                          <span className="text-slate-400 ml-2">
                            {b.lockerNumber} ({b.lockerSize.toUpperCase()})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-slate-400 font-mono">
                        <span>{b.hubId.toUpperCase()}</span>
                        <span>{b.startTime} → {b.endTime}</span>
                        <span className="text-emerald-400 font-bold">R$ {b.totalPrice}</span>
                        <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded">
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Heatmap de Demanda */}
          {activeTab === 'heatmap' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Quando nossos lockers são mais utilizados?
                </h4>
                <p className="text-xs text-slate-400">
                  Taxa de ocupação histórica calculada por faixa de horário e dia da semana.
                </p>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto rounded-2xl bg-slate-950 p-6 border border-slate-800">
                <div className="min-w-[500px]">
                  {/* Column headers: Time slots */}
                  <div className="grid grid-cols-7 gap-2 pb-3 text-[11px] font-mono text-slate-400 text-center">
                    <div>Dia</div>
                    {timeSlots.map((ts) => (
                      <div key={ts}>{ts}</div>
                    ))}
                  </div>

                  {/* Rows: Days */}
                  <div className="space-y-2">
                    {days.map((day, dIdx) => (
                      <div key={day} className="grid grid-cols-7 gap-2 items-center text-xs">
                        <span className="font-bold text-slate-300 font-mono text-center">
                          {day}
                        </span>
                        {heatmapData[dIdx].map((val, tIdx) => {
                          const bg =
                            val >= 90
                              ? 'bg-rose-500/80 text-white font-bold'
                              : val >= 75
                              ? 'bg-amber-500/80 text-slate-950 font-bold'
                              : val >= 55
                              ? 'bg-sky-500/60 text-slate-950'
                              : 'bg-slate-800 text-slate-300';
                          return (
                            <div
                              key={tIdx}
                              className={`h-9 rounded-lg flex items-center justify-center font-mono text-xs transition-transform hover:scale-105 cursor-default ${bg}`}
                              title={`${day} às ${timeSlots[tIdx]}: ${val}% de ocupação`}
                            >
                              {val}%
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-center gap-6 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded bg-slate-800" /> &lt;55% Moderado
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded bg-sky-500/60" /> 55-74% Estável
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded bg-amber-500/80" /> 75-89% Alto
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded bg-rose-500/80" /> 90%+ Pico Máximo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Visual Locker Matrix (Section 76) */}
          {activeTab === 'lockers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Matriz de Ocupação em Tempo Real
                  </h4>
                  <p className="text-xs text-slate-400">
                    Selecione o aeroporto para ver o status visual de cada compartimento individual.
                  </p>
                </div>

                <select
                  value={selectedHub}
                  onChange={(e) => setSelectedHub(e.target.value as HubCityId)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-white focus:border-sky-500"
                >
                  {HUBS.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} — {h.airportCode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status legend */}
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Livre (14)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> Reservado (4)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Em uso (5)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-600" /> Manutenção (1)
                </span>
              </div>

              {/* Grid of Lockers */}
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                {matrixLockers.map((l) => {
                  const borderClass =
                    l.status === 'free'
                      ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                      : l.status === 'reserved'
                      ? 'border-sky-500/40 bg-sky-950/30 text-sky-300'
                      : l.status === 'in_use'
                      ? 'border-amber-500/40 bg-amber-950/30 text-amber-300'
                      : 'border-slate-800 bg-slate-900 text-slate-600';

                  return (
                    <div
                      key={l.id}
                      className={`h-20 rounded-xl border p-2.5 flex flex-col justify-between text-xs transition-all ${borderClass}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold">{l.id}</span>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            l.status === 'free'
                              ? 'bg-emerald-400'
                              : l.status === 'reserved'
                              ? 'bg-sky-400'
                              : l.status === 'in_use'
                              ? 'bg-amber-400'
                              : 'bg-slate-600'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">
                        {l.status === 'free'
                          ? 'Livre'
                          : l.status === 'reserved'
                          ? 'Reservado'
                          : l.status === 'in_use'
                          ? 'Em uso'
                          : 'Revisão'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Price configuration */}
          {activeTab === 'pricing' && (
            <form onSubmit={handleSavePrices} className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Tabela Tarifária Configurável
                </h4>
                <p className="text-xs text-slate-400">
                  Ajuste os valores de diária e primeiros períodos por tipo de armário para todo o sistema.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Small */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-white block">Locker P (Compacto)</span>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-400 block">Primeiras horas (R$):</label>
                    <input
                      type="number"
                      value={prices.smallHourly}
                      onChange={(e) => setPrices({ ...prices, smallHourly: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-400 block">Diária integral (R$):</label>
                    <input
                      type="number"
                      value={prices.smallDaily}
                      onChange={(e) => setPrices({ ...prices, smallDaily: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Medium */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-white block">Locker M (Padrão)</span>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-400 block">Primeiras horas (R$):</label>
                    <input
                      type="number"
                      value={prices.mediumHourly}
                      onChange={(e) => setPrices({ ...prices, mediumHourly: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-400 block">Diária integral (R$):</label>
                    <input
                      type="number"
                      value={prices.mediumDaily}
                      onChange={(e) => setPrices({ ...prices, mediumDaily: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Large */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-white block">Locker G (Familiar)</span>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-400 block">Primeiras horas (R$):</label>
                    <input
                      type="number"
                      value={prices.largeHourly}
                      onChange={(e) => setPrices({ ...prices, largeHourly: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-400 block">Diária integral (R$):</label>
                    <input
                      type="number"
                      value={prices.largeDaily}
                      onChange={(e) => setPrices({ ...prices, largeDaily: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300">
                  ✓ Configuração tarifária atualizada e sincronizada com os totens de autoatendimento!
                </div>
              )}

              <button
                type="submit"
                className="rounded-xl bg-sky-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-sky-400 transition-colors"
              >
                Salvar Atualização Tarifária
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
