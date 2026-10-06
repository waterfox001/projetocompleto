import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';
import { LOCKER_TYPES } from '../../data/lockers';
import { HubCityId, LockerSize } from '../../types';
import { X, Check, ArrowRight, ArrowLeft, ShieldCheck, QrCode, CreditCard, Sparkles, Luggage, MapPin, Clock, Calendar } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedHubId,
    setSelectedHubId,
    selectedSize,
    setSelectedSize,
    createBooking,
    setHubDetailModalId,
  } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Form State
  const [hubChoice, setHubChoice] = useState<HubCityId>(selectedHubId);
  const [date, setDate] = useState('2026-10-06');
  const [inTime, setInTime] = useState('13:00');
  const [outTime, setOutTime] = useState('18:30');
  const [sizeChoice, setSizeChoice] = useState<LockerSize>(selectedSize);
  const [customerName, setCustomerName] = useState('Nayra Silva');
  const [customerEmail, setCustomerEmail] = useState('nayraemail10@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+55 85 99841-2290');
  const [flightCode, setFlightCode] = useState('LA-3419');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  if (!isBookingModalOpen) return null;

  const currentHub = HUBS.find((h) => h.id === hubChoice) || HUBS[0];
  const currentLocker = LOCKER_TYPES.find((l) => l.id === sizeChoice) || LOCKER_TYPES[1];

  const handleNext = () => {
    if (step < 5) {
      setStep((s) => (s + 1) as any);
    } else if (step === 5) {
      // Simulate Payment
      setIsProcessing(true);
      setTimeout(() => {
        const newBooking = createBooking({
          hubId: hubChoice,
          lockerSize: sizeChoice,
          date,
          startTime: inTime,
          endTime: outTime,
          customerName,
          customerEmail,
          customerPhone,
          flightCode,
          paymentMethod,
          totalPrice: currentLocker.dailyPrice,
        });
        setCreatedBookingId(newBooking.id);
        setIsProcessing(false);
        setStep(6);
      }, 900);
    }
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setStep(1);
  };

  const handleGoToPlaces = () => {
    handleClose();
    const el = document.getElementById('travel-planner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-700 bg-[#090E1C] shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div>
            <span className="text-xs font-mono text-sky-400 font-bold uppercase">
              RESERVA STOPCASE · ETAPA {step} DE 6
            </span>
            <h3 className="text-base font-bold text-white font-display">
              {step === 1 && '1. Escolha a Cidade / Unidade'}
              {step === 2 && '2. Período & Horários'}
              {step === 3 && '3. Tamanho do Locker'}
              {step === 4 && '4. Seus Dados de Viagem'}
              {step === 5 && '5. Pagamento Seguro'}
              {step === 6 && 'Você está livre!'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="h-1 w-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* STEP 1: Cidade / Unidade */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Selecione sua cidade / unidade de atendimento:
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {HUBS.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setHubChoice(h.id)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      hubChoice === h.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{h.name}</span>
                        <span className="font-mono text-xs text-sky-400 bg-slate-800 px-2 py-0.5 rounded">
                          {h.airportCode}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{h.airportName}</div>
                    </div>
                    {hubChoice === h.id && <Check className="h-5 w-5 text-sky-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Horários */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Aeroporto selecionado:</span>
                <span className="text-sm font-bold text-white">
                  {currentHub.name} ({currentHub.airportCode}) — {currentHub.airportName}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-sky-400" />
                  Data da reserva:
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-sky-400" />
                    Horário de Entrada:
                  </label>
                  <input
                    type="time"
                    value={inTime}
                    onChange={(e) => setInTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-sky-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-sky-400" />
                    Previsão de Retirada:
                  </label>
                  <input
                    type="time"
                    value={outTime}
                    onChange={(e) => setOutTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                Extensões de horário podem ser feitas diretamente pelo celular mais tarde caso seu roteiro mude.
              </div>
            </div>
          )}

          {/* STEP 3: Locker Size */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Selecione o compartimento ideal:
              </label>

              <div className="space-y-3">
                {LOCKER_TYPES.map((lt) => (
                  <button
                    key={lt.id}
                    type="button"
                    onClick={() => setSizeChoice(lt.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      sizeChoice === lt.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{lt.name}</span>
                        <span className="font-mono text-xs text-sky-400 font-bold">
                          R$ {lt.dailyPrice}/dia
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{lt.capacityDescription}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{lt.dimensionsVisual}</div>
                    </div>
                    {sizeChoice === lt.id && <Check className="h-5 w-5 text-sky-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Traveler Info */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold">Nome Completo:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold">E-mail (receberá comprovante):</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-sky-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold">WhatsApp / Celular:</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold">
                  Código do Voo (Opcional — monitoramos atrasos):
                </label>
                <input
                  type="text"
                  placeholder="Ex: LA-3419, G3-1402, AD-4200"
                  value={flightCode}
                  onChange={(e) => setFlightCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Payment */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Unidade:</span>
                  <span className="text-white font-bold">{currentHub.name} ({currentHub.airportCode})</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Compartimento:</span>
                  <span className="text-white font-bold">{currentLocker.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Período:</span>
                  <span className="text-white font-bold">{date} ({inTime} às {outTime})</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total a Pagar:</span>
                  <span className="text-2xl font-black text-sky-400 font-display">
                    R$ {currentLocker.dailyPrice},00
                  </span>
                </div>
              </div>

              {/* Payment selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Forma de Pagamento (Ambiente de Demonstração):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'border-sky-500 bg-sky-500/10 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <QrCode className="h-4 w-4 text-emerald-400" />
                    <span>PIX Instantâneo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'credit_card'
                        ? 'border-sky-500 bg-sky-500/10 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <CreditCard className="h-4 w-4 text-sky-400" />
                    <span>Cartão de Crédito</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'pix' ? (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                  <div className="font-bold">Aprovação imediata via PIX</div>
                  <p className="text-[11px] text-emerald-200/70">
                    O QR Code e o PIN de liberação são gerados no exato momento da confirmação.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="text-white font-bold">Simulação de Cartão</div>
                  <p className="text-[11px]">Pagamento simulado sem cobrança real na versão demo.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Confirmation "VOCÊ ESTÁ LIVRE." */}
          {step === 6 && (
            <div className="space-y-6 text-center py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-white font-display">
                  VOCÊ ESTÁ LIVRE.
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Sua mala fica com a StopCase. Sua viagem continua leve.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Reserva Confirmada:</span>
                  <span className="text-sm font-bold text-sky-400 font-mono">
                    #{createdBookingId || 'SC-10482'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Aeroporto:</span>
                  <span className="font-semibold">{currentHub.name} ({currentHub.airportCode})</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Locker:</span>
                  <span className="font-semibold">{currentLocker.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Acesso:</span>
                  <span className="text-emerald-400 font-mono font-bold">QR Code & PIN Gerados</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleGoToPlaces}
                  className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-all cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Ver Lugares para Visitar na Cidade</span>
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    setHubDetailModalId(currentHub.id);
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  Como chegar ao locker no aeroporto
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 6 && (
          <div className="border-t border-slate-800 p-6 bg-slate-900/60 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500">Passo 1 de 5</span>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isProcessing}
              className="flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Gerando chave digital...</span>
              ) : step === 5 ? (
                <span>Confirmar & Pagar R$ {currentLocker.dailyPrice}</span>
              ) : (
                <>
                  <span>Continuar</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
