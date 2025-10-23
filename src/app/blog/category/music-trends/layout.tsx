import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog - Decent",
  description: "Blog - Decent",
};
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="">{children}</section>;
}
