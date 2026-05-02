"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useSlide } from "./SlideContext";

interface Venue {
  id: string;
  name: string;
  headline: string;
  shortDesc: string;
  capacity: string;
  metric: string;
  benefit: string;
}

const venues: Venue[] = [
  {
    id: "expo",
    name: "Exposition Center",
    headline: "Host massive events with ease",
    shortDesc: "60,000+ sq ft of flexible space",
    capacity: "Up to 5,000 attendees",
    metric: "80+ trade shows annually",
    benefit: "Ideal for conventions, product launches, and large activations. Your brand commands the main stage.",
  },
  {
    id: "performing",
    name: "Performing Arts Theater",
    headline: "World‑class acoustics & prestige",
    shortDesc: "State‑of‑the‑art theater",
    capacity: "2,500 seats",
    metric: "95% audience satisfaction",
    benefit: "Perfect for concerts, plays, and private galas. Premium sound and lighting ready for your event.",
  },
  {
    id: "atrium",
    name: "Rotunda & Atrium",
    headline: "Maximum visibility, high traffic",
    shortDesc: "Iconic central space",
    capacity: "500–1,000 standing",
    metric: "2M+ passersby per month",
    benefit: "Ideal for brand pop‑ups, fashion shows, media events. Unbeatable exposure.",
  },
];

export default function VenueModules() {
  const { goToSlide } = useSlide();
  const [showModal, setShowModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const openModal = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowModal(true);
  };

  return (
    <section className="min-h-screen py-24 px-6 bg-[#F5F5F0] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#1A1A1A]">
            Your venue, <span className="text-luxury-gold">your vision</span>
          </h2>
          <div className="w-20 h-px bg-luxury-gold mx-auto mt-6 mb-6" />
          <p className="text-lg text-[#666666] max-w-3xl mx-auto font-light">
            From intimate gatherings to grand spectacles – spaces that turn your ideas into unforgettable experiences.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="group relative w-full h-[420px] [perspective:1000px]"
            >
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front of card */}
                <div className="absolute w-full h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-6 flex flex-col justify-between [backface-visibility:hidden]">
                  <div>
                    <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">
                        {venue.id === "expo" ? "🏟️" : venue.id === "performing" ? "🎭" : "✨"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-1">{venue.name}</h3>
                    <p className="text-luxury-gold text-sm font-medium mb-3">{venue.headline}</p>
                    <p className="text-[#666666] text-sm">{venue.shortDesc}</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-luxury-gold">{venue.capacity.split(" ")[0]}</span>
                      <span className="text-xs text-gray-500">{venue.capacity.split(" ").slice(1).join(" ")}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">{venue.metric}</div>
                  </div>
                  <div className="text-right text-xs text-gray-400 mt-4">
                    Hover for details →
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full bg-luxury-gold/10 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Why choose {venue.name}?</h3>
                    <p className="text-[#666666] text-sm mt-2">{venue.benefit}</p>
                    <div className="mt-4 p-3 bg-white/40 rounded-lg">
                      <p className="text-sm font-medium text-luxury-gold">✨ Exclusive partner benefit</p>
                      <p className="text-xs text-gray-600">Priority booking + dedicated event manager.</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(venue);
                    }}
                    className="mt-4 w-full bg-luxury-gold text-black py-2 rounded-full text-sm font-bold hover:bg-amber-500 transition"
                  >
                    Request a tour →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-[#666666]">
            Can't decide?{" "}
            <button onClick={() => openModal(venues[0])} className="text-luxury-gold underline">
              Contact our venue specialist
            </button>{" "}
            for a personalised consultation.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedVenue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-[#1A1A1A]">Request a tour – {selectedVenue.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">One of our venue experts will contact you within 24 hours.</p>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                />
                <select className="w-full p-2 border border-gray-300 rounded-lg mb-4">
                  <option>Preferred date (flexible)</option>
                  <option>Next week</option>
                  <option>Two weeks</option>
                  <option>Next month</option>
                </select>
                <button
                  onClick={() => {
                    alert(`Tour request sent for ${selectedVenue.name}. We'll be in touch soon.`);
                    setShowModal(false);
                  }}
                  className="w-full bg-luxury-gold text-black py-2 rounded-full font-bold hover:bg-amber-500 transition"
                >
                  Submit request
                </button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-3 text-sm text-gray-400 hover:text-gray-600 w-full text-center"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}