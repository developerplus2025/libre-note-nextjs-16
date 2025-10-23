import React from "react"

import { cn } from "@/lib/utils"
import { BottomControls } from "@/components/linear-player/components/bottom-controls"
import { MediaElement } from "@/components/linear-player/components/media-element"
import { PlayerHooks } from "@/components/linear-player/components/player-hooks"
import { FallbackPoster } from "@/components/limeplay/fallback-poster"
import { LimeplayLogo } from "@/components/limeplay/limeplay-logo"
import { MediaProvider } from "@/components/limeplay/media-provider"
import * as Layout from "@/components/limeplay/player-layout"
import { RootContainer } from "@/components/limeplay/root-container"

export interface LinearMediaPlayerProps {
  src?: string
  debug?: boolean
  className?: string
}

export const LinearMediaPlayer = React.forwardRef<
  HTMLDivElement,
  LinearMediaPlayerProps
>(({ src, debug = false, className }, ref) => {
  return (
    <MediaProvider debug={debug}>
      <RootContainer
        ref={ref}
        height={720}
        width={1280}
        className={cn(`m-auto w-full md:min-w-80`, className)}
      >
        <Layout.PlayerContainer className="h-[34rem] rounded-xl">
          <FallbackPoster className="bg-black">
            <LimeplayLogo />
          </FallbackPoster>
          <MediaElement src={src} />
          <PlayerHooks />
          <Layout.ControlsOverlayContainer />
          <Layout.ControlsContainer>
            <Layout.ControlsBottomContainer>
              <BottomControls />
            </Layout.ControlsBottomContainer>
          </Layout.ControlsContainer>
        </Layout.PlayerContainer>
      </RootContainer>
    </MediaProvider>
  );
})

LinearMediaPlayer.displayName = "LinearMediaPlayer"
