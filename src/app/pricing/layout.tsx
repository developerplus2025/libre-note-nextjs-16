import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pricing | Decent",
  description: "Decent - Pricing",
};
export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
