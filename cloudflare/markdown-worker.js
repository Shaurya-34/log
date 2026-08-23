const MARKDOWN = "text/markdown";

function wantsMarkdown(accept) {
  return (accept || "").toLowerCase().split(",").some(part => {
    const [type, ...params] = part.trim().split(";");
    const q = params.find(p => p.trim().startsWith("q="));
    return type.trim() === MARKDOWN && (!q || Number(q.split("=")[1]) > 0);
  });
}

function markdownPath(pathname) {
  if (pathname === "/" || pathname === "/index.html") return "/index.md";
  if (pathname.endsWith(".html")) return pathname.slice(0, -5) + ".md";
  return pathname.replace(/\/$/, "") + ".md";
}

function withVary(headers) {
  const values = new Set((headers.get("Vary") || "").split(",").map(x => x.trim()).filter(Boolean));
  values.add("Accept");
  values.add("Accept-Encoding");
  headers.set("Vary", [...values].join(", "));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get("Accept") || "";
    const origin = env.ORIGIN.replace(/\/$/, "");

    if (wantsMarkdown(accept)) {
      const target = new URL(markdownPath(url.pathname) + url.search, origin);
      const response = await fetch(target);
      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set("Content-Type", "text/markdown; charset=utf-8");
        withVary(headers);
        return new Response(response.body, {status: response.status, headers});
      }
    }

    const response = await fetch(new URL(url.pathname + url.search, origin));
    const headers = new Headers(response.headers);
    withVary(headers);
    if (response.ok && headers.get("Content-Type")?.includes("text/html")) {
      headers.set("Link", `<${markdownPath(url.pathname)}>; rel="alternate"; type="text/markdown"`);
    }
    return new Response(response.body, {status: response.status, headers});
  }
};
