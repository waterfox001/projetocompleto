import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building,
  DollarSign,
  Truck,
  CreditCard,
  FileText,
  Bell,
  Link,
  Shield,
  Check,
  CheckCircle2,
  X,
  MessageCircle,
  QrCode,
  Lock,
  Save,
  Sliders
} from 'lucide-react';

interface SettingsErpViewProps {
  subTab?: string;
}

export const SettingsErpView: React.FC<SettingsErpViewProps> = ({ subTab }) => {
  const [activeSection, setActiveSection] = useState<'empresa' | 'taxas' | 'politicas' | 'integracoes' | 'seguranca'>('empresa');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Modals for Integrations
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  // Forms state with localStorage persistence
  const [razaoSocial, setRazaoSocial] = useState(() => localStorage.getItem('erp_razao') || 'Torre de Bebel Locações de Bens Móveis Infantis Ltda');
  const [cnpj, setCnpj] = useState(() => localStorage.getItem('erp_cnpj') || '42.891.204/0001-89');
  const [email, setEmail] = useState(() => localStorage.getItem('erp_email') || 'contato@torredebebel.com.br');
  const [whatsapp, setWhatsapp] = useState(() => localStorage.getItem('erp_whatsapp') || '(11) 98452-9182');
  const [endereco, setEndereco] = useState(() => localStorage.getItem('erp_endereco') || 'Av. Moema, 450 - Doca 02 - Indianópolis, São Paulo - SP');

  // Rates
  const [taxaCapital, setTaxaCapital] = useState(() => localStorage.getItem('erp_taxa_capital') || '40');
  const [taxaABC, setTaxaABC] = useState(() => localStorage.getItem('erp_taxa_abc') || '55');
  const [taxaColeta, setTaxaColeta] = useState(() => localStorage.getItem('erp_taxa_coleta') || '40');
  const [tolerancia, setTolerancia] = useState(() => localStorage.getItem('erp_tolerancia') || '2 horas de tolerância');

  // Policies
  const [caucaoMinima, setCaucaoMinima] = useState(() => localStorage.getItem('erp_caucao_min') || '200');
  const [devolucaoAntecipada, setDevolucaoAntecipada] = useState(() => localStorage.getItem('erp_dev_antecipada') || 'Credito em diárias futuras sem multa');
  const [termoAceite, setTermoAceite] = useState(() => localStorage.getItem('erp_termo_aceite') || 'Exigir assinatura eletrônica prévia antes do despacho');

  // Integration configs
  const [pixKey, setPixKey] = useState(() => localStorage.getItem('erp_pix_key') || 'financeiro@torredebebel.com.br');
  const [pixStatus, setPixStatus] = useState(true);
  const [waToken, setWaToken] = useState(() => localStorage.getItem('erp_wa_token') || 'EAAG...BEBEL_VERIFIED');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'pricing_settings') setActiveSection('taxas');
    else if (subTab === 'policies_settings') setActiveSection('politicas');
    else if (subTab === 'integrations_settings') setActiveSection('integracoes');
    else if (subTab === 'users_settings') setActiveSection('seguranca');
    else setActiveSection('empresa');
  }, [subTab]);

  const handleSave = () => {
    localStorage.setItem('erp_razao', razaoSocial);
    localStorage.setItem('erp_cnpj', cnpj);
    localStorage.setItem('erp_email', email);
    localStorage.setItem('erp_whatsapp', whatsapp);
    localStorage.setItem('erp_endereco', endereco);
    localStorage.setItem('erp_taxa_capital', taxaCapital);
    localStorage.setItem('erp_taxa_abc', taxaABC);
    localStorage.setItem('erp_taxa_coleta', taxaColeta);
    localStorage.setItem('erp_tolerancia', tolerancia);
    localStorage.setItem('erp_caucao_min', caucaoMinima);
    localStorage.setItem('erp_dev_antecipada', devolucaoAntecipada);
    localStorage.setItem('erp_termo_aceite', termoAceite);
    localStorage.setItem('erp_pix_key', pixKey);
    localStorage.setItem('erp_wa_token', waToken);

    setSaveToast('Configurações salvas e aplicadas em todos os módulos operacionais com sucesso!');
    setTimeout(() => setSaveToast(null), 3500);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Configurações Gerais & Parâmetros do ERP</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dados cadastrais da empresa, precificação de fretes, políticas de caução, APIs e segurança
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Alterações</span>
        </button>
      </div>

      {/* Save Toast Feedback */}
      {saveToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveToast}</span>
          </div>
          <button onClick={() => setSaveToast(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'empresa', label: 'Dados da Empresa' },
          { id: 'taxas', label: 'Taxas & Logística' },
          { id: 'politicas', label: 'Termos & Políticas de Caução' },
          { id: 'integracoes', label: 'Integrações (PIX & WhatsApp)' },
          { id: 'seguranca', label: 'Segurança & Sessão' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSection === tab.id
                ? 'bg-white shadow-xs text-blue-700 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: Empresa */}
      {activeSection === 'empresa' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-3xl space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Razão Social</label>
              <input
                type="text"
                value={razaoSocial}
                onChange={e => setRazaoSocial(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                onChange={e => setCnpj(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 font-mono text-slate-900 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">E-mail Operacional & Alertas</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp Comercial Oficial</label>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 font-mono text-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Endereço da Base / Galpão de Higienização</label>
            <input
              type="text"
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 text-slate-900 font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs"
            >
              Salvar Dados Cadastrais
            </button>
          </div>
        </div>
      )}

      {/* Section 2: Taxas & Logística */}
      {activeSection === 'taxas' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-3xl space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Taxa Entrega (SP Capital)</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2.5 text-slate-400 font-mono">R$</span>
                <input
                  type="number"
                  value={taxaCapital}
                  onChange={e => setTaxaCapital(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 font-mono font-bold text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Taxa Entrega (ABC e Grande SP)</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2.5 text-slate-400 font-mono">R$</span>
                <input
                  type="number"
                  value={taxaABC}
                  onChange={e => setTaxaABC(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 font-mono font-bold text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Taxa Coleta Domiciliar</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2.5 text-slate-400 font-mono">R$</span>
                <input
                  type="number"
                  value={taxaColeta}
                  onChange={e => setTaxaColeta(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 font-mono font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tolerância Máxima de Devolução sem Cobrança Extra</label>
            <select
              value={tolerancia}
              onChange={e => setTolerancia(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-800"
            >
              <option value="2 horas de tolerância">Até 2 horas de tolerância após janela combinada</option>
              <option value="4 horas de tolerância">Até 4 horas de tolerância</option>
              <option value="Cobrança Imediata">Sem tolerância (cobrança proporcional imediata de diária extra)</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs"
            >
              Salvar Parâmetros de Frete
            </button>
          </div>
        </div>
      )}

      {/* Section 3: Políticas de Caução */}
      {activeSection === 'politicas' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-3xl space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Caução Mínima Padrão em Custódia</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2.5 text-slate-400 font-mono">R$</span>
                <input
                  type="number"
                  value={caucaoMinima}
                  onChange={e => setCaucaoMinima(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono font-bold text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Regra de Devolução Antecipada</label>
              <input
                type="text"
                value={devolucaoAntecipada}
                onChange={e => setDevolucaoAntecipada(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Exigência de Assinatura Eletrônica no Contrato</label>
            <input
              type="text"
              value={termoAceite}
              onChange={e => setTermoAceite(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-800"
            />
          </div>

          <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-blue-900 space-y-1">
            <strong>Proteção Jurídica & Sanitária:</strong>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              O sistema gera hash criptográfico SHA-256 no momento da confirmação do contrato e armazena fotos da vistoria prévia e posterior, garantindo validade jurídica para retenção de caução em avarias estruturais.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs"
            >
              Salvar Políticas de Caução
            </button>
          </div>
        </div>
      )}

      {/* Section 4: Integrações */}
      {activeSection === 'integracoes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {/* Card PIX */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-xs border border-emerald-200">
                  PIX
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Banco Central / Chave Pix Automática</h4>
                  <span className="text-[11px] text-emerald-600 font-semibold">● Conectado & Conciliando</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block text-[11px]">Chave Cadastrada:</span>
              <strong className="font-mono text-slate-800">{pixKey}</strong>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsPixModalOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                Alterar Chave / Gerar QR Teste →
              </button>
            </div>
          </div>

          {/* Card WhatsApp */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-xs border border-emerald-200">
                  WA
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">WhatsApp Business Cloud API</h4>
                  <span className="text-[11px] text-emerald-600 font-semibold">● Pronto p/ Disparos Rápidos</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block text-[11px]">Webhook Conectado:</span>
              <strong className="font-mono text-slate-800">api.torredebebel.com.br/webhook/wa</strong>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                Testar Disparo / Configurar Token →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: Segurança & Sessão */}
      {activeSection === 'seguranca' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-3xl space-y-4 text-xs">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
            <Lock className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">Políticas de Acesso & Segurança da Informação</h3>
              <p className="text-xs text-slate-500">Parâmetros de expiração de sessão e conformidade com LGPD para dados de famílias</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tempo Limite de Inatividade da Sessão</label>
              <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                <option>4 horas (Padrão Operacional)</option>
                <option>8 horas (Turno Completo)</option>
                <option>30 minutos (Alta Segurança)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Trilha de Auditoria (Logs)</label>
              <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                <option>Retenção permanente de 5 anos (Conforme Código Civil)</option>
                <option>Retenção de 2 anos</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed text-[11px]">
            Todos os documentos anexados (RG, CNH dos pais e comprovantes de endereço) são criptografados no cofre de dados em repouso com algoritmo AES-256 e transmitidos exclusivamente sob conexão TLS 1.3.
          </div>
        </div>
      )}

      {/* Modal: PIX Configuração */}
      {isPixModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Configuração de Chave Pix & QR Code</h3>
              <button onClick={() => setIsPixModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chave Pix da Conta Jurídica</label>
                <input
                  type="text"
                  value={pixKey}
                  onChange={e => setPixKey(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                />
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center space-x-3 text-emerald-900">
                <QrCode className="w-8 h-8 text-emerald-700 shrink-0" />
                <div className="text-[11px]">
                  <strong>Conciliação Instantânea:</strong> Ao receber o PIX, a reserva é convertida automaticamente em locação ativa em menos de 2 segundos.
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsPixModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSave();
                    setIsPixModalOpen(false);
                  }}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Salvar Chave Pix
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: WhatsApp Configuração */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">WhatsApp Business Cloud API</h3>
              <button onClick={() => setIsWhatsAppModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Token de Acesso (API Meta / WhatsApp)</label>
                <input
                  type="password"
                  value={waToken}
                  onChange={e => setWaToken(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 text-[11px]">
                Templates aprovados: <strong>confirmacao_locacao</strong>, <strong>lembrete_devolucao</strong>, <strong>pesquisa_nps</strong>.
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsWhatsAppModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSave();
                    setIsWhatsAppModalOpen(false);
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold"
                >
                  Validar Token & Conectar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
