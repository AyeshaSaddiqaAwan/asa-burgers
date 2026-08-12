import React from 'react';
import { Flame, Trophy } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-24 px-6 md:px-12 bg-[#0d0d0f] text-white relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Image & Stats */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                alt="Smash burger kitchen chef"
                className="w-full h-120 object-cover filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlaid Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:right-6 bg-zinc-900 border border-orange-500/40 p-5 rounded-xl shadow-2xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shrink-0 text-white shadow-lg shadow-orange-600/30">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-stencil text-lg text-white">VOTED #1 BURGER</h4>
                  <p className="text-xs text-zinc-400 font-athletic uppercase">Best Smash Burger 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-orange-500 text-xs uppercase tracking-widest font-athletic font-bold">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>THE ASA Burgers CONCEPT</span>
            </div>

            <h2 className="font-stencil text-4xl sm:text-6xl font-bold text-white uppercase leading-none">
              SMASHED TO PERFECTION <br />
              <span className="text-orange-500">EVERY SINGLE TIME.</span>
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed font-body-clean">
              Founded on a passion for the ultimate smash burger, <span className="text-orange-500 font-bold font-stencil text-lg">ASA BURGERS</span> was built to deliver lacy crispy edges, melted cheese, and juicy Angus beef with zero compromises.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed font-body-clean">
              We smash 100% Black Angus beef on 450°F cast iron flat tops to lock in intense caramelized savory flavor. Served in custom insulated combo boxes with crinkle fries and hand-spun Overtime shakes.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
              <div>
                <span className="font-stencil text-4xl text-orange-500 block mb-1">450°F</span>
                <span className="text-xs uppercase tracking-widest text-zinc-300 font-athletic font-bold">HOT FLAT TOP SEAR</span>
              </div>
              <div>
                <span className="font-stencil text-4xl text-orange-500 block mb-1">100%</span>
                <span className="text-xs uppercase tracking-widest text-zinc-300 font-athletic font-bold">FRESH ANGUS BEEF</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
