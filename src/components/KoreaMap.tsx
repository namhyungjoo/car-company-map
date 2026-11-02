import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Building2, 
  Factory, 
  Layers, 
  Compass, 
  Info, 
  Crosshair, 
  Maximize2,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Company } from '../App';

export interface Facility {
  name: string;
  type: '본사' | 'R&D연구소' | '주력 제조공장' | '배터리 플랜트' | '글로벌 센터';
  address: string;
  lat: number;
  lng: number;
  desc?: string;
  isMain?: boolean;
}

// 대한민국 6대 자동차/모빌리티 핵심 산업벨트
export const KOREA_MOBILITY_CLUSTERS = [
  {
    id: 'capital-belt',
    name: '수도권·화성·평택 R&D 조립벨트',
    region: '수도권',
    provinces: '서울 / 경기 / 인천',
    centerLat: 37.25,
    centerLng: 126.90,
    desc: '현대차그룹 남양연구소, 기아 화성/광명 오토랜드, HL만도 판교R&D, 한국단자 송도 본사 등 모빌리티 R&D 및 완성차 중심지',
    keyCompanies: ['현대자동차', '기아', 'HL만도', '유라코퍼레이션', '한국단자공업', '텔레칩스'],
    color: '#6366f1' // indigo
  },
  {
    id: 'chungcheong-belt',
    name: '서해안·충청 파워트레인·배터리벨트',
    region: '충청',
    provinces: '충남(아산/서산) / 충북(청주/충주) / 대전',
    centerLat: 36.75,
    centerLng: 126.95,
    desc: '서산 오토밸리(변속기·감속기), 아산 현대차 조립라인, 한온시스템 대전 본사, 오창 LG에너지솔루션 배터리 메가팩토리 집적지',
    keyCompanies: ['현대트랜시스', '한온시스템', 'LG에너지솔루션', '에코프로비엠', '삼기', '우리산업'],
    color: '#06b6d4' // cyan
  },
  {
    id: 'daegu-gyeongbuk-belt',
    name: '대구·경북 섀시·전장·램프 부품벨트',
    region: '대구경북',
    provinces: '대구(성서) / 경북(영천/경주/김천/포항)',
    centerLat: 35.95,
    centerLng: 128.85,
    desc: '국내 최대 섀시(화신)·램프(SL)·와이어링(경신/THN)·도어래치(PHA/광진) 1·2차 협력사 200여 개사 밀집 단지',
    keyCompanies: ['화신', 'SL', 'THN', '평화정공', '광진상공', '계양정밀', '포스코퓨처엠'],
    color: '#f59e0b' // amber
  },
  {
    id: 'southeast-belt',
    name: '동남권·울산·부산 완성차 메가클러스터',
    region: '울산/동남권',
    provinces: '울산(효문/매곡) / 부산(기장) / 경남(양산/창원)',
    centerLat: 35.45,
    centerLng: 129.25,
    desc: '연간 150만 대 생산의 단일 세계 최대 현대차 울산공장 및 성우하이텍 차체 1위 본사, 서연이화 내장재 공장 밀집',
    keyCompanies: ['현대자동차', '성우하이텍', '현대모비스', '서연이화', '현대공업'],
    color: '#10b981' // emerald
  },
  {
    id: 'honam-belt',
    name: '호남·광주 미래차·전장모터 특구',
    region: '호남(광주)',
    provinces: '광주(첨단/하남) / 전남(광양)',
    centerLat: 35.18,
    centerLng: 126.85,
    desc: '기아 오토랜드 광주, 광주글로벌모터스(GGM), 고아정공 EPS 모터코어, 광양 포스코 이차전지 소재 밸류체인',
    keyCompanies: ['기아', '고아정공', '포스코퓨처엠'],
    color: '#8b5cf6' // purple
  }
];

