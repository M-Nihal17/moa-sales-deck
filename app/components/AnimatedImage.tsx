"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  zoom?: boolean; // if true, subtle zoom
}

export default function AnimatedImage({ src, alt, className = "", width, height, zoom = true }: AnimatedImageProps) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileInView={{ scale: zoom ? 1.05 : 1 }}
      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      viewport={{ once: false }}
      className="overflow-hidden rounded-2xl"
    >
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 500}
        className={`${className} transition-transform duration-700`}
      />
    </motion.div>
  );
}