"use client";
import React, { useState, useEffect, useRef } from "react";
import { card } from "@/data/card";
// 맨 위 import들 밑에 추가
import { Bus, TrainFront, Car, ParkingCircle } from "lucide-react";

/** 교통정보 공용 컴포넌트들 */
const Section = ({
  icon,
  title,
  children,
}: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-6 flex items-center justify-center text-gray-700">
        {icon}
      </div>
             <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);

const Dot = ({ className = "" }: { className?: string }) => (
  <span className={`inline-block w-2 h-2 rounded-full ${className}`} />
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 text-lg text-gray-700">{children}</div>
);

// 네이버 지도 API 타입 정의
declare global {
  interface Window {
    naver: any;
  }
}

// 지도 앱 연동을 위한 유틸리티 함수들
const DEST = {
  name: card.wedding.venue,
  lat: card.wedding.lat,
  lng: card.wedding.lng
};

const encodedName = encodeURIComponent(DEST.name);
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function openUrlWithFallback(url: string, fallback?: string) {
  if (!isMobile) { 
    window.open(fallback || url, '_blank'); 
    return; 
  }
  
  const t = setTimeout(() => { 
    if (fallback) location.href = fallback; 
  }, 1400);
  
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  
  setTimeout(() => { 
    document.body.removeChild(iframe); 
    clearTimeout(t); 
  }, 2000);
}

