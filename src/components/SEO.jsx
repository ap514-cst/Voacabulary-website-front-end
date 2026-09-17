import { Helmet } from "react-helmet-async";

const SITE_URL = "https://learnixdb.com";
const SITE_NAME = "LearnixDB";

function normalizeUrl(url) {
  if (!url) return SITE_URL;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function SEO({
  title,
  description,
  keywords = [],
  path = "/",
  image = "/og-image.png",
  type = "website",
  noindex = false,
  structuredData = null,
}) {
  const canonicalUrl = normalizeUrl(path);
  const imageUrl = normalizeUrl(image);

  const fullTitle =
    title === SITE_NAME
      ? SITE_NAME
      : `${title} | ${SITE_NAME}`;

  const keywordContent = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>

      <meta
        name="description"
        content={description}
      />

      {keywordContent && (
        <meta
          name="keywords"
          content={keywordContent}
        />
      )}

      <meta
        name="author"
        content={SITE_NAME}
      />

      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow"
        }
      />

      {/* Canonical */}
      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:title"
        content={fullTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:site_name"
        content={SITE_NAME}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={fullTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />

      {/* JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}