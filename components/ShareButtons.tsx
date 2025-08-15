"use client";
import { useEffect } from "react";

export default function ShareButtons() {
  useEffect(() => {
    if ((window as any).Kakao) return;
    const s = document.createElement("script");
    s.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js";
    s.onload = () => (window as any).Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    document.head.appendChild(s);
  }, []);

  const shareKakao = () => {
    const Kakao = (window as any).Kakao;
    if (!Kakao?.Share) return alert("카카오 SDK 로딩 중입니다.");
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: document.title,
        description: document.querySelector("meta[name='description']")?.getAttribute("content"),
        imageUrl: document.querySelector("meta[property='og:image']")?.getAttribute("content"),
        link: { mobileWebUrl: location.href, webUrl: location.href },
      },
      buttons: [{ title: "청첩장 보기", link: { mobileWebUrl: location.href, webUrl: location.href } }],
    });
  };

  return (
    <div className="flex gap-3">
      <button onClick={shareKakao} className="px-4 py-2 rounded-full border">카카오톡 공유</button>
      <button onClick={() => navigator.share?.({ title: document.title, url: location.href })} className="px-4 py-2 rounded-full border">공유하기</button>
    </div>
  );
}