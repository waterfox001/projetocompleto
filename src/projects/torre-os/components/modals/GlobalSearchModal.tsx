import React, { useState, useEffect } from 'react';
import { Search, Package, Users, CalendarCheck, CalendarDays, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    customers,
    rentals,
    reservations,
    setSelectedProductId,
    setCurrentView
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedProducts = q
    ? products.filter(
        p =>
          p.code.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
    : [];

  const matchedCustomers = q
    ? customers.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.cpf.includes(q) ||
          c.phone.includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    : [];

  const matchedRentals = q
    ? rentals.filter(
        r =>
          r.rentalNumber.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q)
      )
    : [];

  const matchedReservations = q
    ? reservations.filter(
        res =>
          res.reservationNumber.toLowerCase().includes(q) ||
          res.customerName.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedProducts.length + matchedCustomers.length + matchedRentals.length + matchedReservations.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Header */}
        <div className="p-3.5 border-b border-slate-100 flex items-center space-x-3 bg-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Buscar por código (ex: CC-024), cliente, CPF, locação..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[11px] text-slate-400 hover:text-slate-600 px-1"
            >
              Limpar
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {!q && (
            <div className="py-10 text-center text-slate-400 text-xs space-y-1">
              <p className="font-medium text-slate-600">Busca Rápida Central</p>
              <p className="text-[11px] text-slate-400">
                Digite um código unitário (CC-024, CB-014), nome do cliente, contrato #LOC ou telefone.
              </p>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="py-10 text-center text-slate-400 text-xs">
              Nenhum registro encontrado para <strong className="text-slate-600">"{query}"</strong>.
            </div>
          )}

          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center space-x-1 px-1">
                <Package className="w-3 h-3 text-slate-400" />
                <span>Estoque & Produtos ({matchedProducts.length})</span>
              </div>
              <div className="space-y-1">
                {matchedProducts.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      setIsSearchModalOpen(false);
                      setCurrentView('inventory');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-100 hover:border-slate-200 text-left transition-all group"
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <SafeImage
                        src={prod.photoUrl}
                        alt={prod.name}
                        category={prod.category}
                        className="w-9 h-9 rounded-md object-cover border border-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 flex items-center space-x-1.5 truncate">
                          <span className="bg-slate-900 text-white text-[10px] font-mono px-1.5 py-0.2 rounded font-medium">
                            {prod.code}
                          </span>
                          <span className="truncate">{prod.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate font-mono">
                          {prod.brand} · Diária R$ {prod.dailyRate} · {prod.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                        {prod.status}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Customers */}
          {matchedCustomers.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center space-x-1 px-1">
                <Users className="w-3 h-3 text-slate-400" />
                <span>Clientes ({matchedCustomers.length})</span>
              </div>
              <div className="space-y-1">
                {matchedCustomers.map(cust => (
                  <button
                    key={cust.id}
                    onClick={() => {
                      setCurrentView('customers');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-100 hover:border-slate-200 text-left transition-all group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 flex items-center space-x-1.5">
                        <span>{cust.name}</span>
                        {cust.isRecurring && (
                          <span className="text-[9px] bg-blue-50 text-blue-700 px-1 py-0.2 rounded font-medium border border-blue-200/60">
                            Recorrente
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                        CPF: {cust.cpf} · Tel: {cust.phone} · Gasto: R$ {cust.totalSpent.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Rentals */}
          {matchedRentals.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center space-x-1 px-1">
                <CalendarCheck className="w-3 h-3 text-slate-400" />
                <span>Locações ({matchedRentals.length})</span>
              </div>
              <div className="space-y-1">
                {matchedRentals.map(rent => (
                  <button
                    key={rent.id}
                    onClick={() => {
                      setCurrentView('rentals');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-100 hover:border-slate-200 text-left transition-all group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 flex items-center space-x-1.5">
                        <span className="font-mono text-blue-600">{rent.rentalNumber}</span>
                        <span>·</span>
                        <span>{rent.customerName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono tabular-nums">
                        Retorno: {rent.expectedReturnDate} · R$ {rent.totalAmount.toLocaleString('pt-BR')} · {rent.status}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-3.5 py-2 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <kbd className="px-1 bg-white border border-slate-200 rounded text-[10px]">Esc</kbd>
              <span>Fechar</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1 bg-white border border-slate-200 rounded text-[10px]">↵</kbd>
              <span>Abrir</span>
            </span>
          </div>
          <span>Torre de Bebel Central Spotlight</span>
        </div>
      </div>
    </div>
  );
};
