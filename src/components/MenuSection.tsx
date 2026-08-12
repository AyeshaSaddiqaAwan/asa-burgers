import React, { useState } from 'react';
import { Flame, Check, Info } from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceTiers?: string;
  description: string;
  category: 'burgers' | 'combos' | 'sides' | 'beverages';
  badge?: string;
  image: string;
  ingredients: string[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'free-throw-shot',
    name: 'FREE THROW SHOT BURGER',
    subtitle: 'Classic Single Smash',
    price: 9.99,
    priceTiers: '$9.99 Single • $12.39 Double • $13.79 Triple',
    description: 'Smashed 100% Angus beef patty, melted American cheese, dill pickles, grilled onions, and house ASA sauce on toasted brioche.',
    category: 'burgers',
    badge: 'STARTER FAV',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['100% Angus Patty', 'American Cheese', 'Dill Pickles', 'Grilled Onions', 'House ASA Sauce'],
  },
  {
    id: 'layup-burger',
    name: 'LAYUP BURGER',
    subtitle: 'Double Bacon & Cheese Stack',
    price: 13.79,
    priceTiers: '$10.19 Single • $13.79 Double • $16.09 Triple',
    description: 'Double smashed Angus beef, double melted cheddar, thick Applewood smoked bacon, caramelized onions, and secret sauce.',
    category: 'burgers',
    badge: 'MOST POPULAR',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Double Angus Smash', 'Double Cheddar', 'Smoked Bacon', 'Caramelized Onions'],
  },
  {
    id: 'hook-shot-burger',
    name: 'HOOK SHOT BURGER',
    subtitle: 'Triple Smash Feast',
    price: 14.94,
    priceTiers: '$14.94 Meal • $19.54 Full Combo',
    description: 'Triple smashed Angus beef patties, triple melted cheese, crispy onion strings, and double ASA glaze on a giant toasted bun.',
    category: 'burgers',
    badge: 'TRIPLE STACK',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Triple Angus Smash', 'Triple Cheese', 'Crispy Onion Strings', 'ASA Glaze'],
  },
  {
    id: 'game-day-combo-box',
    name: 'GAME DAY COMBO BOX',
    subtitle: 'Ultimate ASA Box Meal',
    price: 22.99,
    priceTiers: '$22.99 Box Set',
    description: 'Includes Layup Double Burger, crispy ASA seasoned fries, 2 signature dipping sauce cups, and an Overtime Cookie Milkshake served in our black ASA box.',
    category: 'combos',
    badge: 'COMBO BOX',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Double Layup Burger', 'Seasoned Fries', '2 Dip Cups', 'Overtime Shake'],
  },
  {
    id: 'ASA-crisp-fries',
    name: 'ASA CRISPY FRIES',
    subtitle: 'Hand-Cut Seasoned Crinkle Fries',
    price: 4.99,
    priceTiers: '$4.99 Regular • $6.99 Large Box',
    description: 'Crispy golden potato fries tossed in house garlic paprika sea salt, served hot in an ASA branded box.',
    category: 'sides',
    badge: 'MUST HAVE',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Golden Potato Fries', 'House Seasoning', 'Garlic Paprika Salt'],
  },
  {
    id: 'overtime-shake',
    name: 'OVERTIME COOKIE SHAKE',
    subtitle: 'Cookies & Cream Gourmet Milkshake',
    price: 7.99,
    priceTiers: '$7.99 16oz Cup',
    description: 'Thick hand-spun vanilla bean ice cream, crushed Oreo cookies, fudge chocolate drizzle, topped with whipped cream and a cookie crown.',
    category: 'beverages',
    badge: 'SIGNATURE SHAKE',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Vanilla Bean Ice Cream', 'Crushed Oreos', 'Chocolate Fudge', 'Whipped Cream'],
  },
];

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'burgers' | 'combos' | 'sides' | 'beverages'>('all');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleToggleDetails = (id: string) => {
    setSelectedItemId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="menu" className="py-24 px-6 md:px-12 bg-[#f8f6f0] text-stone-900 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-orange-600 font-athletic text-xs font-bold uppercase tracking-widest mb-2">
            <Flame className="w-4 h-4 fill-orange-600" />
            <span>SMASHED TO ORDER SELECTION</span>
          </div>
          <h2 className="font-stencil text-5xl sm:text-7xl font-bold text-stone-950 uppercase tracking-tight">
            ASA <span className="text-orange-600">MENU.</span>
          </h2>
          <p className="text-stone-600 text-base md:text-lg font-body-clean mt-3">
            Every burger is smashed fresh on our 450°F griddle for crispy lacy edges and juicy flavor.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {[
              { id: 'all', label: 'ALL MENU' },
              { id: 'burgers', label: 'SMASH BURGERS' },
              { id: 'combos', label: 'COMBO BOXES' },
              { id: 'sides', label: 'CRISP FRIES' },
              { id: 'beverages', label: 'OVERTIME SHAKES' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded font-athletic text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeCategory === tab.id
                  ? 'bg-orange-600 text-white font-bold shadow-md'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const isSelected = selectedItemId === item.id;

            return (
              <div
                key={item.id}
                className="asa-card rounded-xl bg-white border border-stone-200 p-6 flex flex-col justify-between shadow-lg relative group transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Image Holder */}
                  <div className="w-full h-52 rounded-lg overflow-hidden bg-stone-100 mb-5 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded bg-black/90 text-orange-400 font-athletic text-xs uppercase tracking-widest font-bold border border-orange-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Pricing */}
                  <h3 className="font-stencil text-2xl md:text-3xl text-stone-950 uppercase tracking-wide leading-tight mb-1">
                    {item.name}
                  </h3>

                  {item.priceTiers && (
                    <p className="font-athletic text-xs uppercase font-bold text-orange-600 tracking-wider mb-2">
                      {item.priceTiers}
                    </p>
                  )}

                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed mb-4 font-body-clean">
                    {item.description}
                  </p>

                  {/* Expandable Ingredients List */}
                  {isSelected && (
                    <div className="mb-4 p-3 rounded bg-orange-50 border border-orange-200 text-xs font-body-clean animate-in fade-in duration-200">
                      <span className="font-athletic font-bold uppercase text-orange-700 block mb-1">
                        Ingredients & Build:
                      </span>
                      <ul className="list-disc list-inside text-stone-700 space-y-0.5">
                        {item.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span className="font-stencil text-2xl text-stone-950 font-bold">
                    ${item.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleToggleDetails(item.id)}
                    className="btn-asa-primary text-xs py-2.5 px-5 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Info className="w-4 h-4" />
                    <span>{isSelected ? 'HIDE SPECS' : 'VIEW SPECS'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
