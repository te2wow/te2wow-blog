export const layout = "layouts/base.vto";

export default function* ({ search }) {
  for (const tag of search.values("tags")) {
    yield {
      url: `/tags/${tag}/`,
      title: `Tag: ${tag}`,
      tag,
      content: generateTagPage(tag, search),
    };
  }
}

function generateTagPage(tag, search) {
  const posts = search.pages(`tags*='${tag}'`, "date=desc");

  let html = `
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="flex items-center gap-4 mb-6">
      <a href="/" class="btn btn-ghost btn-sm">&larr; Home</a>
      <h1 class="text-2xl font-bold">Tag: <span class="badge badge-primary badge-lg">${tag}</span></h1>
    </div>

    <div class="grid gap-4">`;

  for (const post of posts) {
    html += `
      <div class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="card-body py-4">
          <h3 class="card-title text-lg">
            <a href="${post.url}" class="hover:text-primary transition-colors">${post.title}</a>
          </h3>
          <p class="text-sm text-base-content/60">
            <time datetime="${post.date}">${formatDate(post.date)}</time>
          </p>
        </div>
      </div>`;
  }

  html += `
    </div>
  </div>
</div>`;

  return html;
}

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });
}
