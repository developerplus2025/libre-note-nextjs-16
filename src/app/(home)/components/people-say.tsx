"use client";
import Image from "next/image";
import * as Masonry from "./masonry";
import * as React from "react";
import Activity from "./activity";
import { useStore } from "@nanostores/react";
import { $bookmarks, $likes, $reposts, $views } from "./stores";
import { AnimatePresence, motion, type Transition } from "framer-motion";
const items = [
  {
    name: "Eric Grigorian",
    username: "Senior Software Engineer, Frontend",
    body: "I have tried many music apps before, but this one truly amazed me. The interface is smooth, easy to navigate, and the overall experience is fantastic. I can quickly find my favorite songs and create playlists effortlessly, making my music experience seamless and enjoyable.",
    img: "eric-grigorian",
  },
  {
    name: "Charlton Roberts",
    username: "Charlton Roberts, Product Engineering",
    body: "The audio quality in this app is outstanding. Every note is crystal clear, from the deep bass to the sharp highs. If you're a true music lover, you will appreciate the sound precision and richness this app offers.",
    img: "charlton-roberts",
  },
  {
    name: "Jonathan Melville",
    username: "Daniel Lopes, Frontend Developer",
    body: "One of the best things about this app is its speed. Songs load almost instantly, and there's no lag at all. Even when I have a large playlist, the app handles it effortlessly, making it a top choice for music streaming.",
    img: "jony",
  },
  {
    name: "Alan Cowen",
    username: "Senior Software Engineer, Frontend",
    body: "I have tried many music apps before, but this one truly amazed me. The interface is smooth, easy to navigate, and the overall experience is fantastic. I can quickly find my favorite songs and create playlists effortlessly, making my music experience seamless and enjoyable.",
    img: "alan-cowen",
  },
  {
    name: "Thomas Zahner",
    username: "Charlton Roberts, Product Engineering",
    body: "The audio quality in this app is outstanding. Every note is crystal clear, from the deep bass to the sharp highs. If you're a true music lover, you will appreciate the sound precision and richness this app offers.",
    img: "thomas-zahner",
  },
  {
    name: "Jason Cottrell",
    username: "Daniel Lopes, Frontend Developer",
    body: "One of the best things about this app is its speed. Songs load almost instantly, and there's no lag at all. Even when I have a large playlist, the app handles it effortlessly, making it a top choice for music streaming.",
    img: "jasoncottrell-sm",
  },
];

