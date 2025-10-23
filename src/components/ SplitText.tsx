"use client";
import { motion, Variants } from "framer-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
};

const SplitText = ({
  text,
  className,
  delay = 0.1,
  duration = 0.25,
  stagger = 0.05,
}: SplitTextProps) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: stagger,
      },
    },
  };

  const letter: Variants = {
    hidden: {
      opacity: 0,
      y: `0.1em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94], // cubic-bezier style
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default SplitText;
