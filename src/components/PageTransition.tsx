"use client";

import { motion } from "framer-motion";

const transitionVariants = {
  initial: { top: "100%" },
  animate: {
    top: "0%",
    translateY: "-100%",
    transition: {
      duration: 2,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // cubic-bezier tương đương "easeInOut"
    },
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

export default function PageTransition() {
  return (
    <motion.div
      className="fixed left-0 top-0 z-9999 h-full w-full bg-black"
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    />
  );
}
