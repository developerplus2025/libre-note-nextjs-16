"use client";
import { motion } from "framer-motion";
interface AnimateTextHomeProps {
  words: string;
  className?: string;
  classNameWord?: string;
}
export default function AnimateTextHome({
  words,
  className,
  classNameWord,
}: AnimateTextHomeProps) {
  const Paramwords: string[] = words.split(" ");

  const wordVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 12 },
    visible: (index: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * index,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div
      className={`${className} title-text-home font-sans xl:flex xl:w-[900px] xl:flex-wrap xl:justify-center xl:gap-3`}
    >
      {Paramwords.map((word, index) => (
        <motion.p
          key={index}
          custom={index}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className={`${classNameWord} animation-h1 title-texct-home font-[500] -tracking-[3px] xl:mr-1.5 xl:inline-block xl:text-center xl:text-[5rem] xl:leading-[5.2rem]`}
        >
          {word}
        </motion.p>
      ))}
    </div>
  );
}
