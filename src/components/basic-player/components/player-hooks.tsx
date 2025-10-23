"use client"

import React from "react"

import { useMediaStates } from "@/hooks/limeplay/use-media-state"
import { useShakaPlayer } from "@/hooks/limeplay/use-shaka-player"

export const PlayerHooks = React.memo(() => {
  useShakaPlayer()
  useMediaStates()

  return null
})

PlayerHooks.displayName = "PlayerHooks"
