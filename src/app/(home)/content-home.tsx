"use client"
import { Badge } from '@/components/luxe/badge';
import React, { useEffect } from 'react'
import MainTextHome from './components/main-text-home';
import BeautifulFeaturesLayout from './components/beautiful-features-layout';
import LogoCloud from '@/components/logo-cloud';
import AccordionFAQ from './components/faq';
import { PeopleSay } from './components/people-say';
import BlurCollapsible from '@/components/BlurCollapsible';
import BlockTheme from '../docs/components/block-theme';
import { ReactLenis } from "lenis/react";
import Lenis from "lenis";
export default function ContentHome() {
 useEffect(() => {
   const lenis = new Lenis({
     duration: 1.2, 
     easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
     wheelMultiplier: 1, 
     touchMultiplier: 1.5, 
     infinite: false, 
   });

   function raf(time: number) {
     lenis.raf(time);
     requestAnimationFrame(raf);
   }

   requestAnimationFrame(raf);

   return () => {
     lenis.destroy();
   };
 }, []);


  return (
    <ReactLenis root>
      <main className="GeistSans relative flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden xl:pb-4 dark:bg-black dark:scheme-dark">
        <div className="flex w-full flex-col items-center justify-center gap-8 min-[300px]:h-[calc(100vh-0px)] xl:h-[calc(100vh-58.8px)]">
          <div className="flex items-center justify-center gap-4 min-[300px]:flex-col xl:flex-row">
            <Badge variant="animated-border">New</Badge>
            <span className="text-sm">
              Catch up with everything we announced at Ship 25
            </span>
          </div>
          <MainTextHome />
          <h1 className="text-center min-[300px]:w-[200px] min-[300px]:text-xs xl:w-full xl:text-sm">
            By using LibreNote, you agree to its license and privacy statement.
          </h1>
        </div>
        <div className="mx-auto h-px w-full bg-[#262626]"></div>
        <div className="w-full">
          <BeautifulFeaturesLayout />
        </div>
        <div className="mx-auto my-16 h-px w-[700px] bg-linear-to-r from-transparent via-zinc-700 to-transparent dark:via-zinc-300"></div>
        <LogoCloud />
        <div className="mx-auto my-16 h-px w-[700px] bg-linear-to-r from-transparent via-zinc-700 to-transparent dark:via-zinc-300"></div>
        <AccordionFAQ />
        <div className="mx-auto my-16 h-px w-[700px] bg-linear-to-r from-transparent via-zinc-700 to-transparent dark:via-zinc-300"></div>
        <PeopleSay />
        <div className="mx-auto my-16 h-px w-[700px] bg-linear-to-r from-transparent via-zinc-700 to-transparent dark:via-zinc-300"></div>
        <div className="text-center">
          <BlurCollapsible />
          <BlockTheme />
          <p className={`font-[BespokeStencil-BoldItalic] text-[55px]`}>
            Decent
          </p>
        </div>
        <div className="mb-20"> </div>
      </main>
    </ReactLenis>
  );
}
