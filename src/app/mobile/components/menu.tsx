"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";


import DownloadButton from "@/app/(home)/components/DownloadButton";
import ButtonAction from "@/app/(home)/components/button-action";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
const LinkItem = [
  {
    id: 1,
    name: "Home",
    src: "/",
  },
  {
    id: 2,
    name: "Library",
    src: "/library",
  },
  {
    id: 3,
    name: "Creative",
    src: "/creative",
  },
  {
    id: 4,
    name: "Pricing",
    src: "pricing",
  },
  {
    id: 5,
    name: "Blog",
    src: "/blog",
  },
  {
    id: 6,
    name: "Design",
    src: "/design",
  },
  {
    id: 7,
    name: "Docs",
    src: "/docs",
  },
  {
    id: 8,
    name: "Radio",
    src: "/radio",
  },
  { id: 9, name: "Mobile Listen", src: "/mobile" },
  {
    id: 10,
    name: "Nhận thẻ cào",
    src: "/free-card",
  },
  {
    id: 11,
    name: "Sign In",
    src: "/signin",
  },
  {
    id: 12,
    name: "Sign Up",
    src: "/signup",
  },
];

export function Menu({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
              className,
            )}
          >
            <div className="relative flex h-8 w-4 items-center justify-center">
              <div className="relative size-4">
                <span
                  className={cn(
                    "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                    open ? "top-[0.4rem] -rotate-45" : "top-1",
                  )}
                />
                <span
                  className={cn(
                    "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                    open ? "top-[0.4rem] rotate-45" : "top-2.5",
                  )}
                />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </div>
            <span className="flex h-8 items-center text-lg leading-none font-medium">
              Menu
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-background/90 no-scrollbar -top-[4px] z-[49] h-(--radix-popper-available-height) w-screen overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
          align="start"
          side="bottom"
          alignOffset={-16}
          sideOffset={14}
        >
          <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              <div className="text-muted-foreground text-sm font-medium">
                Menu
              </div>
              <div className="flex flex-col gap-3">
                {LinkItem.map((item) => (
                  <Link
                    onClick={() => setOpen(false)}
                    key={item.id + item.name}
                    href={item.src}
                    className="text-lg font-medium text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <ButtonAction />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
