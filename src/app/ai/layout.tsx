import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI | Decent",
  description: "Decent - AI",
};
export default function AILayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center">
      {children}
    </section>
  );
}
