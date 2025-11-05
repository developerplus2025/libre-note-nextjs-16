"use client";
import type * as PageTree from "fumadocs-core/page-tree";
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "../../src/lib/cn";
import { TreeContextProvider, useTreeContext } from "fumadocs-ui/contexts/tree";
import Link from "fumadocs-core/link";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import { cva } from "class-variance-authority";
import { usePathname } from "fumadocs-core/framework";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../animate-ui/radix/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { VersionSwitcher } from "../version-switcher";
import { ModeGuidedSwitcher } from "../mode-guided-switcher";
import { SidebarProvider } from "../ui/sidebar";
import * as Primitive from "fumadocs-core/toc";
export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}
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
      directSrc: "",
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
      directSrc: "api-reference",
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
    directSrc: "",
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
    directSrc: "5.4.2",
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
    directSrc: "4.5.9",
  },
];
export function DocsLayout({ tree, children }: DocsLayoutProps) {
  return (
    <TreeContextProvider tree={tree}>
      {/* <header className="sticky top-0 bg-fd-background h-14 z-20">
        <nav className="flex flex-row items-center gap-2 size-full px-4">
          <Link href="/" className="font-medium mr-auto">
            My Docs
          </Link>

          <SearchToggle />
          <NavbarSidebarTrigger className="md:hidden" />
        </nav>
      </header> */}
      <main
        id="nd-docs-layout"
        className="flex flex-1 flex-row px-[4rem] [--fd-nav-height:56px]"
      >
        <Sidebar />
        {children}
      </main>
    </TreeContextProvider>
  );
}

function SearchToggle(props: ComponentProps<"button">) {
  const { enabled, setOpenSearch } = useSearchContext();
  if (!enabled) return;

  return (
    <button
      {...props}
      className={cn("text-sm", props.className)}
      onClick={() => setOpenSearch(true)}
    >
      Search
    </button>
  );
}

// function NavbarSidebarTrigger(props: ComponentProps<"button">) {
//   const { open, setOpen } = useSidebar();

//   return (
//     <button
//       {...props}
//       className={cn("text-sm", props.className)}
//       onClick={() => setOpen(!open)}
//     >
//       Sidebar
//     </button>
//   );
// }
export function PageTOC(props: ComponentProps<"div">) {
  return (
    <div
      id="nd-toc"
      {...props}
      className={cn("sticky pt-12 pb-2 max-xl:hidden", props.className)}
      style={{
        ...props.style,
        top: "calc(var(--fd-banner-height) + var(--fd-nav-height))",
        height: "calc(100dvh - var(--fd-banner-height) - var(--fd-nav-height))",
      }}
    >
      <div className="flex h-full w-(--fd-toc-width) max-w-full flex-col pe-4">
        {props.children}
      </div>
    </div>
  );
}
function Sidebar() {
  const { root } = useTreeContext();
  const { open } = useSidebar();

  const children = useMemo(() => {
    function renderItems(items: PageTree.Node[]) {
      return items.map((item) => (
        <SidebarItem key={item.$id} item={item}>
          {item.type === "folder" ? renderItems(item.children) : null}
        </SidebarItem>
      ));
    }

    return renderItems(root.children);
  }, [root]);
  const pathname = usePathname();
  const [modeGuided, setModeGuided] = useState(
    pathname.split("/")[pathname.split("/").length - 1],
  );
  console.log(modeGuided);
  const [versionGuided, setVersionGuided] = useState(
    pathname.split("/")[pathname.length - 1],
  );
  useEffect(() => {
    setModeGuided(pathname.split("/")[pathname.length - 1]);
    setVersionGuided(pathname.split("/")[pathname.length - 1]);
  }, [pathname]);

  return (
    <aside
      className={cn(
        "fixed top-[5rem] z-20 flex shrink-0 flex-col items-center gap-[2rem] overflow-auto p-4 text-sm md:sticky md:h-[calc(100dvh-120px)] md:w-[290px]",
        "max-md:bg-fd-background max-md:inset-x-0 max-md:bottom-0",
        !open && "max-md:invisible",
      )}
    >
      <SidebarProvider className="flex min-h-[100px] flex-col gap-[1rem]">
        <ModeGuidedSwitcher ModeGuided={data.mode} />
        <VersionSwitcher VersionGuided={version} />
      </SidebarProvider>
      <ScrollArea className="md:h-[calc(100dvh-118px)]">{children}</ScrollArea>
    </aside>
  );
}
function getItemOffset(depth: number): number {
  if (depth <= 2) return 14;
  if (depth === 3) return 26;
  return 36;
}

function getLineOffset(depth: number): number {
  return depth >= 3 ? 10 : 0;
}

function TOCItem({
  item,
  upper = item.depth,
  lower = item.depth,
}: {
  item: Primitive.TOCItemType;
  upper?: number;
  lower?: number;
}) {
  const offset = getLineOffset(item.depth),
    upperOffset = getLineOffset(upper),
    lowerOffset = getLineOffset(lower);

  return (
    <Primitive.TOCItem
      href={item.url}
      style={{
        paddingInlineStart: getItemOffset(item.depth),
      }}
      className="prose text-fd-muted-foreground hover:text-fd-accent-foreground data-[active=true]:text-fd-primary relative py-1.5 text-sm [overflow-wrap:anywhere] transition-colors first:pt-0 last:pb-0"
    >
      {offset !== upperOffset ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="absolute start-0 -top-1.5 size-4 rtl:-scale-x-100"
        >
          <line
            x1={upperOffset}
            y1="0"
            x2={offset}
            y2="12"
            className="stroke-fd-foreground/10"
            strokeWidth="1"
          />
        </svg>
      ) : null}
      <div
        className={cn(
          "bg-fd-foreground/10 absolute inset-y-0 w-px",
          offset !== upperOffset && "top-1.5",
          offset !== lowerOffset && "bottom-1.5",
        )}
        style={{
          insetInlineStart: offset,
        }}
      />
      {item.title}
    </Primitive.TOCItem>
  );
}

const linkVariants = cva(
  "flex items-center gap-2 w-full py-1.5 rounded-lg text-fd-foreground/80 [&_svg]:size-4",
  {
    variants: {
      active: {
        true: "text-fd-primary font-medium",
        false: "hover:text-fd-accent-foreground",
      },
    },
  },
);

function SidebarItem({
  item,
  children,
}: {
  item: PageTree.Node;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (item.type === "page") {
    return (
      <Link
        href={item.url}
        className={linkVariants({
          active: pathname === item.url,
        })}
      >
        {item.icon}
        {item.name}
      </Link>
    );
  }

  if (item.type === "separator") {
    return (
      <p className="text-fd-muted-foreground mt-6 mb-2 first:mt-0">
        {item.icon}
        {item.name}
      </p>
    );
  }

  return (
    <div>
      {item.index ? (
        // <CollapsibleTrigger>
        <Link
          className={linkVariants({
            active: pathname === item.index.url,
          })}
          href={item.index.url}
        >
          {item.index.icon}
          {item.index.name}
        </Link>
      ) : (
        //  </CollapsibleTrigger>
        // <CollapsibleTrigger>
        <p className={cn(linkVariants(), "text-start")}>
          {item.icon}
          {item.name}
        </p>
      )}
      {/* <CollapsibleContent > */}
      <div className="flex flex-col border-l pl-4">{children}</div>
      {/* </CollapsibleContent>  */}
    </div>
  );
}