export default function MapSection() {
  const [showControls, setShowControls] = useState(false);
  const [isMapLocked, setIsMapLocked] = useState(true); // 지도 잠금 상태
  const [showMap, setShowMap] = useState(true); // 지도 표시 여부 (true: 지도, false: 약도)
  const [showImageModal, setShowImageModal] = useState(false); // 이미지 모달 표시 여부
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null); // 지도 인스턴스 저장

     // 네이버 지도 API 로드 및 지도 생성
   useEffect(() => {
     // 지도가 표시되어야 할 때만 지도 생성
     if (!showMap) return;

     // 네이버 지도 API 스크립트가 이미 로드되었는지 확인
     if (window.naver && window.naver.maps) {
       createMap();
       return;
     }

     // 스크립트 로드 - 올바른 Client ID 사용
     const script = document.createElement('script');
     script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=4ohieu8w7a`;
     script.async = true;
     script.onload = () => {
       // 약간의 지연 후 지도 생성 시도
       setTimeout(() => {
         createMap();
       }, 100);
     };
     script.onerror = (error) => {
       console.error('네이버 지도 API 로드 실패:', error);
       // API 로드 실패 시 대체 방법 사용
       setMapLoaded(true);
     };
     document.head.appendChild(script);

     return () => {
       if (script.parentNode) {
         script.parentNode.removeChild(script);
       }
     };
   }, [showMap]); // showMap 상태 변화 감지

  const createMap = () => {
    try {
      if (!mapRef.current || !window.naver || !window.naver.maps) {
        console.log('네이버 지도 API가 로드되지 않았습니다.');
        setMapLoaded(true);
        return;
      }

             const map = new window.naver.maps.Map(mapRef.current, {
         center: new window.naver.maps.LatLng(card.wedding.lat, card.wedding.lng),
         zoom: 15,
         zoomControl: true,
         zoomControlOptions: {
           position: window.naver.maps.Position.TOP_RIGHT,
           style: window.naver.maps.ZoomControlStyle.SMALL
         }
       });

       // 지도 인스턴스 저장
       mapInstanceRef.current = map;

       // 마커 추가
       const marker = new window.naver.maps.Marker({
         position: new window.naver.maps.LatLng(card.wedding.lat, card.wedding.lng),
         map: map
       });

       // 정보창 추가
       const infoWindow = new window.naver.maps.InfoWindow({
         content: `
           <div style="padding: 10px; text-center;">
             <h3 style="margin: 0 0 5px 0; font-size: 14px;">${card.wedding.venue}</h3>
             <p style="margin: 0; font-size: 12px; color: #666;">${card.wedding.address}</p>
           </div>
         `
       });

       // 마커 클릭 시 정보창 표시
       window.naver.maps.Event.addListener(marker, 'click', () => {
         if (!isMapLocked) {
           infoWindow.open(map, marker);
         }
       });

       // 지도 잠금 상태에 따라 조작 제어
       updateMapLockState(map, true);

              setMapLoaded(true);
     } catch (error) {
       console.error('지도 생성 중 오류 발생:', error);
       setMapLoaded(true);
     }
   };

   // 지도 잠금 상태 업데이트 함수
   const updateMapLockState = (map: any, locked: boolean) => {
     if (!map) return;
     
     if (locked) {
       // 지도 잠금: 모든 이벤트 비활성화
       map.setOptions({
         draggable: false,
         pinchZoom: false,
         scrollWheel: false,
         keyboardShortcuts: false,
         disableDoubleTapZoom: true,
         disableDoubleClickZoom: true,
         disableTwoFingerTapZoom: true
       });
     } else {
       // 지도 해제: 모든 이벤트 활성화
       map.setOptions({
         draggable: true,
         pinchZoom: true,
         scrollWheel: true,
         keyboardShortcuts: true,
         disableDoubleTapZoom: false,
         disableDoubleClickZoom: false,
         disableTwoFingerTapZoom: false
       });
     }
   };

   // 자물쇠 클릭 핸들러
   const handleLockToggle = () => {
     const newLockState = !isMapLocked;
     setIsMapLocked(newLockState);
     
     if (mapInstanceRef.current) {
       updateMapLockState(mapInstanceRef.current, newLockState);
     }
   };

   // 약도보기 클릭 핸들러
// 토글 핸들러
const handleMapToggle = () => {
  setShowMap(prev => {
    const next = !prev;
    if (next) { // 약도 -> 지도
      setIsMapLocked(true);
      if (mapInstanceRef.current) updateMapLockState(mapInstanceRef.current, true);
    } else {    // 지도 -> 약도
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      setMapLoaded(false);
    }
    return next;
  });
};

return (
  <>
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center section-title">오시는 길</h2>

      <div className="mb-4 text-center">
        <p className="text-base font-medium mb-2">{card.wedding.venue}</p>
        <p className="text-base text-gray-600 mb-4">{card.wedding.address}</p>
        <p className="text-base text-gray-600 mb-2">
          <a href={`tel:${card.wedding.phone}`} className="text-blue-600 hover:underline">
            {card.wedding.phone}
          </a>
        </p>
      </div>

      {/* 지도 영역 */}
      <div className="relative">
        {/* 상단 컨트롤 */}
        <div className="flex justify-between items-center mb-2" style={{ marginLeft: "1px", marginRight: "1px" }}>
          {/* 잠금 버튼 */}
          <button
            onClick={handleLockToggle}
            title={isMapLocked ? "지도 잠금 해제" : "지도 잠금"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200 shadow-sm hover:bg-gray-50"
          >
            {isMapLocked ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M12 15v2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                <path d="M7 11V7a5 5 0 0 1 9.5-2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M12 15v2" strokeLinecap="round" />
              </svg>
            )}
          </button>

          {/* 약도보기 버튼 */}
          <button
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors text-sm font-medium hover:bg-gray-50 text-black"
            onClick={handleMapToggle}
            title={showMap ? "약도 보기" : "지도 보기"}
          >
            {showMap ? "약도보기" : "지도보기"}
          </button>
        </div>

        {/* 지도/약도 컨테이너 */}
        <div className="h-64 rounded-xl overflow-hidden border mb-2 relative">
          {showMap ? (
            <div
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
              onTouchStart={() => setShowControls(true)}
              onTouchEnd={() => setTimeout(() => setShowControls(false), 3000)}
              className="w-full h-full relative"
            >
              <div ref={mapRef} className="w-full h-full" />
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-gray-500 text-sm">지도를 불러오는 중...</p>
                  </div>
                </div>
              )}
              {showControls && isMapLocked && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4">
                  <div className="text-center text-sm">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>자물쇠 아이콘을 눌러</span>
                    </div>
                    <span>터치 잠금 해제 후 확대 및 이동해 주세요.</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img
              src="/images/building.jpg"
              alt="건물 약도"
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowImageModal(true)}
            />
          )}
        </div>

        {/* 약도 안내(컨테이너 밖) */}
        {!showMap && (
          <div className="bg-white bg-opacity-90 text-gray-800 p-3 rounded-lg border border-gray-200 mb-4">
            <div className="text-center text-sm">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a1 1 0 00-1 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h6a1 1 0 001-1V1a1 1 0 00-1-1H3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V8a1 1 0 00-1-1z"/>
                </svg>
                <span className="font-medium">클릭하면 확대해서 볼 수 있습니다</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 길찾기 버튼 */}
      <div className="flex gap-2" style={{ marginLeft: "1px", marginRight: "1px" }}>
        <button
          className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 hover:bg-gray-50 text-black"
          onClick={(e) => {
            e.preventDefault();
            const scheme = `nmap://route/car?dlat=${DEST.lat}&dlng=${DEST.lng}&dname=${encodedName}&appname=${location.hostname}`;
            const webFallback = `https://map.naver.com/v5/search/${encodedName}`;
            openUrlWithFallback(scheme, webFallback);
          }}
        >
          <img src="https://cdn2.makedear.com/homepage/img/icon/navermap1.webp" alt="네이버" className="w-5 h-5" />
          <span className="text-sm">네이버지도</span>
        </button>

        <button
          className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 hover:bg-gray-50 text-black"
          onClick={(e) => {
            e.preventDefault();
            const kakao = `https://map.kakao.com/link/to/${encodedName},${DEST.lat},${DEST.lng}`;
            window.open(kakao, "_blank");
          }}
        >
          <img src="https://cdn2.makedear.com/homepage/img/icon/kakaonavi1.png" alt="카카오" className="w-5 h-5" />
          <span className="text-sm">카카오내비</span>
        </button>

        <button
          className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 hover:bg-gray-50 text-black"
          onClick={(e) => {
            e.preventDefault();
            const scheme = `tmap://route?goalname=${encodedName}&goalx=${DEST.lng}&goaly=${DEST.lat}&reqCoordType=WGS84&resCoordType=WGS84`;
            const store = /Android/i.test(navigator.userAgent)
              ? "market://details?id=com.skt.tmap.ku"
              : "https://apps.apple.com/kr/app/id431589174";
            openUrlWithFallback(scheme, store);
          }}
        >
          <img src="https://cdn2.makedear.com/homepage/img/icon/tmap1.png" alt="티맵" className="w-5 h-5" />
          <span className="text-sm">티맵</span>
        </button>
      </div>

      {/* ===== 교통 정보 섹션 ===== */}

            {/* 구분선 */}
            <div className="border-t border-dashed border-gray-300 my-6"></div>

      <div className="mt-8 space-y-6">
            {/* 버스 */}
            <Section
              icon={<Bus className="w-4 h-4" />}
              title="버스"
            >
                       <div className="space-y-3">
                             <Row><span className="text-gray-600">부평역 정류장 하차</span>&nbsp;<span className="text-gray-500">도보 2분</span></Row>
               <div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2"><Dot className="bg-green-500" /><span className="text-lg text-gray-700">지선버스: 551, 558, 561, 574, 585</span></div>
                  <div className="flex items-center gap-2"><Dot className="bg-blue-500" /><span className="text-lg text-gray-700">간선버스: 1, 11, 12, 43, 45, 47</span></div>
                  <div className="flex items-center gap-2"><Dot className="bg-purple-500" /><span className="text-lg text-gray-700">좌석버스: 302, 302B</span></div>
                  <div className="flex items-center gap-2"><Dot className="bg-cyan-500" /><span className="text-lg text-gray-700">시외버스: 88(부천), 737(수원/안산),<br />8414(안산), 9500(양재역)</span></div>
              </div>
            </div>
         </Section>

         {/* 구분선 */}
         <div className="border-t border-dashed border-gray-300 my-6"></div>

         {/* 지하철 */}
         <Section
            icon={<TrainFront className="w-4 h-4" />}
            title="지하철"
          >
                <div className="space-y-2">
                    <div className="flex items-center gap-2"><Dot className="bg-orange-500" />
                      <span className="text-lg text-gray-700"><span className="font-medium">1호선</span> 부평역 하차 (부평역에서 도보 2분 거리)</span>
                 </div>
                 <div className="ml-4 text-lg text-gray-600">북부광장 출구 도보 2분 (택시 승강장 옆 우측 방향 12층 건물)</div>
                 <div className="flex items-center gap-2"><Dot className="bg-amber-700" />
                   <span className="text-lg text-gray-700"><span className="font-medium">인천지하철</span> 부평역 하차</span>
                 </div>
                 <div className="ml-4 text-lg text-gray-600">지하상가 11번출구 → 오른편으로 보면 웨딩홀 위치</div>
             </div>
         </Section>

         {/* 구분선 */}
         <div className="border-t border-dashed border-gray-300 my-6"></div>

        {/* 자가용 */}
        <Section
          icon={<Car className="w-4 h-4" />}
          title="자가용"
        >
          <div className="space-y-1 text-lg text-gray-700">
            <Row><span className="font-medium ">내비게이션:</span>&nbsp;“부평역 북부광장, 빌라드마리”, “인천시 부평구 경원대로 1404” 검색</Row>
            <Row><span className="font-medium">서울 방향:</span>&nbsp;서울외곽순환도로 → 경인고속도로 → 부평 IC → 부평역 북부광장 방면</Row>
            <Row><span className="font-medium">인천 방향:</span>&nbsp;경인고속도로 부평 IC → 부평역 북부광장 방면</Row>
            <Row><span className="font-medium">부천 방향:</span>&nbsp;길주로(부일로) 직진 → 부평역 북부광장 방면</Row>
            <Row><span className="font-medium">계양 방향:</span>&nbsp;계산오거리 → 경원대로 직진 → 부평역 북부광장 방면 </Row>
          </div>
        </Section>

        {/* 구분선 */}
        <div className="border-t border-dashed border-gray-300 my-6"></div>

        {/* 주차 */}
        <Section
            icon={<ParkingCircle className="w-4 h-4" />}  // ParkingSquare가 더 취향이면 바꿔도 됨
            title="주차"
          >
          <div className="space-y-1 text-lg text-gray-700">
            <Row>
              <span>
                자가용 이용 시{" "} 지하 2~4층, 지상주차장 (500대 동시 주차)
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">무료주차 2시간</span>
              </span>
            </Row>
            <Row>양가 혼주 카운터에서 주차 등록 후 출차</Row>
          </div>
        </Section>

          {/* 참고 */}
         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
           <div className="flex items-center gap-2">
             <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
             </svg>
             <span className="text-sm font-medium text-yellow-800">참고</span>
           </div>
                       <p className="text-base text-yellow-700 mt-2">※ 되도록 대중교통을 이용해 주시기 바랍니다.</p>
         </div>
      </div>
    </section>

    

    {/* 이미지 모달 */}
    {showImageModal && (
      <div
        className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
        onClick={() => setShowImageModal(false)}
      >
        <div className="relative max-w-4xl max-h-full">
          <button
            className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setShowImageModal(false)}
          >
            ✕
          </button>
          <img
            src="/images/building.jpg"
            alt="건물 약도 확대보기"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    )}
  </>
);
}
