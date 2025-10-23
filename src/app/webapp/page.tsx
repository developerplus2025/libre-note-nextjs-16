"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { CommandMenu } from "./CommandMenu";
import { playlist, PlayList } from "./data/playlist";
import { imagelist, ImageList } from "./data/image";
import { list, List } from "./data/list";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  EllipsisVertical,
  Grid,
  Heart,
  House,
  ListPlus,
  Play,
  PlayCircle,
  Podcast,
  Save,
  SkipBack,
  SkipForward,
  UserRound,
} from "lucide-react";
import { Library } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Search } from "lucide-react";
import { CalendarPlus } from "lucide-react";
import { Mic } from "lucide-react";
import { CirclePlay } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { Radio } from "lucide-react";
import { ListMusic } from "lucide-react";
import { Clock } from "lucide-react";
import { Guitar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PanelGroup, Panel } from "react-resizable-panels";
import { Music2 } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Pizza } from "lucide-react";
import { Apple } from "lucide-react";
import { CupSoda } from "lucide-react";
import { Fish } from "lucide-react";
import { Ham } from "lucide-react";
import { Cake } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Share2 } from "lucide-react";
import { User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Mail } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { Headphones } from "lucide-react";
import { WifiOff } from "lucide-react";
import { NotebookText } from "lucide-react";
import { Medal } from "lucide-react";
import { Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRouter } from "next/navigation";
import { ScrollAreaCorner } from "@radix-ui/react-scroll-area";
import { NavigationEffect } from "@/components/NavigationEffect";
import { Toaster } from "@/components/ui/sonner";
import { TabList, tablist } from "./data/tablist";
import MusicTab from "./components/musictab";
type Song = {
  name: string;
  artist: string;
  description: string;
  img: string;
};
const songs: Song[] = [
  {
    img: "charlton-roberts",
    name: "Silent Horizon",
    artist: "Lena Rivers",
    description:
      "A calming blend of ambient tones and soft piano, perfect for peaceful evenings.",
  },
  {
    img: "alan-cowen",
    name: "Electric Pulse",
    artist: "Nova Beats",
    description:
      "A high-energy electronic track with pulsating beats and futuristic melodies.",
  },
  {
    img: "thomas-zahner",
    name: "Golden Skies",
    artist: "Aiden Cross",
    description:
      "An uplifting journey through warm synths and nostalgic guitar riffs.",
  },
  {
    img: "jony",
    name: "Midnight Drive",
    artist: "Sierra Lane",
    description:
      "Smooth and rhythmic, this track captures the feel of cruising under city lights.",
  },
  {
    img: "alan-cowen",
    name: "Electric Pulse",
    artist: "Nova Beats",
    description:
      "A high-energy electronic track with pulsating beats and futuristic melodies.",
  },
  {
    img: "thomas-zahner",
    name: "Golden Skies",
    artist: "Aiden Cross",
    description:
      "An uplifting journey through warm synths and nostalgic guitar riffs.",
  },
];
export default function DecentWebApp() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [position, setPosition] = React.useState("benoit");
  return (
    <main className="GeistSans relative flex min-h-screen w-full flex-col items-center justify-between gap-12 py-0 dark:bg-black dark:scheme-dark">
      <div className="contentsP active w-full" id="musicContent">
        <div className="flex w-full justify-center">
          <div className="flex h-screen w-full min-w-[656px] flex-col rounded-lg border dark:border-[#202020]">
            <div className="title_bar flex h-[37px] gap-8 rounded-t-lg border-b dark:border-b-[#202020] dark:bg-black">
              <Menubar className="title_bar_no rounded-t-lg border-none px-4 dark:bg-black">
                <MenubarMenu>
                  {/* <MenubarTrigger>Decent</MenubarTrigger> */}
                  <MenubarContent>
                    <MenubarItem>About Decent</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Preferences<MenubarShortcut>⌘,</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Hide Decent<MenubarShortcut>⇧⌘H</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Hide Other<MenubarShortcut>⌘H</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Quit Decent <MenubarShortcut>⌘Q</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>New</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Playlist</MenubarItem>
                        <MenubarItem>Playlist from Selection</MenubarItem>
                        <MenubarItem>Smart Playlist</MenubarItem>
                        <MenubarItem>Playlist Folder</MenubarItem>
                        <MenubarItem>Genius Playlist</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem>
                      Open Stream Url<MenubarShortcut>⌘U</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Close Window <MenubarShortcut>⌘W</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger>Libary</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Update Cloud Library</MenubarItem>
                        <MenubarItem>Update Genius</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Organize Library</MenubarItem>
                        <MenubarItem>Export Library</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Import Playlist</MenubarItem>
                        <MenubarItem>Export Playlist</MenubarItem>
                        <MenubarItem>Show Duplicate Items</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Get Album ArtWord</MenubarItem>
                        <MenubarItem>Get Track Name</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem>
                      Import... <MenubarShortcut>⌘O</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>Burn Playlist to Dis... </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Show in Finder
                      <MenubarShortcut>⇧⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>Convert...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Page Setup</MenubarItem>
                    <MenubarItem>
                      Print
                      <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Cut <MenubarShortcut>⌘X</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Copy <MenubarShortcut>⌘C</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Paste <MenubarShortcut>⌘V</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Select All <MenubarShortcut>⌘A</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Deselect All<MenubarShortcut>⇧⌘A</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Smart Distation{" "}
                      <MenubarShortcut>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                          <circle cx="17" cy="7" r="5" />
                        </svg>
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Emoji & Symbols{" "}
                      <MenubarShortcut>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarCheckboxItem>Show Playing Next</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                      Show Lyrics
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Show Status Bar</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Enter Fullscreen</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Hide Sidebar</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Account</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem inset>Switch Account</MenubarItem>
                    <MenubarSeparator />
                    <MenubarRadioGroup
                      defaultValue="benoit"
                      value={position}
                      onValueChange={setPosition}
                    >
                      <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                      <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                      <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                    <MenubarItem inset>Manage Family...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Add Account...</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <div className="flex h-[calc(100vh-57px)] flex-col gap-4 overflow-y-auto">
              <div className="fixed top-12 h-8 w-full">
                <div className="flex items-center justify-between px-8">
                  <div>
                    <svg
                      data-testid="geist-icon"
                      height={16}
                      strokeLinejoin="round"
                      viewBox="0 0 16 16"
                      width={16}
                      style={{ color: "currentcolor" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <Input className="h-[30px] w-[450px] rounded-full pl-[35px]" />
                    <svg
                      className="absolute left-[20px] top-1/2 -translate-x-1/2 -translate-y-1/2 border-[#a1a1a1]"
                      data-testid="geist-icon"
                      height={16}
                      strokeLinejoin="round"
                      viewBox="0 0 16 16"
                      width={16}
                      style={{ color: "currentcolor" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.5 7C3.5 5.067 5.067 3.5 7 3.5C8.933 3.5 10.5 5.067 10.5 7C10.5 7.88461 10.1718 8.69256 9.63058 9.30876L9.30876 9.63058C8.69256 10.1718 7.88461 10.5 7 10.5C5.067 10.5 3.5 8.933 3.5 7ZM9.96544 11.0261C9.13578 11.6382 8.11014 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 8.11014 11.6382 9.13578 11.0261 9.96544L14.0303 12.9697L14.5607 13.5L13.5 14.5607L12.9697 14.0303L9.96544 11.0261Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center gap-4 justify-self-end">
                    <svg
                      data-testid="geist-icon"
                      height={16}
                      strokeLinejoin="round"
                      viewBox="0 0 16 16"
                      width={16}
                      style={{ color: "currentcolor" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.96452 2.5C11.0257 2.5 13.5 4.96643 13.5 8C13.5 11.0336 11.0257 13.5 7.96452 13.5C6.12055 13.5 4.48831 12.6051 3.48161 11.2273L3.03915 10.6217L1.828 11.5066L2.27046 12.1122C3.54872 13.8617 5.62368 15 7.96452 15C11.8461 15 15 11.87 15 8C15 4.13001 11.8461 1 7.96452 1C5.06835 1 2.57851 2.74164 1.5 5.23347V3.75V3H0V3.75V7.25C0 7.66421 0.335786 8 0.75 8H3.75H4.5V6.5H3.75H2.63724C3.29365 4.19393 5.42843 2.5 7.96452 2.5ZM8.75 5.25V4.5H7.25V5.25V7.8662C7.25 8.20056 7.4171 8.51279 7.6953 8.69825L9.08397 9.62404L9.70801 10.0401L10.5401 8.79199L9.91603 8.37596L8.75 7.59861V5.25Z"
                        fill="currentColor"
                      />
                    </svg>

                    <svg
                      data-testid="geist-icon"
                      height={16}
                      strokeLinejoin="round"
                      viewBox="0 0 16 16"
                      width={16}
                      style={{ color: "currentcolor" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      data-testid="geist-icon"
                      height={16}
                      strokeLinejoin="round"
                      viewBox="0 0 16 16"
                      width={16}
                      style={{ color: "currentcolor" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      data-testid="geist-icon"
                      height={16}
                      strokeLinejoin="round"
                      viewBox="0 0 16 16"
                      width={16}
                      style={{ color: "currentcolor" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-20 flex w-full flex-col items-center justify-center gap-4">
                <div className="flex flex-col gap-4">
                  <div>Your favorites</div>
                  <div className="justify-items-between grid grid-cols-3 gap-12">
                    {songs.map((song) => (
                      <div
                        key={song.name}
                        className="relative flex h-[200px] w-[320px] flex-col justify-between border"
                      >
                        <div className="absolute -left-px -top-px h-[14px] w-[14px] border-l border-t border-[#ffffff]"></div>
                        <div className="absolute -right-px -top-px h-[14px] w-[14px] border-r border-t border-[#ffffff]"></div>
                        <div className="absolute -bottom-px -left-px h-[14px] w-[14px] border-b border-l border-[#ffffff]"></div>
                        <div className="absolute -bottom-px -right-px h-[14px] w-[14px] border-b border-r border-[#ffffff]"></div>
                        <div className="flex h-[155px] w-full flex-col gap-4 p-4">
                          <div className="flex h-[60px] w-full flex-row-reverse justify-between">
                            <div>
                              <svg
                                data-testid="geist-icon"
                                height={16}
                                strokeLinejoin="round"
                                viewBox="0 0 16 16"
                                width={16}
                                style={{ color: "currentcolor" }}
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex h-[35px] w-[35px] items-center justify-center rounded-md">
                                <Image
                                  height={"400"}
                                  width={"300"}
                                  alt="gf-vg"
                                  className="h-full w-full"
                                  src={`/${song.img}.avif`}
                                ></Image>
                              </div>
                              <div className="flex h-[40px] flex-col justify-between">
                                <p className="text-sm">{song.name}</p>
                                <p className="text-xs text-[#a1a1a1]">
                                  {song.artist}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="relative h-full">
                            <p className="text-center text-sm text-[#a1a1a1]">
                              {song.description}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs">March 15, 2024</p>
                            <p className="text-xs">Rock</p>
                          </div>
                        </div>
                        <div className="flex h-[60px] w-full items-center justify-between gap-8 border-t px-8">
                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.29289 1.39644C7.68342 1.00592 8.31658 1.00592 8.70711 1.39644L11.7803 4.46966L12.3107 4.99999L11.25 6.06065L10.7197 5.53032L8.75 3.56065V10.25V11H7.25V10.25V3.56065L5.28033 5.53032L4.75 6.06065L3.68934 4.99999L4.21967 4.46966L7.29289 1.39644ZM13.5 9.24999V13.5H2.5V9.24999V8.49999H1V9.24999V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.24999V8.49999H13.5V9.24999Z"
                              fill="currentColor"
                            />
                          </svg>

                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z"
                              fill="currentColor"
                            />
                          </svg>

                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fill="#666"
                              fillRule="evenodd"
                              d="M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6 11l5.5-3L6 5v6Z"
                              clipRule="evenodd"
                              style={{ fill: "currentColor" }}
                            />
                          </svg>

                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.74421 10.6976L3 10.5H1.5V5.5H3L3.74421 5.30236L8.5 2.58477V13.4152L3.74421 10.6976ZM3 4L8.5 0.857143L10 0V1.72763V14.2724V16L8.5 15.1429L3 12H1C0.447715 12 0 11.5523 0 11V5C0 4.44772 0.447715 4 1 4H3ZM14.2585 2.96051L14.6728 3.58567C15.5116 4.85121 16 6.3697 16 8C16 9.6303 15.5116 11.1488 14.6728 12.4143L14.2585 13.0395L13.0082 12.2108L13.4225 11.5857C14.1034 10.5582 14.5 9.32657 14.5 8C14.5 6.67343 14.1034 5.44176 13.4225 4.41433L13.0082 3.78916L14.2585 2.96051ZM12.059 4.98506L12.4125 5.64655C12.7876 6.34871 13 7.15067 13 8C13 8.84933 12.7876 9.65129 12.4125 10.3534L12.059 11.0149L10.736 10.3081L11.0895 9.64655C11.3513 9.15657 11.5 8.59676 11.5 8C11.5 7.40324 11.3513 6.84344 11.0895 6.35345L10.736 5.69195L12.059 4.98506Z"
                              fill="currentColor"
                            />
                          </svg>
                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.875 1.5C3.01104 1.5 1.5 3.01104 1.5 4.875V6.40385C1.5 7.22166 1.87727 7.95083 2.47018 8.42791L3.0545 8.89808L2.11415 10.0667L1.52982 9.59656C0.598275 8.84699 0 7.69502 0 6.40385V4.875C0 2.18261 2.18261 0 4.875 0C6.79184 0 8.44888 1.1064 9.2449 2.71201C9.35322 2.93049 9.51183 3 9.60112 3H12.25C14.3211 3 16 4.67893 16 6.75C16 7.8785 15.5006 8.89123 14.7133 9.57758L14.1479 10.0704L13.1622 8.93972L13.7276 8.44689C14.202 8.03329 14.5 7.42688 14.5 6.75C14.5 5.50736 13.4926 4.5 12.25 4.5H9.60112C8.79547 4.5 8.1902 3.96162 7.901 3.37829C7.34838 2.26364 6.20018 1.5 4.875 1.5ZM8.75 13.4393L10.7197 11.4697L11.25 10.9393L12.3107 12L11.7803 12.5303L8.70711 15.6036C8.31658 15.9941 7.68342 15.9941 7.29289 15.6036L4.21967 12.5303L3.68934 12L4.75 10.9393L5.28033 11.4697L7.25 13.4393V7.75V7H8.75V7.75V13.4393Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>Your favorites</div>
                  <div className="justify-items-between grid grid-cols-3 gap-12">
                    {songs.map((song) => (
                      <div
                        key={song.name}
                        className="relative flex h-[200px] w-[320px] flex-col justify-between border"
                      >
                        <div className="absolute -left-px -top-px h-[14px] w-[14px] border-l border-t border-[#ffffff]"></div>
                        <div className="absolute -right-px -top-px h-[14px] w-[14px] border-r border-t border-[#ffffff]"></div>
                        <div className="absolute -bottom-px -left-px h-[14px] w-[14px] border-b border-l border-[#ffffff]"></div>
                        <div className="absolute -bottom-px -right-px h-[14px] w-[14px] border-b border-r border-[#ffffff]"></div>
                        <div className="flex h-[155px] w-full flex-col gap-4 p-4">
                          <div className="flex h-[60px] w-full flex-row-reverse justify-between">
                            <div>
                              <svg
                                data-testid="geist-icon"
                                height={16}
                                strokeLinejoin="round"
                                viewBox="0 0 16 16"
                                width={16}
                                style={{ color: "currentcolor" }}
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex h-[35px] w-[35px] items-center justify-center rounded-md">
                                <Image
                                  height={"400"}
                                  width={"300"}
                                  alt="gf-vg"
                                  className="h-full w-full"
                                  src={`/${song.img}.avif`}
                                ></Image>
                              </div>
                              <div className="flex h-[40px] flex-col justify-between">
                                <p className="text-sm">{song.name}</p>
                                <p className="text-xs text-[#a1a1a1]">
                                  {song.artist}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="relative h-full">
                            <p className="text-center text-sm text-[#a1a1a1]">
                              {song.description}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-xs">March 15, 2024</p>
                            <p className="text-xs">Rock</p>
                          </div>
                        </div>
                        <div className="flex h-[60px] w-full items-center justify-between gap-8 border-t px-8">
                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.29289 1.39644C7.68342 1.00592 8.31658 1.00592 8.70711 1.39644L11.7803 4.46966L12.3107 4.99999L11.25 6.06065L10.7197 5.53032L8.75 3.56065V10.25V11H7.25V10.25V3.56065L5.28033 5.53032L4.75 6.06065L3.68934 4.99999L4.21967 4.46966L7.29289 1.39644ZM13.5 9.24999V13.5H2.5V9.24999V8.49999H1V9.24999V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.24999V8.49999H13.5V9.24999Z"
                              fill="currentColor"
                            />
                          </svg>

                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z"
                              fill="currentColor"
                            />
                          </svg>

                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fill="#666"
                              fillRule="evenodd"
                              d="M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6 11l5.5-3L6 5v6Z"
                              clipRule="evenodd"
                              style={{ fill: "currentColor" }}
                            />
                          </svg>

                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.74421 10.6976L3 10.5H1.5V5.5H3L3.74421 5.30236L8.5 2.58477V13.4152L3.74421 10.6976ZM3 4L8.5 0.857143L10 0V1.72763V14.2724V16L8.5 15.1429L3 12H1C0.447715 12 0 11.5523 0 11V5C0 4.44772 0.447715 4 1 4H3ZM14.2585 2.96051L14.6728 3.58567C15.5116 4.85121 16 6.3697 16 8C16 9.6303 15.5116 11.1488 14.6728 12.4143L14.2585 13.0395L13.0082 12.2108L13.4225 11.5857C14.1034 10.5582 14.5 9.32657 14.5 8C14.5 6.67343 14.1034 5.44176 13.4225 4.41433L13.0082 3.78916L14.2585 2.96051ZM12.059 4.98506L12.4125 5.64655C12.7876 6.34871 13 7.15067 13 8C13 8.84933 12.7876 9.65129 12.4125 10.3534L12.059 11.0149L10.736 10.3081L11.0895 9.64655C11.3513 9.15657 11.5 8.59676 11.5 8C11.5 7.40324 11.3513 6.84344 11.0895 6.35345L10.736 5.69195L12.059 4.98506Z"
                              fill="currentColor"
                            />
                          </svg>
                          <svg
                            data-testid="geist-icon"
                            height={16}
                            strokeLinejoin="round"
                            viewBox="0 0 16 16"
                            width={16}
                            style={{ color: "currentcolor" }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.875 1.5C3.01104 1.5 1.5 3.01104 1.5 4.875V6.40385C1.5 7.22166 1.87727 7.95083 2.47018 8.42791L3.0545 8.89808L2.11415 10.0667L1.52982 9.59656C0.598275 8.84699 0 7.69502 0 6.40385V4.875C0 2.18261 2.18261 0 4.875 0C6.79184 0 8.44888 1.1064 9.2449 2.71201C9.35322 2.93049 9.51183 3 9.60112 3H12.25C14.3211 3 16 4.67893 16 6.75C16 7.8785 15.5006 8.89123 14.7133 9.57758L14.1479 10.0704L13.1622 8.93972L13.7276 8.44689C14.202 8.03329 14.5 7.42688 14.5 6.75C14.5 5.50736 13.4926 4.5 12.25 4.5H9.60112C8.79547 4.5 8.1902 3.96162 7.901 3.37829C7.34838 2.26364 6.20018 1.5 4.875 1.5ZM8.75 13.4393L10.7197 11.4697L11.25 10.9393L12.3107 12L11.7803 12.5303L8.70711 15.6036C8.31658 15.9941 7.68342 15.9941 7.29289 15.6036L4.21967 12.5303L3.68934 12L4.75 10.9393L5.28033 11.4697L7.25 13.4393V7.75V7H8.75V7.75V13.4393Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
