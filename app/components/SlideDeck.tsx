"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideProvider } from "./SlideContext";
import EntryScreen from "./EntryScreen";
import VideoStory from "./VideoStory";
import Sidebar from "./Sidebar";

import dynamic from "next/dynamic";
const WhyThisProperty = dynamic(() => import("./WhyThisProperty"));
const Retail = dynamic(() => import("./Retail"));
const Luxury = dynamic(() => import("./Luxury"));
const Dining = dynamic(() => import("./Dining"));
const Attractions = dynamic(() => import("./Attractions"));
const ROISimulator = dynamic(() => import("./ROISimulator"));
const VenueModules = dynamic(() => import("./VenueModules"));
const ClosingCTA = dynamic(() => import("./ClosingCTA"));

const slides = [
  { id: "entry", component: EntryScreen, title: "Entry" },
  { id: "video-story", component: VideoStory, title: "The Heartbeat" },
  { id: "why", component: WhyThisProperty, title: "Market Data" },
  { id: "retail", component: Retail, title: "Retail" },
  { id: "luxury", component: Luxury, title: "Luxury" },
  { id: "dining", component: Dining, title: "Dining" },
  { id: "attractions", component: Attractions, title: "Attractions" },
  { id: "events", component: ROISimulator, title: "ROI Simulator" },
  { id: "venues", component: VenueModules, title: "Venues" },
  { id: "closing", component: ClosingCTA, title: "Act Now" },
];

export default function SlideDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    }
  }, [currentIndex]);

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentComponent = slides[currentIndex].component;

  return (
    <SlideProvider goToSlide={goToSlide} currentIndex={currentIndex}>
      <div className="relative h-screen w-full overflow-hidden bg-black">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.6 }}
            className="h-full w-full overflow-y-auto"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>

        <Sidebar />

        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 z-50 transition"
          >
            ←
          </button>
        )}
        {currentIndex < slides.length - 1 && (
          <button
            onClick={nextSlide}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 z-50 transition"
          >
            →
          </button>
        )}
      </div>
    </SlideProvider>
  );
}