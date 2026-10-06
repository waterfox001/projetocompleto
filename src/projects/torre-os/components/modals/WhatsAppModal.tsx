import React, { useState } from 'react';
import { MessageCircle, X, Send, Copy, Check, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhatsAppModal: React.FC = () => {
  const { whatsAppData, closeWhatsAppModal, addAuditLog } = useApp();
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('confirmacao');
  const [customText, setCustomText] = useState('');

  React.useEffect(() => {
    if (whatsAppData) {
      const type = whatsAppData.type || 'confirmacao';
      setSelectedTemplate(type);
      setCustomText(whatsAppData.defaultText || templates[type]?.text || '');
    }
  }, [whatsAppData]);

  if (!whatsAppData) return null;

  const templates: Record<string, { label: string; text: string }> = {
    confirmacao: {
      label: 'Confirmação de Locação',
      text: `Olá ${whatsAppData.customerName}! 🌟\nSua locação está confirmada! Os equipamentos foram revisados e higienizados clinicamente para seu bebê. Agradecemos a confiança!`
    },
    lembrete: {
      label: 'Lembrete de Devolução',
      text: `Olá ${whatsAppData.customerName}! Tudo bem?\nLembramos que o prazo de devolução dos itens alugados encerra-se em breve. Caso deseje estender o período por mais alguns dias, basta nos avisar por aqui!`
    },
    cobranca: {
      label: 'Regularização de Atraso',
      text: `Olá ${whatsAppData.customerName}, tudo bem?\nConstatamos que o prazo previsto para devolução encerrou. Por favor, entre em contato para regularizarmos a renovação da locação ou agendarmos a coleta. Equipe Torre de Bebel.`
    },
    comprovante: {
      label: 'Comprovante / Recibo',
      text: `Olá ${whatsAppData.customerName}! Segue a confirmação do pagamento e caução da sua locação. O termo de responsabilidade e o laudo de higienização estão vinculados ao seu pedido.`
    },
    endereco: {
      label: 'Janela de Entrega',
      text: `Olá ${whatsAppData.customerName}! Nosso entregador está em rota para realizar a entrega na janela combinada. Por favor, confirme se haverá alguém no local para o recebimento.`
    }
  };

  const handleTemplateChange = (type: string) => {
    setSelectedTemplate(type);
    setCustomText(templates[type].text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanPhone = whatsAppData.phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(customText);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  const handleSendAudit = () => {
    addAuditLog(`Mensagem WhatsApp enviada para ${whatsAppData.customerName}`, 'locacao', `Telefone: ${cleanPhone}`);
    closeWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white text-slate-900 p-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">Comunicação via WhatsApp</div>
              <div className="text-[11px] text-slate-500 font-mono">
                {whatsAppData.customerName} · {whatsAppData.phone}
              </div>
            </div>
          </div>
          <button
            onClick={closeWhatsAppModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Templates selector */}
        <div className="p-3 bg-slate-50/80 border-b border-slate-200/80">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Modelos Rápidos Pré-configurados
          </div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(templates).map(([key, tpl]) => (
              <button
                key={key}
                onClick={() => handleTemplateChange(key)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedTemplate === key
                    ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message preview / edit */}
        <div className="p-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Texto da Mensagem:
          </label>
          <textarea
            rows={5}
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none transition-all leading-relaxed text-slate-800 font-sans"
          />
        </div>

        {/* Action Buttons */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={closeWhatsAppModal}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSendAudit}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs shadow-emerald-600/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Abrir WhatsApp Web</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
