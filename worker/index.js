import { render } from "../src/entry-server.jsx";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      const pathname = url.pathname;

      // =====================================================
      // STATIC FILES
      // =====================================================

      const isStaticFile =
        pathname.startsWith("/assets/") ||
        pathname.startsWith("/favicon") ||
        pathname.startsWith("/Vicon") ||
        pathname === "/robots.txt" ||
        pathname === "/sitemap.xml";

      if (isStaticFile) {
        return env.ASSETS.fetch(request);
      }

      // =====================================================
      // SSR
      // =====================================================

      const helmetContext = {};

      const appHtml = render(
        pathname + url.search,
        helmetContext
      );

      // =====================================================
      // GET INDEX.HTML TEMPLATE
      // =====================================================

      const templateResponse = await env.ASSETS.fetch(
        new Request(new URL("/index.html", request.url))
      );

      if (!templateResponse.ok) {
        throw new Error(
          `Failed to load index.html: ${templateResponse.status}`
        );
      }

      let html = await templateResponse.text();

      // =====================================================
      // INJECT REACT SSR HTML
      // =====================================================

      html = html.replace(
        "<!--app-html-->",
        appHtml
      );

      // =====================================================
      // INJECT REACT HELMET SEO TAGS
      // =====================================================

      if (helmetContext.helmet) {
        const headTags = [
          helmetContext.helmet.base?.toString() || "",
          helmetContext.helmet.title?.toString() || "",
          helmetContext.helmet.priority?.toString() || "",
          helmetContext.helmet.meta?.toString() || "",
          helmetContext.helmet.link?.toString() || "",
          helmetContext.helmet.script?.toString() || "",
          helmetContext.helmet.style?.toString() || "",
          helmetContext.helmet.noscript?.toString() || "",
        ].join("");

        html = html.replace(
          "<!--app-head-->",
          headTags
        );
      }

      // =====================================================
      // RETURN SSR HTML
      // =====================================================

      return new Response(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "Cache-Control": "public, max-age=0, must-revalidate",
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "X-Frame-Options": "SAMEORIGIN",
        },
      });

    } catch (error) {
      console.error("❌ SSR Error:", error);

      return new Response(
        `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LearnixDB</title>
  <meta
    name="description"
    content="Learn English, Russian and Chinese vocabulary with Bangla meanings, pronunciation, examples, grammar, phrases and interactive quizzes for free."
  />
</head>
<body>
  <main>
    <h1>LearnixDB</h1>
    <p>
      Learn English, Russian and Chinese vocabulary with Bangla meanings,
      pronunciation, examples, grammar, phrases and interactive quizzes for free.
    </p>
  </main>
</body>
</html>`,
        {
          status: 500,
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
          },
        }
      );
    }
  },
};