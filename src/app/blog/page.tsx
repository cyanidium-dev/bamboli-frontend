import type { Metadata } from "next";
import Page from "@/components/shared/ui/Page";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import BlogView from "@/components/blogPage/BlogView";
import { getBlogCategories, getBlogPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статті Bamboli про розмір і догляд за дитячим одягом, вишиванки й традиції, малюків, іграшки та розвиток.",
};

/** Block order: docs/spec/marketing-structure.md § 3.11. */
export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getBlogPosts(), getBlogCategories()]);

  return (
    <Page>
      <CatalogHeader
        title="Блог"
        caption="Історії про розмір і догляд, вишиванки й традиції, малюків, іграшки та розвиток."
        breadcrumbs={[{ label: "Блог" }]}
      />

      <BlogView posts={posts} categories={categories} />
    </Page>
  );
}
