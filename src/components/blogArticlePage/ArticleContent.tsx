import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogContentBlock } from "@/types/blog";
import { getProductBySlug } from "@/lib/api";
import { ArrowIcon } from "@/components/shared/ui/Icons";
import ArticleProductEmbed from "./ArticleProductEmbed";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Parses `[текст](href)` markdown-style links inside paragraph/list/quote text. */
function InlineText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    const [, label, href] = match;
    const linkClass = "text-clay underline underline-offset-2 transition hover:opacity-70";
    parts.push(
      isExternal(href) ? (
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      ) : (
        <Link key={key++} href={href} className={linkClass}>
          {label}
        </Link>
      ),
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}

/**
 * Renders the mock Portable-Text-shaped body. Each block kind maps 1:1 onto
 * a future Sanity block type — see `src/types/blog.ts` and
 * docs/spec/admin-sanity.md ("Управління блогом").
 */
export default async function ArticleContent({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="max-w-[720px] space-y-6 text-[15px] leading-relaxed text-ink lg:space-y-7">
      {await Promise.all(
        blocks.map(async (block, index) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={index}>
                  <InlineText text={block.text} />
                </p>
              );

            case "heading":
              return (
                <h2
                  key={index}
                  className="u-display pt-2 text-[24px] leading-[1.2] lg:text-[28px]"
                >
                  {block.text}
                </h2>
              );

            case "quote":
              return (
                <blockquote
                  key={index}
                  className="border-l-2 border-clay pl-5 text-[15px] italic text-muted"
                >
                  <InlineText text={block.text} />
                </blockquote>
              );

            case "list":
              return (
                <ul key={index} className="list-none space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-clay" aria-hidden />
                      <span>
                        <InlineText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              );

            case "image":
              return (
                <figure key={index}>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-sand">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 720px"
                      className="object-cover"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="mt-3 text-[12px] text-muted">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );

            case "table":
              return (
                <div key={index} className="overflow-x-auto">
                  <table className="w-full border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-ink">
                        {block.headers.map((header) => (
                          <th
                            key={header}
                            className="u-label px-3 py-3 text-left font-normal"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-line">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-3 py-3 text-muted">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            case "links":
              return (
                <div key={index} className="border border-line p-5 lg:p-6">
                  <p className="u-label mb-4 text-muted">{block.title ?? "Дивіться також"}</p>
                  <ul className="space-y-3">
                    {block.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group/link flex items-center justify-between gap-4 text-[14px] text-ink transition hover:text-clay"
                        >
                          <span>{item.label}</span>
                          <ArrowIcon className="size-4 shrink-0 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );

            case "productEmbed": {
              const product = await getProductBySlug(block.productSlug);
              if (!product) return null;
              return <ArticleProductEmbed key={index} product={product} />;
            }

            default:
              return null;
          }
        }),
      )}
    </div>
  );
}
