"use client";
import { createContext, useContext, ReactNode } from "react";

interface SlideContextType {
  goToSlide: (index: number) => void;
  currentIndex: number;
}

const SlideContext = createContext<SlideContextType | undefined>(undefined);

export function SlideProvider({ children, goToSlide, currentIndex }: { children: ReactNode; goToSlide: (index: number) => void; currentIndex: number }) {
  return (
    <SlideContext.Provider value={{ goToSlide, currentIndex }}>
      {children}
    </SlideContext.Provider>
  );
}

export function useSlide() {
  const context = useContext(SlideContext);
  if (!context) throw new Error("useSlide must be used within SlideProvider");
  return context;
}