export function PeopleSay() {
  const initialRotation = "20deg";
  const isVertical = "top";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";
  const transition: Transition = {
    type: "spring",
    stiffness: 150,
    damping: 25,
  };
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const reposts = useStore($reposts);
  const bookmarks = useStore($bookmarks);
  const likes = useStore($likes);
  const views = useStore($views);
  React.useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.removeProperty("overflow-y");
    }
  }, [open]);
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-[2.75rem]/none">
          <p>What People Say ?</p>
        </div>
        <span className="text-md w-[557px] text-center dark:text-[#a1a1a1]">
          Discover what users around the world are saying about our music
          software. From producers to casual listeners, hear real feedback on
          how it&apos;s transforming the way they create, mix, and enjoy music.
        </span>
      </div>
      <div className="relative grid justify-items-center gap-8 min-[300px]:grid-cols-1 xl:grid-cols-3">
        <AnimatePresence>
          {" "}
          {open && (
            <motion.div
              // overlay toàn màn hình
              data-state={open ? "open" : "closed"}
              className={`data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 data-[state=open]:bg-black/80`}
              onClick={() => setOpen(false)} // click overlay thì đóng
            >
              <motion.div
                onClick={(e) => e.stopPropagation()} // chặn click trong modal
                initial={{
                  opacity: 0,
                  filter: "blur(4px)",
                  transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(4px)",
                  transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
                }}
                transition={transition}
                className="border-input height-[24rem] absolute top-1/2 left-1/2 flex w-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl border bg-black p-[1rem]"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <Image
                      alt={items[index].img}
                      src={`/${items[index].img}.avif`}
                      width={50}
                      height={50}
                      className="h-[30px] w-[40px]"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-1">
                    <p className="text-sm">{items[index].name}</p>
                    <p className="text-xs text-[#a1a1a1]">
                      @{items[index].username}
                    </p>
                  </div>
                </div>
                <div>{items[index].body}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#ffffff"
                      viewBox="0 0 256 256"
                    >
                      <path d="M240.49,103.52l-80-80A12,12,0,0,0,140,32V68.74c-25.76,3.12-53.66,15.89-76.75,35.47-29.16,24.74-47.32,56.69-51.14,90A16,16,0,0,0,39.67,207h0c10.46-11.14,47-45.74,100.33-50.42V192a12,12,0,0,0,20.48,8.48l80-80A12,12,0,0,0,240.49,103.52ZM164,163V144a12,12,0,0,0-12-12c-49,0-86.57,21.56-109.79,40.11,7.13-18.16,19.63-35.22,36.57-49.59C101.3,103.41,128.67,92,152,92a12,12,0,0,0,12-12V61l51,51Z"></path>
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#ffffff"
                      viewBox="0 0 256 256"
                    >
                      <path d="M237,77.47A28,28,0,0,0,216,68H164V56a44.05,44.05,0,0,0-44-44,12,12,0,0,0-10.73,6.63L72.58,92H32a20,20,0,0,0-20,20v88a20,20,0,0,0,20,20H204a28,28,0,0,0,27.78-24.53l12-96A28,28,0,0,0,237,77.47ZM36,116H68v80H36ZM220,96.5l-12,96a4,4,0,0,1-4,3.5H92V106.83L126.82,37.2A20,20,0,0,1,140,56V80a12,12,0,0,0,12,12h64a4,4,0,0,1,4,4.5Z"></path>
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#ffffff"
                      viewBox="0 0 256 256"
                    >
                      <path d="M216,44H40A20,20,0,0,0,20,64V224A19.82,19.82,0,0,0,31.56,242.1a20.14,20.14,0,0,0,8.49,1.9,19.91,19.91,0,0,0,12.82-4.72l.12-.11L84.47,212H216a20,20,0,0,0,20-20V64A20,20,0,0,0,216,44Zm-4,144H80a11.93,11.93,0,0,0-7.84,2.92L44,215.23V68H212Z"></path>
                    </svg>
                  </div>
                  <p className="text-xs">March 15, 2024</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {items.map((item, index) => (
          <div
            onClick={() => {
              setIndex(index), setOpen(true);
            }}
            key={item.name}
            className="flex-cols gap text-card-foreground relative flex cursor-pointer flex-col justify-between gap-3 rounded-lg border bg-[#0c0c0c] p-4 shadow-xs min-[300px]:w-[300px] xl:w-[400px]"
          >
            {/* <div className="absolute -left-[10px] -top-[10px] h-[10px] w-[10px] border-b border-r"></div>
              <div className="absolute -right-[10px] -top-[10px] h-[10px] w-[10px] border-b border-l"></div>
              <div className="absolute -bottom-[10px] -left-[10px] h-[10px] w-[10px] border-r border-t"></div>
              <div className="absolute -bottom-[10px] -right-[10px] h-[10px] w-[10px] border-l border-t"></div> */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between gap-1 text-sm leading-tight sm:text-base">
                <div className="flex items-center gap-3">
                  <div>
                    <Image
                      alt={item.img}
                      src={`/${item.img}.avif`}
                      width={"50"}
                      height={"50"}
                      className="h-[30px] w-[40px]"
                    ></Image>
                  </div>
                  <div className="flex w-full flex-col gap-1">
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-[#a1a1a1]">@{item.username}</p>
                  </div>
                </div>
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
              <span className="text-sm text-white">
                &quot;{item.body}&quot;
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M240.49,103.52l-80-80A12,12,0,0,0,140,32V68.74c-25.76,3.12-53.66,15.89-76.75,35.47-29.16,24.74-47.32,56.69-51.14,90A16,16,0,0,0,39.67,207h0c10.46-11.14,47-45.74,100.33-50.42V192a12,12,0,0,0,20.48,8.48l80-80A12,12,0,0,0,240.49,103.52ZM164,163V144a12,12,0,0,0-12-12c-49,0-86.57,21.56-109.79,40.11,7.13-18.16,19.63-35.22,36.57-49.59C101.3,103.41,128.67,92,152,92a12,12,0,0,0,12-12V61l51,51Z"></path>
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M237,77.47A28,28,0,0,0,216,68H164V56a44.05,44.05,0,0,0-44-44,12,12,0,0,0-10.73,6.63L72.58,92H32a20,20,0,0,0-20,20v88a20,20,0,0,0,20,20H204a28,28,0,0,0,27.78-24.53l12-96A28,28,0,0,0,237,77.47ZM36,116H68v80H36ZM220,96.5l-12,96a4,4,0,0,1-4,3.5H92V106.83L126.82,37.2A20,20,0,0,1,140,56V80a12,12,0,0,0,12,12h64a4,4,0,0,1,4,4.5Z"></path>
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,44H40A20,20,0,0,0,20,64V224A19.82,19.82,0,0,0,31.56,242.1a20.14,20.14,0,0,0,8.49,1.9,19.91,19.91,0,0,0,12.82-4.72l.12-.11L84.47,212H216a20,20,0,0,0,20-20V64A20,20,0,0,0,216,44Zm-4,144H80a11.93,11.93,0,0,0-7.84,2.92L44,215.23V68H212Z"></path>
                </svg>
              </div>
              <p className="text-xs">March 15, 2024</p>
            </div>
            {/* <Activity
              className="~px-0/16"
              likes={likes.count}
              onLike={$likes.toggle}
              liked={likes.hasIncremented}
              reposts={reposts.count}
              onRepost={$reposts.toggle}
              reposted={reposts.hasIncremented}
              bookmarks={bookmarks.count}
              onBookmark={$bookmarks.toggle}
              bookmarked={bookmarks.hasIncremented}
              views={views.count}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
