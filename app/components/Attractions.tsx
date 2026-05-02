"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlide } from "./SlideContext";   
import AnimatedSection from "./AnimatedSection";
import { attractions } from "@/lib/data";
import Image from "next/image";

export default function Attractions() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const { goToSlide } = useSlide();          

  // Benefit text for each attraction
  const attractionBenefits: Record<string, string> = {
    "Nickelodeon Universe": "5M+ annual riders – your brand in front of families from across the Midwest.",
    "SEA LIFE Aquarium": "10,000+ sea creatures – a premium, educational experience that drives repeat visits.",
    "Crayola Experience": "Interactive creativity – keeps children engaged for hours, increasing dwell time.",
  };

  // Media mapping 
  const attractionMedia = {
    "Nickelodeon Universe": { type: "video", src: "/ai/nickelodeon-universe.mp4" },
    "SEA LIFE Aquarium": { type: "image", src: "/ai/sea-life-aquarium.jpg" },
    "Crayola Experience": { type: "image", src: "/ai/crayola-experience.jpg" },
  };

  return (
    <section className="min-h-screen py-24 px-6 bg-[#F5F5F0] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#1A1A1A]">
            You activate where <span className="text-luxury-gold">families play</span>
          </h2>
          <div className="w-20 h-px bg-luxury-gold mx-auto mt-6 mb-6" />
          <p className="text-lg text-[#666666] max-w-3xl mx-auto font-light">
            Nickelodeon Universe, SEA LIFE Aquarium – over 5 million annual riders. Your brand becomes part of the memory.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {attractions.map((attr) => {
            const media = attractionMedia[attr.name as keyof typeof attractionMedia];
            const isOpen = selectedAttraction === attr.name;
            return (
              <div
                key={attr.name}
                onClick={() => setSelectedAttraction(isOpen ? null : attr.name)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-white/50 hover:shadow-xl hover:border-luxury-gold/50 transition-all duration-300 cursor-pointer group"
              >
                {media.type === "video" ? (
                  <video
                    ref={videoRef}
                    src={media.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={attr.name}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                  />
                )}

                <div className="p-6 relative">
                  <h3 className="text-2xl font-semibold text-[#1A1A1A] group-hover:text-luxury-gold transition">
                    {attr.name}
                  </h3>
                  <p className="text-[#666666] text-sm mt-2 font-light">{attr.description}</p>

                  {!isOpen && (
                    <div className="absolute bottom-4 right-4 text-xs text-luxury-gold opacity-0 group-hover:opacity-100 transition">
                      Click for opportunity →
                    </div>
                  )}

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 pt-3 border-t border-gray-200 text-sm text-luxury-gold font-medium"
                      >
                        ✨ {attractionBenefits[attr.name]}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA button */}
        <div className="text-center mt-12">
          <button
            onClick={() => goToSlide(9)}   // navigate to closing slide
            className="inline-block bg-luxury-gold text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-amber-500 transition"
          >
            Partner with the destination →
          </button>
        </div>
      </div>
    </section>
  );
}