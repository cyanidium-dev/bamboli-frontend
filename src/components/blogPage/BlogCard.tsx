import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { findBlogCategory } from "@/data/blog";
import { formatDate } from "@/lib/utils";

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
          className="object-cover transition-transform duration-[800ms] ease-out lg:group-hover/card:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <div className="u-label mb-2 flex items-center gap-3 text-muted">
          {category && <span>{category.title}</span>}
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>

        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="u-subheading mb-2 line-clamp-2 text-[19px] leading-[1.25] transition-colors group-hover/card:text-clay lg:text-[21px]">
            {post.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="u-label mt-auto inline-block w-fit border-b border-ink pb-1 transition hover:opacity-60"
        >
          Читати статтю
        </Link>
      </div>
    </article>
  );
}
