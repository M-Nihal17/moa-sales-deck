"use client";
import { useSlide } from "./SlideContext";
import { motion } from "framer-motion";

export default function EntryScreen() {
  const { goToSlide } = useSlide();

  // Slide indices 
  const watchStory = () => goToSlide(1);     // VideoStory
  const exploreRevenue = () => goToSlide(7); // ROI Simulator
  const seeMarket = () => goToSlide(2);      // Why moa (Market Data)

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source media="(max-width: 768px)" src="/videos/moa-hero-mobile.mp4" />
        <source src="/videos/moa-hero.mp4" type="video/mp4" />
      </video>

     
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <img src="/images/logo.jpg" alt="Mall of America" className="h-10 w-auto" />
        <div className="text-white text-xl font-bold tracking-tight hidden sm:block">MALL OF AMERICA®</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold max-w-4xl mb-4"
        >
          The opportunity <span className="text-luxury-gold">starts here</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-200"
        >
          40M visitors. $2B impact. Your brand's next big move.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <button
            onClick={watchStory}
            className="group bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/20 transition text-left w-72"
          >
            <div className="text-5xl mb-3">🎬</div>
            <div className="text-xl font-bold">Watch the story</div>
            <p className="text-sm text-gray-300 mt-2">
              Feel the scale, energy, and emotion of the #1 destination.
            </p>
            <span className="mt-4 inline-block text-luxury-gold text-sm group-hover:underline">Explore →</span>
          </button>

          <button
            onClick={exploreRevenue}
            className="group bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/20 transition text-left w-72"
          >
            <div className="text-5xl mb-3">💰</div>
            <div className="text-xl font-bold">Explore revenue</div>
            <p className="text-sm text-gray-300 mt-2">
              Sponsorship ROI, event bookings, and partnership tiers.
            </p>
            <span className="mt-4 inline-block text-luxury-gold text-sm group-hover:underline">Calculate →</span>
          </button>

          <button
            onClick={seeMarket}
            className="group bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/20 transition text-left w-72"
          >
            <div className="text-5xl mb-3">📊</div>
            <div className="text-xl font-bold">See market</div>
            <p className="text-sm text-gray-300 mt-2">
              Visitor data, growth projections, and premium locations.
            </p>
            <span className="mt-4 inline-block text-luxury-gold text-sm group-hover:underline">Analyze →</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-300 border-t border-white/20 pt-6 max-w-xl mx-auto"
        >
          🚀 Only 12 premium retail units and 3 event sponsorship slots remain for 2026.
        </motion.div>
      </div>
    </section>
  );
}