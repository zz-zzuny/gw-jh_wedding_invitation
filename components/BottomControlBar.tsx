"use client";
import React from "react";

export default function BottomControlBar() {
    return (
        <div 
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9999] flex justify-center items-center w-[44rem] bg-white border-t border-t-[#eee] drop-shadow-2xl"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="flex items-center justify-center">
                {/* 음악/오디오 버튼 */}
                <a 
                    draggable="false" 
                    className="py-[.8em] px-[1em] flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => console.log('음악 재생/정지')}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-[1.5em] text-black"
                    >
                        <path d="M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z"></path>
                    </svg>
                </a>
                
                {/* 구분선 */}
                <div className="h-[1.4rem] w-[1px] border-r border-gray-300"></div>
                
                {/* 메뉴 버튼 */}
                <a 
                    draggable="false" 
                    className="py-[.8em] px-[1em] flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => console.log('메뉴 열기')}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        className="h-[1.6em] text-black"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="1" 
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </a>
                
                {/* 구분선 */}
                <div className="h-[1.4rem] w-[1px] border-r border-gray-300"></div>
                
                {/* 공유 버튼 */}
                <a 
                    draggable="false" 
                    className="py-[.8em] px-[1em] flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => console.log('공유하기')}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="h-[1.6em] text-black"
                    >
                        <path 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            d="M8.68439 10.6578L15.3125 7.34375M15.3156 16.6578L8.6938 13.3469M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"
                        ></path>
                    </svg>
                </a>
            </div>
        </div>
    );
} 