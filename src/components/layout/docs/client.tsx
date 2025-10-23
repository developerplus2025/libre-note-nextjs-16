'use client';

import { Sidebar as SidebarIcon } from 'lucide-react';
import { type ComponentProps } from 'react';
import { cn } from '../../../src/lib/cn';
import { buttonVariants } from '../../../src/components/ui/button';
import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import { useNav } from 'fumadocs-ui/contexts/layout';
import { SidebarCollapseTrigger } from '../../../src/components/sidebar';
import { SearchToggle } from '../../../src/components/search-toggle';

export function Navbar(props: ComponentProps<'header'>) {
  const { isTransparent } = useNav();

  return (
    <header
      id="nd-subnav"
      {...props}
      className={cn(
        'fixed top-(--fd-banner-height) inset-x-0 z-30 flex items-center ps-4 pe-2.5 border-b transition-colors backdrop-blur-sm',
        !isTransparent && 'bg-fd-background/80',
        props.className,
      )}
    >
      {props.children}
    </header>
  );
}

export function LayoutBody(props: ComponentProps<'main'>) {
  const { collapsed } = useSidebar();

  return (
    <main
      id="nd-docs-layout"
      {...props}
      className={cn(
        "flex flex-1 flex-col pt-(--fd-nav-height) transition-[padding]",
        !collapsed && "mx-(--fd-layout-offset)",
        props.className,
      )}
      style={{
        ...props.style,
        paddingInlineStart: collapsed
          ? "min(calc(100vw - var(--fd-page-width)), var(--fd-sidebar-width))"
          : "var(--fd-sidebar-width)",
      }}
    >
      {props.children}
    </main>
  );
}

export function CollapsibleControl() {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "bg-fd-muted text-fd-muted-foreground fixed z-10 flex rounded-xl border p-0.5 shadow-lg transition-opacity max-xl:end-4 max-md:hidden xl:start-4",
        !collapsed && "pointer-events-none opacity-0",
      )}
      style={{
        top: "70px",
      }}
    >
      <SidebarCollapseTrigger
        className={cn(
          buttonVariants({
            color: "ghost",
            size: "icon-sm",
            className: "rounded-lg",
          }),
        )}
      >
        <SidebarIcon />
      </SidebarCollapseTrigger>
      <SearchToggle className="rounded-lg" hideIfDisabled />
    </div>
  );
}
