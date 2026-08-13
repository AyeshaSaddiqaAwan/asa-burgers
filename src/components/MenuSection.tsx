import React, { useState } from 'react';
import { Flame, Info } from 'lucide-react';

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
    description:
      'Smashed 100% Angus beef patty, melted American cheese, dill pickles, grilled onions, and house ASA sauce on toasted brioche.',
    category: 'burgers',
    badge: 'STARTER FAV',
    image: '/burger1.png',
    ingredients: [
      '100% Angus Patty',
      'American Cheese',
      'Dill Pickles',
      'Grilled Onions',
      'House ASA Sauce',
    ],
  },

  {
    id: 'layup-burger',
    name: 'LAYUP BURGER',
    subtitle: 'Double Bacon & Cheese Stack',
    price: 13.79,
    priceTiers: '$10.19 Single • $13.79 Double • $16.09 Triple',
    description:
      'Double smashed Angus beef, double melted cheddar, thick Applewood smoked bacon, caramelized onions, and secret sauce.',
    category: 'burgers',
    badge: 'MOST POPULAR',
    image: '/burger2.png',
    ingredients: [
      'Double Angus Smash',
      'Double Cheddar',
      'Smoked Bacon',
      'Caramelized Onions',
      'Secret ASA Sauce',
    ],
  },

  {
    id: 'hook-shot-burger',
    name: 'HOOK SHOT BURGER',
    subtitle: 'Triple Smash Feast',
    price: 14.94,
    priceTiers: '$14.94 Meal • $19.54 Full Combo',
    description:
      'Triple smashed Angus beef patties, triple melted cheese, crispy onion strings, and double ASA glaze on a giant toasted bun.',
    category: 'burgers',
    badge: 'TRIPLE STACK',
    image: '/burger3.png',
    ingredients: [
      'Triple Angus Smash',
      'Triple Cheese',
      'Crispy Onion Strings',
      'ASA Glaze',
      'Toasted Brioche Bun',
    ],
  },

  {
    id: 'game-day-combo-box',
    name: 'GAME DAY COMBO BOX',
    subtitle: 'Ultimate ASA Box Meal',
    price: 22.99,
    priceTiers: '$22.99 Box Set',
    description:
      'Includes Layup Double Burger, crispy ASA seasoned fries, 2 signature dipping sauce cups, and an Overtime Cookie Milkshake served in our black ASA box.',
    category: 'combos',
    badge: 'COMBO BOX',
    image: '/burger4.png',
    ingredients: [
      'Double Layup Burger',
      'Seasoned Fries',
      '2 Signature Dip Cups',
      'Overtime Cookie Shake',
    ],
  },

  {
    id: 'asa-crisp-fries',
    name: 'ASA CRISPY FRIES',
    subtitle: 'Hand-Cut Seasoned Crinkle Fries',
    price: 4.99,
    priceTiers: '$4.99 Regular • $6.99 Large Box',
    description:
      'Crispy golden potato fries tossed in house garlic paprika sea salt, served hot in an ASA branded box.',
    category: 'sides',
    badge: 'MUST HAVE',

    /*
      Temporary image.
      Replace this later with something like:
      /fries.png
    */
    image: '/burger1.png',

    ingredients: [
      'Golden Potato Fries',
      'House Seasoning',
      'Garlic Paprika Salt',
    ],
  },

  {
    id: 'overtime-shake',
    name: 'OVERTIME COOKIE SHAKE',
    subtitle: 'Cookies & Cream Gourmet Milkshake',
    price: 7.99,
    priceTiers: '$7.99 16oz Cup',
    description:
      'Thick hand-spun vanilla bean ice cream, crushed Oreo cookies, fudge chocolate drizzle, topped with whipped cream and a cookie crown.',
    category: 'beverages',
    badge: 'SIGNATURE SHAKE',

    /*
      Temporary image.
      Replace this later with something like:
      /shake.png
    */
    image: '/burger2.png',

    ingredients: [
      'Vanilla Bean Ice Cream',
      'Crushed Oreos',
      'Chocolate Fudge',
      'Whipped Cream',
    ],
  },
];

