import React, { useState, useEffect } from 'react';
import {
  Store,
  Calendar,
  MapPin,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Baby,
  Truck,
  ArrowLeft,
  CheckCircle2,
  X,
  FileText,
  Clock,
  User,
  Phone,
  Search,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductUnit, ProductCategory } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { TorreDeBebelLogo } from '../TorreDeBebelLogo';

export const CustomerStoreView: React.FC = () => {
  const { products, createReservation, currentView, setCurrentView } = useApp();

  // Tab internal sync
  const [activeTab, setActiveTab] = useState<'vitrine' | 'simulador' | 'conta' | 'contratos' | 'rastreamento'>('vitrine');

  useEffect(() => {
    if (currentView === 'online_booking') setActiveTab('simulador');
    else if (currentView === 'customer_account') setActiveTab('conta');
    else if (currentView === 'customer_contracts') setActiveTab('contratos');
    else if (currentView === 'tracking_delivery') setActiveTab('rastreamento');
    else setActiveTab('vitrine');
  }, [currentView]);

  // Catalog State
  const [selectedCity, setSelectedCity] = useState('São Paulo - SP (Grande SP e ABC)');
  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-15');
  const [categoryFilter, setCategoryFilter] = useState<string>('TODAS');
  const [cart, setCart] = useState<ProductUnit[]>([]);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('Mariana Costa');
  const [customerPhone, setCustomerPhone] = useState('(11) 98452-9182');
  const [deliveryAddress, setDeliveryAddress] = useState('Rua Bela Cintra, 1420 - Jardins');
  const [deliveryType, setDeliveryType] = useState<'entrega' | 'retirada'>('entrega');
  const [isFinished, setIsFinished] = useState(false);
  const [confirmedResNumber, setConfirmedResNumber] = useState('');

  // Simulator State
  const [simProdId, setSimProdId] = useState(products[0]?.id || '');
  const [simDays, setSimDays] = useState(7);
  const [simDelivery, setSimDelivery] = useState<'entrega' | 'retirada'>('entrega');

  // Digital Contract Sign State
  const [hasSignedContract, setHasSignedContract] = useState(false);
  const [extensionRequested, setExtensionRequested] = useState(false);

  // Calculate days for catalog
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  const categories = ['TODAS', 'Cadeirinhas', 'Bebê-conforto', 'Carrinhos', 'Berços', 'Alimentação', 'Brinquedos'];

  const availableProducts = products.filter(p => {
    const matchesCat = categoryFilter === 'TODAS' || p.category === categoryFilter;
    return p.status === 'DISPONIVEL' && matchesCat;
  });

  const addToCart = (product: ProductUnit) => {
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Calculations for checkout
  const rentalTotal = cart.reduce((acc, item) => acc + (item.dailyRate * diffDays), 0);
  const deliveryFee = deliveryType === 'entrega' ? 40 : 0;
  const depositTotal = cart.reduce((acc, item) => acc + item.depositValue, 0);
  const totalAmountToPay = rentalTotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const resNumber = `#RES-${Math.floor(2000 + Math.random() * 8000)}`;

    createReservation({
      customerId: 'cust-001',
      customerName,
      customerPhone,
      items: cart.map(p => ({
        productId: p.id,
        productCode: p.code,
        productName: p.name,
        category: p.category,
        dailyRate: p.dailyRate
      })),
      startDate,
      endDate,
      totalDays: diffDays,
      rentalValue: rentalTotal,
      deliveryFee,
      depositValue: depositTotal,
      discount: 0,
      totalAmount: totalAmountToPay,
      paymentStatus: 'pago',
      paymentMethod: 'pix',
      deliveryType,
      deliveryAddress
    });

    setConfirmedResNumber(resNumber);
    setIsFinished(true);
  };

  const simProduct = products.find(p => p.id === simProdId) || products[0];
  const simBasePrice = simProduct ? simProduct.dailyRate * simDays : 0;
  const simDiscount = simDays >= 30 ? simBasePrice * 0.35 : simDays >= 14 ? simBasePrice * 0.20 : simDays >= 7 ? simBasePrice * 0.10 : 0;
  const simFinalPrice = simBasePrice - simDiscount + (simDelivery === 'entrega' ? 40 : 0);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 pb-20">
      {/* Top Bar for Switch back to Admin */}
      <div className="bg-white text-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sticky top-0 z-30 border-b border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-0.5 shadow-2xs">
            <TorreDeBebelLogo size={24} />
          </div>
          <span className="font-bold text-slate-800">Torre de Bebel · Experiência do Cliente & Família</span>
        </div>

        {/* Portal Nav */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'vitrine', label: 'Vitrine Online', view: 'customer_store' },
            { id: 'simulador', label: 'Simulador de Reserva', view: 'online_booking' },
            { id: 'conta', label: 'Minhas Locações', view: 'customer_account' },
            { id: 'contratos', label: 'Contrato Digital', view: 'customer_contracts' },
            { id: 'rastreamento', label: 'Rastrear Entrega', view: 'tracking_delivery' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id as any);
                setCurrentView(t.view as any);
              }}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-white text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center space-x-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao ERP</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. VITRINE ONLINE / CATÁLOGO                             */}
      {/* ======================================================== */}
      {activeTab === 'vitrine' && (
        <div>
          {/* Brand Hero */}
          <div className="bg-gradient-to-b from-blue-50/50 via-slate-50 to-white text-slate-900 pt-10 pb-16 px-4 border-b border-slate-200">
            <div className="max-w-4xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold shadow-xs">
                <TorreDeBebelLogo size={20} />
                <span>Torre de Bebel · Locação Especializada de Artigos Infantis</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 max-w-2xl mx-auto">
                Viaje leve com seu bebê. Alugue carrinhos, cadeirinhas e berços.
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                Higienização hospitalar a vapor 140°C, entrega no hotel ou residência com garantia de segurança.
              </p>

              {/* Quick Selection Bar */}
              <div className="mt-8 p-4 bg-white text-slate-900 rounded-xl shadow-xl max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-left border border-slate-200">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">1. Região</label>
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent outline-none mt-1"
                  >
                    <option value="São Paulo - SP">São Paulo - SP (Capital)</option>
                    <option value="Campinas - SP">Campinas & Região</option>
                    <option value="Litoral - SP">Santos & Litoral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">2. Retirada / Início</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent outline-none mt-1 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    3. Devolução ({diffDays} dias)
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent outline-none mt-1 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Catalog */}
          <div className="max-w-4xl mx-auto px-4 -mt-10 space-y-6">
            {/* Categories Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {availableProducts.map(p => {
                const inCart = cart.some(item => item.id === p.id);
                const totalItemPrice = p.dailyRate * diffDays;

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                        <SafeImage src={p.photoUrl} alt={p.name} category={p.category} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow-xs">
                          Higienizado 140°C
                        </span>
                        <span className="absolute top-2 right-2 bg-white text-slate-800 border border-slate-200 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                          {p.code}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{p.category}</span>
                        <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">{p.name}</h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{(p as any).description || p.notes || 'Equipamento infantil higienizado e inspecionado com padrão hospitalar.'}</p>
                      </div>
                    </div>

                    <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Diária a partir de</div>
                        <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                          R$ {p.dailyRate} <span className="text-[10px] font-normal text-slate-500">/dia</span>
                        </div>
                        <div className="text-[10px] text-blue-700 font-mono">
                          {diffDays} dias: <strong>R$ {totalItemPrice}</strong>
                        </div>
                      </div>

                      <button
                        onClick={() => (inCart ? removeFromCart(p.id) : addToCart(p))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                          inCart
                            ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>Remover</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Alugar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. SIMULADOR DE RESERVA                                  */}
      {/* ======================================================== */}
      {activeTab === 'simulador' && (
        <div className="max-w-2xl mx-auto px-4 pt-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Simulador de Valores de Locação</h2>
              <p className="text-xs text-slate-500">Calcule instantaneamente pacotes de diárias, descontos progressivos e caução</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Selecione o Produto Desejado</label>
                <select
                  value={simProdId}
                  onChange={e => setSimProdId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium text-slate-900"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category}) - R$ {p.dailyRate}/dia
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Quantidade de Dias: <strong className="text-blue-700 font-mono text-sm">{simDays} dias</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={simDays}
                  onChange={e => setSimDays(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 dia</span>
                  <span>7 dias (10% OFF)</span>
                  <span>14 dias (20% OFF)</span>
                  <span>30 dias (35% OFF)</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Modalidade de Logística</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSimDelivery('entrega')}
                    className={`p-3 rounded-lg border text-left font-medium transition-all ${
                      simDelivery === 'entrega'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Entrega Domiciliar (Hotel / Residência)</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">+ R$ 40,00 com horário agendado</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSimDelivery('retirada')}
                    className={`p-3 rounded-lg border text-left font-medium transition-all ${
                      simDelivery === 'retirada'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Retirada no Balcão da Base</div>
                    <div className="text-[10px] text-emerald-600 font-mono mt-0.5">Grátis (Moema / Capital)</div>
                  </button>
                </div>
              </div>

              {/* Simulation Result Breakdown */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Valor base ({simDays} diárias a R$ {simProduct?.dailyRate || 0}):</span>
                  <span>R$ {simBasePrice.toFixed(2)}</span>
                </div>
                {simDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Desconto progressivo por período:</span>
                    <span>- R$ {simDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Frete de entrega:</span>
                  <span>R$ {simDelivery === 'entrega' ? '40.00' : '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total estimado a pagar:</span>
                  <span className="text-blue-700 text-base">R$ {simFinalPrice.toFixed(2)}</span>
                </div>
                <div className="text-[10px] text-slate-400 pt-1">
                  Caução de garantia reembolsável: R$ {simProduct?.depositValue || 200},00 (estornada integralmente na devolução sem avarias).
                </div>
              </div>

              <button
                onClick={() => {
                  if (simProduct) addToCart(simProduct);
                  setActiveTab('vitrine');
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs shadow-xs"
              >
                Adicionar ao Carrinho & Prosseguir →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. MINHAS LOCAÇÕES (ÁREA DO CLIENTE)                     */}
      {/* ======================================================== */}
      {activeTab === 'conta' && (
        <div className="max-w-3xl mx-auto px-4 pt-8 space-y-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                MC
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Mariana Costa Silveira</h3>
                <div className="text-xs text-slate-500 font-mono">(11) 98452-9182 • mariana.costa@gmail.com</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              Cliente VIP Torre de Bebel
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">Locação Ativa no Momento</h4>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="font-mono text-blue-600 font-bold">#LOC-1024</span>
                  <h4 className="font-bold text-sm text-slate-900 mt-0.5">Cadeirinha Burigotto Matrix K (0 a 36kg)</h4>
                  <div className="text-slate-500 text-[11px]">Código do Equipamento: CC-024 • Isofix</div>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Em Curso
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 block">Início:</span>
                  <strong>06/10/2026</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Devolução:</span>
                  <strong className="text-blue-700">13/10/2026</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Valor Pago:</span>
                  <strong>R$ 285,00</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Caução:</span>
                  <strong className="text-emerald-700">R$ 300,00 em custódia</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('rastreamento')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Rastrear Entrega do Motorista</span>
                </button>
                {extensionRequested ? (
                  <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg font-semibold">
                    ✓ Solicitação enviada via WhatsApp!
                  </span>
                ) : (
                  <button
                    onClick={() => setExtensionRequested(true)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition-colors"
                  >
                    Prorrogar Diárias (+7 dias)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. CONTRATO DIGITAL (ASSINATURA)                         */}
      {/* ======================================================== */}
      {activeTab === 'contratos' && (
        <div className="max-w-2xl mx-auto px-4 pt-8 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Contrato de Locação Digital #LOC-1024</h3>
                <p className="text-[11px] text-slate-500">Autenticação eletrônica conforme Lei Federal 14.063/2020</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] leading-relaxed space-y-2 max-h-60 overflow-y-auto text-slate-700">
              <p><strong>1. DO OBJETO:</strong> O presente contrato tem por objeto a locação por prazo determinado de artigos infantis higienizados a vapor hospitalar 140°C.</p>
              <p><strong>2. DA DEVOLUÇÃO E CONFERÊNCIA:</strong> A contratante se compromete a devolver o produto na data combinada, em perfeito estado de funcionamento.</p>
              <p><strong>3. DA CAUÇÃO DE GARANTIA:</strong> A caução retida em cartão ou PIX será estornada integralmente após a vistoria física de encerramento sem avarias.</p>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200 text-blue-900 flex items-center justify-between">
              <span>Status da Assinatura:</span>
              <strong className={hasSignedContract ? 'text-emerald-700' : 'text-amber-700'}>
                {hasSignedContract ? '✓ Assinado Digitalmente (Autenticado)' : 'Aguardando Assinatura do Cliente'}
              </strong>
            </div>

            {!hasSignedContract ? (
              <button
                onClick={() => setHasSignedContract(true)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs"
              >
                Assinar Digitalmente com 1 Clique (Confirmar Aceite)
              </button>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-center font-semibold">
                Contrato assinado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Cópia enviada ao e-mail cadastrado.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. RASTREAR PEDIDO / ENTREGA                            */}
      {/* ======================================================== */}
      {activeTab === 'rastreamento' && (
        <div className="max-w-2xl mx-auto px-4 pt-8 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-blue-600 font-bold">Pedido #LOC-1024</span>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">Rastreamento da Rota de Entrega</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Van em Rota
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4">
              {[
                { step: '1', title: 'Pedido Confirmado & Conciliado', desc: 'Reserva validada no sistema', time: 'Ontem 18:30', done: true },
                { step: '2', title: 'Higienização a Vapor 140°C & Vistoria', desc: 'Aprovado pelo técnico na bancada', time: 'Hoje 08:00', done: true },
                { step: '3', title: 'Carga Despachada com o Motorista', desc: 'Fiorino #01 (Placa BRA-9E82)', time: 'Hoje 09:15', done: true },
                { step: '4', title: 'Motorista em Rota Domiciliar', desc: 'Previsão de chegada: 10:45 (em 12 minutos)', time: 'Agora', current: true },
                { step: '5', title: 'Entrega Concluída no Local', desc: 'Assinatura do termo de recebimento', time: 'Pendente', future: true }
              ].map((s, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                      s.done ? 'bg-emerald-600 text-white' : s.current ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {s.done ? '✓' : s.step}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <strong className={`text-xs ${s.current ? 'text-blue-700 font-bold' : 'text-slate-800'}`}>
                        {s.title}
                      </strong>
                      <span className="text-[10px] text-slate-400 font-mono">{s.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Driver Box */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  JS
                </div>
                <div>
                  <strong className="text-slate-900 block">João Silva (Motorista)</strong>
                  <span className="text-[11px] text-slate-500 font-mono">Fiorino Kids #01 • (11) 98888-1101</span>
                </div>
              </div>

              <a
                href="https://wa.me/5511988881101"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Cart Bar */}
      {cart.length > 0 && !isCheckoutOpen && activeTab === 'vitrine' && (
        <div className="fixed bottom-4 inset-x-4 max-w-xl mx-auto bg-white text-slate-900 p-3.5 rounded-xl shadow-2xl flex items-center justify-between z-40 border border-slate-200 animate-in slide-in-from-bottom-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
              {cart.length}
            </div>
            <div>
              <div className="text-xs font-semibold leading-tight font-mono tabular-nums text-slate-900">
                Total: R$ {totalAmountToPay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-slate-500">
                {cart.length} {cart.length === 1 ? 'item' : 'itens'} por {diffDays} dias
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            Finalizar Reserva →
          </button>
        </div>
      )}

      {/* Modern Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Resumo da Reserva & Checkout</h3>
                <div className="text-xs text-slate-500">Torre de Bebel · Entrega Programada</div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isFinished ? (
              <form onSubmit={handleCheckoutSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Itens Selecionados:</div>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <span className="text-slate-800">{item.name}</span>
                      <span className="font-mono font-bold text-slate-900">
                        R$ {(item.dailyRate * diffDays).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                    <span>Total da Locação:</span>
                    <span className="text-blue-700 font-mono">
                      R$ {totalAmountToPay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Telefone Celular / WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Endereço de Entrega (ou Hotel)</label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs"
                  >
                    Confirmar & Pagar via PIX
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Reserva Confirmada com Sucesso!</h3>
                  <div className="text-xs font-mono text-blue-700 font-bold mt-1">{confirmedResNumber}</div>
                  <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
                    Recebemos o comprovante via PIX. Nosso motorista chegará na data combinada com o equipamento higienizado.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsFinished(false);
                      setCart([]);
                      setActiveTab('conta');
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Ver Meus Pedidos & Rastrear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
