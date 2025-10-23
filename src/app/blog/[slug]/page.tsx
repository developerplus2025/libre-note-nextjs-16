import { notFound } from "next/navigation";
import Link from "next/link";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import { mdxComponents } from "@/../mdx-components";
import { absoluteUrl } from "@/lib/utils";
import Image from "next/image";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  // handle the "api-reference" case here if needed
  const page = blog.getPage([params.slug]);
  if (!page) {
    notFound();
  }

  const doc = page.data;

  const MDX = doc.body;

  return (
    <>
      <div className="border-input container flex max-w-2xl flex-col justify-center gap-2 border-b py-12 md:px-8">
        <Link href={"/blog"} className="flex justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#ffffff"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
          <p className="text-sm">Back to BLog</p>
        </Link>
        <div className="flex justify-center gap-2">
          <p className="text-sm text-[#a1a1a1]">{page.data.date}</p>

          <p className="text-sm">{page.data.category}</p>
        </div>
        <h1 className="mb-2 text-center text-3xl font-bold">
          {page.data.title}
        </h1>
        <div className="mt-[2rem] flex flex-col gap-2">
          <p className="text-sm">Posted by</p>
          <div className="flex items-center gap-4">
            {page.data.authors.map((items) => (
              <div className="flex items-center gap-3" key={items.name}>
                <Image
                  alt={items.name}
                  height={"50"}
                  width={"50"}
                  className="h-[32px] w-[32px] rounded-full bg-black"
                  src={`/alan-cowen.avif`}
                />
                <div className="flex flex-col gap-0">
                  <p className="text-xs">{items.name}</p>
                  <p className="text-xs text-[#a1a1a1]">{items.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <article className="container flex w-[1000px] flex-col px-4 py-8">
        <div className="prose min-w-0">
          <MDX
            components={{
              ...mdxComponents,
            }}
          />
        </div>
      </article>
    </>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}
