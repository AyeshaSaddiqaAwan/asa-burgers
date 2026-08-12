import React, { useState } from 'react';
import { Flame, Box, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';

export const FeaturedFoodSection: React.FC = () => {
  const [activeBoxView, setActiveBoxView] = useState<'closed' | 'open'>('open');

  return (
    <section id="featured" className="py-24 px-6 md:px-12 bg-[#0d0d0f] text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-0 w-125 h-125 bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-orange-600/20 border border-orange-500/40 text-orange-400 font-athletic text-xs font-bold uppercase tracking-widest mb-3">
            <Box className="w-4 h-4 text-orange-500" />
            <span>CUSTOM PACKAGING & COMBOS</span>
          </div>
          <h2 className="font-stencil text-5xl sm:text-7xl font-bold text-white uppercase tracking-tight leading-none">
            GAME DAY <span className="text-orange-500">COMBO BOX.</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg font-body-clean mt-3">
            Engineered in our custom black insulated ASA box to keep your burgers piping hot, fries extra crisp, and shakes ice cold.
          </p>
        </div>

        {/* Feature Unboxing Hero Card matching Screenshots 2 & 3 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Interactive Unboxing Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-95 sm:h-112.5 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-zinc-800 group">

              {activeBoxView === 'open' ? (
                /* Opened Box View (Screenshot 3) */
                <div className="relative w-full h-full p-4 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
                    alt="All ASA Combo Box Open"
                    className="w-full h-full object-cover rounded-lg filter contrast-[1.08]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/85 backdrop-blur-md border border-orange-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-athletic uppercase text-orange-500 tracking-wider block">
                        UNBOXED GAME DAY MEAL
                      </span>
                      <h4 className="font-stencil text-2xl text-white">
                        THE ASA FULL SET
                      </h4>
                      <p className="text-xs text-zinc-300 font-body-clean">
                        Double Smash Burger + Crispy Seasoned Fries + 2 Dipping Sauce Cups + Overtime Shake
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Closed Custom Box View (Screenshot 2) */
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-zinc-900 to-black p-8 text-center border-4 border-orange-600/40 rounded-lg">
                  <div className="w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center text-white mb-4 shadow-xl shadow-orange-600/40">
                    <Flame className="w-10 h-10 fill-white" />
                  </div>
                  <h3 className="font-stencil text-4xl md:text-5xl text-white tracking-widest uppercase">
                    ASA<span className="text-orange-500">∞</span>Burgers
                  </h3>
                  <p className="font-athletic text-sm uppercase tracking-[0.3em] text-orange-400 mt-1">
                    BURGERS • INSULATED MEAL BOX
                  </p>
                  <p className="text-xs text-zinc-400 max-w-sm mt-4 font-body-clean">
                    Custom ventilated air chambers prevent sogginess and lock in 100% heat during transport.
                  </p>
                </div>
              )}

              {/* Box Toggle Selector */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/90 p-1 rounded border border-zinc-700">
                <button
                  onClick={() => setActiveBoxView('open')}
                  className={`px-3.5 py-1.5 rounded font-athletic text-xs uppercase tracking-wider transition-all cursor-pointer ${activeBoxView === 'open'
                    ? 'bg-orange-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  OPEN BOX VIEW
                </button>
                <button
                  onClick={() => setActiveBoxView('closed')}
                  className={`px-3.5 py-1.5 rounded font-athletic text-xs uppercase tracking-wider transition-all cursor-pointer ${activeBoxView === 'closed'
                    ? 'bg-orange-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  CLOSED BOX VIEW
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Combo Box Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-athletic text-orange-500 uppercase tracking-widest block mb-1">
                SIGNATURE PACKAGING EXPERIENCE
              </span>
              <h3 className="font-stencil text-3xl md:text-4xl text-white mb-4">
                BUILT FOR THE ULTIMATE UNBOXING
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-body-clean mb-6">
                No soggy fries or cold burgers. Our custom heavy-gauge matte black box features dual thermal partitions, dedicated shake stabilizers, and individual sauce wells.
              </p>
            </div>

            <div className="space-y-3 border-y border-zinc-800 py-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-xs text-zinc-200 font-athletic uppercase">
                  THERMAL RETENTION partition technology
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-xs text-zinc-200 font-athletic uppercase">
                  SPILL-PROOF SHAKE STABILIZER HOLDER
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-xs text-zinc-200 font-athletic uppercase">
                  ECO-FRIENDLY RECYCLABLE ASA CARDBOARD
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-[10px] font-athletic text-zinc-400 uppercase block">COMPLETE MEAL SET</span>
                <span className="font-stencil text-3xl text-orange-500">$22.99</span>
              </div>
              <a href="#menu" className="btn-allstar-primary text-xs py-3.5 px-6 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER COMBO BOX</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
