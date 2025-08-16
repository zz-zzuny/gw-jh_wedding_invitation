"use client";
import React from "react";
import { card } from "@/data/card";

export default function Dday() {
    const [timeLeft, setTimeLeft] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    React.useEffect(() => {
        const calculateTimeLeft = () => {
            const weddingDate = new Date(card.wedding.date);
            const now = new Date();
            const difference = weddingDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative py-16 pt-8">
            <div className="flex flex-col justify-center w-full">
                <div className="pt-1 pb-12 flex items-center justify-center w-full font-light text-center tracking-normal">
                    <div className="p-4 flex flex-col justify-center items-center max-w-[5.3rem] max-h-[6rem] rounded-lg border dday-box dday-bg">
                        <div className="flex flex-col w-[10vw] count-text">
                            <span className="text-2xl">{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className="text-xs">Days</span>
                        </div>
                    </div>
                    <span className="text-sm mx-4">:</span>
                    <div className="p-4 flex flex-col justify-center items-center max-w-[5.3rem] max-h-[6rem] rounded-lg border dday-box dday-bg">
                        <div className="flex flex-col w-[10vw] count-text">
                            <span className="text-2xl">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="text-xs">Hour</span>
                        </div>
                    </div>
                    <span className="text-sm mx-4">:</span>
                    <div className="p-4 flex flex-col justify-center items-center max-w-[5.3rem] max-h-[6rem] rounded-lg border dday-box dday-bg">
                        <div className="flex flex-col w-[10vw] count-text">
                            <span className="text-2xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="text-xs">Min</span>
                        </div>
                    </div>
                    <span className="text-sm mx-4">:</span>
                    <div className="p-4 flex flex-col justify-center items-center max-w-[5.3rem] max-h-[6rem] rounded-lg border dday-box dday-bg">
                        <div className="flex flex-col w-[10vw] count-text">
                            <span className="text-2xl">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="text-xs">Sec</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center break-all whitespace-pre-wrap">
                    <p>
                        {card.groom} <span style={{color: '#d08c95'}}>♥</span> {card.bride}의 결혼식이 <strong><span style={{color: '#d08c95'}}>{timeLeft.days}</span></strong>일 남았습니다.
                    </p>
                </div>
            </div>
        </section>
    )
}