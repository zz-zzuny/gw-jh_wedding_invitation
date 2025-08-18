"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useState } from "react";

export default function Gallery({ images }: { images: string[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative">
            {/* 갤러리 안내 텍스트 */}
            <div className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                <div className="flex items-center space-x-2">
                    <span>👆</span>
                    <span>밀어서 갤러리 사진보기</span>
                </div>
            </div>

            <Swiper 
                spaceBetween={16} 
                slidesPerView={1} 
                centeredSlides={false}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {images.map((src, i) => (
                    <SwiperSlide key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`img-${i}`} className="rounded-2xl w-full h-auto" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 페이지네이션 점들 */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === activeIndex ? 'bg-pink-400' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}