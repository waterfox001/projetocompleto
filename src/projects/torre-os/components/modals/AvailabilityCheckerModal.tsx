import React, { useState } from 'react';
import { Search, X, CheckCircle2, XCircle, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';
import { SafeImage } from '../common/SafeImage';

export const AvailabilityCheckerModal: React.FC = () => {
  const {
    isAvailabilityModalOpen,
    setIsAvailabilityModalOpen,
    products,
    setSelectedProductId
  } = useApp();

  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-15');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'TODAS'>('Cadeirinhas');

  if (!isAvailabilityModalOpen) return null;

  const categories: (ProductCategory | 'TODAS')[] = [
    'TODAS',
    'Cadeirinhas',
    'Bebê-conforto',
    'Carrinhos',
    'Berços',
    'Cercadinhos',
    'Alimentação',
    'Banho',
    'Brinquedos',
    'Acessórios'
  ];

  const filteredProducts = selectedCategory === 'TODAS'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const availableItems = filteredProducts.filter(p => p.status === 'DISPONIVEL');
  const unavailableItems = filteredProducts.filter(p => p.status !== 'DISPONIVEL');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
              <Search className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Consulta de Disponibilidade & Alternativas</h2>
              <div className="text-[11px] text-slate-500">
                Checagem cruzada de acervo, contratos e retorno de higienização
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsAvailabilityModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-3.5 bg-slate-50/80 border-b border-slate-200/80 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Data Inicial
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none font-medium focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Data Final
              </label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none font-medium focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as any)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none font-medium focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span className="font-mono tabular-nums">
              Período: <strong className="text-slate-700">{startDate}</strong> a <strong className="text-slate-700">{endDate}</strong>
            </span>
            <span className="font-medium text-emerald-700 font-mono tabular-nums">
              {availableItems.length} itens disponíveis
            </span>
          </div>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Available section */}
          <div>
            <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Itens Disponíveis ({availableItems.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableItems.map(item => (
                <div
                  key={item.id}
                  className="p-2.5 bg-white border border-slate-200/90 rounded-lg flex items-center justify-between text-xs hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <SafeImage
                      src={item.photoUrl}
                      alt={item.name}
                      category={item.category}
                      className="w-10 h-10 rounded-md object-cover border border-slate-100 shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-semibold text-slate-900 flex items-center space-x-1.5 truncate">
                        <span className="bg-slate-900 text-white font-mono text-[9px] px-1 py-0.2 rounded">
                          {item.code}
                        </span>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                        {item.brand} · Diária R$ {item.dailyRate}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProductId(item.id);
                      setIsAvailabilityModalOpen(false);
                    }}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-md shrink-0 transition-colors"
                    title="Ver detalhes"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Unavailable with alternatives section */}
          {unavailableItems.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Ocupados no Período ({unavailableItems.length})</span>
              </div>
              <div className="space-y-1.5">
                {unavailableItems.map(item => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-50 border border-slate-200/70 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <SafeImage
                        src={item.photoUrl}
                        alt={item.name}
                        category={item.category}
                        className="w-9 h-9 rounded-md object-cover border border-slate-200/60 shrink-0 opacity-70"
                      />
                      <div className="truncate">
                        <div className="font-medium text-slate-700 flex items-center space-x-1.5 truncate">
                          <span className="font-mono bg-slate-200 text-slate-700 text-[10px] px-1 py-0.2 rounded">
                            {item.code}
                          </span>
                          <span className="truncate">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({item.status})</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate font-mono">
                          {item.brand} · {item.currentCustomerName ? `Locado: ${item.currentCustomerName}` : 'Em processamento'}
                        </div>
                      </div>
                    </div>

                    {/* Smart alternative suggestion */}
                    {availableItems.length > 0 && (
                      <div className="text-right shrink-0 pl-2">
                        <span className="text-[9px] text-slate-400 block uppercase">Sugestão:</span>
                        <span className="text-[11px] font-semibold text-blue-600">
                          {availableItems[0].code}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
