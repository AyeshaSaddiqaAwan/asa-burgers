import React from 'react';
import { Flame, Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] text-zinc-400 py-16 px-6 md:px-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">

          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center text-white">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="font-stencil text-2xl font-bold tracking-wider text-white">
                ALL<span className="text-orange-500">★</span>STAR
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-body-clean">
              America’s premier smashed-to-order burger atelier. Fresh Angus beef, melted cheddar, crinkle fries, and Overtime shakes in custom insulated boxes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-athletic text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-athletic uppercase">
              <li><a href="#menu" className="hover:text-orange-500 transition-colors">ASA MENU</a></li>
              <li><a href="#story-experience" className="hover:text-orange-500 transition-colors">THE STACK ANATOMY</a></li>
              <li><a href="#featured" className="hover:text-orange-500 transition-colors">GAME DAY COMBO BOX</a></li>
              <li><a href="#story" className="hover:text-orange-500 transition-colors">OUR CONCEPT</a></li>
            </ul>
          </div>

          {/* All Star Standards */}
          <div>
            <h4 className="font-athletic text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
              ASA GUARANTEE
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-athletic uppercase">
              <li>100% BLACK ANGUS BEEF</li>
              <li>450°F HOT FLAT TOP SEAR</li>
              <li>DAILY BAKED BRIOCHE BUNS</li>
              <li>CUSTOM INSULATED MEAL BOXES</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-athletic text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
              GAME DAY DROPS
            </h4>
            <p className="text-xs text-zinc-400 mb-3 font-body-clean">
              Sign up for secret menu drops, free combo upgrade passes, and game day specials.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-xs text-white outline-none rounded"
              />
              <button
                type="submit"
                className="btn-allstar-primary text-xs py-2.5 px-4 cursor-pointer shrink-0"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-rows items-center justify-between gap-4 text-xs text-zinc-500 font-athletic uppercase">
          <p>© {new Date().getFullYear()} ASA BURGERS. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-orange-500 transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Facebook className="w-4 h-4" /></a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-orange-500 text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
