import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Plane, Car, Hotel, Shield, ShoppingBag, MessageSquare, Baby, Users, Calendar, CheckCircle2 } from 'lucide-react';
import { Product, UnitId } from '../types';
import { PRODUCTS, UNITS } from '../data/mockData';

interface HeroPlannerCardProps {
  unitId: UnitId;
  onBookKit: (products: Product[], days: number) => void;
  onOpenChecklistModal: () => void;
}

type AgeOption = '0-6m' | '6-12m' | '1-2y' | '2-4y';

const AGE_LABELS: Record<AgeOption, { title: string; subtitle: string; icon: string }> = {
  '0-6m': { title: '0 a 6 meses', subtitle: 'Recém-nascido', icon: '🍼' },
  '6-12m': { title: '6 a 12 meses', subtitle: 'Transição / Sonecas', icon: '👶' },
  '1-2y': { title: '1 a 2 anos', subtitle: 'Primeiros passos', icon: '🚼' },
  '2-4y': { title: '2 a 4 anos', subtitle: 'Criança exploradora', icon: '🎒' },
};

export const HeroPlannerCard: React.FC<HeroPlannerCardProps> = ({
  unitId,
  onBookKit,
  onOpenChecklistModal,
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'checklist' | 'benefits'>('quiz');

  // Multi-step questionnaire state
  const [step, setStep] = useState(1);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(1);

  // Ages for up to 3 children
  const [childAges, setChildAges] = useState<AgeOption[]>(['6-12m', '2-4y', '1-2y']);

  const [flyAirplane, setFlyAirplane] = useState(true);
  const [stayHotel, setStayHotel] = useState(true);
  const [tripDays, setTripDays] = useState(5);

  const currentUnit = UNITS[unitId];

  // Calculate dynamic steps count:
  // Step 1: Adultos
  // Step 2: Qtd Crianças
  // Step 3: Idade Criança 1
  // Step 4 (if children >= 2): Idade Criança 2
  // Step 5 (if children >= 3): Idade Criança 3
  // Step Next: Meio de Viagem
  // Step Next: Hospedagem
  // Step Next: Dias de Viagem
  // Step Result
  const ageStepsCount = childrenCount;
  const totalQuestionSteps = 2 + ageStepsCount + 3; // Adultos(1) + Crianças(2) + Ages(N) + Transporte(1) + Hotel(1) + Dias(1)

  const handleSetChildAge = (childIndex: number, age: AgeOption) => {
    const updated = [...childAges];
    updated[childIndex] = age;
    setChildAges(updated);

    // If there is another child to ask for:
    if (childIndex + 1 < childrenCount) {
      setStep(3 + (childIndex + 1));
    } else {
      // Proceed to transport question
      setStep(3 + childrenCount);
    }
  };

  // Build smart customized equipment package matching ALL children
  const getTailoredProducts = (): Product[] => {
    const selected: Product[] = [];
    const addedIds = new Set<string>();

    const addProduct = (id: string) => {
      if (!addedIds.has(id)) {
        const p = PRODUCTS.find((prod) => prod.id === id);
        if (p) {
          selected.push(p);
          addedIds.add(id);
        }
      }
    };

    // Stroller is essential
    addProduct('carrinho-yoyo-babyzen');

    // For each child, determine specific car seat and gear
    for (let i = 0; i < childrenCount; i++) {
      const age = childAges[i];
      if (age === '0-6m' || age === '6-12m') {
        addProduct('bebe-conforto-chicco');
        if (age === '0-6m') {
          addProduct('banheira-stokke-flexi');
        }
      } else {
        addProduct('cadeira-cosco-progress');
      }

      if (age !== '0-6m') {
        addProduct('cadeira-alimentacao-chicco');
      }
    }

    // Crib if staying in hotel or having infants
    if (stayHotel || childAges.slice(0, childrenCount).some((a) => a === '0-6m' || a === '6-12m')) {
      addProduct('berco-graco-pack-play');
    }

    return selected;
  };

  const tailoredProducts = getTailoredProducts();
  const totalDaily = tailoredProducts.reduce((sum, p) => sum + p.dailyPrice, 0);
  const totalTrip = totalDaily * tripDays;
  const totalWeightKg = tailoredProducts.reduce((sum, p) => sum + p.specs.weightKg, 0);

  const handleWhatsAppSend = () => {
    const itemsList = tailoredProducts.map((p) => `• ${p.name}`).join('\n');
    const msg = encodeURIComponent(
      `Olá Torre de Bebel! Fiz o diagnóstico no site para ${currentUnit.name}.\nFamília: ${adults} adultos e ${childrenCount} criança(s).\nViagem de ${tripDays} dias.\nPacote recomendado:\n${itemsList}\nTotal estimado: R$ ${totalTrip.toFixed(2)}\nGostaria de confirmar a disponibilidade!`
    );
    window.open(`https://wa.me/${currentUnit.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden text-left flex flex-col transition-all">
      {/* Top Segmented Tabs (Inspired by the reference image with clean pill tabs) */}
      <div className="p-2.5 bg-stone-100/80 border-b border-stone-200/70">
        <div className="grid grid-cols-3 gap-1 bg-stone-200/60 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-white text-orange-950 font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span className="truncate">Monte sua Viagem</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-white text-orange-950 font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="truncate">Checklist Rápido</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'benefits'
                ? 'bg-white text-orange-950 font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-orange-600" />
            <span className="truncate">Por que Alugar?</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DIAGNÓSTICO / MONTE SUA VIAGEM */}
      {activeTab === 'quiz' && (
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
          {/* Progress Header */}
          {step <= totalQuestionSteps && (
            <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-2.5">
              <span className="font-bold text-orange-700 uppercase tracking-wider">
                Diagnóstico de Viagem Infantil
              </span>
              <span className="font-semibold text-stone-400">
                Passo {step} de {totalQuestionSteps}
              </span>
            </div>
          )}

          {/* STEP 1: Adultos */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Quantos adultos vão viajar?
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Para calcularmos a facilidade de locomoção no aeroporto de {currentUnit.name}.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2.5 pt-1">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setAdults(num);
                      setStep(2);
                    }}
                    className={`py-3.5 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                      adults === num
                        ? 'bg-orange-500 text-white border-orange-500 font-bold shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 font-semibold'
                    }`}
                  >
                    <span className="text-lg block leading-none">{num}</span>
                    <span className="text-[10px] opacity-80">{num > 1 ? 'adultos' : 'adulto'}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Quantas Crianças? */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Quantas crianças ou bebês viajarão?
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Vamos perguntar a idade individual de cada uma para sugerir os equipamentos certos.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {[
                  { num: 1, label: '1 bebê/criança', desc: 'Apenas 1 filho' },
                  { num: 2, label: '2 crianças', desc: 'Irmãozinhos' },
                  { num: 3, label: '3 crianças', desc: 'Família grande' },
                ].map((item) => (
                  <button
                    key={item.num}
                    onClick={() => {
                      setChildrenCount(item.num);
                      setStep(3); // Go to Child 1 age
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      childrenCount === item.num
                        ? 'bg-orange-500 text-white border-orange-500 font-bold shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 font-semibold'
                    }`}
                  >
                    <span className="text-base block font-bold leading-tight">{item.num}</span>
                    <span className="text-xs block mt-0.5">{item.label}</span>
                    <span className={`text-[10px] block opacity-80 ${childrenCount === item.num ? 'text-orange-100' : 'text-stone-400'}`}>
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Idade da PRIMEIRA criança */}
          {step === 3 && (
            <div className="space-y-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-700 bg-orange-100/70 px-2.5 py-0.5 rounded-full mb-1">
                  <span>{childrenCount > 1 ? '👶 1ª Criança' : '👶 Seu Bebê'}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {childrenCount > 1
                    ? 'Qual a faixa etária da 1ª criança?'
                    : 'Qual a faixa etária do bebê?'}
                </h3>
                <p className="text-xs text-stone-500">
                  Para definir se precisa de bebê conforto neonatal, carrinho reclinável ou cadeirinha.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {(['0-6m', '6-12m', '1-2y', '2-4y'] as AgeOption[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSetChildAge(0, opt)}
                    className="p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-400 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{AGE_LABELS[opt].icon}</span>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block group-hover:text-orange-700">
                          {AGE_LABELS[opt].title}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          {AGE_LABELS[opt].subtitle}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Idade da SEGUNDA criança (se houver 2 ou mais) */}
          {step === 4 && childrenCount >= 2 && (
            <div className="space-y-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-700 bg-orange-100/70 px-2.5 py-0.5 rounded-full mb-1">
                  <span>👶 2ª Criança</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Qual a faixa etária da 2ª criança?
                </h3>
                <p className="text-xs text-stone-500">
                  Cada idade tem uma necessidade específica de segurança no carro e passeio.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {(['0-6m', '6-12m', '1-2y', '2-4y'] as AgeOption[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSetChildAge(1, opt)}
                    className="p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-400 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{AGE_LABELS[opt].icon}</span>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block group-hover:text-orange-700">
                          {AGE_LABELS[opt].title}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          {AGE_LABELS[opt].subtitle}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Idade da TERCEIRA criança (se houver 3) */}
          {step === 5 && childrenCount >= 3 && (
            <div className="space-y-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-700 bg-orange-100/70 px-2.5 py-0.5 rounded-full mb-1">
                  <span>👶 3ª Criança</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Qual a faixa etária da 3ª criança?
                </h3>
                <p className="text-xs text-stone-500">
                  Montamos o kit familiar completo com cadeirinhas e carrinhos adequados.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {(['0-6m', '6-12m', '1-2y', '2-4y'] as AgeOption[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSetChildAge(2, opt)}
                    className="p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-400 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{AGE_LABELS[opt].icon}</span>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block group-hover:text-orange-700">
                          {AGE_LABELS[opt].title}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          {AGE_LABELS[opt].subtitle}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP Transporte (Passo seguinte às idades) */}
          {step === (3 + childrenCount) && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Você vai viajar de avião?
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Podemos entregar os equipamentos diretamente no desembarque de {currentUnit.airportCode}.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    setFlyAirplane(true);
                    setStep(step + 1);
                  }}
                  className="p-4 rounded-2xl border border-orange-200 bg-orange-50/70 text-orange-950 font-bold flex flex-col items-center gap-2 hover:bg-orange-100 transition-all cursor-pointer text-center"
                >
                  <Plane className="w-6 h-6 text-orange-600" />
                  <span className="text-xs">Sim, vou voar</span>
                  <span className="text-[10px] font-normal text-stone-500">Entrega no aeroporto</span>
                </button>

                <button
                  onClick={() => {
                    setFlyAirplane(false);
                    setStep(step + 1);
                  }}
                  className="p-4 rounded-2xl border border-stone-200 bg-stone-50 text-stone-800 font-bold flex flex-col items-center gap-2 hover:bg-stone-100 transition-all cursor-pointer text-center"
                >
                  <Car className="w-6 h-6 text-stone-500" />
                  <span className="text-xs">Não, vou de carro</span>
                  <span className="text-[10px] font-normal text-stone-500">Entrega no hotel ou local</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP Hospedagem */}
          {step === (4 + childrenCount) && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Onde vocês vão se hospedar?
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Hotéis geralmente precisam de berço e cadeira de alimentação próprios.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    setStayHotel(true);
                    setStep(step + 1);
                  }}
                  className="p-4 rounded-2xl border border-orange-200 bg-orange-50/70 text-orange-950 font-bold flex flex-col items-center gap-2 hover:bg-orange-100 transition-all cursor-pointer text-center"
                >
                  <Hotel className="w-6 h-6 text-orange-600" />
                  <span className="text-xs">Hotel ou Resort</span>
                  <span className="text-[10px] font-normal text-stone-500">Berço montado no quarto</span>
                </button>

                <button
                  onClick={() => {
                    setStayHotel(false);
                    setStep(step + 1);
                  }}
                  className="p-4 rounded-2xl border border-stone-200 bg-stone-50 text-stone-800 font-bold flex flex-col items-center gap-2 hover:bg-stone-100 transition-all cursor-pointer text-center"
                >
                  <Shield className="w-6 h-6 text-stone-500" />
                  <span className="text-xs">Airbnb / Temporada</span>
                  <span className="text-[10px] font-normal text-stone-500">Entrega rápida na portaria</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP Dias */}
          {step === (5 + childrenCount) && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Quantos dias vai durar a viagem?
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Calculamos o melhor valor de diária com desconto progressivo.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1">
                {[3, 5, 7, 10].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setTripDays(d);
                      setStep(step + 1); // RESULT!
                    }}
                    className={`py-3 px-1 rounded-2xl border text-center transition-all cursor-pointer ${
                      tripDays === d
                        ? 'bg-orange-500 text-white border-orange-500 font-bold shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 font-semibold'
                    }`}
                  >
                    <span className="text-lg block leading-none">{d}</span>
                    <span className="text-[10px] opacity-80">dias</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FINAL RESULT STATE */}
          {step > (5 + childrenCount) && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Diagnóstico Pronto para {currentUnit.name}</span>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
                >
                  Refazer
                </button>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  Seu Pacote de Viagem Recomendado
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Personalizado para {adults} adultos e {childrenCount} criança{childrenCount > 1 ? 's' : ''}{' '}
                  ({childrenCount === 1 ? AGE_LABELS[childAges[0]].title : childAges.slice(0, childrenCount).map((a) => AGE_LABELS[a].title).join(' e ')})
                </p>
              </div>

              {/* Luggage savings banner */}
              <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200/90 flex items-center justify-between">
                <div className="text-xs text-orange-950 font-medium">
                  <strong>Economia de Bagagem Aérea:</strong>
                  <p className="text-[11px] text-orange-800">
                    Você evita despachar ~{totalWeightKg.toFixed(0)} kg de tralhas pesadas no avião.
                  </p>
                </div>
                <span className="text-lg font-bold text-orange-900 shrink-0 tabular-nums">
                  -{totalWeightKg.toFixed(0)}kg
                </span>
              </div>

              {/* Tailored items list */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {tailoredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-8 h-8 rounded-lg object-cover bg-white"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="font-bold text-stone-900 block leading-tight">{prod.name}</span>
                        <span className="text-[10px] text-stone-400">{prod.category}</span>
                      </div>
                    </div>
                    <span className="font-bold text-stone-800 tabular-nums">
                      R$ {prod.dailyPrice.toFixed(2).replace('.', ',')}/d
                    </span>
                  </div>
                ))}
              </div>

              {/* Price baseline & Actions */}
              <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-stone-400">Total estimado ({tripDays} dias):</span>
                  <div className="text-xl font-bold text-stone-900 tabular-nums">
                    R$ {totalTrip.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Higienização a vapor inclusa
                </span>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onBookKit(tailoredProducts, tripDays)}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>RESERVAR ESTE PACOTE AGORA</span>
                </button>

                <button
                  onClick={handleWhatsAppSend}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Tirar Dúvidas no WhatsApp de {currentUnit.name}</span>
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {step > 1 && step <= totalQuestionSteps && (
            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>

              <button
                onClick={() => setStep(step + 1)}
                className="text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                Avançar →
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CHECKLIST RÁPIDO */}
      {activeTab === 'checklist' && (
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Checklist Essencial do Bebê
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              O que você precisa ter em mãos para embarcar sem aperto:
            </p>
          </div>

          <div className="space-y-2 text-xs text-stone-700">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Documentos com foto do bebê (RG ou Certidão)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Carrinho compacto (esperando no desembarque)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bebê conforto higienizado para o táxi/Uber</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Berço portátil no hotel com lençol esterilizado</span>
            </div>
          </div>

          <button
            onClick={onOpenChecklistModal}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Abrir Checklist Completo & WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TAB 3: POR QUE ALUGAR? */}
      {activeTab === 'benefits' && (
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Por que mais de 13.500 famílias alugam aqui?
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              A diferença entre uma viagem exaustiva e férias relaxantes:
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-stone-700">
            <div className="flex items-start gap-2.5">
              <span className="text-orange-600 font-bold text-sm leading-none">•</span>
              <div>
                <strong>Zero excesso de bagagem aérea:</strong> Economize até R$ 280 em taxas de mala por trecho.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-orange-600 font-bold text-sm leading-none">•</span>
              <div>
                <strong>Higiene nível hospitalar:</strong> Esterilização a vapor 140°C e lençóis selados a vácuo.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-orange-600 font-bold text-sm leading-none">•</span>
              <div>
                <strong>Entrega VIP no aeroporto:</strong> Pegue o carrinho ao sair do portão de desembarque.
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('quiz')}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Iniciar Meu Diagnóstico</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
