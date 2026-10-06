import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2, Lightbulb } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { askOperationalAI, AIChatMessage } from '../../services/geminiService';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const { products, rentals, reservations, financialTransactions } = useApp();

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Olá! Sou seu copiloto de inteligência operacional. Analiso faturamento, ociosidade de estoque, prazos de devolução e cruzamento de demanda em tempo real.',
      timestamp: 'Hoje'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const totalProducts = products.length;
  const occupiedProducts = products.filter(p => p.status === 'ALUGADO' || p.status === 'RESERVADO').length;
  const occupancyRate = totalProducts > 0 ? Math.round((occupiedProducts / totalProducts) * 100) : 0;
  const delayedCount = rentals.filter(r => r.status === 'atrasada').length;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askOperationalAI(textToSend, {
        products,
        rentals,
        reservations,
        financial: financialTransactions,
        delayedCount,
        occupancyRate
      });

      const assistantMsg: AIChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errorMsg: AIChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Desculpe, ocorreu uma instabilidade momentânea na análise de dados. Por favor tente novamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'Quais itens mais faturaram este mês?',
    'Itens parados há mais de 30 dias',
    'Previsão de recebíveis pendentes',
    'Locações em atraso de devolução',
    'Cadeirinhas disponíveis hoje'
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl border-l border-slate-200/90 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
              <span>Copiloto de Inteligência Operacional</span>
            </div>
            <div className="text-[11px] text-slate-500">Análise de Dados em Tempo Real</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-3 bg-slate-50/80 border-b border-slate-200/80 overflow-x-auto">
        <div className="flex items-center space-x-1 text-[11px] text-slate-500 font-medium mb-1.5">
          <Lightbulb className="w-3 h-3 text-amber-500" />
          <span>Consultas sugeridas:</span>
        </div>
        <div className="flex gap-1.5 whitespace-nowrap overflow-x-auto pb-0.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-600 border border-slate-200 rounded-md transition-colors shrink-0 shadow-2xs font-medium"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold ${
                msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed border ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-800 border-slate-200/80 shadow-2xs whitespace-pre-wrap'
              }`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1 font-mono ${
                  msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-indigo-600 font-medium p-2 bg-indigo-50/50 rounded-lg border border-indigo-100">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Consultando dados de estoque e locações...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-200/80 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Pergunte sobre giro, faturamento, atrasos..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg shadow-xs transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
