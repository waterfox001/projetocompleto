import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { SlidersHorizontal, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    setIsBookingModalOpen,
    setIsAdminModalOpen,
  } = useBooking();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070B14]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-bold tracking-tight text-white hover:text-sky-400 transition-colors"
        >
          STOPCASE
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollTo('cidades')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cidades
          </button>
          <button
            onClick={() => scrollTo('como-funciona')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollTo('calculadora-tempo')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Calculadora de Tempo
          </button>
          <button
            onClick={() => scrollTo('travel-planner')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Lugares & Dicas
          </button>
          <button
            onClick={() => scrollTo('tamanhos')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Tamanhos & Lockers
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Ajuda
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 active:scale-95 transition-all cursor-pointer"
          >
            Reservar Locker
          </button>

          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="p-2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Painel de Controle Operacional (Demo)"
            aria-label="Abrir Painel Admin"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="p-2 text-slate-400 hover:text-white"
            aria-label="Abrir painel admin"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090E1A] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-200">
            <button
              onClick={() => scrollTo('cidades')}
              className="text-left py-2 hover:text-sky-400"
            >
              Cidades & Unidades
            </button>
            <button
              onClick={() => scrollTo('como-funciona')}
              className="text-left py-2 hover:text-sky-400"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollTo('calculadora-tempo')}
              className="text-left py-2 hover:text-sky-400"
            >
              Calculadora de Tempo
            </button>
            <button
              onClick={() => scrollTo('travel-planner')}
              className="text-left py-2 hover:text-sky-400"
            >
              Lugares & Dicas
            </button>
            <button
              onClick={() => scrollTo('tamanhos')}
              className="text-left py-2 hover:text-sky-400"
            >
              Tamanhos & Lockers
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-left py-2 hover:text-sky-400"
            >
              Perguntas Frequentes
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookingModalOpen(true);
              }}
              className="w-full text-center rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-slate-950"
            >
              Reservar Locker Agora
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
