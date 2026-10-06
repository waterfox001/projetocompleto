import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Plane, Hotel, Car, Shield, ShoppingBag, Baby, Users } from 'lucide-react';
import { Product, UnitId } from '../types';
import { PRODUCTS, UNITS } from '../data/mockData';

interface TripBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: UnitId;
  onBookKit: (products: Product[], days: number) => void;
}

type AgeOption = '0-6m' | '6-12m' | '1-2y' | '2-4y';

const AGE_LABELS: Record<AgeOption, { title: string; subtitle: string; icon: string }> = {
  '0-6m': { title: '0 a 6 meses', subtitle: 'Recém-nascido', icon: '🍼' },
  '6-12m': { title: '6 a 12 meses', subtitle: 'Transição / Sonecas', icon: '👶' },
  '1-2y': { title: '1 a 2 anos', subtitle: 'Primeiros passos', icon: '🚼' },
  '2-4y': { title: '2 a 4 anos', subtitle: 'Criança exploradora', icon: '🎒' },
};

export const TripBuilderModal: React.FC<TripBuilderModalProps> = ({
  isOpen,
  onClose,
  unitId,
  onBookKit,
}) => {
  const [step, setStep] = useState(1);

  // Answers state
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(1);
  const [childAges, setChildAges] = useState<AgeOption[]>(['6-12m', '2-4y', '1-2y']);
  const [flyAirplane, setFlyAirplane] = useState(true);
  const [stayHotel, setStayHotel] = useState(true);
  const [rentCar, setRentCar] = useState(true);
  const [tripDays, setTripDays] = useState(5);

  if (!isOpen) return null;

  // Dynamic step count:
  // Step 1: Adultos
  // Step 2: Qtd Crianças
  // Step 3 to (2 + childrenCount): Idade da Criança 1, 2, 3...
  // Step Transporte
  // Step Hospedagem
  // Step Carro
  // Step Dias
  const totalSteps = 2 + childrenCount + 4;

  const handleSetAge = (childIdx: number, age: AgeOption) => {
    const updated = [...childAges];
    updated[childIdx] = age;
    setChildAges(updated);

    if (childIdx + 1 < childrenCount) {
      setStep(3 + childIdx + 1);
    } else {
      setStep(3 + childrenCount);
    }
  };

  // Calculate tailored recommendation based on answers
  const recommendedProducts: Product[] = [];
  const addedIds = new Set<string>();

  const addProduct = (id: string) => {
    if (!addedIds.has(id)) {
      const p = PRODUCTS.find((prod) => prod.id === id);
      if (p) {
        recommendedProducts.push(p);
        addedIds.add(id);
      }
    }
  };

  // Stroller
  addProduct('carrinho-yoyo-babyzen');

  // Multi-children gear
  for (let i = 0; i < childrenCount; i++) {
    const age = childAges[i];
    if (age === '0-6m' || age === '6-12m') {
      addProduct('bebe-conforto-chicco');
      if (age === '0-6m') addProduct('banheira-stokke-flexi');
    } else {
      addProduct('cadeira-cosco-progress');
    }

    if (age !== '0-6m') {
      addProduct('cadeira-alimentacao-chicco');
    }
  }

  // Crib
  if (stayHotel || childAges.slice(0, childrenCount).some((a) => a === '0-6m' || a === '6-12m')) {
    addProduct('berco-graco-pack-play');
  }

  const totalDailyPrice = recommendedProducts.reduce((acc, p) => acc + p.dailyPrice, 0);
  const totalTripPrice = totalDailyPrice * tripDays;
  const estimatedLuggageWeight = recommendedProducts.reduce((acc, p) => acc + p.specs.weightKg, 0);

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-orange-50/60 border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">
              Monte sua Viagem · Assistente Familiar
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-1">
          <div
            className="bg-orange-600 h-1 transition-all duration-300"
            style={{ width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Wizard Steps Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step <= totalSteps ? (
            <div className="space-y-6">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                Etapa {step} de {totalSteps}
              </div>

              {/* Step 1: Quantos adultos? */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Quantos adultos vão viajar?
                  </h3>
                  <p className="text-sm text-stone-500">
                    Isso nos ajuda a calcular a praticidade e a mobilidade de vocês nos aeroportos.
                  </p>
                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setAdults(num);
                          setStep(2);
                        }}
                        className={`p-4 rounded-2xl text-center border font-bold transition-all cursor-pointer ${
                          adults === num
                            ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                            : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-xl block">{num}</span>
                        <span className="text-xs font-normal">adulto{num > 1 ? 's' : ''}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Quantas crianças? */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Quantas crianças ou bebês viajarão com vocês?
                  </h3>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { num: 1, label: '1 bebê', desc: 'Apenas 1' },
                      { num: 2, label: '2 crianças', desc: 'Irmãos' },
                      { num: 3, label: '3 crianças', desc: 'Família maior' },
                    ].map((item) => (
                      <button
                        key={item.num}
                        onClick={() => {
                          setChildrenCount(item.num);
                          setStep(3); // Go to Child 1
                        }}
                        className={`p-4 rounded-2xl text-center border font-bold transition-all cursor-pointer ${
                          childrenCount === item.num
                            ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                            : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-xl block">{item.num}</span>
                        <span className="text-xs font-semibold block mt-0.5">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Idade da 1ª Criança */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                    <span>👶 {childrenCount > 1 ? '1ª Criança' : 'Seu Bebê'}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    {childrenCount > 1
                      ? 'Qual a faixa etária da 1ª criança?'
                      : 'Qual a faixa etária do bebê?'}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {(['0-6m', '6-12m', '1-2y', '2-4y'] as AgeOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSetAge(0, opt)}
                        className="p-4 rounded-2xl text-left border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-400 font-semibold text-sm transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{AGE_LABELS[opt].icon}</span>
                          <div>
                            <span className="block font-bold text-stone-900">{AGE_LABELS[opt].title}</span>
                            <span className="block text-xs text-stone-500">{AGE_LABELS[opt].subtitle}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Idade da 2ª Criança (quando houver 2 ou mais) */}
              {step === 4 && childrenCount >= 2 && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                    <span>👶 2ª Criança</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Qual a faixa etária da 2ª criança?
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {(['0-6m', '6-12m', '1-2y', '2-4y'] as AgeOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSetAge(1, opt)}
                        className="p-4 rounded-2xl text-left border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-400 font-semibold text-sm transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{AGE_LABELS[opt].icon}</span>
                          <div>
                            <span className="block font-bold text-stone-900">{AGE_LABELS[opt].title}</span>
                            <span className="block text-xs text-stone-500">{AGE_LABELS[opt].subtitle}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Idade da 3ª Criança (quando houver 3) */}
              {step === 5 && childrenCount >= 3 && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                    <span>👶 3ª Criança</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Qual a faixa etária da 3ª criança?
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {(['0-6m', '6-12m', '1-2y', '2-4y'] as AgeOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSetAge(2, opt)}
                        className="p-4 rounded-2xl text-left border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-400 font-semibold text-sm transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{AGE_LABELS[opt].icon}</span>
                          <div>
                            <span className="block font-bold text-stone-900">{AGE_LABELS[opt].title}</span>
                            <span className="block text-xs text-stone-500">{AGE_LABELS[opt].subtitle}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step: Avião? */}
              {step === (3 + childrenCount) && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Você vai viajar de avião?
                  </h3>
                  <p className="text-sm text-stone-500">
                    Entregamos o carrinho e o bebê conforto diretamente no desembarque do aeroporto.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={() => {
                        setFlyAirplane(true);
                        setStep(step + 1);
                      }}
                      className="p-5 rounded-2xl border bg-orange-50/70 border-orange-300 text-orange-950 font-bold flex flex-col items-center gap-2 hover:bg-orange-100 cursor-pointer"
                    >
                      <Plane className="w-8 h-8 text-orange-600" />
                      <span>Sim, vou voar</span>
                      <span className="text-xs font-normal text-stone-500">Retirada no aeroporto</span>
                    </button>

                    <button
                      onClick={() => {
                        setFlyAirplane(false);
                        setStep(step + 1);
                      }}
                      className="p-5 rounded-2xl border bg-stone-50 border-stone-200 text-stone-800 font-bold flex flex-col items-center gap-2 hover:bg-stone-100 cursor-pointer"
                    >
                      <Car className="w-8 h-8 text-stone-500" />
                      <span>Não, vou de carro/ônibus</span>
                      <span className="text-xs font-normal text-stone-500">Entrega no hotel ou local</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step: Hotel? */}
              {step === (4 + childrenCount) && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Onde vocês vão se hospedar?
                  </h3>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={() => {
                        setStayHotel(true);
                        setStep(step + 1);
                      }}
                      className="p-5 rounded-2xl border bg-stone-50 border-stone-200 text-stone-800 font-bold flex flex-col items-center gap-2 hover:bg-stone-100 cursor-pointer"
                    >
                      <Hotel className="w-8 h-8 text-orange-600" />
                      <span>Hotel, Pousada ou Resort</span>
                    </button>
                    <button
                      onClick={() => {
                        setStayHotel(false);
                        setStep(step + 1);
                      }}
                      className="p-5 rounded-2xl border bg-stone-50 border-stone-200 text-stone-800 font-bold flex flex-col items-center gap-2 hover:bg-stone-100 cursor-pointer"
                    >
                      <Shield className="w-8 h-8 text-stone-500" />
                      <span>Airbnb ou Casa de Família</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step: Carro Alugado? */}
              {step === (5 + childrenCount) && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Pretende alugar carro ou fazer passeios de estrada?
                  </h3>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={() => {
                        setRentCar(true);
                        setStep(step + 1);
                      }}
                      className="p-4 rounded-2xl border bg-orange-600 text-white font-bold text-center cursor-pointer"
                    >
                      Sim, vou precisar de cadeirinhas
                    </button>
                    <button
                      onClick={() => {
                        setRentCar(false);
                        setStep(step + 1);
                      }}
                      className="p-4 rounded-2xl border bg-stone-50 border-stone-200 text-stone-800 font-bold text-center cursor-pointer"
                    >
                      Não, só transporte urbano / táxi
                    </button>
                  </div>
                </div>
              )}

              {/* Step: Dias? */}
              {step === (6 + childrenCount) && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-stone-900">
                    Quantos dias vai durar a viagem?
                  </h3>
                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {[3, 5, 7, 10].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setTripDays(d);
                          setStep(step + 1); // RESULT!
                        }}
                        className={`p-4 rounded-2xl text-center border font-bold transition-all cursor-pointer ${
                          tripDays === d
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-xl block">{d}</span>
                        <span className="text-xs font-normal">dias</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Avançar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* RESULTADO PERSONALIZADO */
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Diagnóstico Concluído com Sucesso</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Seu Kit de Viagem sob Medida
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  Recomendado para {adults} adultos e {childrenCount} criança{childrenCount > 1 ? 's' : ''} ({childAges.slice(0, childrenCount).map((a) => AGE_LABELS[a].title).join(' e ')}) por {tripDays} dias em {UNITS[unitId].name}.
                </p>
              </div>

              {/* Savings Highlight */}
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-950 uppercase tracking-wider block">
                    Espaço e Peso Economizados:
                  </span>
                  <p className="text-xs text-orange-800 mt-0.5">
                    Você economiza <strong>~{estimatedLuggageWeight.toFixed(0)} kg</strong> de excesso de bagagem aérea e viaja sem estresse.
                  </p>
                </div>
                <span className="text-2xl font-bold text-orange-900 tabular-nums">
                  -{estimatedLuggageWeight.toFixed(0)}kg
                </span>
              </div>

              {/* Products list */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Equipamentos Inclusos:
                </span>
                <div className="space-y-2">
                  {recommendedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-white"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">{p.name}</h4>
                          <span className="text-[11px] text-stone-500">{p.brand} · {p.category}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-stone-800">
                        R$ {p.dailyPrice.toFixed(2).replace('.', ',')}/dia
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & CTA */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400">Total para {tripDays} diárias:</span>
                  <div className="text-2xl font-bold text-stone-900 tabular-nums">
                    R$ {totalTripPrice.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onBookKit(recommendedProducts, tripDays);
                    onClose();
                  }}
                  className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-orange-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Montar Minha Reserva</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
