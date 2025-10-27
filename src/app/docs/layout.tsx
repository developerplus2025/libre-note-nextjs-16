import { source } from "@/lib/source";
import { DocsSidebar } from "./components/docs-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent } from "@/src/components/sidebar";
import { DocsLayout } from "@/components/layout/docs";
import { baseOptions, docsOptions } from "@/lib/layout.shared";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
