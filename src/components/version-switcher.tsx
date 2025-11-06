"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

type VersionItem = {
  id: number;
  name: string;
  version: string;
  icon: React.JSX.Element;
  directSrc: string; // ví dụ "4.5.9", "5.2.1"
};

export function VersionSwitcher({
  VersionGuided,
}: {
  VersionGuided: VersionItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  // 🧩 Cắt nhỏ đường dẫn
  const pathParts = pathname.split("/").filter(Boolean);
  // → ["docs", "api-reference", "4.5.9", "getting-started"]

  // 🧠 Tìm version dựa trên dữ liệu có sẵn
  const matchedVersionObj = VersionGuided.find((v) =>
    pathParts.includes(v.directSrc),
  );

  const [selectedVersion, setSelectedVersion] = React.useState(
    matchedVersionObj?.name || "Latest Version",
  );

  // 🧭 Khi đổi trang → cập nhật version
  React.useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const matched = VersionGuided.find((v) => pathParts.includes(v.directSrc));
    setSelectedVersion(matched?.name || "Latest Version");
  }, [pathname, VersionGuided]);

  const current = VersionGuided.find((v) => v.name === selectedVersion);
  if (!current) return null;

  // 🧩 Lấy slug phụ (nếu có)
  const slug = pathParts[pathParts.length - 1];
  const isSlugPage = slug !== current.directSrc; // vd "getting-started" ≠ "4.5.9"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="border-input w-[15rem] border focus-visible:ring-0 active:bg-black"
            asChild
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:text-sidebar-accent-foreground hover:bg-black data-[state=open]:bg-[#1b1b1b]"
            >
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg border border-transparent">
                {current.icon}
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-xs font-medium">{current.name}</span>
                <span className="text-xs text-[#a1a1a1]">
                  {current.version}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {VersionGuided.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className="gap-[1rem] hover:!bg-[#1b1b1b]"
                onSelect={() => {
                  setSelectedVersion(item.name);

                  // 🔗 Giữ nguyên cấu trúc /docs/api-reference/... khi đổi version
                  const basePath = pathParts
                    .slice(0, pathParts.indexOf(current.directSrc))
                    .join("/");

                  // Nếu có slug phụ (vd: getting-started) → giữ lại
                  const nextPath = isSlugPage
                    ? `/${basePath}/${item.directSrc}/${slug}`
                    : `/${basePath}/${item.directSrc}`;

                  router.push(nextPath);
                }}
              >
                {item.icon}
                <div className="flex flex-col text-xs">
                  <span>{item.name}</span>
                  <span className="text-[#a1a1a1]">{item.version}</span>
                </div>
                {selectedVersion === item.name && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
