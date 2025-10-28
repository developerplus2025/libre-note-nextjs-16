"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { source } from "@/lib/source";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { div } from "motion/react-client";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/radix/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VersionSwitcher } from "@/components/version-switcher";
import { ModeGuidedSwitcher } from "@/components/mode-guided-switcher";
import { RootToggle } from "@/src/components/root-toggle";
const data = {
  mode: {
    docs: {
      id: 1,
      icon: (
        <svg
          data-testid="geist-icon"
          height="16"
          stroke-linejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.75 0C2.50736 0 1.5 1.00736 1.5 2.25V13.744V13.75H1.50001C1.50323 14.9899 2.50935 15.994 3.75 15.994H13H14.5V14.494V13.7296V12.994V11.494V0.75V0H13.75H3.75ZM13 11.494V1.5H3.75C3.33579 1.5 3 1.83579 3 2.25V11.622C3.23458 11.5391 3.48702 11.494 3.75 11.494H13ZM3 13.744C3 14.1582 3.33579 14.494 3.75 14.494H13V13.7296V12.994H3.75C3.33579 12.994 3 13.3298 3 13.744Z"
            fill="currentColor"
          ></path>
        </svg>
      ),
      name: "docs",
      title: "Docs",
      description: "The Guided For User",
    },
    api: {
      id: 2,
      icon: (
        <svg
          data-testid="geist-icon"
          height="16"
          stroke-linejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.75 1H0V1.75V13.25V14H0.75H5.5V12.5H1.5V2.5H5C6.24264 2.5 7.25 3.50736 7.25 4.75V6.5H8.75V4.75C8.75 3.50736 9.75736 2.5 11 2.5H14.5V6.5H16V1.75V1H15.25H11C9.7733 1 8.68417 1.58901 8 2.49963C7.31583 1.58901 6.2267 1 5 1H0.75ZM11.0915 10.2175C11.4564 10.0309 11.7944 9.70265 11.9642 9.25H12.0358C12.2056 9.70265 12.5436 10.0309 12.9085 10.2175C12.9698 10.2488 13.0294 10.2833 13.0871 10.3208C13.4317 10.5446 13.886 10.6736 14.3637 10.5941L14.3994 10.6559C14.0923 11.0289 13.9765 11.4857 13.9973 11.8955C13.9991 11.93 14 11.9649 14 12C14 12.0351 13.9991 12.07 13.9973 12.1044C13.9765 12.5143 14.0923 12.9711 14.3994 13.3441L14.3637 13.4059C13.886 13.3264 13.4317 13.4554 13.0871 13.6792C13.0294 13.7167 12.9698 13.7512 12.9085 13.7825C12.5436 13.9691 12.2056 14.2973 12.0358 14.75H11.9642C11.7944 14.2973 11.4564 13.9691 11.0915 13.7825C11.0302 13.7512 10.9706 13.7167 10.9129 13.6792C10.5683 13.4554 10.114 13.3264 9.63627 13.4059L9.60059 13.3441C9.90769 12.9711 10.0235 12.5144 10.0027 12.1045C10.0009 12.07 10 12.0351 10 12C10 11.9649 10.0009 11.93 10.0027 11.8955C10.0235 11.4856 9.9077 11.0289 9.60061 10.6559L9.63629 10.5941C10.114 10.6736 10.5683 10.5446 10.9129 10.3208C10.9706 10.2833 11.0302 10.2488 11.0915 10.2175ZM15.4037 11.4079L15.9641 10.866L14.9641 9.13398L14.215 9.34827C14.0629 9.39177 13.9006 9.35863 13.7679 9.27247C13.6743 9.21169 13.5774 9.15559 13.4775 9.1045C13.3369 9.03257 13.2272 8.90865 13.1888 8.75537L13 8H11L10.8112 8.75537C10.7728 8.90865 10.6631 9.03257 10.5225 9.1045C10.4226 9.15558 10.3257 9.21168 10.2321 9.27247C10.0994 9.35862 9.93709 9.39176 9.78502 9.34826L9.03591 9.13397L8.03591 10.866L8.5963 11.4079C8.70977 11.5176 8.7623 11.6743 8.75427 11.8319C8.75143 11.8876 8.75 11.9436 8.75 12C8.75 12.0564 8.75143 12.1124 8.75427 12.168C8.7623 12.3257 8.70977 12.4824 8.5963 12.5921L8.03589 13.134L9.03589 14.866L9.78501 14.6517C9.93708 14.6082 10.0994 14.6414 10.2321 14.7275C10.3257 14.7883 10.4226 14.8444 10.5225 14.8955C10.6631 14.9674 10.7728 15.0913 10.8112 15.2446L11 16H13L13.1888 15.2446C13.2272 15.0913 13.3369 14.9674 13.4775 14.8955C13.5774 14.8444 13.6743 14.7883 13.7679 14.7275C13.9006 14.6414 14.0629 14.6082 14.215 14.6517L14.9641 14.866L15.9641 13.134L15.4037 12.5921C15.2902 12.4824 15.2377 12.3257 15.2457 12.168C15.2486 12.1124 15.25 12.0564 15.25 12C15.25 11.9436 15.2486 11.8876 15.2457 11.832C15.2377 11.6743 15.2902 11.5176 15.4037 11.4079Z"
            fill="currentColor"
          ></path>
        </svg>
      ),
      name: "api",
      title: "API Reference",
      description: "The Guided For Developer",
    },
  },
};
const version = [
  {
    id: 1,
    name: "Latest Version",
    version: "6.7.8",
    icon: (
      <svg
        data-testid="geist-icon"
        height="16"
        stroke-linejoin="round"
        viewBox="0 0 16 16"
        width="16"
        style={{ color: "currentcolor" }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.5 1.5H6.34315C7.00619 1.5 7.64207 1.76339 8.11091 2.23223L13.8787 8L8 13.8787L2.23223 8.11091C1.76339 7.64207 1.5 7.00619 1.5 6.34315V1.5ZM16 8L14.9393 6.93934L9.17157 1.17157C8.42143 0.421427 7.40401 0 6.34315 0H1.5H0V1.5V6.34315C0 7.40401 0.421426 8.42143 1.17157 9.17157L6.93934 14.9393L8 16L9.06066 14.9393L14.9393 9.06066L16 8ZM4.5 5.25C4.91421 5.25 5.25 4.91421 5.25 4.5C5.25 4.08579 4.91421 3.75 4.5 3.75C4.08579 3.75 3.75 4.08579 3.75 4.5C3.75 4.91421 4.08579 5.25 4.5 5.25Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    name: "Version 5",
    version: "5.4.2",
    icon: (
      <svg
        data-testid="geist-icon"
        height="16"
        stroke-linejoin="round"
        viewBox="0 0 16 16"
        width="16"
        style={{ color: "currentcolor" }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.5 3.5H14.5V5.5H13.5H2.5H1.5V3.5ZM1 7H0V5.5V3.5V2H1.5H14.5H16V3.5V5.5V7H15V12.5C15 13.8807 13.8807 15 12.5 15H3.5C2.11929 15 1 13.8807 1 12.5V7ZM2.5 7V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V7H2.5ZM6 9.5H6.75H9.25H10V11H9.25H6.75H6V9.5Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    id: 3,
    name: "Version 4",
    version: "4.5.9",
    icon: (
      <svg
        data-testid="geist-icon"
        height="16"
        stroke-linejoin="round"
        viewBox="0 0 16 16"
        width="16"
        style={{ color: "currentcolor" }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.5 3.5H14.5V5.5H13.5H2.5H1.5V3.5ZM1 7H0V5.5V3.5V2H1.5H14.5H16V3.5V5.5V7H15V12.5C15 13.8807 13.8807 15 12.5 15H3.5C2.11929 15 1 13.8807 1 12.5V7ZM2.5 7V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V7H2.5ZM6 9.5H6.75H9.25H10V11H9.25H6.75H6V9.5Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
];
export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname();
  console.log(tree);
  return (
    <Sidebar
      className="sticky top-[5rem] z-30 hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <RootToggle
        options={[
          {
            title: "Docs",
            url: "/docs",
            props: { title: "User Docs" },
            icon: (
              <svg
                data-testid="geist-icon"
                height="16"
                stroke-linejoin="round"
                viewBox="0 0 16 16"
                width="16"
                style={{ color: "currentcolor" }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.75 0C2.50736 0 1.5 1.00736 1.5 2.25V13.744V13.75H1.50001C1.50323 14.9899 2.50935 15.994 3.75 15.994H13H14.5V14.494V13.7296V12.994V11.494V0.75V0H13.75H3.75ZM13 11.494V1.5H3.75C3.33579 1.5 3 1.83579 3 2.25V11.622C3.23458 11.5391 3.48702 11.494 3.75 11.494H13ZM3 13.744C3 14.1582 3.33579 14.494 3.75 14.494H13V13.7296V12.994H3.75C3.33579 12.994 3 13.3298 3 13.744Z"
                  fill="currentColor"
                ></path>
              </svg>
            ),
            description: "The Guided For User",
          },
          {
            title: "Api Reference",
            url: "/docs/api-reference",
            props: { title: "Api Docs" },
            icon: (
              <svg
                data-testid="geist-icon"
                height="16"
                stroke-linejoin="round"
                viewBox="0 0 16 16"
                width="16"
                style={{ color: "currentcolor" }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.75 1H0V1.75V13.25V14H0.75H5.5V12.5H1.5V2.5H5C6.24264 2.5 7.25 3.50736 7.25 4.75V6.5H8.75V4.75C8.75 3.50736 9.75736 2.5 11 2.5H14.5V6.5H16V1.75V1H15.25H11C9.7733 1 8.68417 1.58901 8 2.49963C7.31583 1.58901 6.2267 1 5 1H0.75ZM11.0915 10.2175C11.4564 10.0309 11.7944 9.70265 11.9642 9.25H12.0358C12.2056 9.70265 12.5436 10.0309 12.9085 10.2175C12.9698 10.2488 13.0294 10.2833 13.0871 10.3208C13.4317 10.5446 13.886 10.6736 14.3637 10.5941L14.3994 10.6559C14.0923 11.0289 13.9765 11.4857 13.9973 11.8955C13.9991 11.93 14 11.9649 14 12C14 12.0351 13.9991 12.07 13.9973 12.1044C13.9765 12.5143 14.0923 12.9711 14.3994 13.3441L14.3637 13.4059C13.886 13.3264 13.4317 13.4554 13.0871 13.6792C13.0294 13.7167 12.9698 13.7512 12.9085 13.7825C12.5436 13.9691 12.2056 14.2973 12.0358 14.75H11.9642C11.7944 14.2973 11.4564 13.9691 11.0915 13.7825C11.0302 13.7512 10.9706 13.7167 10.9129 13.6792C10.5683 13.4554 10.114 13.3264 9.63627 13.4059L9.60059 13.3441C9.90769 12.9711 10.0235 12.5144 10.0027 12.1045C10.0009 12.07 10 12.0351 10 12C10 11.9649 10.0009 11.93 10.0027 11.8955C10.0235 11.4856 9.9077 11.0289 9.60061 10.6559L9.63629 10.5941C10.114 10.6736 10.5683 10.5446 10.9129 10.3208C10.9706 10.2833 11.0302 10.2488 11.0915 10.2175ZM15.4037 11.4079L15.9641 10.866L14.9641 9.13398L14.215 9.34827C14.0629 9.39177 13.9006 9.35863 13.7679 9.27247C13.6743 9.21169 13.5774 9.15559 13.4775 9.1045C13.3369 9.03257 13.2272 8.90865 13.1888 8.75537L13 8H11L10.8112 8.75537C10.7728 8.90865 10.6631 9.03257 10.5225 9.1045C10.4226 9.15558 10.3257 9.21168 10.2321 9.27247C10.0994 9.35862 9.93709 9.39176 9.78502 9.34826L9.03591 9.13397L8.03591 10.866L8.5963 11.4079C8.70977 11.5176 8.7623 11.6743 8.75427 11.8319C8.75143 11.8876 8.75 11.9436 8.75 12C8.75 12.0564 8.75143 12.1124 8.75427 12.168C8.7623 12.3257 8.70977 12.4824 8.5963 12.5921L8.03589 13.134L9.03589 14.866L9.78501 14.6517C9.93708 14.6082 10.0994 14.6414 10.2321 14.7275C10.3257 14.7883 10.4226 14.8444 10.5225 14.8955C10.6631 14.9674 10.7728 15.0913 10.8112 15.2446L11 16H13L13.1888 15.2446C13.2272 15.0913 13.3369 14.9674 13.4775 14.8955C13.5774 14.8444 13.6743 14.7883 13.7679 14.7275C13.9006 14.6414 14.0629 14.6082 14.215 14.6517L14.9641 14.866L15.9641 13.134L15.4037 12.5921C15.2902 12.4824 15.2377 12.3257 15.2457 12.168C15.2486 12.1124 15.25 12.0564 15.25 12C15.25 11.9436 15.2486 11.8876 15.2457 11.832C15.2377 11.6743 15.2902 11.5176 15.4037 11.4079Z"
                  fill="currentColor"
                ></path>
              </svg>
            ),
            description: "The Guided For User",
          },
        ]}
      />
      <SidebarHeader className="flex flex-col gap-4">
        <ModeGuidedSwitcher
          ModeGuided={data.mode}
          defaultModeGuided={data.mode.docs.name}
        />
        <VersionSwitcher VersionGuided={version} defaultModeGuided={1} />
      </SidebarHeader>
      <Sidebar />
      <ScrollArea className="hidden h-[calc(100svh-12.5rem-var(--footer-height))] xl:w-[17rem]">
        <SidebarContent
          style={{ scrollbarWidth: "none" }}
          className="no-scrollbar styled-scrollbar px-2 pb-0 pl-[1.5rem]"
        >
          <SidebarGroup>
            {tree.children.map((item) =>
              typeof item.name === "string" &&
              [
                "Library Management",
                "Settings Customization",
                "Advanced Usage",
                "Troubleshooting",
              ].includes(item.name) ? (
                <SidebarMenu key={item.$id}>
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <Link
                        href={`/docs/${String(item.$id) === "(root)" ? "" : String(item.$id)}`}
                      >
                        <CollapsibleTrigger
                          className="hover:bg-[#1b1b1b] dark:active:bg-[#1b1b1b] dark:data-[state=open]:hover:bg-[#1b1b1b]"
                          asChild
                        >
                          <SidebarMenuButton>
                            {item.name}
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </Link>
                      <CollapsibleContent className="">
                        {item.type === "folder" && (
                          <SidebarMenuSub className="gap-0.5 border-[#404040]">
                            {item.children.map((item) => {
                              return (
                                item.type === "page" && (
                                  <SidebarMenuItem key={item.url}>
                                    <SidebarMenuButton
                                      asChild
                                      isActive={item.url === pathname}
                                      className="3xl:fixed:w-full 3xl:fixed:max-w-48 hover:border-input relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-[#404040] data-[active=true]:bg-white dark:hover:!bg-black dark:data-[active=true]:bg-black"
                                    >
                                      <Link href={item.url}>{item.name}</Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                )
                              );
                            })}
                          </SidebarMenuSub>
                        )}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              ) : (
                <SidebarMenu key={item.$id}>
                  {item.type === "page" && (
                    <SidebarMenuItem>
                      <Link
                        href={item.url}
                        className={`inline-block ${item.url === pathname ? "rounded-md border border-[#404040]" : ""}`}
                      >
                        <SidebarGroupLabel className="text-sm dark:text-white">
                          {item.name}
                        </SidebarGroupLabel>
                      </Link>
                    </SidebarMenuItem>
                  )}
                  {item.type === "folder" && (
                    <SidebarMenuItem>
                      <Link
                        href={String(item.index?.url)}
                        className={`inline-block ${item.index?.url === pathname ? "rounded-md border border-[#404040]" : ""}`}
                      >
                        <SidebarGroupLabel className="text-sm dark:text-white">
                          {item.name}
                        </SidebarGroupLabel>
                      </Link>
                      <SidebarMenuSub className="gap-0.5 border-[#404040]">
                        {item.children.map((item) => {
                          return (
                            item.type === "page" && (
                              <SidebarMenuItem key={item.url}>
                                <SidebarMenuButton
                                  asChild
                                  isActive={item.url === pathname}
                                  className="3xl:fixed:w-full 3xl:fixed:max-w-48 hover:border-input relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-[#404040] data-[active=true]:bg-white dark:hover:!bg-black dark:data-[active=true]:bg-black"
                                >
                                  <Link href={item.url}>{item.name}</Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            )
                          );
                        })}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              ),
            )}
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}
