import { BlogPost } from "@/types/blog";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import BlogCard from "@/components/blogPage/BlogCard";

/** "Читайте також" — marketing-structure.md §3.11. */
export default function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="pt-20 lg:pt-28">
      <SectionHeading label="Ще на цю тему" title="Читайте також" href="/blog" hrefLabel="Усі статті" />

      <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
