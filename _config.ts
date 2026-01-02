import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import feed from "lume/plugins/feed.ts";
import sitemap from "lume/plugins/sitemap.ts";
import metas from "lume/plugins/metas.ts";

const site = lume({
  location: new URL("https://te2wow.github.io/te2wow-blog/"),
});

site.use(tailwindcss());
site.use(postcss());
site.use(date());
site.use(codeHighlight());
site.use(metas());
site.use(sitemap());
site.use(feed({
  output: ["/feed.xml", "/feed.json"],
  query: "type=post",
  info: {
    title: "te2wow Blog",
    description: "te2wowの技術ブログ",
  },
  items: {
    title: "=title",
    description: "=excerpt",
  },
}));

// 静的ファイルをコピー対象に追加
site.add("styles");
site.add("images");

export default site;
