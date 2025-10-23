import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Audio | Decent",
  description: "Decent - Audio",
};
export default function AudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      {children}
    </section>
  );
}
