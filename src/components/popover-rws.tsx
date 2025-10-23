"use client";

import React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow as floatingArrow,
  autoUpdate,
} from "@floating-ui/react";
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";
import { useSize } from "@radix-ui/react-use-size";
import * as ArrowPrimitive from "@radix-ui/react-arrow";

export default function PopoverRws() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const arrowRef = React.useRef<SVGSVGElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<SVGSVGElement | null>(
    null,
  );
  const arrowSize = useSize(arrowElement as unknown as HTMLElement | null);
  

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    placement: "bottom",
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(arrowSize?.height ?? 6),
      flip(),
      shift({ padding: 8 }),
      floatingArrow({ element: arrowElement }),
    ],
    whileElementsMounted: autoUpdate,
  });

  // Gán ref thủ công cho button
  useLayoutEffect(() => {
    refs.setReference(buttonRef.current);
  }, [refs]);

  const side = placement.split("-")[0] as "top" | "bottom" | "left" | "right";

  return (
    <div style={{ padding: 100 }}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        Toggle Popover
      </button>

      {open && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            position: "fixed",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 9999,
          }}
        >
          <ArrowPrimitive.Root
            ref={(node) => {
              arrowRef.current = node;
              setArrowElement(node);
            }}
            width={10}
            height={5}
            style={{
              position: "absolute",
              left: middlewareData.arrow?.x ?? 0,
              top: middlewareData.arrow?.y ?? 0,
              [side]: "-5px",
              fill: "white",
              stroke: "#ddd",
              strokeWidth: 1,
            }}
          />
          This is a popover
        </div>
      )}
    </div>
  );
}
