import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/ui/Container";
import ArticleHero from "@/components/blogArticlePage/ArticleHero";
import ArticleContent from "@/components/blogArticlePage/ArticleContent";
import ArticleFaq from "@/components/blogArticlePage/ArticleFaq";
import RelatedArticles from "@/components/blogArticlePage/RelatedArticles";
import CatalogCta from "@/components/blogArticlePage/CatalogCta";
import ArticleSchema from "@/components/blogArticlePage/ArticleSchema";
import { getBlogPostBySlug, getBlogPosts, getRelatedBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post, 4);

  return (
    <Container className="pb-20 lg:pb-28">
      <ArticleHero post={post} />

      <div className="pt-12 lg:flex lg:gap-16 lg:pt-16">
        <article className="min-w-0 flex-1 lg:max-w-3xl">
          <ArticleContent blocks={post.content} />

          {post.faq && post.faq.length > 0 && <ArticleFaq items={post.faq} />}

          <CatalogCta />
        </article>

        <RelatedArticles posts={related} className="lg:w-80 lg:shrink-0" />
      </div>

      <ArticleSchema post={post} />
    </Container>
  );
}
