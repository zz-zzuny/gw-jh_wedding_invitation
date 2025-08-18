import Image from "next/image";
import { card } from "@/data/card";
import Intro from "@/components/Intro";
import Gallery from "@/components/Gallery";
import Calendar from "@/components/Calendar";
import Dday from "@/components/Dday";
import BottomControlBar from "@/components/BottomControlBar";
import LovePoem from "@/components/LovePoem";
import InviteMessage from "@/components/InviteMessage";
import FamilyInfo from "@/components/FamilyInfo";
import MapSection from "@/components/MapSection";
import GiftSection from "@/components/GiftSection";
import React from "react";
//import ShareButtons from "@/components/ShareButtons";

//const KakaoMap = dynamic(() => import("@/components/KakaoMap"), { ssr: false });

export default function Page() {
  const dateStr = new Date(card.wedding.date).toLocaleString("ko-KR", { dateStyle: "long", timeStyle: "short" });

  return (
    <main className="mx-auto max-w-[480px] min-h-screen text-gray-900">
      {/* 인트로 */}
      <Intro />

      {/* 사랑의 시 */}
      <LovePoem />

      {/* 초대 메시지 */}
      <InviteMessage />

      {/* 가족 정보 */}
      <FamilyInfo />

      {/* 갤러리 */}
      <section className="p-0">
        <h2 className="text-2xl font-semibold mb-4 text-center section-title">Gallery</h2>
        <Gallery images={card.gallery.slice(1)} />
      </section>

      {/* 캘린더 */}
      <Calendar />

      {/* D-day */}
      <Dday />

      {/* 오시는 길 */}
      <MapSection />

      {/* 축하의 마음 전하기 */}
      <GiftSection />

      {/* 연락/계좌 */}
      <section className="p-6">
        {/* <h2 className="text-xl font-semibold mb-4">연락 및 마음 전하실 곳</h2>
        {card.accounts?.bride?.map((a, i) => (
          <div key={`b-${i}`} className="text-sm mb-2">신부 {a.name} · {a.bank} {a.number}</div>
        ))}
        {card.accounts?.groom?.map((a, i) => (
          <div key={`g-${i}`} className="text-sm mb-2">신랑 {a.name} · {a.bank} {a.number}</div>
        ))} */}
      </section>

      {/* 공유 */}
      <section className="p-6">
        {/* <ShareButtons /> */}
      </section>

      <footer className="p-6 text-center text-xs text-gray-500">Copyright© 2025. gunwoo&juhyun All rights reserved.</footer>
      
      {/* 하단 고정 컨트롤 바 */}
      <BottomControlBar audioPath={card.audio} />
    </main>
  );
}
