import React, { useState } from 'react';
import { Briefcase, Building2, Users, Handshake, Check, ArrowRight, TrendingUp, Award } from 'lucide-react';

export const BusinessPartnerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'business' | 'partner'>('business');
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [estimatedBags, setEstimatedBags] = useState('20-50');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCompanyName('');
      setCnpj('');
      setContactEmail('');
    }, 5000);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-slate-800 bg-[#090F20] p-8 sm:p-12 shadow-2xl space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              SOLUÇÕES B2B & PARCERIAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {activeTab === 'business'
                ? 'Viaje a trabalho sem carregar o escritório.'
                : 'Seus clientes viajam. Nós cuidamos da bagagem.'}
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              {activeTab === 'business'
                ? 'Armazenamento corporativo para equipes itinerantes, eventos, executivos em trânsito e materiais promocionais com faturamento centralizado.'
                : 'Integração para hotéis, agências de viagens, companhias aéreas e operadoras de turismo com comissionamento e API.'}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('business')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              StopCase Business
            </button>
            <button
              onClick={() => setActiveTab('partner')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'partner'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Programa de Parceiros
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white font-display">
              {activeTab === 'business'
                ? 'Solicitar Conta Corporativa ou Orçamento'
                : 'Cadastrar sua Agência ou Hotel Parceiro'}
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <div className="mx-auto h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <Check className="h-5 w-5" />
                </div>
                <div className="text-base font-bold text-emerald-300">
                  Solicitação recebida com sucesso!
                </div>
                <p className="text-xs text-emerald-200/80">
                  Nosso time de contas entrará em contato em até 2 horas úteis.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Empresa ou Hotel:</label>
                    <input
                      type="text"
                      required
                      placeholder="Nome da organização"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-sky-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">CNPJ (Opcional):</label>
                    <input
                      type="text"
                      placeholder="00.000.000/0001-00"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">E-mail Corporativo:</label>
                    <input
                      type="email"
                      required
                      placeholder="contato@empresa.com.br"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-sky-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Volume estimado / mês:</label>
                    <select
                      value={estimatedBags}
                      onChange={(e) => setEstimatedBags(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white focus:border-sky-500"
                    >
                      <option value="10-20">Até 20 reservas / mês</option>
                      <option value="20-50">20 a 50 reservas / mês</option>
                      <option value="50-200">50 a 200 reservas / mês</option>
                      <option value="200+">Acima de 200 reservas / mês</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-all cursor-pointer"
                >
                  <span>Falar com nosso comercial</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Partner / Business Dashboard Showcase */}
          <div className="lg:col-span-5 rounded-2xl border border-sky-500/20 bg-gradient-to-b from-[#0B1530] to-[#070B14] p-6 space-y-4 shadow-xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400">
              DASHBOARD CONCEITUAL · STOPCASE PARTNER
            </span>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Reservas indicadas este mês:</span>
                <span className="font-mono font-bold text-white">142 viagens</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Comissão / Crédito gerado:</span>
                <span className="font-mono font-bold text-emerald-400">R$ 1.840,00</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Cidades mais acionadas:</span>
                <span className="font-semibold text-slate-300">CGH, REC, FOR</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="h-3.5 w-3.5 text-sky-400" />
                <span>API pronta para integração em PMS hoteleiro e agências</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="h-3.5 w-3.5 text-sky-400" />
                <span>QR Codes co-branded com a marca do seu hotel</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="h-3.5 w-3.5 text-sky-400" />
                <span>Painel de métricas e relatório fiscal automatizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
