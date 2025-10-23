import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-12 flex h-[calc(100vh-80px)] w-full justify-center">
      <div className="flex h-[400px] w-[900px] flex-col items-center justify-center gap-8 rounded-lg">
        <p className="text-[6rem] font-semibold">404</p>
        <p className="w-[500px] text-center text-3xl font-medium">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant={"outline"}>Home</Button>
          </Link>
          <Link href="/docs">
            <Button variant={"outline"}>Docs</Button>
          </Link>
          <Link href="/pricing">
            <Button variant={"outline"}>Pricing</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
