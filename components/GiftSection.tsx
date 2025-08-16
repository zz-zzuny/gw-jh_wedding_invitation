"use client";
import React, { useState, useEffect } from "react";
import { card } from "@/data/card";

export default function GiftSection() {
  const [expandedGroom, setExpandedGroom] = useState<boolean>(false);
  const [expandedBride, setExpandedBride] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [copiedInfo, setCopiedInfo] = useState<{bank: string, number: string} | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleCopyAccount = async (bank: string, accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedInfo({ bank, number: accountNumber });
      setIsAnimating(true);
      setShowModal(true);
      
      // 3초 후 모달 자동 닫기
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowModal(false);
      setCopiedInfo(null);
    }, 200); // 애니메이션 완료 후 상태 변경
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center section-title">축하의 마음 전하기</h2>
      
      {/* 안내 메시지 */}
      <div className="mb-8">
        <p className="text-center text-gray-700 mb-6 leading-relaxed text-sm">
          직접 참석하여 축하해 주시기 어려운 분들을 위해<br />
          계좌번호를 안내드립니다.<br />
          너그러운 마음으로 양해해 주시기 바랍니다.<br />
          전해주신 진심을 소중히 간직하고<br />
          좋은 부부가 되어 보답하겠습니다.
        </p>
      </div>
      
      {/* 신랑측 */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setExpandedGroom(!expandedGroom)}
        >
          <h3 className="text-lg font-semibold text-gray-800">신랑측</h3>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-out ${expandedGroom ? "rotate-180" : ""}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className={`overflow-hidden transition-all duration-500 ease-out ${
          expandedGroom ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mt-2 bg-white rounded-lg border border-gray-200 overflow-hidden transform transition-all duration-500 ease-out">
            <div className="divide-y divide-gray-200">
              {/* 신랑 도건우 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 text-sm">신랑 {card.family.groom.groom.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{card.family.groom.groom.bank} {card.family.groom.groom.number}</span>
                  <button 
                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => handleCopyAccount(card.family.groom.groom.bank, card.family.groom.groom.number)}
                    title="계좌번호 복사"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    복사
                  </button>
                </div>
              </div>
              
              {/* 아버지 도기주 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 text-sm">아버지 {card.family.groom.father.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{card.family.groom.father.bank} {card.family.groom.father.number}</span>
                  <button 
                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => handleCopyAccount(card.family.groom.father.bank, card.family.groom.father.number)}
                    title="계좌번호 복사"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    복사
                  </button>
                </div>
              </div>
              
              {/* 어머니 이인화 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 text-sm">어머니 {card.family.groom.mother.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{card.family.groom.mother.bank} {card.family.groom.mother.number}</span>
                  <button 
                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => handleCopyAccount(card.family.groom.mother.bank, card.family.groom.mother.number)}
                    title="계좌번호 복사"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    복사
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 신부측 */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setExpandedBride(!expandedBride)}
        >
          <h3 className="text-lg font-semibold text-gray-800">신부측</h3>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-out ${expandedBride ? "rotate-180" : ""}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className={`overflow-hidden transition-all duration-500 ease-out ${
          expandedBride ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mt-2 bg-white rounded-lg border border-gray-200 overflow-hidden transform transition-all duration-500 ease-out">
            <div className="divide-y divide-gray-200">
              {/* 신부 박주현 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 text-sm">신부 {card.family.bride.bride.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{card.family.bride.bride.bank} {card.family.bride.bride.number}</span>
                  <button 
                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => handleCopyAccount(card.family.bride.bride.bank, card.family.bride.bride.number)}
                    title="계좌번호 복사"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    복사
                  </button>
                </div>
              </div>
              
              {/* 아버지 박준영 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 text-sm">아버지 {card.family.bride.father.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{card.family.bride.father.bank} {card.family.bride.father.number}</span>
                  <button 
                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => handleCopyAccount(card.family.bride.father.bank, card.family.bride.father.number)}
                    title="계좌번호 복사"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    복사
                  </button>
                </div>
              </div>
              
              {/* 어머니 김정희 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 text-sm">어머니 {card.family.bride.mother.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{card.family.bride.mother.bank} {card.family.bride.mother.number}</span>
                  <button 
                    className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => handleCopyAccount(card.family.bride.mother.bank, card.family.bride.mother.number)}
                    title="계좌번호 복사"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    복사
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 복사 완료 모달 */}
      {showModal && copiedInfo && (
        <div className={`fixed inset-0 bg-black transition-all duration-300 ease-out z-50 p-4 ${
          isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}>
          <div className={`flex items-center justify-center h-full transition-all duration-300 ease-out ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all duration-300 ease-out">
              <div className="text-center">
                <div className="mb-4">
                  <p className="text-gray-800 text-lg font-medium break-all">
                    {copiedInfo.bank} {copiedInfo.number}
                  </p>
                  <p className="text-gray-600 text-base mt-2">
                    복사되었습니다
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
