"use client";
import AnimateTextHome from "./text-animation";
import DownloadButton from "./DownloadButton";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { ModalAnimationVideo } from "./modal-animation-video";
export default function MainTextHome() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState<boolean>(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    const storedClose = localStorage.getItem("close");
    if (storedClose !== null) {
      setClose(storedClose === "true");
    }
  }, []);

  const handleToggle = () => {
    const newCloseValue = !close;
    setClose(newCloseValue);
    localStorage.setItem("close", newCloseValue.toString());
  };

  const [value, setValue] = React.useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      style={{
        transform: `translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
      }}
      initial={{ opacity: 0, y: 20, scale: 0.9598145285935085 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="relative mx-20 flex w-full items-center justify-center min-[300px]:flex-col min-[300px]:gap-[1rem] min-[645px]:flex-col xl:flex-col xl:gap-8"
    >
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center min-[300px]:gap-4 xl:gap-8"
      >
        <AnimateTextHome
          className="title-text-home font-sans min-[300px]:hidden xl:flex xl:w-[650px] xl:flex-wrap xl:justify-center xl:gap-3"
          words="The Open Source AI Music Studio"
        />

        <AnimateTextHome
          classNameWord="min-[300px]:inline-block min-[300px]:mr-2"
          className="w-[300px] text-center text-[2.5rem] leading-[2.8rem] font-bold text-pretty min-[300px]:block xl:hidden"
          words="The Open Source AI Music Studio"
        />
        <h1 className="text-[#a1a1a1] min-[300px]:hidden min-[300px]:w-[301px] min-[300px]:text-center min-[300px]:text-[15px] xl:block xl:w-[522px] xl:text-center xl:text-[1rem] xl:leading-[1.5rem]">
          Dive into a seamless music experience with our cutting edge software.
          Collaborate effortlessly, unleash your creativity, manage playlists
          and craft professional quality tracks all in one powerful platform.
        </h1>
        <h1 className="text-[#a1a1a1] min-[300px]:block min-[300px]:w-[301px] min-[300px]:text-center min-[300px]:text-[15px] xl:hidden xl:w-[522px] xl:text-center xl:text-[1rem] xl:leading-[1.5rem]">
          Enjoy a seamless music experience where you can create, collaborate,
          manage playlists and craft professional quality tracks in one powerful
          platform
        </h1>
      </div>
      <div className="min-[300px]:flex min-[300px]:w-auto min-[300px]:flex-col min-[300px]:items-center min-[300px]:gap-[1rem] xl:flex xl:w-fit xl:flex-row xl:items-center xl:justify-center xl:gap-8">
        <DownloadButton />
        <ModalAnimationVideo />
      </div>
    </motion.div>
  );
}
