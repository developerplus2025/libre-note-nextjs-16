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
  directSrc: string; // ví dụ: "4.5.9"
};

export function VersionSwitcher({
  VersionGuided,
}: {
  VersionGuided: VersionItem[];
}) {
  const router = useRouter();
  const pathname = usePathname() ?? "";

  // Tách segments an toàn
  const segments = pathname.split("/").filter(Boolean); // ["docs", "api-reference", "4.5.9", "getting-started"]

  // Tìm vị trí của "docs" nếu có
  let docsIndex = segments.indexOf("docs");
  if (docsIndex === -1) {
    // nếu không có 'docs' trong segments, cố gắng suy đoán: nếu path bắt đầu bằng 'docs' (sử dụng pathname),
    // hoặc để docsIndex = 0 nếu segments[0] looks like base (fallback).
    if (pathname.startsWith("/docs")) docsIndex = 0;
    else docsIndex = -1;
  }

  // Lấy basePath (ví dụ "api-reference") và currentVersion an toàn
  const basePath =
    docsIndex >= 0 && segments.length > docsIndex + 1
      ? segments[docsIndex + 1]
      : undefined;

  const currentVersionSegment =
    docsIndex >= 0 && segments.length > docsIndex + 2
      ? segments[docsIndex + 2]
      : // nếu không có structure /docs/<base>/<version>, có thể version ở cuối:
        segments.length > 0
        ? segments[segments.length - 1]
        : undefined;

  // Tìm object version match bất kỳ segment nào (an toàn hơn)
  const matchedVersionObj =
    VersionGuided.find((v) => segments.includes(v.directSrc)) ??
    VersionGuided.find((v) => v.directSrc === currentVersionSegment) ??
    undefined;

  // fallback name
  const initialName =
    matchedVersionObj?.name ?? VersionGuided[0]?.name ?? "Latest Version";

  const [selectedVersion, setSelectedVersion] =
    React.useState<string>(initialName);

  React.useEffect(() => {
    // Mỗi khi pathname/VersionGuided thay đổi, cập nhật state
    const segs = (pathname ?? "").split("/").filter(Boolean);
    const matched =
      VersionGuided.find((v) => segs.includes(v.directSrc)) ??
      VersionGuided.find((v) => v.directSrc === segs[segs.length - 1]) ??
      undefined;
    const name = matched?.name ?? VersionGuided[0]?.name ?? "Latest Version";
    setSelectedVersion(name);
  }, [pathname, VersionGuided]);

  const current =
    VersionGuided.find((v) => v.name === selectedVersion) ?? VersionGuided[0];
  if (!current) {
    // không có dữ liệu version nào → không render
    console.warn("VersionSwitcher: VersionGuided is empty or malformed");
    return null;
  }

  // Helper: build new path when user picks version
  function buildPathForVersion(item: VersionItem) {
    // giữ lại everything after version if present
    // xác định index của current.directSrc trong segments (nếu có)
    const segs = (pathname ?? "").split("/").filter(Boolean);

    // tìm vị trí của version hiện tại trong segments (nếu có)
    const currentVersionIndex = segs.findIndex((s) => s === current.directSrc);

    // nếu không tìm thấy current version index, ta sẽ thay thế tại vị trí docsIndex+2 (nếu hợp lệ)
    let beforeVersionSegments: string[] = [];
    let afterVersionSegments: string[] = [];

    if (currentVersionIndex !== -1) {
      beforeVersionSegments = segs.slice(0, currentVersionIndex);
      afterVersionSegments = segs.slice(currentVersionIndex + 1); // giữ slug phía sau version
    } else if (docsIndex >= 0 && segs.length > docsIndex + 1) {
      // giả sử cấu trúc /docs/<base>/<version>/...
      beforeVersionSegments = segs.slice(0, docsIndex + 2); // up to basePath
      afterVersionSegments = segs.slice(docsIndex + 3); // phần sau version nếu có
    } else {
      // fallback: nếu đường dẫn đơn giản như /docs/4.5.9 hoặc /4.5.9
      // giữ 'docs' nếu có, rồi thêm version
      beforeVersionSegments = segs[0] === "docs" ? ["docs"] : [];
      afterVersionSegments = segs.slice(beforeVersionSegments.length + 1);
    }

    // build: before + new version + after
    const newSegments = [
      ...beforeVersionSegments,
      item.directSrc,
      ...afterVersionSegments,
    ];
    return "/" + newSegments.join("/");
  }

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
                  const nextPath = buildPathForVersion(item);

                  // debug log (xóa hoặc comment khi ổn)
                  console.info("VersionSwitcher -> navigate to:", nextPath);
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
