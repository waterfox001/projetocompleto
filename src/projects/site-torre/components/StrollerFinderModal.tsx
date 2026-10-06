import React, { useState } from 'react';
import { X, Trophy, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, UnitId } from '../types';
import { PRODUCTS } from '../data/mockData';

interface StrollerFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: UnitId;
  onSelectStroller: (product: Product) => void;
}

export const StrollerFinderModal: React.FC<StrollerFinderModalProps> = ({
  isOpen,
  onClose,
  unitId,
  onSelectStroller,
}) => {
  const [age, setAge] = useState<'0-6m' | '6m-18m' | '18m+'>('6m-18m');
  const [priority, setPriority] = useState<'cabin' | 'recline' | 'budget'>('cabin');
  const [tripType, setTripType] = useState<'airplane' | 'car' | 'resort'>('airplane');
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  // Stroller recommendations
  const yoyo = PRODUCTS.find((p) => p.id === 'carrinho-yoyo-babyzen')!;
  const liteway = PRODUCTS.find((p) => p.id === 'carrinho-chicco-liteway')!;

  const bestChoice = priority === 'budget' ? liteway : yoyo;
  const alternativeChoice = priority === 'budget' ? yoyo : liteway;
  const budgetChoice = liteway;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">
              Diagnóstico Especializado · Qual Carrinho é Ideal?
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {!showResult ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Encontre o carrinho perfeito para seu bebê
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Responda 3 perguntas rápidas para receber nossa recomendação testada por pediatras e viajantes.
                </p>
              </div>

              {/* 1. Idade */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  1. Qual a idade da criança?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '0 a 6 meses', val: '0-6m' },
                    { label: '6 a 18 meses', val: '6m-18m' },
                    { label: 'Mais de 18 meses', val: '18m+' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setAge(item.val as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                        age === item.val
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Tipo de Viagem */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  2. Tipo principal de deslocamento:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Viagem de Avião', val: 'airplane' },
                    { label: 'Estrada / Carro', val: 'car' },
                    { label: 'Resort / Praia', val: 'resort' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setTripType(item.val as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                        tripType === item.val
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Prioridade */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  3. O que mais importa para você?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Caber na Cabine do Avião', val: 'cabin' },
                    { label: 'Reclinação Máxima (Soneca)', val: 'recline' },
                    { label: 'Menor Diária (Economia)', val: 'budget' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setPriority(item.val as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                        priority === item.val
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowResult(true)}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-orange-600/20 flex items-center justify-center gap-2"
              >
                <span>Ver Nossa Recomendação</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Result Section */
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Nossa recomendação para você
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Selecionamos as 3 melhores alternativas para sua viagem.
                </p>
              </div>

              <div className="space-y-3">
                {/* 🥇 Melhor para você */}
                <div className="p-4 rounded-2xl bg-amber-50/50 border-2 border-amber-300 relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥇</span>
                    <img
                      src={bestChoice.imageUrl}
                      alt={bestChoice.name}
                      className="w-12 h-12 object-cover rounded-xl bg-white border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                        Melhor para Você
                      </span>
                      <h4 className="text-sm font-bold text-stone-900">{bestChoice.name}</h4>
                      <div className="text-xs text-orange-700 font-bold">
                        R$ {bestChoice.dailyPrice.toFixed(2).replace('.', ',')}/dia
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectStroller(bestChoice);
                      onClose();
                    }}
                    className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Escolher</span>
                  </button>
                </div>

                {/* 🥈 Alternativa */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥈</span>
                    <div>
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                        Alternativa Recomendada
                      </span>
                      <h4 className="text-xs font-bold text-stone-900">{alternativeChoice.name}</h4>
                      <div className="text-xs text-stone-600">
                        R$ {alternativeChoice.dailyPrice.toFixed(2).replace('.', ',')}/dia
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectStroller(alternativeChoice);
                      onClose();
                    }}
                    className="px-3 py-1.5 border border-stone-300 hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-xs shrink-0"
                  >
                    Ver este
                  </button>
                </div>

                {/* 🥉 Mais Econômica */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥉</span>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        Mais Econômica
                      </span>
                      <h4 className="text-xs font-bold text-stone-900">{budgetChoice.name}</h4>
                      <div className="text-xs text-stone-600">
                        R$ {budgetChoice.dailyPrice.toFixed(2).replace('.', ',')}/dia
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectStroller(budgetChoice);
                      onClose();
                    }}
                    className="px-3 py-1.5 border border-stone-300 hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-xs shrink-0"
                  >
                    Ver este
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowResult(false)}
                className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs text-center"
              >
                Voltar e alterar critérios
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
