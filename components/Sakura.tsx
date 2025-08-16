"use client";

import { useEffect } from 'react';

declare global {
    interface Window {
        Sakura: any;
    }
}

export default function SakuraEffect() {
    useEffect(() => {
        // 브라우저 환경일 때만 실행
        if (typeof window !== "undefined" && window.Sakura) {
            const sakura = new window.Sakura("body", {
                fallSpeed: 2,
                maxSize: 20,
                delay: 200,
            });
        
            console.log("🌸 Sakura started!");
            return () => sakura.stop(true);
        } else {
            console.log(" anjsdlfkjb 왜안돼ㅠ");
        }
    }, []);

    return null;
}