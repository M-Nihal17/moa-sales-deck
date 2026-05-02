"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useSlide } from "./SlideContext";
import AnimatedSection from "./AnimatedSection";

export default function ROISimulator() {
  const { goToSlide } = useSlide();
  const [footfall, setFootfall] = useState(50000);
  const [impressions, setImpressions] = useState(40000);
  const [isAnimating, setIsAnimating] = useState(false);
  const [claimedSlots, setClaimedSlots] = useState(2);
  const totalSlots = 3;

  useEffect(() => {
    setImpressions(Math.round(footfall * 0.8));
  }, [footfall]);

  const handleGrowthExplosion = () => {
    setIsAnimating(true);
    let i = footfall;
    const interval = setInterval(() => {
      if (i >= 200000) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }
      i += 20000;
      setFootfall(i);
    }, 80);
  };

  const totalCost = Math.round(impressions * 0.02);
  const remainingSlots = totalSlots - claimedSlots;

  const handleClaimSlot = () => {
    if (claimedSlots < totalSlots) {
      setClaimedSlots(claimedSlots + 1);
      alert(`🎉 Slot claimed! Only ${remainingSlots - 1} left. Our team will contact you.`);
    } else {
      alert("All slots are gone. Join the waitlist?");
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-6 bg-black text-white flex items-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none"
      >
        <source src="/videos/sim-bg.mp4" type="video/mp4" />
      </video>

      {/* dark overlay (for text readable) */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight">
            Your <span className="text-luxury-gold">ROI</span> in real time
          </h2>
          <div className="w-20 h-px bg-luxury-gold mx-auto mt-6 mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
            Adjust the slider – see your brand’s daily impressions and cost. Then lock in your slot before they’re gone.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: slider + meter */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <label className="block text-lg font-semibold mb-2">Your daily reach (foot traffic)</label>
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={footfall}
              onChange={(e) => setFootfall(Number(e.target.value))}
              className="w-full accent-luxury-gold"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>10k</span>
              <span>{footfall.toLocaleString()}</span>
              <span>200k</span>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span>Brand impressions</span>
                <span className="text-luxury-gold font-bold">{impressions.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                <motion.div
                  className="bg-luxury-gold h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(impressions / 200000) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGrowthExplosion}
              className="mt-6 w-full bg-luxury-gold text-black py-3 rounded-full font-bold text-lg hover:bg-amber-500 transition"
            >
              🚀 Simulate growth explosion
            </motion.button>
          </div>

          {/* Right: Results + Urgency */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wide">Estimated daily value</p>
              <motion.p
                key={totalCost}
                initial={{ scale: 1.1, color: "#C6A43F" }}
                animate={{ scale: 1, color: "#FFFFFF" }}
                transition={{ duration: 0.2 }}
                className="text-5xl font-bold text-white mt-2"
              >
                ${totalCost.toLocaleString()}
              </motion.p>
              <p className="text-sm text-luxury-gold mt-1">⚡ 10x cheaper than social media</p>

              <div className="mt-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl">
                <p className="text-sm font-bold text-red-300">⚠️ Only {remainingSlots} sponsorship slots left</p>
                <p className="text-xs text-gray-300 mt-1">{claimedSlots} claimed in the last 24 hours</p>
              </div>

              {isAnimating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-white/10 rounded-lg"
                >
                  <p className="italic text-sm">“Our activation generated 200k+ impressions in a single weekend.”</p>
                  <p className="text-right text-xs text-luxury-gold mt-1">— Nike Partnerships</p>
                </motion.div>
              )}
            </div>

            <button
              onClick={() => {
                handleClaimSlot();
                goToSlide(9);
              }}
              className="mt-6 w-full bg-luxury-gold text-black py-3 rounded-full font-bold text-lg hover:bg-amber-500 transition flex items-center justify-center gap-2"
            >
              🔒 Claim your activation slot
              <span className="text-sm bg-black/20 px-2 py-0.5 rounded-full">{remainingSlots} left</span>
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          *Based on average foot traffic and standard CPM. Actual results may vary.
        </p>
      </div>
    </section>
  );
}