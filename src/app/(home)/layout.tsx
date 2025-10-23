import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import { PageTree } from "../docs/components/page-tree";
import { source } from "@/lib/source";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Decent | The Open Source AI Music Studio",
  description: "Decent | Home",
  openGraph: {
    title: "Decent: The Open Source AI Music Studio",
    description:
      "Dive into a seamless music experience with our cutting edge software. Collaborate effortlessly, unleash your creativity, manage playlists and craft professional quality tracks all in one powerful platform.",
  },
};
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
