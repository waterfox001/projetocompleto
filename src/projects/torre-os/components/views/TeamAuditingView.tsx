import React, { useState } from 'react';
import { ShieldCheck, Users, Clock, History, Key, Check, Plus, Search, Filter, X, Phone, Mail, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeamAuditingViewProps {
  subTab?: string;
}

export const TeamAuditingView: React.FC<TeamAuditingViewProps> = ({ subTab }) => {
  const { teamMembers, auditLogs, currentUserRole, setCurrentUserRole } = useApp();
  const [activeTab, setActiveTab] = useState<'auditoria' | 'equipe' | 'permissoes'>('equipe');
  const [searchAudit, setSearchAudit] = useState('');
  const [filterType, setFilterType] = useState('TODOS');

  // Modals
  const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('OPERACIONAL');

  // Local state for team members to allow instant additions & status toggles
  const [membersList, setMembersList] = useState(teamMembers);

  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'roles_permissions') setActiveTab('permissoes');
    else if (subTab === 'audit_logs') setActiveTab('auditoria');
    else setActiveTab('equipe');
  }, [subTab]);

  const rolePermissions = [
    {
      role: 'ATENDENTE',
      modules: ['Clientes & CRM', 'Reservas', 'Locações Rápidas', 'WhatsApp'],
      desc: 'Criação de reservas, consulta de disponibilidade e atendimento a famílias.'
    },
    {
      role: 'OPERACIONAL',
      modules: ['Estoque Unitário', 'Entregas & Rotas', 'Devoluções & Check', 'Higienização', 'Manutenção'],
      desc: 'Separação física, lavagem hospitalar, inspeção técnica e conferência de avarias.'
    },
    {
      role: 'FINANCEIRO',
      modules: ['Locações', 'Pagamentos', 'Financeiro Geral', 'Gestão de Cauções', 'Relatórios'],
      desc: 'Conciliação de Pix, estorno de caução de garantia e controle de fluxo de caixa.'
    },
    {
      role: 'GERENTE',
      modules: ['Operação Completa', 'Estoque', 'Equipe', 'Relatórios & Rankings', 'Auditoria'],
      desc: 'Supervisão de rotinas, desbloqueio de produtos e gestão de produtividade.'
    },
    {
      role: 'OWNER',
      modules: ['Acesso Total Irrestrito a todos os módulos do sistema'],
      desc: 'Administração global, parametrização de preços e governança.'
    }
  ];

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newM = {
      id: `usr-${Date.now()}`,
      name: newMemberName,
      email: newMemberEmail || `${newMemberName.toLowerCase().replace(/\s+/g, '.')}@torredebebel.com.br`,
      role: newMemberRole,
      phone: newMemberPhone || '(11) 98888-0000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      active: true
    };

    setMembersList(prev => [...prev, newM as any]);
    setIsNewMemberModalOpen(false);
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberPhone('');
  };

  const handleToggleMemberStatus = (id: string) => {
    setMembersList(prev =>
      prev.map(m => (m.id === id ? { ...m, active: !((m as any).active ?? true) } : m))
    );
  };

  const filteredLogs = auditLogs.filter(log => {
    const q = searchAudit.toLowerCase();
    const matchesSearch =
      log.user.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q);
    const matchesType = filterType === 'TODOS' || log.type.toUpperCase() === filterType.toUpperCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Equipe, Permissões & Trilha de Auditoria</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log imutável de ações operacionais e controle de acesso baseado em papéis (RBAC)
          </p>
        </div>

        {activeTab === 'equipe' && (
          <button
            onClick={() => setIsNewMemberModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Novo Membro</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('equipe')}
          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'equipe' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Membros da Equipe ({membersList.length})
        </button>
        <button
          onClick={() => setActiveTab('permissoes')}
          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'permissoes' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Matriz de Perfis & Permissões
        </button>
        <button
          onClick={() => setActiveTab('auditoria')}
          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'auditoria' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Trilha de Auditoria ({auditLogs.length} eventos)
        </button>
      </div>

      {/* Tab 1: Team Members */}
      {activeTab === 'equipe' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {membersList.map(member => {
            const isActive = (member as any).active ?? true;
            return (
              <div
                key={member.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-11 h-11 rounded-lg object-cover border border-slate-200 bg-slate-100"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-xs text-slate-900">{member.name}</h3>
                    <div className="text-[11px] text-slate-400">{member.email}</div>
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                        {member.role}
                      </span>
                      <span className={`text-[10px] font-semibold ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {isActive ? '● Ativo' : '○ Inativo'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleMemberStatus(member.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border font-medium transition-colors ${
                    isActive
                      ? 'text-slate-600 hover:text-rose-600 hover:bg-rose-50 border-slate-200'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}
                >
                  {isActive ? 'Desativar' : 'Ativar'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Permissions Matrix */}
      {activeTab === 'permissoes' && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Perfil ativo no momento: <strong className="font-mono">{currentUserRole}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 text-[11px]">Simular acesso como:</span>
              <select
                value={currentUserRole}
                onChange={e => setCurrentUserRole(e.target.value)}
                className="bg-white border border-blue-300 rounded px-2 py-0.5 text-xs font-semibold outline-none text-slate-800"
              >
                {rolePermissions.map(rp => (
                  <option key={rp.role} value={rp.role}>{rp.role}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rolePermissions.map(rp => (
              <div
                key={rp.role}
                className={`bg-white p-5 rounded-xl border shadow-xs space-y-3 ${
                  currentUserRole === rp.role ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-blue-700">{rp.role}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
                    Nível RBAC
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rp.desc}</p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Módulos Autorizados:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rp.modules.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 flex items-center space-x-1"
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{m}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Audit Log */}
      {activeTab === 'auditoria' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Histórico de Ações Registradas em Tempo Real
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Buscar usuário, ação ou detalhe..."
                  value={searchAudit}
                  onChange={e => setSearchAudit(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 w-56"
                />
              </div>

              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-700 font-medium"
              >
                <option value="TODOS">Todos os Tipos</option>
                <option value="SISTEMA">Sistema</option>
                <option value="LOCACAO">Locação</option>
                <option value="ESTOQUE">Estoque</option>
                <option value="FINANCEIRO">Financeiro</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {filteredLogs.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                Nenhum registro de auditoria corresponde aos filtros informados.
              </div>
            ) : (
              filteredLogs.map(log => (
                <div key={log.id} className="py-3 hover:bg-slate-50/70 flex items-start justify-between gap-4 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{log.user}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase font-semibold">
                        {log.type}
                      </span>
                    </div>
                    <div className="font-medium text-slate-800">{log.action}</div>
                    <div className="text-[11px] text-slate-500">{log.details}</div>
                  </div>

                  <div className="text-right text-[11px] text-slate-400 shrink-0 font-mono">
                    <div>{log.date}</div>
                    <div>{log.time}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal: Novo Membro */}
      {isNewMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Adicionar Colaborador à Equipe</h3>
              <button onClick={() => setIsNewMemberModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Letícia Albuquerque"
                  value={newMemberName}
                  onChange={e => setNewMemberName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">E-mail Corporativo</label>
                <input
                  type="email"
                  placeholder="isabela@torredebebel.com.br"
                  value={newMemberEmail}
                  onChange={e => setNewMemberEmail(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Telefone Celular</label>
                <input
                  type="text"
                  placeholder="(11) 98888-2233"
                  value={newMemberPhone}
                  onChange={e => setNewMemberPhone(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cargo / Nível de Acesso (RBAC)</label>
                <select
                  value={newMemberRole}
                  onChange={e => setNewMemberRole(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option value="OPERACIONAL">OPERACIONAL (Estoque, Entregas, Higienização)</option>
                  <option value="ATENDENTE">ATENDENTE (Atendimento, Reservas, WhatsApp)</option>
                  <option value="FINANCEIRO">FINANCEIRO (Cobranças, Pagamentos, Cauções)</option>
                  <option value="GERENTE">GERENTE (Supervisão Geral, Auditoria)</option>
                  <option value="OWNER">OWNER (Administrador Geral)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewMemberModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Adicionar Membro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
