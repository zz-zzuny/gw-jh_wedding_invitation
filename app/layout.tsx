import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
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
      <head>
        <link rel="stylesheet" href="/lib/sakura/sakura.css" />
        <link rel="stylesheet" href="/sakura-fix.css" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
        
        {/* Sakura JavaScript 로딩 및 초기화 */}
        <Script src="/lib/sakura/sakura.js" strategy="afterInteractive" />
        <Script id="sakura-init" strategy="afterInteractive">
          {`
            function initSakura() {
              try {
                if (typeof Sakura !== 'undefined') {
                  // Sakura 옵션으로 애니메이션 영역 제한
                  var sakura = new Sakura('body', {
                    fallSpeed: 1.2,        // 떨어지는 속도 조절
                    maxSize: 16,           // 최대 꽃잎 크기 제한
                    minSize: 8,            // 최소 꽃잎 크기 제한
                    delay: 400,            // 꽃잎 생성 간격 조절
                    colors: [{
                      gradientColorStart: 'rgba(255, 183, 197, 0.8)',
                      gradientColorEnd: 'rgba(255, 197, 208, 0.8)',
                      gradientColorDegree: 120
                    }]
                  });
                  
                  // x축 스크롤 방지
                  document.body.style.overflowX = 'hidden';
                  document.documentElement.style.overflowX = 'hidden';
                  
                  console.log('Sakura 애니메이션이 시작되었습니다.');
                  return true;
                } else {
                  console.log('Sakura 라이브러리가 아직 로드되지 않았습니다. 재시도합니다...');
                  return false;
                }
              } catch (error) {
                console.error('Sakura 초기화 중 오류 발생:', error);
                return false;
              }
            }

            // 즉시 시도
            if (!initSakura()) {
              // 실패하면 100ms 후 재시도
              setTimeout(function() {
                if (!initSakura()) {
                  // 또 실패하면 500ms 후 재시도
                  setTimeout(function() {
                    if (!initSakura()) {
                      console.error('Sakura 초기화에 실패했습니다.');
                    }
                  }, 500);
                }
              }, 100);
            }
          `}
        </Script>
      </body>
    </html>
  );
}
