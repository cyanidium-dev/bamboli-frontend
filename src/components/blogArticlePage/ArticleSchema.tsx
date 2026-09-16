import { BlogPost } from "@/types/blog";
import { siteInfo } from "@/data/siteInfo";

const SITE_URL = "https://bamboli.ua";

/** Article JSON-LD — marketing-structure.md §3.11. */
export default function ArticleSchema({ post }: { post: BlogPost }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: siteInfo.name },
    publisher: { "@type": "Organization", name: siteInfo.name },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
