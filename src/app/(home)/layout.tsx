import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";

import { source } from "@/lib/source";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Decent | The Open Source AI Music Studio",
  description: "Decent | Home",
  openGraph: {
    title: "",
    description: "",
  },
};
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