type Category =
  | 'all'
  | 'burgers'
  | 'combos'
  | 'sides'
  | 'beverages';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<Category>('all');

  const [selectedItemId, setSelectedItemId] =
    useState<string | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(
        (item) => item.category === activeCategory
      );

  const handleToggleDetails = (id: string) => {
    setSelectedItemId((previous) =>
      previous === id ? null : id
    );
  };

  return (
    <section
      id="menu"
      className="
        relative
        py-24
        px-6
        md:px-12
        bg-[#f8f6f0]
        text-stone-900
        overflow-hidden
      "
    >

      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================= */}

      <div
        className="
          absolute
          top-20
          left-1/2
          -translate-x-1/2
          w-175
          h-75
          bg-orange-500/5
          rounded-full
          blur-[120px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-100
          h-100
          bg-orange-500/5
          rounded-full
          blur-[120px]
          pointer-events-none
        "
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
            mb-16
          "
        >

          {/* Eyebrow */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              text-orange-600
              font-athletic
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              mb-3
            "
          >
            <Flame
              className="
                w-4
                h-4
                fill-orange-600
              "
            />

            <span>
              SMASHED TO ORDER SELECTION
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              font-stencil
              text-5xl
              sm:text-7xl
              font-bold
              text-stone-950
              uppercase
              tracking-tight
              leading-none
            "
          >
            ASA{' '}
            <span className="text-orange-600">
              MENU.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              text-stone-600
              text-base
              md:text-lg
              font-body-clean
              mt-4
              leading-relaxed
            "
          >
            Every burger is smashed fresh on our
            450°F griddle for crispy lacy edges
            and juicy flavor.
          </p>

          {/* =======================================================
              CATEGORY FILTER
          ======================================================= */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2.5
              mt-8
            "
          >

            {[
              {
                id: 'all',
                label: 'ALL MENU',
              },
              {
                id: 'burgers',
                label: 'SMASH BURGERS',
              },
              {
                id: 'combos',
                label: 'COMBO BOXES',
              },
              {
                id: 'sides',
                label: 'CRISP FRIES',
              },
              {
                id: 'beverages',
                label: 'OVERTIME SHAKES',
              },
            ].map((tab) => {

              const isActive =
                activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveCategory(
                      tab.id as Category
                    )
                  }
                  className={`
                    px-5
                    py-2.5
                    rounded
                    font-athletic
                    text-sm
                    uppercase
                    tracking-wider
                    transition-all
                    duration-200
                    cursor-pointer

                    ${isActive
                      ? `
                          bg-orange-600
                          text-white
                          font-bold
                          shadow-md
                          shadow-orange-600/20
                        `
                      : `
                          bg-stone-200
                          text-stone-700
                          hover:bg-stone-300
                          hover:text-stone-950
                        `
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}

          </div>
        </div>

        {/* =========================================================
            MENU GRID
        ========================================================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >

          {filteredItems.map((item) => {

            const isSelected =
              selectedItemId === item.id;

            return (
              <article
                key={item.id}
                className="
                  group
                  relative
                  rounded-2xl
                  bg-white
                  border
                  border-stone-200
                  p-5
                  md:p-6
                  flex
                  flex-col
                  justify-between
                  shadow-lg
                  shadow-stone-900/5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    w-full
                    h-64
                    rounded-xl
                    overflow-hidden
                    bg-[#f1eee7]
                    mb-6
                    flex
                    items-center
                    justify-center
                  "
                >

                  {/* Soft background glow */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.10),transparent_65%)]
                    "
                  />

                  {/* Burger image */}

                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="
                      relative
                      z-10
                      w-full
                      h-full
                      object-contain
                      p-5
                      drop-shadow-[0_20px_25px_rgba(0,0,0,0.22)]
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />

                  {/* Badge */}

                  {item.badge && (
                    <span
                      className="
                        absolute
                        top-3
                        left-3
                        z-20
                        px-3
                        py-1.5
                        rounded
                        bg-black/90
                        text-orange-400
                        font-athletic
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        font-bold
                        border
                        border-orange-500/30
                      "
                    >
                      {item.badge}
                    </span>
                  )}

                </div>

                {/* =================================================
                    PRODUCT INFORMATION
                ================================================= */}

                <div>

                  {/* Subtitle */}

                  <p
                    className="
                      font-athletic
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      font-bold
                      text-orange-600
                      mb-2
                    "
                  >
                    {item.subtitle}
                  </p>

                  {/* Name */}

                  <h3
                    className="
                      font-stencil
                      text-2xl
                      md:text-3xl
                      text-stone-950
                      uppercase
                      tracking-wide
                      leading-tight
                      mb-2
                    "
                  >
                    {item.name}
                  </h3>

                  {/* Pricing tiers */}

                  {item.priceTiers && (
                    <p
                      className="
                        font-athletic
                        text-xs
                        uppercase
                        font-bold
                        text-orange-600
                        tracking-wider
                        mb-3
                      "
                    >
                      {item.priceTiers}
                    </p>
                  )}

                  {/* Description */}

                  <p
                    className="
                      text-stone-600
                      text-xs
                      md:text-sm
                      leading-relaxed
                      mb-4
                      font-body-clean
                    "
                  >
                    {item.description}
                  </p>

                  {/* =================================================
                      INGREDIENTS
                  ================================================= */}

                  {isSelected && (
                    <div
                      className="
                        mb-4
                        p-4
                        rounded-lg
                        bg-orange-50
                        border
                        border-orange-200
                        text-xs
                        font-body-clean
                        animate-in
                        fade-in
                        duration-200
                      "
                    >

                      <span
                        className="
                          font-athletic
                          font-bold
                          uppercase
                          text-orange-700
                          block
                          mb-2
                        "
                      >
                        Ingredients & Build
                      </span>

                      <ul
                        className="
                          space-y-1.5
                          text-stone-700
                        "
                      >

                        {item.ingredients.map(
                          (ingredient, index) => (
                            <li
                              key={index}
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <span
                                className="
                                  w-1.5
                                  h-1.5
                                  rounded-full
                                  bg-orange-500
                                  shrink-0
                                "
                              />

                              {ingredient}
                            </li>
                          )
                        )}

                      </ul>

                    </div>
                  )}

                </div>

                {/* =================================================
                    BOTTOM ACTIONS
                ================================================= */}

                <div
                  className="
                    pt-4
                    mt-2
                    border-t
                    border-stone-100
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  {/* Price */}

                  <div>

                    <span
                      className="
                        block
                        text-[9px]
                        font-athletic
                        uppercase
                        tracking-[0.15em]
                        text-stone-400
                        mb-0.5
                      "
                    >
                      Starting at
                    </span>

                    <span
                      className="
                        font-stencil
                        text-2xl
                        text-stone-950
                        font-bold
                      "
                    >
                      ${item.price.toFixed(2)}
                    </span>

                  </div>

                  {/* Specs Button */}

                  <button
                    type="button"
                    onClick={() =>
                      handleToggleDetails(item.id)
                    }
                    className="
                      btn-asa-primary
                      text-xs
                      py-2.5
                      px-5
                      flex
                      items-center
                      gap-1.5
                      transition-all
                      cursor-pointer
                    "
                  >

                    <Info className="w-4 h-4" />

                    <span>
                      {isSelected
                        ? 'HIDE SPECS'
                        : 'VIEW SPECS'}
                    </span>

                  </button>

                </div>

              </article>
            );
          })}

        </div>

        {/* =========================================================
            EMPTY STATE
        ========================================================= */}

        {filteredItems.length === 0 && (
          <div
            className="
              text-center
              py-20
              text-stone-500
              font-body-clean
            "
          >
            No menu items found.
          </div>
        )}

      </div>
    </section>
  );
};