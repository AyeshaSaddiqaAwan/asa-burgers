import React, { useState } from 'react';
import { Flame, ArrowRight, Star, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<'smashed' | 'double'>('smashed');

  const burgerHeroData = {
    smashed: {
      title: 'THE ASA SINGLE SMASH',
      subtitle: 'Crispy lacy-edge smashed beef, double melted American cheese, grilled onions, house pickles & ASA sauce.',
      price: '$9.99',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
      badge: 'ASA SIGNATURE',
    },
    double: {
      title: 'THE DOUBLE LAYUP STACK',
      subtitle: 'Two smashed Angus patties, double melted sharp cheddar, crispy smoked bacon, caramelized onions & secret sauce.',
      price: '$13.79',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80',
      badge: 'FAN FAVORITE',
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 px-6 md:px-12 bg-[#0d0d0f] text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Background glow effects */}s
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-125 bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-100 h-100 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto pt-4">

        {/* Left Column: Bold Headline & Action CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">

          {/* Top All Star Badge */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-md border border-orange-500/40 bg-orange-500/10 text-orange-400 font-athletic text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>ALL STAR BURGERS • SMASHED TO ORDER</span>
          </div>

          {/* Main Statement Heading */}
          <h1
            id="hero-title"
            className="font-stencil text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider text-white leading-none mb-6 uppercase"
          >
            BUILT LIKE <br />
            AN <span className="text-orange-500 drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">ASA.</span>
          </h1>

          {/* Subtitle Narrative */}
          <p
            id="hero-subtitle"
            className="text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-xl font-body-clean"
          >
            A hot ASA smash burger with melted cheese, caramelized onions, crunchy pickles, and house secret sauce on a toasted buttery brioche bun.
          </p>

          {/* CTAs */}
          <div id="hero-actions" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            <a
              href="#menu"
              id="hero-menu-cta"
              className="btn-allstar-primary py-4 px-8 flex items-center justify-center gap-2"
            >
              <span>EXPLORE MENU</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#story-experience"
              id="hero-concept-cta"
              className="btn-allstar-secondary py-4 px-8 flex items-center justify-center gap-2"
            >
              <span>EXPLORE THE STACK</span>
            </a>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6 w-full max-w-lg">
            <div>
              <span className="block font-stencil text-2xl text-orange-500">100%</span>
              <span className="text-xs text-zinc-400 font-athletic uppercase">FRESH ANGUS BEEF</span>
            </div>
            <div>
              <span className="block font-stencil text-2xl text-orange-500">450°F</span>
              <span className="text-xs text-zinc-400 font-athletic uppercase">CRISP SEAR GRILL</span>
            </div>
            <div>
              <span className="block font-stencil text-2xl text-orange-500">DAILY</span>
              <span className="text-xs text-zinc-400 font-athletic uppercase">HOUSE BAKED BUNS</span>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Smash Burger Image on Wax Paper Liner */}
        <div className="lg:col-span-6 relative flex flex-col items-center">

          {/* Image Canvas Container */}
          <div className="relative w-full max-w-lg lg:max-w-none bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 shadow-2xl group overflow-hidden">

            <div className="relative h-95 sm:h-115 rounded-xl overflow-hidden bg-stone-950 flex items-center justify-center">
              {/* Dark wooden table background simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,25,15,0.8)_0%,rgba(10,10,12,0.95)_100%)] pointer-events-none" />

              {/* White Wax Paper Liner Tray Simulation */}
              <div className="relative z-10 w-[88%] h-[82%] bg-[#f5f2eb] rounded-lg p-2 shadow-2xl flex items-center justify-center border border-stone-300 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src={burgerHeroData[selectedStyle].image}
                  alt={burgerHeroData[selectedStyle].title}
                  className="w-full h-full object-cover rounded-md shadow-lg filter contrast-[1.05]"
                />
              </div>

              {/* Style Switcher Floating Pill */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-md border border-zinc-700">
                <button
                  onClick={() => setSelectedStyle('smashed')}
                  className={`px-3 py-1.5 rounded font-athletic text-xs uppercase tracking-wider transition-all cursor-pointer ${selectedStyle === 'smashed'
                    ? 'bg-orange-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  SINGLE SMASH
                </button>
                <button
                  onClick={() => setSelectedStyle('double')}
                  className={`px-3 py-1.5 rounded font-athletic text-xs uppercase tracking-wider transition-all cursor-pointer ${selectedStyle === 'double'
                    ? 'bg-orange-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  DOUBLE STACK
                </button>
              </div>

              {/* Bottom Info Floating Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-lg bg-black/85 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-athletic uppercase text-orange-500 tracking-wider block">
                    {burgerHeroData[selectedStyle].badge}
                  </span>
                  <h4 className="font-stencil text-xl text-white">
                    {burgerHeroData[selectedStyle].title}
                  </h4>
                </div>
                <span className="font-stencil text-2xl text-orange-500 font-bold">
                  {burgerHeroData[selectedStyle].price}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-zinc-800/80 flex items-center justify-between relative z-10 mt-8">
        <div className="flex items-center gap-2 text-zinc-400 font-athletic text-xs uppercase tracking-widest">
          <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span>HAND CRAFTED • ALL STAR INGREDIENTS</span>
        </div>

        <a
          href="#story-experience"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors group cursor-pointer font-athletic text-xs uppercase tracking-wider"
        >
          <span>SEE "THE STACK" ANATOMY</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-orange-500" />
        </a>
      </div>
    </section>
  );
};
