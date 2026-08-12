import React, { useEffect, useRef, useState } from 'react';

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
  topPercent: number; // Y% relative to video frame
  burgerX: number; // X% relative to video frame
  desktopLabelX: number; // X% for desktop
  tabletLabelX: number; // X% for tablet
  mobileLabelX: number; // X% for mobile
}

const STORY_STEPS: StoryStep[] = [
  {
    id: 'beginning',
    minTime: 0,
    maxTime: 2.4,
    title: 'THE BEGINNING',
    description: 'Every great burger starts with exceptional ingredients.',
  },
  {
    id: 'bun',
    minTime: 2.4,
    maxTime: 4.8,
    title: 'THE BUN',
    description: 'Golden toasted brioche',
  },
  {
    id: 'freshness',
    minTime: 4.8,
    maxTime: 6.7,
    title: 'THE FRESHNESS',
    description: 'Crisp lettuce & fresh ingredients',
  },
  {
    id: 'breakdown',
    minTime: 6.7,
    maxTime: 8.0,
    title: 'INGREDIENT BREAKDOWN',
    description: 'Deconstructed culinary anatomy',
  },
  {
    id: 'cheese',
    minTime: 8.0,
    maxTime: 9.6,
    title: 'THE CHEESE',
    description: 'Rich melted cheddar',
  },
  {
    id: 'patty',
    minTime: 9.6,
    maxTime: 12.0,
    title: 'THE PATTY',
    description: 'Juicy flame-grilled beef',
  },
  {
    id: 'signature',
    minTime: 12.0,
    maxTime: 14.0,
    title: 'THE SIGNATURE',
    description: 'Our signature house sauce',
  },
  {
    id: 'final-craft',
    minTime: 14.0,
    maxTime: 16.0,
    title: 'THE FINAL CRAFT',
    description: 'Every layer. Perfectly balanced.',
  },
];

// Normalized ingredient positions anchored directly to the video coordinate space
const CALLOUTS: IngredientCallout[] = [
  {
    id: 'top-bun',
    name: 'TOP BUN',
    desktopSubtitle: 'GOLDEN TOASTED BRIOCHE',
    mobileSubtitle: 'GOLDEN BRIOCHE',
    side: 'right',
    topPercent: 18,
    burgerX: 50,
    desktopLabelX: 78,
    tabletLabelX: 63,
    mobileLabelX: 58,
  },
  {
    id: 'lettuce',
    name: 'LETTUCE',
    desktopSubtitle: 'CRISP GARDEN LETTUCE',
    mobileSubtitle: 'CRISP GARDEN',
    side: 'left',
    topPercent: 26,
    burgerX: 50,
    desktopLabelX: 22,
    tabletLabelX: 37,
    mobileLabelX: 42,
  },
  {
    id: 'onion',
    name: 'RED ONION',
    desktopSubtitle: 'FRESH SLICED RED ONION',
    mobileSubtitle: 'FRESH SLICED',
    side: 'right',
    topPercent: 34,
    burgerX: 50,
    desktopLabelX: 78,
    tabletLabelX: 63,
    mobileLabelX: 58,
  },
  {
    id: 'tomato',
    name: 'TOMATO',
    desktopSubtitle: 'RIPE FARM-FRESH TOMATO',
    mobileSubtitle: 'VINE FRESH',
    side: 'left',
    topPercent: 43,
    burgerX: 50,
    desktopLabelX: 22,
    tabletLabelX: 37,
    mobileLabelX: 42,
  },
  {
    id: 'cheese',
    name: 'CHEDDAR',
    desktopSubtitle: 'MELTED AGED CHEDDAR',
    mobileSubtitle: 'AGED CHEESE',
    side: 'right',
    topPercent: 51,
    burgerX: 50,
    desktopLabelX: 78,
    tabletLabelX: 63,
    mobileLabelX: 58,
  },
  {
    id: 'patty',
    name: 'PATTY',
    desktopSubtitle: 'JUICY FLAME-GRILLED BEEF',
    mobileSubtitle: 'FLAME-GRILLED',
    side: 'left',
    topPercent: 60,
    burgerX: 50,
    desktopLabelX: 22,
    tabletLabelX: 37,
    mobileLabelX: 42,
  },
  {
    id: 'pickles',
    name: 'PICKLES',
    desktopSubtitle: 'HOUSE-CUT CRUNCHY PICKLES',
    mobileSubtitle: 'HOUSE CUT',
    side: 'right',
    topPercent: 68,
    burgerX: 50,
    desktopLabelX: 78,
    tabletLabelX: 63,
    mobileLabelX: 58,
  },
  {
    id: 'bottom-bun',
    name: 'BOTTOM BUN',
    desktopSubtitle: 'TOASTED BRIOCHE BASE',
    mobileSubtitle: 'TOASTED BRIOCHE',
    side: 'left',
    topPercent: 77,
    burgerX: 50,
    desktopLabelX: 22,
    tabletLabelX: 37,
    mobileLabelX: 42,
  },
];

