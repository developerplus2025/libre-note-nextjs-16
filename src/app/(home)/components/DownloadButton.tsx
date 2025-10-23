// components/DownloadButton.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Wind } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DownloadButton: React.FC = () => {
  const router = useRouter();
  const [downloadReady, setDownloadReady] = useState(false);

  const handleClick = async () => {
    // Chuyển trang và chờ quá trình chuyển hoàn tất
    await router.push("/docs/user-windows-download");
    setDownloadReady(true);
  };
  return (
    <Button className="group" variant={"outline"} onClick={handleClick}>
      <div className="flex h-[1rem] w-[2rem]  flex-col items-center overflow-y-hidden">
        <ArrowDownToLine className="mr-2 h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-[2rem]" />
        <ArrowDownToLine className="mr-2 h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-[1rem] groud-hover:top-0" />
      </div>
      Download for Windows
    </Button>
  );
};

export default DownloadButton;
