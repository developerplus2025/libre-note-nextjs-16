import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Radio | Decent",
  description: "Decent - Radio",
};
export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-center justify-center pt-28">
      {children}
    </section>
  );
}
