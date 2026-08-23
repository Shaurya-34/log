const MARKDOWN = "text/markdown";
const HTML = "text/html";

function parseAccept(value) {
  return (value || "*/*")
    .split(",")
    .map((raw, index) => {
      const parts = raw.trim().toLowerCase().split(";");
      const type = parts.shift()?.trim() || "*/*";
      const [major, minor] = type.split("/");
      const qPart = parts.find((part) => part.trim().startsWith("q="));
      const q = qPart ? Number(qPart.trim().slice(2)) : 1;
      return {
        major,
        minor,
        q: Number.isFinite(q) ? Math.max(0, Math.min(1, q)) : 0,
        specificity: major === "*" ? 0 : minor === "*" ? 1 : 2,
        index,
      };
    });
}

function matches(entry, mediaType) {
  const [major, minor] = mediaType.split("/");
  return (
    (entry.major === "*" || entry.major === major) &&
    (entry.minor === "*" || entry.minor === minor)
  );
}

function preferredType(accept, available) {
  const entries = parseAccept(accept);
  let best = null;

  for (const type of available) {
    const matchesForType = entries.filter((entry) => matches(entry, type));
    if (!matchesForType.length) continue;

    matchesForType.sort((a, b) =>
      b.specificity - a.specificity || a.index - b.index
    );

    const match = matchesForType[0];
    if (match.q <= 0) continue;

    const candidate = {
      type,
      q: match.q,
      specificity: match.specificity,
      index: match.index,
    };

    if (
      !best ||
      candidate.q > best.q ||
      (candidate.q === best.q && candidate.specificity > best.specificity) ||
      (candidate.q === best.q &&
        candidate.specificity === best.specificity &&
        candidate.index < best.index)
    ) {
      best = candidate;
    }
  }

  return best?.type || null;
}

function markdownPath(pathname) {
  if (pathname === "/" || pathname === "/index.html") return "/index.md";
  if (pathname.endsWith(".html")) return pathname.slice(0, -5) + ".md";
  return pathname.replace(/\/$/, "") + ".md";
}

function withVary(headers) {
  const values = new Set(
    (headers.get("Vary") || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => value.toLowerCase())
  );
  values.add("accept");
  values.add("accept-encoding");
  headers.set("Vary", [...values].join(", "));
}

function markdown404(pathname) {
  return (
    "# 404 — Not found\n\n" +
    "The requested page `" + pathname + "` does not exist.\n\n" +
    "- [Index](https://sslog.dpdns.org/index.html)\n" +
    "- [Markdown index](https://sslog.dpdns.org/index.md)\n" +
    "- [Sitemap](https://sslog.dpdns.org/sitemap.xml)\n" +
    "- [Agent guide](https://sslog.dpdns.org/llms.txt)\n"
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get("Accept") || "*/*";
    const origin = env.ORIGIN.replace(/\/$/, "");
    const choice = preferredType(accept, [MARKDOWN, HTML]);

    if (choice === null) {
      const headers = new Headers({
        "Content-Type": "text/plain; charset=utf-8",
      });
      withVary(headers);
      return new Response(
        "Not Acceptable\n\nAvailable representations: text/html, text/markdown.\n",
        { status: 406, headers }
      );
    }

    if (choice === MARKDOWN) {
      const target = new URL(markdownPath(url.pathname) + url.search, origin);
      const response = await fetch(target);

      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set("Content-Type", "text/markdown; charset=utf-8");
        withVary(headers);
        headers.set(
          "Link",
          `<${url.pathname}>; rel="canonical"; type="text/html"`
        );
        return new Response(response.body, {
          status: response.status,
          headers,
        });
      }

      if (response.status === 404) {
        const headers = new Headers({
          "Content-Type": "text/markdown; charset=utf-8",
        });
        withVary(headers);
        return new Response(markdown404(url.pathname), {
          status: 404,
          headers,
        });
      }
    }

    const response = await fetch(new URL(url.pathname + url.search, origin));
    const headers = new Headers(response.headers);
    withVary(headers);

    if (response.ok && headers.get("Content-Type")?.includes("text/html")) {
      headers.set(
        "Link",
        `<${markdownPath(url.pathname)}>; rel="alternate"; type="text/markdown"`
      );
    }

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  },
};
