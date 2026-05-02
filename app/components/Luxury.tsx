"use client";
import { useSlide } from "./SlideContext";
import AnimatedSection from "./AnimatedSection";
import AnimatedImage from "./AnimatedImage";

export default function Luxury() {
  const { goToSlide } = useSlide();

  return (
    <section className="min-h-screen py-20 px-6 bg-[#F5F5F0] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#1A1A1A]">
            Your flagship <span className="text-luxury-gold">among icons</span>
          </h2>
          <div className="w-20 h-px bg-luxury-gold mx-auto mt-6 mb-6" />
          <p className="text-lg text-[#666666] max-w-3xl mx-auto font-light">
            Position your brand alongside the world's most coveted names — Gucci, Prada, Louis Vuitton.  
            Capture the attention of 2M+ affluent visitors who come to the luxury wing each year.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 order-2 md:order-1">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-luxury-gold hover:shadow-xl transition-all duration-300 hover:border-luxury-gold/80">
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">💰 High‑spending demographics</h3>
              <p className="text-[#666666]">Luxury shoppers at MOA spend 3x more per visit than the average guest. Your brand captures premium revenue.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-luxury-gold hover:shadow-xl transition-all duration-300 hover:border-luxury-gold/80">
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">✨ Exclusive brand experiences</h3>
              <p className="text-[#666666]">Private shopping suites, VIP events, and curated activations that your high‑end clientele expect.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-luxury-gold hover:shadow-xl transition-all duration-300 hover:border-luxury-gold/80">
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">📈 Proven ROI for luxury flagships</h3>
              <p className="text-[#666666]">Recent luxury tenants saw 45% sales uplift year‑over‑year. Join the most profitable square footage in the mall.</p>
            </div>
            <button
              onClick={() => goToSlide(9)}
              className="mt-6 bg-luxury-gold text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-amber-500 transition inline-flex items-center gap-2"
            >
              Claim your luxury suite →
            </button>
          </div>

          {/* pan/zoom */}
          <div className="order-1 md:order-2">
            <AnimatedImage
              src="/ai/luxury-wing.jpg"
              alt="Luxury wing with Gucci, Prada, Louis Vuitton"
              width={1200}
              height={800}
              className="rounded-2xl shadow-xl"
              zoom={true}
            />
            <p className="text-center text-sm text-[#666666] mt-4 italic">
              Envision your brand here – among fashion's most powerful names.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}