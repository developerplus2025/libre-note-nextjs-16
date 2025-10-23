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

type VersionGuidedItem = {
  id: number;
  name: string;
  version: string;
  icon: React.JSX.Element;
};

type Props = {
  VersionGuided: VersionGuidedItem[];
  defaultModeGuided: number; // id của version mặc định
};

export function VersionSwitcher({ VersionGuided, defaultModeGuided }: Props) {
  const [selectedId, setSelectedId] = React.useState<number>(defaultModeGuided);

  // tìm object đang được chọn
  const selectedItem = VersionGuided.find((item) => item.id === selectedId);

  return (
    <SidebarMenu className="pl-[1.5rem]">
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
                <span className="font-medium">Using {selectedItem?.name}</span>
                <span className="text-xs text-[#a1a1a1]">
                  {selectedItem?.version}
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
                className="gap-[1rem] hover:!bg-[#1b1b1b]"
                key={item.id}
                onSelect={() => setSelectedId(item.id)}
              >
                {item.icon}
                <div className="flex flex-col text-xs">
                  <span>{item.name}</span>
                  <span>{item.version}</span>
                </div>

                {item.id === selectedId && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
