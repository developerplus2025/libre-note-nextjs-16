import CompAvatar from "@/components/comp-412";
import BeautifulFeaturesLayout from "./components/beautiful-features-layout";
import SocialProof from "./components/social-proof";
import Metric from "./components/metric";
import PowerBy from "./components/power-by";
import AccordionFAQ from "./components/faq";
import { PeopleSay } from "./components/people-say";
import { NavigationEffect } from "@/components/NavigationEffect";
import MainTextHome from "./components/main-text-home";
import { Badge } from "@/components/luxe/badge";
import PopoverRws from "@/components/popover-rws";
import LogoCloud from "@/components/logo-cloud";
import BlurCollapsible from "@/components/BlurCollapsible";
import BlockTheme from "../docs/components/block-theme";
import { Metadata } from "next";
import ContentHome from "./content-home";
const title = "Decent: The Open Source AI Music Studio";
const description =
  "Dive into a seamless music experience with our cutting edge software. Collaborate effortlessly, unleash your creativity, manage playlists and craft professional quality tracks all in one powerful platform.";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title,
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title,
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
};

export default function Home() {
  
  return <ContentHome />;
}
