import React, { useState, useEffect } from 'react';
import {
  Zap,
  Clock,
  MessageCircle,
  Bell,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Plus,
  Play,
  Sliders,
  X,
  AlertTriangle
} from 'lucide-react';

interface AutomationsViewProps {
  subTab?: string;
}

interface RuleItem {
  id: string;
  title: string;
  trigger: string;
  action: string;
  channel: string;
  category: 'lembrete' | 'bloqueio' | 'notificacao' | 'operacao';
  active: boolean;
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({ subTab }) => {
  const [activeTab, setActiveTab] = useState<'automacoes' | 'regras_bloqueio' | 'notificacoes' | 'lembretes'>('automacoes');
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  // Modal
  const [isNewRuleModalOpen, setIsNewRuleModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTrigger, setNewTrigger] = useState('Quando locação estiver a 24h do vencimento');
  const [newAction, setNewAction] = useState('Disparar mensagem WhatsApp com link de renovação');
  const [newChannel, setNewChannel] = useState('WhatsApp Cloud API');
  const [newCategory, setNewCategory] = useState<'lembrete' | 'bloqueio' | 'notificacao' | 'operacao'>('lembrete');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'business_rules') setActiveTab('regras_bloqueio');
    else if (subTab === 'system_notifications') setActiveTab('notificacoes');
    else if (subTab === 'automated_reminders') setActiveTab('lembretes');
    else setActiveTab('automacoes');
  }, [subTab]);

  const [rules, setRules] = useState<RuleItem[]>([
    {
      id: 'aut-1',
      title: 'Disparo de Confirmação de Reserva via WhatsApp',
      trigger: 'Quando reserva mudar para "PAGO / CONFIRMADA"',
      action: 'Enviar WhatsApp com checklist de viagem e comprovante eletrônico',
      channel: 'WhatsApp API',
      category: 'notificacao',
      active: true
    },
    {
      id: 'aut-2',
      title: 'Lembrete Preventivo de Devolução (24h Antes)',
      trigger: '24 horas antes do término da locação ativa',
      action: 'Notificar cliente sobre a janela de coleta e opção de renovação de diária',
      channel: 'WhatsApp & SMS',
      category: 'lembrete',
      active: true
    },
    {
      id: 'aut-3',
      title: 'Bloqueio de Locação para Clientes com Pendência Financeira',
      trigger: 'Tentativa de reserva por CPF com caução não quitada anterior',
      action: 'Bloquear emissão automática e encaminhar para aprovação do Gerente',
      channel: 'ERP Interno',
      category: 'bloqueio',
      active: true
    },
    {
      id: 'aut-4',
      title: 'Alerta Automático de Devolução Atrasada',
      trigger: 'Prazo de retorno vencido em 60 minutos sem prorrogação',
      action: 'Mudar status do produto para ATRASADO e emitir alerta sonoro/visual no painel',
      channel: 'Painel & WhatsApp',
      category: 'lembrete',
      active: true
    },
    {
      id: 'aut-5',
      title: 'Roteamento Imediato de Produto Devolvido para Higienização',
      trigger: 'Quando motorista registrar devolução no app mobile',
      action: 'Mudar status para "EM HIGIENIZAÇÃO" e criar OS automática na bancada de vapor',
      channel: 'Estoque / ERP',
      category: 'operacao',
      active: true
    },
    {
      id: 'aut-6',
      title: 'Pesquisa de Satisfação & NPS Pós-Devolução',
      trigger: '4 horas após a conferência sem avarias e liberação de caução',
      action: 'Enviar link de avaliação com 1 clique (NPS 0 a 10)',
      channel: 'WhatsApp',
      category: 'notificacao',
      active: true
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const handleTestTrigger = (rule: RuleItem) => {
    setTestFeedback(`Disparo de teste executado com sucesso para "${rule.title}" via ${rule.channel}!`);
    setTimeout(() => setTestFeedback(null), 4000);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newR: RuleItem = {
      id: `aut-${Date.now()}`,
      title: newTitle,
      trigger: newTrigger,
      action: newAction,
      channel: newChannel,
      category: newCategory,
      active: true
    };

    setRules(prev => [...prev, newR]);
    setIsNewRuleModalOpen(false);
    setNewTitle('');
  };

  const filteredRules = rules.filter(r => {
    if (activeTab === 'regras_bloqueio') return r.category === 'bloqueio';
    if (activeTab === 'notificacoes') return r.category === 'notificacao';
    if (activeTab === 'lembretes') return r.category === 'lembrete';
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Automações, Triggers & Regras de Negócio</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gatilhos automáticos para cobranças, lembretes de devolução, alertas de atraso e pesquisa de satisfação
          </p>
        </div>

        <button
          onClick={() => setIsNewRuleModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Regra de Automação</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'automacoes', label: `Todas as Automações (${rules.length})` },
          { id: 'lembretes', label: 'Lembretes de Devolução' },
          { id: 'regras_bloqueio', label: 'Regras de Bloqueio & Risco' },
          { id: 'notificacoes', label: 'Disparos de Mensagens & Webhooks' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white shadow-xs text-blue-700 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Test feedback toast */}
      {testFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{testFeedback}</span>
          </div>
          <button onClick={() => setTestFeedback(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Rules List */}
      <div className="space-y-3">
        {filteredRules.map(rule => (
          <div
            key={rule.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs text-slate-900">{rule.title}</h3>
                <span className="text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {rule.channel}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-0.5 pl-8">
                <div>Gatilho: <strong className="text-slate-800">{rule.trigger}</strong></div>
                <div>Ação executada: <span className="text-slate-700">{rule.action}</span></div>
              </div>
            </div>

            <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
              <button
                onClick={() => handleTestTrigger(rule)}
                className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                title="Executar disparo de teste imediato"
              >
                <Play className="w-3 h-3 text-blue-600" />
                <span>Testar Agora</span>
              </button>

              <span className={`text-xs font-semibold ${rule.active ? 'text-emerald-700' : 'text-slate-400'}`}>
                {rule.active ? 'Ativa' : 'Pausada'}
              </span>

              <button onClick={() => toggleRule(rule.id)} className="text-slate-700">
                {rule.active ? (
                  <ToggleRight className="w-8 h-8 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Log of Recent Executions */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
            Log de Disparos Recentes (Últimas 24 horas)
          </h3>
          <span className="text-xs text-slate-500 font-mono">18 automações executadas hoje</span>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { time: '10:15 Hoje', rule: 'Disparo de Confirmação de Reserva via WhatsApp', dest: 'Juliana Paes (#LOC-1031)', status: 'Entregue com Sucesso' },
            { time: '09:00 Hoje', rule: 'Lembrete Preventivo de Devolução (24h Antes)', dest: 'Mariana Costa (#LOC-1024)', status: 'Entregue com Sucesso' },
            { time: '08:30 Hoje', rule: 'Roteamento Imediato para Higienização', dest: 'Cadeirinha CC-025 devolvida', status: 'OS Gerada na Bancada' },
            { time: 'Ontem 18:20', rule: 'Pesquisa de Satisfação & NPS Pós-Devolução', dest: 'Carlos Mendes (#LOC-1020)', status: 'Respondido (Nota 10)' }
          ].map((item, i) => (
            <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-slate-700">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <strong>{item.rule}</strong>
                <span className="text-slate-400">→ {item.dest}</span>
              </div>
              <div className="flex items-center space-x-3 font-mono text-[11px]">
                <span className="text-emerald-700 font-semibold">{item.status}</span>
                <span className="text-slate-400">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Nova Regra */}
      {isNewRuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Criar Nova Regra de Automação</h3>
              <button onClick={() => setIsNewRuleModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título da Automação</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Alerta de Devolução no Dia Anterior"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Gatilho (Quando disparar?)</label>
                <input
                  type="text"
                  value={newTrigger}
                  onChange={e => setNewTrigger(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ação Executada</label>
                <input
                  type="text"
                  value={newAction}
                  onChange={e => setNewAction(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Canal de Disparo</label>
                  <select
                    value={newChannel}
                    onChange={e => setNewChannel(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="WhatsApp Cloud API">WhatsApp Cloud API</option>
                    <option value="SMS Gateway">SMS Gateway</option>
                    <option value="E-mail Transacional">E-mail Transacional</option>
                    <option value="ERP / Notificação Push">ERP / Notificação Push</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="lembrete">Lembrete</option>
                    <option value="notificacao">Notificação</option>
                    <option value="bloqueio">Bloqueio / Risco</option>
                    <option value="operacao">Operação</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewRuleModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Criar Automação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
