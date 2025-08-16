import Image from "next/image";
import { card } from "@/data/card";
import Gallery from "@/components/Gallery";
import Calendar from "@/components/Calendar";
import Dday from "@/components/Dday";
import BottomControlBar from "@/components/BottomControlBar";
import LovePoem from "@/components/LovePoem";
import InviteMessage from "@/components/InviteMessage";
import FamilyInfo from "@/components/FamilyInfo";
import MapSection from "@/components/MapSection";
import React from "react";
//import ShareButtons from "@/components/ShareButtons";

//const KakaoMap = dynamic(() => import("@/components/KakaoMap"), { ssr: false });

export default function Page() {
  const dateStr = new Date(card.wedding.date).toLocaleString("ko-KR", { dateStyle: "long", timeStyle: "short" });

  return (
    <main className="mx-auto max-w-[480px] min-h-screen text-gray-900">
      {/* 인트로 */}
      <section className="relative">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-auto"
          style={{ maxHeight: '80vh' }}
        >
          <source src={card.video} type="video/mp4" />
          브라우저가 비디오를 지원하지 않습니다.
        </video>
        <div className="absolute inset-0 flex items-end justify-center p-6 bg-gradient-to-t from-black/40 to-transparent">
          <div className="text-center text-white">
            <h1 className="text-2xl font-semibold">{card.title}</h1>
            <p className="mt-2">{dateStr} · {card.wedding.venue}</p>
          </div>
        </div>
      </section>

      {/* 사랑의 시 */}
      <LovePoem />

      {/* 중간 이미지 */}
      {/* <section id="editor-section-picture" data-section="editor-section-picture" className="base-section relative select-none !py-0 py-16 large SunBatang style3 bg-id-0 bgpoint1" section-id="editor-section-picture" style={{zIndex: 3}}>
        <div data-aos="fade-up" className="section-picture-area-1 relative aos-init aos-animate">
          <div>
            <Image src={card.gallery[1]} alt="cover" width={1200} height={1600} className="w-full object-cover select-none pointer-events-none call-out" draggable="false" priority />
          </div>
        </div>
      </section> */}

      {/* 초대 메시지 */}
      <section id="editor-section-picture" data-section="editor-section-picture" className="base-section relative select-none !py-0 py-16 large SunBatang style3 bg-id-0 bgpoint1" section-id="editor-section-picture" style={{zIndex: 3}}>
        <div data-aos="fade-up" className="section-picture-area-1 relative aos-init aos-animate">
          <div>
            <Image src={card.pixcel.invite} alt="cover" width={1200} height={1600} className="w-full object-cover select-none pointer-events-none call-out" draggable="false" priority />
          </div>
        </div>
      </section>
      <InviteMessage />

      {/* 가족 정보 */}
      <FamilyInfo />

      {/* 예식 정보 */}
      <section className="p-6">
        <div className="mt-4 text-sm text-center">
          <div>{card.wedding.address}</div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="p-0">
        <Gallery images={card.gallery.slice(1)} />
      </section>

      {/* 캘린더 */}
      <Calendar />

      {/* D-day */}
      <Dday />

      {/* 오시는 길 */}
      <MapSection />

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
      
      {/* 하단 고정 컨트롤 바 */}
      <BottomControlBar audioPath={card.audio} />
    </main>
  );
}
