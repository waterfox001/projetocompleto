import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Clock, FileText, RefreshCw, Send, AlertCircle, Sparkles, User, ShieldCheck } from 'lucide-react';
import { Reservation, UnitId } from '../types';
import { UNITS } from '../data/mockData';
import { DoodleStroller } from './HandcraftedDoodles';

interface CustomerPortalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation;
  onExtendReservation: (extraDays: number) => void;
  onScheduleReturn: (returnOption: string) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  isOpen,
  onClose,
  reservation,
  onExtendReservation,
  onScheduleReturn,
}) => {
  const [activeTab, setActiveTab] = useState<'tracking' | 'documents' | 'extend' | 'return'>('tracking');
  const [extensionDays, setExtensionDays] = useState(3);
  const [extensionConfirmed, setExtensionConfirmed] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState(false);
  const [returnLocation, setReturnLocation] = useState('hotel_pickup');

  if (!isOpen) return null;

  const currentUnit = UNITS[reservation.unitId];

  // Timeline steps
  const timelineSteps = [
    { title: 'Reserva Realizada', desc: 'Confirmada no sistema', done: true },
    { title: 'Pagamento Aprovado', desc: 'PIX compensado instantaneamente', done: true },
    { title: 'Produtos Separados', desc: 'Itens retirados do estoque central', done: true },
    { title: 'Higienização a Vapor 140°C', desc: 'Esterilização e lençol selado', done: true },
    { title: 'Em Rota para Entrega', desc: 'A caminho do aeroporto / hotel', done: reservation.progressStep >= 4, active: reservation.progressStep === 4 },
    { title: 'Entregue no Destino', desc: 'Pronto para uso pelo bebê', done: reservation.progressStep >= 5 },
  ];

  const handleExtend = () => {
    onExtendReservation(extensionDays);
    setExtensionConfirmed(true);
    setTimeout(() => setExtensionConfirmed(false), 3000);
  };

  const handleReturn = () => {
    onScheduleReturn(returnLocation);
    setReturnSuccess(true);
    setTimeout(() => setReturnSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-50 via-white to-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                  Área do Cliente · Minha Torre
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Reserva Ativa
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Olá, {reservation.customerName}!
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-100 overflow-x-auto scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tracking'
                ? 'border-orange-600 text-orange-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Acompanhamento & Timeline
          </button>
          <button
            onClick={() => setActiveTab('extend')}
            className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'extend'
                ? 'border-orange-600 text-orange-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Estender Viagem (Renovação)
          </button>
          <button
            onClick={() => setActiveTab('return')}
            className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'return'
                ? 'border-orange-600 text-orange-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Agendar Devolução
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-3 px-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'documents'
                ? 'border-orange-600 text-orange-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Contrato & Recibos
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: Tracking & Timeline */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              {/* Active Reservation Overview Card */}
              <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-200/60 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-orange-800 uppercase tracking-widest">
                      Código da Reserva: #{reservation.id}
                    </span>
                    <h4 className="text-base font-bold text-stone-900">
                      Viagem para {currentUnit.fullName}
                    </h4>
                  </div>
                  <div className="text-xs text-orange-900 font-bold bg-white px-3 py-1 rounded-xl border border-orange-200">
                    Status: {reservation.status === 'in_transit' ? 'Em Entrega para o Local' : 'Confirmada'}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                  <div>
                    <span className="text-stone-400 font-medium block">Período:</span>
                    <span className="font-bold text-stone-900">
                      {reservation.startDate} a {reservation.endDate} ({reservation.days} dias)
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-medium block">Ponto de Entrega:</span>
                    <span className="font-bold text-stone-900">{reservation.deliveryAddress}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-medium block">Bebê:</span>
                    <span className="font-bold text-stone-900">
                      {reservation.babyName} ({reservation.babyAgeMonths} meses)
                    </span>
                  </div>
                </div>

                {/* Products rented badge list */}
                <div className="pt-2 border-t border-orange-200/60 flex flex-wrap gap-2">
                  {reservation.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-stone-800 bg-white px-3 py-1 rounded-lg border border-orange-200"
                    >
                      ✓ {item.productName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Visual Hero ("Seu carrinho está sendo preparado") */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center p-2 shrink-0 animate-sway">
                  <DoodleStroller className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Seus equipamentos estão prontos para sua chegada!
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Nossa equipe conferiu os lacres de segurança e o lençol esterilizado. O motorista já está a caminho com seus itens.
                  </p>
                </div>
              </div>

              {/* Real-time Status Timeline */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Linha do Tempo da Sua Reserva:
                </h4>

                <div className="space-y-3 relative pl-6 border-l-2 border-orange-200 ml-3">
                  {timelineSteps.map((stepItem, i) => (
                    <div key={i} className="relative">
                      {/* Node point */}
                      <div
                        className={`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          stepItem.done
                            ? 'bg-emerald-600 text-white'
                            : stepItem.active
                            ? 'bg-orange-600 text-white animate-pulse'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {stepItem.done ? '✓' : i + 1}
                      </div>

                      <div className="text-xs">
                        <span className={`font-bold block ${stepItem.active ? 'text-orange-950 text-sm' : 'text-stone-800'}`}>
                          {stepItem.title}
                          {stepItem.active && (
                            <span className="ml-2 text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                              Agora
                            </span>
                          )}
                        </span>
                        <span className="text-stone-500">{stepItem.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Extensão de Reserva */}
          {activeTab === 'extend' && (
            <div className="space-y-5">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  Precisa ficar mais alguns dias no destino?
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Verificamos automaticamente o estoque de {currentUnit.name} para garantir que você continue com os mesmos equipamentos sem precisar devolver antes da hora.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Disponibilidade confirmada por mais dias!</span>
                </div>
                <p className="text-stone-600">
                  Nenhum outro cliente reservou estes mesmos itens para as datas posteriores ao seu período.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <label className="text-xs font-bold text-stone-800 block">
                  Quantos dias a mais você gostaria de permanecer?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 5, 7].map((num) => (
                    <button
                      key={num}
                      onClick={() => setExtensionDays(num)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        extensionDays === num
                          ? 'bg-orange-600 text-white'
                          : 'bg-white border border-stone-200 text-stone-700'
                      }`}
                    >
                      +{num} dia{num > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-600">
                    Valor adicional ({extensionDays} diárias para os 3 itens):
                  </span>
                  <span className="text-base font-bold text-stone-900">
                    R$ {(74 * extensionDays).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {extensionConfirmed ? (
                <div className="p-4 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl text-center">
                  ✓ Reserva estendida com sucesso! Novo término atualizado.
                </div>
              ) : (
                <button
                  onClick={handleExtend}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Confirmar Extensão de Reserva</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 3: Agendar Devolução */}
          {activeTab === 'return' && (
            <div className="space-y-5">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  Agendar Devolução dos Produtos
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Escolha como prefere encerrar sua locação com comodidade antes de embarcar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => setReturnLocation('hotel_pickup')}
                  className={`p-4 rounded-2xl border text-left font-semibold transition-all ${
                    returnLocation === 'hotel_pickup'
                      ? 'bg-orange-50 border-orange-300 text-orange-950 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <span className="font-bold block text-sm mb-1">Coleta na Recepção do Hotel</span>
                  <span className="text-[11px] font-normal text-stone-500">
                    Deixe na portaria ou recepção no check-out. Nossa van retira sem você esperar.
                  </span>
                </button>

                <button
                  onClick={() => setReturnLocation('airport_desk')}
                  className={`p-4 rounded-2xl border text-left font-semibold transition-all ${
                    returnLocation === 'airport_desk'
                      ? 'bg-orange-50 border-orange-300 text-orange-950 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <span className="font-bold block text-sm mb-1">Ponto no Aeroporto ({currentUnit.airportCode})</span>
                  <span className="text-[11px] font-normal text-stone-500">
                    Devolva diretamente antes do raio-x de embarque no saguão principal.
                  </span>
                </button>
              </div>

              {returnSuccess ? (
                <div className="p-4 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl text-center">
                  ✓ Agendamento de devolução confirmado com a central local!
                </div>
              ) : (
                <button
                  onClick={handleReturn}
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirmar Agendamento de Devolução</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 4: Documentos & Recibos */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  Documentos & Comprovantes
                </h4>
                <p className="text-xs text-stone-500">
                  Acesse cópias digitais do contrato de locação, termo de esterilização e recibos fiscais.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <div>
                      <h5 className="font-bold text-stone-900">Contrato de Locação Digital #{reservation.id}</h5>
                      <span className="text-[11px] text-stone-500">Assinado digitalmente · PDF</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Download do Contrato Demonstrativo simulado com sucesso!')}
                    className="px-3 py-1 bg-white border border-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-100"
                  >
                    Visualizar
                  </button>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h5 className="font-bold text-stone-900">Certificado de Higienização a Vapor</h5>
                      <span className="text-[11px] text-stone-500">Lacre TB-992 · Esterilizado a 140°C</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Laudo de esterilização demonstrativo aberto.')}
                    className="px-3 py-1 bg-white border border-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-100"
                  >
                    Visualizar
                  </button>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-stone-600" />
                    <div>
                      <h5 className="font-bold text-stone-900">Comprovante de Pagamento PIX</h5>
                      <span className="text-[11px] text-stone-500">
                        R$ {reservation.total.toFixed(2).replace('.', ',')} · Autenticação bancária
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Recibo de pagamento demonstrativo visualizado.')}
                    className="px-3 py-1 bg-white border border-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-100"
                  >
                    Visualizar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
