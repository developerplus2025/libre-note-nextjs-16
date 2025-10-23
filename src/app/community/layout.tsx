import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Community | Decent",
  description: "Decent - Community",
};
export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
