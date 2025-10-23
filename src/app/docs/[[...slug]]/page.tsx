import Link from "next/link";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/../mdx-components";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { findNeighbour } from "fumadocs-core/server";
import { Suspense } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsTableOfContents } from "@/components/docs-toc";
import { OpenInV0Cta } from "@/components/open-in-v0-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { DocsBreadcrumb } from "@/components/docs-breadcrumb";
import AudioBar from "../components/audio-bar";
import PathAnimation from "../components/path-animation";
import { Loader } from "@/components/ui/loader";
import { DocsBody, DocsDescription, DocsPage } from "@/components/layout/page";
import DownloadUser from "@/components/download-user";
export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;

  if (!doc.title || !doc.description) {
    notFound();
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title,
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title,
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
      creator: "@LibreNote",
    },
  };
}
export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // handle the "api-reference" case here if needed
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const doc = page.data;
  // @ts-expect-error - revisit fumadocs types.
  const MDX = doc.body;
  const neighbours = await findNeighbour(source.pageTree, page.url);

  // @ts-expect-error - revisit fumadocs types.
  const links = doc.links;

  return (
    <DocsPage
      // @ts-expect-error - revisit fumadocs types.
      toc={page.data.toc}
      // @ts-expect-error - revisit fumadocs types.
      full={page.data.full}
      breadcrumb={{ component: <DocsBreadcrumb tree={source.pageTree} /> }}
      tableOfContent={{
        style: "clerk",
        header: <div className="h-4 w-10"></div>,
      }}
    >
      <div className="flex pt-4 min-[300px]:flex-col-reverse min-[300px]:items-start min-[300px]:gap-2.5 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="flex items-start justify-between gap-2 text-3xl font-semibold">
          {page.data.title}{" "}
        </h1>
        <DocsCopyPage
          className="min-[300px]:flex xl:hidden"
          // @ts-expect-error - revisit fumadocs types.
          page={doc.content}
          url={absoluteUrl(page.url)}
        />
      </div>
      <DocsDescription className="border-input mb-0 border-b pb-8 text-[1.05rem] text-balance sm:text-base">
        {page.data.description}
      </DocsDescription>
      <div className="flex items-center justify-between gap-4">
        {" "}
        <AudioBar />{" "}
        <DocsCopyPage
          className="min-[300px]:hidden xl:flex"
          // @ts-expect-error - revisit fumadocs types.
          page={doc.content}
          url={absoluteUrl(page.url)}
        />{" "}
      </div>
      <DocsBody className="pt-4 sm:px-2 md:px-0 xl:mr-[0rem] xl:px-0">
        <div
          data-slot="docs"
          className="items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
        >
          <div className="flex min-w-0 flex-col">
            <div className="mx-auto flex w-full min-w-0 flex-1 flex-col gap-8 pt-0 pb-6 text-neutral-800 md:px-0 lg:py-0 dark:text-neutral-300">
              <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
                <Suspense fallback={<Loader variant="classic" />}>
                  <MDX
                    components={{
                      ...mdxComponents,
                      PathAnimation,
                      DownloadUser,
                    }}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  );
}
