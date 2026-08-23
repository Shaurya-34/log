// Optional edge layer for the Markdown content-negotiation requirement.
// Deploy this in front of the GitHub Pages origin and set ORIGIN to the
// Pages origin. Static GitHub Pages files cannot emit Vary: Accept themselves.

const PRODUCES = ["text/html", "text/markdown"];

function parseAccept(value) {
  return (value || "*/*").split(",").map((raw, index) => {
    const parts = raw.trim().split(";").map(s => s.trim().toLowerCase());
    const [type = "*/*"] = parts;
    const qPart = parts.find(p => p.startsWith("q="));
    const q = qPart ? Number(qPart.slice(2)) : 1;
    const [major = "*", minor = "*"] = type.split("/");
    return { major, minor, q: Number.isFinite(q) ? q : 0, index };
  });
}

function bestMatch(header, candidate) {
  const [major, minor] = candidate.split("/");
  let best = null;
  for (const entry of parseAccept(header)) {
    if (entry.major !== "*" && entry.major !== major) continue;
    if (entry.minor !== "*" && entry.minor !== minor) continue;
    const specificity = (entry.major === "*" ? 0 : 1) + (entry.minor === "*" ? 0 : 1);
    if (!best || specificity > best.specificity || (specificity === best.specificity && entry.index < best.index)) {
      best = { q: entry.q, specificity, index: entry.index };
    }
  }
  return best;
}

function preferredType(header) {
  let best = null;
  for (const candidate of PRODUCES) {
    const match = bestMatch(header, candidate);
    if (!match || match.q <= 0) continue;
    if (!best || match.q > best.q || (match.q === best.q && match.index < best.index)) {
      best = { candidate, q: match.q, index: match.index };
    }
  }
  return best?.candidate || null;
}

function withVary(headers) {
  const current = headers.get("Vary");
  const values = new Set((current || "").split(",").map(x => x.trim()).filter(Boolean));
  values.add("Accept");
  headers.set("Vary", [...values].join(", "));
}

function markdownPath(pathname) {
  return pathname === "/" ? "/index.md" : `${pathname.replace(/\/$/, "")}.md`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accepts = request.headers.get("Accept") || "*/*";
    const preferred = preferredType(accepts);
    const origin = env.ORIGIN.replace(/\/$/, "");

    if (url.pathname.endsWith(".md")) {
      const target = new URL(url.pathname + url.search, origin);
      const response = await fetch(target);
      const headers = new Headers(response.headers);
      withVary(headers);
      if (response.ok) headers.set("Content-Type", "text/markdown; charset=utf-8");
      return new Response(response.body, { status: response.status, headers });
    }

    if (preferred === "text/markdown") {
      const target = new URL(markdownPath(url.pathname) + url.search, origin);
      const response = await fetch(target);
      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set("Content-Type", "text/markdown; charset=utf-8");
        withVary(headers);
        return new Response(response.body, { status: response.status, headers });
      }
      if (!bestMatch(accepts, "text/html") || bestMatch(accepts, "text/html").q <= 0) {
        const headers = new Headers({ "Content-Type": "text/plain; charset=utf-8" });
        withVary(headers);
        return new Response("Not Acceptable\n\nMarkdown representation is unavailable.\n", { status: 406, headers });
      }
    }

    const target = new URL(url.pathname + url.search, origin);
    const response = await fetch(target);
    const headers = new Headers(response.headers);
    withVary(headers);
    if (response.ok && headers.get("Content-Type")?.includes("text/html")) {
      headers.set("Link", `<${markdownPath(url.pathname)}>; rel="alternate"; type="text/markdown"`);
    }
    return new Response(response.body, { status: response.status, headers });
  }
};
