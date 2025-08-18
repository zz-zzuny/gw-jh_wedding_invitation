"use client";
import { card } from "@/data/card";
import React, { useEffect } from "react";

export default function Intro() {
    const dateStr = new Date(card.wedding.date).toLocaleString("ko-KR", { dateStyle: "long", timeStyle: "short" });

    return (
        <section className="relative">
            <div className="w-full">
                <div className="w-full h-full break-all">
                    <div className="flex flex-col items-center w-full h-full" style={{height: '840px'}}>
                        {/* Happy Wedding Day 텍스트 - 적절한 간격으로 띄우기 */}
                        <div className="text-center mt-16 mb-0" style={{ zIndex: 2 }}>
                            <div className="" style={{ paddingBottom: '0px', fontFamily: 'James Stroker, sans-serif', fontSize: '4.6em', lineHeight: '1em' }}>
                                <p><span style={{ color: '#f9d4c4' }}>H</span><span style={{ color: '#ffffff' }}>appy</span></p>
                                <p><span style={{ color: '#f9d4c4' }}>W</span><span style={{ color: '#ffffff' }}>edding</span></p>
                                <p><span style={{ color: '#f9d4c4' }}>D</span><span style={{ color: '#ffffff' }}>ay</span></p>
                            </div>
                        </div>
                        
                        {/* 비디오 영역 */}
                        <div className="relative w-full mb-6" style={{ marginTop: '-150px' }}>
                            <video 
                                autoPlay
                                muted 
                                loop 
                                playsInline
                                className="w-full h-auto"
                                style={{ maxHeight: '50vh' }}
                            >
                                <source src={card.video} type="video/mp4" />
                                브라우저가 비디오를 지원하지 않습니다.
                            </video>
                        </div>
                        
                        {/* 신랑신부 이름과 날짜 - 비디오 바로 아래 */}
                        <div className="text-center" style={{ zIndex: 2 }}>
                            <div className="flex items-center w-full" style={{ fontSize: '18px', lineHeight: '1.4em', padding: '0 2rem 2rem 2rem' }}>
                                <div className="w-full text-left break-all whitespace-break-spaces" style={{ letterSpacing: '0.1em' }}><span style={{ color: '#d099a1' }}>도건우</span></div>
                                <div className="w-full text-center break-all whitespace-break-spaces"><span style={{ color: '#d099a1' }}>2025. 11. 02.</span></div>
                                <div className="w-full text-right break-all whitespace-break-spaces" style={{ letterSpacing: '0.1em' }}><span style={{ color: '#d099a1' }}>박주현</span></div>
                            </div>
                        </div>
                        
                        <div></div>
                    </div>
                </div>
            </div>
            
            {/* <div className="absolute inset-0 flex items-end justify-center p-6 bg-gradient-to-t from-black/40 to-transparent">
                <div className="text-center text-white">
                    <h1 className="text-2xl font-semibold">{card.title}</h1>
                    <p className="mt-2">{dateStr} · {card.wedding.venue}</p>
                </div>
            </div> */}
        </section>

    )

}