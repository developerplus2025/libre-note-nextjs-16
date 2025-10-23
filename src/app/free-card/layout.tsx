import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Generation | Decent",
  description: "Decent - Generation",
};
export default function FreeCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-[calc(100vh-50px)] items-center justify-center pt-[50px]">
      {children}
    </section>
  );
}
