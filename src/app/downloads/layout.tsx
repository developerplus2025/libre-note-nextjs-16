import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Download",
  description: "Decent",
};
export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
