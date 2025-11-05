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
  defaultModeGuided: string; // version mặc định (vd: "5.4.2")
};

export function VersionSwitcher({ VersionGuided, defaultModeGuided }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  // lấy các phần trong URL
  const segments = pathname.split("/").filter(Boolean); // loại bỏ phần rỗng

  // logic lấy version từ URL
  const currentVersion = segments[segments.length - 1]?.match(/^\d+(\.\d+)*$/) // kiểm tra xem có phải version dạng 1.0.0
    ? segments[segments.length - 1]
    : segments.length > 2 && segments[2]?.match(/^\d+(\.\d+)*$/)
      ? segments[2]
      : defaultModeGuided;

  const [selectedId, setSelectedId] = React.useState<string>(currentVersion);

  // Cập nhật khi pathname thay đổi
  React.useEffect(() => {
    setSelectedId(currentVersion);
  }, [pathname]);

  const selectedItem = VersionGuided.find(
    (item) => item.name === selectedId || item.version === selectedId,
  );

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
                  Using {selectedItem?.name || "Unknown"}
                </span>
                <span className="text-xs text-[#a1a1a1]">
                  {selectedItem?.version || defaultModeGuided}
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
                  setSelectedId(item.name);
                  // giữ nguyên phần đầu của path, chỉ thay version
                  const basePath =
                    segments.length >= 3 && segments[2].match(/^\d+(\.\d+)*$/)
                      ? segments.slice(0, -1).join("/")
                      : pathname.replace(/\/$/, "");

                  router.push(`${basePath}/${item.directSrc}`);
                }}
              >
                {item.icon}
                <div className="flex flex-col text-xs">
                  <span>{item.name}</span>
                  <span className="text-[#a1a1a1]">{item.version}</span>
                </div>
                {item.name === selectedId && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
