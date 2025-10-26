import { defineDocs } from "fumadocs-mdx/config";
import { defineCollections, frontmatterSchema } from "fumadocs-mdx/config";
import { array, z, ZodArray } from "zod";
export const docs = defineDocs({
  dir: "content/docs",
});
export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  // add required frontmatter properties
  schema: frontmatterSchema.extend({
    description: z.string().optional(),
    authors: z.array(
      z.object({
        name: z.string(),
        avatar: z.string(),
        username: z.string(),
      }),
    ),
    category: z.string(),
    date: z.string(),
    link: z.string(),
  }),
});