import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollTabs from "@/components/shared/ui/ScrollTabs";
import Container from "@/components/shared/ui/Container";
import CatalogView from "@/components/catalogPage/CatalogView";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import {
  getAksesuaryProducts,
  getCategoryBySlug,
  getIgrashkyProducts,
  getNewProducts,
  getOdyagProducts,
  getSaleProducts,
} from "@/lib/api";
import {
  accessorySubcategories,
  findOdyagGroup,
  odyagGroups,
  toyBrands,
  toySubcategories,
} from "@/data/categoryTree";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

/** /catalog/sale is a filter on the «Знижка» flag, not a real category. */
const SALE = {
  title: "Знижки",
  caption: "Улюблені моделі за вигідною ціною — поки є розміри.",
};

/** /catalog/new is a filter on the «Новинка» flag, not a real category. */
const NEW = {
  title: "Новинки",
  caption: "Свіжі надходження — щойно з пошиття.",
};

interface Crumb {
  label: string;
  href?: string;
}

interface Resolved {
  title: string;
  caption?: string;
  breadcrumbs: Crumb[];
  products: Product[];
  chips: { label: string; href: string; active: boolean }[];
  /** Optional second row of chips shown below `chips`. */
  subChips?: { label: string; href: string; active: boolean }[];
  /** Caption shown before the second row, e.g. «Бренд». */
  subChipsLabel?: string;
}

const odyagGroupChips = (activeSlug: string) =>
  odyagGroups.map((group) => ({
    label: group.title,
    href: `/catalog/odyag/${group.slug}`,
    active: group.slug === activeSlug,
  }));

const odyagSubChips = (group: (typeof odyagGroups)[number], activeSub?: string) => [
  { label: "Всі", href: `/catalog/odyag/${group.slug}`, active: !activeSub },
  ...group.subcategories.map((sub) => ({
    label: sub.title,
    href: `/catalog/odyag/${group.slug}/${sub.slug}`,
    active: sub.slug === activeSub,
  })),
];

/** Toys: subcategory tabs on top, brands as a separate row below. */
const toyRows = (activeSub?: string, activeBrand?: string) => ({
  chips: [
    { label: "Всі", href: "/catalog/igrashky", active: !activeSub && !activeBrand },
    ...toySubcategories.map((sub) => ({
      label: sub.title,
      href: `/catalog/igrashky/${sub.slug}`,
      active: sub.slug === activeSub,
    })),
  ],
  subChipsLabel: "Бренд",
  subChips: toyBrands.map((brand) => ({
    label: brand.name,
    href: `/catalog/igrashky/brend/${brand.slug}`,
    active: brand.slug === activeBrand,
  })),
});

const aksesuaryChips = (activeSub?: string) => [
  { label: "Всі", href: "/catalog/aksesuary", active: !activeSub },
  ...accessorySubcategories.map((sub) => ({
    label: sub.title,
    href: `/catalog/aksesuary/${sub.slug}`,
    active: sub.slug === activeSub,
  })),
];

async function resolve(category: string, slug: string[]): Promise<Resolved | null> {
  if (category === "sale") {
    if (slug.length > 0) return null;
    return {
      title: SALE.title,
      caption: SALE.caption,
      breadcrumbs: [{ label: SALE.title }],
      products: await getSaleProducts(),
      chips: [],
    };
  }

  if (category === "new") {
    if (slug.length > 0) return null;
    return {
      title: NEW.title,
      caption: NEW.caption,
      breadcrumbs: [{ label: NEW.title }],
      products: await getNewProducts(),
      chips: [],
    };
  }

  const main = await getCategoryBySlug(category);
  if (!main) return null;

  if (category === "odyag") {
    const [groupSlug, subSlug] = slug;
    if (slug.length > 2) return null;

    if (!groupSlug) {
      return {
        title: main.title,
        caption: main.caption,
        breadcrumbs: [{ label: main.title }],
        products: await getOdyagProducts(),
        chips: odyagGroups.map((group, index) => ({
          label: group.title,
          href: `/catalog/odyag/${group.slug}`,
          // «Для всіх» (first) is the default — it shows the same full range.
          active: index === 0,
        })),
        subChips: odyagSubChips(odyagGroups[0]),
      };
    }

    const group = findOdyagGroup(groupSlug);
    if (!group) return null;

    if (!subSlug) {
      return {
        title: group.title,
        caption: group.caption,
        breadcrumbs: [
          { label: main.title, href: "/catalog/odyag" },
          { label: group.title },
        ],
        products: await getOdyagProducts(groupSlug),
        chips: odyagGroupChips(group.slug),
        subChips: odyagSubChips(group),
      };
    }

    const sub = group.subcategories.find((item) => item.slug === subSlug);
    if (!sub) return null;

    return {
      title: sub.title,
      caption: `${sub.title} у розділі «${group.title}».`,
      breadcrumbs: [
        { label: main.title, href: "/catalog/odyag" },
        { label: group.title, href: `/catalog/odyag/${group.slug}` },
        { label: sub.title },
      ],
      products: await getOdyagProducts(groupSlug, subSlug),
      chips: odyagGroupChips(group.slug),
      subChips: odyagSubChips(group, subSlug),
    };
  }

  if (category === "igrashky") {
    if (slug.length > 2) return null;
    if (slug.length === 0) {
      return {
        title: main.title,
        caption: main.caption,
        breadcrumbs: [{ label: main.title }],
        products: await getIgrashkyProducts(),
        ...toyRows(),
      };
    }

    if (slug[0] === "brend") {
      const brandSlug = slug[1];
      const brand = toyBrands.find((item) => item.slug === brandSlug);
      if (!brand) return null;
      return {
        title: brand.name,
        caption: `Товари бренду ${brand.name} у Bamboli.`,
        breadcrumbs: [
          { label: main.title, href: "/catalog/igrashky" },
          { label: brand.name },
        ],
        products: await getIgrashkyProducts(undefined, brandSlug),
        ...toyRows(undefined, brandSlug),
      };
    }

    if (slug.length > 1) return null;
    const sub = toySubcategories.find((item) => item.slug === slug[0]);
    if (!sub) return null;
    return {
      title: sub.title,
      caption: `${sub.title} у розділі «${main.title}».`,
      breadcrumbs: [
        { label: main.title, href: "/catalog/igrashky" },
        { label: sub.title },
      ],
      products: await getIgrashkyProducts(sub.slug),
      ...toyRows(sub.slug),
    };
  }

  if (category === "aksesuary") {
    if (slug.length > 1) return null;
    if (slug.length === 0) {
      return {
        title: main.title,
        caption: main.caption,
        breadcrumbs: [{ label: main.title }],
        products: await getAksesuaryProducts(),
        chips: aksesuaryChips(),
      };
    }

    const sub = accessorySubcategories.find((item) => item.slug === slug[0]);
    if (!sub) return null;
    return {
      title: sub.title,
      caption: `${sub.title} у розділі «${main.title}».`,
      breadcrumbs: [
        { label: main.title, href: "/catalog/aksesuary" },
        { label: sub.title },
      ],
      products: await getAksesuaryProducts(sub.slug),
      chips: aksesuaryChips(sub.slug),
    };
  }

  return null;
}

