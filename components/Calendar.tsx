"use client";
import React from "react";
import { card } from "@/data/card";

export default function Calendar() {
  // 2025년 11월 캘린더 데이터
    const calendarData = [
        // 첫 번째 주 (10월 26일부터 시작)
        [null, null, null, null, null, null, 1],
        // 두 번째 주
        [2, 3, 4, 5, 6, 7, 8],
        // 세 번째 주
        [9, 10, 11, 12, 13, 14, 15], // 14일이 결혼식
        // 네 번째 주
        [16, 17, 18, 19, 20, 21, 22],
        // 다섯 번째 주
        [23, 24, 25, 26, 27, 28, 29],
        // 여섯 번째 주
        [30, null, null, null, null, null, null],
    ];

    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weddingDate = 2; // 결혼식 날짜

    return (
        <section className="relative py-16 bg-[#fff5e9]">
            {/* 제목 */}
            <h2 className="text-center text-2xl font-semibold pb-16 text-gray-800 section-title">
                Calendar
            </h2>
            
            {/* 날짜 정보 */}
            <div className="text-center text-base font-semibold pb-4 text-gray-800">
                <span>2025년 11월 2일 일요일 오후 1시 20분</span>
            </div>
            
            {/* 장소 */}
            <div className="text-center text-base font-semibold pb-16 text-gray-800">
                <p>{card.wedding.venue}</p>
            </div>

            {/* 캘린더 테이블 */}
            <div className="flex flex-col text-base font-medium">
                <table className="mx-auto w-full table-fixed leading-none max-w-md">
                    <thead>
                        <tr>
                            {weekdays.map((day, index) => (
                                <th 
                                key={day} 
                                className={`py-6 ${
                                    index === 0 || index === 6 ? "cal-text-holiday" : "text-gray-800"
                                }`}
                                >
                                <div>{day}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {calendarData.map((week, weekIndex) => (
                            <tr key={weekIndex} className="section-calendar-area-5">
                                {week.map((day, dayIndex) => (
                                    <td key={dayIndex} className="section-calendar-area-6 pad">
                                        <div className="section-calendar-area-7 cal-size-2 relative flex flex-col items-center justify-center">
                                            {day && (
                                                <>
                                                {/* 날짜 */}
                                                <div className={`flex justify-center items-center text-base z-10 ${
                                                    day === weddingDate 
                                                    ? "text-white font-bold" 
                                                    : dayIndex === 0 || dayIndex === 6
                                                        ? "cal-text-holiday" 
                                                        : "text-gray-800"
                                                }`}>
                                                    {day}
                                                </div>
                                                
                                                {/* 결혼식 날짜 하이라이트 */}
                                                {day === weddingDate && (
                                                    <>
                                                    {/* 하트 배경 */}
                                                    <div className="absolute w-full h-full flex items-center justify-center">
                                                        <svg className="w-full h-full fill-[#dab1b6]" viewBox="0 0 24 24">
                                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                        </svg>
                                                    </div>
                                                    {/* 시간 정보 */}
                                                    {/* <div className="absolute top-[105%] text-xs font-semibold text-pink-600 whitespace-nowrap">
                                                        오후 1시
                                                    </div> */}
                                                    </>
                                                )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
} 