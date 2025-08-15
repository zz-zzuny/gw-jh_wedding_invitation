import Image from "next/image";
import { card } from "@/data/card";
import Gallery from "@/components/Gallery";
import React from "react";
//import ShareButtons from "@/components/ShareButtons";

//const KakaoMap = dynamic(() => import("@/components/KakaoMap"), { ssr: false });

export default function Page() {
  const dateStr = new Date(card.wedding.date).toLocaleString("ko-KR", { dateStyle: "long", timeStyle: "short" });

  return (
    <main className="mx-auto max-w-[480px] min-h-screen bg-white text-gray-900">
      {/* 인트로 */}
      <section className="relative">
        <Image src={card.gallery[0]} alt="cover" width={1200} height={1600} className="w-full h-auto" priority />
        <div className="absolute inset-0 flex items-end justify-center p-6 bg-gradient-to-t from-black/40 to-transparent">
          <div className="text-center text-white">
            <h1 className="text-2xl font-semibold">{card.title}</h1>
            <p className="mt-2">{dateStr} · {card.wedding.venue}</p>
          </div>
        </div>
      </section>

      {/* 예식 정보 */}
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-2">초대합니다</h2>
        <p className="text-sm leading-6">
          두 사람의 소중한 시작에 함께해 주시면 감사하겠습니다.
        </p>
        <div className="mt-4 text-sm">
          <div>{card.wedding.address}</div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="p-0">
        <Gallery images={card.gallery.slice(1)} />
      </section>

      {/* 오시는 길 */}
      {/* <section className="p-6">
        <h2 className="text-xl font-semibold mb-2">오시는 길</h2>
        <div className="h-64 rounded-xl overflow-hidden border">
          <KakaoMap lat={card.wedding.lat!} lng={card.wedding.lng!} />
        </div>
        <div className="mt-2 text-sm">{card.wedding.address}</div>
      </section> */}

      {/* 연락/계좌 */}
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">연락 및 마음 전하실 곳</h2>
        {card.accounts?.bride?.map((a, i) => (
          <div key={`b-${i}`} className="text-sm mb-2">신부 {a.name} · {a.bank} {a.number}</div>
        ))}
        {card.accounts?.groom?.map((a, i) => (
          <div key={`g-${i}`} className="text-sm mb-2">신랑 {a.name} · {a.bank} {a.number}</div>
        ))}
      </section>

      {/* 공유 */}
      <section className="p-6">
        {/* <ShareButtons /> */}
      </section>

      <footer className="p-6 text-center text-xs text-gray-500">Copyright© 2025. gunwoo&juhyun All rights reserved.</footer>
    </main>
  );
}
