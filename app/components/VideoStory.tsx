"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlide } from "./SlideContext";

export default function VideoStory() {
  const [showStats, setShowStats] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { goToSlide } = useSlide();

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <section className="min-h-screen w-full bg-[#F5F5F0] pt-28 pb-12 px-6">
      <div className="max-w-5xl w-full mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-light text-[#1A1A1A] text-center mb-8"
        >
          See why <span className="text-luxury-gold">40 million visitors</span> can’t stay away
        </motion.h2>

        {/* Tablet */}
        <div className="relative mx-auto w-full max-w-4xl">
          <div className="relative bg-[#1A1A1A] rounded-3xl shadow-2xl p-3 md:p-4">
            <div className="relative bg-black rounded-xl overflow-hidden aspect-[16/9]">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                poster="/images/video-poster.jpg"
              >
                <source src="/videos/moa-story.mp4" type="video/mp4" />
              </video>

              {/* overlay buttons */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                <button
                  onClick={togglePlayPause}
                  className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition w-10 h-10 flex items-center justify-center"
                >
                  {isPlaying ? "⏸️" : "▶️"}
                </button>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="bg-luxury-gold/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-luxury-gold transition"
                >
                  {showStats ? "Hide impact" : "See business impact →"}
                </button>
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-500 rounded-full"></div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-inner border border-white/10"></div>
        </div>

        {/* stats panel (toggle) */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md"
            >
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Your opportunity at a glance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-3xl font-bold text-luxury-gold">40M+</p>
                  <p className="text-xs text-gray-600">Annual visitors</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-luxury-gold">$2B</p>
                  <p className="text-xs text-gray-600">Economic impact</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-luxury-gold">520+</p>
                  <p className="text-xs text-gray-600">Stores & brands</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-luxury-gold">5M+</p>
                  <p className="text-xs text-gray-600">Theme park riders</p>
                </div>
              </div>
              <button
                onClick={() => goToSlide(9)}
                className="mt-6 inline-block bg-luxury-gold text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-amber-500 transition"
              >
                Explore partnership options →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-sm text-[#666666] mt-6">
          Located in the heart of the Midwest – your brand’s gateway to 40M+ consumers.
        </p>
      </div>
    </section>
  );
}