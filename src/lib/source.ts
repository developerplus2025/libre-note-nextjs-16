import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { blogPosts } from "@/.source";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
// export const blog = loader({
//   baseUrl: "/blog",
//   source: docs.toFumadocsSource(blogPosts),
// });