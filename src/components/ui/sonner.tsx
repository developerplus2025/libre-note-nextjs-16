"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-text": "var(--bg-input/30)",
          "--normal-border": "var(input)",
          "--toast-close-button-transform": "translate(0%, 0%);",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster }
