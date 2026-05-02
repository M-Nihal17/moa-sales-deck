"use client";
import { useState, useRef, useCallback } from "react";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const rafId = useRef<number | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.min(rect.width, Math.max(0, x));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    // Throttle using requestAnimationFrame
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => updatePosition(e.clientX));
  }, [isDragging, updatePosition]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => updatePosition(e.touches[0].clientX));
  }, [isDragging, updatePosition]);

  const stopDrag = useCallback(() => {
    setIsDragging(false);
    if (rafId.current) cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl shadow-lg cursor-ew-resize"
        style={{ aspectRatio: "16/9" }}
        onMouseMove={onMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchMove={onTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={stopDrag}
      >
        {/* 2010 image (full) */}
        <img
          src="/ai/mall-before.jpg"
          alt="Mall of America 2010"
          className="absolute top-0 left-0 w-full h-full object-cover"
          width={1200}
          height={675}
        />
        {/* 2026 image (clipped) */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src="/ai/mall-after.jpg"
            alt="Mall of America 2026"
            className="absolute top-0 left-0 w-full h-full object-cover"
            width={1200}
            height={675}
          />
        </div>
        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-300">
            <span className="text-gray-700 text-xs font-bold">↔️</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-3 px-2">
        <div><span className="font-medium text-luxury-gold">2010</span><p className="text-xs text-gray-400">Before expansion</p></div>
        <div><span className="font-medium text-luxury-gold">2026</span><p className="text-xs text-gray-400">Projected vision</p></div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Drag the handle to see Mall of America’s transformation over 16 years.
      </p>
    </div>
  );
}