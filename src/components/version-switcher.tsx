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
  directSrc: string; // ví dụ: "4.5.9", "6.7.8"
};

export function VersionSwitcher({
  VersionGuided,
}: {
  VersionGuided: VersionItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  // 🔹 Phân tích đường dẫn để lấy phần version (vd: "4.5.9" trong /docs/api-reference/4.5.9/getting-started)
  const pathParts = pathname.split("/").filter(Boolean);
  const versionPart =
    pathParts.length >= 3
      ? pathParts[pathParts.length - 2] // nếu có slug con (như "getting-started")
      : pathParts[pathParts.length - 1]; // nếu không có slug con

  // 🔹 Xác định version từ URL
  const matchedVersion =
    VersionGuided.find((v) => versionPart.includes(v.directSrc))?.name ||
    "Latest Version";

  const [selectedVersion, setSelectedVersion] = React.useState(matchedVersion);

  // 🔹 Cập nhật khi pathname thay đổi
  React.useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const versionPart =
      pathParts.length >= 3
        ? pathParts[pathParts.length - 2]
        : pathParts[pathParts.length - 1];

    const matched =
      VersionGuided.find((v) => versionPart.includes(v.directSrc))?.name ||
      "Latest Version";
    setSelectedVersion(matched);
  }, [pathname, VersionGuided]);

  const current = VersionGuided.find((v) => v.name === selectedVersion);
  if (!current) return null;

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

                  // 🔹 Giữ nguyên phần mode (docs/api-reference)
                  const basePath = pathParts.slice(0, 2).join("/");
                  router.push(`/${basePath}/${item.directSrc}`);
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
