"use client";
import React, { useState } from "react";
import DownloadButton from "./DownloadButton";

import { Button } from "@/components/ui/button";

export default function ButtonAction() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-[300px]:flex min-[300px]:w-[200px] min-[300px]:flex-col min-[300px]:items-center min-[300px]:gap-[1rem] xl:flex xl:w-fit xl:flex-row xl:items-center xl:justify-center xl:gap-8">
      <DownloadButton />

      <Button
        className="min-[300px]:w-full md:w-fit xl:w-fit"
        onClick={() => setOpen(true)}
        variant={"default"}
      >
        <svg
          className="mr-2 h-4 w-4"
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
        Wacth Demo Now
      </Button>
    </div>
  );
}
