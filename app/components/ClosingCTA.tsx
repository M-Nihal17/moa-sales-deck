"use client";
import { useSlide } from "./SlideContext";
import { motion } from "framer-motion";

export default function ClosingCTA() {
  const { goToSlide } = useSlide();

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Your brand belongs here.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          Only 12 premium retail units and 3 event sponsorship slots remain for 2026.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <a
            href="mailto:leasing@mallofamerica.com?subject=Leasing%20Inquiry%20-%20MOA%20Deck"
            className="bg-luxury-gold text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-500 transition inline-flex items-center gap-2"
          >
            📧 Secure Your Slot Now
          </a>
          <button
            onClick={() => goToSlide(0)}
            className="border border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition"
          >
            Explore Other Opportunities
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-12 text-gray-400 text-sm"
        >
          Limited time offer – decision required by May 15, 2026.
        </motion.p>
      </div>
    </section>
  );
}