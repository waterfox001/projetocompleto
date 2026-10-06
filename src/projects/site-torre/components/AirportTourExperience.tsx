import React from 'react';
import { Plane, Luggage, Baby, Sparkles, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { UnitId } from '../types';
import { UNITS } from '../data/mockData';
import { DoodleAirplane, DoodleSuitcase, DoodleStroller, DoodleHeart } from './HandcraftedDoodles';

interface AirportTourExperienceProps {
  currentUnit: UnitId;
  onSelectUnit: (unit: UnitId) => void;
  onFindProducts: () => void;
}

export const AirportTourExperience: React.FC<AirportTourExperienceProps> = ({
  currentUnit,
  onSelectUnit,
  onFindProducts,
}) => {
  const currentUnitData = UNITS[currentUnit];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold">
            <Plane className="w-3.5 h-3.5 text-orange-600" />
            <span>Experiência Exclusiva de Desembarque</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Chegou de viagem? Seu bebê não precisa viajar com uma casa inteira.
          </h2>
          <p className="text-stone-600 text-base">
            Conheça o fluxo inteligente que elimina o estresse de carregar carrinhos pesados nos saguões e esteiras de bagagem.
          </p>
        </div>

        {/* 4-Step Visual Journey */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 relative">
          {/* Step 1 */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 relative space-y-4 hover:border-orange-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              01
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Escolha os Produtos</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Navegue pelo catálogo ou use nosso quiz para selecionar carrinho, bebê conforto e berço.
              </p>
            </div>
            <div className="pt-2 text-stone-400 text-xs font-medium">100% online em 2 minutos</div>
          </div>

          {/* Step 2 */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 relative space-y-4 hover:border-orange-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              02
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Informe Voo ou Hotel</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Número do voo no aeroporto ({currentUnitData.airportCode}) ou nome do hotel/Airbnb onde vai se hospedar.
              </p>
            </div>
            <div className="pt-2 text-stone-400 text-xs font-medium">Horários flexíveis</div>
          </div>

          {/* Step 3 */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 relative space-y-4 hover:border-orange-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              03
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Preparamos com Afeto</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Itens higienizados a vapor hospitalar a 140°C, selados com lacre de segurança e identificados para você.
              </p>
            </div>
            <div className="pt-2 text-emerald-600 text-xs font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Garantia de assepsia</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 relative space-y-4 hover:border-orange-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              04
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Receba no Pouso</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Ao desembarcar, seu produto está pronto para acomodar seu bebê com tranquilidade e sorriso no rosto.
              </p>
            </div>
            <div className="pt-2 text-stone-400 text-xs font-medium">Devolução simples no retorno</div>
          </div>
        </div>

        {/* Airport Spotlight Banner */}
        <div className="bg-gradient-to-r from-orange-50 via-stone-50 to-white rounded-3xl p-8 sm:p-10 border border-orange-200/90 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-orange-900 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Destaque de Atendimento no Aeroporto</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
              Seu pedido esperando por você em {currentUnitData.airportName}
            </h3>

            <p className="text-stone-600 text-sm leading-relaxed">
              Monitore seu voo: mesmo se houver atrasos ou adiantamentos da companhia aérea, nossa equipe acompanha o radar de pouso para garantir a entrega pontual no saguão de desembarque.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onFindProducts}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-orange-600/20 transition-all flex items-center gap-2"
              >
                <span>Ver Opções para {currentUnitData.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Handcrafted Visual Step Sequence */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center p-2 mb-1">
                <DoodleAirplane className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold text-stone-800">Aeroporto</span>
            </div>

            <span className="text-stone-300 font-bold">→</span>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center p-2 mb-1">
                <DoodleSuitcase className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold text-stone-800">Chegada</span>
            </div>

            <span className="text-stone-300 font-bold">→</span>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center p-2 mb-1">
                <DoodleStroller className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold text-stone-800">Produtos</span>
            </div>

            <span className="text-stone-300 font-bold">→</span>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center p-2 mb-1">
                <DoodleHeart className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold text-rose-700">Conforto</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
