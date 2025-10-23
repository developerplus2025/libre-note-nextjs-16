import { create } from "zustand"

import type { MediaStateStore } from "@/hooks/limeplay/use-media-state"
import { createMediaStateStore } from "@/hooks/limeplay/use-media-state"
import type { PlayerRootStore } from "@/hooks/limeplay/use-player-root-store"
import { createPlayerRootStore } from "@/hooks/limeplay/use-player-root-store"
import type { TimelineStore } from "@/hooks/limeplay/use-timeline"
import { createTimelineStore } from "@/hooks/limeplay/use-timeline"
import type { VolumeStore } from "@/hooks/limeplay/use-volume"
import { createVolumeStore } from "@/hooks/limeplay/use-volume"

export type TypeMediaStore = PlayerRootStore &
  VolumeStore &
  MediaStateStore &
  TimelineStore

export interface CreateMediaStoreProps {
  debug?: boolean
}

export function createMediaStore(initProps?: Partial<CreateMediaStoreProps>) {
  const mediaStore = create<TypeMediaStore>()((...etc) => ({
    ...createPlayerRootStore(...etc),
    ...createVolumeStore(...etc),
    ...createMediaStateStore(...etc),
    ...createTimelineStore(...etc),
    ...initProps,
  }))
  return mediaStore
}
