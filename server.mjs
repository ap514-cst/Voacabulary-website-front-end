import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === "production";

// Development → 5173
// Production → hosting provider PORT
const port = Number(process.env.PORT) || (isProduction ? 3000 : 5173);

async function startServer() {
  let vite;

  /*
   * =====================================================
   * DEVELOPMENT SSR
   * =====================================================
   */

  if (!isProduction) {
    vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: true,
      },

      appType: "custom",
    });
  }

  /*
   * =====================================================
   * SECURITY / PERFORMANCE HEADERS
   * =====================================================
   */

  const setCommonHeaders = (res, isHtml = false) => {
    // Security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader(
      "Referrer-Policy",
      "strict-origin-when-cross-origin"
    );

    res.setHeader("X-Frame-Options", "SAMEORIGIN");

    // Production HTTPS
    if (isProduction) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
    }

    // HTML response
    if (isHtml) {
      res.setHeader(
        "Cache-Control",
        "public, max-age=0, must-revalidate"
      );
    }
  };

  /*
   * =====================================================
   * SSR PAGE RENDERER
   * =====================================================
   */

  const renderPage = async (req, res) => {
    try {
      const url = req.url || "/";

      /*
       * ===================================================
       * DEVELOPMENT SSR
       * ===================================================
       */

      if (!isProduction) {
        const templatePath = path.resolve(
          __dirname,
          "index.html"
        );

        let template = fs.readFileSync(
          templatePath,
          "utf-8"
        );

        // Vite development transformation
        template = await vite.transformIndexHtml(
          url,
          template
        );

        // Load SSR entry
        const { render } = await vite.ssrLoadModule(
          "/src/entry-server.jsx"
        );

        // Helmet context
        const helmetContext = {};

        // Render React application
        const appHtml = render(
          url,
          helmetContext
        );

        // SEO head
        const helmet = helmetContext.helmet;

        let head = "";

        if (helmet) {
          head = `
            ${helmet.base?.toString() || ""}
            ${helmet.title?.toString() || ""}
            ${helmet.priority?.toString() || ""}
            ${helmet.meta?.toString() || ""}
            ${helmet.link?.toString() || ""}
            ${helmet.script?.toString() || ""}
            ${helmet.style?.toString() || ""}
            ${helmet.noscript?.toString() || ""}
          `;
        }

        // Inject SEO + SSR HTML
        template = template
          .replace(
            "<!--app-head-->",
            head
          )
          .replace(
            "<!--app-html-->",
            appHtml
          );

        setCommonHeaders(res, true);

        res.statusCode = 200;

        res.setHeader(
          "Content-Type",
          "text/html; charset=utf-8"
        );

        return res.end(template);
      }

      /*
       * ===================================================
       * PRODUCTION SSR
       * ===================================================
       */

      const clientDir = path.resolve(
        __dirname,
        "dist/client"
      );

      const requestPath = decodeURIComponent(
        url.split("?")[0]
      );

      /*
       * ===================================================
       * STATIC FILES
       * ===================================================
       */

      const isStaticFile =
        requestPath.startsWith("/assets/") ||
        requestPath.startsWith("/favicon") ||
        requestPath.startsWith("/Vicon") ||
        requestPath === "/robots.txt" ||
        requestPath === "/sitemap.xml";

      if (isStaticFile) {
        // Prevent path traversal
        const safePath = path
          .normalize(requestPath)
          .replace(/^(\.\.(\/|\\|$))+/, "");

        const requestedPath = path.join(
          clientDir,
          safePath
        );

        const resolvedPath = path.resolve(
          requestedPath
        );

        const resolvedClientDir = path.resolve(
          clientDir
        );

        if (
          resolvedPath.startsWith(
            resolvedClientDir + path.sep
          ) ||
          resolvedPath === resolvedClientDir
        ) {
          if (
            fs.existsSync(resolvedPath) &&
            fs.statSync(resolvedPath).isFile()
          ) {
            const file = fs.readFileSync(
              resolvedPath
            );

            const ext = path
              .extname(resolvedPath)
              .toLowerCase();

            const contentTypes = {
              ".js":
                "application/javascript; charset=utf-8",

              ".mjs":
                "application/javascript; charset=utf-8",

              ".css":
                "text/css; charset=utf-8",

              ".html":
                "text/html; charset=utf-8",

              ".json":
                "application/json; charset=utf-8",

              ".svg":
                "image/svg+xml",

              ".png":
                "image/png",

              ".jpg":
                "image/jpeg",

              ".jpeg":
                "image/jpeg",

              ".webp":
                "image/webp",

              ".gif":
                "image/gif",

              ".ico":
                "image/x-icon",

              ".txt":
                "text/plain; charset=utf-8",

              ".xml":
                "application/xml; charset=utf-8",

              ".woff":
                "font/woff",

              ".woff2":
                "font/woff2",

              ".ttf":
                "font/ttf",
            };

            // Long-term cache for hashed assets
            if (
              requestPath.startsWith("/assets/")
            ) {
              res.setHeader(
                "Cache-Control",
                "public, max-age=31536000, immutable"
              );
            }

            // Robots / sitemap
            if (
              requestPath === "/robots.txt" ||
              requestPath === "/sitemap.xml"
            ) {
              res.setHeader(
                "Cache-Control",
                "public, max-age=3600"
              );
            }

            setCommonHeaders(res);

            res.statusCode = 200;

            res.setHeader(
              "Content-Type",
              contentTypes[ext] ||
                "application/octet-stream"
            );

            return res.end(file);
          }
        }
      }

      /*
       * ===================================================
       * LOAD PRODUCTION SSR BUNDLE
       * ===================================================
       */

      const serverEntry = await import(
        "./dist/server/entry-server.js"
      );

      /*
       * ===================================================
       * PRODUCTION HTML TEMPLATE
       * ===================================================
       */

      const templatePath = path.resolve(
        clientDir,
        "index.html"
      );

      let template = fs.readFileSync(
        templatePath,
        "utf-8"
      );

      /*
       * ===================================================
       * HELMET / SEO
       * ===================================================
       */

      const helmetContext = {};

      const appHtml = serverEntry.render(
        url,
        helmetContext
      );

      const helmet = helmetContext.helmet;

      let head = "";

      if (helmet) {
        head = `
          ${helmet.base?.toString() || ""}
          ${helmet.title?.toString() || ""}
          ${helmet.priority?.toString() || ""}
          ${helmet.meta?.toString() || ""}
          ${helmet.link?.toString() || ""}
          ${helmet.script?.toString() || ""}
          ${helmet.style?.toString() || ""}
          ${helmet.noscript?.toString() || ""}
        `;
      }

      /*
       * ===================================================
       * INJECT SSR + SEO
       * ===================================================
       */

      template = template
        .replace(
          "<!--app-head-->",
          head
        )
        .replace(
          "<!--app-html-->",
          appHtml
        );

      /*
       * ===================================================
       * RESPONSE
       * ===================================================
       */

      setCommonHeaders(res, true);

      res.statusCode = 200;

      res.setHeader(
        "Content-Type",
        "text/html; charset=utf-8"
      );

      return res.end(template);
    } catch (error) {
      console.error(
        "SSR Error:",
        error
      );

      if (!res.headersSent) {
        res.statusCode = 500;

        res.setHeader(
          "Content-Type",
          "text/plain; charset=utf-8"
        );

        return res.end(
          "Internal Server Error"
        );
      }

      res.end();
    }
  };

  /*
   * =====================================================
   * HTTP SERVER
   * =====================================================
   */

  const server = http.createServer(
    async (req, res) => {
      // HEAD request
      if (req.method === "HEAD") {
        req.method = "GET";

        await renderPage(req, res);

        return;
      }

      /*
       * ===================================================
       * DEVELOPMENT
       * ===================================================
       */

      if (!isProduction) {
        vite.middlewares(
          req,
          res,
          async () => {
            await renderPage(
              req,
              res
            );
          }
        );

        return;
      }

      /*
       * ===================================================
       * PRODUCTION
       * ===================================================
       */

      await renderPage(
        req,
        res
      );
    }
  );

  /*
   * =====================================================
   * START SERVER
   * =====================================================
   */

  server.listen(
    port,
    () => {
      if (isProduction) {
        console.log(
          `Production SSR server running on port ${port}`
        );
      } else {
        console.log(
          `Development SSR server running at http://localhost:${port}`
        );

        console.log(
          "Development SSR mode enabled."
        );
      }
    }
  );
}

/*
 * =====================================================
 * START APPLICATION
 * =====================================================
 */

startServer();