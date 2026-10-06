import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Clock, Plane, ArrowRight, Sparkles, Coffee, Compass, CheckCircle2, AlertCircle } from 'lucide-react';

export const TimeCalculator: React.FC = () => {
  const { setIsBookingModalOpen } = useBooking();
  const [activeTab, setActiveTab] = useState<'flight' | 'connection' | 'early' | 'checkout'>('flight');

  // Flight time mode
  const [flightTime, setFlightTime] = useState('18:40');
  const [currentTime, setCurrentTime] = useState('13:10');

  // Connection mode
  const [originAirport, setOriginAirport] = useState('Brasília (BSB)');
  const [destAirport, setDestAirport] = useState('Lisboa (LIS)');
  const [connArrive, setConnArrive] = useState('11:30');
  const [connDepart, setConnDepart] = useState('19:45');

  // Compute free hours
  const calculateDifference = (start: string, end: string) => {
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    let diffMinutes = h2 * 60 + m2 - (h1 * 60 + m1);
    if (diffMinutes < 0) diffMinutes += 24 * 60; // next day wrap
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return { hours, minutes, totalMinutes: diffMinutes };
  };

  const currentDiff =
    activeTab === 'connection'
      ? calculateDifference(connArrive, connDepart)
      : calculateDifference(currentTime, flightTime);

  // Safety buffer calculation: recommend keeping 1h30 for domestic and 2h30 for intl
  const netFreedomHours = Math.max(0, Math.floor((currentDiff.totalMinutes - 90) / 60));
  const netFreedomMins = Math.max(0, (currentDiff.totalMinutes - 90) % 60);

  const scrollToPlanner = () => {
    const el = document.getElementById('travel-planner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculadora-tempo" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Calculadora Inteligente de Tempo & Liberdade</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
          Quanto tempo você tem?
        </h2>

        <p className="text-sm sm:text-base text-slate-300">
          Sua mala não precisa acompanhar seus passos no restaurante, no shopping ou no parque.
          Veja quanto tempo livre você realmente tem e viaje sem peso.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
        <button
          onClick={() => setActiveTab('flight')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'flight'
              ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Horário do Meu Voo
        </button>
        <button
          onClick={() => setActiveTab('connection')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'connection'
              ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Tenho uma Conexão Longa
        </button>
        <button
          onClick={() => {
            setActiveTab('early');
            setCurrentTime('10:00');
            setFlightTime('17:00');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'early'
              ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Cheguei Cedo Demais
        </button>
        <button
          onClick={() => {
            setActiveTab('checkout');
            setCurrentTime('11:30');
            setFlightTime('20:15');
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'checkout'
              ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Check-out do Hotel Feito
        </button>
      </div>

      {/* Calculator Body */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
        {/* Input Card */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0A1020]/90 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {activeTab === 'connection'
                  ? 'Dados da sua Conexão'
                  : activeTab === 'early'
                  ? 'Check-in aéreo ainda fechado'
                  : activeTab === 'checkout'
                  ? 'Malas fora do hotel'
                  : 'Seu cronograma de viagem'}
              </span>
              <span className="text-xs text-sky-400 font-mono">STOPCASE TIME LAB</span>
            </div>

            {activeTab === 'connection' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Origem do voo:</label>
                    <input
                      type="text"
                      value={originAirport}
                      onChange={(e) => setOriginAirport(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Destino final:</label>
                    <input
                      type="text"
                      value={destAirport}
                      onChange={(e) => setDestAirport(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Chegada da conexão:</label>
                    <input
                      type="time"
                      value={connArrive}
                      onChange={(e) => setConnArrive(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white text-center"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Partida do próximo voo:</label>
                    <input
                      type="time"
                      value={connDepart}
                      onChange={(e) => setConnDepart(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white text-center"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 block font-medium">
                    {activeTab === 'checkout'
                      ? 'Horário do check-out:'
                      : activeTab === 'early'
                      ? 'Horário que cheguei:'
                      : 'Horário agora ou chegada:'}
                  </label>
                  <input
                    type="time"
                    value={currentTime}
                    onChange={(e) => setCurrentTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-lg font-bold text-white text-center focus:border-sky-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 block text-center">Início do tempo livre</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-300 block font-medium">
                    Horário do voo previsto:
                  </label>
                  <input
                    type="time"
                    value={flightTime}
                    onChange={(e) => setFlightTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-lg font-bold text-white text-center focus:border-sky-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 block text-center">Partida da aeronave</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Calculamos automaticamente 1h30 de margem de segurança para embarque tranquilo.</span>
          </div>
        </div>

        {/* Result Card: WOW Outcome */}
        <div className="lg:col-span-6 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-[#0B1530] to-[#080E1C] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Resultado do seu Tempo Livre
            </span>

            <div className="pt-2">
              <div className="text-4xl sm:text-5xl font-black text-white font-display tabular-nums">
                {currentDiff.hours}h{currentDiff.minutes > 0 ? `${currentDiff.minutes.toString().padStart(2, '0')}m` : ''} LIVRES
              </div>
              <p className="mt-2 text-sm text-sky-200/90 font-medium">
                {netFreedomHours > 0
                  ? `Você tem cerca de ${netFreedomHours}h para curtir a cidade com margem de segurança completa.`
                  : 'Tempo para um café relaxante e descanso sem vigiar malas.'}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/70 p-4 border border-slate-800/80 space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                <span>Sua mala não precisa ir com você.</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Em vez de sentar no saguão vigiando a bagagem por {currentDiff.hours} horas, guarde suas malas no locker e aproveite para almoçar ou passear.
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-400 transition-all cursor-pointer"
            >
              <span>Guardar minha bagagem</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={scrollToPlanner}
              className="rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              Montar roteiro desse tempo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
