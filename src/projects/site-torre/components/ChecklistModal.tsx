import React, { useState } from 'react';
import { X, CheckSquare, Square, MessageSquare, Sparkles, Check } from 'lucide-react';
import { UnitId } from '../types';
import { UNITS } from '../data/mockData';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: UnitId;
}

interface ChecklistSection {
  title: string;
  items: { id: string; label: string; checked: boolean; isRentalItem?: boolean }[];
}

export const ChecklistModal: React.FC<ChecklistModalProps> = ({ isOpen, onClose, unitId }) => {
  const [sections, setSections] = useState<ChecklistSection[]>([
    {
      title: 'Antes de Sair de Casa',
      items: [
        { id: 'doc', label: 'Documentos do bebê (Certidão ou RG com foto)', checked: true },
        { id: 'fraldas', label: 'Fraldas para o trajeto (média 1 por hora de deslocamento)', checked: true },
        { id: 'roupas', label: '2 trocas de roupa na bolsa de mão (inclusive para os pais!)', checked: true },
        { id: 'remedios', label: 'Remédios básicos prescritos pelo pediatra', checked: false },
        { id: 'mamadeira', label: 'Mamadeiras, copinho e lanchinhos fáceis', checked: false },
      ],
    },
    {
      title: 'Transporte & Deslocamento',
      items: [
        { id: 'conforto', label: 'Bebê conforto (Alugado com a Torre de Bebel no desembarque)', checked: true, isRentalItem: true },
        { id: 'carrinho', label: 'Carrinho ultracompacto (Alugado com a Torre de Bebel)', checked: true, isRentalItem: true },
        { id: 'bolsa', label: 'Bolsa térmica para conservação de frutas ou leite', checked: false },
      ],
    },
    {
      title: 'Hospedagem & Hotel',
      items: [
        { id: 'berco', label: 'Berço portátil com lençol higienizado (Alugado na Torre de Bebel)', checked: true, isRentalItem: true },
        { id: 'banheira', label: 'Banheira dobrável com suporte neonatal (Alugada na Torre de Bebel)', checked: false, isRentalItem: true },
        { id: 'cadeira_alim', label: 'Cadeirinha de alimentação portátil (Alugada na Torre de Bebel)', checked: false, isRentalItem: true },
      ],
    },
  ]);

  if (!isOpen) return null;

  const toggleItem = (secIdx: number, itemIdx: number) => {
    const newSections = [...sections];
    newSections[secIdx].items[itemIdx].checked = !newSections[secIdx].items[itemIdx].checked;
    setSections(newSections);
  };

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const checkedItems = sections.reduce(
    (acc, s) => acc + s.items.filter((i) => i.checked).length,
    0
  );
  const progressPct = Math.round((checkedItems / totalItems) * 100);

  const handleSendToWhatsApp = () => {
    let message = `*Checklist do Pequeno Viajante - Torre de Bebel (${UNITS[unitId].name})*\n\n`;
    sections.forEach((sec) => {
      message += `*${sec.title}*\n`;
      sec.items.forEach((item) => {
        message += `${item.checked ? '✅' : '⬜'} ${item.label}\n`;
      });
      message += '\n';
    });
    message += `Progresso: ${checkedItems}/${totalItems} itens prontos!\nhttps://torredebebel.com.br`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Header */}
        <div className="px-6 py-5 bg-orange-50/70 border-b border-orange-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">
                Ferramenta Prática para Pais
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
              Checklist do Pequeno Viajante
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between gap-4">
          <div className="text-xs font-semibold text-stone-600">
            {checkedItems} de {totalItems} itens conferidos ({progressPct}%)
          </div>
          <div className="flex-1 max-w-xs h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Checklist Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {sections.map((sec, secIdx) => (
            <div key={sec.title} className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-stone-100 pb-1">
                {sec.title}
              </h4>

              <div className="space-y-2">
                {sec.items.map((item, itemIdx) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(secIdx, itemIdx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      item.checked
                        ? 'bg-emerald-50/40 border-emerald-200 text-stone-800'
                        : 'bg-stone-50/50 border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                      <span className={`text-xs font-medium ${item.checked ? 'line-through text-stone-500' : ''}`}>
                        {item.label}
                      </span>
                    </div>

                    {item.isRentalItem && (
                      <span className="text-[10px] font-bold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-full shrink-0">
                        Aluguel Torre
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-500 text-center sm:text-left">
            Itens marcados ficam salvos durante sua navegação.
          </span>
          <button
            onClick={handleSendToWhatsApp}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enviar Checklist para meu WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
