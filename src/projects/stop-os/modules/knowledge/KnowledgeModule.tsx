import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SOPDocument } from '../../types';
import { BookOpen, Copy, CheckCircle2, Search, FileText, ChevronRight, Layers } from 'lucide-react';

export const KnowledgeModule: React.FC = () => {
 const { sops, showToast } = useApp();

 const [selectedSop, setSelectedSop] = useState<SOPDocument>(sops[0]);
 const [searchTerm, setSearchTerm] = useState('');

 const filteredSops = sops.filter(
 (s) =>
 s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
 s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
 s.area.toLowerCase().includes(searchTerm.toLowerCase())
 );

 const handleCopyScript = (text: string) => {
 navigator.clipboard.writeText(text);
 showToast('Script Copiado', 'Conteúdo copiado para a área de transferência com sucesso.', 'success');
 };

 return (
 <div className="space-y-4 pb-10">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded p-3.5">
 <div>
 <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
 Intranet & Base Operacional
 </div>
 <h2 className="text-sm font-bold text-slate-900 tracking-tight">
 Central de Conhecimento, SOPs & Scripts de Atendimento
 </h2>
 <p className="text-xs text-slate-500 mt-1">
 Manuais de procedimento operacional padrão (SOP), diretrizes ANAC e roteiros humanizados de balcão.
 </p>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Left: Document List */}
 <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
 <div className="relative">
 <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
 <input
 type="text"
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 placeholder="Buscar manual ou SOP..."
 className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
 />
 </div>

 <div className="space-y-2">
 {filteredSops.map((sop) => {
 const isSelected = selectedSop.id === sop.id;
 return (
 <div
 key={sop.id}
 onClick={() => setSelectedSop(sop)}
 className={`p-3 rounded border text-xs cursor-pointer transition-all ${
 isSelected
 ? 'bg-amber-50 text-amber-800 border border-amber-200 border-amber-500 text-amber-800'
 : 'bg-slate-50/70 border-slate-200 hover:border-slate-200 text-slate-700'
 }`}
 >
 <div className="flex items-center justify-between text-[10px] font-mono mb-1">
 <span className="font-bold text-amber-700">{sop.code}</span>
 <span className="text-slate-500">{sop.version}</span>
 </div>
 <div className="font-bold text-slate-900 line-clamp-2">{sop.title}</div>
 <div className="text-[10px] text-slate-500 mt-1">Área: {sop.area} · {sop.stepsCount} etapas</div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Right: Detailed SOP View (2 cols) */}
 <div className="lg:col-span-2 bg-white rounded border border-slate-200 p-6 space-y-5">
 <div className="flex items-start justify-between border-b border-slate-200 pb-4">
 <div>
 <div className="flex items-center gap-2 text-xs font-mono mb-1">
 <span className="px-2 py-0.5 rounded bg-slate-100 text-amber-700 font-bold">{selectedSop.code}</span>
 <span className="text-slate-500">Versão: {selectedSop.version}</span>
 <span className="text-slate-500">· Resp: {selectedSop.author}</span>
 </div>
 <h3 className="text-base font-bold text-slate-900">{selectedSop.title}</h3>
 <p className="text-xs text-slate-500 mt-1 leading-relaxed">{selectedSop.summary}</p>
 </div>

 <button
 onClick={() => handleCopyScript(selectedSop.steps.map((s) => `${s.stepNumber}. ${s.title}: ${s.instruction}`).join('\n\n'))}
 className="px-3 py-1.5 bg-slate-100 hover:bg-slate-700 text-slate-800 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shrink-0"
 >
 <Copy className="w-3.5 h-3.5" />
 <span>Copiar Conteúdo</span>
 </button>
 </div>

 {/* SOP Steps */}
 <div className="space-y-3">
 <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
 Passos Obrigatórios do Procedimento:
 </div>

 <div className="space-y-3">
 {selectedSop.steps.map((step) => (
 <div key={step.stepNumber} className="p-4 bg-slate-50/70 rounded border border-slate-200 text-xs space-y-1">
 <div className="flex items-center gap-2 font-bold text-slate-800">
 <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-mono flex items-center justify-center text-[10px]">
 {step.stepNumber}
 </span>
 <span>{step.title}</span>
 </div>
 <p className="text-slate-500 pl-7 leading-relaxed">{step.instruction}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};
