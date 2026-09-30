import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { findBlogCategory } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Button from "@/components/shared/ui/Button";

export default function BlogCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  const category = findBlogCategory(post.category);

  return (
    <article className="group/card flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-4/3 w-full overflow-hidden bg-sand"
      >
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover transition-transform duration-(--duration-slow) ease-out lg:group-hover/card:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <div className="u-label mb-2 flex items-center gap-3 text-muted">
          {category && <span>{category.title}</span>}
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>

        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="u-title mb-2 line-clamp-2 transition-colors group-hover/card:text-clay">
            {post.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 u-body">
          {post.excerpt}
        </p>

        <Button
          variant="text-link"
          href={`/blog/${post.slug}`}
          className="mt-auto w-fit"
        >
          Читати статтю
        </Button>
      </div>
    </article>
  );
}
