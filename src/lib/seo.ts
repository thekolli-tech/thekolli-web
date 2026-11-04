import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = "/brand/monochrome-graphite-ribbon.png",
}: MetadataProps = {}): Metadata {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.positioning}`;
  const url = `${siteConfig.domain}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.domain),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Graphite Emblem`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@thekolli",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/brand/monochrome-graphite-ribbon.png`,
    description: siteConfig.description,
    knowsAbout: [
      "Artificial Intelligence",
      "Software Engineering",
      "Systems Engineering",
      "Enterprise Platforms",
    ],
    slogan: siteConfig.tagline,
  };
}
