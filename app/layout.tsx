import type { Metadata } from "next";
import "./globals.css";
import { card } from "@/data/card";
import React from "react";

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
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
