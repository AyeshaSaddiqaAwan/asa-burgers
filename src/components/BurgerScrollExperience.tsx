import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

/* =========================================================
   TYPES
========================================================= */

interface StoryStep {
  id: string;
  minTime: number;
  maxTime: number;
  title: string;
  description: string;
}

interface IngredientCallout {
  id: string;
  name: string;
  desktopSubtitle: string;
  mobileSubtitle: string;
  side: 'left' | 'right';

  /*
   * Position of the ingredient inside the VIDEO.
   * These are percentages.
   */
  topPercent: number;
  burgerX: number;

  /*
   * Position of the callout card.
   */
  desktopLabelX: number;
  tabletLabelX: number;
  mobileLabelX: number;
}

/* =========================================================
   VIDEO SETTINGS
========================================================= */

const DESKTOP_VIDEO_SRC =
  '/burger-scroll.mp4';

const MOBILE_VIDEO_SRC =
  '/burger-scroll-mobile.mp4';

/*
 * IMPORTANT:
 *
 * Desktop center = 5 seconds
 * Mobile center  = 3 seconds
 *
 * At 50% scroll the video will ALWAYS
 * seek to these exact times.
 */
const DESKTOP_CENTER_TIME = 5;
const MOBILE_CENTER_TIME = 3;

/* =========================================================
   STORY STEPS
========================================================= */

const STORY_STEPS: StoryStep[] = [
  {
    id: 'beginning',
    minTime: 0,
    maxTime: 2.0,
    title: 'THE BEGINNING',
    description:
      'Every great burger starts with exceptional ingredients.',
  },

  {
    id: 'bun',
    minTime: 2.0,
    maxTime: 3.5,
    title: 'THE BUN',
    description:
      'Golden toasted brioche',
  },

  {
    id: 'freshness',
    minTime: 3.5,
    maxTime: 4.4,
    title: 'THE FRESHNESS',
    description:
      'Crisp lettuce & fresh ingredients',
  },

  {
    id: 'breakdown',
    minTime: 4.4,
    maxTime: 5.9,
    title: 'INGREDIENT BREAKDOWN',
    description:
      'Deconstructed culinary anatomy',
  },

  {
    id: 'cheese',
    minTime: 5.9,
    maxTime: 7.0,
    title: 'THE CHEESE',
    description:
      'Rich melted cheddar',
  },

  {
    id: 'patty',
    minTime: 7.0,
    maxTime: 8.2,
    title: 'THE PATTY',
    description:
      'Juicy flame-grilled beef',
  },

  {
    id: 'signature',
    minTime: 8.2,
    maxTime: 9.2,
    title: 'THE SIGNATURE',
    description:
      'Our signature house sauce',
  },

  {
    id: 'final-craft',
    minTime: 9.2,
    maxTime: 999,
    title: 'THE FINAL CRAFT',
    description:
      'Every layer. Perfectly balanced.',
  },
];

/* =========================================================
   PREMIUM INGREDIENT CALLOUTS
========================================================= */

const CALLOUTS: IngredientCallout[] = [
  {
    id: 'top-bun',
    name: 'TOP BUN',
    desktopSubtitle:
      'GOLDEN TOASTED BRIOCHE',
    mobileSubtitle:
      'GOLDEN BRIOCHE',
    side: 'right',
    topPercent: 18,
    burgerX: 50,
    desktopLabelX: 78,
    tabletLabelX: 64,
    mobileLabelX: 60,
  },

  {
    id: 'lettuce',
    name: 'LETTUCE',
    desktopSubtitle:
      'CRISP GARDEN LETTUCE',
    mobileSubtitle:
      'CRISP GARDEN',
    side: 'left',
    topPercent: 26,
    burgerX: 50,
    desktopLabelX: 22,
    tabletLabelX: 36,
    mobileLabelX: 40,
  },

  {
    id: 'onion',
    name: 'RED ONION',
    desktopSubtitle:
      'FRESH SLICED RED ONION',
    mobileSubtitle:
      'FRESH SLICED',
    side: 'right',
    topPercent: 34,
    burgerX: 50,
    desktopLabelX: 78,
    tabletLabelX: 64,
    mobileLabelX: 60,
  },

  {
    id: 'tomato',
    name: 'TOMATO',
    desktopSubtitle:
      'RIPE FARM-FRESH TOMATO',
    mobileSubtitle:
      'VINE FRESH',
    side: 'left',
    topPercent: 43,
    burgerX: 50,
    desktopLabelX: 22,
    tabletLabelX: 36,
    mobileLabelX: 40,
  },

  {
    id: 'cheese',
    name: 'CHEDDAR',
    desktopSubtitle:
      'MELTED AGED CHEDDAR',
    mobileSubtitle:
      'AGED CHEESE',
    side: 'right',
    topPercent: 51,
    burgerX: 50,
    desktopLabelX: 78,
    tabletLabelX: 64,
    mobileLabelX: 60,
  },

  {
    id: 'patty',
    name: 'PATTY',
    desktopSubtitle:
      'JUICY FLAME-GRILLED BEEF',
    mobileSubtitle:
      'FLAME-GRILLED',
    side: 'left',
    topPercent: 60,
    burgerX: 50,
    desktopLabelX: 22,
    tabletLabelX: 36,
    mobileLabelX: 40,
  },

  {
    id: 'pickles',
    name: 'PICKLES',
    desktopSubtitle:
      'HOUSE-CUT CRUNCHY PICKLES',
    mobileSubtitle:
      'HOUSE CUT',
    side: 'right',
    topPercent: 68,
    burgerX: 50,
    desktopLabelX: 78,
    tabletLabelX: 64,
    mobileLabelX: 60,
  },

  {
    id: 'bottom-bun',
    name: 'BOTTOM BUN',
    desktopSubtitle:
      'TOASTED BRIOCHE BASE',
    mobileSubtitle:
      'TOASTED BRIOCHE',
    side: 'left',
    topPercent: 77,
    burgerX: 50,
    desktopLabelX: 22,
    tabletLabelX: 36,
    mobileLabelX: 40,
  },
];

