"use client";
import React from "react";

export default function LovePoem() {
    return (
        <section className="relative select-none py-16">
            <div className="wavebg absolute top-0 left-0 -translate-y-[96%] z-[1] w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 65" preserveAspectRatio="xMidYMid meet">
                    <g fill="#ffffff" stroke="none" transform="translate(0,65) scale(0.1,-0.1)">
                        <path d="M6470 629 c-1061 -34 -2002 -142 -3561 -408 -675 -115 -1198 -174 -1899 -214 -30 -2 2755 -3 6190 -3 3435 0 6225 1 6200 3 -25 1 -126 7 -225 13 -536 32 -1103 100 -1740 210 -737 127 -1570 247 -2110 305 -835 89 -1920 125 -2855 94z" />
                    </g>
                    <g fill="#ffffff" stroke="none" transform="translate(0,65) scale(0.1,-0.1)" className="opacity-50">
                        <path d="M0 322 l0 -322 3073 1 c1689 1 3018 5 2952 10 -705 47 -1210 110 -1970 245 -324 57 -1231 193 -1590 238 -665 83 -1301 126 -2117 142 l-348 7 0 -321z" />
                        <path d="M13880 633 c-743 -17 -1425 -69 -2105 -159 -340 -45 -1173 -172 -1460 -223 -763 -135 -1251 -194 -2020 -244 -27 -2 1335 -4 3028 -5 l3077 -2 0 320 0 320 -207 -2 c-115 -1 -255 -3 -313 -5z" />
                    </g>
                </svg>
            </div>
            <div data-aos="fade-up" className="pb-16 flex justify-center">
                <img src="https://cdn2.makedear.com/homepage/img/leaf1.png" draggable={false} className="w-[1.4em]" alt="leaf decoration" />
            </div>
            <div className="flex flex-col items-center relative overflow-hidden space-y-6 text-lg leading-relaxed">
                <div data-aos="fade-up" className="flex flex-col tracking-tighter break-all whitespace-pre-wrap text-center">
                    <p>별을 보고 있으면</p>
                    <p>어둠을 두려워할 필요가 없잖아요</p>
                    <p></p>
                    <p>별이 아름답구나,</p>
                    <p>그 생각부터 하게되니까</p>
                    <p></p>
                    <p>우리, 그렇게 사랑해요</p>
                    <p></p>
                    <p>정현주 &lt;그래도, 사랑&gt;</p>
                </div>
            </div>
        </section>
        
    )
}
