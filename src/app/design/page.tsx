"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import {
  AirplayIcon,
  DevicesIcon,
  MicrophoneStageIcon,
  PictureInPictureIcon,
  PlayIcon,
  PlusCircleIcon,
  QueueIcon,
  RepeatIcon,
  ShuffleAngularIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SpeakerHighIcon,
  SpeakerLowIcon,
} from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearch } from "./content/SearchContext";
export default function DesignPage() {
  const { songs, loading } = useSearch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    // Add event listeners
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    // Remove event listeners on cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onSliderChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="flex h-[calc(100vh-138.8px)] w-full flex-col justify-between">
      <div>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <main className="flex h-[calc(100vh-138.8px)] w-full flex-col justify-between">
            <SidebarTrigger className="fixed z-20 m-2" />
            <ScrollArea className="flex h-[calc(100vh-138.8px)] w-full justify-center">
              <div className="flex h-[calc(100vh-138.8px)] w-full justify-center">
                <div className="px-4 pt-8">
                  <div className="flex items-center gap-4 pb-8">
                    <Button
                      variant={"outline"}
                      className="h-[27px] rounded-full text-[12px]"
                    >
                      All
                    </Button>
                    <Button
                      variant={"outline"}
                      className="h-[27px] rounded-full text-[12px]"
                    >
                      Music
                    </Button>
                    <Button
                      variant={"outline"}
                      className="h-[27px] rounded-full text-[12px]"
                    >
                      Podcasts
                    </Button>
                  </div>
                  <ul className="grid w-[1355px] grid-cols-5 gap-x-4 divide-y">
                    {songs.map((song) => (
                      <li
                        key={song.id}
                        className="flex h-full w-[220px] items-center justify-between gap-4 rounded-lg px-2 py-2 [&_Svg]:shrink-0"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            className="rounded-md"
                            unoptimized
                            src={song.album.cover_small}
                            alt={song.title}
                            width={56}
                            height={56}
                          />
                          <div className="flex flex-col">
                            <p className="text-xs font-medium">{song.title}</p>
                            <p className="text-xs font-medium text-[#a1a1a1]">
                              by {song.artist.name}
                            </p>
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#ffffff"
                          viewBox="0 0 256 256"
                        >
                          <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
