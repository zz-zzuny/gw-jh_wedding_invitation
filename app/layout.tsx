import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { card } from "@/data/card";
import React from "react";
//import SakuraGlobal from "@/components/Sakura";

export const metadata: Metadata = {
  title: card.title,
  description: card.seoDescription,
  openGraph: {
    title: card.title,
    description: card.seoDescription,
    images: [{ url: card.shareImage }],
    type: "website",
  },
  other: { "format-detection": "telephone=no" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="/lib/sakura/sakura.css" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
        {/* <SakuraGlobal /> */}
        <Script src="/lib/sakura/sakura.js" strategy="afterInteractive" />
        <Script id="sakura-init" strategy="afterInteractive">
          {`
            var sakura = new Sakura('body');
          `}
        </Script>
      </body>

    </html>
  );
}