export const BurgerScrollExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [currentScaledTime, setCurrentScaledTime] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const durationRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Video container & rendered aspect ratio calculation
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [videoAspect, setVideoAspect] = useState<number>(16 / 9);

  // Screen size tracking for text density & label coordinate spacing
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Observe video container dimensions to compute exact object-fit: contain bounds
  useEffect(() => {
    if (!frameRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (dur && !isNaN(dur) && dur > 0) {
        durationRef.current = dur;
        setIsLoaded(true);
        videoRef.current.pause();
      }
      if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
        setVideoAspect(videoRef.current.videoWidth / videoRef.current.videoHeight);
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.duration > 0) {
        durationRef.current = videoRef.current.duration;
        setIsLoaded(true);
        videoRef.current.pause();
      }
      if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
        setVideoAspect(videoRef.current.videoWidth / videoRef.current.videoHeight);
      }
    }
  }, []);

  useEffect(() => {
    const updateVideoFrame = () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video || durationRef.current <= 0) return;

      const rect = container.getBoundingClientRect();
      const navbarHeight = window.innerWidth >= 1024 ? 72 : 64;
      const stageHeight = window.innerHeight - navbarHeight;
      const scrollableDistance = rect.height - stageHeight;

      if (scrollableDistance > 0) {
        const scrolled = navbarHeight - rect.top;
        const rawProgress = scrolled / scrollableDistance;
        const progress = Math.max(0, Math.min(1, rawProgress));
        setScrollProgress(progress);

        const targetTime = progress * durationRef.current;

        // Synchronize video timeline strictly to scroll position
        if (Math.abs(video.currentTime - targetTime) > 0.005) {
          video.currentTime = targetTime;
        }

        // Normalized 16-second master timeline calculation
        const scaledTime = (targetTime / durationRef.current) * 16;
        setCurrentScaledTime(scaledTime);

        let stepIdx = 0;
        if (scaledTime >= 14.0) stepIdx = 7;
        else if (scaledTime >= 12.0) stepIdx = 6;
        else if (scaledTime >= 9.6) stepIdx = 5;
        else if (scaledTime >= 8.0) stepIdx = 4;
        else if (scaledTime >= 6.7) stepIdx = 3;
        else if (scaledTime >= 4.8) stepIdx = 2;
        else if (scaledTime >= 2.4) stepIdx = 1;
        else stepIdx = 0;

        setActiveStepIndex((prev) => (prev !== stepIdx ? stepIdx : prev));
      }
    };

    const onScroll = () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(updateVideoFrame);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateVideoFrame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isLoaded]);

  // Compute exact rendered video box inside container (object-fit auto-shift for phones/tablets)
  let renderedWidth = containerSize.width;
  let renderedHeight = containerSize.height;
  let renderedLeft = 0;
  let renderedTop = 0;

  const fitMode = (isMobile || isTablet) ? 'cover' : 'contain';

  if (containerSize.width > 0 && containerSize.height > 0 && videoAspect > 0) {
    const containerAspect = containerSize.width / containerSize.height;

    if (fitMode === 'cover') {
      if (containerAspect > videoAspect) {
        renderedWidth = containerSize.width;
        renderedHeight = containerSize.width / videoAspect;
        renderedLeft = 0;
        renderedTop = (containerSize.height - renderedHeight) / 2;
      } else {
        // Phone / Tablet tall portrait aspect ratio: height fills stage, width expands and centers
        renderedHeight = containerSize.height;
        renderedWidth = containerSize.height * videoAspect;
        renderedLeft = (containerSize.width - renderedWidth) / 2;
        renderedTop = 0;
      }
    } else {
      // Desktop contain mode
      if (containerAspect > videoAspect) {
        renderedHeight = containerSize.height;
        renderedWidth = containerSize.height * videoAspect;
        renderedLeft = (containerSize.width - renderedWidth) / 2;
        renderedTop = 0;
      } else {
        renderedWidth = containerSize.width;
        renderedHeight = containerSize.width / videoAspect;
        renderedLeft = 0;
        renderedTop = (containerSize.height - renderedHeight) / 2;
      }
    }
  }

  const isBreakdownActive = currentScaledTime >= 6.7 && currentScaledTime <= 8.0;

  return (
    <section
      id="story-experience"
      ref={containerRef}
      className="burger-scroll-section relative w-full h-[700vh] bg-[#030202]"
    >
      <div className="burger-sticky-stage sticky top-16 lg:top-18 w-full h-[calc(100vh-64px)] lg:h-[calc(100vh-72px)] overflow-hidden bg-[#030202] select-none z-10 p-0">
        {/* Ambient Background Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#1a110a] via-[#0b0704] to-[#020101] opacity-95 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-250 h-150 bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-amber-700/8 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.88)_100%)] pointer-events-none" />

        {/* Scroll Progress Top Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-950/40 z-40 pointer-events-none">
          <div
            className="h-full bg-linear-to-r from-orange-600 via-orange-500 to-amber-400 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(249,115,22,0.6)]"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>

        {/* Unified Burger Video Frame Container (Fills Entire Sticky Viewport) */}
        <div
          ref={frameRef}
          className="burger-video-frame absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
        >
          {hasError ? (
            <div className="relative z-10 text-center p-6 bg-red-950/80 border border-red-500/50 rounded-xl max-w-md shadow-2xl">
              <p className="text-red-400 font-bold text-lg font-mono">
                burger-scroll.mp4 could not be loaded
              </p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src="/burger-scroll.mp4"
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onError={() => setHasError(true)}
              className={`burger-video block w-full h-full pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${fitMode === 'cover' ? 'object-cover' : 'object-contain'
                }`}
            />
          )}

          {/* Exact Rendered Video Overlay (Coordinate System matches video pixels 1:1) */}
          {!hasError && renderedWidth > 0 && renderedHeight > 0 && (
            <div
              className="ingredient-overlay absolute pointer-events-none z-20"
              style={{
                width: `${renderedWidth}px`,
                height: `${renderedHeight}px`,
                left: `${renderedLeft}px`,
                top: `${renderedTop}px`,
              }}
            >
              {/* SVG Connecting Leader Lines */}
              <svg
                className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ease-out ${isBreakdownActive ? 'opacity-100' : 'opacity-0'
                  }`}
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
              >
                {CALLOUTS.map((c) => {
                  const isRight = c.side === 'right';
                  const activeLabelX = isMobile
                    ? c.mobileLabelX
                    : isTablet
                      ? c.tabletLabelX
                      : c.desktopLabelX;

                  const burgerX1000 = c.burgerX * 10;
                  const labelX1000 = activeLabelX * 10;
                  const topY1000 = c.topPercent * 10;

                  const midX1000 = isRight
                    ? labelX1000 - (isMobile ? 25 : 40)
                    : labelX1000 + (isMobile ? 25 : 40);

                  return (
                    <g key={c.id}>
                      {/* Ingredient Marker on Burger */}
                      <circle
                        cx={burgerX1000}
                        cy={topY1000}
                        r={isMobile ? '6' : '8'}
                        className="fill-amber-400/20 stroke-amber-400/80 stroke-[1.5]"
                      />
                      <circle
                        cx={burgerX1000}
                        cy={topY1000}
                        r={isMobile ? '2.5' : '3.5'}
                        className="fill-amber-300"
                      />
                      {/* Connecting Line */}
                      <path
                        d={`M ${burgerX1000} ${topY1000} L ${midX1000} ${topY1000} L ${labelX1000} ${topY1000}`}
                        className="stroke-amber-400/80 stroke-[1.5] fill-none"
                        strokeDasharray={isMobile ? '3 2' : '5 3'}
                      />
                      {/* End Terminal Dot */}
                      <circle
                        cx={labelX1000}
                        cy={topY1000}
                        r={isMobile ? '2' : '3'}
                        className="fill-amber-200"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* HTML Callout Cards */}
              <div
                className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-out ${isBreakdownActive ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                {CALLOUTS.map((c) => {
                  const isRight = c.side === 'right';
                  const activeLabelX = isMobile
                    ? c.mobileLabelX
                    : isTablet
                      ? c.tabletLabelX
                      : c.desktopLabelX;

                  const subtitle = isMobile ? c.mobileSubtitle : c.desktopSubtitle;

                  return (
                    <div
                      key={c.id}
                      style={{
                        top: `${c.topPercent}%`,
                        left: isRight ? `${activeLabelX + 0.5}%` : 'auto',
                        right: isRight ? 'auto' : `${100 - activeLabelX + 0.5}%`,
                        transform: 'translateY(-50%)',
                      }}
                      className={`absolute transition-all duration-500 ease-out pointer-events-none whitespace-nowrap ${isBreakdownActive
                        ? 'opacity-100 translate-y-[-50%]'
                        : 'opacity-0 translate-y-[-30%]'
                        } ${isRight ? 'text-left' : 'text-right'}`}
                    >
                      <div
                        className={`inline-block bg-black/90 backdrop-blur-xl border border-amber-500/35 shadow-[0_10px_30px_rgba(0,0,0,0.85)] ${isMobile
                          ? 'max-w-27.5 sm:max-w-31.25 px-2 py-1 rounded-lg'
                          : 'px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl'
                          }`}
                      >
                        <div className="font-mono tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-xs md:text-sm text-amber-100 font-bold uppercase drop-shadow leading-tight">
                          {c.name}
                        </div>
                        <div className="text-[7.5px] sm:text-[9.5px] md:text-[11px] text-amber-300/85 font-mono tracking-[0.08em] sm:tracking-[0.15em] uppercase leading-tight mt-0.5">
                          {subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Storytelling Banner Overlay */}
          {!hasError && (
            <div
              className={`story-overlay absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-6 sm:right-6 z-30 pointer-events-none transition-all duration-500 ease-out ${isBreakdownActive
                ? 'opacity-0 pointer-events-none scale-95'
                : 'opacity-100 scale-100'
                }`}
            >
              <div className="relative min-h-20 sm:min-h-25 w-full flex items-end">
                {STORY_STEPS.map((step, idx) => {
                  const isActive = idx === activeStepIndex;
                  const isFromLeft = idx % 2 === 0;

                  return (
                    <div
                      key={step.id}
                      className={`w-full max-w-sm sm:max-w-lg transition-all duration-500 ease-out ${isFromLeft ? 'md:mr-auto md:ml-6' : 'md:ml-auto md:mr-6'
                        } ${isActive
                          ? 'opacity-100 translate-x-0 translate-y-0 relative'
                          : isFromLeft
                            ? 'opacity-0 -translate-x-12 sm:-translate-x-16 translate-y-2 absolute inset-0 pointer-events-none'
                            : 'opacity-0 translate-x-12 sm:translate-x-16 translate-y-2 absolute inset-0 pointer-events-none'
                        }`}
                    >
                      <div className="p-2 sm:p-3">
                        <div
                          className={`flex items-center gap-2 sm:gap-2.5 mb-1 ${isFromLeft ? 'justify-start' : 'justify-start md:justify-end'
                            }`}
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)] animate-pulse" />
                          <span className="font-mono tracking-[0.25em] text-xs sm:text-sm uppercase text-orange-400 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                            {step.title}
                          </span>
                        </div>
                        <p
                          className={`font-athletic text-lg sm:text-2xl md:text-3xl text-white tracking-wide leading-snug uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] ${isFromLeft ? 'text-left' : 'text-left md:text-right'
                            }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
