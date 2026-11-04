import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import {
  Kalam,
  Caveat,
  Architects_Daughter,
  Patrick_Hand,
  Shadows_Into_Light,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { ConditionalFooter } from "@/components/footer/ConditionalFooter";
import { PencilCursor } from "@/components/cursor/PencilCursor";
import { NotebookSketchCanvas } from "@/components/canvas/NotebookSketchCanvas";
import { constructMetadata, getOrganizationJsonLd } from "@/lib/seo";

const kalam = Kalam({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const architectsDaughter = Architects_Daughter({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-architects",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-patrick",
  display: "swap",
});

const shadowsIntoLight = Shadows_Into_Light({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-shadows",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html
      lang="en"
      className={`${kalam.variable} ${caveat.variable} ${architectsDaughter.variable} ${patrickHand.variable} ${shadowsIntoLight.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/brand/logo-k.png" />
      </head>
      <body className="m-0 p-0 flex min-h-screen flex-col text-[#242424] antialiased selection:bg-[#242424] selection:text-[#FFFFFF]">
        {/* Custom Sharpened Graphite Pencil Cursor (desktop pointer:fine only) */}
        <PencilCursor />

        {/* Notebook Sketch Drawing Canvas (Click, hold and drag to draw on paper) */}
        <NotebookSketchCanvas />

        {/* 01. Navigation */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        {/* Main page content */}
        <main className="flex-1 bg-transparent">{children}</main>

        {/* 10. Footer */}
        <Suspense fallback={null}>
          <ConditionalFooter />
        </Suspense>
      </body>
    </html>
  );
}
