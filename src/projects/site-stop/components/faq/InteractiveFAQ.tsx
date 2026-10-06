import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Check, Shield, Lock } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'Reserva' | 'Locker' | 'Pagamento' | 'Localização' | 'Retirada';
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'f1',
    category: 'Locker',
    question: 'Posso guardar várias malas no mesmo compartimento?',
    answer:
      'Sim! Desde que todos os volumes caibam com segurança dentro do locker contratado. Por exemplo, nosso Locker G suporta até 1 mala grande despachada + 1 mala de bordo + mochilas ou casacos sem cobrança adicional por volume.',
  },
  {
    id: 'f2',
    category: 'Locker',
    question: 'Como sei qual tamanho de locker eu preciso?',
    answer:
      'Você pode usar nossa ferramenta visual "Cabe ou Não Cabe?" na página inicial. Escolha suas malas (mochila, bordo, grande) e o sistema recomenda o armário ideal instantaneamente com base no volume aproximado em litros.',
  },
  {
    id: 'f3',
    category: 'Pagamento',
    question: 'Como funciona o pagamento?',
    answer:
      'O pagamento é 100% digital e pode ser feito via PIX ou Cartão de Crédito. Você não precisa trocar dinheiro físico nem enfrentar caixas no aeroporto. A aprovação gera seu QR Code na mesma hora.',
  },
  {
    id: 'f4',
    category: 'Reserva',
    question: 'Posso reservar antecipadamente ou só no dia do voo?',
    answer:
      'Você pode reservar semanas antes da sua viagem ou no exato momento em que desembarcar no aeroporto. A reserva antecipada garante que o seu compartimento estará reservado e bloqueado para você, mesmo em dias de alta temporada.',
  },
  {
    id: 'f5',
    category: 'Retirada',
    question: 'Posso estender minha reserva se meu voo atrasar ou eu quiser passear mais?',
    answer:
      'Sim! Basta abrir a tela "Minha StopCase" no seu próprio celular e clicar em estender (+1h, +2h, etc.). O sistema consulta a disponibilidade do compartimento e recalcula o horário de retirada em segundos.',
  },
  {
    id: 'f6',
    category: 'Localização',
    question: 'Onde fica a StopCase nos aeroportos?',
    answer:
      'Todas as unidades estão instaladas em pontos centrais e estratégicos de fácil acesso nos saguões de desembarque de Fortaleza (FOR), Congonhas (CGH), Recife (REC), Salvador (SSA) e Porto Alegre (POA). Veja o mapa e instruções detalhadas na seção de aeroportos.',
  },
  {
    id: 'f7',
    category: 'Retirada',
    question: 'Como retiro minha bagagem ao retornar?',
    answer:
      'Ao chegar ao terminal StopCase, basta aproximar o QR Code gerado no seu celular ou digitar seu código PIN de 6 dígitos no teclado digital. O compartimento destrava eletronicamente na mesma hora.',
  },
];

export const InteractiveFAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('f1');

  const categories = ['all', 'Locker', 'Reserva', 'Pagamento', 'Localização', 'Retirada'];

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-400">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Central de Respostas & Dúvidas Frequentes</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Como podemos ajudar?
        </h2>
        <p className="text-sm text-slate-300">
          Clique nas dúvidas comuns abaixo ou busque termos para entender o funcionamento do serviço.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="max-w-3xl mx-auto space-y-4 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar dúvida: ex. 'várias malas', 'estender horário', 'PIX'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 py-3.5 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
          />
          <Search className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === c
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c === 'all' ? 'Todas as dúvidas' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion / Button items */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'border-sky-500/50 bg-[#0A1020]'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-sky-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {item.category}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    {item.question}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-sky-400 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400">
            Nenhuma resposta encontrada para sua busca. Tente outras palavras ou fale com nosso suporte.
          </div>
        )}
      </div>
    </section>
  );
};
