import React, { useState, useEffect } from 'react';
import {
  FileText,
  FileCheck,
  Camera,
  Receipt,
  Download,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  Plus,
  X,
  CheckCircle2,
  Calendar,
  Lock
} from 'lucide-react';

interface DocumentsVaultViewProps {
  subTab?: string;
}

interface DocumentItem {
  id: string;
  title: string;
  type: 'Contrato' | 'Comprovante' | 'Fotos' | 'Nota Fiscal' | 'Orçamento';
  client: string;
  date: string;
  size: string;
  status: string;
  previewText?: string;
}

export const DocumentsVaultView: React.FC<DocumentsVaultViewProps> = ({ subTab }) => {
  const [filterType, setFilterType] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<DocumentItem | null>(null);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);

  // New Doc Form
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'Contrato' | 'Comprovante' | 'Fotos' | 'Nota Fiscal' | 'Orçamento'>('Contrato');
  const [newClient, setNewClient] = useState('');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'contracts_docs') setFilterType('Contrato');
    else if (subTab === 'invoices_nf') setFilterType('Nota Fiscal');
    else if (subTab === 'inspection_photos') setFilterType('Fotos');
    else setFilterType('TODOS');
  }, [subTab]);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'doc-1',
      title: 'Contrato de Locação Digital #LOC-1024',
      type: 'Contrato',
      client: 'Mariana Costa Silveira',
      date: '05/10/2026',
      size: '240 KB',
      status: 'Assinado Eletronicamente',
      previewText: 'CONTRATO DE LOCAÇÃO DE BENS MÓVEIS INFANTIS\n\nLocador: Torre de Bebel Ltda (CNPJ 42.891.204/0001-89)\nLocatária: Mariana Costa Silveira (CPF ***.452.918-**)\n\nObjeto: 1x Cadeirinha Burigotto Matrix K (Código: CC-024)\nPeríodo de Locação: 06/10/2026 a 13/10/2026 (7 diárias)\nValor da Locação: R$ 245,00 | Caução em Garantia: R$ 300,00\n\nAssinatura Eletrônica Autenticada via Certificado ICP-Brasil / Hash SHA-256.'
    },
    {
      id: 'doc-2',
      title: 'Termo de Retenção de Caução #LOC-1024',
      type: 'Comprovante',
      client: 'Mariana Costa Silveira',
      date: '05/10/2026',
      size: '110 KB',
      status: 'Autenticado no Gateway',
      previewText: 'TERMO DE PRÉ-AUTORIZAÇÃO E CUSTÓDIA DE CAUÇÃO\n\nValor: R$ 300,00 bloqueado temporariamente no cartão de crédito final 4821.\nStatus: Em custódia segura até a devolução e conferência física sem avarias do ativo.'
    },
    {
      id: 'doc-3',
      title: 'Vistoria Fotográfica Pré-Entrega CC-024',
      type: 'Fotos',
      client: 'Mariana Costa Silveira',
      date: '05/10/2026',
      size: '4.2 MB',
      status: '3 Fotos em Alta Resolução',
      previewText: 'RELATÓRIO TÉCNICO FOTOGRÁFICO DE VISTORIA\n\nItem: Cadeirinha Burigotto Matrix K (CC-024)\n- Foto 1: Tecido higienizado a vapor 140°C sem manchas (OK)\n- Foto 2: Fivela de cinto 5 pontos com clique sonoro e travas intactas (OK)\n- Foto 3: Base Isofix sem folgas ou ranhuras estruturais (OK)\nVistoriador: Roberto Técnico.'
    },
    {
      id: 'doc-4',
      title: 'Nota Fiscal de Serviço Eletrônica NFS-e #892',
      type: 'Nota Fiscal',
      client: 'Carlos Eduardo Mendes',
      date: '30/09/2026',
      size: '185 KB',
      status: 'Emitida / Transmitida',
      previewText: 'PREFEITURA DO MUNICÍPIO DE SÃO PAULO\nNOTA FISCAL DE SERVIÇOS ELETRÔNICA - NFS-e Nº 892\n\nTomador: Carlos Eduardo Mendes\nServiço: Locação e higienização especializada de artigos infantis\nValor Total: R$ 770,00\nAutenticidade: 4B91-88FE-99A1-2240'
    },
    {
      id: 'doc-5',
      title: 'Laudo Técnico de Vistoria de Avaria #BP-012',
      type: 'Fotos',
      client: 'Aline Barbosa Fontes',
      date: '04/10/2026',
      size: '2.8 MB',
      status: 'Avaria Registrada',
      previewText: 'REGISTRO DE INCIDENTE E LAUDO DE AVARIA\n\nItem: Berço Portátil Desmontável BP-012\nDescrição: Pequeno rasgo de 2cm na lateral externa da tela mosquiteiro.\nProvidência: Custo de reparo orçado em R$ 80,00 deduzido da caução mediante aceite da cliente.'
    },
    {
      id: 'doc-6',
      title: 'Proposta Comercial Personalizada #PROP-204',
      type: 'Orçamento',
      client: 'Camila Peixoto',
      date: '04/10/2026',
      size: '310 KB',
      status: 'Em Aprovação',
      previewText: 'PROPOSTA COMERCIAL TORRE DE BEBEL\n\nCliente: Camila Peixoto\nCombo: Berço Chicco Next2Me + Carrinho Ultracompacto YOYO²\nPeríodo: 15 dias\nValor Promocional: R$ 680,00 com entrega e coleta cortesia em Moema.'
    }
  ]);

  const handleDownloadDoc = (doc: DocumentItem) => {
    const textContent = doc.previewText || `${doc.title}\nCliente: ${doc.client}\nData: ${doc.date}\nStatus: ${doc.status}`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.txt`;
    a.click();
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newD: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: newTitle,
      type: newType,
      client: newClient || 'Cliente Geral',
      date: new Date().toLocaleDateString('pt-BR'),
      size: '140 KB',
      status: 'Arquivado no Cofre',
      previewText: `DOCUMENTO REGISTRADO NO COFRE ELETRÔNICO TORRE DE BEBEL\n\nTítulo: ${newTitle}\nTipo: ${newType}\nCliente: ${newClient}\nObservações: ${newNotes || 'Sem observações'}\nRegistrado em: ${new Date().toLocaleString('pt-BR')}`
    };

    setDocuments(prev => [newD, ...prev]);
    setIsNewDocModalOpen(false);
    setNewTitle('');
    setNewClient('');
    setNewNotes('');
  };

  const filtered = documents.filter(d => {
    const matchesType = filterType === 'TODOS' || d.type === filterType;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      d.title.toLowerCase().includes(q) ||
      d.client.toLowerCase().includes(q) ||
      d.status.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Cofre de Documentos, Contratos & Vistorias</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Repositório seguro com trilha criptográfica de contratos digitais, notas fiscais, termos de caução e laudos fotográficos
          </p>
        </div>

        <button
          onClick={() => setIsNewDocModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Anexar / Gerar Documento</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por documento ou cliente..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
          />
        </div>

        {/* Clean Segmented Filter Tabs */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg border border-slate-200/80 overflow-x-auto w-full sm:w-auto">
          {['TODOS', 'Contrato', 'Comprovante', 'Fotos', 'Nota Fiscal', 'Orçamento'].map(st => (
            <button
              key={st}
              onClick={() => setFilterType(st)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                filterType === st
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'TODOS' ? 'Todos os Documentos' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Documento</th>
                <th className="py-2.5 px-4">Tipo</th>
                <th className="py-2.5 px-4">Cliente / Referência</th>
                <th className="py-2.5 px-4">Data Emissão</th>
                <th className="py-2.5 px-4">Status / Validação</th>
                <th className="py-2.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Nenhum documento encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filtered.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{doc.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 pl-6 font-mono">{doc.size}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{doc.client}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono">{doc.date}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setSelectedDocForPreview(doc)}
                          className="px-2 py-1 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md font-medium transition-colors"
                          title="Visualizar documento"
                        >
                          Visualizar
                        </button>
                        <button
                          onClick={() => handleDownloadDoc(doc)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          title="Baixar arquivo"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Preview de Documento */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{selectedDocForPreview.title}</h3>
                  <div className="text-[11px] text-slate-500">Cliente: {selectedDocForPreview.client} • {selectedDocForPreview.date}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 font-mono text-xs text-slate-800 bg-slate-50/50 rounded-lg m-4 border border-slate-200 whitespace-pre-wrap leading-relaxed">
              {selectedDocForPreview.previewText}
            </div>

            <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-white">
              <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{selectedDocForPreview.status}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownloadDoc(selectedDocForPreview)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Documento</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Novo Documento */}
      {isNewDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Anexar Novo Documento ao Cofre</h3>
              <button onClick={() => setIsNewDocModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título do Documento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Termo de Devolução Antecipada #LOC-1033"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Documento</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="Contrato">Contrato</option>
                    <option value="Comprovante">Comprovante</option>
                    <option value="Fotos">Fotos / Vistoria</option>
                    <option value="Nota Fiscal">Nota Fiscal</option>
                    <option value="Orçamento">Orçamento</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cliente / Titular</label>
                  <input
                    type="text"
                    placeholder="Nome da mãe ou pai"
                    value={newClient}
                    onChange={e => setNewClient(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Observações ou Conteúdo do Termo</label>
                <textarea
                  rows={3}
                  placeholder="Observações do contrato ou registro de vistoria..."
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewDocModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Arquivar no Cofre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
