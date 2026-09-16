import { siteInfo } from "@/data/siteInfo";

/** LocalBusiness JSON-LD for local search (docs/spec/marketing-structure.md § 3.8a.8). */
export default function ContactsSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: siteInfo.name,
    telephone: siteInfo.phone,
    email: siteInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteInfo.address,
      addressCountry: "UA",
    },
    openingHours: siteInfo.hours,
    sameAs: [
      siteInfo.instagram.url,
      siteInfo.instagramLand.url,
      siteInfo.telegram.url,
      siteInfo.threads.url,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
