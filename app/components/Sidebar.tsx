"use client";
import { useSlide } from "./SlideContext";

const quickLinks = [
  { label: "🎬 Story", slide: 1 },     
  { label: "📊 Market", slide: 2 },
  { label: "🛍️ Retail", slide: 3 },
  { label: "💎 Luxury", slide: 4 },
  { label: "🍽️ Dining", slide: 5 },
  { label: "🎢 Attractions", slide: 6 },
  { label: "💰 ROI", slide: 7 },
  { label: "🏟️ Venues", slide: 8 },
];

export default function Sidebar() {
  const { goToSlide, currentIndex } = useSlide();

  
  if (currentIndex === 0 || currentIndex === 9) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 md:gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
      {quickLinks.map((link) => (
        <button
          key={link.slide}
          onClick={() => goToSlide(link.slide)}
          className="text-white hover:text-luxury-gold transition-all duration-200 text-sm md:text-base flex items-center gap-1 px-2 py-1 rounded-full hover:bg-white/10"
        >
          <span>{link.label.split(" ")[0]}</span>
          <span className="hidden md:inline text-xs">{link.label.split(" ")[1]}</span>
        </button>
      ))}
    </div>
  );
}