import React, { useState } from 'react';
import {
  Flame,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

export const FeaturedFoodSection: React.FC = () => {
  const [activeBoxView, setActiveBoxView] =
    useState<'closed' | 'open'>('open');

  return (
    <section
      id="featured"
      className="
        relative
        overflow-hidden
        bg-[#0d0d0f]
        px-6
        py-24
        text-white
        md:px-12
      "
    >
      {/* =========================================================
          BACKGROUND GLOW
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-1/2
          h-125
          w-125
          -translate-y-1/2
          rounded-full
          bg-orange-600/10
          blur-[160px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-100
          w-100
          rounded-full
          bg-orange-500/5
          blur-[140px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded
              border
              border-orange-500/40
              bg-orange-600/20
              px-3.5
              py-1
              font-athletic
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-orange-400
            "
          >
            <Flame
              className="
                h-4
                w-4
                fill-orange-500
                text-orange-500
              "
            />

            <span>
              SIGNATURE COMBO EXPERIENCE
            </span>
          </div>

          <h2
            className="
              font-stencil
              text-5xl
              font-bold
              uppercase
              leading-none
              tracking-tight
              text-white
              sm:text-7xl
            "
          >
            GAME DAY{' '}
            <span className="text-orange-500">
              COMBO.
            </span>
          </h2>

          <p
            className="
              mt-4
              font-body-clean
              text-base
              leading-relaxed
              text-zinc-400
              md:text-lg
            "
          >
            The complete ASA experience — a premium burger,
            crispy fries, signature sauce and your favorite
            shake, packed together for the ultimate game day.
          </p>
        </div>

        {/* =========================================================
            MAIN FEATURE CARD
        ========================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-10
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-6
            shadow-2xl
            md:p-10
            lg:grid-cols-12
            lg:p-12
          "
        >

          {/* =======================================================
              LEFT — BURGER IMAGE
          ======================================================= */}

          <div className="relative lg:col-span-7">

            <div
              className="
                group
                relative
                h-95
                overflow-hidden
                rounded-xl
                border
                border-zinc-800
                bg-black
                sm:h-112.5
              "
            >

              {activeBoxView === 'open' ? (

                /* =================================================
                   OPEN VIEW
                ================================================= */

                <div className="relative flex h-full w-full items-center justify-center">

                  {/* Background atmosphere */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-[radial-gradient(ellipse_at_center,rgba(80,40,15,0.45)_0%,rgba(5,5,7,1)_75%)]
                    "
                  />

                  {/* Orange spotlight */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-80
                      w-80
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-orange-500/10
                      blur-[110px]
                    "
                  />

                  {/* =================================================
                      YOUR BURGER5 IMAGE
                  ================================================= */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      p-8
                      sm:p-12
                    "
                  >

                    <img
                      src="/burger5.png"
                      alt="ASA Game Day Combo Burger"
                      className="
                        h-full
                        w-full
                        object-contain
                        drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)]
                        transition-transform
                        duration-700
                        group-hover:scale-[1.03]
                      "
                    />

                  </div>

                  {/* Image overlay */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-black
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Product information */}

                  <div
                    className="
                      absolute
                      bottom-5
                      left-5
                      right-5
                      z-20
                      flex
                      items-center
                      justify-between
                      gap-4
                      rounded-xl
                      border
                      border-orange-500/30
                      bg-black/80
                      p-4
                      backdrop-blur-xl
                    "
                  >

                    <div>

                      <span
                        className="
                          mb-1
                          block
                          font-athletic
                          text-[10px]
                          uppercase
                          tracking-[0.2em]
                          text-orange-500
                        "
                      >
                        SIGNATURE GAME DAY MEAL
                      </span>

                      <h4
                        className="
                          font-stencil
                          text-2xl
                          uppercase
                          tracking-wide
                          text-white
                        "
                      >
                        THE ASA FULL SET
                      </h4>

                      <p
                        className="
                          mt-1
                          font-body-clean
                          text-xs
                          text-zinc-300
                        "
                      >
                        Premium burger • Crispy fries • Signature sauce • Shake
                      </p>

                    </div>

                    <div className="shrink-0">

                      <span
                        className="
                          font-stencil
                          text-3xl
                          font-bold
                          text-orange-500
                        "
                      >
                        $22.99
                      </span>

                    </div>

                  </div>

                </div>

              ) : (

                /* =================================================
                   CLOSED VIEW
                ================================================= */

                <div
                  className="
                    relative
                    flex
                    h-full
                    w-full
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-lg
                    border-4
                    border-orange-600/30
                    bg-linear-to-br
                    from-zinc-900
                    via-black
                    to-zinc-950
                    p-8
                    text-center
                  "
                >

                  {/* Orange glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-72
                      w-72
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-orange-600/10
                      blur-[100px]
                    "
                  />

                  <div
                    className="
                      relative
                      z-10
                      mb-5
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-full
                      bg-orange-600
                      shadow-xl
                      shadow-orange-600/30
                    "
                  >
                    <Flame
                      className="
                        h-10
                        w-10
                        fill-white
                        text-white
                      "
                    />
                  </div>

                  <h3
                    className="
                      relative
                      z-10
                      font-stencil
                      text-4xl
                      uppercase
                      tracking-widest
                      text-white
                      md:text-5xl
                    "
                  >
                    ASA
                    <span className="text-orange-500">
                      ∞
                    </span>
                    BURGERS
                  </h3>

                  <p
                    className="
                      relative
                      z-10
                      mt-1
                      font-athletic
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-orange-400
                    "
                  >
                    PREMIUM GAME DAY BOX
                  </p>

                  <p
                    className="
                      relative
                      z-10
                      mt-4
                      max-w-sm
                      font-body-clean
                      text-xs
                      leading-relaxed
                      text-zinc-400
                    "
                  >
                    Everything you need for the ultimate ASA
                    burger experience, packed together in one
                    premium meal.
                  </p>

                </div>
              )}

              {/* =================================================
                  VIEW SWITCHER
              ================================================= */}

              <div
                className="
                  absolute
                  right-4
                  top-4
                  z-30
                  flex
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-zinc-700
                  bg-black/85
                  p-1
                  backdrop-blur-md
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    setActiveBoxView('open')
                  }
                  className={`
                    rounded
                    px-3.5
                    py-1.5
                    font-athletic
                    text-xs
                    uppercase
                    tracking-wider
                    transition-all
                    cursor-pointer
                    ${activeBoxView === 'open'
                      ? 'bg-orange-600 font-bold text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                    }
                  `}
                >
                  BURGER VIEW
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveBoxView('closed')
                  }
                  className={`
                    rounded
                    px-3.5
                    py-1.5
                    font-athletic
                    text-xs
                    uppercase
                    tracking-wider
                    transition-all
                    cursor-pointer
                    ${activeBoxView === 'closed'
                      ? 'bg-orange-600 font-bold text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                    }
                  `}
                >
                  BOX VIEW
                </button>

              </div>

            </div>
          </div>

          {/* =======================================================
              RIGHT — COMBO DETAILS
          ======================================================= */}

          <div
            className="
              flex
              flex-col
              justify-between
              space-y-6
              lg:col-span-5
            "
          >

            <div>

              <span
                className="
                  mb-1
                  block
                  font-athletic
                  text-xs
                  uppercase
                  tracking-widest
                  text-orange-500
                "
              >
                PREMIUM ASA EXPERIENCE
              </span>

              <h3
                className="
                  mb-4
                  font-stencil
                  text-3xl
                  text-white
                  md:text-4xl
                "
              >
                BUILT FOR THE
                <br />
                ULTIMATE
                <span className="text-orange-500">
                  {' '}COMBO.
                </span>
              </h3>

              <p
                className="
                  mb-6
                  font-body-clean
                  text-sm
                  leading-relaxed
                  text-zinc-300
                "
              >
                One premium burger. Golden crispy fries.
                Signature ASA sauce. A cold shake. Everything
                you want in one complete game day experience.
              </p>

            </div>

            {/* =====================================================
                FEATURES
            ===================================================== */}

            <div
              className="
                space-y-4
                border-y
                border-zinc-800
                py-6
              "
            >

              <div className="flex items-center gap-3">

                <ShieldCheck
                  className="
                    h-5
                    w-5
                    shrink-0
                    text-orange-500
                  "
                />

                <span
                  className="
                    font-athletic
                    text-xs
                    uppercase
                    text-zinc-200
                  "
                >
                  PREMIUM BURGER EXPERIENCE
                </span>

              </div>

              <div className="flex items-center gap-3">

                <ShieldCheck
                  className="
                    h-5
                    w-5
                    shrink-0
                    text-orange-500
                  "
                />

                <span
                  className="
                    font-athletic
                    text-xs
                    uppercase
                    text-zinc-200
                  "
                >
                  CRISPY SEASONED ASA FRIES
                </span>

              </div>

              <div className="flex items-center gap-3">

                <ShieldCheck
                  className="
                    h-5
                    w-5
                    shrink-0
                    text-orange-500
                  "
                />

                <span
                  className="
                    font-athletic
                    text-xs
                    uppercase
                    text-zinc-200
                  "
                >
                  SIGNATURE SAUCE & OVERTIME SHAKE
                </span>

              </div>

            </div>

            {/* =====================================================
                PRICE + CTA
            ===================================================== */}

            <div
              className="
                flex
                flex-col
                gap-5
                pt-2
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div>

                <span
                  className="
                    block
                    font-athletic
                    text-[10px]
                    uppercase
                    text-zinc-400
                  "
                >
                  COMPLETE MEAL SET
                </span>

                <span
                  className="
                    font-stencil
                    text-3xl
                    text-orange-500
                  "
                >
                  $22.99
                </span>

              </div>

              <a
                href="#menu"
                className="
                  btn-allstar-primary
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-3.5
                  text-xs
                "
              >
                <ShoppingBag className="h-4 w-4" />

                <span>
                  ORDER COMBO BOX
                </span>
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};