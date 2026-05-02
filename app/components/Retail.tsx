"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlide } from "./SlideContext";
import AnimatedSection from "./AnimatedSection";
import { retailTenants } from "@/lib/data";

export default function Retail() {
  const { goToSlide } = useSlide();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categoryIncentives = {
    "Luxury & Beauty": {
      punch: "⚡ High‑spending clientele – average ticket $450+",
      incentive: "First 6 months reduced rent for flagship pop‑ups",
      demand: 94,
    },
    "Anchor Stores": {
      punch: "📈 40M annual visitors – guaranteed foot traffic",
      incentive: "Co‑marketing support + prime corridor placement",
      demand: 88,
    },
    "Trending & Flagship": {
      punch: "🚀 Join SKIMS, Alo Yoga, POP MART – 45% YoY growth",
      incentive: "Flexible lease terms + social media amplification",
      demand: 97,
    },
  };

  const categories = [
    { title: "Luxury & Beauty", items: retailTenants.luxury },
    { title: "Anchor Stores", items: retailTenants.anchors },
    { title: "Trending & Flagship", items: retailTenants.popular.slice(0, 6) },
  ];

  return (
    <section className="relative min-h-screen py-24 px-6 bg-[#F5F5F0] flex items-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none"
      >
        <source src="/videos/market-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#1A1A1A]">
            Your brand among <span className="text-luxury-gold">icons</span>
          </h2>
          <div className="w-20 h-px bg-luxury-gold mx-auto mt-6 mb-6" />
          <p className="text-lg text-[#666666] max-w-3xl mx-auto font-light">
            Position yourself next to the world’s most desired names – and capture a share of 40M annual shoppers.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const incentives = categoryIncentives[cat.title as keyof typeof categoryIncentives];
            const isHovered = hoveredCategory === cat.title;
            return (
              <div
                key={cat.title}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setHoveredCategory(cat.title)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      className="absolute top-4 right-4 bg-luxury-gold text-black text-xs font-bold px-3 py-1 rounded-full shadow-md z-10"
                    >
                      💡 {incentives.incentive}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mb-4 pr-8">
                  <h3 className="text-2xl font-semibold text-[#1A1A1A]">{cat.title}</h3>
                  <p className="text-sm text-luxury-gold font-medium mt-1">{incentives.punch}</p>
                </div>

                <ul className="space-y-2 mb-4">
                  {cat.items.map((item) => (
                    <li key={item} className="text-[#666666] font-light flex items-center gap-2">
                      <span className="text-luxury-gold">✦</span> {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Leasing demand index</span>
                    <span className="text-luxury-gold font-bold">{incentives.demand}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-luxury-gold h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: isHovered ? `${incentives.demand}%` : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  {isHovered && (
                    <p className="text-[10px] text-gray-400 mt-2 animate-pulse">
                      🔥 High demand – only {Math.round(100 - incentives.demand)} units left in this category
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => goToSlide(9)}
            className="inline-block bg-luxury-gold text-black px-10 py-4 rounded-full font-bold text-xl hover:bg-amber-500 transition shadow-lg"
          >
            Secure your retail space – only 12 premium units left
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Priority access for commitments made before May 15.
          </p>
        </div>
      </div>
    </section>
  );
}