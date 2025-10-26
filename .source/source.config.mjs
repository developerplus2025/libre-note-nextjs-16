// source.config.ts
import {
  defineCollections,
  defineDocs,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
var docs = defineDocs({
  dir: "content/docs"
});
var blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    authors: z.array(
      z.object({
        name: z.string(),
        avatar: z.string(),
        username: z.string()
      })
    ).optional(),
    // 👈 thêm optional nếu không phải bài nào cũng có authors
    category: z.string().optional(),
    date: z.string().optional(),
    link: z.string().optional()
  })
});
export {
  blogPosts,
  docs
};
