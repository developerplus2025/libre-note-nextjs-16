"use client";
import WavesurferPlayer from "@wavesurfer/react";
import { useRef, useState } from "react";
import type WaveSurfer from "wavesurfer.js"; // chỉ import type thôi

const WaveAudioCard = () => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: WaveSurfer) => {
    setIsPlaying(false);
    setWavesurfer(ws);
  };

  const onPlayPause = () => {
    wavesurfer?.playPause();
  };

  return (
    <div className="flex flex-col gap-4">
      <WavesurferPlayer
        waveColor="#202020"
        progressColor="#ffffff"
        url="/kw04scrx7h.mp3"
        dragToSeek={true}
        hideScrollbar={true}
        normalize={true}
        barGap={6}
        height={20}
        width={"32rem"}
        barHeight={20}
        barRadius={20}
        barWidth={1}
       
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="wavesurfer-controls flex w-full justify-center gap-4">
        <div className="text-[1.5rem]">
          {/* Pause button */}
          <svg
            className={`${!isPlaying ? "hidden" : "flex"} border-none bg-transparent`}
            onClick={() => {
              setIsPlaying(false);
              onPlayPause();
            }}
            height={20}
            width={20}
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-5.5-2.5h-5v5h5v-5Z"
            />
          </svg>

          {/* Play button */}
          <svg
            className={`${isPlaying ? "hidden" : "flex"} border-none bg-transparent`}
            onClick={() => {
              setIsPlaying(true);
              onPlayPause();
            }}
            height={20}
            width={20}
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6 11l5.5-3L6 5v6Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WaveAudioCard;
