import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';
import {
 Briefcase,
 Plus,
 Users,
 Clock,
 Phone,
 Calendar,
 FileText,
 Building2,
 CheckCircle2,
 AlertTriangle,
 ArrowRight,
 TrendingUp,
 MessageSquare
} from 'lucide-react';

export const CommercialModule: React.FC = () => {
 const {
 leads,
 followUps,
 proposals,
 partners,
 updateLeadStage,
 addLead,
 completeFollowUp,
 showToast
 } = useApp();

 const [activeTab, setActiveTab] = useState<'pipeline' | 'leads' | 'followups' | 'propostas' | 'parceiros'>('pipeline');
 const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);

 // Quick New Lead Form Modal State
 const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
 const [newCompany, setNewCompany] = useState('');
 const [newContact, setNewContact] = useState('');
 const [newPhone, setNewPhone] = useState('');
 const [newEmail, setNewEmail] = useState('');
 const [newVal, setNewVal] = useState(50000);
 const [newUnit, setNewUnit] = useState('CGH');
 const [newSegment, setNewSegment] = useState<Lead['segment']>('Hotel de Trânsito');

 const pipelineStages: { stage: Lead['stage']; label: string; color: string }[] = [
 { stage: 'lead', label: 'Lead Inbound', color: 'border-slate-200' },
 { stage: 'contacted', label: 'Contato Feito', color: 'border-blue-600/60' },
 { stage: 'qualified', label: 'Qualificado', color: 'border-indigo-600/60' },
 { stage: 'meeting', label: 'Reunião Agendada', color: 'border-purple-600/60' },
 { stage: 'proposal', label: 'Proposta Enviada', color: 'border-amber-600/60' },
 { stage: 'negotiation', label: 'Em Negociação', color: 'border-orange-600/60' },
 { stage: 'won', label: 'Ganho / Fechado', color: 'border-emerald-600/60' },
 { stage: 'lost', label: 'Perdido', color: 'border-rose-900/60' }
 ];

 const handleCreateLead = (e: React.FormEvent) => {
 e.preventDefault();
 if (!newCompany.trim()) return;
 addLead({
 companyName: newCompany,
 contactName: newContact,
 email: newEmail,
 phone: newPhone,
 stage: 'lead',
 potentialValue: newVal,
 airportUnit: newUnit,
 segment: newSegment,
 owner: 'Renata Figueiredo',
 nextFollowUp: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
 notes: 'Cadastrado via CRM Balcão/Web'
 });
 setIsNewLeadModalOpen(false);
 setNewCompany('');
 setNewContact('');
 setNewPhone('');
 setNewEmail('');
 };

 return (
 <div className="space-y-4 pb-10">
 {/* Top Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded p-3.5">
 <div>
 <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
 CRM Corporativo & Parcerias
 </div>
 <h2 className="text-sm font-bold text-slate-900 tracking-tight">
 Pipeline Comercial, Convênios & Follow-ups
 </h2>
 <p className="text-xs text-slate-500 mt-1">
 Gestão de acordos corporativos com companhias aéreas, hotéis de trânsito e agências de turismo.
 </p>
 </div>

 <div className="flex items-center gap-2">
 {/* Submenu Tabs */}
 <div className="flex items-center gap-1 p-1 bg-slate-100 p-0.5 rounded text-xs">
 <button
 onClick={() => setActiveTab('pipeline')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
 activeTab === 'pipeline' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Pipeline Kanban
 </button>
 <button
 onClick={() => setActiveTab('followups')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
 activeTab === 'followups' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Central de Follow-up
 </button>
 <button
 onClick={() => setActiveTab('propostas')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
 activeTab === 'propostas' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Propostas
 </button>
 <button
 onClick={() => setActiveTab('parceiros')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
 activeTab === 'parceiros' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Parceiros Ativos
 </button>
 </div>

 <button
 onClick={() => setIsNewLeadModalOpen(true)}
 className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1.5 shrink-0"
 >
 <Plus className="w-3.5 h-3.5 stroke-[3]" />
 <span>+ Novo Lead</span>
 </button>
 </div>
 </div>

 {/* TAB 1: PIPELINE KANBAN */}
 {activeTab === 'pipeline' && (
 <div className="overflow-x-auto pb-4">
 <div className="flex gap-4 min-w-[1250px]">
 {pipelineStages.map((col) => {
 const stageLeads = leads.filter((l) => l.stage === col.stage);
 const stageVal = stageLeads.reduce((acc, l) => acc + l.potentialValue, 0);

 return (
 <div
 key={col.stage}
 className="flex-1 min-w-[240px] bg-white/95 rounded border border-slate-200 flex flex-col max-h-[75vh]"
 >
 {/* Column Header */}
 <div className={`p-3 border-b-2 ${col.color} bg-slate-50/80 rounded-t-xl flex items-center justify-between`}>
 <div>
 <div className="text-xs font-bold text-slate-800">{col.label}</div>
 <div className="text-[10px] font-mono text-slate-500">
 {stageLeads.length} itens · R$ {(stageVal / 1000).toFixed(0)}k
 </div>
 </div>
 </div>

 {/* Cards List */}
 <div className="flex-1 p-2 space-y-2.5 overflow-y-auto">
 {stageLeads.length === 0 ? (
 <div className="text-[11px] text-slate-600 text-center py-6 italic">
 Sem oportunidades
 </div>
 ) : (
 stageLeads.map((lead) => (
 <div
 key={lead.id}
 className="p-3 bg-white/95 hover:bg-slate-50 rounded border border-slate-200/80 hover:border-amber-500/50 transition-all text-xs space-y-2 shadow-sm"
 >
 <div className="flex items-start justify-between">
 <span className="font-bold text-slate-900 line-clamp-1">{lead.companyName}</span>
 <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-amber-700">
 {lead.airportUnit}
 </span>
 </div>

 <div className="text-[11px] text-slate-500">{lead.contactName}</div>

 <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
 <span className="font-mono font-bold text-emerald-700">
 R$ {lead.potentialValue.toLocaleString('pt-BR')}
 </span>
 <span className="text-[10px] font-mono text-slate-500">
 {lead.daysInStage}d no estágio
 </span>
 </div>

 {/* Stage Transition Control */}
 <div className="pt-2 flex items-center justify-between gap-1">
 <select
 value={lead.stage}
 onChange={(e) => updateLeadStage(lead.id, e.target.value as Lead['stage'])}
 className="text-[10px] bg-white border border-slate-200 text-slate-700 rounded px-1.5 py-1 w-full"
 >
 {pipelineStages.map((s) => (
 <option key={s.stage} value={s.stage}>
 Mover para: {s.label}
 </option>
 ))}
 </select>
 </div>
 </div>
 ))
 )}
 </div>
 </div>
 );
 })}
 </div>
 </div>
 )}

 {/* TAB 2: CENTRAL DE FOLLOW-UP */}
 {activeTab === 'followups' && (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <div>
 <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Central de Relacionamento</div>
 <h3 className="text-sm font-bold text-slate-900">Fila de Follow-ups e Próximos Passos</h3>
 </div>
 <span className="text-xs text-slate-500">{followUps.length} ações mapeadas</span>
 </div>

 <div className="space-y-3">
 {followUps.map((flw) => (
 <div
 key={flw.id}
 className={`p-4 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
 flw.status === 'overdue'
 ? 'bg-rose-950/20 border-rose-800/40'
 : flw.status === 'completed'
 ? 'bg-slate-50/50 border-slate-200 opacity-60'
 : 'bg-slate-50/80 border-slate-200'
 }`}
 >
 <div className="space-y-1">
 <div className="flex items-center gap-2">
 <span className="font-bold text-slate-900">{flw.companyName}</span>
 <span className="text-slate-500">· {flw.contactName}</span>
 <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
 Canal: {flw.channel}
 </span>
 {flw.status === 'overdue' && (
 <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
 ATRASADO
 </span>
 )}
 </div>
 <div className="text-slate-700">
 <strong className="text-amber-700">Próxima ação: </strong>
 <span>{flw.nextAction}</span>
 </div>
 <div className="text-slate-500 text-[11px]">
 Prazo: {flw.dueDate} · Responsável: {flw.responsible} · Notas: {flw.notes}
 </div>
 </div>

 <div className="flex items-center gap-2 shrink-0">
 {flw.status !== 'completed' && (
 <button
 onClick={() => completeFollowUp(flw.id)}
 className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium font-bold text-xs rounded cursor-pointer flex items-center gap-1"
 >
 <CheckCircle2 className="w-3.5 h-3.5" />
 <span>Concluir</span>
 </button>
 )}
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* TAB 3: PROPOSTAS */}
 {activeTab === 'propostas' && (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <div>
 <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Propostas Comerciais</div>
 <h3 className="text-sm font-bold text-slate-900">Gerenciador de Propostas e Contratos</h3>
 </div>
 <button
 onClick={() => showToast('Proposta', 'Emissor de proposta comercial aberto.', 'info')}
 className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium font-bold text-xs rounded cursor-pointer"
 >
 + Nova Proposta
 </button>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
 <th className="pb-3">Número / Cliente</th>
 <th className="pb-3">Valor Estimado</th>
 <th className="pb-3">Emissão</th>
 <th className="pb-3">Validade</th>
 <th className="pb-3">Responsável</th>
 <th className="pb-3">Status</th>
 <th className="pb-3 text-right">Ações</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {proposals.map((prop) => (
 <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
 <td className="py-3">
 <div className="font-mono font-bold text-amber-700">{prop.proposalNumber}</div>
 <div className="font-semibold text-slate-800">{prop.companyName}</div>
 <div className="text-[11px] text-slate-500">{prop.clientName}</div>
 </td>
 <td className="py-3 font-mono font-bold text-slate-900">
 R$ {prop.value.toLocaleString('pt-BR')}
 </td>
 <td className="py-3 font-mono text-slate-500">{prop.createdAt}</td>
 <td className="py-3 font-mono text-slate-500">{prop.expiresAt}</td>
 <td className="py-3 text-slate-700">{prop.responsible}</td>
 <td className="py-3">
 <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-amber-700 font-bold">
 {prop.status.toUpperCase()}
 </span>
 </td>
 <td className="py-3 text-right">
 <button
 onClick={() => showToast('Visualizar Proposta', `PDF da proposta ${prop.proposalNumber} gerado para envio.`, 'info')}
 className="text-xs text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
 >
 Visualizar
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* TAB 4: PARCEIROS ATIVOS */}
 {activeTab === 'parceiros' && (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <div>
 <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Rede de Parceiros</div>
 <h3 className="text-sm font-bold text-slate-900">Concessionárias & Convênios Comerciais</h3>
 </div>
 <span className="text-xs text-slate-500">{partners.length} parceiros credenciados</span>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {partners.map((p) => (
 <div key={p.id} className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-3">
 <div className="flex items-start justify-between">
 <div>
 <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
 {p.type}
 </span>
 <h4 className="text-sm font-bold text-slate-900 mt-1">{p.partnerName}</h4>
 <div className="text-xs text-slate-500 mt-0.5">Contato: {p.contactPerson} · {p.phone}</div>
 </div>
 <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-1 rounded">
 {p.commissionPercentage}% Comissão
 </span>
 </div>

 <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60 font-mono">
 <div>
 <span className="text-slate-500">Receita Gerada: </span>
 <span className="font-bold text-emerald-700">R$ {p.revenueGeneratedTotal.toLocaleString('pt-BR')}</span>
 </div>
 <div>
 <span className="text-slate-500">Passageiros: </span>
 <span className="text-slate-800">{p.clientsReferredTotal.toLocaleString('pt-BR')}</span>
 </div>
 </div>

 <div className="text-[11px] text-slate-500 flex justify-between">
 <span>Vigência do contrato: {p.contractEnd}</span>
 <span className="text-emerald-700 font-bold uppercase">{p.status}</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* New Lead Modal */}
 {isNewLeadModalOpen && (
 <div
 className="fixed inset-0 z-50 bg-white/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
 onClick={() => setIsNewLeadModalOpen(false)}
 >
 <div
 className="w-full max-w-lg bg-white border border-slate-200 rounded p-5 shadow-lg space-y-4"
 onClick={(e) => e.stopPropagation()}
 >
 <h3 className="text-sm font-bold text-slate-900">Cadastrar Nova Oportunidade / Lead</h3>
 <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
 <div>
 <label className="block text-slate-700 font-semibold mb-1">Nome da Empresa / Companhia *</label>
 <input
 type="text"
 required
 value={newCompany}
 onChange={(e) => setNewCompany(e.target.value)}
 placeholder="Ex: Hotel Grand Hyatt / CVC São Paulo"
 className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900"
 />
 </div>

 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-slate-700 font-semibold mb-1">Contato Responsável</label>
 <input
 type="text"
 value={newContact}
 onChange={(e) => setNewContact(e.target.value)}
 placeholder="Nome do gestor"
 className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900"
 />
 </div>
 <div>
 <label className="block text-slate-700 font-semibold mb-1">Segmento</label>
 <select
 value={newSegment}
 onChange={(e) => setNewSegment(e.target.value as any)}
 className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900"
 >
 <option value="Hotel de Trânsito">Hotel de Trânsito</option>
 <option value="Companhia Aérea">Companhia Aérea</option>
 <option value="Agência de Turismo">Agência de Turismo</option>
 <option value="Corporativo">Corporativo</option>
 </select>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-slate-700 font-semibold mb-1">Telefone / WhatsApp</label>
 <input
 type="text"
 value={newPhone}
 onChange={(e) => setNewPhone(e.target.value)}
 placeholder="(11) 98888-0000"
 className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900"
 />
 </div>
 <div>
 <label className="block text-slate-700 font-semibold mb-1">Receita Potencial Estimada (R$)</label>
 <input
 type="number"
 value={newVal}
 onChange={(e) => setNewVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-900 font-mono"
 />
 </div>
 </div>

 <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
 <button
 type="button"
 onClick={() => setIsNewLeadModalOpen(false)}
 className="px-3 py-1.5 text-slate-500 hover:text-slate-800"
 >
 Cancelar
 </button>
 <button
 type="submit"
 className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded cursor-pointer"
 >
 Salvar Oportunidade
 </button>
 </div>
 </form>
 </div>
 </div>
 )}
 </div>
 );
};
