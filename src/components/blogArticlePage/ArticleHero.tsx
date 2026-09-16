import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { findBlogCategory } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export default function ArticleHero({ post }: { post: BlogPost }) {
  const category = findBlogCategory(post.category);

  return (
    <div className="pt-6 lg:pt-10">
      <nav aria-label="Навігація" className="u-label mb-6 text-muted lg:mb-10">
        <Link href="/" className="transition hover:text-ink">
          Головна
        </Link>
        <span className="px-2">/</span>
        <Link href="/blog" className="transition hover:text-ink">
          Блог
        </Link>
        <span className="px-2">/</span>
        <span className="text-ink">{post.title}</span>
      </nav>

      {category && <p className="u-label mb-4 text-muted lg:mb-6">{category.title}</p>}

      <h1 className="u-display mb-8 max-w-[820px] text-[32px] leading-[1.1] lg:mb-10 lg:text-[52px]">
        {post.title}
      </h1>

      <div className="mb-8 flex items-center gap-3 lg:mb-12">
        <span className="u-label flex size-11 shrink-0 items-center justify-center rounded-full border border-ink bg-ink text-bg">
          {post.author.charAt(0)}
        </span>
        <div className="flex flex-col">
          <span className="text-[13px] text-ink">{post.author}</span>
          <time dateTime={post.publishedAt} className="u-label text-muted">
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>

      <div className="relative aspect-16/9 w-full overflow-hidden bg-sand lg:aspect-[21/9]">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
