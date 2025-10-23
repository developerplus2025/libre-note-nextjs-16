import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Version 2.0 | Decent",
  description: "Decent - 2.0",
};
export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
