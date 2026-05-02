"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { mallStats } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { useSlide } from "./SlideContext";

export default function WhyThisProperty() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [selectedYear, setSelectedYear] = useState(2026);
  const [projectedVisitors, setProjectedVisitors] = useState(40);
  const { goToSlide } = useSlide();

  // counter states
  const [counts, setCounts] = useState({
    visitors: 0,
    sqft: 0,
    stores: 0,
    restaurants: 0,
    economicImpact: 0,
  });

  // Target values from mallStats
  const targets = {
    visitors: parseFloat(mallStats.visitors),
    sqft: parseFloat(mallStats.sqft),
    stores: parseFloat(mallStats.stores),
    restaurants: parseFloat(mallStats.restaurants),
    economicImpact: parseFloat(mallStats.economicImpact.replace('$', '').replace('B', '')),
  };

  // Counting animation
  useEffect(() => {
    if (!inView) return;
    const duration = 1500; // ms
    const stepTime = 16; // ~60fps
    const steps = duration / stepTime;
    let step = 0;
    const increment = {
      visitors: targets.visitors / steps,
      sqft: targets.sqft / steps,
      stores: targets.stores / steps,
      restaurants: targets.restaurants / steps,
      economicImpact: targets.economicImpact / steps,
    };
    const interval = setInterval(() => {
      step++;
      setCounts(prev => ({
        visitors: Math.min(targets.visitors, prev.visitors + increment.visitors),
        sqft: Math.min(targets.sqft, prev.sqft + increment.sqft),
        stores: Math.min(targets.stores, prev.stores + increment.stores),
        restaurants: Math.min(targets.restaurants, prev.restaurants + increment.restaurants),
        economicImpact: Math.min(targets.economicImpact, prev.economicImpact + increment.economicImpact),
      }));
      if (step >= steps) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, [inView, targets.visitors, targets.sqft, targets.stores, targets.restaurants, targets.economicImpact]);

  useEffect(() => {
    const growth: Record<number, number> = { 2024: 38, 2025: 39.2, 2026: 40.5, 2027: 42.1, 2028: 44.3 };
    setProjectedVisitors(growth[selectedYear] || 40);
  }, [selectedYear]);

  const years = [2024, 2025, 2026, 2027, 2028];

  return (
    <section className="min-h-screen py-24 px-6 bg-[#F5F5F0] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#1A1A1A]">
            Your <span className="text-luxury-gold">market</span> is exploding
          </h2>
          <div className="w-20 h-px bg-luxury-gold mx-auto mt-6 mb-6" />
          <p className="text-lg text-[#666666] max-w-3xl mx-auto font-light">
            40M visitors today – projected 44M by 2028. Your brand captures a growing share of the Midwest’s biggest audience.
          </p>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center mb-16">
          <div className="space-y-1">
            <div className="text-4xl md:text-5xl font-light text-[#1A1A1A]">
              {Math.round(counts.visitors)}M+
            </div>
            <div className="text-[#666666] text-xs uppercase tracking-wide">Future customers</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl md:text-5xl font-light text-[#1A1A1A]">
              {counts.sqft.toFixed(1)}M
            </div>
            <div className="text-[#666666] text-xs uppercase tracking-wide">Sq ft of opportunity</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl md:text-5xl font-light text-[#1A1A1A]">
              {Math.round(counts.stores)}+
            </div>
            <div className="text-[#666666] text-xs uppercase tracking-wide">Partner brands</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl md:text-5xl font-light text-[#1A1A1A]">
              {Math.round(counts.restaurants)}+
            </div>
            <div className="text-[#666666] text-xs uppercase tracking-wide">Dining options</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl md:text-5xl font-light text-[#1A1A1A]">
              ${counts.economicImpact.toFixed(0)}B
            </div>
            <div className="text-[#666666] text-xs uppercase tracking-wide">Economic impact</div>
          </div>
        </div>

        {/* Growth projection chart */}
        <div className="mb-12 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-[#1A1A1A] text-center mb-4">Visitor growth forecast</h3>
          <div className="flex justify-center space-x-4 mb-6">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedYear === year ? "bg-luxury-gold text-black" : "bg-white/50 text-[#666666] hover:bg-white/80"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          <div className="text-center mb-4">
            <span className="text-5xl font-bold text-luxury-gold">{projectedVisitors}M</span>
            <span className="text-lg text-[#666666] ml-2">annual visitors</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-luxury-gold h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((projectedVisitors - 35) / (45 - 35)) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">
            +{((projectedVisitors - 38) / 38 * 100).toFixed(1)}% growth since 2023. Secure your position before the curve.
          </p>
        </div>

        {/* Before/After slider */}
        <BeforeAfterSlider />

        <div className="mt-12 text-center">
          <p className="text-sm text-[#666666]">
            🚀 <span className="font-semibold">Market heat:</span> Retail vacancy rate at 5% – lowest in a decade. Premium spaces fill within 30 days.
          </p>
          <button
            onClick={() => goToSlide(9)}
            className="mt-6 inline-block bg-luxury-gold text-black px-8 py-3 rounded-full font-bold hover:bg-amber-500 transition"
          >
            View available premium locations →
          </button>
        </div>
      </div>
    </section>
  );
}