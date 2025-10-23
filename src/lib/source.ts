import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { blogPosts } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
export const source: ReturnType<typeof loader> = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const blog = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts),
});