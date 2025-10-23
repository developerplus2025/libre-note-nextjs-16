"use client";

import { motion } from "framer-motion";

export default function PathAnimation() {
  return (
    <motion.div
      style={{
        width: 20,
        height: 1,
        background: "tomato",
        offsetPath: 'path("M0 50 Q 50 0 100 50")',
      }}
      animate={{ offsetDistance: ["100%", "0%", "100%"] }}
      transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
