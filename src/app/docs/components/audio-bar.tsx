"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export default function AudioBar() {
  const path = usePathname();
  const [play, setPlay] = useState(false);
  const parts = path.slice(1).split("/");
  // => "docs".split("/") => ["docs"]

  const pathAudio = [parts[0], parts.slice(1).join("/")];

  const audioRef = useRef<HTMLAudioElement>(null);
  // Use pathAudio.length - 1 to get the last segment
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState("1");
  const [copy, setCopy] = useState(false);
  const audioFile = pathAudio[pathAudio.length - 1];
  const audio = audioRef.current;
  const time = audio?.currentTime;
  const formatSecond = (time: number) => {
    const seconds = Math.floor(time % 60); // Tính giây còn lại
    // Định dạng với 2 chữ số (ví dụ: 01:05)
    return seconds;
  };
  const formatMinutes = (time: number) => {
    const minutes = Math.floor(time / 60); // Tính phút
    return minutes;
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60); // Tính phút
    const seconds = Math.floor(time % 60); // Tính giây còn lại
    // Định dạng với 2 chữ số (ví dụ: 01:05)
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  function copyLink() {
    navigator.clipboard.writeText(
      "https://decent-over.vercel.app/docs/" + pathAudio[1],
    );
    toast("Link Copied", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Close",
        onClick: () => "",
      },
    });
   
      setTimeout(
        () => {
          setCopy(false);
        },

        1500,
      );
  
    setCopy(true);
  }
  const handlePlay = () => {
    setPlay(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const updateTime = () => {
      setCurrentTime(audioEl.currentTime); // lấy thời gian đã phát
    };

    audioEl.addEventListener("timeupdate", updateTime);
    return () => {
      audioEl.removeEventListener("timeupdate", updateTime);
    };
  }, []);
  const timePointer = useRef(0);
  const handlePause = () => {
    setPlay(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  const speedAudio = (number: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = number;
  };
  const [showAccentMan, setShowAccentMan] = React.useState<Checked>(true);
  const [showAccentWomen, setShowAccentWomen] = React.useState<Checked>(false);
  const [accent, setAccent] = React.useState("Man");
  return (
    <div className="flex w-full items-center justify-between">
      <audio
        onEnded={() => setPlay(false)}
        ref={audioRef}
        src={`/audio/markdown/${pathAudio[1] === "" ? "index" : pathAudio[1]}.mp3`}
      ></audio>
      <div className="flex items-center gap-2">
        <svg
          onClick={() => handlePlay()}
          className={`${play ? "hidden" : ""} cursor-pointer select-none`}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="#ffffff"
          viewBox="0 0 256 256"
        >
          <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
        </svg>
        <svg
          className={`${!play ? "hidden" : ""} cursor-pointer select-none`}
          onClick={() => handlePause()}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="#ffffff"
          viewBox="0 0 256 256"
        >
          <path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"></path>
        </svg>
        <div className="border-input border-l"></div>
        <div className="flex items-center gap-2">
          <NumberFlowGroup>
            <div
              style={
                {
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: "400",
                  fontSize: "0.875rem",
                  "--number-flow-char-height": "0.85em",
                } as React.CSSProperties
              }
              className="~text-3xl/4xl border-input flex items-baseline border-r pr-2 font-semibold"
            >
              {" "}
              <NumberFlow
                trend={-1}
                value={Number(formatMinutes(currentTime))}
                digits={{ 1: { max: 5 } }}
                format={{ minimumIntegerDigits: 2 }}
              />
              <NumberFlow
                prefix=":"
                value={Number(formatSecond(currentTime))}
                format={{ minimumIntegerDigits: 2 }}
              />
            </div>
          </NumberFlowGroup>

          <div className="flex gap-2 pl-2 text-sm text-[#a1a1a1]">
            <p
              className={`${speed === "0.5" ? "text-white transition-colors" : ""} cursor-pointer text-[#a1a1a1] select-none`}
              onClick={() => {
                speedAudio(0.5), setSpeed("0.5");
              }}
            >
              0.5x
            </p>
            <p
              className={`${speed === "1" ? "text-white transition-colors" : ""} cursor-pointer text-[#a1a1a1] select-none`}
              onClick={() => {
                speedAudio(1), setSpeed("1");
              }}
            >
              1x
            </p>
            <p
              className={`${speed === "1.5" ? "text-white transition-colors" : ""} cursor-pointer text-[#a1a1a1] select-none`}
              onClick={() => {
                speedAudio(1.5), setSpeed("1.5");
              }}
            >
              1.5x
            </p>
            <p
              className={`${speed === "2" ? "text-white transition-colors" : ""} cursor-pointer text-[#a1a1a1] select-none`}
              onClick={() => {
                speedAudio(2), setSpeed("2");
              }}
            >
              2x
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#f0f0f0"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[12rem]">
              <DropdownMenuLabel className="flex items-center justify-center">
                Voice
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuRadioGroup value={accent} onValueChange={setAccent}>
                <DropdownMenuRadioItem value="Man">
                  Male Voice
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Women">
                  Female Voice
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        onClick={() => {
          copyLink();
        }}
        onMouseLeave={() => (timePointer.current = 0)}
        onMouseEnter={() => (timePointer.current = Date.now() + 150)}
        className={`relative flex cursor-pointer items-center gap-2 select-none ${copy ? "pointer-events-none" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          animate={
            copy || Number(timePointer) > Date.now()
              ? { opacity: 1 }
              : { opacity: 0, display: "none" }
          }
          className={`border-input absolute top-[1.5rem] left-1/2 w-full -translate-x-1/2 rounded-md border bg-black p-1`}
        >
          <p className="text-center text-xs">Copied</p>
        </motion.div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#ffffff"
          viewBox="0 0 256 256"
        >
          <path d="M117.18,188.74a12,12,0,0,1,0,17l-5.12,5.12A58.26,58.26,0,0,1,70.6,228h0A58.62,58.62,0,0,1,29.14,127.92L63.89,93.17a58.64,58.64,0,0,1,98.56,28.11,12,12,0,1,1-23.37,5.44,34.65,34.65,0,0,0-58.22-16.58L46.11,144.89A34.62,34.62,0,0,0,70.57,204h0a34.41,34.41,0,0,0,24.49-10.14l5.11-5.12A12,12,0,0,1,117.18,188.74ZM226.83,45.17a58.65,58.65,0,0,0-82.93,0l-5.11,5.11a12,12,0,0,0,17,17l5.12-5.12a34.63,34.63,0,1,1,49,49L175.1,145.86A34.39,34.39,0,0,1,150.61,156h0a34.63,34.63,0,0,1-33.69-26.72,12,12,0,0,0-23.38,5.44A58.64,58.64,0,0,0,150.56,180h.05a58.28,58.28,0,0,0,41.47-17.17l34.75-34.75a58.62,58.62,0,0,0,0-82.91Z"></path>
        </svg>
        <p className="text-sm">Share</p>
      </div>
    </div>
  );
}