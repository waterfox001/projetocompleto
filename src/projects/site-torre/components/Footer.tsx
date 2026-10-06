import React from 'react';
import { ArrowRight, Heart, Sparkles, MapPin, ShieldCheck, Mail, Phone, MessageSquare } from 'lucide-react';
import { UnitId } from '../types';
import { UNITS } from '../data/mockData';
import { DoodleStroller, DoodleHeart } from './HandcraftedDoodles';

interface FooterProps {
  onOpenTripBuilder: () => void;
  onNavigateSection: (id: string) => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTripBuilder,
  onNavigateSection,
  onOpenPortal,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 text-left">
      {/* Emotional Final CTA Banner */}
      <div className="border-b border-stone-800 py-16 md:py-20 bg-stone-950/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 text-orange-300 text-xs font-bold border border-orange-800/40">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Infância Leve & Memórias Inesquecíveis</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Você cuida das memórias.{' '}
            <span className="text-orange-500 block sm:inline">Nós cuidamos do resto.</span>
          </h2>

          <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto">
            Chega de carregar malas extras, carrinhos volumosos e equipamentos pesados no aeroporto. Viaje leve e aproveite cada sorriso.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenTripBuilder}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-base rounded-2xl shadow-lg shadow-orange-600/30 transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Planejar Minha Viagem Agora</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center p-1">
                <DoodleStroller className="w-6 h-6" color="#FFFFFF" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Torre de Bebel
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Plataforma digital premium especializada em locação de produtos infantis para viagens, passeios e hospedagens. Cuidado, higiene hospitalar e entrega garantida.
            </p>

            <div className="pt-2 text-xs text-orange-400 font-handwriting text-xl">
              “Viaje leve. A infância vai com você.”
            </div>
          </div>

          {/* Column 2: Navegação */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Alugar Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTripBuilder}
                  className="hover:text-white transition-colors cursor-pointer text-orange-400 font-semibold"
                >
                  Monte sua Viagem
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('units')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Unidades & Aeroportos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('hygiene')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Protocolo de Higiene
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Unidades Atendidas */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Unidades Oficiais
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <span className="text-stone-300 font-semibold">Fortaleza (CE)</span>
                <span className="block text-[11px] text-stone-500">Aeroporto Pinto Martins (FOR)</span>
              </li>
              <li>
                <span className="text-stone-300 font-semibold">Porto Alegre (RS)</span>
                <span className="block text-[11px] text-stone-500">Aeroporto Salgado Filho (POA)</span>
              </li>
              <li>
                <span className="text-stone-300 font-semibold">Recife (PE)</span>
                <span className="block text-[11px] text-stone-500">Aeroporto dos Guararapes (REC)</span>
              </li>
              <li>
                <span className="text-stone-300 font-semibold">São Paulo (SP)</span>
                <span className="block text-[11px] text-stone-500">Aeroporto de Congonhas (CGH)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Atendimento & Área do Cliente */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Central do Cliente
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-white transition-colors cursor-pointer font-semibold text-orange-400"
                >
                  Área do Cliente (Minha Torre)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dúvidas Frequentes (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-stone-200 transition-colors cursor-pointer text-stone-500"
                >
                  Gestão Administrativa (Admin)
                </button>
              </li>
              <li className="pt-2 text-[11px] text-stone-500">
                Atendimento diário das 07h às 22h com plantão de aeroporto.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Torre de Bebel. Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Termos de Locação</span>
            <span>·</span>
            <span>Política de Privacidade</span>
            <span>·</span>
            <span>Certificado Sanitário</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
