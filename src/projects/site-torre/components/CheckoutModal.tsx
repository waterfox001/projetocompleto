import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, ShieldCheck, QrCode, CreditCard, Copy, Sparkles, Plane, Hotel, CheckCircle2 } from 'lucide-react';
import { CartItem, Reservation, UnitId } from '../types';
import { UNITS } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  unitId: UnitId;
  startDate: string;
  endDate: string;
  onConfirmReservation: (newReservation: Reservation) => void;
  onViewPortal: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  unitId,
  startDate,
  endDate,
  onConfirmReservation,
  onViewPortal,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Form states
  const [customerName, setCustomerName] = useState('Mariana Silva');
  const [customerEmail, setCustomerEmail] = useState('mariana.silva@exemplo.com.br');
  const [customerPhone, setCustomerPhone] = useState('(11) 98765-4321');
  const [babyName, setBabyName] = useState('Theo');
  const [babyAgeMonths, setBabyAgeMonths] = useState(8);

  const [deliveryType, setDeliveryType] = useState<'airport' | 'hotel' | 'pickup'>('airport');
  const [flightNumber, setFlightNumber] = useState('G3 1542 (Gol)');
  const [hotelAddress, setHotelAddress] = useState('Hotel Gran Marquise - Av. Beira Mar, 3980');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix');
  const [pixCopied, setPixCopied] = useState(false);

  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);

  if (!isOpen) return null;

  const currentUnit = UNITS[unitId];

  // Calculation
  const start = new Date(startDate || '2026-10-10');
  const end = new Date(endDate || '2026-10-15');
  const days = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.dailyPrice * item.days * item.quantity,
    0
  );
  const deliveryFee = deliveryType === 'pickup' ? 0 : currentUnit.deliveryFee;
  const discount = Math.round(subtotal * 0.05); // 5% discount for demo
  const total = subtotal + deliveryFee - discount;

  const handleFinishPayment = () => {
    const reservationId = `TB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReservation: Reservation = {
      id: reservationId,
      customerName,
      customerEmail,
      customerPhone,
      babyName,
      babyAgeMonths,
      unitId,
      startDate,
      endDate,
      days,
      deliveryType,
      deliveryAddress:
        deliveryType === 'airport'
          ? `Aeroporto ${currentUnit.airportName} - Voo ${flightNumber}`
          : deliveryType === 'hotel'
          ? hotelAddress
          : `Retirada direta na ${currentUnit.fullName}`,
      flightNumber,
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        category: i.product.category,
        quantity: i.quantity,
        dailyPrice: i.product.dailyPrice,
      })),
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      progressStep: 1, // Confirmada
    };

    setCreatedReservation(newReservation);
    onConfirmReservation(newReservation);
    setStep(6); // Success confirmation
  };

  const copyPixCode = () => {
    navigator.clipboard?.writeText(
      '00020126580014br.gov.bcb.pix0136torredebebel-reserva-demo@pix.bcb.gov.br520400005303986540' +
        total.toFixed(2)
    );
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider block">
              Checkout Seguro · Torre de Bebel
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
              {step === 6 ? 'Reserva Confirmada!' : `Etapa ${step} de 5: Finalizar Reserva`}
            </h3>
          </div>
          {step !== 6 && (
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress Line */}
        {step !== 6 && (
          <div className="w-full bg-stone-100 h-1">
            <div
              className="bg-orange-600 h-1 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Seus Produtos */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                1. Revise seus produtos e diárias
              </h4>

              <div className="space-y-2.5">
                {items.map((i) => (
                  <div
                    key={i.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={i.product.imageUrl}
                        alt={i.product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-white"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="text-xs font-bold text-stone-900">{i.product.name}</h5>
                        <p className="text-[11px] text-stone-500">
                          {i.quantity} unidade{i.quantity > 1 ? 's' : ''} · {i.days} dias
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-orange-900">
                      R$ {(i.product.dailyPrice * i.days * i.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                ✓ Todos os itens reservados entram imediatamente em protocolo de higienização a vapor hospitalar.
              </div>
            </div>
          )}

          {/* STEP 2: Datas & Unidade */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                2. Confirmação do Destino & Datas
              </h4>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
                <div>
                  <span className="font-bold text-stone-700 block">Cidade de Atendimento:</span>
                  <p className="text-stone-900 font-semibold">{currentUnit.fullName}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-700 block">Aeroporto Principal:</span>
                  <p className="text-stone-900 font-semibold">{currentUnit.airportName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                  <div>
                    <span className="text-stone-500">Data de Retirada:</span>
                    <p className="font-bold text-stone-900">{startDate}</p>
                  </div>
                  <div>
                    <span className="text-stone-500">Data de Devolução:</span>
                    <p className="font-bold text-stone-900">{endDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Dados dos Pais e Bebê */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                3. Dados para a Reserva e Contrato
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Nome do Responsável:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">WhatsApp para contato:</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">E-mail para recibo:</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Nome do bebê & idade:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={babyName}
                      onChange={(e) => setBabyName(e.target.value)}
                      placeholder="Nome do bebê"
                      className="w-2/3 bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none"
                    />
                    <input
                      type="number"
                      value={babyAgeMonths}
                      onChange={(e) => setBabyAgeMonths(Number(e.target.value))}
                      placeholder="Meses"
                      className="w-1/3 bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Entrega / Aeroporto / Hotel */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                4. Onde você deseja receber os produtos?
              </h4>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType('airport')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    deliveryType === 'airport'
                      ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <Plane className="w-5 h-5" />
                  <span>No Desembarque</span>
                  <span className="text-[10px] font-normal opacity-90">{currentUnit.airportCode}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('hotel')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    deliveryType === 'hotel'
                      ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <Hotel className="w-5 h-5" />
                  <span>Hotel ou Pousada</span>
                  <span className="text-[10px] font-normal opacity-90">No seu quarto</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    deliveryType === 'pickup'
                      ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Retirar na Unidade</span>
                  <span className="text-[10px] font-normal opacity-90">Sem taxa</span>
                </button>
              </div>

              {deliveryType === 'airport' && (
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-stone-700">Número do Voo / Cia Aérea:</label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="Ex: G3 1542 ou LA 3421"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500">
                    Acompanhamos seu voo no radar caso haja atraso na chegada.
                  </p>
                </div>
              )}

              {deliveryType === 'hotel' && (
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-stone-700">Nome do Hotel ou Endereço:</label>
                  <input
                    type="text"
                    value={hotelAddress}
                    onChange={(e) => setHotelAddress(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Pagamento */}
          {step === 5 && (
            <div className="space-y-5">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                5. Forma de Pagamento Demonstrativa
              </h4>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex-1 py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'pix'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>PIX Instantâneo (-5% desc)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`flex-1 py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'credit_card'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cartão de Crédito</span>
                </button>
              </div>

              {/* PIX Mock Simulation */}
              {paymentMethod === 'pix' ? (
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div className="w-28 h-28 bg-white border border-emerald-200 rounded-xl p-2 mx-auto flex items-center justify-center shadow-xs">
                    <QrCode className="w-24 h-24 text-stone-800" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">
                      Total com desconto PIX: R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                    <p className="text-[11px] text-stone-500">
                      Escaneie o QR Code ou use o botão de cópia abaixo:
                    </p>
                  </div>
                  <button
                    onClick={copyPixCode}
                    className="px-4 py-2 bg-white border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{pixCopied ? 'Chave Copiada com Sucesso!' : 'Copiar Código PIX'}</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8821"
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-stone-900"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      defaultValue="10/28"
                      className="bg-white border border-stone-200 rounded-xl p-2.5 text-stone-900"
                    />
                    <input
                      type="text"
                      defaultValue="982"
                      className="bg-white border border-stone-200 rounded-xl p-2.5 text-stone-900"
                    />
                  </div>
                </div>
              )}

              {/* Summary line */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <span className="text-stone-600">Total a pagar:</span>
                <span className="text-base font-bold text-stone-900 tabular-nums">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMAÇÃO UAU */}
          {step === 6 && createdReservation && (
            <div className="space-y-6 text-center py-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Reserva #{createdReservation.id} Confirmada
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-2">
                  Tudo pronto para sua chegada!
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  Enquanto você prepara as malas, nossa equipe já está separando e higienizando os produtos do pequeno {createdReservation.babyName}.
                </p>
              </div>

              {/* Reservation card */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-bold text-stone-900 pb-2 border-b border-stone-200">
                  <span>Destino: {currentUnit.fullName}</span>
                  <span>{createdReservation.days} diárias</span>
                </div>
                <div className="text-stone-600">
                  <strong>Local de entrega:</strong> {createdReservation.deliveryAddress}
                </div>
                <div className="text-stone-600">
                  <strong>Produtos:</strong>{' '}
                  {createdReservation.items.map((i) => i.productName).join(', ')}
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-orange-950">
                  <span>Valor Total:</span>
                  <span>R$ {createdReservation.total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onViewPortal();
                  }}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-orange-600/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Acompanhar Preparação na Minha Torre</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-stone-500 hover:text-stone-800 text-xs font-medium"
                >
                  Voltar para a Página Inicial
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        {step < 5 && (
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => setStep((step + 1) as any)}
              className="px-6 py-2.5 bg-stone-900 hover:bg-orange-600 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Avançar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <button
              onClick={handleFinishPayment}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar Pagamento e Reservar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
