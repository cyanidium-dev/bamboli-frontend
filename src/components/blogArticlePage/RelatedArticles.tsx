import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/blogPage/BlogCard";
import { cn } from "@/lib/utils";

/**
 * "Читайте також" — marketing-structure.md §3.11. Sits in the article
 * sidebar on desktop (`lg:w-80 lg:shrink-0`, vertical list); on mobile it
 * drops below the article body as a simple stacked list.
 */
export default function RelatedArticles({
  posts,
  className,
}: {
  posts: BlogPost[];
  className?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <aside className={cn("mt-16 lg:mt-0", className)}>
      <p className="u-label mb-6 text-muted">Ще на цю тему</p>
      <h2 className="u-display mb-6 text-[24px] leading-[1.15] lg:text-[26px]">
        Читайте також
      </h2>

      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">
        {posts.map((post) => (
          <li key={post.id}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
