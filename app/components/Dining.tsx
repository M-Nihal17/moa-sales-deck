"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlide } from "./SlideContext";
import AnimatedSection from "./AnimatedSection";
import { diningOptions } from "@/lib/data";
import Image from "next/image";

export default function Dining() {
  const { goToSlide } = useSlide();
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [peakHour, setPeakHour] = useState<"lunch" | "dinner">("lunch");

  const diningWithBenefits = diningOptions.map((item) => ({
    ...item,
    benefit: item.type === "American & Sushi" ? "High‑margin, repeat customers – 35% profit boost" :
             item.type === "Barbecue" ? "Family bundles drive $85+ average ticket" :
             item.type === "American" ? "Prime visibility – 12,000 daily impressions" :
             item.type === "Farm-to-table" ? "Premium brand alignment – 45% higher check" :
             item.type === "Burgers" ? "Ultra‑high volume – 200+ covers per hour" :
             "Fast‑casual trend – 90% repeat rate in 30 days",
  }));

  // Revenue and scarcity data
  const peakData = {
    lunch: { 
      avgCheck: "$18", 
      visitors: "8,500", 
      dailyRevenue: "$153,000",
      scarcity: "Only 4 slots left"
    },
    dinner: { 
      avgCheck: "$42", 
      visitors: "12,000", 
      dailyRevenue: "$504,000",
      scarcity: "Only 2 dinner slots remain"
    },
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-[#F5F5F0] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#1A1A1A]">
            Your <span className="text-luxury-gold">dining</span> empire starts here
          </h2>
          <div className="w-20 h-px bg-luxury-gold mx-auto mt-6 mb-6" />
          <p className="text-lg text-[#666666] max-w-3xl mx-auto font-light">
            Over 50 restaurants, <strong>$500k+ daily revenue potential</strong> during peak hours. Secure your location and capture hungry crowds.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="order-2 md:order-1">
            {/* Peak toggle with urgency */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 bg-white/60 backdrop-blur-sm rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setPeakHour("lunch")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    peakHour === "lunch" ? "bg-luxury-gold text-black" : "text-[#666666] hover:bg-white/80"
                  }`}
                >
                  🍽️ Lunch peak (11am‑2pm)
                </button>
                <button
                  onClick={() => setPeakHour("dinner")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    peakHour === "dinner" ? "bg-luxury-gold text-black" : "text-[#666666] hover:bg-white/80"
                  }`}
                >
                  🌙 Dinner peak (5pm‑9pm)
                </button>
              </div>
              <div className="bg-red-500/20 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                ⚠️ {peakData[peakHour].scarcity}
              </div>
            </div>

            {/* revenue card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={peakHour}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-md border-l-4 border-luxury-gold"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wide">Estimated daily revenue (food & beverage)</p>
                <p className="text-3xl font-bold text-luxury-gold">{peakData[peakHour].dailyRevenue}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Avg. check: {peakData[peakHour].avgCheck}</span>
                  <span>Daily visitors: {peakData[peakHour].visitors}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">*Based on current tenant averages. Your actual revenue may exceed.</p>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4">
              {diningWithBenefits.map((item) => {
                const isOpen = selectedCuisine === item.name;
                return (
                  <div
                    key={item.name}
                    onClick={() => setSelectedCuisine(isOpen ? null : item.name)}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl text-center border border-white/50 hover:shadow-xl hover:border-luxury-gold/50 transition-all duration-300 cursor-pointer group relative"
                  >
                    <div className="font-semibold text-[#1A1A1A] group-hover:text-luxury-gold transition">
                      {item.name}
                    </div>
                    <div className="text-sm text-[#666666]">{item.type}</div>

                    {!isOpen && (
                      <div className="absolute bottom-2 right-2 text-xs text-luxury-gold opacity-0 group-hover:opacity-100 transition">
                        See profit → 
                      </div>
                    )}

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 pt-2 border-t border-gray-200 text-xs text-luxury-gold font-medium"
                        >
                          💰 {item.benefit}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center text-[#666666] text-sm">
              + Two major food halls: <span className="font-medium">South Street Dining</span> & <span className="font-medium">Culinary on North</span>
            </div>
            <button
              onClick={() => goToSlide(9)}
              className="mt-8 w-full bg-luxury-gold text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-amber-500 transition shadow-md flex items-center justify-center gap-2"
            >
              🔒 Secure your restaurant space – only 6 leases left
            </button>
          </div>

          <div className="order-1 md:order-2">
            <Image
              src="/ai/dining-hall.jpg"
              alt="Dining hall at Mall of America"
              width={800}
              height={600}
              className="rounded-2xl shadow-xl w-full object-cover"
            />
            <p className="text-center text-sm text-[#666666] mt-4 italic">
              50+ culinary concepts – your brand becomes part of the destination.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}