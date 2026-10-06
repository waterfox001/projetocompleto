import React, { useState, useEffect } from 'react';
import {
  Target,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  ShieldCheck,
  Building,
  Plus,
  Check,
  Filter,
  X,
  Zap,
  Calendar,
  Layers
} from 'lucide-react';

interface OkrsGoalsViewProps {
  subTab?: string;
}

interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  priority: 'alta' | 'media' | 'baixa';
  status: 'a_fazer' | 'em_andamento' | 'concluida';
  category: string;
}

export const OkrsGoalsView: React.FC<OkrsGoalsViewProps> = ({ subTab }) => {
  const [activeTab, setActiveTab] = useState<'okrs' | 'tarefas' | 'produtividade'>('okrs');
  const [filterPeriod, setFilterPeriod] = useState<'Q4-2026' | 'Mensal' | 'Anual'>('Q4-2026');
  const [taskFilterStatus, setTaskFilterStatus] = useState<string>('TODAS');

  // Modals
  const [isNewOkrModalOpen, setIsNewOkrModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // New OKR state
  const [newOkrTitle, setNewOkrTitle] = useState('');
  const [newOkrOwner, setNewOkrOwner] = useState('Diretoria Executiva');
  const [newOkrTeam, setNewOkrTeam] = useState('Financeiro & Comercial');
  const [newOkrKr1, setNewOkrKr1] = useState('');

  // New Task state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Roberto Técnico');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-10-07');
  const [newTaskPriority, setNewTaskPriority] = useState<'alta' | 'media' | 'baixa'>('alta');
  const [newTaskCategory, setNewTaskCategory] = useState('Higienização');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'tasks_management') setActiveTab('tarefas');
    else if (subTab === 'productivity') setActiveTab('produtividade');
    else setActiveTab('okrs');
  }, [subTab]);

  const healthScores = [
    { area: 'Financeiro', score: 92, status: 'Excelente', color: 'bg-emerald-500' },
    { area: 'Comercial', score: 86, status: 'Em Meta', color: 'bg-blue-600' },
    { area: 'Operação', score: 89, status: 'Muito Bom', color: 'bg-emerald-500' },
    { area: 'Estoque', score: 78, status: 'Atenção (Ocupação)', color: 'bg-amber-500' },
    { area: 'Clientes & NPS', score: 94, status: 'Excelente (NPS 88)', color: 'bg-emerald-500' },
    { area: 'Equipe', score: 90, status: 'Alinhado', color: 'bg-blue-600' }
  ];

  const [okrs, setOkrs] = useState([
    {
      id: 'okr-1',
      objective: 'Atingir R$ 120.000 de Faturamento no Q4 2026 com 80% de Margem',
      owner: 'Diretoria Executiva',
      team: 'Financeiro & Comercial',
      progress: 74,
      status: 'Em andamento',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      keyResults: [
        { title: 'Fechar outubro com faturamento superior a R$ 40.000', current: 'R$ 38.940', target: 'R$ 40.000', progress: 97 },
        { title: 'Manter taxa de inadimplência abaixo de 1.5%', current: '0.8%', target: '< 1.5%', progress: 100 },
        { title: 'Expandir o ticket médio para R$ 350', current: 'R$ 342', target: 'R$ 350', progress: 97 }
      ]
    },
    {
      id: 'okr-2',
      objective: 'Reduzir o Tempo de Giro da Higienização e Disponibilidade para < 3h',
      owner: 'Roberto Técnico',
      team: 'Operação & Galpão',
      progress: 82,
      status: 'Em andamento',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      keyResults: [
        { title: 'Digitalizar o checklist de devolução no momento da coleta', current: '98%', target: '100%', progress: 98 },
        { title: 'Instalar segunda câmara de vapor pressurizado', current: 'Concluído', target: '100%', progress: 100 },
        { title: 'Reduzir produtos em manutenção por falta de peças para zero', current: '1 pendente', target: '0 pendente', progress: 70 }
      ]
    },
    {
      id: 'okr-3',
      objective: 'Fidelização de Clientes e Aumento da Recorrência para 50%',
      owner: 'Aline Souza',
      team: 'Atendimento & CRM',
      progress: 68,
      status: 'Em risco',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      keyResults: [
        { title: 'Alcançar 45% das locações provenientes de clientes recorrentes', current: '41%', target: '45%', progress: 85 },
        { title: 'Implementar programa de pontos para locações acima de 7 dias', current: 'Em piloto', target: 'Ativo', progress: 60 },
        { title: 'Manter NPS acima de 85 pontos nas pesquisas pós-devolução', current: 'NPS 88', target: 'NPS 85', progress: 100 }
      ]
    }
  ]);

  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 'tsk-1', title: 'Higienização a vapor profunda do Carrinho Cybex Priam #CB-004', assignee: 'Roberto Técnico', dueDate: 'Hoje 14h', priority: 'alta', status: 'em_andamento', category: 'Higienização' },
    { id: 'tsk-2', title: 'Substituição da fivela de cinto da Cadeira Matrix #CC-025', assignee: 'Roberto Técnico', dueDate: 'Hoje 16h', priority: 'alta', status: 'a_fazer', category: 'Manutenção' },
    { id: 'tsk-3', title: 'Follow-up de orçamento da família Albuquerque para Paris', assignee: 'Ana Paula', dueDate: 'Hoje 11h', priority: 'media', status: 'concluida', category: 'Comercial' },
    { id: 'tsk-4', title: 'Conferência física de lote de 20 capas térmicas lavadas', assignee: 'Gabriel Siqueira', dueDate: 'Amanhã', priority: 'baixa', status: 'a_fazer', category: 'Estoque' },
    { id: 'tsk-5', title: 'Estorno de caução PIX do pedido concluído #LOC-1018', assignee: 'Juliana Torres', dueDate: 'Hoje 17h', priority: 'alta', status: 'concluida', category: 'Financeiro' }
  ]);

  const handleToggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        const nextStatus: TaskItem['status'] =
          t.status === 'concluida' ? 'a_fazer' : t.status === 'a_fazer' ? 'em_andamento' : 'concluida';
        return { ...t, status: nextStatus };
      })
    );
  };

  const handleCreateOkr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOkrTitle.trim()) return;

    const newOkr = {
      id: `okr-${Date.now()}`,
      objective: newOkrTitle,
      owner: newOkrOwner,
      team: newOkrTeam,
      progress: 0,
      status: 'Iniciando',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      keyResults: [
        {
          title: newOkrKr1 || 'Atingir meta inicial estabelecida',
          current: '0%',
          target: '100%',
          progress: 0
        }
      ]
    };

    setOkrs(prev => [newOkr, ...prev]);
    setIsNewOkrModalOpen(false);
    setNewOkrTitle('');
    setNewOkrKr1('');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newT: TaskItem = {
      id: `tsk-${Date.now()}`,
      title: newTaskTitle,
      assignee: newTaskAssignee,
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
      status: 'a_fazer',
      category: newTaskCategory
    };

    setTasks(prev => [newT, ...prev]);
    setIsNewTaskModalOpen(false);
    setNewTaskTitle('');
  };

  const filteredTasks = tasks.filter(t => {
    if (taskFilterStatus === 'TODAS') return true;
    return t.status === taskFilterStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Metas, OKRs & Produtividade</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Acompanhamento de objetivos estratégicos, tarefas operacionais e produtividade da equipe
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'okrs', label: 'Metas & OKRs' },
            { id: 'tarefas', label: `Tarefas Operacionais (${tasks.filter(t => t.status !== 'concluida').length})` },
            { id: 'produtividade', label: 'Produtividade da Equipe' }
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
      </div>

      {/* ======================================================== */}
      {/* TAB 1: METAS & OKRS                                      */}
      {/* ======================================================== */}
      {activeTab === 'okrs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
              {(['Q4-2026', 'Mensal', 'Anual'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setFilterPeriod(p)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    filterPeriod === p ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsNewOkrModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Novo OKR</span>
            </button>
          </div>

          {/* Health Scores */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Índice de Saúde Global da Operação (Score: 88.2 / 100)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Alta Performance
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
              {healthScores.map(h => (
                <div key={h.area} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{h.area}</span>
                    <span className="font-bold text-slate-900 font-mono">{h.score}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${h.color} rounded-full`} style={{ width: `${h.score}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate">{h.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* OKRs List */}
          <div className="space-y-4">
            {okrs.map(okr => (
              <div key={okr.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">
                        {okr.team}
                      </span>
                      <span className="text-xs text-slate-400">Responsável: <strong>{okr.owner}</strong></span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">{okr.objective}</h3>
                  </div>

                  <div className="flex items-center space-x-3 self-start sm:self-auto">
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 font-mono">{okr.progress}%</span>
                      <span className="text-[10px] text-slate-400 block">Progresso</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${okr.statusColor}`}>
                      {okr.status}
                    </span>
                  </div>
                </div>

                {/* Key Results */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Resultados-Chave (Key Results)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {okr.keyResults.map((kr, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                        <p className="text-slate-800 font-medium leading-snug">{kr.title}</p>
                        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                          <span>Atual: <strong>{kr.current}</strong></span>
                          <span>Meta: <strong>{kr.target}</strong></span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(kr.progress, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: TAREFAS OPERACIONAIS                             */}
      {/* ======================================================== */}
      {activeTab === 'tarefas' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              {[
                { id: 'TODAS', label: 'Todas' },
                { id: 'a_fazer', label: 'A Fazer' },
                { id: 'em_andamento', label: 'Em Andamento' },
                { id: 'concluida', label: 'Concluídas' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTaskFilterStatus(f.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    taskFilterStatus === f.id
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Nova Tarefa</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`bg-white p-4 rounded-xl border transition-all text-xs flex items-center justify-between gap-3 ${
                  task.status === 'concluida' ? 'border-slate-200 bg-slate-50/60 opacity-70' : 'border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <button
                    onClick={() => handleToggleTaskStatus(task.id)}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      task.status === 'concluida'
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-blue-500 bg-white'
                    }`}
                  >
                    {task.status === 'concluida' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900 truncate">{task.title}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                        {task.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Responsável: <strong className="text-slate-700">{task.assignee}</strong> • Prazo: {task.dueDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    task.priority === 'alta' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    task.priority === 'media' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    task.status === 'concluida' ? 'bg-emerald-50 text-emerald-700' :
                    task.status === 'em_andamento' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: PRODUTIVIDADE OPERACIONAL                         */}
      {/* ======================================================== */}
      {activeTab === 'produtividade' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Tarefas Concluídas (Mês)</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">184</div>
              <span className="text-[11px] text-emerald-600">+12% vs mês anterior</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Tempo Médio de Resolução</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">2.4 h</div>
              <span className="text-[11px] text-slate-500">Dentro do SLA padrão</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Taxa de Conclusão no Prazo</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">94.8%</div>
              <span className="text-[11px] text-emerald-600">Alta pontualidade</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Tarefas em Aberto</span>
              <div className="text-2xl font-bold text-blue-600 mt-1 font-mono tabular-nums">{tasks.filter(t => t.status !== 'concluida').length}</div>
              <span className="text-[11px] text-slate-500">Distribuição equilibrada</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Produtividade por Colaborador (Outubro 2026)
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Roberto Técnico (Galpão)', cargo: 'Técnico de Higienização & Manutenção', tarefas: 52, sla: '98%', score: '100% Eficiência' },
                { name: 'Ana Paula (Comercial)', cargo: 'Atendimento & Follow-ups CRM', tarefas: 48, sla: '96%', score: 'Excelente' },
                { name: 'Gabriel Siqueira (Estoque)', cargo: 'Conferência & Despacho', tarefas: 44, sla: '95%', score: 'Muito Bom' },
                { name: 'Juliana Torres (Financeiro)', cargo: 'Cauções & Pagamentos', tarefas: 40, sla: '92%', score: 'Em Meta' }
              ].map((c, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="text-slate-900">{c.name}</strong>
                      <div className="text-[10px] text-slate-500">{c.cargo}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 font-mono">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Concluídas</span>
                      <strong className="text-slate-900">{c.tarefas} tarefas</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">SLA</span>
                      <strong className="text-emerald-700">{c.sla}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Novo OKR */}
      {isNewOkrModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Cadastrar Novo Objetivo Estratégico (OKR)</h3>
              <button onClick={() => setIsNewOkrModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOkr} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Objetivo Geral (O que queremos alcançar?)</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Expandir a frota de berços portáteis para atender a alta temporada"
                  value={newOkrTitle}
                  onChange={e => setNewOkrTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Responsável</label>
                  <input
                    type="text"
                    value={newOkrOwner}
                    onChange={e => setNewOkrOwner(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Departamento</label>
                  <input
                    type="text"
                    value={newOkrTeam}
                    onChange={e => setNewOkrTeam(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primeiro Key Result (Métrica Mensurável)</label>
                <input
                  type="text"
                  placeholder="Ex: Aquisição de 10 berços com ROI previsto em 45 dias"
                  value={newOkrKr1}
                  onChange={e => setNewOkrKr1(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewOkrModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Criar OKR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Nova Tarefa */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Cadastrar Tarefa Operacional</h3>
              <button onClick={() => setIsNewTaskModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título da Tarefa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Revisar cinto de segurança da cadeirinha CC-028"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Responsável</label>
                  <select
                    value={newTaskAssignee}
                    onChange={e => setNewTaskAssignee(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="Roberto Técnico">Roberto Técnico</option>
                    <option value="Ana Paula">Ana Paula</option>
                    <option value="Gabriel Siqueira">Gabriel Siqueira</option>
                    <option value="Juliana Torres">Juliana Torres</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Categoria</label>
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="Higienização">Higienização</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Estoque">Estoque</option>
                    <option value="Financeiro">Financeiro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Prioridade</label>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Prazo de Conclusão</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={e => setNewTaskDueDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Criar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
