import React, { useRef, useState, useEffect } from "react";

const PopularPicks = () => {
    const scrollRef = useRef(null);
    const rafRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);
    const [blurredCols, setBlurredCols] = useState([]); // column indices that should show the glossy blur

    const baseProducts = [
        {
            name: "IBELL M200-105 IGBT Inverter 2 in 1 Flux...",
            price: "₵12,399",
            oldPrice: "₵17,699",
            discount: "30% OFF",
        },
        {
            name: "Breeze 1.25mm Mild Steel Manual Pipe...",
            price: "₵6,999",
            oldPrice: "₵16,499",
            discount: "58% OFF",
        },
        {
            name: "Spear 3HP 60 Litre Pressure Oil Type Air...",
            price: "₵9,999",
            oldPrice: "₵12,999",
            discount: "23% OFF",
        },
        {
            name: "Bosch 720W Professional Rotary...",
            price: "₵5,799",
            oldPrice: "₵9,699",
            discount: "40% OFF",
        },
        {
            name: "Vormir 200A Inverter MMA/MAG & TIG...",
            price: "₵7,939",
            oldPrice: "₵16,199",
            discount: "51% OFF",
        },
        {
            name: "Ingco 1700W Demolition Breaker PDB17008",
            price: "₵12,399",
            oldPrice: "₵16,099",
            discount: "23% OFF",
        },
        {
            name: "Walkers 1200W 26mm Rotary Hammer Drill...",
            price: "₵2,749",
            oldPrice: "₵6,899",
            discount: "60% OFF",
        },
        {
            name: "Green Bench Drill Press",
            price: "₵4,599",
            oldPrice: "₵6,199",
            discount: "25% OFF",
        },
        {
            name: "Orange-Black Heavy Duty Tool",
            price: "₵3,799",
            oldPrice: "₵7,299",
            discount: "48% OFF",
        },
        {
            name: "Yellow Cordless Drill Kit",
            price: "₵5,499",
            oldPrice: "₵9,999",
            discount: "45% OFF",
        },
    ];

    // repeat until we have 30
    const products = Array.from({ length: 30 }, (_, i) => {
        const base = baseProducts[i % baseProducts.length];
        return {
            id: i + 1,
            image: `https://picsum.photos/1200/800?random=${12 + i}`,
            ...base,
        };
    });

    const updateArrowVisibility = () => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollLeft, clientWidth, scrollWidth } = el;
        const tolerance = 1; // pixel tolerance to avoid floating point rounding issues

        setShowLeft(scrollLeft > 0 + tolerance);
        setShowRight(scrollLeft + clientWidth < scrollWidth - tolerance);

        // ---------- compute blurred columns (mobile-focused UX) ----------
        try {
            const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
            if (!isMobile) {
                if (blurredCols.length) setBlurredCols([]);
                return;
            }

            const children = Array.from(el.children);
            if (!children.length) {
                if (blurredCols.length) setBlurredCols([]);
                return;
            }

            const colsCount = Math.ceil(children.length / 2);
            const visibleLeft = scrollLeft;
            const visibleRight = scrollLeft + clientWidth;

            const newBlurred = [];

            for (let col = 0; col < colsCount; col++) {
                const topIdx = col * 2;
                const bottomIdx = topIdx + 1;
                const topChild = children[topIdx];
                const bottomChild = children[bottomIdx];

                if (!topChild) continue;

                const leftTop = topChild.offsetLeft;
                const rightTop = leftTop + topChild.offsetWidth;

                let fullyVisibleTop = leftTop >= visibleLeft - tolerance && rightTop <= visibleRight + tolerance;
                let partiallyVisibleTop = !(rightTop <= visibleLeft + tolerance || leftTop >= visibleRight - tolerance);

                let fullyVisibleBottom = true;
                let partiallyVisibleBottom = false;
                if (bottomChild) {
                    const leftBottom = bottomChild.offsetLeft;
                    const rightBottom = leftBottom + bottomChild.offsetWidth;
                    fullyVisibleBottom = leftBottom >= visibleLeft - tolerance && rightBottom <= visibleRight + tolerance;
                    partiallyVisibleBottom = !(rightBottom <= visibleLeft + tolerance || leftBottom >= visibleRight - tolerance);
                }

                const columnFullyVisible = fullyVisibleTop && fullyVisibleBottom;
                const columnPartiallyVisible = (partiallyVisibleTop || partiallyVisibleBottom) && !columnFullyVisible;

                if (columnPartiallyVisible) {
                    newBlurred.push(col);
                }
            }

            const same =
                newBlurred.length === blurredCols.length &&
                newBlurred.every((v, i) => v === blurredCols[i]);
            if (!same) setBlurredCols(newBlurred);
        } catch (err) {
            // defensive: don't let visual calc break functionality
            // eslint-disable-next-line no-console
            console.error("updateArrowVisibility (blur calc) error:", err);
        }
    };

    // debounced via requestAnimationFrame for smooth/low-cost updates
    const onScrollDebounced = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            updateArrowVisibility();
        });
    };

    useEffect(() => {
        const el = scrollRef.current;
        // initial measurement (use rAF to ensure layout has settled)
        rafRef.current = requestAnimationFrame(() => {
            updateArrowVisibility();

            // --- ensure first column is flush-left on mobile (ONLY) ---
            try {
                const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
                if (isMobile && el) {
                    const children = Array.from(el.children);
                    if (children.length) {
                        const firstChild = children[0];
                        if (firstChild) {
                            // Use scrollIntoView on the first child to guarantee alignment to the container's visible left edge
                            firstChild.scrollIntoView({ behavior: "auto", inline: "start" });
                        }
                    }
                }
            } catch (err) {
                // noop
            }
        });

        // attach scroll listener
        if (el) {
            el.addEventListener("scroll", onScrollDebounced, { passive: true });
        }

        // handle window resize to recompute clientWidth/scrollWidth and keep first col flush on mobile
        const onResize = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                updateArrowVisibility();

                try {
                    const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
                    if (isMobile && el) {
                        const children = Array.from(el.children);
                        if (children.length) {
                            const firstChild = children[0];
                            if (firstChild) {
                                // Use scrollIntoView on the first child to guarantee alignment to the container's visible left edge
                                firstChild.scrollIntoView({ behavior: "auto", inline: "start" });
                            }
                        }
                    }
                } catch (err) {
                    // noop
                }
            });
        };
        window.addEventListener("resize", onResize);

        // cleanup
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (el) {
                el.removeEventListener("scroll", onScrollDebounced);
            }
            window.removeEventListener("resize", onResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const el = scrollRef.current;
            const { clientWidth } = el;
            const scrollAmount = clientWidth * 0.8;

            // Mobile alignment behavior:
            const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
            if (isMobile) {
                const children = Array.from(el.children);
                if (!children.length) return;

                const scrollLeft = el.scrollLeft;
                const colsCount = Math.ceil(children.length / 2);

                let closestCol = 0;
                let closestDiff = Infinity;
                for (let col = 0; col < colsCount; col++) {
                    const idx = col * 2;
                    const child = children[idx];
                    if (!child) continue;
                    const left = child.offsetLeft;
                    const diff = Math.abs(left - scrollLeft);
                    if (diff < closestDiff) {
                        closestDiff = diff;
                        closestCol = col;
                    }
                }

                const targetCol = Math.min(Math.max(0, closestCol + (direction === "left" ? -1 : 1)), colsCount - 1);
                const targetChild = children[targetCol * 2];
                if (!targetChild) return;

                const targetLeft = targetChild.offsetLeft;

                el.scrollTo({
                    left: targetLeft,
                    behavior: "smooth",
                });

                return;
            }

            // desktop / tablet: preserve existing behaviour
            el.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative card bg-base-200 rounded-box p-6 shadow-sm max-w-[97vw] mx-auto">
            {/* Header */}
            <h2 className="card-title text-base-content font-bold uppercase mb-4 text-xl">
                Popular Picks
            </h2>

            {/* Scrollable Grid */}
            <div
                ref={scrollRef}
                className="grid grid-rows-2 grid-flow-col gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
            >
                {products.map((product, idx) => {
                    const colIndex = Math.floor(idx / 2);
                    const shouldBlurCol = blurredCols.includes(colIndex);

                    return (
                        <div
                            key={product.id}
                            className={`card card-compact bg-base-100 rounded-box shadow-inner w-60 h-[350px] flex flex-col overflow-hidden group relative`}
                        >
                            {/* Image */}
                            <div className="h-[65%] w-full overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.08]"
                                />
                            </div>

                            {/* translucent glossy blur overlay for partially visible columns on mobile only */}
                            <div
                                className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                                    shouldBlurCol ? "block md:hidden" : "hidden"
                                }`}
                                aria-hidden="true"
                            >
                                {/* Softer glossy frosted effect: lighter opacity and small backdrop blur so things beneath are hinted but distorted */}
                                <div className="w-full h-full glass bg-white/20 backdrop-blur-sm backdrop-saturate-110"></div>
                            </div>

                            {/* Content */}
                            <div className="card-body p-3 flex flex-col flex-grow">
                                <h3 className="text-sm font-medium text-base-content truncate">
                                    {product.name}
                                </h3>

                                {/* Prices */}
                                <p className="text-error font-bold mt-2">{product.price}</p>
                                <div>
                                    <p className="text-muted text-sm line-through inline-block mr-2">
                                        {product.oldPrice}
                                    </p>
                                    <span className="text-success text-sm font-semibold">
                                        {product.discount}
                                    </span>
                                </div>

                                {/* Hover actions */}
                                <div className="flex justify-start items-center gap-[10%] mt-auto">
                                    <button className="btn btn-sm btn-primary">🛒</button>
                                    <button className="btn btn-sm btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Left Arrow */}
            {showLeft && (
                <button
                    onClick={() => handleScroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1 btn btn-circle bg-base-100 shadow-md"
                >
                    ❮
                </button>
            )}

            {/* Right Arrow */}
            {showRight && (
                <button
                    onClick={() => handleScroll("right")}
                    className="absolute right-2 top-1/2 -translate-y-1 btn btn-circle bg-base-100 shadow-md"
                >
                    ❯
                </button>
            )}
        </div>
    );
};

export default PopularPicks;
