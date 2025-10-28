"use client";

import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnchorProvider,
  type TOCItemType,
  useActiveAnchors,
} from "fumadocs-core/toc";
import { cn } from "../../src/lib/cn";
import { useTreeContext } from "fumadocs-ui/contexts/tree";
import { Link, usePathname } from "fumadocs-core/framework";
import type * as PageTree from "fumadocs-core/page-tree";
import * as Primitive from "fumadocs-core/toc";
import { useTOCItems } from "@/src/components/ui/toc";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { TocThumb } from "@/src/components/ui/toc-thumb";
import { mergeRefs } from "@/lib/merge-refs";
export interface DocsPageProps {
  toc?: TOCItemType[];

  children: ReactNode;
}

export function DocsPage({ toc = [], ...props }: DocsPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = useTOCItems();
  const { text } = useI18n();

  const [svg, setSvg] = useState<{
    path: string;
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    function onResize(): void {
      if (container.clientHeight === 0) return;
      let w = 0,
        h = 0;
      const d: string[] = [];
      for (let i = 0; i < items.length; i++) {
        const element: HTMLElement | null = container.querySelector(
          `a[href="#${items[i].url.slice(1)}"]`,
        );
        if (!element) continue;

        const styles = getComputedStyle(element);
        const offset = getLineOffset(items[i].depth) + 1,
          top = element.offsetTop + parseFloat(styles.paddingTop),
          bottom =
            element.offsetTop +
            element.clientHeight -
            parseFloat(styles.paddingBottom);

        w = Math.max(offset, w);
        h = Math.max(h, bottom);

        d.push(`${i === 0 ? "M" : "L"}${offset} ${top}`);
        d.push(`L${offset} ${bottom}`);
      }

      setSvg({
        path: d.join(" "),
        width: w + 1,
        height: h,
      });
    }

    const observer = new ResizeObserver(onResize);
    onResize();

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0)
    return (
      <div className="bg-fd-card text-fd-muted-foreground rounded-lg border p-3 text-xs">
        {text.tocNoHeadings}
      </div>
    );

  return (
    <AnchorProvider toc={toc}>
      <main className="flex w-full min-w-0 flex-col">
        <article className="flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8 md:mx-auto md:px-6">
          {props.children}
          <Footer />
        </article>
      </main>
      {toc.length > 0 && (
        <div className="sticky top-[6rem] h-[500px] w-[286px] shrink-0 overflow-auto p-4 max-xl:hidden">
          <p className="text-fd-muted-foreground mb-2 text-sm">On this page</p>
          <div className="flex flex-col">
            {toc.map((item) => (
              <TOCItem key={item.url} item={item} />
            ))}
          </div>
        </div>
      )}
      {svg ? (
        <div
          className="absolute start-0 top-0 rtl:-scale-x-100"
          style={{
            width: svg.width,
            height: svg.height,
            maskImage: `url("data:image/svg+xml,${
              // Inline SVG
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`,
              )
            }")`,
          }}
        >
          <TocThumb
            containerRef={containerRef}
            className="bg-fd-primary mt-(--fd-top) h-(--fd-height) transition-all"
          />
        </div>
      ) : null}
      <div
        ref={mergeRefs(containerRef)}
        className={cn("flex flex-col")}
        {...props}
      >
        {items.map((item, i) => (
          <TOCItem
            key={item.url}
            item={item}
            upper={items[i - 1]?.depth}
            lower={items[i + 1]?.depth}
          />
        ))}
      </div>
    </AnchorProvider>
  );
}

export function DocsBody(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("prose", props.className)}>
      {props.children}
    </div>
  );
}

export function DocsDescription(props: ComponentProps<"p">) {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p
      {...props}
      className={cn("text-fd-muted-foreground mb-8 text-lg", props.className)}
    >
      {props.children}
    </p>
  );
}

export function DocsTitle(props: ComponentProps<"h1">) {
  return (
    <h1 {...props} className={cn("text-3xl font-semibold", props.className)}>
      {props.children}
    </h1>
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

function Footer() {
  const { root } = useTreeContext();
  const pathname = usePathname();
  const flatten = useMemo(() => {
    const result: PageTree.Item[] = [];

    function scan(items: PageTree.Node[]) {
      for (const item of items) {
        if (item.type === "page") result.push(item);
        else if (item.type === "folder") {
          if (item.index) result.push(item.index);
          scan(item.children);
        }
      }
    }

    scan(root.children);
    return result;
  }, [root]);

  const { previous, next } = useMemo(() => {
    const idx = flatten.findIndex((item) => item.url === pathname);

    if (idx === -1) return {};
    return {
      previous: flatten[idx - 1],
      next: flatten[idx + 1],
    };
  }, [flatten, pathname]);

  return (
    <div className="flex flex-row items-center justify-between gap-2 font-medium">
      {previous ? <Link href={previous.url}>{previous.name}</Link> : null}
      {next ? <Link href={next.url}>{next.name}</Link> : null}
    </div>
  );
}