export async function generateStaticParams() {
  const params: { category: string; slug?: string[] }[] = [
    { category: "sale" },
    { category: "new" },
    { category: "odyag" },
    { category: "igrashky" },
    { category: "aksesuary" },
  ];

  for (const group of odyagGroups) {
    params.push({ category: "odyag", slug: [group.slug] });
    for (const sub of group.subcategories) {
      params.push({ category: "odyag", slug: [group.slug, sub.slug] });
    }
  }

  for (const sub of toySubcategories) {
    params.push({ category: "igrashky", slug: [sub.slug] });
  }
  for (const brand of toyBrands) {
    params.push({ category: "igrashky", slug: ["brend", brand.slug] });
  }

  for (const sub of accessorySubcategories) {
    params.push({ category: "aksesuary", slug: [sub.slug] });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { category, slug = [] } = await params;
  const resolved = await resolve(category, slug);
  if (!resolved) return {};
  return { title: resolved.title, description: resolved.caption };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string; slug?: string[] }>;
}) {
  const { category, slug = [] } = await params;
  const resolved = await resolve(category, slug);
  if (!resolved) notFound();

  // Every main category ends its top row with a link to the sale listing.
  const topChips =
    category === "sale" || category === "new"
      ? resolved.chips
      : [...resolved.chips, { label: "SALE", href: "/catalog/sale", active: false }];

  return (
    <Container className="pb-10 pt-10 lg:pt-14">
      <CatalogHeader
        title={resolved.title}
        caption={resolved.caption}
        breadcrumbs={[{ label: "Каталог", href: "/catalog" }, ...resolved.breadcrumbs]}
      />

      {[topChips, resolved.subChips ?? []].map((row, rowIndex) => {
        // Two rows read as two levels: main tabs (underline) over
        // subcategory pills. Without a second row the single row stays pills.
        const isTabs =
          rowIndex === 0 && (resolved.subChips !== undefined || category === "aksesuary");
        return (
          row.length > 0 && (
            <ScrollTabs
              key={rowIndex}
              className={cn(
                "-mx-1 flex max-w-full items-center px-1",
                isTabs
                  ? cn(
                      "gap-6 border-b border-line",
                      resolved.subChips ? "mb-5" : "mb-0",
                    )
                  : resolved.subChips !== undefined
                    ? "mb-5 gap-1.5"
                    : "mb-8 gap-1.5 lg:mb-12",
              )}
            >
              {!isTabs && resolved.subChipsLabel && (
                <span className="u-label mr-1.5 shrink-0 text-muted">
                  {resolved.subChipsLabel}
                </span>
              )}
              {row.map((chip) =>
                isTabs ? (
                  <Link
                    key={chip.href}
                    href={chip.href}
                    className={cn(
                      "u-label -mb-px shrink-0 border-b-2 py-3 transition",
                      chip.active
                        ? "border-ink text-ink"
                        : chip.href === "/catalog/sale"
                          ? "border-transparent text-clay hover:opacity-70"
                          : "border-transparent text-muted hover:text-ink",
                    )}
                  >
                    {chip.label}
                  </Link>
                ) : (
                  <Link
                    key={chip.href}
                    href={chip.href}
                    className={cn(
                      "shrink-0 border px-2.5 py-1.5 text-[11px] leading-none transition",
                      chip.active
                        ? "border-ink bg-ink text-bg"
                        : chip.href === "/catalog/sale"
                          ? "border-line text-clay hover:border-clay"
                          : "border-line hover:border-ink",
                    )}
                  >
                    {chip.label}
                  </Link>
                ),
              )}
            </ScrollTabs>
          )
        );
      })}

      <CatalogView
        products={resolved.products}
        filterBy={category === "sale" || category === "new" ? "category" : "size"}
        localCategoryFilter={category === "sale" || category === "new"}
        tabsAbove={category === "aksesuary" && !resolved.subChips}
      />
    </Container>
  );
}
