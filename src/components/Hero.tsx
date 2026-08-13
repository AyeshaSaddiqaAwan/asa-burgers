import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Flame,
  Star,
} from 'lucide-react';

type BurgerStyle = 'burger2' | 'burger3';

interface BurgerHeroItem {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  badge: string;
}

export const Hero: React.FC = () => {
  const [selectedStyle, setSelectedStyle] =
    useState<BurgerStyle>('burger2');

  const burgerHeroData: Record<BurgerStyle, BurgerHeroItem> = {
    burger2: {
      title: 'THE DOUBLE LAYUP',
      subtitle:
        'Two smashed Angus patties, sharp cheddar, smoked bacon, caramelized onions and our signature house sauce.',
      price: '$13.79',
      image: '/burger2.png',
      badge: 'FAN FAVORITE',
    },

    burger3: {
      title: 'THE ASA CLASSIC',
      subtitle:
        'Premium Angus beef, melted cheese, fresh lettuce, tomato, pickles and our signature ASA sauce.',
      price: '$10.99',
      image: '/burger3.png',
      badge: 'ASA CLASSIC',
    },
  };

  const currentBurger = burgerHeroData[selectedStyle];

  return (
    <section
      id="hero"
      className="
        relative
        min-h-screen
        pt-28
        pb-16
        px-6
        md:px-12
        bg-[#0d0d0f]
        text-white
        overflow-hidden
        flex
        flex-col
        justify-between
      "
    >

      {/* =========================================================
          BACKGROUND GLOW
      ========================================================= */}

      <div
        className="
          absolute
          top-1/4
          left-1/2
          -translate-x-1/2
          w-200
          h-125
          bg-orange-600/10
          rounded-full
          blur-[160px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-0
          right-0
          w-100
          h-100
          bg-orange-500/5
          rounded-full
          blur-[120px]
          pointer-events-none
        "
      />

      {/* =========================================================
          MAIN HERO
      ========================================================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          w-full
          relative
          z-10
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-12
          items-center
          my-auto
          pt-4
        "
      >

        {/* =======================================================
            LEFT SIDE
        ======================================================= */}

        <div
          className="
            lg:col-span-6
            flex
            flex-col
            items-start
            text-left
          "
        >

          {/* =====================================================
              BADGE
          ===================================================== */}

          <div
            id="hero-badge"
            className="
              inline-flex
              items-center
              gap-2.5
              px-4
              py-1.5
              rounded-md
              border
              border-orange-500/40
              bg-orange-500/10
              text-orange-400
              font-athletic
              text-xs
              font-semibold
              uppercase
              tracking-widest
              mb-6
            "
          >
            <Flame
              className="
                w-4
                h-4
                text-orange-500
                fill-orange-500
              "
            />

            <span>
              ASA BURGERS • SMASHED TO ORDER
            </span>
          </div>

          {/* =====================================================
              MAIN HEADING
          ===================================================== */}

          <h1
            id="hero-title"
            className="
              font-stencil
              text-5xl
              sm:text-7xl
              lg:text-8xl
              font-bold
              tracking-wider
              text-white
              leading-none
              mb-6
              uppercase
            "
          >
            BUILT LIKE
            <br />
            AN{' '}

            <span
              className="
                text-orange-500
                drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]
              "
            >
              ASA.
            </span>
          </h1>

          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <p
            id="hero-subtitle"
            className="
              text-zinc-300
              text-lg
              sm:text-xl
              font-normal
              leading-relaxed
              mb-8
              max-w-xl
              font-body-clean
            "
          >
            A hot ASA smash burger with melted cheese,
            caramelized onions, crunchy pickles, and house
            secret sauce on a toasted buttery brioche bun.
          </p>

          {/* =====================================================
              CTA BUTTONS
          ===================================================== */}

          <div
            id="hero-actions"
            className="
              flex
              flex-col
              sm:flex-row
              items-stretch
              sm:items-center
              gap-4
              w-full
              sm:w-auto
              mb-10
            "
          >

            <a
              href="#menu"
              id="hero-menu-cta"
              className="
                btn-allstar-primary
                py-4
                px-8
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <span>
                EXPLORE MENU
              </span>

              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#story-experience"
              id="hero-concept-cta"
              className="
                btn-allstar-secondary
                py-4
                px-8
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <span>
                EXPLORE THE STACK
              </span>
            </a>

          </div>

          {/* =====================================================
              METRICS
          ===================================================== */}

          <div
            className="
              grid
              grid-cols-3
              gap-4
              border-t
              border-zinc-800
              pt-6
              w-full
              max-w-lg
            "
          >

            <div>
              <span
                className="
                  block
                  font-stencil
                  text-2xl
                  text-orange-500
                "
              >
                100%
              </span>

              <span
                className="
                  text-xs
                  text-zinc-400
                  font-athletic
                  uppercase
                "
              >
                FRESH ANGUS BEEF
              </span>
            </div>

            <div>
              <span
                className="
                  block
                  font-stencil
                  text-2xl
                  text-orange-500
                "
              >
                450°F
              </span>

              <span
                className="
                  text-xs
                  text-zinc-400
                  font-athletic
                  uppercase
                "
              >
                CRISP SEAR GRILL
              </span>
            </div>

            <div>
              <span
                className="
                  block
                  font-stencil
                  text-2xl
                  text-orange-500
                "
              >
                DAILY
              </span>

              <span
                className="
                  text-xs
                  text-zinc-400
                  font-athletic
                  uppercase
                "
              >
                HOUSE BAKED BUNS
              </span>
            </div>

          </div>

        </div>


        {/* =======================================================
            RIGHT SIDE
        ======================================================= */}

        <div
          className="
            lg:col-span-6
            relative
            flex
            flex-col
            items-center
          "
        >

          {/* =====================================================
              IMAGE CONTAINER
          ===================================================== */}

          <div
            className="
              relative
              w-full
              max-w-lg
              lg:max-w-none
              bg-zinc-900/90
              border
              border-zinc-800
              rounded-2xl
              p-4
              shadow-2xl
              group
              overflow-hidden
            "
          >

            <div
              className="
                relative
                h-95
                sm:h-115
                rounded-xl
                overflow-hidden
                bg-stone-950
                flex
                items-center
                justify-center
              "
            >

              {/* =================================================
                  BACKGROUND
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[radial-gradient(ellipse_at_center,rgba(40,25,15,0.8)_0%,rgba(10,10,12,0.95)_100%)]
                  pointer-events-none
                "
              />

              {/* =================================================
                  ORANGE SPOTLIGHT
              ================================================= */}

              <div
                className="
                  absolute
                  top-1/2
                  left-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-80
                  h-80
                  bg-orange-500/10
                  rounded-full
                  blur-[120px]
                  pointer-events-none
                "
              />

              {/* =================================================
                  BURGER IMAGE
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  w-[92%]
                  h-[90%]
                  flex
                  items-center
                  justify-center
                "
              >

                <img
                  src={currentBurger.image}
                  alt={currentBurger.title}
                  className="
                    w-full
                    h-full
                    object-contain
                    drop-shadow-[0_25px_35px_rgba(0,0,0,0.75)]
                    filter
                    contrast-[1.05]
                    saturate-[1.08]
                    transition-all
                    duration-500
                  "
                />

              </div>


              {/* =================================================
                  BURGER NUMBER
              ================================================= */}

              <div
                className="
                  absolute
                  top-4
                  left-4
                  z-20
                  flex
                  items-center
                  gap-2
                  text-zinc-400
                  font-athletic
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                "
              >

                <span className="text-orange-500">
                  {selectedStyle === 'burger2' ? '01' : '02'}
                </span>

                <span>
                  / 02
                </span>

              </div>


              {/* =================================================
                  IMAGE SWITCHER
              ================================================= */}

              <div
                className="
                  absolute
                  top-4
                  right-4
                  z-20
                  flex
                  items-center
                  gap-1
                  bg-black/80
                  backdrop-blur-md
                  p-1
                  rounded-md
                  border
                  border-zinc-700
                "
              >

                <button
                  type="button"
                  onClick={() => setSelectedStyle('burger2')}
                  className={`
                    px-3
                    py-1.5
                    rounded
                    font-athletic
                    text-xs
                    uppercase
                    tracking-wider
                    transition-all
                    cursor-pointer

                    ${selectedStyle === 'burger2'
                      ? 'bg-orange-600 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-white'
                    }
                  `}
                >
                  01
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStyle('burger3')}
                  className={`
                    px-3
                    py-1.5
                    rounded
                    font-athletic
                    text-xs
                    uppercase
                    tracking-wider
                    transition-all
                    cursor-pointer

                    ${selectedStyle === 'burger3'
                      ? 'bg-orange-600 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-white'
                    }
                  `}
                >
                  02
                </button>

              </div>


              {/* =================================================
                  PRODUCT INFORMATION
              ================================================= */}

              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  right-4
                  z-20
                  p-4
                  rounded-lg
                  bg-black/85
                  backdrop-blur-md
                  border
                  border-zinc-800
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <span
                    className="
                      text-[10px]
                      font-athletic
                      uppercase
                      text-orange-500
                      tracking-wider
                      block
                    "
                  >
                    {currentBurger.badge}
                  </span>

                  <h4
                    className="
                      font-stencil
                      text-xl
                      text-white
                    "
                  >
                    {currentBurger.title}
                  </h4>

                </div>

                <span
                  className="
                    font-stencil
                    text-2xl
                    text-orange-500
                    font-bold
                  "
                >
                  {currentBurger.price}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================================
          BOTTOM
      ========================================================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          w-full
          pt-8
          border-t
          border-zinc-800/80
          flex
          items-center
          justify-between
          relative
          z-10
          mt-8
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            text-zinc-400
            font-athletic
            text-xs
            uppercase
            tracking-widest
          "
        >

          <Star
            className="
              w-4
              h-4
              text-orange-500
              fill-orange-500
            "
          />

          <span>
            HAND CRAFTED • ALL STAR INGREDIENTS
          </span>

        </div>

        <a
          href="#story-experience"
          className="
            inline-flex
            items-center
            gap-2
            text-zinc-400
            hover:text-orange-500
            transition-colors
            group
            cursor-pointer
            font-athletic
            text-xs
            uppercase
            tracking-wider
          "
        >

          <span>
            SEE "THE STACK" ANATOMY
          </span>

          <ChevronDown
            className="
              w-4
              h-4
              animate-bounce
              text-orange-500
            "
          />

        </a>

      </div>

    </section>
  );
};