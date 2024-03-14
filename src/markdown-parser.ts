import MarkdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";

const md = MarkdownIt();

let highlighter: {
  (markdownit: MarkdownIt): void;
  (md: MarkdownIt): void;
} | null = null;

const parser = async (str: string) => {
  if (!highlighter) {
    highlighter = await Shiki({
      theme: "dracula-soft",
    });
    md.use(highlighter);
  }
  return md.render(str);
};

export default parser;
