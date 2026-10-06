import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Percent,
  DollarSign,
  Share2,
  Users,
  Award,
  Globe,
  Instagram,
  Search,
  Filter,
  Plus,
  Tag,
  CheckCircle2,
  Calendar,
  X,
  ArrowRight
} from 'lucide-react';

interface MarketingChannelsViewProps {
  subTab?: string;
}

interface CampaignItem {
  id: string;
  name: string;
  code: string;
  discount: string;
  partner: string;
  period: string;
  usageCount: number;
  revenue: number;
  status: 'ativa' | 'pausada';
}

export const MarketingChannelsView: React.FC<MarketingChannelsViewProps> = ({ subTab }) => {
  const [activeTab, setActiveTab] = useState<'canais' | 'funil' | 'roi' | 'campanhas'>('canais');

  // New campaign modal
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  const [newCampName, setNewCampName] = useState('');
  const [newCampCode, setNewCampCode] = useState('');
  const [newCampDiscount, setNewCampDiscount] = useState('15%');
  const [newCampPartner, setNewCampPartner] = useState('Parceria Maternidade São Luiz');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'conversion_funnel') setActiveTab('funil');
    else if (subTab === 'channel_roi') setActiveTab('roi');
    else if (subTab === 'marketing_campaigns') setActiveTab('campanhas');
    else setActiveTab('canais');
  }, [subTab]);

  const channels = [
    { channel: 'Indicação / Boca a Boca', clientes: 142, receita: 48600, cac: 'R$ 0,00', roi: 'Infinito', icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { channel: 'Instagram Orgânico & Reels', clientes: 98, receita: 33400, cac: 'R$ 14,20', roi: '18.4x', icon: Instagram, color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { channel: 'Google Search / SEO Local', clientes: 86, receita: 29500, cac: 'R$ 22,50', roi: '14.2x', icon: Search, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { channel: 'Parcerias com Pediatras & Maternidades', clientes: 54, receita: 18900, cac: 'R$ 18,00', roi: '16.0x', icon: Award, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { channel: 'Google Ads (Campanha Viagem Bebê)', clientes: 38, receita: 12800, cac: 'R$ 48,00', roi: '6.8x', icon: Globe, color: 'text-amber-600', bgColor: 'bg-amber-50' }
  ];

  const conversionFunnel = [
    { etapa: '1. Visitantes Únicos no Site', volume: 14200, conv: '100%' },
    { etapa: '2. Consultaram Datas & Disponibilidade', volume: 4850, conv: '34.1%' },
    { etapa: '3. Adicionaram Produtos ao Carrinho', volume: 1240, conv: '25.5%' },
    { etapa: '4. Iniciaram Checkout / Informaram Endereço', volume: 680, conv: '54.8%' },
    { etapa: '5. Locações Pagas & Confirmadas', volume: 418, conv: '61.4%' }
  ];

  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    { id: 'cmp-1', name: 'Parceria Maternidade Santa Joana', code: 'SANTAJOANA15', discount: '15% OFF', partner: 'Hospital Santa Joana', period: 'Até Dez/2026', usageCount: 68, revenue: 23120, status: 'ativa' },
    { id: 'cmp-2', name: 'Verão & Praia Família Leve', code: 'PRAIAKIDS10', discount: '10% OFF', partner: 'Campanha Digital Verão', period: 'Até Jan/2027', usageCount: 42, revenue: 14280, status: 'ativa' },
    { id: 'cmp-3', name: 'Clube de Pediatras Conveniados', code: 'PEDIATRA20', discount: '20% OFF', partner: 'Dra. Camila Nogueira', period: 'Até Nov/2026', usageCount: 29, revenue: 9860, status: 'ativa' },
    { id: 'cmp-4', name: 'Cupom de Boas-Vindas Primeira Locação', code: 'BEMVINDO50', discount: 'R$ 50 OFF', partner: 'Portal Torre de Bebel', period: 'Permanente', usageCount: 114, revenue: 38760, status: 'ativa' }
  ]);

  const handleToggleCampaign = (id: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, status: c.status === 'ativa' ? 'pausada' : 'ativa' } : c))
    );
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampName.trim() || !newCampCode.trim()) return;

    const newCamp: CampaignItem = {
      id: `cmp-${Date.now()}`,
      name: newCampName,
      code: newCampCode.toUpperCase().replace(/\s+/g, ''),
      discount: newCampDiscount,
      partner: newCampPartner,
      period: 'Até Dez/2026',
      usageCount: 0,
      revenue: 0,
      status: 'ativa'
    };

    setCampaigns(prev => [newCamp, ...prev]);
    setIsNewCampaignModalOpen(false);
    setNewCampName('');
    setNewCampCode('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Marketing & Canais de Aquisição</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Origem dos clientes, custo de aquisição (CAC), retorno sobre investimento (ROI), funil de conversão e campanhas
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'canais', label: 'Canais de Venda' },
            { id: 'funil', label: 'Funil de Conversão' },
            { id: 'roi', label: 'CAC & ROI' },
            { id: 'campanhas', label: `Campanhas & Cupons (${campaigns.length})` }
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
      {/* TAB 1: CANAIS DE VENDA & ORIGEM                          */}
      {/* ======================================================== */}
      {activeTab === 'canais' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Performance por Canal de Aquisição de Clientes
                </h3>
                <p className="text-[11px] text-slate-500">Atribuição multitoque com receita acumulada e custo unitário</p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500">Total Faturado: R$ 143.200</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4">Canal de Origem</th>
                    <th className="py-2.5 px-4">Clientes Conquistados</th>
                    <th className="py-2.5 px-4">Receita Gerada</th>
                    <th className="py-2.5 px-4">CAC Médio</th>
                    <th className="py-2.5 px-4 text-right">ROI Estimado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {channels.map((ch, idx) => {
                    const Icon = ch.icon;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 flex items-center space-x-2.5">
                          <div className={`p-1.5 rounded-lg ${ch.bgColor} ${ch.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-800">{ch.channel}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-medium">{ch.clientes} famílias</td>
                        <td className="py-3 px-4 font-bold text-slate-900 font-mono tabular-nums">
                          R$ {ch.receita.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-mono">{ch.cac}</td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-700 font-mono">{ch.roi}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: FUNIL DE CONVERSÃO                                */}
      {/* ======================================================== */}
      {activeTab === 'funil' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Funil de Conversão do Portal Online</h3>
            <p className="text-xs text-slate-500">Taxa de passagem entre cada etapa da jornada da família no site de locação</p>
          </div>

          <div className="space-y-3">
            {conversionFunnel.map((step, idx) => {
              const maxVol = conversionFunnel[0].volume;
              const widthPct = Math.max(12, Math.round((step.volume / maxVol) * 100));

              return (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{step.etapa}</span>
                    <div className="flex items-center space-x-3 font-mono">
                      <strong className="text-slate-900">{step.volume.toLocaleString('pt-BR')}</strong>
                      <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {step.conv}
                      </span>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
            <span>Conversão geral de ponta a ponta (Visitante → Locação Paga):</span>
            <strong className="text-sm font-mono font-bold">2.94% (Acima da média de e-commerce de 1.8%)</strong>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: CAC & ROI                                         */}
      {/* ======================================================== */}
      {activeTab === 'roi' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">CAC Médio Geral</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">R$ 16,80</div>
              <span className="text-[11px] text-emerald-600">Baixo custo por cliente</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">ROI Médio Geral</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">14.6x</div>
              <span className="text-[11px] text-emerald-600">Retorno sobre mídia</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">LTV / CAC Ratio</span>
              <div className="text-2xl font-bold text-blue-600 mt-1 font-mono tabular-nums">76.1x</div>
              <span className="text-[11px] text-slate-500">Benchmark ideal &gt; 3x</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Payback do CAC</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">1.2 dias</div>
              <span className="text-[11px] text-emerald-600">Pago na 1ª diária</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: CAMPANHAS & CUPONS                                */}
      {/* ======================================================== */}
      {activeTab === 'campanhas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Campanhas Comerciais & Cupons de Parceria</h3>
              <p className="text-xs text-slate-500">Gestão de códigos de desconto para maternidades, pediatras e ações sazonais</p>
            </div>
            <button
              onClick={() => setIsNewCampaignModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Criar Cupom / Campanha</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map(camp => (
              <div key={camp.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{camp.name}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">Parceiro: {camp.partner}</span>
                  </div>
                  <button
                    onClick={() => handleToggleCampaign(camp.id)}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                      camp.status === 'ativa'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {camp.status === 'ativa' ? 'Ativa' : 'Pausada'}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-mono font-bold text-slate-900">{camp.code}</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    {camp.discount}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono pt-1">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 block">Usos Concluídos</span>
                    <strong className="text-slate-900">{camp.usageCount} pedidos</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 block">Receita Gerada</span>
                    <strong className="text-slate-900">R$ {camp.revenue.toLocaleString('pt-BR')}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Nova Campanha */}
      {isNewCampaignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Criar Novo Cupom / Campanha</h3>
              <button onClick={() => setIsNewCampaignModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nome da Campanha</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Parceria Clínica Pediátrica Moema"
                  value={newCampName}
                  onChange={e => setNewCampName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código do Cupom</label>
                  <input
                    type="text"
                    required
                    placeholder="MOEMA15"
                    value={newCampCode}
                    onChange={e => setNewCampCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Desconto</label>
                  <input
                    type="text"
                    placeholder="15% OFF"
                    value={newCampDiscount}
                    onChange={e => setNewCampDiscount(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-bold text-blue-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Parceiro / Canal</label>
                <input
                  type="text"
                  placeholder="Ex: Dra. Mariana Pediatra"
                  value={newCampPartner}
                  onChange={e => setNewCampPartner(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewCampaignModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Criar Campanha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
