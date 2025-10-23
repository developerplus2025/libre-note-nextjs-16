"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
type NavigationIconProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
export default function NavigationIcon({ open, setOpen }: NavigationIconProps) {
  return (
    <div
      className="group border-none hover:bg-none focus:bg-none"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          className="ease-[cubic-bezier(.5,.85,.25,1.1)] origin-center transition-all duration-300 group-aria-expanded:translate-x-[0px] group-aria-expanded:translate-y-[5px] group-aria-expanded:-rotate-45"
          d="M1.75 4H1V5.5H1.75H14.25H15V4H14.25H1.75Z"
          fill="currentColor"
        />

        <path
          className="ease-[cubic-bezier(.5,.85,.25,1.8)] origin-center transition-all duration-300 group-aria-expanded:rotate-45"
          d="M1.75 10.5H1V12H1.75H14.25H15V10.5H14.25H1.75Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
