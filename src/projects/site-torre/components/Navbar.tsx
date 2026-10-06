import React, { useState } from 'react';
import { ShoppingBag, Heart, MapPin, SlidersHorizontal, User, Sparkles } from 'lucide-react';
import { UnitId } from '../types';
import { UNITS } from '../data/mockData';
import { DoodleStroller } from './HandcraftedDoodles';

interface NavbarProps {
  currentUnit: UnitId;
  onSelectUnit: (unit: UnitId) => void;
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenPortal: () => void;
  onOpenTripBuilder: () => void;
  onOpenAdmin: () => void;
  isAdminActive: boolean;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUnit,
  onSelectUnit,
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenPortal,
  onOpenTripBuilder,
  onOpenAdmin,
  isAdminActive,
  onNavigateSection,
}) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <DoodleStroller className="w-6 h-6" color="#EA580C" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
              Torre de Bebel
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
          <button
            onClick={() => onNavigateSection('catalog')}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Alugar
          </button>
          <button
            onClick={onOpenTripBuilder}
            className="hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer text-orange-700 font-semibold"
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            Monte sua Viagem
          </button>
          <button
            onClick={() => onNavigateSection('how-it-works')}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Como Funciona
          </button>
          <button
            onClick={() => onNavigateSection('units')}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Unidades
          </button>
          <button
            onClick={() => onNavigateSection('hygiene')}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Higienização
          </button>
          <button
            onClick={onOpenPortal}
            className="hover:text-orange-600 transition-colors cursor-pointer flex items-center gap-1.5 text-stone-800"
          >
            <User className="w-4 h-4 text-stone-500" />
            Minha Torre
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-xs font-medium text-stone-800 transition-colors border border-stone-200/60"
              title="Mudar Cidade de Retirada/Entrega"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline font-semibold">{UNITS[currentUnit].name}</span>
              <span className="sm:hidden font-semibold">{UNITS[currentUnit].state}</span>
            </button>

            {isCityDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Selecione sua cidade
                </div>
                {Object.values(UNITS).map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => {
                      onSelectUnit(unit.id);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      currentUnit === unit.id
                        ? 'bg-orange-50 text-orange-900 font-semibold'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <div>{unit.name} ({unit.state})</div>
                      <div className="text-[10px] text-stone-400 font-normal">{unit.airportCode}</div>
                    </div>
                    {currentUnit === unit.id && (
                      <span className="text-orange-600 text-xs font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Favorites shortcut */}
          <button
            onClick={onOpenFavorites}
            className="p-2 text-stone-600 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition-colors relative"
            title="Meus Favoritos"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium text-xs shadow-sm shadow-orange-600/20 transition-all hover:shadow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Reserva</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-white text-orange-600 text-[11px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Backoffice/Admin toggle button */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-lg text-xs transition-colors border ${
              isAdminActive
                ? 'bg-stone-900 text-white border-stone-900'
                : 'text-stone-500 hover:text-stone-800 border-stone-200 hover:bg-stone-100'
            }`}
            title="Painel Administrativo / Gestão de Estoque"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
            aria-label="Abrir menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              onNavigateSection('catalog');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Alugar Produtos
          </button>
          <button
            onClick={() => {
              onOpenTripBuilder();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-orange-600 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Monte sua Viagem
          </button>
          <button
            onClick={() => {
              onNavigateSection('how-it-works');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Como Funciona
          </button>
          <button
            onClick={() => {
              onNavigateSection('units');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Onde Estamos (Unidades)
          </button>
          <button
            onClick={() => {
              onNavigateSection('hygiene');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Protocolo de Higienização
          </button>
          <button
            onClick={() => {
              onOpenPortal();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-stone-900 border-t border-stone-100 pt-3 flex items-center gap-2"
          >
            <User className="w-4 h-4 text-orange-600" />
            Minha Torre (Área do Cliente)
          </button>
        </div>
      )}
    </header>
  );
};
