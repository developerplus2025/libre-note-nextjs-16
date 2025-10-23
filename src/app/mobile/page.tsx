"use client";
// import { Slider } from "@/components/ui/slider";
import { cn } from "@/utils/cn";
import * as Slider from "@radix-ui/react-slider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { JSX, useEffect, useRef, useState } from "react";
import Navigation from "./components/navigation";
import WaveAudioCard from "./components/wave-audio-card";
import { motion } from "framer-motion";
import ListeningMusic from "./components/listening-music";
import LibraryMusic from "./components/library-music";
import AccountSetting from "./components/account-setting";
import ArtistMusic from "./components/artist-music";
const data = [
  {
    id: 1,
    src: "fiction-remix",
    img: "images",
    name: "Fiction Remix",
    description: "Pháp Sư Việt Nam",
    duration: "4:07",
  },
  {
    id: 2,
    src: "DaiDienHauSinhTuKienLouisRemix-VuongNgocManh-14125736",
    img: "32a35f4d26ee56366397c09953f6c269",
    name: "Đại Điền Hậu Sinh Tử ",
    description: "Vương Ngọc Manh (Remix)",
    duration: "4:05",
  },
  {
    id: 3,
    src: "kw04scrx7h",
    img: "32b9b674c7cd7f39c94ea7b823685dec",
    name: "Pháp Ta Bà",
    description: "Bảo Vân",
    duration: "3:31",
  },
  {
    id: 4,
    src: "tawerrw6f4",
    img: "7a5f6e35848b3362591da8e95b6382ea",
    name: "Đi Giữa Trời Rực Rỡ",
    description: "Ngô Lan Hương",
    duration: "3:40",
  },
  {
    id: 5,
    src: "y2mate.com1",
    img: "5e28cfa087c005ce61523c4e6c2d0e48",
    name: "Phải Chia Tay Thôi ",
    description: "Hương Ly",
    duration: "4:18",
  },
  {
    id: 6,
    src: "y2mate.com2",
    img: "60abf0227372b143476d5785b27bf346",
    name: "Có Duyên Không Nợ ",
    description: "Ngọc Diệp",
    duration: "4:08",
  },
  {
    id: 7,
    src: "y2mate.com3",
    img: "05b73eff55f3d133942abf6ea29bc41b",
    name: "Tát nhật lãng rực rỡ ",
    description: "Fanny Tran",
    duration: "3:24",
  },
];
type TabKey =
  | "listeningMusic"
  | "libraryMusic"
  | "artistMusic"
  | "accountSetting"
  | "historyMusic";

type Tab = {
  title: String;
  id: TabKey;
  label: string;
  icon: JSX.Element;
};

const tabs: Tab[] = [
  {
    id: "listeningMusic",
    title: "Home",
    label: "ListeningMusic",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        <path d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"></path>
      </svg>
    ),
  },
  {
    id: "libraryMusic",
    title: "Library",
    label: " Library Music",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        <path d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm10,47.38-3.35-15.9,46.82-10.06,3.34,15.9Zm70,100.41-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm48,160H56V192h48v16Z"></path>
      </svg>
    ),
  },
  {
    id: "artistMusic",
    label: "Artist Music",
    title: "Artist",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        <path d="M115.06,46.36a4,4,0,0,0-6.11.54A71.54,71.54,0,0,0,96,88a73.29,73.29,0,0,0,.63,9.42L27.12,192.22A15.93,15.93,0,0,0,28.71,213L43,227.29a15.93,15.93,0,0,0,20.78,1.59l94.81-69.53A73.29,73.29,0,0,0,168,160a71.54,71.54,0,0,0,41.09-12.93,4,4,0,0,0,.54-6.11Zm2.61,103.28-16,16a8,8,0,1,1-11.31-11.31l16-16a8,8,0,0,1,11.31,11.31Zm109.4-20.56a4,4,0,0,1-6.12.54L126.38,35.05a4,4,0,0,1,.54-6.12A71.93,71.93,0,0,1,227.07,129.08Z"></path>
      </svg>
    ),
  },
  {
    id: "historyMusic",
    title: "History",
    label: " History Music",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#f0f0f0"
        viewBox="0 0 256 256"
      >
        <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm88-24a8,8,0,0,0-8,8V82c-6.35-7.36-12.83-14.45-20.12-21.83a96,96,0,1,0-2,137.7,8,8,0,0,0-11-11.64A80,80,0,1,1,184.54,71.4C192.68,79.64,199.81,87.58,207,96H184a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V64A8,8,0,0,0,224,56Z"></path>
      </svg>
    ),
  },
  {
    id: "accountSetting",
    label: "Account Setting",
    title: "Account",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
      </svg>
    ),
  },
];

const contents: Record<TabKey, JSX.Element | ""> = {
  listeningMusic: <ListeningMusic />,
  libraryMusic: <LibraryMusic />,
  artistMusic: <ArtistMusic />,
  accountSetting: <AccountSetting />,
  historyMusic: "",
};

export default function MobilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>(tabs[0].id);

  return (
    <div className="flex h-[100dvh] flex-col overflow-x-hidden overflow-y-hidden">
      <div className="border-input sticky top-0 z-[10] h-[50px] w-full border-b px-[1rem]">
        <Navigation />
      </div>
      <div className="h-[calc(100dvh-50px)]">
        {contents[activeTab] == "" ? "Comming Soon" : contents[activeTab]}
      </div>
      <div className="border-input fixed bottom-0 z-[10] flex h-[60px] w-full items-center justify-between border-t bg-black px-[2rem]">
        {tabs.map((item) => (
          <div key={item.id} onClick={() => setActiveTab(item.id)}>
            <div
              className={`flex flex-col items-center gap-0.5 ${activeTab == item.id ? "[&>svg]:fill-white" : "[&>svg]:fill-[#a1a1a1]"} [&>svg]:size-[25px]`}
            >
              {item.icon}
              <p
                className={`${activeTab == item.id ? "text-white" : "text-[#a1a1a1]"} text-center text-xs`}
              >
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
