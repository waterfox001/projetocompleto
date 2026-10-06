import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
          Transformação do seu dia
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Você não mudou seu destino.<br />Só deixou o peso para trás.
        </h2>
        <p className="text-sm text-slate-300">
          Arraste o cursor abaixo para ver a diferença entre carregar bagagens e deixá-las na StopCase.
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
        {/* Container with split visual */}
        <div className="relative h-[340px] sm:h-[400px] w-full select-none">
          {/* AFTER LAYER (Right side: Freedom) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#06152B] via-[#082042] to-[#040C1A] flex flex-col justify-between p-8 sm:p-12 text-white">
            <div className="flex justify-end">
              <span className="rounded-full bg-sky-500/20 border border-sky-400/40 px-3.5 py-1 text-xs font-bold text-sky-300 uppercase tracking-wider">
                Depois com StopCase
              </span>
            </div>

            <div className="space-y-3 max-w-sm ml-auto text-right">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-sky-100">
                Mãos Livres.
              </div>
              <p className="text-xs sm:text-sm text-sky-200/80 leading-relaxed">
                Você passeia tranquilamente, entra em restaurantes sem pedir espaço extra para bagagens, e aproveita cada hora do seu roteiro sem preocupações.
              </p>
              <div className="text-xs text-sky-400 font-mono font-semibold">
                0kg carregados · 100% mobilidade
              </div>
            </div>

            <div className="flex justify-end items-center gap-2 text-xs text-slate-400">
              <span className="text-2xl">🙂 ☕ 🌴</span>
            </div>
          </div>

          {/* BEFORE LAYER (Left side: Burden, clipped by slider) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-[#1C1014] via-[#2A1218] to-[#12080B] flex flex-col justify-between p-8 sm:p-12 text-white border-r border-rose-500/50"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="w-[300px] sm:w-[450px]">
              <div>
                <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-3.5 py-1 text-xs font-bold text-rose-300 uppercase tracking-wider">
                  Antes sem StopCase
                </span>
              </div>

              <div className="space-y-3 max-w-sm text-left mt-16 sm:mt-20">
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-rose-100">
                  Arrastando 28kg.
                </div>
                <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
                  Cansaço nos braços, risco de esquecer algo, rodinhas travando na calçada e a sensação de carregar o quarto inteiro nas costas.
                </p>
                <div className="text-xs text-rose-400 font-mono font-semibold">
                  28kg de peso · Tensão constante
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-12 sm:mt-16">
                <span className="text-2xl">😫 🧳 🧳 🎒</span>
              </div>
            </div>
          </div>

          {/* Draggable Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg border border-slate-300">
              <ArrowLeftRight className="h-4 w-4" />
            </div>
          </div>

          {/* Range input controller */}
          <input
            type="range"
            min="5"
            max="95"
            value={sliderPosition}
            onChange={handleSliderChange}
            aria-label="Controle deslizante de comparação antes e depois"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-400">
          <span>← Arraste para a esquerda (Ver antes)</span>
          <span className="font-semibold text-slate-300">Use o slider para comparar</span>
          <span>Arraste para a direita (Ver depois) →</span>
        </div>
      </div>
    </section>
  );
};
