import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, MessageSquare, ShoppingBag, Sparkles, Baby } from 'lucide-react';
import { Product, UnitId } from '../types';
import { PRODUCTS, UNITS } from '../data/mockData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: UnitId;
  onBookSelection: (products: Product[], days: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  unitId,
  onBookSelection,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [childrenCount, setChildrenCount] = useState(1);
  const [childAges, setChildAges] = useState<string[]>(['6 a 12 meses', '1 a 2 anos']);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Question sequence:
  // Step 1: Quantas crianças vão viajar?
  // Step 2: Idade da 1ª criança
  // Step 3 (if 2+ children): Idade da 2ª criança
  // Step 4: Avião?
  // Step 5: Alugar carro?
  // Step 6: Onde vai se hospedar?
  // Step 7: Quantos dias?
  // Step 8: Berço necessário?
  // Step 9: Alimentação fora?
  // Step 10: Prioridade (Praticidade ou Economia)?
  // Result
  const totalSteps = childrenCount > 1 ? 10 : 9;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Recommended products tailored to the children
  const recommendedItems: Product[] = [];
  const addedIds = new Set<string>();

  const addProd = (id: string) => {
    if (!addedIds.has(id)) {
      const p = PRODUCTS.find((prod) => prod.id === id);
      if (p) {
        recommendedItems.push(p);
        addedIds.add(id);
      }
    }
  };

  addProd('carrinho-yoyo-babyzen');

  for (let i = 0; i < childrenCount; i++) {
    const age = childAges[i] || '6 a 12 meses';
    if (age.includes('0 a 6') || age.includes('6 a 12')) {
      addProd('bebe-conforto-chicco');
      if (age.includes('0 a 6')) addProd('banheira-stokke-flexi');
    } else {
      addProd('cadeira-cosco-progress');
    }
  }

  addProd('berco-graco-pack-play');
  addProd('cadeira-alimentacao-chicco');

  const daysEstimated = 5;
  const totalPrice = recommendedItems.reduce((acc, p) => acc + p.dailyPrice, 0) * daysEstimated;

  const handleSendWhatsApp = () => {
    const itemsList = recommendedItems.map((p) => `• ${p.name}`).join('\n');
    const text = encodeURIComponent(
      `Olá Torre de Bebel! Fiz o Quiz no site para minha viagem a ${UNITS[unitId].name} (${childrenCount} crianças, ${daysEstimated} dias).\nMinha seleção recomendada:\n${itemsList}\nGostaria de confirmar a reserva!`
    );
    window.open(`https://wa.me/${UNITS[unitId].whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">
              Diagnóstico do Pequeno Viajante
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-stone-100 h-1">
          <div
            className="bg-orange-600 h-1 transition-all duration-300"
            style={{ width: `${(Math.min(currentStep, totalSteps) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {currentStep <= totalSteps ? (
            <div className="space-y-6">
              <div className="text-xs font-semibold text-stone-400">
                Pergunta {currentStep} de {totalSteps}
              </div>

              {/* Step 1: Quantas crianças? */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Quantas crianças vão viajar com vocês?
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { num: 1, label: '1 bebê' },
                      { num: 2, label: '2 crianças' },
                      { num: 3, label: '3 crianças' },
                    ].map((item) => (
                      <button
                        key={item.num}
                        onClick={() => {
                          setChildrenCount(item.num);
                          setCurrentStep(2);
                        }}
                        className={`p-4 rounded-2xl border font-bold text-center transition-all cursor-pointer ${
                          childrenCount === item.num
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-2xl block">{item.num}</span>
                        <span className="text-xs font-semibold block mt-1">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Idade da 1ª criança */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                    <span>👶 {childrenCount > 1 ? '1ª Criança' : 'Seu Bebê'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    {childrenCount > 1
                      ? 'Qual a faixa etária da 1ª criança?'
                      : 'Qual a idade da criança?'}
                  </h3>
                  <div className="space-y-2">
                    {['0 a 6 meses (Recém-nascido)', '6 a 12 meses', '1 a 2 anos', 'Acima de 2 anos'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          const updated = [...childAges];
                          updated[0] = opt;
                          setChildAges(updated);
                          if (childrenCount > 1) {
                            setCurrentStep(3); // Go to child 2
                          } else {
                            setCurrentStep(4);
                          }
                        }}
                        className="w-full p-4 rounded-2xl border border-stone-200 hover:border-orange-500 hover:bg-orange-50/50 bg-stone-50/50 text-left font-semibold text-sm text-stone-800 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Idade da 2ª criança (se houver) */}
              {currentStep === 3 && childrenCount > 1 && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                    <span>👶 2ª Criança</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Qual a faixa etária da 2ª criança?
                  </h3>
                  <div className="space-y-2">
                    {['0 a 6 meses', '6 a 12 meses', '1 a 2 anos', 'Acima de 2 anos'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          const updated = [...childAges];
                          updated[1] = opt;
                          setChildAges(updated);
                          setCurrentStep(4);
                        }}
                        className="w-full p-4 rounded-2xl border border-stone-200 hover:border-orange-500 hover:bg-orange-50/50 bg-stone-50/50 text-left font-semibold text-sm text-stone-800 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Avião? */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Vocês vão viajar de avião?
                  </h3>
                  <div className="space-y-2">
                    {['Sim, viagem aérea com desembarque no aeroporto', 'Não, vamos de carro próprio ou rodoviária'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setAnswers({ ...answers, aviao: opt });
                          setCurrentStep(5);
                        }}
                        className="w-full p-4 rounded-2xl border border-stone-200 hover:border-orange-500 hover:bg-orange-50/50 bg-stone-50/50 text-left font-semibold text-sm text-stone-800 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Alugar carro? */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Pretende alugar carro ou fazer passeios de estrada?
                  </h3>
                  <div className="space-y-2">
                    {['Sim, vamos alugar carro (precisaremos de cadeirinhas)', 'Não, somente táxi / transfer / a pé'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setAnswers({ ...answers, carro: opt });
                          setCurrentStep(6);
                        }}
                        className="w-full p-4 rounded-2xl border border-stone-200 hover:border-orange-500 hover:bg-orange-50/50 bg-stone-50/50 text-left font-semibold text-sm text-stone-800 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Onde vai se hospedar? */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Onde vocês vão se hospedar?
                  </h3>
                  <div className="space-y-2">
                    {['Hotel, Pousada ou Resort', 'Airbnb ou casa de parentes'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setAnswers({ ...answers, hotel: opt });
                          setCurrentStep(7);
                        }}
                        className="w-full p-4 rounded-2xl border border-stone-200 hover:border-orange-500 hover:bg-orange-50/50 bg-stone-50/50 text-left font-semibold text-sm text-stone-800 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Quantos dias? */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Quantos dias vai durar a viagem?
                  </h3>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[3, 5, 7, 10].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setAnswers({ ...answers, dias: `${d} dias` });
                          setCurrentStep(8);
                        }}
                        className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-orange-50 hover:border-orange-500 text-center font-bold transition-all cursor-pointer"
                      >
                        <span className="text-xl block">{d}</span>
                        <span className="text-xs text-stone-500 font-normal">dias</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Berço? */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Vai precisar de berço confortável com lençol higienizado?
                  </h3>
                  <div className="space-y-2">
                    {['Sim, berço portátil é essencial para o sono seguro', 'Não, cama compartilhada ou o hotel já fornece'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setAnswers({ ...answers, berco: opt });
                          setCurrentStep(9);
                        }}
                        className="w-full p-4 rounded-2xl border border-stone-200 hover:border-orange-500 hover:bg-orange-50/50 bg-stone-50/50 text-left font-semibold text-sm text-stone-800 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 9/10: Prioridade */}
              {currentStep >= 9 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    O que é mais prioritário para vocês?
                  </h3>
                  <div className="space-y-2">
                    {['Máxima praticidade e leveza no aeroporto', 'Melhor custo-benefício familiar', 'Conforto total de primeira classe'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setAnswers({ ...answers, prioridade: opt });
                          setCurrentStep(totalSteps + 1); // RESULT
                        }}
                        className="w-full p-4 rounded-2xl border border-stone-200 hover:border-orange-500 hover:bg-orange-50/50 bg-stone-50/50 text-left font-semibold text-sm text-stone-800 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep > 1 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 pt-3 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar pergunta</span>
                </button>
              )}
            </div>
          ) : (
            /* RESULTADO DO DIAGNÓSTICO */
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Checklist Personalizado Concluído</span>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Sua viagem em família está pronta!
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Pacote calculado para {childrenCount} criança{childrenCount > 1 ? 's' : ''} em {UNITS[unitId].name}:
                </p>
              </div>

              {/* Items recommended */}
              <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-200/80 space-y-2.5">
                {recommendedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-600 shrink-0" />
                      <span className="text-sm font-bold text-stone-900">{item.name}</span>
                    </div>
                    <span className="text-xs text-stone-500 font-semibold">
                      R$ {item.dailyPrice.toFixed(2).replace('.', ',')}/dia
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex justify-between font-bold">
                <span>Total para {daysEstimated} dias:</span>
                <span className="text-stone-900">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onBookSelection(recommendedItems, daysEstimated);
                    onClose();
                  }}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Reservar Agora Esta Seleção</span>
                </button>

                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Seleção pelo WhatsApp da Unidade</span>
                </button>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs text-center cursor-pointer"
                >
                  Refazer o quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
