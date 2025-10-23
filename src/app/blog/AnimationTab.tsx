"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const TABS = [
  { id: 1, label: "All Posts", link: "" },
  { id: 2, label: "Plugins", link: "/category/plugins/" },
  { id: 3, label: "Production Tips", link: "/category/production-tips/" },
  { id: 4, label: "Music Trends", link: "/category/music-trends/" },
];

const normalizePath = (path: string) => path.replace(/\/$/, "");

export function AnimatedTabs() {
  const path = usePathname();
   const pathname = path.slice(1).split("/");
   const arraypath = pathname;
   const [show, setShow] = useState(() => {
     if (arraypath.length == 2) {
       return false;
     } else if (arraypath.length == 3) {
       return true;
     } else {
       return true;
     }
   });

   const getInitialIndex = (path: string) => {
     if (path === "/blog") {
       return 0;
     } else if (path === "/blog/category/plugins") {
       return 1;
     } else if (path === "/blog/category/production-tips") {
       return 2;
     } else {
       return 3;
     }
   };

   const [activeTab, setActiveTab] = useState(TABS[getInitialIndex(path)].id);
   useInsertionEffect(() => {
     setActiveTab(TABS[getInitialIndex(path)].id);
   }, [path]);

   useEffect(() => {
     const pathname = path.slice(1).split("/");
     const arraypath = pathname;
     if (arraypath.length == 2) {
     }
   });

  const router = useRouter();
  return (
    <div className="flex space-x-1">
      {show &&
        TABS.map((tab) => (
          <Link href={`/blog/${tab.link}`} key={tab.id}>
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
              }}
              className={`${
                activeTab === tab.id ? "" : "hover:text-white/60"
              } relative flex h-8 items-center justify-center rounded-full p-3 text-sm font-medium text-nowrap text-white outline-sky-400 transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  initial={false}
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference"
                  style={{ borderRadius: 9999 }}
                  transition={{ duration: 0.25 }}
                />
              )}
              {tab.label}
            </button>
          </Link>
        ))}
    </div>
  );
}
