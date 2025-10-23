"use client";
import React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";
import Head from "next/head";
import { motion } from "motion/react";
export const ThemeToggle = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof IconButton>) => {
  const { theme, systemTheme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <style>{`
        :root, .light, .light-theme {
          --theme-toggle-sun-icon-display: block;
          --theme-toggle-moon-icon-display: none;
        }
        .dark, .dark-theme {
          --theme-toggle-sun-icon-display: none;
          --theme-toggle-moon-icon-display: block;
        }
      `}</style>
      </Head>

      <div
        onClick={() => {
          // Set 'system' theme if the next theme matches the system theme
          const resolvedTheme = theme === "system" ? systemTheme : theme;
          const newTheme = resolvedTheme === "dark" ? "light" : "dark";
          const newThemeMatchesSystem = newTheme === systemTheme;
          setTheme(newThemeMatchesSystem ? "system" : newTheme);
        }}
        className="radix-themes-custom-fonts flex h-[30px] w-[37px] cursor-pointer items-center justify-center rounded-md border bg-white transition-all duration-200 ease-out hover:bg-muted dark:bg-black dark:hover:bg-[#101010]"
        content="Toggle theme"
      >
        <IconButton
          size="3"
          variant="ghost"
          color="gray"
          aria-label="Toggle theme"
          {...props}
        >
          <motion.svg
            exit={{ scale: 100 }}
            style={{
              color: "currentcolor",
              display: "var(--theme-toggle-sun-icon-display)",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[20px] scale-100"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 3l0 18" />
            <path d="M12 9l4.65 -4.65" />
            <path d="M12 14.3l7.37 -7.37" />
            <path d="M12 19.6l8.85 -8.85" />
          </motion.svg>

          <motion.svg
            exit={{ scale: 100 }}
            style={{
              color: "currentcolor",
              display: "var(--theme-toggle-moon-icon-display)",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[20px]"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 3l0 18" />
            <path d="M12 9l4.65 -4.65" />
            <path d="M12 14.3l7.37 -7.37" />
            <path d="M12 19.6l8.85 -8.85" />
          </motion.svg>
        </IconButton>
      </div>
    </>
  );
};