// 좌표를 SVG (0~520, 0~660) 픽셀 좌표로 변환
export function geoToSvg(lat: number, lng: number) {
  // 경도: 125.8° ~ 129.8° => X: 35 ~ 485
  // 위도: 38.3° ~ 34.0° => Y: 35 ~ 625
  const clampedLng = Math.max(125.7, Math.min(130.0, lng));
  const clampedLat = Math.max(33.8, Math.min(38.4, lat));

  const x = 35 + ((clampedLng - 125.8) / 4.0) * 450;
  const y = 35 + ((38.3 - clampedLat) / 4.3) * 590;

  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

interface KoreaMapProps {
  company: Company;
  onSelectClusterRegion?: (region: string) => void;
  interactive?: boolean;
}

export default function KoreaMap({ company, onSelectClusterRegion, interactive = true }: KoreaMapProps) {
  const [selectedFacilityIdx, setSelectedFacilityIdx] = useState(0);
  const [hoveredClusterId, setHoveredClusterId] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<'company' | 'clusters'>('company');

  // 회사의 사업장/공장 리스트 (없을 경우 location 기반 가공)
  const facilities: Facility[] = React.useMemo(() => {
    if (company.facilities && company.facilities.length > 0) {
      return company.facilities;
    }

    // 기본 등록된 대표 사업장 정보 생성
    const defaultLat = company.lat || 35.85;
    const defaultLng = company.lng || 128.50;

    const mainFacility: Facility = {
      name: `${company.name} 본사/주사업장`,
      type: '본사',
      address: company.location,
      lat: defaultLat,
      lng: defaultLng,
      desc: `${company.category} ${company.subSector} 주력 연구 및 생산 기지`,
      isMain: true
    };

    // 다중 공장 데이터가 있는 경우 보조 공장 추가
    const extraFacilities: Facility[] = [];
    if (company.location.includes('/')) {
      const parts = company.location.split('/').map(p => p.trim());
      if (parts.length > 1) {
        const subLoc = parts[1];
        let subLat = defaultLat;
        let subLng = defaultLng;

        if (subLoc.includes('아산') || subLoc.includes('충남')) { subLat = 36.88; subLng = 126.95; }
        else if (subLoc.includes('울산')) { subLat = 35.56; subLng = 129.35; }
        else if (subLoc.includes('화성') || subLoc.includes('남양')) { subLat = 37.19; subLng = 126.83; }
        else if (subLoc.includes('서산')) { subLat = 36.90; subLng = 126.44; }
        else if (subLoc.includes('평택')) { subLat = 36.98; subLng = 126.86; }
        else if (subLoc.includes('경주')) { subLat = 35.75; subLng = 129.31; }

        extraFacilities.push({
          name: `${company.name} 제2공장 (${subLoc})`,
          type: '주력 제조공장',
          address: `${subLoc} 자동차 부품 전용라인`,
          lat: subLat,
          lng: subLng,
          desc: `규격 부품 정시조달(JIT) 양산 플랜트`,
          isMain: false
        });
      }
    }

    return [mainFacility, ...extraFacilities];
  }, [company]);

  const currentFacility = facilities[selectedFacilityIdx] || facilities[0];
  const currentPin = geoToSvg(currentFacility.lat, currentFacility.lng);

  // 연관 클러스터 찾기
  const matchingCluster = KOREA_MOBILITY_CLUSTERS.find(c => 
    company.region.includes(c.region) || 
    c.keyCompanies.some(k => k === company.name || company.name.includes(k)) ||
    c.desc.includes(company.name)
  ) || KOREA_MOBILITY_CLUSTERS[0];

  // 네이버지도 / 카카오맵 / 구글맵 URL
  const queryAddress = encodeURIComponent(`${company.name} ${currentFacility.address}`);
  const kakaoMapUrl = `https://map.kakao.com/link/search/${queryAddress}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${queryAddress}`;
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${currentFacility.lat},${currentFacility.lng}`;

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 md:p-6 shadow-xl relative overflow-hidden">
      
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="text-sm md:text-base font-extrabold text-white flex items-center gap-1.5">
              대한민국 지도상 사업장 & 산업벨트 위치
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {company.name}의 국내 본사/제조공장 및 전국 6대 모빌리티 부품 클러스터 연계망
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMapMode('company')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              mapMode === 'company' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            사업장 위치
          </button>
          <button
            onClick={() => setMapMode('clusters')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              mapMode === 'clusters' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            전국 6대 클러스터
          </button>
        </div>
      </div>

      {/* Main Grid: SVG Map Left & Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Column: Interactive Vector Map of South Korea (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800/80 p-3 relative flex items-center justify-center overflow-hidden min-h-[380px] sm:min-h-[460px]">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* SVG Map of South Korea */}
          <svg
            viewBox="0 0 520 660"
            className="w-full h-auto max-h-[500px] select-none z-10 drop-shadow-2xl"
          >
            <defs>
              {/* Radial gradient for glowing clusters */}
              <radialGradient id="clusterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </radialGradient>

              {/* Pin drop shadow */}
              <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* --- Sea Background Watermark --- */}
            <text x="60" y="320" fill="#334155" fontSize="11" fontWeight="bold" opacity="0.4" letterSpacing="4">
              서해 (WEST SEA)
            </text>
            <text x="400" y="200" fill="#334155" fontSize="11" fontWeight="bold" opacity="0.4" letterSpacing="4">
              동해 (EAST SEA)
            </text>
            <text x="140" y="640" fill="#334155" fontSize="11" fontWeight="bold" opacity="0.4" letterSpacing="4">
              남해 (SOUTH SEA)
            </text>

            {/* --- South Korea Provinces Polygons --- */}
            
            {/* 1. 수도권 (서울, 경기, 인천) */}
            <path
              d="M 120,110 L 165,70 L 210,80 L 225,160 L 205,200 L 155,210 L 128,175 L 110,140 Z"
              fill="#1e293b"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              className="hover:fill-slate-800 transition-colors cursor-pointer"
              onClick={() => onSelectClusterRegion && onSelectClusterRegion('수도권')}
            >
              <title>수도권 (서울/경기/인천) - 모빌리티 R&D 및 완성차 벨트</title>
            </path>
            <text x="160" y="145" fill="#94a3b8" fontSize="11" fontWeight="700" pointerEvents="none">
              수도권
            </text>

            {/* 2. 강원도 */}
            <path
              d="M 210,80 L 310,60 L 380,140 L 330,210 L 260,190 L 225,160 Z"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              className="hover:fill-slate-800 transition-colors"
            >
              <title>강원권</title>
            </path>
            <text x="290" y="140" fill="#64748b" fontSize="11" fontWeight="600" pointerEvents="none">
              강원
            </text>

            {/* 3. 충청도 (충남, 충북, 대전, 세종) */}
            <path
              d="M 100,205 L 155,210 L 205,200 L 260,190 L 305,270 L 235,320 L 170,310 L 85,265 L 80,225 Z"
              fill="#1e293b"
              stroke="#06b6d4"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              className="hover:fill-slate-800 transition-colors cursor-pointer"
              onClick={() => onSelectClusterRegion && onSelectClusterRegion('충청')}
            >
              <title>충청권 (서산/아산/청주/대전) - 파워트레인 및 배터리 벨트</title>
            </path>
            <text x="160" y="260" fill="#94a3b8" fontSize="11" fontWeight="700" pointerEvents="none">
              충청권
            </text>

            {/* 4. 전라도 / 호남권 (전북, 전남, 광주) */}
            <path
              d="M 85,265 L 170,310 L 235,320 L 215,430 L 195,520 L 130,535 L 75,475 L 75,375 Z"
              fill="#1e293b"
              stroke="#8b5cf6"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              className="hover:fill-slate-800 transition-colors cursor-pointer"
              onClick={() => onSelectClusterRegion && onSelectClusterRegion('호남(광주)')}
            >
              <title>호남권 (광주/광양) - 미래차 및 전장모터 특구</title>
            </path>
            <text x="135" y="420" fill="#94a3b8" fontSize="11" fontWeight="700" pointerEvents="none">
              호남권
            </text>

            {/* 5. 경상도 / 영남권 (경북, 대구, 경남, 울산, 부산) */}
            <path
              d="M 305,270 L 385,240 L 435,290 L 450,400 L 415,470 L 350,490 L 270,480 L 215,430 L 235,320 Z"
              fill="#1e293b"
              stroke="#f59e0b"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              className="hover:fill-slate-800 transition-colors cursor-pointer"
              onClick={() => onSelectClusterRegion && onSelectClusterRegion('대구경북')}
            >
              <title>영남권 (대구/영천/경주/울산/부산) - 자동차 부품 1위 밀집벨트</title>
            </path>
            <text x="330" y="360" fill="#94a3b8" fontSize="11" fontWeight="700" pointerEvents="none">
              대구·경북
            </text>
            <text x="350" y="440" fill="#94a3b8" fontSize="11" fontWeight="700" pointerEvents="none">
              동남권(울산·경남)
            </text>

            {/* 6. 제주도 */}
            <ellipse
              cx="125"
              cy="595"
              rx="38"
              ry="22"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.2"
            />
            <text x="115" y="599" fill="#64748b" fontSize="10" fontWeight="600" pointerEvents="none">
              제주
            </text>

            {/* 7. 울릉도 & 독도 */}
            <circle cx="475" cy="180" r="7" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <text x="466" y="196" fill="#64748b" fontSize="8">울릉도</text>
            <circle cx="505" cy="190" r="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <text x="498" y="204" fill="#64748b" fontSize="8">독도</text>

            {/* --- National Cluster Highlight Circles (When in Cluster Mode or Hovered) --- */}
            {KOREA_MOBILITY_CLUSTERS.map(cluster => {
              const clusterPos = geoToSvg(cluster.centerLat, cluster.centerLng);
              const isHovered = hoveredClusterId === cluster.id;
              const isMatched = matchingCluster.id === cluster.id;
              const showAura = mapMode === 'clusters' || isMatched || isHovered;

              return (
                <g 
                  key={cluster.id}
                  className="cursor-pointer transition-opacity"
                  onClick={() => onSelectClusterRegion && onSelectClusterRegion(cluster.region)}
                  onMouseEnter={() => setHoveredClusterId(cluster.id)}
                  onMouseLeave={() => setHoveredClusterId(null)}
                >
                  {showAura && (
                    <circle
                      cx={clusterPos.x}
                      cy={clusterPos.y}
                      r={isHovered ? 45 : 35}
                      fill={cluster.color}
                      fillOpacity={isHovered ? "0.22" : "0.12"}
                      stroke={cluster.color}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className="animate-pulse"
                    />
                  )}
                  {mapMode === 'clusters' && (
                    <circle
                      cx={clusterPos.x}
                      cy={clusterPos.y}
                      r="5"
                      fill={cluster.color}
                    />
                  )}
                </g>
              );
            })}

            {/* --- Company Plant Pins (All facilities of this company) --- */}
            {facilities.map((fac, idx) => {
              const pos = geoToSvg(fac.lat, fac.lng);
              const isSelected = idx === selectedFacilityIdx;

              return (
                <g 
                  key={idx}
                  onClick={() => setSelectedFacilityIdx(idx)}
                  className="cursor-pointer"
                >
                  {/* Outer pulsating ring for selected primary pin */}
                  {isSelected && (
                    <>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="22"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        opacity="0.8"
                        className="animate-ping"
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="14"
                        fill="#06b6d4"
                        fillOpacity="0.25"
                      />
                    </>
                  )}

                  {/* Pin Circle Body */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 9 : 6}
                    fill={isSelected ? "#4f46e5" : "#334155"}
                    stroke={isSelected ? "#38bdf8" : "#94a3b8"}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    filter="url(#pinShadow)"
                  />
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 3.5 : 2}
                    fill="#ffffff"
                  />

                  {/* Marker Floating Label */}
                  <g transform={`translate(${pos.x + 12}, ${pos.y - 10})`}>
                    <rect
                      x="0"
                      y="-12"
                      width={Math.max(fac.name.length * 11, 80)}
                      height="20"
                      rx="6"
                      fill="#020617"
                      fillOpacity="0.9"
                      stroke={isSelected ? "#38bdf8" : "#334155"}
                      strokeWidth="1"
                    />
                    <text
                      x="8"
                      y="2"
                      fill={isSelected ? "#38bdf8" : "#e2e8f0"}
                      fontSize="9.5"
                      fontWeight="700"
                    >
                      {fac.name}
                    </text>
                  </g>
                </g>
              );
            })}

          </svg>

          {/* Map Compass Rose / Legend */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl px-2.5 py-1.5 text-[10px] text-slate-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
            <span>선택 사업장: <strong className="text-white">{currentFacility.name}</strong></span>
          </div>

          <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl px-2.5 py-1 text-[10px] text-slate-400">
            위도 {currentFacility.lat.toFixed(2)}°N / 경도 {currentFacility.lng.toFixed(2)}°E
          </div>
        </div>

        {/* Right Column: Facility Cards & Navigation Actions (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Active Facility Card */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {currentFacility.type}
                </span>
                <h4 className="text-base font-extrabold text-white mt-1.5 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  {currentFacility.name}
                </h4>
              </div>

              {currentFacility.isMain && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  본사 거점
                </span>
              )}
            </div>

            <div className="text-xs space-y-1.5 text-slate-300 pt-1">
              <p className="flex items-start gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="font-medium">{currentFacility.address}</span>
              </p>
              {currentFacility.desc && (
                <p className="text-[11px] text-slate-400 pl-5">
                  {currentFacility.desc}
                </p>
              )}
            </div>

            {/* Multi-Facility Tabs (if multiple plants exist) */}
            {facilities.length > 1 && (
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500 font-bold block mb-1.5">
                  사업장 / 거점 선택 ({facilities.length}개):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {facilities.map((fac, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFacilityIdx(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        idx === selectedFacilityIdx
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {fac.name.split('(')[0].replace(company.name, '').trim() || fac.type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Regional Automotive Cluster Context */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              연계 산업 클러스터
            </span>
            <h5 className="text-xs font-bold text-slate-200">
              {matchingCluster.name}
            </h5>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {matchingCluster.desc}
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-indigo-300 font-semibold pt-2 border-t border-slate-800/60">
              <span>권역 내 주요 플레이어:</span>
              <span className="text-slate-300">{matchingCluster.keyCompanies.slice(0, 3).join(', ')}</span>
            </div>
          </div>

          {/* Direct Map Application Launcher Buttons */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block">
              정밀 내비게이션 & 길찾기 바로가기
            </span>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={kakaoMapUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 rounded-xl text-center text-xs font-bold text-amber-300 transition-colors flex items-center justify-center gap-1"
                title="카카오맵에서 사업장 검색"
              >
                카카오맵 <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={naverMapUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 rounded-xl text-center text-xs font-bold text-emerald-300 transition-colors flex items-center justify-center gap-1"
                title="네이버 지도에서 사업장 검색"
              >
                네이버지도 <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={googleMapUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-2 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 rounded-xl text-center text-xs font-bold text-blue-300 transition-colors flex items-center justify-center gap-1"
                title="구글 지도 위성 좌표 확인"
              >
                구글지도 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
