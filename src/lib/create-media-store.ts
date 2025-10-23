import { create } from "zustand"

import type { PlayerRootStore } from "@/hooks/limeplay/use-player-root-store"
import { createPlayerRootStore } from "@/hooks/limeplay/use-player-root-store"

export type TypeMediaStore = PlayerRootStore & {}

export interface CreateMediaStoreProps {
  debug?: boolean
}

export function createMediaStore(initProps?: Partial<CreateMediaStoreProps>) {
  const mediaStore = create<TypeMediaStore>()((...etc) => ({
    ...createPlayerRootStore(...etc),
    ...initProps,
  }))
  return mediaStore
}
