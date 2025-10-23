import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Decent WebApp",
  description: "Decent WebApp",
};
export default function DecentWebAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
