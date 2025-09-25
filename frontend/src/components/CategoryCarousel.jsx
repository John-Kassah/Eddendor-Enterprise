import React, { useEffect, useRef, useState } from "react";

/**
 * CategoryCarousel
 *
 * Props:
 * - title: string (e.g. "ALL CATEGORIES (11)")
 * - items: array of { id: string|number, title: string, imageSrc: string }
 * - cardWidth (optional): tailwind width class like "w-40" for card size (default "w-44")
 *
 * Usage:
 * <CategoryCarousel title="ALL CATEGORIES (11)" items={myItems} />
 */
export default function CategoryCarousel({
  title = "ALL CATEGORIES",
  items = [],
  cardWidth = "w-44",
}) {
  const trackRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // update arrow visibility based on scroll state
  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    // is there overflow?
    const canScroll = el.scrollWidth > el.clientWidth + 2;
    if (!canScroll) {
      setShowLeft(false);
      setShowRight(false);
      return;
    }
    // SMALLER thresholds so arrows appear reliably on many screens
    setShowLeft(el.scrollLeft > 2);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  // scroll by one "page" (80% of visible width)
  const scrollBy = (dir = "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.8);
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;

    // update on scroll
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll);

    // update on resize (window and element resize)
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);

    // use ResizeObserver for more accuracy if available
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateArrows());
      ro.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, [items]);

  return (
    <section className="p-4">
      {/* Scoped CSS to hide scrollbar (WebKit + Firefox + IE) */}
      <style>{`
        /* hide scrollbar for the track element */
        .category-track::-webkit-scrollbar { display: none; }
        .category-track { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">{title}</h3>
        {/* optional CTA area or count could go here */}
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        {/* Left arrow (only show when overflow to the left) */}
        {showLeft && (
          <button
            aria-label="scroll-left"
            onClick={() => scrollBy("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-40 btn btn-ghost btn-circle shadow-lg border border-base-200 bg-base-100/90 w-10 h-10"
            style={{ transform: "translateY(-50%)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Track: horizontally scrollable */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto category-track pr-2 scroll-smooth"
          style={{ scrollBehavior: "smooth", msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`${cardWidth} flex-shrink-0`}
            >
              {/* Card */}
              <div className="bg-base-100 rounded-xl overflow-hidden">
                {/* image area: fixed aspect ratio box */}
                <div className="w-full h-36 md:h-40 lg:h-44 relative rounded-t-lg overflow-hidden bg-base-200">
                  {/* Put your image here; it will cover and center */}
                  {item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-base-content/50">
                      Image
                    </div>
                  )}

                  {/* inward/dark subtle glow on the card image area (inset) */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 18px rgba(0,0,0,0.35)",
                      borderRadius: "0.75rem",
                    }}
                  />
                </div>

                {/* Title / caption */}
                <div className="py-3 px-2 text-center">
                  <h4 className="text-sm md:text-base font-medium text-base-content truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow (only show when overflow to the right) */}
        {showRight && (
          <button
            aria-label="scroll-right"
            onClick={() => scrollBy("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 btn btn-ghost btn-circle shadow-lg border border-base-200 bg-base-100/90 w-10 h-10"
            style={{ transform: "translateY(-50%)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
