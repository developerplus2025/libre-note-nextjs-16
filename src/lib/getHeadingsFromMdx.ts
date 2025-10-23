import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";

export function getHeadingsFromMdx(mdxContent: string) {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(mdxContent);

  const headings: { text: string; level: number }[] = [];

  visit(tree, "heading", (node: any) => {
    const text = node.children
      .filter((n: any) => n.type === "text")
      .map((n: any) => n.value)
      .join("");

    headings.push({ text, level: node.depth });
  });

  return headings;
}
