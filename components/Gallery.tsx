"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";

export default function Gallery({ images }: { images: string[] }) {
    return (
        <Swiper 
            spaceBetween={16} 
            slidesPerView={1} 
            centeredSlides={false}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
        >
            {images.map((src, i) => (
                <SwiperSlide key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`img-${i}`} className="rounded-2xl w-full h-auto" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}