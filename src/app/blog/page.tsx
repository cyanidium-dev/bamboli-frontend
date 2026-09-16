import type { Metadata } from "next";
import Container from "@/components/shared/ui/Container";
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
    <Container className="pt-6 pb-20 lg:pt-10 lg:pb-28">
      <CatalogHeader
        title="Блог"
        caption="Історії про розмір і догляд, вишиванки й традиції, малюків, іграшки та розвиток."
        breadcrumbs={[{ label: "Блог" }]}
      />

      <BlogView posts={posts} categories={categories} />
    </Container>
  );
}