/* =========================================================
   MAP SCROLL → VIDEO TIME
========================================================= */

/*
 * This is the important part.
 *
 * 0% scroll  → video start
 * 50% scroll → exact CENTER TIME
 * 100% scroll → video end
 *
 * Therefore:
 *
 * Desktop:
 * 50% = 5 seconds
 *
 * Mobile:
 * 50% = 3 seconds
 */

const progressToVideoTime = (
  progress: number,
  duration: number,
  centerTime: number
) => {
  if (
    duration <= 0 ||
    centerTime <= 0
  ) {
    return 0;
  }

  const p = Math.max(
    0,
    Math.min(1, progress)
  );

  const safeCenter = Math.min(
    centerTime,
    duration
  );

  if (p <= 0.5) {
    return (
      (p / 0.5) *
      safeCenter
    );
  }

  return (
    safeCenter +
    ((p - 0.5) / 0.5) *
    (duration - safeCenter)
  );
};

/* =========================================================
   COMPONENT
========================================================= */

export const BurgerScrollExperience: React.FC =
  () => {
    const containerRef =
      useRef<HTMLDivElement>(null);

    const frameRef =
      useRef<HTMLDivElement>(null);

    const videoRef =
      useRef<HTMLVideoElement>(null);

    const durationRef =
      useRef<number>(0);

    const animFrameRef =
      useRef<number | null>(null);

    /* =====================================================
       STATE
    ===================================================== */

    const [hasError, setHasError] =
      useState(false);

    const [isLoaded, setIsLoaded] =
      useState(false);

    const [activeStepIndex, setActiveStepIndex] =
      useState<number>(0);

    const [currentVideoTime, setCurrentVideoTime] =
      useState<number>(0);

    const [scrollProgress, setScrollProgress] =
      useState<number>(0);

    const [
      containerSize,
      setContainerSize,
    ] = useState<{
      width: number;
      height: number;
    }>({
      width: 0,
      height: 0,
    });

    const [videoAspect, setVideoAspect] =
      useState<number>(16 / 9);

    const [windowWidth, setWindowWidth] =
      useState<number>(
        typeof window !== 'undefined'
          ? window.innerWidth
          : 1200
      );

    /* =====================================================
       RESPONSIVE
    ===================================================== */

    const isMobile =
      windowWidth < 768;

    const isTablet =
      windowWidth >= 768 &&
      windowWidth < 1024;

    /*
     * Desktop uses desktop video.
     * Mobile uses separate mobile video.
     */
    const activeVideoSrc =
      isMobile
        ? MOBILE_VIDEO_SRC
        : DESKTOP_VIDEO_SRC;

    /*
     * Exact center point.
     */
    const centerTime =
      isMobile
        ? MOBILE_CENTER_TIME
        : DESKTOP_CENTER_TIME;

    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(
          window.innerWidth
        );
      };

      window.addEventListener(
        'resize',
        handleResize
      );

      return () => {
        window.removeEventListener(
          'resize',
          handleResize
        );
      };
    }, []);

    /* =====================================================
       OBSERVE VIDEO FRAME
    ===================================================== */

    useEffect(() => {
      if (!frameRef.current) {
        return;
      }

      const observer =
        new ResizeObserver(
          (entries) => {
            for (
              const entry of entries
            ) {
              setContainerSize({
                width:
                  entry.contentRect.width,
                height:
                  entry.contentRect.height,
              });
            }
          }
        );

      observer.observe(
        frameRef.current
      );

      return () => {
        observer.disconnect();
      };
    }, []);

    /* =====================================================
       LOAD VIDEO METADATA
    ===================================================== */

    const handleLoadedMetadata =
      () => {
        const video =
          videoRef.current;

        if (!video) {
          return;
        }

        const duration =
          video.duration;

        if (
          duration &&
          Number.isFinite(duration) &&
          duration > 0
        ) {
          durationRef.current =
            duration;

          setIsLoaded(true);

          video.pause();

          /*
           * Start at beginning.
           */
          try {
            video.currentTime = 0;
          } catch {
            // Ignore seek errors.
          }
        }

        if (
          video.videoWidth &&
          video.videoHeight
        ) {
          setVideoAspect(
            video.videoWidth /
            video.videoHeight
          );
        }
      };

    /* =====================================================
       RESET WHEN MOBILE/DESKTOP VIDEO CHANGES
    ===================================================== */

    useEffect(() => {
      const video =
        videoRef.current;

      if (!video) {
        return;
      }

      setHasError(false);
      setIsLoaded(false);

      durationRef.current = 0;

      try {
        video.pause();
        video.currentTime = 0;
      } catch {
        // Ignore.
      }

      /*
       * Because the <video> has a key based
       * on activeVideoSrc, React will load
       * the new file automatically.
       */
    }, [activeVideoSrc]);

    /* =====================================================
       SCROLL → VIDEO
    ===================================================== */

    useEffect(() => {
      if (!isLoaded) {
        return;
      }

      const updateVideoFrame =
        () => {
          const container =
            containerRef.current;

          const video =
            videoRef.current;

          if (
            !container ||
            !video ||
            durationRef.current <= 0
          ) {
            return;
          }

          const rect =
            container.getBoundingClientRect();

          /*
           * Navbar/sticky offset.
           */
          const navbarHeight =
            window.innerWidth >=
              1024
              ? 72
              : 64;

          const stageHeight =
            window.innerHeight -
            navbarHeight;

          /*
           * Total scroll distance
           * through this experience.
           */
          const scrollableDistance =
            rect.height -
            stageHeight;

          if (
            scrollableDistance <= 0
          ) {
            return;
          }

          /*
           * Section scroll position.
           */
          const scrolled =
            navbarHeight -
            rect.top;

          const rawProgress =
            scrolled /
            scrollableDistance;

          const progress =
            Math.max(
              0,
              Math.min(
                1,
                rawProgress
              )
            );

          setScrollProgress(
            progress
          );

          /*
           * IMPORTANT:
           *
           * This guarantees:
           *
           * Desktop 50% = 5 sec
           * Mobile  50% = 3 sec
           */
          const targetTime =
            progressToVideoTime(
              progress,
              durationRef.current,
              centerTime
            );

          if (
            Math.abs(
              video.currentTime -
              targetTime
            ) > 0.004
          ) {
            try {
              video.currentTime =
                targetTime;
            } catch {
              // Ignore browser seek errors.
            }
          }

          setCurrentVideoTime(
            targetTime
          );

          /* ================================================
             STORY STEP
          ================================================ */

          let stepIdx = 0;

          for (
            let i = 0;
            i < STORY_STEPS.length;
            i++
          ) {
            const step =
              STORY_STEPS[i];

            if (
              targetTime >=
              step.minTime &&
              targetTime <
              step.maxTime
            ) {
              stepIdx = i;
              break;
            }

            if (
              targetTime >=
              step.minTime
            ) {
              stepIdx = i;
            }
          }

          setActiveStepIndex(
            (previous) =>
              previous !== stepIdx
                ? stepIdx
                : previous
          );
        };

      const onScroll = () => {
        if (
          animFrameRef.current !==
          null
        ) {
          cancelAnimationFrame(
            animFrameRef.current
          );
        }

        animFrameRef.current =
          requestAnimationFrame(
            updateVideoFrame
          );
      };

      window.addEventListener(
        'scroll',
        onScroll,
        { passive: true }
      );

      window.addEventListener(
        'resize',
        onScroll,
        { passive: true }
      );

      updateVideoFrame();

      return () => {
        window.removeEventListener(
          'scroll',
          onScroll
        );

        window.removeEventListener(
          'resize',
          onScroll
        );

        if (
          animFrameRef.current !==
          null
        ) {
          cancelAnimationFrame(
            animFrameRef.current
          );
        }
      };
    }, [
      isLoaded,
      centerTime,
    ]);

    /* =====================================================
       CALCULATE ACTUAL VIDEO BOUNDS
    ===================================================== */

    let renderedWidth =
      containerSize.width;

    let renderedHeight =
      containerSize.height;

    let renderedLeft = 0;

    let renderedTop = 0;

    /*
     * Desktop:
     * contain
     *
     * Mobile/tablet:
     * cover
     */
    const fitMode =
      isMobile || isTablet
        ? 'cover'
        : 'contain';

    if (
      containerSize.width > 0 &&
      containerSize.height > 0 &&
      videoAspect > 0
    ) {
      const containerAspect =
        containerSize.width /
        containerSize.height;

      if (
        fitMode === 'cover'
      ) {
        if (
          containerAspect >
          videoAspect
        ) {
          renderedWidth =
            containerSize.width;

          renderedHeight =
            containerSize.width /
            videoAspect;

          renderedLeft = 0;

          renderedTop =
            (
              containerSize.height -
              renderedHeight
            ) / 2;
        } else {
          renderedHeight =
            containerSize.height;

          renderedWidth =
            containerSize.height *
            videoAspect;

          renderedLeft =
            (
              containerSize.width -
              renderedWidth
            ) / 2;

          renderedTop = 0;
        }
      } else {
        /*
         * Desktop contain.
         */
        if (
          containerAspect >
          videoAspect
        ) {
          renderedHeight =
            containerSize.height;

          renderedWidth =
            containerSize.height *
            videoAspect;

          renderedLeft =
            (
              containerSize.width -
              renderedWidth
            ) / 2;

          renderedTop = 0;
        } else {
          renderedWidth =
            containerSize.width;

          renderedHeight =
            containerSize.width /
            videoAspect;

          renderedLeft = 0;

          renderedTop =
            (
              containerSize.height -
              renderedHeight
            ) / 2;
        }
      }
    }

    /* =====================================================
       PREMIUM BREAKDOWN WINDOW
    ===================================================== */

    /*
     * The callouts are centered around the
     * exact center time.
     *
     * Desktop:
     * center = 5s
     * window ≈ 4.15s → 5.85s
     *
     * Mobile:
     * center = 3s
     * window ≈ 2.15s → 3.85s
     */
    const breakdownWindow =
      isMobile
        ? 0.85
        : 0.85;

    const isBreakdownActive =
      currentVideoTime >=
      centerTime -
      breakdownWindow &&
      currentVideoTime <=
      centerTime +
      breakdownWindow;

    /* =====================================================
       RENDER
    ===================================================== */

    return (
      <section
        id="story-experience"
        ref={containerRef}
        className="
          burger-scroll-section
          relative
          w-full
          h-[700vh]
          bg-[#030202]
        "
      >
        {/* ===================================================
            STICKY STAGE
        =================================================== */}

        <div
          className="
            burger-sticky-stage
            sticky
            top-16
            lg:top-18

            w-full
            h-[calc(100vh-64px)]
            lg:h-[calc(100vh-72px)]

            overflow-hidden

            bg-[#030202]

            select-none

            z-10

            p-0
          "
        >

          {/* =================================================
              AMBIENT BACKGROUND
          ================================================= */}

          <div
            className="
              absolute
              inset-0

              bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))]

              from-[#1a110a]
              via-[#0b0704]
              to-[#020101]

              opacity-95

              pointer-events-none
            "
          />

          <div
            className="
              absolute

              -top-32
              left-1/2
              -translate-x-1/2

              w-250
              h-150

              bg-amber-600/10

              rounded-full

              blur-[160px]

              pointer-events-none
            "
          />

          <div
            className="
              absolute

              top-1/2
              left-1/2

              -translate-x-1/2
              -translate-y-1/2

              w-175
              h-175

              bg-amber-700/8

              rounded-full

              blur-[180px]

              pointer-events-none
            "
          />

          <div
            className="
              absolute
              inset-0

              bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.88)_100%)]

              pointer-events-none
            "
          />

          {/* =================================================
              TOP PROGRESS LINE
          ================================================= */}

          <div
            className="
              absolute
              top-0
              left-0
              right-0

              h-px

              bg-[#8b5e16]/30

              z-60

              pointer-events-none
            "
          >
            <div
              className="
                h-full

                bg-linear-to-r
                from-[#8b5e16]
                via-[#e4bd5d]
                to-[#f6dda0]

                shadow-[0_0_12px_rgba(228,189,93,0.55)]

                transition-all
                duration-75
              "
              style={{
                width: `${Math.min(
                  100,
                  Math.max(
                    0,
                    scrollProgress * 100
                  )
                )}%`,
              }}
            />
          </div>

          {/* =================================================
              VIDEO FRAME
          ================================================= */}

          <div
            ref={frameRef}
            className="
              burger-video-frame

              absolute
              inset-0

              w-full
              h-full

              flex
              items-center
              justify-center

              overflow-hidden
            "
          >

            {/* =================================================
                VIDEO
            ================================================= */}

            {hasError ? (
              <div
                className="
                  relative
                  z-50

                  text-center

                  p-6

                  bg-red-950/80

                  border
                  border-red-500/50

                  rounded-xl

                  max-w-md

                  shadow-2xl
                "
              >
                <p
                  className="
                    text-red-400

                    font-bold
                    text-lg

                    font-mono
                  "
                >
                  {isMobile
                    ? 'burger-scroll-mobile.mp4 could not be loaded'
                    : 'burger-scroll.mp4 could not be loaded'}
                </p>
              </div>
            ) : (
              <video
                key={activeVideoSrc}
                ref={videoRef}
                src={activeVideoSrc}
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={
                  handleLoadedMetadata
                }
                onError={() =>
                  setHasError(true)
                }
                className={`
                  burger-video

                  block

                  w-full
                  h-full

                  object-center

                  pointer-events-none

                  drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]

                  ${fitMode === 'cover'
                    ? 'object-cover'
                    : 'object-contain'
                  }
                `}
              />
            )}

            {/* =================================================
                PREMIUM INGREDIENT OVERLAY
            ================================================= */}

            {!hasError &&
              renderedWidth > 0 &&
              renderedHeight > 0 && (
                <div
                  className={`
                    ingredient-overlay

                    absolute

                    pointer-events-none

                    z-40

                    transition-opacity
                    duration-500

                    ${isBreakdownActive
                      ? 'opacity-100'
                      : 'opacity-0'
                    }
                  `}
                  style={{
                    width: `${renderedWidth}px`,
                    height: `${renderedHeight}px`,
                    left: `${renderedLeft}px`,
                    top: `${renderedTop}px`,
                  }}
                >

                  {/* =========================================
                      SVG DEFINITION
                  ========================================= */}

                  <svg
                    className="absolute inset-0 w-full
    h-full
    overflow-visible

    pointer-events-none

    z-40

    hidden
    md:block
                    "
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                    style={{
                      overflow:
                        'visible',
                    }}
                  >

                    <defs>

                      {/* =======================================
                          PREMIUM GOLD
                      ======================================= */}

                      <linearGradient
                        id="premiumGold"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#806018"
                          stopOpacity="0.35"
                        />

                        <stop
                          offset="25%"
                          stopColor="#B9892C"
                          stopOpacity="0.75"
                        />

                        <stop
                          offset="50%"
                          stopColor="#F3D57A"
                          stopOpacity="1"
                        />

                        <stop
                          offset="75%"
                          stopColor="#D1A840"
                          stopOpacity="0.85"
                        />

                        <stop
                          offset="100%"
                          stopColor="#8D6518"
                          stopOpacity="0.45"
                        />
                      </linearGradient>

                      {/* =======================================
                          PIN GLOW
                      ======================================= */}

                      <radialGradient
                        id="pinGlow"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FFF0B5"
                          stopOpacity="0.95"
                        />

                        <stop
                          offset="35%"
                          stopColor="#E7B94F"
                          stopOpacity="0.55"
                        />

                        <stop
                          offset="100%"
                          stopColor="#A87518"
                          stopOpacity="0"
                        />
                      </radialGradient>

                      {/* =======================================
                          GOLD LINE GLOW
                      ======================================= */}

                      <filter
                        id="goldGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur
                          stdDeviation="1.8"
                          result="blur"
                        />

                        <feMerge>
                          <feMergeNode
                            in="blur"
                          />

                          <feMergeNode
                            in="SourceGraphic"
                          />
                        </feMerge>
                      </filter>

                    </defs>

                    {/* =========================================
                        CALLOUT CONNECTORS
                    ========================================= */}

                    {CALLOUTS.map(
                      (
                        callout,
                        index
                      ) => {
                        const isRight =
                          callout.side ===
                          'right';

                        const activeLabelX =
                          isMobile
                            ? callout.mobileLabelX
                            : isTablet
                              ? callout.tabletLabelX
                              : callout.desktopLabelX;

                        const targetX =
                          callout.burgerX *
                          10;

                        const targetY =
                          callout.topPercent *
                          10;

                        const cardX =
                          activeLabelX *
                          10;

                        /*
                         * Create a short elbow
                         * before reaching the card.
                         */
                        const elbowDistance =
                          isMobile
                            ? 38
                            : isTablet
                              ? 55
                              : 72;

                        const elbowX =
                          isRight
                            ? cardX -
                            elbowDistance
                            : cardX +
                            elbowDistance;

                        /*
                         * Stop the line slightly
                         * before the card.
                         */
                        const cardGap =
                          isMobile
                            ? 8
                            : 11;

                        const lineEndX =
                          isRight
                            ? cardX -
                            cardGap
                            : cardX +
                            cardGap;

                        return (
                          <g
                            key={
                              callout.id
                            }
                            style={{
                              opacity:
                                isBreakdownActive
                                  ? 1
                                  : 0,

                              transition:
                                `opacity 450ms ease ${index * 35
                                }ms`,
                            }}
                          >

                            {/* =================================
                                SOFT PIN HALO
                            ================================= */}

                            <circle
                              cx={targetX}
                              cy={targetY}
                              r={
                                isMobile
                                  ? 15
                                  : 20
                              }
                              fill="url(#pinGlow)"
                              opacity="0.38"
                            />

                            {/* =================================
                                PRECISION OUTER PIN
                            ================================= */}

                            <circle
                              cx={targetX}
                              cy={targetY}
                              r={
                                isMobile
                                  ? 6
                                  : 7
                              }
                              fill="#080604"
                              stroke="#D5A83E"
                              strokeWidth={
                                isMobile
                                  ? 1
                                  : 1.15
                              }
                            />

                            {/* =================================
                                PIN CENTER
                            ================================= */}

                            <circle
                              cx={targetX}
                              cy={targetY}
                              r={
                                isMobile
                                  ? 2
                                  : 2.4
                              }
                              fill="#FFE7A0"
                              filter="url(#goldGlow)"
                            />

                            {/* =================================
                                PRECISION CROSSHAIR
                            ================================= */}

                            <line
                              x1={
                                targetX -
                                10
                              }
                              y1={
                                targetY
                              }
                              x2={
                                targetX +
                                10
                              }
                              y2={
                                targetY
                              }
                              stroke="#D6AA46"
                              strokeWidth="0.55"
                              opacity="0.55"
                            />

                            <line
                              x1={
                                targetX
                              }
                              y1={
                                targetY -
                                10
                              }
                              x2={
                                targetX
                              }
                              y2={
                                targetY +
                                10
                              }
                              stroke="#D6AA46"
                              strokeWidth="0.55"
                              opacity="0.55"
                            />

                            {/* =================================
                                MAIN PREMIUM LINE
                            ================================= */}

                            <path
                              d={`
                                M ${targetX} ${targetY}

                                L ${elbowX} ${targetY}

                                L ${lineEndX} ${targetY}
                              `}
                              fill="none"
                              stroke="url(#premiumGold)"
                              strokeWidth={
                                isMobile
                                  ? 1
                                  : 1.2
                              }
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              filter="url(#goldGlow)"
                              vectorEffect="non-scaling-stroke"
                            />

                            {/* =================================
                                BRIGHT CORE
                            ================================= */}

                            <path
                              d={`
                                M ${targetX} ${targetY}

                                L ${elbowX} ${targetY}

                                L ${lineEndX} ${targetY}
                              `}
                              fill="none"
                              stroke="#F7DA80"
                              strokeWidth={
                                isMobile
                                  ? 0.45
                                  : 0.55
                              }
                              strokeLinecap="round"
                              opacity="0.92"
                              vectorEffect="non-scaling-stroke"
                            />

                            {/* =================================
                                CARD TERMINAL
                            ================================= */}

                            <line
                              x1={
                                lineEndX
                              }
                              y1={
                                targetY -
                                6
                              }
                              x2={
                                lineEndX
                              }
                              y2={
                                targetY +
                                6
                              }
                              stroke="#E7BE59"
                              strokeWidth={
                                isMobile
                                  ? 0.8
                                  : 1
                              }
                              opacity="0.8"
                              vectorEffect="non-scaling-stroke"
                            />

                            {/* =================================
                                TERMINAL DOT
                            ================================= */}

                            <circle
                              cx={
                                lineEndX
                              }
                              cy={
                                targetY
                              }
                              r={
                                isMobile
                                  ? 1.4
                                  : 1.8
                              }
                              fill="#FFE6A0"
                            />

                          </g>
                        );
                      }
                    )}
                  </svg>
                  {/* =========================================================
    MOBILE PREMIUM INGREDIENT CALLOUTS
    No cards.
    No large boxes.
    Pin + short line + text only.
========================================================= */}

                  <div
                    className={`
    absolute
    inset-0

    z-50

    pointer-events-none

    md:hidden

    transition-opacity
    duration-500

    ${isBreakdownActive
                        ? 'opacity-100'
                        : 'opacity-0'
                      }
  `}
                  >
                    {CALLOUTS.map(
                      (callout, index) => {
                        const isRight =
                          callout.side === 'right';

                        /*
                         * Keep labels close to the
                         * burger but outside its main body.
                         */
                        const labelLeft =
                          isRight ? '54%' : 'auto';

                        const labelRight =
                          isRight ? 'auto' : '54%';

                        return (
                          <div
                            key={`mobile-${callout.id}`}
                            className="
            absolute

            -translate-y-1/2

            flex
            items-center

            pointer-events-none

            transition-all
            duration-500
            ease-out
          "
                            style={{
                              top: `${callout.topPercent}%`,

                              left: labelLeft,
                              right: labelRight,

                              transform:
                                isBreakdownActive
                                  ? 'translateY(-50%)'
                                  : 'translateY(calc(-50% + 10px))',

                              transitionDelay:
                                `${index * 45}ms`,
                            }}
                          >

                            {/* =================================================
              LEFT-SIDE LABEL
          ================================================= */}

                            {!isRight && (
                              <>
                                {/* Text */}
                                <div
                                  className="
                  text-right

                  whitespace-nowrap

                  mr-2
                "
                                >
                                  <div
                                    className="
                    font-mono
                    font-bold

                    uppercase

                    text-[8px]

                    tracking-[0.18em]

                    leading-none

                    text-[#FFF8E7]

                    drop-shadow-[0_2px_6px_rgba(0,0,0,1)]
                  "
                                  >
                                    {callout.name}
                                  </div>

                                  <div
                                    className="
                    mt-1

                    font-mono

                    uppercase

                    text-[5px]

                    tracking-[0.08em]

                    leading-none

                    text-[#FFD978]

                    drop-shadow-[0_2px_5px_rgba(0,0,0,1)]
                  "
                                  >
                                    {callout.mobileSubtitle}
                                  </div>
                                </div>

                                {/* Short connector */}
                                <div
                                  className="
                  w-5

                  h-px

                  bg-linear-to-l
                  from-[#F1D06C]
                  to-[#9C711D]

                  shadow-[0_0_5px_rgba(229,190,82,0.7)]
                "
                                />

                                {/* Pin */}
                                <div
                                  className="
                  relative

                  shrink-0

                  w-2.75
                  h-2.75

                  rounded-full

                  bg-[#050403]

                  border
                  border-[#E2BC58]

                  shadow-[0_0_10px_rgba(229,190,82,0.75)]

                  flex
                  items-center
                  justify-center
                "
                                >
                                  <div
                                    className="
                    w-0.75
                    h-0.75

                    rounded-full

                    bg-[#FFE9A3]

                    shadow-[0_0_7px_rgba(255,233,163,1)]
                  "
                                  />
                                </div>
                              </>
                            )}

                            {/* =================================================
              RIGHT-SIDE LABEL
          ================================================= */}

                            {isRight && (
                              <>
                                {/* Pin */}
                                <div
                                  className="
                  relative

                  shrink-0

                  w-2.75
                  h-2.75

                  rounded-full

                  bg-[#050403]

                  border
                  border-[#E2BC58]

                  shadow-[0_0_10px_rgba(229,190,82,0.75)]

                  flex
                  items-center
                  justify-center
                "
                                >
                                  <div
                                    className="
                    w-0.75
                    h-0.75

                    rounded-full

                    bg-[#FFE9A3]

                    shadow-[0_0_7px_rgba(255,233,163,1)]
                  "
                                  />
                                </div>

                                {/* Short connector */}
                                <div
                                  className="
                  w-5

                  h-px

                  bg-linear-to-r
                  from-[#9C711D]
                  to-[#F1D06C]

                  shadow-[0_0_5px_rgba(229,190,82,0.7)]
                "
                                />

                                {/* Text */}
                                <div
                                  className="
                  text-left

                  whitespace-nowrap

                  ml-2
                "
                                >
                                  <div
                                    className="
                    font-mono
                    font-bold

                    uppercase

                    text-[8px]

                    tracking-[0.18em]

                    leading-none

                    text-[#FFF8E7]

                    drop-shadow-[0_2px_6px_rgba(0,0,0,1)]
                  "
                                  >
                                    {callout.name}
                                  </div>

                                  <div
                                    className="
                    mt-1

                    font-mono

                    uppercase

                    text-[5px]

                    tracking-[0.08em]

                    leading-none

                    text-[#FFD978]

                    drop-shadow-[0_2px_5px_rgba(0,0,0,1)]
                  "
                                  >
                                    {callout.mobileSubtitle}
                                  </div>
                                </div>
                              </>
                            )}

                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* =================================================
                      PREMIUM CALLOUT CARDS
                  ================================================= */}

                  <div
                    className="
    absolute
    inset-0

    w-full
    h-full

    pointer-events-none

    z-50

    hidden
    md:block
  "
                  >

                    {CALLOUTS.map(
                      (
                        callout,
                        index
                      ) => {
                        const isRight =
                          callout.side ===
                          'right';

                        const activeLabelX =
                          isMobile
                            ? callout.mobileLabelX
                            : isTablet
                              ? callout.tabletLabelX
                              : callout.desktopLabelX;

                        const subtitle =
                          isMobile
                            ? callout.mobileSubtitle
                            : callout.desktopSubtitle;

                        return (
                          <div
                            key={
                              callout.id
                            }
                            className={`
                              absolute

                              ${isBreakdownActive
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-2'
                              }

                              transition-all
                              duration-500
                              ease-out

                              ${isRight
                                ? 'text-left'
                                : 'text-right'
                              }
                            `}
                            style={{
                              top: `${callout.topPercent}%`,

                              left:
                                isRight
                                  ? `${activeLabelX}%`
                                  : 'auto',

                              right:
                                isRight
                                  ? 'auto'
                                  : `${100 - activeLabelX}%`,

                              transform:
                                'translateY(-50%)',

                              transitionDelay:
                                `${index * 35}ms`,
                            }}
                          >

                            {/* =================================
                                CARD
                            ================================= */}

                            <div
                              className="
                                relative
                              "
                            >

                              {/* ===============================
                                  GLASS CARD
                              =============================== */}

                              <div
                                className={`
                                  relative

                                  flex
                                  flex-col

                                  ${isRight
                                    ? 'items-start'
                                    : 'items-end'
                                  }

                                  overflow-hidden

                                  min-w-41.25
                                  sm:min-w-47.5
                                  lg:min-w-51.25

                                  bg-[#070605]/90

                                  backdrop-blur-xl

                                  border
                                  border-[#B98A2E]/55

                                  rounded-lg

                                  shadow-[0_12px_35px_rgba(0,0,0,0.75)]

                                  ${isMobile
                                    ? 'px-2.5 py-2'
                                    : isTablet
                                      ? 'px-3.5 py-2.5'
                                      : 'px-4 py-3'
                                  }
                                `}
                              >

                                {/* =============================
                                    TOP LUXURY HIGHLIGHT
                                ============================= */}

                                <div
                                  className="
                                    absolute
                                    top-0
                                    left-0
                                    right-0

                                    h-px

                                    bg-linear-to-r
                                    from-transparent
                                    via-[#F0D27D]
                                    to-transparent

                                    opacity-75
                                  "
                                />

                                {/* =============================
                                    INNER GOLD WASH
                                ============================= */}

                                <div
                                  className="
                                    absolute
                                    inset-0

                                    bg-linear-to-br
                                    from-amber-300/4.5
                                    via-transparent
                                    to-transparent

                                    pointer-events-none
                                  "
                                />

                                {/* =============================
                                    CORNER DETAILS
                                ============================= */}

                                <div
                                  className={`
                                    absolute
                                    top-0

                                    ${isRight
                                      ? 'right-0'
                                      : 'left-0'
                                    }

                                    w-3
                                    h-3

                                    border-t
                                    border-[#E5C76C]/75

                                    ${isRight
                                      ? 'border-r'
                                      : 'border-l'
                                    }
                                  `}
                                />

                                <div
                                  className={`
                                    absolute
                                    bottom-0

                                    ${isRight
                                      ? 'left-0'
                                      : 'right-0'
                                    }

                                    w-3
                                    h-3

                                    border-b
                                    border-[#B8892B]/45

                                    ${isRight
                                      ? 'border-l'
                                      : 'border-r'
                                    }
                                  `}
                                />

                                {/* =============================
                                    MICRO LABEL
                                ============================= */}

                                <div
                                  className={`
                                    relative

                                    flex
                                    items-center
                                    gap-1.5

                                    mb-1.5

                                    ${isRight
                                      ? 'justify-start'
                                      : 'justify-end'
                                    }
                                  `}
                                >

                                  <span
                                    className="
                                      w-1
                                      h-1

                                      rounded-full

                                      bg-[#E7C35E]

                                      shadow-[0_0_8px_rgba(231,195,94,0.75)]
                                    "
                                  />

                                  <span
                                    className="
                                      font-mono

                                      text-[6px]
                                      sm:text-[7px]

                                      uppercase

                                      tracking-[0.3em]

                                      text-[#A88642]
                                    "
                                  >
                                    INGREDIENT
                                  </span>
                                </div>

                                {/* =============================
                                    TITLE
                                ============================= */}

                                <div
                                  className="
                                    relative

                                    font-mono
                                    font-bold

                                    uppercase

                                    leading-none

                                    tracking-[0.24em]

                                    text-[#F7E7B0]

                                    whitespace-nowrap

                                    drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]
                                  "
                                  style={{
                                    fontSize:
                                      isMobile
                                        ? '8.5px'
                                        : isTablet
                                          ? '10px'
                                          : '12px',
                                  }}
                                >
                                  {
                                    callout.name
                                  }
                                </div>

                                {/* =============================
                                    SUBTITLE
                                ============================= */}

                                <div
                                  className="
                                    relative

                                    mt-1.5

                                    font-mono

                                    uppercase

                                    tracking-[0.13em]

                                    leading-none

                                    text-[#C89B3B]

                                    whitespace-nowrap
                                  "
                                  style={{
                                    fontSize:
                                      isMobile
                                        ? '5.5px'
                                        : isTablet
                                          ? '6.5px'
                                          : '8px',
                                  }}
                                >
                                  {
                                    subtitle
                                  }
                                </div>

                                {/* =============================
                                    BOTTOM DETAIL LINE
                                ============================= */}

                                <div
                                  className={`
                                    relative

                                    mt-2

                                    h-px
                                    w-8

                                    bg-[#C59A3A]/35

                                    ${isRight
                                      ? 'self-start'
                                      : 'self-end'
                                    }
                                  `}
                                />

                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

            {/* =================================================
                STORY BANNER
            ================================================= */}

            {!hasError && (
              <div
                className={`
                  story-overlay

                  absolute

                  bottom-4
                  sm:bottom-8

                  left-4
                  right-4

                  sm:left-6
                  sm:right-6

                  z-30

                  pointer-events-none

                  transition-all
                  duration-500
                  ease-out

                  ${isBreakdownActive
                    ? 'opacity-0 scale-95'
                    : 'opacity-100 scale-100'
                  }
                `}
              >

                <div
                  className="
                    relative

                    min-h-20
                    sm:min-h-25

                    w-full

                    flex
                    items-end
                  "
                >

                  {STORY_STEPS.map(
                    (
                      step,
                      idx
                    ) => {
                      const isActive =
                        idx ===
                        activeStepIndex;

                      const isFromLeft =
                        idx % 2 ===
                        0;

                      return (
                        <div
                          key={
                            step.id
                          }
                          className={`
                            w-full

                            max-w-sm
                            sm:max-w-lg

                            transition-all
                            duration-500
                            ease-out

                            ${isFromLeft
                              ? 'md:mr-auto md:ml-6'
                              : 'md:ml-auto md:mr-6'
                            }

                            ${isActive
                              ? 'opacity-100 translate-x-0 translate-y-0 relative'
                              : isFromLeft
                                ? 'opacity-0 -translate-x-12 sm:-translate-x-16 translate-y-2 absolute inset-0 pointer-events-none'
                                : 'opacity-0 translate-x-12 sm:translate-x-16 translate-y-2 absolute inset-0 pointer-events-none'
                            }
                          `}
                        >

                          <div
                            className="
                              p-2
                              sm:p-3
                            "
                          >

                            <div
                              className={`
                                flex
                                items-center
                                gap-2
                                sm:gap-2.5

                                mb-1

                                ${isFromLeft
                                  ? 'justify-start'
                                  : 'justify-start md:justify-end'
                                }
                              `}
                            >

                              <span
                                className="
                                  w-1.5
                                  h-1.5

                                  sm:w-2
                                  sm:h-2

                                  rounded-full

                                  bg-orange-500

                                  shadow-[0_0_10px_rgba(249,115,22,0.9)]

                                  animate-pulse
                                "
                              />

                              <span
                                className="
                                  font-mono

                                  tracking-[0.25em]

                                  text-xs
                                  sm:text-sm

                                  uppercase

                                  text-orange-400

                                  font-bold

                                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
                                "
                              >
                                {
                                  step.title
                                }
                              </span>

                            </div>

                            <p
                              className={`
                                font-athletic

                                text-lg
                                sm:text-2xl
                                md:text-3xl

                                text-white

                                tracking-wide

                                leading-snug

                                uppercase

                                drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]

                                ${isFromLeft
                                  ? 'text-left'
                                  : 'text-left md:text-right'
                                }
                              `}
                            >
                              {
                                step.description
                              }
                            </p>

                          </div>
                        </div>
                      );
                    }
                  )}

                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    );
  };