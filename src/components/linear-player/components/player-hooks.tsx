"use client"

import React from "react"

import { useMediaStates } from "@/hooks/limeplay/use-media-state"
import { useShakaPlayer } from "@/hooks/limeplay/use-shaka-player"
import { useTimelineStates } from "@/hooks/limeplay/use-timeline"
import { useVolumeStates } from "@/hooks/limeplay/use-volume"

export const PlayerHooks = React.memo(() => {
  useShakaPlayer()
  useMediaStates()
  useTimelineStates()
  useVolumeStates()

  return null
})

PlayerHooks.displayName = "PlayerHooks"
