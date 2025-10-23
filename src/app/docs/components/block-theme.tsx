"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BlockTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [animating, setAnimating] = useState(false);

  const toggleTheme = () => {
    setAnimating(true);

    // Sau một khoảng thời gian animation xong thì đổi theme
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setAnimating(false);
    }, 600); // 600ms tuỳ theo animation CSS
  };

  return (
    <div className="relative h-[80px] w-[300px] overflow-hidden">
      {/* Layer nền */}
      <div
        className={`absolute inset-0 h-full w-full transition-colors duration-500 ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      />

      {/* Layer animation (overlay) */}
      {animating && (
        <div
          className={`theme-switcher_clipPathReveal__l8VbV absolute inset-0 h-full w-full ${
            theme === "dark" ? "bg-white" : "bg-black"
          }`}
          style={{
            clipPath: "inset(0 0 0 0)",
            transition: "clip-path 0.6s ease",
          }}
        />
      )}

      {/* Nội dung */}
      <div className="relative z-10 p-2 text-sm">
        <h1 className="font-bold">
          Experience the theme switch animation yourself.
        </h1>
        <p>
          This technique is using <code>clip-path</code>, the element is
          duplicated and overlayed. By animating <code>clip-path</code>, we
          reveal the new theme.
        </p>
      </div>

      {/* Button */}
      <div className="relative z-10 mt-2">
        <Button onClick={toggleTheme}>Toggle Theme</Button>
      </div>
    </div>
  );
}
