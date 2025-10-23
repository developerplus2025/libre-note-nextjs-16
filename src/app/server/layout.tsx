import type { Metadata } from "next";
import ServerPage from "./page";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
export const metadata: Metadata = {
  title: "Server | Decent",
  description: "Decent - Server",
};
export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-[calc(100vh-58.8px)] flex-col items-center justify-center gap-[6rem] pt-28">
      <Suspense fallback={<Loader variant="classic" />}>
        <ServerPage />
      </Suspense>
    </section>
  );
}
