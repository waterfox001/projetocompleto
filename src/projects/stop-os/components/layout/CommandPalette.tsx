import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  X,
  Luggage,
  Users,
  CalendarDays,
  Box,
  Building2,
  Target,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface CommandPaletteProps {
  onNavigate: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    customers,
    reservations,
    volumes,
    units,
    setSelectedReservationId,
    setSelectedCustomerId,
    setSelectedVolumeId,
    setIsQuickCreateOpen,
    setQuickCreateType
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results
  const matchedReservations = normalizedQuery
    ? reservations.filter(
        (r) =>
          r.id.toLowerCase().includes(normalizedQuery) ||
          r.customerName.toLowerCase().includes(normalizedQuery) ||
          r.unitId.toLowerCase().includes(normalizedQuery)
      )
    : reservations.slice(0, 3);

  const matchedCustomers = normalizedQuery
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(normalizedQuery) ||
          c.document.includes(normalizedQuery) ||
          c.email.toLowerCase().includes(normalizedQuery)
      )
    : customers.slice(0, 3);

  const matchedVolumes = normalizedQuery
    ? volumes.filter(
        (v) =>
          v.id.toLowerCase().includes(normalizedQuery) ||
          v.tagNumber.toLowerCase().includes(normalizedQuery) ||
          v.customerName.toLowerCase().includes(normalizedQuery) ||
          v.locationPosition.toLowerCase().includes(normalizedQuery)
      )
    : volumes.slice(0, 3);

  const quickPages = [
    { title: 'Dashboard Executivo', path: '/', icon: Building2 },
    { title: 'Central Operacional', path: '/operation', icon: Luggage },
    { title: 'Controle de Reservas', path: '/reservations', icon: CalendarDays },
    { title: 'Volumes & Rastreabilidade', path: '/volumes', icon: Box },
    { title: 'Gestão Financeira', path: '/finance', icon: CalendarDays },
    { title: 'Estratégia & OKRs', path: '/strategy', icon: Target },
    { title: 'Auditoria & Logs', path: '/audit', icon: ShieldCheck }
  ].filter((p) => !normalizedQuery || p.title.toLowerCase().includes(normalizedQuery));

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white border border-slate-200 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-3.5 py-2.5 border-b border-slate-200 gap-2.5 bg-slate-50">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por reserva, volume, cliente ou navegação..."
            className="flex-1 bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="text-[10px] font-mono text-slate-400 border border-slate-200 px-1 py-0.5 rounded bg-white">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-2 space-y-3 divide-y divide-slate-100">
          {/* Quick Actions */}
          <div className="pt-1">
            <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Ações Rápidas
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setQuickCreateType('reservation');
                  setIsQuickCreateOpen(true);
                }}
                className="flex items-center gap-2 p-2 rounded text-xs text-slate-800 hover:bg-slate-50 border border-slate-200 text-left cursor-pointer font-medium"
              >
                <Plus className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Nova Reserva</span>
              </button>
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setQuickCreateType('customer');
                  setIsQuickCreateOpen(true);
                }}
                className="flex items-center gap-2 p-2 rounded text-xs text-slate-800 hover:bg-slate-50 border border-slate-200 text-left cursor-pointer font-medium"
              >
                <Users className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>Novo Cliente</span>
              </button>
            </div>
          </div>

          {/* Matched Reservations */}
          {matchedReservations.length > 0 && (
            <div className="pt-2">
              <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Reservas ({matchedReservations.length})
              </div>
              <div className="space-y-0.5">
                {matchedReservations.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      setSelectedReservationId(res.id);
                    }}
                    className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div className="truncate">
                        <span className="font-mono font-semibold text-slate-900">{res.id}</span>
                        <span className="text-slate-600 ml-2">{res.customerName}</span>
                        <span className="text-slate-400 ml-2">({res.unitId})</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-600 shrink-0">
                      R$ {res.finalAmount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Volumes */}
          {matchedVolumes.length > 0 && (
            <div className="pt-2">
              <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Volumes ({matchedVolumes.length})
              </div>
              <div className="space-y-0.5">
                {matchedVolumes.map((vol) => (
                  <div
                    key={vol.id}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      setSelectedVolumeId(vol.id);
                    }}
                    className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Box className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div className="truncate">
                        <span className="font-mono font-semibold text-slate-900">{vol.id}</span>
                        <span className="text-slate-600 ml-2">{vol.description}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-semibold shrink-0">
                      {vol.locationPosition}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Customers */}
          {matchedCustomers.length > 0 && (
            <div className="pt-2">
              <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Clientes ({matchedCustomers.length})
              </div>
              <div className="space-y-0.5">
                {matchedCustomers.map((cust) => (
                  <div
                    key={cust.id}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      setSelectedCustomerId(cust.id);
                    }}
                    className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div className="truncate">
                        <span className="font-semibold text-slate-900">{cust.name}</span>
                        <span className="text-slate-500 ml-2 font-mono">{cust.document}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-700 shrink-0">
                      R$ {cust.totalSpent.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Pages */}
          {quickPages.length > 0 && (
            <div className="pt-2">
              <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Navegação
              </div>
              <div className="space-y-0.5">
                {quickPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <div
                      key={page.path}
                      onClick={() => {
                        setIsCommandPaletteOpen(false);
                        onNavigate(page.path);
                      }}
                      className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-slate-800 font-medium">{page.title}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Pressione <strong>Enter</strong> para abrir</span>
          <span className="font-mono text-slate-400">STOPCASE OS Console</span>
        </div>
      </div>
    </div>
  );
};
