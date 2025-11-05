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

type VersionGuidedItem = {
  id: number;
  name: string;
  version: string;
  icon: React.JSX.Element;
  directSrc: string;
};

type Props = {
  VersionGuided: VersionGuidedItem[];
  defaultModeGuided: string; // ví dụ: "Latest Version"
};

export function VersionSwitcher({ VersionGuided, defaultModeGuided }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  // chia path
  const segments = pathname.split("/").filter(Boolean);

  // lấy version từ URL (nếu có dạng x.y.z)
  const urlVersion = segments.find((seg) => /^\d+(\.\d+)*$/.test(seg));

  // xác định version hiện tại
  const currentVersion =
    urlVersion ||
    VersionGuided.find((v) => v.name === defaultModeGuided)?.version ||
    "";

  const [selectedId, setSelectedId] = React.useState<string>(currentVersion);

  // cập nhật state khi pathname thay đổi
  React.useEffect(() => {
    setSelectedId(currentVersion);
  }, [pathname]);

  const selectedItem =
    VersionGuided.find((item) => item.version === selectedId) ||
    VersionGuided[0]; // fallback (Latest Version)

  const basePath = React.useMemo(() => {
    // loại bỏ phần version khỏi URL nếu có
    if (urlVersion) {
      return pathname.replace(`/${urlVersion}`, "");
    }
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }, [pathname, urlVersion]);

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
                {selectedItem?.icon}
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-xs font-medium">
                  Using {selectedItem?.name || defaultModeGuided}
                </span>
                <span className="text-xs text-[#a1a1a1]">
                  {selectedItem?.version || ""}
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
                  setSelectedId(item.version);
                  if (item.directSrc === "") {
                    // nếu là Latest Version → không có version trong URL
                    router.push(basePath);
                  } else {
                    // thêm version vào cuối URL
                    router.push(`${basePath}/${item.directSrc}`);
                  }
                }}
              >
                {item.icon}
                <div className="flex flex-col text-xs">
                  <span>{item.name}</span>
                  <span className="text-[#a1a1a1]">{item.version}</span>
                </div>

                {item.version === selectedId && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
