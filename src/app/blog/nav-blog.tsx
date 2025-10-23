"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { AnimatedTabs } from "./AnimationTab";

import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { DatePickerBlog } from "./date-picker-blog";
export default function NavBlog() {
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
  useEffect(() => {
    if (arraypath.length == 2) {
      setShow(false);
    } else if (arraypath.length == 3) {
      setShow(true);
    } else {
      setShow(true);
    }
  }, [arraypath.length]);
  return (
    <div>
      {show && (
        <div className="flex w-full items-center justify-between gap-[4rem] pt-[3rem]">
          <h2 className="flex-shrink-0 text-2xl font-bold tracking-tight text-nowrap">
            Recent Articles
          </h2>
          <AnimatedTabs />
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search for favorite songs"
              className="w-full rounded-full pl-[3rem] placeholder:text-[#7c7c7c]"
            />
            <MagnifyingGlassIcon
              width="21"
              height="21"
              className="search_input-blog absolute top-1/2 left-[16px] -translate-y-1/2"
            />
          </div>
          <DatePickerBlog />
        </div>
      )}
    </div>
  );
}
