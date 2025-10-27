import { source } from "@/lib/source";
import { BaseLayoutProps } from "fumadocs-ui/layouts/links";
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
  sidebar: {
    tabs: [
      {
        title: "Docs",
        description: "The docs for LibreNote",
        url: "/docs/",
      },
      {
        title: "API reference",
        description: "The guide for developers",
        url: "/docs/api-reference",
      },
    ],
  },
  tree: source.pageTree,
};
