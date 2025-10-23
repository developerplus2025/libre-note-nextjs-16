
import type { BaseLayoutProps } from "@/components/layout/shared";
import { source } from "@/lib/source";
/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/developerplus2025/decent-over-nextjs-15/",
  nav: {
    // can be JSX too!
    enabled: true,

    title: "Decent Version 10.9.5",
  },
};
export const docsOptions = {
  ...baseOptions,

  tree: source.pageTree,
};
