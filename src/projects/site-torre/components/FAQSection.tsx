import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Search } from 'lucide-react';
import { UnitId } from '../types';
import { UNITS } from '../data/mockData';

interface FAQSectionProps {
  unitId: UnitId;
}

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Como funciona o aluguel com a Torre de Bebel?',
    a: 'Você escolhe os produtos desejados no site, informa o período da viagem e o local de entrega (aeroporto, hotel ou pousada). Nós entregamos os equipamentos esterilizados e embalados no horário combinado.',
  },
  {
    q: 'Posso retirar e devolver no próprio aeroporto?',
    a: 'Sim! Temos plantão exclusivo para entrega no desembarque e recolhimento antes do seu embarque nos aeroportos de Fortaleza (FOR), Porto Alegre (POA), Recife (REC) e Congonhas (CGH).',
  },
  {
    q: 'Como os produtos são higienizados?',
    a: 'Seguimos um rigoroso protocolo de 6 etapas que inclui lavagem e desinfecção com vapor hospitalar a 140°C, produtos bactericidas pediátricos atóxicos e selagem imediata com lacre de segurança.',
  },
  {
    q: 'Posso receber os produtos diretamente no hotel ou Airbnb?',
    a: 'Sim! Entregamos diretamente na recepção ou portaria. Berços podem ser deixados prontos no quarto antes do seu check-in.',
  },
  {
    q: 'O que acontece se meu voo atrasar?',
    a: 'Nossa equipe monitora o número do seu voo no radar aéreo. Se houver atraso ou adiantamento, nos adequamos automaticamente sem qualquer cobrança extra.',
  },
  {
    q: 'E se eu decidir estender a viagem por mais alguns dias?',
    a: 'Basta acessar a área "Minha Torre" e solicitar a renovação. O sistema verifica a disponibilidade do item e estende o prazo mantendo a tarifa original.',
  },
  {
    q: 'Com quanta antecedência devo fazer minha reserva?',
    a: 'Recomendamos reservar assim que emitir as passagens aéreas ou escolher a hospedagem, pois itens de alta procura como carrinhos ultracompactos costumam esgotar em feriados.',
  },
  {
    q: 'Quais são as formas de pagamento aceitas?',
    a: 'Aceitamos PIX instantâneo com desconto especial e cartões de crédito com parcelamento facilitado.',
  },
  {
    q: 'Como funciona a política de cancelamento?',
    a: 'Cancelamentos comunicados com até 48 horas de antecedência ao início da reserva possuem reembolso integral e sem complicações.',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ unitId }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FCFAF7] border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Perguntas Frequentes
          </h2>
          <p className="text-stone-600 text-sm">
            Tudo o que você precisa saber para planejar sua viagem em família com segurança.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar dúvida rápida (ex: aeroporto, higienização, cancelamento)..."
            className="w-full bg-white border border-stone-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-stone-900 text-sm leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-orange-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contextual WhatsApp Assistance */}
        <div className="mt-10 p-6 bg-white rounded-3xl border border-stone-200 text-center space-y-3">
          <h4 className="font-serif text-lg font-bold text-stone-900">
            Ainda ficou com alguma dúvida sobre seu destino?
          </h4>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Nossa equipe humana de {UNITS[unitId].name} está pronta para responder suas perguntas com carinho.
          </p>
          <a
            href={`https://wa.me/${UNITS[unitId].whatsapp}?text=${encodeURIComponent(
              `Olá! Tenho uma dúvida sobre a locação na Torre de Bebel ${UNITS[unitId].name}.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Conversar no WhatsApp de {UNITS[unitId].name}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
