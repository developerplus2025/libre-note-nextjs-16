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

type ModeItem = {
  id: number;
  icon: React.JSX.Element;
  name: string;
  title: string;
  description: string;
  directSrc: string;
};

type ModeGuided = {
  docs: ModeItem;
  api: ModeItem;
};

export function ModeGuidedSwitcher({ ModeGuided }: { ModeGuided: ModeGuided }) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedGuidedMode, setSelectedGuidedMode] = React.useState<
    keyof ModeGuided
  >(pathname.includes("api-reference") ? "api" : "docs");

 // 🔹 Xác định mode dựa theo pathname
 React.useEffect(() => {
   if (pathname.includes("api-reference")) {
     setSelectedGuidedMode("api");
   } else {
     setSelectedGuidedMode("docs");
   }
 }, [pathname]);

  const items = Object.entries(ModeGuided); // [['docs', {...}], ['api', {...}]]

  const current = ModeGuided[selectedGuidedMode];

  if (!current) return null; // tránh crash khi chưa có dữ liệu

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
                <span className="text-xs font-medium">{current.title}</span>
                <span className="text-xs text-[#a1a1a1]">
                  {current.description}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {items.map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                className="gap-[1rem] hover:!bg-[#1b1b1b]"
                onSelect={() => {
                  setSelectedGuidedMode(key as keyof ModeGuided);
                  router.push(`/docs/${value.directSrc}`);
                }}
              >
                {value.icon}
                <div className="flex flex-col text-xs">
                  <span>{value.title}</span>
                  <span className="text-[#a1a1a1]">{value.description}</span>
                </div>
                {key === selectedGuidedMode && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
