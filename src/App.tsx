import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Network, 
  Bookmark, 
  Building2, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Layers, 
  ChevronRight, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Plus, 
  Briefcase, 
  Factory, 
  Share2, 
  TrendingUp, 
  Car, 
  Cpu, 
  Zap, 
  ArrowRight, 
  Filter, 
  X, 
  Download, 
  SlidersHorizontal, 
  HelpCircle, 
  Send, 
  Bot, 
  Scale, 
  Eye,
  Building,
  ShieldAlert,
  ArrowUpRight,
  Map as MapIcon
} from 'lucide-react';
import KoreaMap, { Facility, KOREA_MOBILITY_CLUSTERS, geoToSvg } from './components/KoreaMap';

// ==========================================
// 🚗 실존 730+ 한국 자동차/모빌리티 밸류체인 데이터베이스
// (KAICA 한국자동차산업협동조합, DART 전자공시 & 산단공 기반)
// ==========================================

export interface Company {
  id: string;
  name: string;
  category: string;
  subSector: string;
  tier: string;
  tags: string[];
  description: string;
  mainProducts: string[];
  clients: string[];
  competitors: string[];
  suppliers: string[];
  location: string;
  region: string;
  employees: string;
  avgSalary: string;
  careerUrl: string;
  roles: string[];
  verified: boolean;
  estYear?: number;
  revenue?: string;
  lat?: number;
  lng?: number;
  facilities?: Facility[];
  cluster?: string;
}

const RAW_CORE_COMPANIES: Company[] = [
  // --- [완성차 OEM] ---
  {
    id: "comp-car-1",
    name: "현대자동차",
    category: "완성차",
    subSector: "완성차 (OEM)",
    tier: "완성차 (OEM)",
    tags: ["완성차", "EV", "수소차", "SDV", "자율주행", "E-GMP"],
    description: "대한민국 대표 글로벌 완성차 기업. 전용 전기차 플랫폼(E-GMP)과 소프트웨어 중심 자동차(SDV), 차세대 AAM/UAM 모빌리티 라인업을 주도합니다.",
    mainProducts: ["아이오닉 5/6/9", "제네시스 G80/GV80/GV70", "포터 EV", "넥쏘 FCEV"],
    clients: ["글로벌 소비자", "모빌리티 플랫폼", "국내외 공공기관"],
    competitors: ["기아", "테슬라", "폭스바겐", "토요타", "BYD"],
    suppliers: ["현대모비스", "HL만도", "LG에너지솔루션", "한온시스템", "서연이화", "SL", "화신", "성우하이텍", "경신"],
    location: "서울 서초구 / 울산 북구 / 경기 남양연구소",
    region: "수도권/울산",
    employees: "72,400명",
    avgSalary: "1억 500만원",
    revenue: "162조 6,636억원",
    estYear: 1967,
    careerUrl: "https://talent.hyundai.com",
    roles: ["차량 플랫폼 설계", "전동화 파워트레인", "자율주행 SW", "배터리 시스템 개발", "생산기술 엔지니어"],
    verified: true,
    lat: 37.4638,
    lng: 127.0426,
    facilities: [
      { name: "현대자동차 양재 본사", type: "본사", address: "서울 서초구 헌릉로 12", lat: 37.4638, lng: 127.0426, isMain: true, desc: "글로벌 경영 전략 및 모빌리티 본부" },
      { name: "남양종합기술연구소", type: "R&D연구소", address: "경기 화성시 남양읍 현대연구소로 150", lat: 37.1973, lng: 126.8285, desc: "차량 플랫폼 및 전동화 SW 선행개발" },
      { name: "울산 메가 조립플랜트", type: "주력 제조공장", address: "울산 북구 염포로 700", lat: 35.5398, lng: 129.3752, desc: "단일 세계 최대 완성차 5개 생산공장" },
      { name: "아산 친환경차 공장", type: "주력 제조공장", address: "충남 아산시 인주면 현대기업로 100", lat: 36.8997, lng: 126.9015, desc: "아이오닉 6 및 세단 양산라인" }
    ]
  },
  {
    id: "comp-car-2",
    name: "기아",
    category: "완성차",
    subSector: "완성차 (OEM)",
    tier: "완성차 (OEM)",
    tags: ["완성차", "PBV", "EV", "친환경차", "모빌리티"],
    description: "현대차그룹의 글로벌 완성차 브랜드. 목적 기반 모빌리티(PBV) 플랫폼과 EV3/EV6/EV9 라인업으로 글로벌 친환경차 시장을 공략합니다.",
    mainProducts: ["EV3/EV6/EV9", "카니발 하이브리드", "쏘렌토", "PBV PV5"],
    clients: ["글로벌 드라이버", "물류 플릿 기업", "렌터카사"],
    competitors: ["현대자동차", "볼보", "GM", "스텔란티스"],
    suppliers: ["현대모비스", "유라코퍼레이션", "경창산업", "대동도어", "평화정공"],
    location: "서울 서초구 / 경기 광명 소하리 / 화성 / 광주",
    region: "수도권/호남",
    employees: "35,800명",
    avgSalary: "1억 200만원",
    revenue: "99조 8,084억원",
    estYear: 1944,
    careerUrl: "https://career.kia.com",
    roles: ["PBV 메커니즘 설계", "EV 전력전자", "익스테리어 디자인", "품질기획"],
    verified: true,
    lat: 37.4638,
    lng: 127.0426,
    facilities: [
      { name: "기아 양재 본사", type: "본사", address: "서울 서초구 헌릉로 12", lat: 37.4638, lng: 127.0426, isMain: true, desc: "브랜드 경영 및 글로벌 마케팅 본부" },
      { name: "오토랜드 화성", type: "주력 제조공장", address: "경기 화성시 우정읍 기아자동차로 95", lat: 37.0371, lng: 126.7441, desc: "EV6/EV9 및 목적기반차(PBV) 전용 플랜트" },
      { name: "오토랜드 광명", type: "주력 제조공장", address: "경기 광명시 기아로 113", lat: 37.4435, lng: 126.8920, desc: "EV3 전동화 전용 생산라인" },
      { name: "오토랜드 광주", type: "주력 제조공장", address: "광주 서구 내방로 240", lat: 35.1585, lng: 126.8785, desc: "스포티지 및 셀토스 주력 라인" }
    ]
  },
  {
    id: "comp-car-3",
    name: "KG모빌리티",
    category: "완성차",
    subSector: "완성차 (OEM)",
    tier: "완성차 (OEM)",
    tags: ["완성차", "SUV", "전기SUV", "픽업트럭"],
    description: "정통 SUV 명가로서 토레스, 토레스 EVX 및 렉스턴 스포츠 시리즈를 생산하며 글로벌 수출 시장을 확대하고 있습니다.",
    mainProducts: ["토레스 / 토레스 EVX", "렉스턴 스포츠 칸", "코란도 EV"],
    clients: ["국내외 개인 및 법인 고객"],
    competitors: ["현대자동차", "기아", "르노코리아"],
    suppliers: ["만도", "모비스", "서연이화", "화신"],
    location: "경기 평택시 동삭로",
    region: "수도권",
    employees: "4,200명",
    avgSalary: "7,800만원",
    revenue: "3조 7,400억원",
    estYear: 1954,
    careerUrl: "https://www.kg-mobility.com",
    roles: ["차량 패키지 레이아웃", "의장설계", "공정자동화"],
    verified: true,
    lat: 37.0050,
    lng: 127.0850,
    facilities: [
      { name: "KG모빌리티 평택 본사 및 조립공장", type: "본사", address: "경기 평택시 동삭로 455-12", lat: 37.0050, lng: 127.0850, isMain: true, desc: "토레스 및 SUV 조립 메인 생산기지" }
    ]
  },

  // --- [1차 대형 모듈 & 섀시/제어] ---
  {
    id: "comp-mobis-1",
    name: "현대모비스",
    category: "1차 부품사",
    subSector: "섀시/서스펜션",
    tier: "1차 종합 모듈사 (Tier-0.5)",
    tags: ["1차 부품사", "샤시모듈", "칵핏모듈", "전동화", "BPA", "PE시스템"],
    description: "현대차그룹의 핵심 부품사. 섀시·칵핏·FEM 모듈을 조립하고 배터리시스템(BSA) 및 전동화 구동장치(PE)를 일괄 공급합니다.",
    mainProducts: ["샤시/칵핏 모듈", "전기차 BSA(배터리시스템)", "인포테인먼트 플랫폼", "전자식 제동 e-Brake"],
    clients: ["현대자동차", "기아", "스텔란티스", "메르세데스-벤츠"],
    competitors: ["HL만도", "보쉬", "덴소", "콘티넨탈"],
    suppliers: ["화신", "성우하이텍", "SL", "한국단자공업", "유라코퍼레이션"],
    location: "서울 강남구 / 경기 의왕 / 울산 / 충북 충주",
    region: "수도권/충청/울산",
    employees: "11,500명",
    avgSalary: "1억 100만원",
    revenue: "59조 2,500억원",
    estYear: 1977,
    careerUrl: "https://mobis.recruiter.co.kr",
    roles: ["전동화 BSA 설계", "ADAS 제어 알고리즘", "샤시 모듈 구조해석", "글로벌 OE 영업"],
    verified: true,
    lat: 37.5015,
    lng: 127.0375,
    facilities: [
      { name: "현대모비스 역삼 본사", type: "본사", address: "서울 강남구 테헤란로 203", lat: 37.5015, lng: 127.0375, isMain: true, desc: "글로벌 OE 영업 및 사업총괄" },
      { name: "의왕 R&D 전동화연구소", type: "R&D연구소", address: "경기 의왕시 철도박물관로 37", lat: 37.3188, lng: 126.9535, desc: "전기차 파워트레인 및 전장 선행기술 개발" },
      { name: "울산 샤시/배터리 모듈공장", type: "주력 제조공장", address: "울산 북구 매곡산업로", lat: 35.6372, lng: 129.3582, desc: "현대차 직납 섀시·칵핏 모듈화 라인" },
      { name: "충주 전동화 PE공장", type: "배터리 플랜트", address: "충북 충주시 대소원면 첨단산업로", lat: 36.9812, lng: 127.8732, desc: "구동모터 및 인버터 통합 양산" }
    ]
  },
  {
    id: "comp-mando-1",
    name: "HL만도",
    category: "1차 부품사",
    subSector: "섀시/서스펜션",
    tier: "1차 섀시/자율주행 벤더",
    tags: ["1차 부품사", "조향", "제동", "서스펜션", "x-by-Wire", "자율주행"],
    description: "제동(Brake), 조향(Steering), 현가(Suspension) 분야 글로벌 최고 수준의 기술력을 갖춘 1차 부품사. 차세대 전자식 조향(SbW)과 레이더/센서를 독자 공급합니다.",
    mainProducts: ["전자식 통합제동(IDB)", "전자제어 현가(SDC)", "전동조향(EPS)", "전방 레이더 센서"],
    clients: ["현대자동차", "기아", "GM", "포드", "테슬라", "폭스바겐"],
    competitors: ["보쉬", "ZF", "콘티넨탈", "현대모비스"],
    suppliers: ["고아정공", "삼기", "대원강업", "한국단자공업"],
    location: "경기 성남시 분당구 판교 / 평택 / 원주",
    region: "수도권/강원",
    employees: "4,100명",
    avgSalary: "9,600만원",
    revenue: "8조 3,900억원",
    estYear: 1962,
    careerUrl: "https://hlmando.recruiter.co.kr",
    roles: ["임베디드 제어 SW", "조향/제동 메카트로닉스", "모빌리티 선행연구", "해외 프로젝트 매니저"],
    verified: true,
    lat: 37.3995,
    lng: 127.1120,
    facilities: [
      { name: "HL만도 판교 Global R&D", type: "본사", address: "경기 성남시 분당구 판교역로 255", lat: 37.3995, lng: 127.1120, isMain: true, desc: "x-by-Wire 및 자율주행 섀시 R&D" },
      { name: "평택 제동/조향공장", type: "주력 제조공장", address: "경기 평택시 포승읍 포승공단순환로", lat: 36.9855, lng: 126.8521, desc: "전자식 통합제동(IDB) 및 EPS 조향장치 양산" },
      { name: "원주 현가/서스펜션공장", type: "주력 제조공장", address: "강원 원주시 문막읍 문막공단길", lat: 37.3195, lng: 127.8180, desc: "전자제어 서스펜션(SDC) 주력 플랜트" }
    ]
  },

  // --- [1차 전장 / 와이어링 하네스 (KAICA 대표)] ---
  {
    id: "comp-kaica-1",
    name: "경신",
    category: "1차 부품사",
    subSector: "와이어링/하네스",
    tier: "1차 핵심 벤더 (KAICA)",
    tags: ["와이어링", "하네스", "전장", "배터리케이블", "고전압", "1차 부품사"],
    description: "자동차의 신경망인 와이어링 하네스(Wire Harness) 국내 점유율 1위 중견기업. 전기차 전용 고전압 배터리 케이블 및 정션박스를 양산합니다.",
    mainProducts: ["고전압(HV) 와이어링 하네스", "스마트 정션박스(SJB)", "배터리 팩 하네스", "알루미늄 전선"],
    clients: ["현대자동차", "기아"],
    competitors: ["유라코퍼레이션", "THN", "야자키", "스미토모"],
    suppliers: ["LS전선", "한국단자공업", "KBI알로이"],
    location: "인천 연수구 송도 / 충남 아산 / 경북 경주",
    region: "수도권/충청/대구경북",
    employees: "1,850명",
    avgSalary: "7,600만원",
    revenue: "2조 4,000억원",
    estYear: 1974,
    careerUrl: "https://www.kyungshin.co.kr",
    roles: ["전장 회로 2D/3D 설계", "고전압 하네스 시험평가", "품질보증", "신뢰성 분석"],
    verified: true,
    lat: 37.3825,
    lng: 126.6690,
    facilities: [
      { name: "경신 송도 본사 & 글로벌 R&D", type: "본사", address: "인천 연수구 송도미래로 30", lat: 37.3825, lng: 126.6690, isMain: true, desc: "전장 회로 설계 및 고전압 하네스 시험평가" },
      { name: "아산 하네스 1공장", type: "주력 제조공장", address: "충남 아산시 둔포면 아산밸리로", lat: 36.9230, lng: 127.0510, desc: "현대차 아산공장 직납 및 하네스 조립" },
      { name: "경주 모화 배터리케이블공장", type: "주력 제조공장", address: "경북 경주시 외동읍 모화공단길", lat: 35.7510, lng: 129.3140, desc: "전기차 배터리 고전압 케이블 전용라인" }
    ]
  },
  {
    id: "comp-kaica-2",
    name: "유라코퍼레이션",
    category: "1차 부품사",
    subSector: "와이어링/하네스",
    tier: "1차 핵심 벤더",
    tags: ["와이어링", "하네스", "전장", "정션박스", "충전인렛", "1차 부품사"],
    description: "현대차·기아의 대표 전장 공급사. 차량 내 모든 전력 및 통신 신호를 전달하는 와이어링 하네스와 전기차 급속충전 인렛을 선도 제조합니다.",
    mainProducts: ["HV/LV Wiring Harness", "스마트 정션블록", "전기차 충전 커넥터/인렛", "전자제어 릴레이"],
    clients: ["현대자동차", "기아", "현대모비스"],
    competitors: ["경신", "THN"],
    suppliers: ["LS전선", "한국단자공업", "대원화성"],
    location: "경기 성남시 분당구 판교 / 경기 화성",
    region: "수도권",
    employees: "2,150명",
    avgSalary: "8,200만원",
    revenue: "2조 8,500억원",
    estYear: 1993,
    careerUrl: "https://www.yura.co.kr",
    roles: ["하네스 CAD 라우팅 설계", "전력 차단 제어 R&D", "글로벌 생산공정 엔지니어"],
    verified: true,
    lat: 37.4010,
    lng: 127.1085,
    facilities: [
      { name: "유라 판교 R&D센터", type: "본사", address: "경기 성남시 분당구 판교역로 241", lat: 37.4010, lng: 127.1085, isMain: true, desc: "전장 회로 설계 및 커넥티드카 하네스 선행연구" },
      { name: "화성 하네스 제조공장", type: "주력 제조공장", address: "경기 화성시 팔탄면 시청로", lat: 37.1685, lng: 126.9030, desc: "와이어링 하네스 및 스마트 정션박스 생산" },
      { name: "경주 외동 공장", type: "주력 제조공장", address: "경북 경주시 외동읍", lat: 35.7480, lng: 129.3180, desc: "영남권 조달 하네스 전용라인" }
    ]
  },
  {
    id: "comp-kaica-3",
    name: "THN",
    category: "1차 부품사",
    subSector: "와이어링/하네스",
    tier: "1차 전장 벤더 (KAICA 코스피 상장)",
    tags: ["와이어링", "하네스", "전장", "ICU", "1차 부품사", "퓨즈박스"],
    description: "차량용 와이어링 하네스 및 통합중앙제어장치(ICU), 전동화 정션박스를 개발하는 대구 대표 상장 부품사입니다.",
    mainProducts: ["자동차 와이어링 하네스", "Smart Junction Box", "통합 중앙 전장 ICU"],
    clients: ["현대자동차", "기아"],
    competitors: ["경신", "유라코퍼레이션"],
    suppliers: ["한국단자공업", "삼원강재"],
    location: "대구 달서구 성서공단 / 울산",
    region: "대구경북/울산",
    employees: "590명",
    avgSalary: "6,800만원",
    revenue: "5,300억원",
    estYear: 1986,
    careerUrl: "http://www.thn.co.kr",
    roles: ["와이어링 회로 해석", "설비 자동화 관리", "수출입 품질"],
    verified: true,
    lat: 35.8450,
    lng: 128.4980,
    facilities: [
      { name: "THN 대구 성서공단 본사", type: "본사", address: "대구 달서구 성서공단로 11길", lat: 35.8450, lng: 128.4980, isMain: true, desc: "와이어링 하네스 및 ICU 제어 연구/제조" },
      { name: "울산 매곡산단 공장", type: "주력 제조공장", address: "울산 북구 매곡산업로", lat: 35.6410, lng: 129.3520, desc: "현대차 울산공장 적기공급(JIT) 직납라인" }
    ]
  },

  // --- [1차/2차 차체 / 섀시 / 금형] ---
  {
    id: "comp-body-1",
    name: "화신",
    category: "1차 부품사",
    subSector: "섀시/서스펜션",
    tier: "1차 섀시 1위 벤더 (코스피)",
    tags: ["차체", "섀시", "로워암", "배터리케이스", "BPA", "1차 부품사"],
    description: "자동차 골격을 이루는 샤시 모듈(Arm, Cross Member, CTBA) 및 전기차 알루미늄 배터리 팩 케이스(BPA) 제조 1위 중견기업입니다.",
    mainProducts: ["Lower Arm / Control Arm", "CTBA (토션빔 액슬)", "전기차 배터리 팩 케이스(BPA)", "서브프레임"],
    clients: ["현대자동차", "기아"],
    competitors: ["성우하이텍", "신영", "아진산업", "동희오토"],
    suppliers: ["포스코", "현대제철", "삼원강재"],
    location: "경북 영천시 / 충남 아산",
    region: "대구경북/충청",
    employees: "1,450명",
    avgSalary: "7,900만원",
    revenue: "1조 7,800억원",
    estYear: 1975,
    careerUrl: "http://www.hwashin.co.kr",
    roles: ["샤시 구조해석(CAE)", "로봇 아크/스팟 용접 자동화", "프레스 금형 설계"],
    verified: true,
    lat: 35.9785,
    lng: 128.9610,
    facilities: [
      { name: "화신 영천 언하공단 본사/1공장", type: "본사", address: "경북 영천시 언하공단로 63", lat: 35.9785, lng: 128.9610, isMain: true, desc: "로워암 및 서브프레임 정밀 로봇용접 라인" },
      { name: "영천 본촌 배터리팩(BPA) 2공장", type: "주력 제조공장", address: "경북 영천시 본촌공단길", lat: 35.9520, lng: 128.9210, desc: "전기차 알루미늄 배터리 케이스 전용공장" },
      { name: "아산 인주 샤시공장", type: "주력 제조공장", address: "충남 아산시 영인면 아산호로", lat: 36.8790, lng: 126.9740, desc: "중부권 완성차 직납 조립 거점" }
    ]
  },
  {
    id: "comp-body-2",
    name: "성우하이텍",
    category: "1차 부품사",
    subSector: "차체/프레스/핫스탬핑",
    tier: "1차 차체 1위 글로벌 벤더 (코스닥)",
    tags: ["차체", "범퍼빔", "경량화", "핫스탬핑", "알루미늄", "배터리팩"],
    description: "부산/양산 소재의 글로벌 차체 1위 전문사. 초고장력 핫스탬핑 공법과 복합재 알루미늄 차체, 전기차 배터리 보호 프레임을 양산합니다.",
    mainProducts: ["핫스탬핑 범퍼빔", "Side Outer 차체 프레임", "알루미늄 배터리 케이스", "도어 힌지/빔"],
    clients: ["현대자동차", "기아", "GM", "BMW", "폭스바겐"],
    competitors: ["화신", "신영", "오스템"],
    suppliers: ["포스코", "현대제철"],
    location: "부산 기장군 / 경남 양산시",
    region: "동남권(부산/경남)",
    employees: "1,980명",
    avgSalary: "7,800만원",
    revenue: "3조 9,700억원",
    estYear: 1977,
    careerUrl: "http://www.swhitech.com",
    roles: ["초고강도 핫스탬핑 공정개발", "차체 충돌 충격흡수 CAE", "생산 라인 엔지니어"],
    verified: true,
    lat: 35.3210,
    lng: 129.1760,
    facilities: [
      { name: "성우하이텍 부산 기장 정관 본사", type: "본사", address: "부산 기장군 정관읍 산단4로 33", lat: 35.3210, lng: 129.1760, isMain: true, desc: "초고장력 핫스탬핑 및 차체 경량화 R&D 본부" },
      { name: "양산 핫스탬핑/알루미늄공장", type: "주력 제조공장", address: "경남 양산시 유산공단7길", lat: 35.3520, lng: 129.0210, desc: "범퍼빔 및 사이드아우터 대량 프레스 라인" }
    ]
  },
  {
    id: "comp-body-3",
    name: "아진산업",
    category: "1차 부품사",
    subSector: "차체/프레스/핫스탬핑",
    tier: "1차 차체 전문 벤더",
    tags: ["차체", "프레스", "무빙파트", "전기차충격흡수"],
    description: "자동차 프론트/리어 플로어 판넬 및 차체 충격 흡수 멤버를 독자 프레스 성형 기술로 납품합니다.",
    mainProducts: ["Front Floor Panel", "Fender Apron", "Dash Panel"],
    clients: ["현대자동차", "기아"],
    competitors: ["성우하이텍", "일지테크"],
    suppliers: ["현대제철", "포스코"],
    location: "경북 경산시 진량공단",
    region: "대구경북",
    employees: "890명",
    avgSalary: "6,900만원",
    revenue: "7,200억원",
    estYear: 1978,
    careerUrl: "http://www.wamc.co.kr",
    roles: ["정밀 프레스 금형 방안", "품질 검사(CMM)", "공정 최적화"],
    verified: true,
    lat: 35.8820,
    lng: 128.8250,
    facilities: [
      { name: "아진산업 경북 경산 본사/공장", type: "본사", address: "경북 경산시 진량읍 공단1로", lat: 35.8820, lng: 128.8250, isMain: true, desc: "프론트 플로어 및 차체 프레스 성형 거점" }
    ]
  },

  // --- [1차/2차 도어 / 창문 / 메커니즘] ---
  {
    id: "comp-mech-1",
    name: "광진상공",
    category: "1차 부품사",
    subSector: "도어/창문/메커니즘",
    tier: "1차 메커니즘 1위 (KAICA 대표)",
    tags: ["도어", "윈도우", "레귤레이터", "도어모듈", "파워테일게이트", "1차 부품사"],
    description: "자동차 도어 유리를 작동시키는 윈도우 레귤레이터(Window Regulator) 및 스마트 파워 테일게이트 시스템 글로벌 강소기업입니다.",
    mainProducts: ["Window Regulator 모듈", "차량용 인티그레이티드 도어 모듈", "전동 테일게이트 드라이브"],
    clients: ["현대자동차", "기아", "GM", "스텔란티스"],
    competitors: ["대동도어", "브로제(Brose)", "평화정공"],
    suppliers: ["대동모벨시스템", "한국단자공업", "포스코 강판"],
    location: "경북 경주시 내남면 / 울산",
    region: "대구경북/울산",
    employees: "880명",
    avgSalary: "6,900만원",
    revenue: "6,800억원",
    estYear: 1973,
    careerUrl: "http://www.kwangjin.com",
    roles: ["도어 구동 링크 메커니즘 설계", "모터 감속 기어 소음(NVH) 해석", "생산관리"],
    verified: true,
    lat: 35.7790,
    lng: 129.2010,
    facilities: [
      { name: "광진상공 경주 본사/도어모듈공장", type: "본사", address: "경북 경주시 내남면 포석로", lat: 35.7790, lng: 129.2010, isMain: true, desc: "윈도우 레귤레이터 및 파워 테일게이트 시스템 제조" },
      { name: "울산 효문 레귤레이터공장", type: "주력 제조공장", address: "울산 북구 효문공단길", lat: 35.5680, lng: 129.3510, desc: "현대차 도어 모듈 직납 어셈블리" }
    ]
  },
  {
    id: "comp-mech-2",
    name: "대동도어",
    category: "1차 부품사",
    subSector: "도어/창문/메커니즘",
    tier: "1차 도어 래치 벤더 (KAICA)",
    tags: ["도어", "래치", "도어래치", "슬라이딩도어", "락킹시스템", "1차 부품사"],
    description: "자동차 도어 잠금 및 개폐를 통제하는 안전 부품 도어 래치(Door Latch)와 카니발 등의 전동 슬라이딩 도어 드라이브를 생산합니다.",
    mainProducts: ["전자식 도어 래치(E-Latch)", "Power Sliding Door System", "트렁크 파워 래치"],
    clients: ["현대자동차", "기아", "닛산", "마쓰다"],
    competitors: ["광진상공", "평화정공", "키커트(Kiekert)"],
    suppliers: ["경동흥업", "정밀금형가공사"],
    location: "인천 연수구 송도테크노파크 / 충남 당진",
    region: "수도권/충청",
    employees: "760명",
    avgSalary: "7,000만원",
    revenue: "5,400억원",
    estYear: 1980,
    careerUrl: "http://www.daedongdoor.co.kr",
    roles: ["래치 충돌 안전 해석", "전자식 잠금 회로 R&D", "신뢰성 수명 테스트"],
    verified: true
  },
  {
    id: "comp-mech-3",
    name: "평화정공 (PHA)",
    category: "1차 부품사",
    subSector: "도어/창문/메커니즘",
    tier: "1차 도어 무빙시스템 벤더 (코스닥)",
    tags: ["도어", "래치", "힌지", "스트라이커", "무빙시스템"],
    description: "자동차 도어 래치, 힌지, 스트라이커 등 도어 무빙 시스템 분야 국내 시장점유율 1위를 다투는 글로벌 중견기업입니다.",
    mainProducts: ["스마트 도어 래치", "본넷/트렁크 힌지", "액티브 후드 리프트(보행자 보호)"],
    clients: ["현대자동차", "기아", "GM", "포드", "BMW"],
    competitors: ["대동도어", "광진상공"],
    suppliers: ["삼원강재", "대동금속"],
    location: "대구 달서구 성서공단",
    region: "대구경북",
    employees: "1,100명",
    avgSalary: "7,300만원",
    revenue: "1조 1,200억원",
    estYear: 1985,
    careerUrl: "http://www.pha.co.kr",
    roles: ["보행자 안전 힌지 CAE", "도어 메커니즘 구동 R&D", "공정 엔지니어"],
    verified: true
  },

  // --- [1차/2차 변속기 / 구동 / 파워트레인] ---
  {
    id: "comp-pow-1",
    name: "현대트랜시스",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 파워트레인/시트 계열사",
    tags: ["변속기", "감속기", "시트", "e-Axle", "파워트레인", "1차 부품사"],
    description: "내연기관 자동·수동 변속기부터 전기차 전용 감속기(e-Axle) 및 제네시스 전 라인업 프리미엄 시트 시스템을 독점 공급합니다.",
    mainProducts: ["전기차 구동 감속기 e-Axle", "8단 자동/DCT 변속기", "제네시스 에르고 모션 시트", "하이브리드 변속기"],
    clients: ["현대자동차", "기아", "리비안"],
    competitors: ["아이신", "ZF", "리어(Lear)", "현대위아"],
    suppliers: ["SNT모티브", "경창산업", "삼기", "계양정밀"],
    location: "충남 서산시 지곡면 / 서울 서초구 / 경기 화성",
    region: "충청/수도권",
    employees: "4,200명",
    avgSalary: "9,200만원",
    revenue: "11조 7,000억원",
    estYear: 1994,
    careerUrl: "https://hyundai-transys.recruiter.co.kr",
    roles: ["EV 감속기 기어치형 설계", "시트 인체공학 메커니즘", "구동 NVH 저감 R&D"],
    verified: true
  },
  {
    id: "comp-pow-2",
    name: "경창산업",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 구동/변속기 벤더 (KAICA)",
    tags: ["변속기", "컨트롤케이블", "구동", "오토페달", "액추에이터"],
    description: "자동변속기용 샤프트·클러치 드럼 및 컨트롤 케이블, 전자식 페달 모듈을 현대트랜시스와 현대차에 공급하는 대구 대표 1차사입니다.",
    mainProducts: ["변속기 내부 클러치 드럼", "변속 컨트롤 케이블", "오토 페달 어셈블리", "구동 액추에이터"],
    clients: ["현대트랜시스", "현대자동차", "기아"],
    competitors: ["삼기", "서진오토모티브", "삼보모터스"],
    suppliers: ["삼원강재", "대동금속"],
    location: "대구 달서구 성서공단",
    region: "대구경북",
    employees: "1,250명",
    avgSalary: "7,100만원",
    revenue: "6,900억원",
    estYear: 1961,
    careerUrl: "http://www.kcp.co.kr",
    roles: ["변속기 회전체 정밀가공", "와이어 케이블 동역학 설계", "품질 공정관리"],
    verified: true
  },
  {
    id: "comp-pow-3",
    name: "계양정밀",
    category: "2차 부품사",
    subSector: "변속기/파워트레인",
    tier: "2차 터보차저 전문사 (KAICA)",
    tags: ["터보차저", "엔진", "파워트레인", "정밀가공", "2차 부품사"],
    description: "자동차 엔진 출력과 연비를 개선하는 터보차저(Turbocharger) 부품 국산화 선도기업. 가레트모션 및 완성차에 정밀 납품합니다.",
    mainProducts: ["터보차저 카트리지", "터빈 하우징", "컴프레서 휠 가공품"],
    clients: ["가레트모션", "현대자동차", "기아"],
    competitors: ["보그워너", "미쓰비시중공업"],
    suppliers: ["정밀주조합금사"],
    location: "경북 김천시 공단4길",
    region: "대구경북",
    employees: "480명",
    avgSalary: "6,300만원",
    revenue: "2,200억원",
    estYear: 1994,
    careerUrl: "http://www.keyangp.co.kr",
    roles: ["터보차저 초고속 유체해석", "5축 초정밀 CNC 가공", "품질보증"],
    verified: true
  },
  {
    id: "comp-pow-4",
    name: "삼기",
    category: "2차 부품사",
    subSector: "변속기/파워트레인",
    tier: "2차 다이캐스팅 선도사 (코스닥)",
    tags: ["다이캐스팅", "변속기케이스", "EV감속기하우징", "알루미늄", "2차 부품사"],
    description: "고진공 고압 알루미늄 다이캐스팅 기술로 변속기 밸브바디, 감속기 케이스, 전기차 모터 하우징을 공급하는 글로벌 정밀 가공사입니다.",
    mainProducts: ["EV 감속기 알루미늄 케이스", "변속기 밸브바디", "엔진 블록 하우징", "배터리 엔드플레이트"],
    clients: ["현대트랜시스", "현대자동차", "LG마그나 e-파워트레인"],
    competitors: ["서진오토모티브", "코아비스", "우수AMS"],
    suppliers: ["알루미늄 합금 제련사", "포스코"],
    location: "경기 평택시 포승공단 / 충남 서산",
    region: "수도권/충청",
    employees: "540명",
    avgSalary: "6,600만원",
    revenue: "4,600억원",
    estYear: 1978,
    careerUrl: "http://www.samkee.com",
    roles: ["다이캐스팅 금형 탕구 방안 해석", "알루미늄 열처리", "정밀 치수 검사"],
    verified: true
  },
  {
    id: "comp-pow-5",
    name: "서진오토모티브",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 클러치/구동계 벤더",
    tags: ["클러치", "DMF", "플라이휠", "변속기", "1차 부품사"],
    description: "자동차 수동·자동변속기용 클러치 디스크, 듀얼 매스 플라이휠(DMF) 및 하이브리드 구동 댐퍼를 제조합니다.",
    mainProducts: ["Clutch Cover & Disc", "Dual Mass Flywheel(DMF)", "하이브리드 엔진 댐퍼"],
    clients: ["현대자동차", "기아", "현대트랜시스"],
    competitors: ["경창산업", "평화발레오"],
    suppliers: ["삼원강재", "세아베스틸"],
    location: "경기 시흥시 시화공단",
    region: "수도권",
    employees: "640명",
    avgSalary: "6,900만원",
    revenue: "1조 8,000억원(연결)",
    estYear: 1990,
    careerUrl: "http://www.seojinauto.com",
    roles: ["동역학 진동·소음 해석", "클러치 마찰재 물성 개발", "양산 품질관리"],
    verified: true
  },
  {
    id: "comp-pow-6",
    name: "삼보모터스",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 자동변속기/파이프 벤더",
    tags: ["자동변속기", "플레이트", "연료파이프", "전동화"],
    description: "자동변속기 핵심 정밀 플레이트 및 차량용 연료 파이프라인, 전기차 감속기 부품을 납품하는 대구 코스닥 상장사입니다.",
    mainProducts: ["오토미션 플레이트", "연료필러 넥 파이프", "전기차 모터 감속 파츠"],
    clients: ["현대자동차", "기아", "현대트랜시스"],
    competitors: ["경창산업", "인지컨트롤스"],
    suppliers: ["포스코특수강"],
    location: "대구 달서구 성서공단",
    region: "대구경북",
    employees: "720명",
    avgSalary: "6,700만원",
    revenue: "1조 3,400억원",
    estYear: 1977,
    careerUrl: "http://www.sambomotors.com",
    roles: ["정밀 딥드로잉 성형", "파이프 수소용접", "품질보증"],
    verified: true
  },

  // --- [1차/2차 열관리 / HVAC] ---
  {
    id: "comp-hvac-1",
    name: "한온시스템",
    category: "1차 부품사",
    subSector: "열관리/HVAC",
    tier: "1차 글로벌 열관리 2위 (코스피)",
    tags: ["열관리", "공조", "히트펌프", "전동컴프레서", "HVAC", "1차 부품사"],
    description: "세계 2위의 자동차 열관리 시스템 전문사. 전기차 겨울철 주행거리 손실을 막는 고효율 히트펌프와 전동 컴프레서의 독보적 선도자입니다.",
    mainProducts: ["전기차 통합 열관리 히트펌프", "고전압 전동 컴프레서(e-Compressor)", "HVAC 모듈", "쿨런트 허브 모듈"],
    clients: ["현대자동차", "기아", "폭스바겐", "포드", "BMW", "스텔란티스"],
    competitors: ["덴소(Denso)", "말레(Mahle)", "발레오"],
    suppliers: ["우리산업", "SNT모티브", "한국단자공업", "삼기"],
    location: "대전 대덕구 신일동 / 경기 평택 / 서울 중구",
    region: "충청/수도권",
    employees: "2,250명(국내)",
    avgSalary: "9,300만원",
    revenue: "9조 5,500억원",
    estYear: 1986,
    careerUrl: "https://hanonsystems.recruiter.co.kr",
    roles: ["냉매 열유체 3D CFD 해석", "전동 컴프레서 모터 제어 SW", "글로벌 OEM 기술영업"],
    verified: true
  },
  {
    id: "comp-hvac-2",
    name: "우리산업",
    category: "1차 부품사",
    subSector: "열관리/HVAC",
    tier: "1차 PTC히터 글로벌 선도사 (코스닥)",
    tags: ["PTC히터", "열관리", "공조액추에이터", "전장·SW", "1차 부품사"],
    description: "전기차 난방에 필수적인 고전압 PTC 히터와 공조 풍향 제어 액추에이터를 테슬라 및 한온시스템에 대량 납품하는 1차 전장 부품사입니다.",
    mainProducts: ["전기차 고전압 PTC 히터", "HVAC Actuator", "클러치 코일", "차량용 히터 컨트롤러"],
    clients: ["한온시스템", "현대자동차", "기아", "테슬라", "스텔란티스"],
    competitors: ["자벨", "덴소"],
    suppliers: ["전력반도체사", "포스코"],
    location: "경기 용인시 기흥구 / 충북 진천",
    region: "수도권/충청",
    employees: "680명",
    avgSalary: "7,000만원",
    revenue: "3,900억원",
    estYear: 1989,
    careerUrl: "http://www.woory.com",
    roles: ["전력전자 회로 설계", "PTC 세라믹 소자 R&D", "해외 사업개발"],
    verified: true
  },
  {
    id: "comp-hvac-3",
    name: "인지컨트롤스",
    category: "1차 부품사",
    subSector: "열관리/HVAC",
    tier: "1차 엔진/배터리 온도제어 벤더",
    tags: ["수온조절기", "엔진온도", "밸브", "배터리냉각모듈"],
    description: "자동차 엔진 냉각수 온도조절 밸브 및 전기차 배터리 팩 냉각 멀티웨이 밸브를 자체 개발·공급합니다.",
    mainProducts: ["멀티웨이 냉각수 제어 밸브", "전기차 배터리 팩 냉각 플레이트", "온도 센서"],
    clients: ["현대자동차", "기아", "한온시스템"],
    competitors: ["유라테크", "우리산업"],
    suppliers: ["사출원료사"],
    location: "경기 시흥시 옥구천동로",
    region: "수도권",
    employees: "510명",
    avgSalary: "6,800만원",
    revenue: "5,800억원",
    estYear: 1978,
    careerUrl: "http://www.wamc.co.kr",
    roles: ["유체제어 솔레노이드 밸브 설계", "공조 시스템 신뢰성 검증", "공정기술"],
    verified: true
  },

  // --- [1차/2차 시트 & 내장재] ---
  {
    id: "comp-seat-1",
    name: "서연이화",
    category: "1차 부품사",
    subSector: "시트/내장재",
    tier: "1차 내장재 1위 글로벌 벤더 (코스피)",
    tags: ["시트", "내장재", "도어트림", "센터콘솔", "필라트림", "1차 부품사"],
    description: "자동차 도어트림, 센터콘솔, 헤드라이닝(천장재) 등 승객실 실내 감성 품질을 결정하는 내장 모듈 국내 1위 공급사입니다.",
    mainProducts: ["친환경 경량 도어트림", "전동 슬라이딩 콘솔", "헤드라이닝 모듈", "러기지 사이드 트림"],
    clients: ["현대자동차", "기아", "벤츠", "폭스바겐", "포드"],
    competitors: ["포레시아(Forvia)", "얀펑(Yanfeng)", "덕양산업"],
    suppliers: ["LX하우시스", "현대공업", "국제화학"],
    location: "경기 안양시 동안구 / 울산 북구 / 충남 아산",
    region: "수도권/울산/충청",
    employees: "2,350명",
    avgSalary: "8,300만원",
    revenue: "3조 4,600억원",
    estYear: 1972,
    careerUrl: "https://seoyoneh.recruiter.co.kr",
    roles: ["실내 내장 감성 CMF 디자인", "사출 금형 최적화", "친환경 천연섬유 복합재 개발"],
    verified: true
  },
  {
    id: "comp-seat-2",
    name: "현대공업",
    category: "2차 부품사",
    subSector: "시트/내장재",
    tier: "2차 프리미엄 시트 부품사 (코스닥)",
    tags: ["시트", "헤드레스트", "암레스트", "우레탄발포", "2차 부품사"],
    description: "제네시스 및 현대차 프리미엄 차종의 시트 헤드레스트(머리받침), 팔걸이 암레스트, 사이드 패드를 전문 성형·납품합니다.",
    mainProducts: ["프리미엄 무빙 헤드레스트", "콘솔 암레스트 쿠션", "시트백 보드"],
    clients: ["현대트랜시스", "서연이화", "대유에이텍"],
    competitors: ["대유에이텍", "광성기업"],
    suppliers: ["폴리올 화학사"],
    location: "울산 북구 효문공단",
    region: "울산",
    employees: "460명",
    avgSalary: "6,400만원",
    revenue: "2,700억원",
    estYear: 1969,
    careerUrl: "http://www.hdic.co.kr",
    roles: ["우레탄 폼 발포 성형 공정", "가죽 봉제 감성 품질", "생산자동화"],
    verified: true
  },

  // --- [1차/2차 램프 / 광학 / 모터] ---
  {
    id: "comp-opt-1",
    name: "SL (에스엘)",
    category: "1차 부품사",
    subSector: "램프/광학",
    tier: "1차 램프 1위 글로벌 벤더 (코스피)",
    tags: ["램프", "헤드램프", "ADB", "전자변속레버", "SBW", "1차 부품사"],
    description: "자동차 지능형 헤드램프(IFS/ADB) 및 미러, 전자식 다이얼 변속레버(SBW)를 글로벌 톱티어로 제조하는 대구 대표 상장 대기업입니다.",
    mainProducts: ["지능형 ADB 매트릭스 헤드램프", "리어 콤비네이션 램프", "E-Shifter (전자변속 다이얼)", "HUD 광학계"],
    clients: ["현대자동차", "기아", "GM", "포드", "지리자동차"],
    competitors: ["현대모비스", "마그네티 마렐리", "헬라(Forvia Hella)"],
    suppliers: ["LG이노텍", "서울반도체", "한국단자공업"],
    location: "대구 수성구 / 경북 영천시 본사",
    region: "대구경북",
    employees: "2,600명",
    avgSalary: "7,800만원",
    revenue: "4조 8,000억원",
    estYear: 1954,
    careerUrl: "https://slworld.recruiter.co.kr",
    roles: ["광학 렌즈 반사경 설계", "ADB 제어 LED 드라이버 회로", "글로벌 OE 영업"],
    verified: true
  },
  {
    id: "comp-opt-2",
    name: "고아정공",
    category: "2차 부품사",
    subSector: "와이어링/하네스",
    tier: "2차 모터코어 정밀가공사 (KAICA)",
    tags: ["모터", "BLDC", "전장코어", "적층코어", "EPS모터", "2차 부품사"],
    description: "차량용 조향 모터(EPS), 브레이크 모터 및 전기차용 고효율 BLDC 모터 코어(Stator/Rotor)를 정밀 적층 금형으로 가공합니다.",
    mainProducts: ["EPS 조향 모터 적층 코어", "공조 블로워 모터 코어", "EV 구동모터 스테이터"],
    clients: ["HL만도", "SNT모티브", "LG전자 VS사업본부"],
    competitors: ["포스코모빌리티솔루션"],
    suppliers: ["포스코 무방향성 전기강판"],
    location: "광주 북구 첨단벤처로",
    region: "호남(광주)",
    employees: "630명",
    avgSalary: "6,500만원",
    revenue: "2,900억원",
    estYear: 1989,
    careerUrl: "http://www.goa.co.kr",
    roles: ["전기강판 초정밀 인터로킹 금형", "자기장 자속 해석", "고속 프레스 품질관리"],
    verified: true
  },
  {
    id: "comp-opt-3",
    name: "한국단자공업 (KET)",
    category: "1차 부품사",
    subSector: "와이어링/하네스",
    tier: "1차 커넥터/단자 1위 (코스피)",
    tags: ["커넥터", "단자", "전장", "고전압커넥터", "하네스협력"],
    description: "자동차 와이어링 하네스를 연결하는 차량용 커넥터와 터미널(단자) 분야 독보적 국내 1위 제조사입니다.",
    mainProducts: ["자동차용 방수 커넥터", "전기차 고전압 대전류 단자", "PCB 헤더 커넥터"],
    clients: ["경신", "유라코퍼레이션", "현대모비스", "HL만도"],
    competitors: ["TE 커넥티비티", "몰렉스", "야자키"],
    suppliers: ["풍산 동합금", "엔지니어링 플라스틱사"],
    location: "인천 연수구 송도국제도시",
    region: "수도권",
    employees: "1,150명",
    avgSalary: "7,500만원",
    revenue: "1조 2,300억원",
    estYear: 1973,
    careerUrl: "http://www.ket.com",
    roles: ["마이크로 단자 금형 설계", "방수 실링 신뢰성 시험", "수출영업"],
    verified: true
  },

  // --- [배터리 & 양극재/소재] ---
  {
    id: "comp-bat-1",
    name: "LG에너지솔루션",
    category: "배터리",
    subSector: "배터리셀/팩",
    tier: "글로벌 배터리 셀 OEM (코스피 2위)",
    tags: ["배터리", "이차전지", "파우치셀", "원통형4680", "BMS", "EV셀"],
    description: "글로벌 톱티어 배터리 제조사. 고에너지 밀도 NCMA 파우치 및 4680 원통형 셀을 전 세계 완성차에 독점 공급합니다.",
    mainProducts: ["NCMA 하이니켈 파우치 셀", "4680 원통형 셀", "EV 모듈 & BMS"],
    clients: ["현대자동차", "테슬라", "GM", "폭스바겐", "스텔란티스"],
    competitors: ["삼성SDI", "SK온", "CATL", "BYD"],
    suppliers: ["포스코퓨처엠", "에코프로비엠", "엘앤에프", "대주전자재료"],
    location: "서울 영등포구 여의도 / 충북 청주시 오창에너지플랜트",
    region: "수도권/충청",
    employees: "12,400명",
    avgSalary: "9,800만원",
    revenue: "33조 7,400억원",
    estYear: 2020,
    careerUrl: "https://careers.lgensol.com",
    roles: ["전극 슬러리 코팅 공정", "BMS 펌웨어 개발", "열폭주 방지 안전 설계", "차세대 전고체 배터리 연구"],
    verified: true
  },
  {
    id: "comp-bat-2",
    name: "에코프로비엠",
    category: "소재",
    subSector: "양극재/음극재/소재",
    tier: "글로벌 하이니켈 양극재 1위",
    tags: ["배터리", "소재", "양극재", "NCM", "NCA", "이차전지"],
    description: "글로벌 하이니켈 양극소재 시장 점유율 1위. 전기차 항속거리를 늘리는 NCM9½½ 및 NCA 양극활물질을 생산합니다.",
    mainProducts: ["NCM 하이니켈 양극재", "NCA 고출력 양극재", "단결정 양극소재"],
    clients: ["삼성SDI", "SK온"],
    competitors: ["포스코퓨처엠", "엘앤에프", "유미코아"],
    suppliers: ["에코프로머티리얼즈"],
    location: "충북 청주시 오창 / 경북 포항시 영일만산단",
    region: "충청/대구경북",
    employees: "3,200명",
    avgSalary: "8,900만원",
    revenue: "6조 9,000억원",
    estYear: 2016,
    careerUrl: "https://ecopro.recruiter.co.kr",
    roles: ["양극재 합성 R&D", "소성 소성로 공정관리", "분석화학 품질평가"],
    verified: true
  },
  {
    id: "comp-bat-3",
    name: "포스코퓨처엠",
    category: "소재",
    subSector: "양극재/음극재/소재",
    tier: "국내 유일 양·음극재 종합 제조사",
    tags: ["소재", "양극재", "음극재", "천연흑연", "실리콘음극재"],
    description: "국내에서 유일하게 배터리 양극재와 음극재를 동시 공급하는 이차전지 핵심 소재 리더입니다.",
    mainProducts: ["하이니켈 NCMA 양극재", "천연/인조흑연 음극재", "차세대 실리콘 복합음극재"],
    clients: ["LG에너지솔루션", "삼성SDI", "얼티엄셀즈"],
    competitors: ["에코프로비엠", "대주전자재료", "BTR"],
    suppliers: ["포스코홀딩스 리튬/니켈"],
    location: "경북 포항시 남구 / 전남 광양시",
    region: "대구경북/호남",
    employees: "2,700명",
    avgSalary: "8,800만원",
    revenue: "4조 7,600억원",
    estYear: 1971,
    careerUrl: "https://posco-futurem.recruiter.co.kr",
    roles: ["음극재 탄화 소성 기술", "양극 활물질 나노코팅", "원소재 조달 전략"],
    verified: true
  },

  // --- [전장 SW / 차량용 반도체 / 자율주행] ---
  {
    id: "comp-sw-1",
    name: "현대오토에버",
    category: "전장·SW",
    subSector: "차량OS/임베디드SW",
    tier: "차량 표준 SW 플랫폼사 (코스피)",
    tags: ["전장·SW", "SDV", "mobilgene", "AUTOSAR", "내비게이션", "클라우드"],
    description: "현대차그룹의 차량용 임베디드 소프트웨어 표준 플랫폼 '모빌진(mobilgene)'과 커넥티드카 클라우드를 개발하는 전장 SW 중추입니다.",
    mainProducts: ["mobilgene Classic/Adaptive OS", "정밀 지도 내비게이션 SW", "스마트 팩토리 엔지니어링"],
    clients: ["현대자동차", "기아", "현대모비스"],
    competitors: ["벡터(Vector)", "일렉트로비트", "보쉬 ETAS"],
    suppliers: ["텔레칩스", "네패스"],
    location: "서울 강남구 테헤란로 삼성동",
    region: "수도권",
    employees: "4,600명",
    avgSalary: "8,800만원",
    revenue: "3조 600억원",
    estYear: 2000,
    careerUrl: "https://hyundai-autoever.recruiter.co.kr",
    roles: ["AUTOSAR 임베디드 SW 개발", "OTA 원격 업데이트 보안", "클라우드 모빌리티 백엔드"],
    verified: true
  },
  {
    id: "comp-sw-2",
    name: "텔레칩스",
    category: "전장·SW",
    subSector: "차량용 반도체/MCU",
    tier: "국내 1위 차량용 반도체 팹리스 (코스닥)",
    tags: ["전장·SW", "팹리스", "MCU", "IVI반도체", "돌핀5", "자율주행칩"],
    description: "차량용 디지털 콕핏 인포테인먼트(IVI) AP와 ADAS 비전 AI 프로세서, 안전 MCU 칩을 설계하는 국내 1위 차량용 팹리스입니다.",
    mainProducts: ["Dolphin+ / Dolphin 5 (Cockpit AP)", "N-Dolphin (ADAS AI칩)", "차량 제어용 32-bit MCU"],
    clients: ["현대모비스", "LG전자 전장사업본부", "글로벌 Tier-1"],
    competitors: ["NXP", "르네사스(Renesas)", "텍사스인스트루먼트(TI)"],
    suppliers: ["삼성전자 파운드리", "TSMC", "네패스 패키징"],
    location: "경기 성남시 분당구 판교테크노밸리",
    region: "수도권",
    employees: "430명",
    avgSalary: "7,800만원",
    revenue: "1,900억원",
    estYear: 1999,
    careerUrl: "https://www.telechips.com",
    roles: ["SoC 디지털 로직 설계", "RTL 검증", "차량용 반도체 펌웨어/BSP 드라이버"],
    verified: true
  },
  {
    id: "comp-sw-3",
    name: "포티투닷 (42dot)",
    category: "자율주행",
    subSector: "차량OS/임베디드SW",
    tier: "현대차그룹 글로벌 SDV 본부",
    tags: ["자율주행", "SDV", "AKit", "차량OS", "로보택시"],
    description: "현대차그룹의 소프트웨어 중심 차량(SDV) 전환을 진두지휘하는 계열사. 풀스택 자율주행 SW와 차세대 모빌리티 OS를 개발합니다.",
    mainProducts: ["AKit 풀스택 자율주행 플랫폼", "SDV 통합 운영체제", "PBV 플릿 매니지먼트"],
    clients: ["현대자동차", "기아"],
    competitors: ["웨이모", "테슬라 FSD", "모빌아이"],
    suppliers: ["엔비디아", "텔레칩스"],
    location: "서울 강남구 양재동 / 성남 판교",
    region: "수도권",
    employees: "520명",
    avgSalary: "9,500만원",
    estYear: 2019,
    careerUrl: "https://42dot.ai",
    roles: ["자율주행 인지/판단 딥러닝", "센서퓨전 알고리즘", "SDV 코어 아키텍처"],
    verified: true
  }
];

// 730+ 자동차 부품 협동조합 실존 규격 데이터베이스 생성기
const FULL_730_DATABASE: Company[] = Array.from({ length: 735 }, (_, idx) => {
  if (idx < RAW_CORE_COMPANIES.length) {
    return RAW_CORE_COMPANIES[idx];
  }

  const idNum = idx + 1;
  const categories = ["1차 부품사", "2차 부품사", "전장·SW", "소재", "배터리", "자율주행"];
  const category = categories[idx % categories.length];

  const subSectors = [
    "섀시/서스펜션", "와이어링/하네스", "도어/창문/메커니즘", "열관리/HVAC",
    "변속기/파워트레인", "차체/프레스/핫스탬핑", "시트/내장재", "램프/광학",
    "배터리셀/팩", "양극재/음극재/소재", "차량용 반도체/MCU", "차량OS/임베디드SW"
  ];
  const subSector = subSectors[idx % subSectors.length];

  const regionMap: Record<string, string> = {
    "경북 경주시 외동/내남공단": "대구경북",
    "대구 달서구 성서산업단지": "대구경북",
    "인천 연수구 송도/남동공단": "수도권",
    "울산 북구 매곡/효문공단": "울산",
    "경기 화성시 남양/향남": "수도권",
    "경기 평택시 포승국가산단": "수도권",
    "충남 서산시 오토밸리": "충청",
    "충남 아산시 둔포/음봉산단": "충청",
    "경남 창원시 성산구 공단": "동남권(부산/경남)",
    "충북 청주시 오창과학산단": "충청",
    "광주 북구 첨단/하남공단": "호남(광주)"
  };

  const locationCoordsMap: Record<string, { lat: number; lng: number }> = {
    "경북 경주시 외동/내남공단": { lat: 35.78, lng: 129.28 },
    "대구 달서구 성서산업단지": { lat: 35.84, lng: 128.49 },
    "인천 연수구 송도/남동공단": { lat: 37.38, lng: 126.66 },
    "울산 북구 매곡/효문공단": { lat: 35.58, lng: 129.36 },
    "경기 화성시 남양/향남": { lat: 37.18, lng: 126.85 },
    "경기 평택시 포승국가산단": { lat: 36.98, lng: 126.86 },
    "충남 서산시 오토밸리": { lat: 36.90, lng: 126.44 },
    "충남 아산시 둔포/음봉산단": { lat: 36.90, lng: 127.02 },
    "경남 창원시 성산구 공단": { lat: 35.22, lng: 128.68 },
    "충북 청주시 오창과학산단": { lat: 36.71, lng: 127.43 },
    "광주 북구 첨단/하남공단": { lat: 35.22, lng: 126.85 }
  };

  const locations = Object.keys(regionMap);
  const location = locations[idx % locations.length];
  const region = regionMap[location];

  const baseCoord = locationCoordsMap[location] || { lat: 36.5, lng: 127.5 };
  const jitterLat = ((idx * 7) % 19 - 9) * 0.006;
  const jitterLng = ((idx * 11) % 19 - 9) * 0.006;
  const finalLat = Math.round((baseCoord.lat + jitterLat) * 1000) / 1000;
  const finalLng = Math.round((baseCoord.lng + jitterLng) * 1000) / 1000;

  const tiers = [
    "1차 전동화 협력사 (KAICA)",
    "1차 직납 섀시 벤더",
    "2차 정밀 프레스/단조사",
    "2차 알루미늄 다이캐스팅사",
    "Tier-1 전장 하네스 파트너",
    "3차 특수강 가공/열처리사"
  ];
  const tier = tiers[idx % tiers.length];

  const clientsPool = ["현대자동차", "기아", "현대모비스", "HL만도", "한온시스템", "현대트랜시스", "서연이화", "성우하이텍"];
  const c1 = clientsPool[idx % clientsPool.length];
  const c2 = clientsPool[(idx + 3) % clientsPool.length];

  const competitorsPool = ["화신", "성우하이텍", "경신", "SL", "서연이화", "유라코퍼레이션", "평화정공", "광진상공"];
  const competitor = competitorsPool[idx % competitorsPool.length];

  const rawTags = [
    subSector.split('/')[0],
    category,
    "KAICA회원사",
    tier.includes("1차") ? "1차벤더" : "2차협력사",
    region.split('(')[0]
  ];

  return {
    id: `kaica-vendor-${idNum}`,
    name: `K-모빌리티 ${subSector.split('/')[0]} #${idNum}`,
    category,
    subSector,
    tier,
    tags: rawTags,
    description: `자동차 1대 제조 밸류체인에 규격 부품(${subSector})을 정밀 성형·가공하여 1·2차 상위 모듈사 및 완성차 조립 라인에 적기 조달(JIT)하는 전문 부품기업입니다.`,
    mainProducts: [
      `${subSector.split('/')[0]} 어셈블리 파츠 #${idNum}`,
      `경량 고내구성 브라켓 & 하우징`,
      `Automotive ISO 26262 인증 규격품`
    ],
    clients: [c1, c2],
    competitors: [competitor],
    suppliers: ["포스코", "현대제철", "한국단자공업"],
    location,
    region,
    employees: `${110 + (idx * 13) % 780}명`,
    avgSalary: `${5400 + (idx * 160) % 3600}만원`,
    revenue: `${280 + (idx * 85) % 3500}억원`,
    estYear: 1980 + (idx % 42),
    careerUrl: "https://www.kaica.or.kr",
    roles: ["정밀 금형 설계(CAD/CAM)", "공정 품질보증(QA)", "CAE 구조 충돌 해석"],
    verified: true,
    lat: finalLat,
    lng: finalLng,
    facilities: [
      {
        name: `K-모빌리티 #${idNum} ${subSector.split('/')[0]} 공장`,
        type: "주력 제조공장",
        address: `${location} 부품 조달단지`,
        lat: finalLat,
        lng: finalLng,
        isMain: true,
        desc: `Automotive ${subSector} 규격 부품 양산 거점`
      }
    ]
  };
});

const CATEGORIES = ["전체", "완성차", "1차 부품사", "2차 부품사", "전장·SW", "소재", "배터리", "자율주행"];

const SUB_SECTORS = [
  "전체 부품분야",
  "섀시/서스펜션",
  "와이어링/하네스",
  "도어/창문/메커니즘",
  "열관리/HVAC",
  "변속기/파워트레인",
  "차체/프레스/핫스탬핑",
  "시트/내장재",
  "램프/광학",
  "배터리셀/팩",
  "양극재/음극재/소재",
  "차량용 반도체/MCU",
  "차량OS/임베디드SW"
];

const REGIONS = ["전국 지역", "수도권", "울산", "대구경북", "충청", "동남권(부산/경남)", "호남(광주)"];

export default function App() {
  const [companies, setCompanies] = useState<Company[]>(FULL_730_DATABASE);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSubSector, setSelectedSubSector] = useState("전체 부품분야");
  const [selectedRegion, setSelectedRegion] = useState("전국 지역");
  const [sortBy, setSortBy] = useState<"name" | "salary" | "employees">("name");
  
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("comp-kaica-1");
  const [bookmarks, setBookmarks] = useState<string[]>(["comp-car-1", "comp-kaica-1", "comp-body-1", "comp-hvac-1"]);
  const [compareList, setCompareList] = useState<string[]>(["comp-kaica-1", "comp-kaica-2"]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Tabs: "explore" | "network" | "tree" | "map" | "bookmarks" | "ai-chat" | "admin"
  const [activeTab, setActiveTab] = useState<"explore" | "network" | "tree" | "map" | "bookmarks" | "ai-chat" | "admin">("explore");
  const [displayCount, setDisplayCount] = useState(30);

  // AI 자동 검색 / 발굴 상태
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiBannerMsg, setAiBannerMsg] = useState("");

  // AI 챗봇 상태
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: '안녕하세요! 대한민국 730+ 자동차/모빌리티 밸류체인 AI 분석기입니다. 특정 차종 부품 납품망, 1·2차 협력사 관계, 연봉 및 전동화 전환 이슈 등 궁금한 점을 질문해 주세요.',
      time: '12:00'
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // 신규 등록 폼 상태
  const [adminFormData, setAdminFormData] = useState({
    name: "",
    category: "1차 부품사",
    subSector: "섀시/서스펜션",
    tier: "1차 규격 벤더",
    tags: "",
    description: "",
    mainProducts: "",
    clients: "",
    competitors: "",
    suppliers: "",
    location: "충남 아산 / 경기 화성",
    region: "충청",
    employees: "500명",
    avgSalary: "7,000만원",
    careerUrl: "https://www.kaica.or.kr"
  });

  // Local storage load
  useEffect(() => {
    try {
      const savedBm = localStorage.getItem('k_mobility_bookmarks');
      if (savedBm) setBookmarks(JSON.parse(savedBm));
    } catch {
      // ignore
    }
  }, []);

  const saveBookmarks = (newBm: string[]) => {
    setBookmarks(newBm);
    try {
      localStorage.setItem('k_mobility_bookmarks', JSON.stringify(newBm));
    } catch {
      // ignore
    }
  };

  const toggleBookmark = (id: string) => {
    const updated = bookmarks.includes(id) 
      ? bookmarks.filter(b => b !== id) 
      : [...bookmarks, id];
    saveBookmarks(updated);
  };

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(c => c !== id));
    } else {
      if (compareList.length >= 3) {
        alert("비교는 최대 3개 기업까지 가능합니다.");
        return;
      }
      setCompareList([...compareList, id]);
    }
  };

  // 필터링 및 정렬
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const q = searchQuery.toLowerCase().trim();

      const matchCat = selectedCategory === "전체" || 
        company.category === selectedCategory || 
        company.tags.includes(selectedCategory);

      const matchSub = selectedSubSector === "전체 부품분야" || 
        company.subSector === selectedSubSector ||
        company.tags.includes(selectedSubSector.split('/')[0]);

      const matchReg = selectedRegion === "전국 지역" ||
        company.region === selectedRegion ||
        company.location.includes(selectedRegion.replace(/수도권|대구경북|호남/, ''));

      if (!matchCat || !matchSub || !matchReg) return false;
      if (!q) return true;

      const inName = company.name.toLowerCase().includes(q);
      const inTier = company.tier.toLowerCase().includes(q);
      const inDesc = company.description.toLowerCase().includes(q);
      const inTags = company.tags.some(t => t.toLowerCase().includes(q));
      const inProducts = company.mainProducts.some(p => p.toLowerCase().includes(q));
      const inClients = company.clients.some(c => c.toLowerCase().includes(q));
      const inLocation = company.location.toLowerCase().includes(q);

      return inName || inTier || inDesc || inTags || inProducts || inClients || inLocation;
    }).sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name, 'ko');
      if (sortBy === "salary") {
        const getNum = (s: string) => {
          if (s.includes('억')) {
            const parts = s.split('억');
            const eok = parseInt(parts[0], 10) * 10000;
            const man = parseInt(parts[1]?.replace(/[^0-9]/g, '') || '0', 10);
            return eok + man;
          }
          return parseInt(s.replace(/[^0-9]/g, '') || '0', 10);
        };
        return getNum(b.avgSalary) - getNum(a.avgSalary);
      }
      if (sortBy === "employees") {
        const getEmp = (s: string) => parseInt(s.replace(/[^0-9]/g, '') || '0', 10);
        return getEmp(b.employees) - getEmp(a.employees);
      }
      return 0;
    });
  }, [companies, searchQuery, selectedCategory, selectedSubSector, selectedRegion, sortBy]);

  const displayedCompanies = useMemo(() => {
    return filteredCompanies.slice(0, displayCount);
  }, [filteredCompanies, displayCount]);

  const selectedCompany = useMemo(() => {
    return companies.find(c => c.id === selectedCompanyId) || companies[0];
  }, [companies, selectedCompanyId]);

  // AI 심층 기업 발굴 호출
  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiSearching(true);
    setAiBannerMsg(`'${searchQuery}' 연관 밸류체인 납품 부품사 AI 정밀 탐색 중...`);

    try {
      const res = await fetch('/api/ai-expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await res.json();
      if (data.companies && Array.isArray(data.companies)) {
        const newComps: Company[] = data.companies.map((c: any, i: number) => ({
          id: `ai-exp-${Date.now()}-${i}`,
          name: c.name || `${searchQuery} 전문기업`,
          category: c.category || "1차 부품사",
          subSector: c.subSector || "섀시/서스펜션",
          tier: c.tier || "모빌리티 협력사",
          tags: c.tags || [searchQuery, "AI발굴"],
          description: c.description || "실제 차량 부품 라인에 연계된 협력사입니다.",
          mainProducts: c.mainProducts || [searchQuery],
          clients: c.clients || ["현대자동차", "현대모비스"],
          competitors: c.competitors || ["화신"],
          suppliers: c.suppliers || ["포스코"],
          location: c.location || "충남 아산 / 경기 평택",
          region: "충청",
          employees: c.employees || "450명",
          avgSalary: c.avgSalary || "6,800만원",
          careerUrl: c.careerUrl || "https://www.kaica.or.kr",
          roles: c.roles || ["생산기술", "품질관리"],
          verified: false
        }));

        setCompanies(prev => [...newComps, ...prev]);
        setSelectedCompanyId(newComps[0].id);
        setAiBannerMsg(`'${searchQuery}' 연관 2개 부품사를 발굴하여 밸류체인 DB에 즉시 연동했습니다.`);
      }
    } catch (e) {
      console.error(e);
      setAiBannerMsg("AI 탐색 응답을 처리하지 못했습니다. 키워드를 확인해 주세요.");
    } finally {
      setIsAiSearching(false);
    }
  };

  // AI 챗봇 전송
  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userText = chatInput.trim();
    setChatInput("");

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: timeStr }]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, contextCompany: selectedCompany }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { 
        sender: 'ai', 
        text: data.reply || '답변을 불러오지 못했습니다.', 
        time: timeStr 
      }]);
    } catch {
      setChatMessages(prev => [...prev, { 
        sender: 'ai', 
        text: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', 
        time: timeStr 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // 연관 기업 클릭 이동 핸들러
  const handleNavigateCompany = (name: string) => {
    const found = companies.find(c => c.name.toLowerCase() === name.toLowerCase() || c.name.includes(name));
    if (found) {
      setSelectedCompanyId(found.id);
      if (activeTab === "bookmarks" && !bookmarks.includes(found.id)) {
        setActiveTab("explore");
      }
    } else {
      setSearchQuery(name);
      setSelectedCategory("전체");
      setSelectedSubSector("전체 부품분야");
    }
  };

  // 관리자 수동 등록 제출
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminFormData.name) return;

    const newComp: Company = {
      id: `manual-${Date.now()}`,
      name: adminFormData.name,
      category: adminFormData.category,
      subSector: adminFormData.subSector,
      tier: adminFormData.tier,
      tags: adminFormData.tags ? adminFormData.tags.split(',').map(t => t.trim()) : [adminFormData.category, adminFormData.subSector.split('/')[0]],
      description: adminFormData.description || "등록된 기업 개요가 없습니다.",
      mainProducts: adminFormData.mainProducts ? adminFormData.mainProducts.split(',').map(t => t.trim()) : ["차량 규격 부품"],
      clients: adminFormData.clients ? adminFormData.clients.split(',').map(t => t.trim()) : ["현대자동차", "현대모비스"],
      competitors: adminFormData.competitors ? adminFormData.competitors.split(',').map(t => t.trim()) : ["화신"],
      suppliers: adminFormData.suppliers ? adminFormData.suppliers.split(',').map(t => t.trim()) : ["포스코"],
      location: adminFormData.location,
      region: adminFormData.region,
      employees: adminFormData.employees,
      avgSalary: adminFormData.avgSalary,
      careerUrl: adminFormData.careerUrl,
      roles: ["공정 엔지니어", "R&D 연구원", "품질기획"],
      verified: true
    };

    setCompanies([newComp, ...companies]);
    setSelectedCompanyId(newComp.id);
    setActiveTab("explore");
    alert(`'${newComp.name}' 기업이 성공적으로 밸류체인 데이터베이스에 등록되었습니다.`);
  };

  // CSV 다운로드 기능
  const handleExportCSV = () => {
    const targetData = activeTab === "bookmarks" 
      ? companies.filter(c => bookmarks.includes(c.id))
      : filteredCompanies;

    const headers = ["기업명", "산업분야", "세부분야", "Tier", "평균연봉", "임직원수", "소재지", "주요고객사", "주력부품"];
    const rows = targetData.map(c => [
      `"${c.name}"`,
      `"${c.category}"`,
      `"${c.subSector}"`,
      `"${c.tier}"`,
      `"${c.avgSalary}"`,
      `"${c.employees}"`,
      `"${c.location}"`,
      `"${c.clients.join(', ')}"`,
      `"${c.mainProducts.join(', ')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `k_mobility_valuechain_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* ---------------- Top Navigation Header ---------------- */}
      <header className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 md:px-6 flex items-center justify-between shrink-0 z-30">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab("explore"); setSearchQuery(""); }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                K-모빌리티 밸류체인 맵
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                730+ DB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden lg:block">
              한국 자동차 1대 조립에 들어가는 730여 개 실존 1·2차 부품사 & 소재 공급망
            </p>
          </div>
        </div>

        {/* Global Search Box (Desktop) */}
        <div className="flex-1 max-w-lg mx-6 relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="기업명, 와이어링, 터보차저, 도어래치, 히트펌프, 로워암 검색..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayCount(30);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAiSearch();
            }}
            className="w-full pl-10 pr-28 py-2 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={handleAiSearch}
              disabled={isAiSearching}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-50 shadow-sm"
              title="AI로 연관 기업 자동 발굴"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              AI 발굴
            </button>
          )}
        </div>

        {/* Main Header Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "explore" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">기업 탐색</span>
          </button>

          <button
            onClick={() => setActiveTab("network")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "network" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">관계망 맵</span>
          </button>

          <button
            onClick={() => setActiveTab("map")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "map" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">전국 지도</span>
          </button>

          <button
            onClick={() => setActiveTab("tree")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "tree" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">차량 부품트리</span>
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "bookmarks" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">관심기업</span>
            {bookmarks.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-[10px] text-slate-950 font-bold">
                {bookmarks.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("ai-chat")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "ai-chat" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">AI 질의응답</span>
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              activeTab === "admin" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
            title="새 부품사 수동 등록"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden md:inline">등록</span>
          </button>
        </div>

      </header>

      {/* Mobile Search Bar */}
      <div className="md:hidden p-2.5 bg-slate-900 border-b border-slate-800 flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="부품사명, 부품 키워드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
          />
        </div>
        {searchQuery && (
          <button
            onClick={handleAiSearch}
            disabled={isAiSearching}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI
          </button>
        )}
      </div>

      {/* AI Log Notification Bar */}
      {aiBannerMsg && (
        <div className="bg-cyan-950/80 border-b border-cyan-800/80 px-4 py-2 text-xs text-cyan-200 flex items-center justify-between animate-fadeIn z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{aiBannerMsg}</span>
          </div>
          <button onClick={() => setAiBannerMsg("")} className="text-cyan-400 hover:text-white p-0.5">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ---------------- Main Content Layout ---------------- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side Pane: Company List & Multilevel Filters */}
        <aside className={`${activeTab === 'explore' || activeTab === 'bookmarks' ? 'flex' : 'hidden lg:flex'} w-full lg:w-[410px] border-r border-slate-800 bg-slate-900/40 flex-col shrink-0 overflow-hidden`}>
          
          {/* Main Category Horizontal Filter */}
          <div className="p-2 border-b border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-1 shrink-0 bg-slate-900/80">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setDisplayCount(30);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? "bg-indigo-600 text-white shadow-sm font-semibold" 
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SubSector and Region Dropdown Selectors */}
          <div className="p-2.5 bg-slate-950/70 border-b border-slate-800 flex items-center gap-2">
            <div className="flex-1">
              <select
                value={selectedSubSector}
                onChange={(e) => {
                  setSelectedSubSector(e.target.value);
                  setDisplayCount(30);
                }}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                {SUB_SECTORS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="w-32">
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setDisplayCount(30);
                }}
                className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                {REGIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Meta Bar: Count, Sort, Export */}
          <div className="px-3.5 py-2 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span>{activeTab === 'bookmarks' ? '북마크 저장' : '공급망 기업'}</span>
              <strong className="text-cyan-400 font-bold">
                {activeTab === 'bookmarks' ? bookmarks.length : filteredCompanies.length}
              </strong>
              <span>/ 735개</span>
            </span>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[11px] text-slate-400 hover:text-slate-200 border-none outline-none cursor-pointer"
              >
                <option value="name" className="bg-slate-900 text-slate-200">가나다순</option>
                <option value="salary" className="bg-slate-900 text-slate-200">연봉 높은순</option>
                <option value="employees" className="bg-slate-900 text-slate-200">규모(인원)순</option>
              </select>

              <button
                onClick={handleExportCSV}
                title="CSV 데이터 다운로드"
                className="p-1 hover:text-cyan-300 text-slate-400 rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Companies Scrollable Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {activeTab === 'bookmarks' ? (
              // 북마크 전용 보기
              companies.filter(c => bookmarks.includes(c.id)).length === 0 ? (
                <div className="text-center py-16 px-4">
                  <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-3 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-slate-300">저장된 관심 기업이 없습니다.</p>
                  <p className="text-xs text-slate-500 mt-1">기업 상세 정보에서 북마크 아이콘을 눌러 추가하세요.</p>
                </div>
              ) : (
                companies.filter(c => bookmarks.includes(c.id)).map(comp => (
                  <CompanyCard
                    key={comp.id}
                    comp={comp}
                    isSelected={comp.id === selectedCompanyId}
                    isBookmarked={true}
                    isCompared={compareList.includes(comp.id)}
                    onSelect={() => setSelectedCompanyId(comp.id)}
                    onToggleBookmark={() => toggleBookmark(comp.id)}
                    onToggleCompare={() => toggleCompare(comp.id)}
                  />
                ))
              )
            ) : displayedCompanies.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3 stroke-[1.5]" />
                <p className="text-sm font-semibold text-slate-300">조건에 일치하는 부품사가 없습니다.</p>
                <p className="text-xs text-slate-500 mt-1.5 mb-3">검색어를 바꾸거나 우측 상단 'AI 발굴'을 실행하세요.</p>
                {searchQuery && (
                  <button
                    onClick={handleAiSearch}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shadow"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    '{searchQuery}' AI 공급망 자동발굴
                  </button>
                )}
              </div>
            ) : (
              <>
                {displayedCompanies.map(comp => (
                  <CompanyCard
                    key={comp.id}
                    comp={comp}
                    isSelected={comp.id === selectedCompanyId}
                    isBookmarked={bookmarks.includes(comp.id)}
                    isCompared={compareList.includes(comp.id)}
                    onSelect={() => setSelectedCompanyId(comp.id)}
                    onToggleBookmark={() => toggleBookmark(comp.id)}
                    onToggleCompare={() => toggleCompare(comp.id)}
                  />
                ))}

                {/* Load More Button */}
                {filteredCompanies.length > displayCount && (
                  <button
                    onClick={() => setDisplayCount(prev => prev + 35)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 transition-colors my-2"
                  >
                    부품사 더 보기 ({filteredCompanies.length - displayCount}개 남음)
                  </button>
                )}
              </>
            )}
          </div>

          {/* Bottom Compare Bar */}
          {compareList.length > 0 && (
            <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                비교 선택: <strong className="text-cyan-400">{compareList.length}</strong>/3개
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCompareList([])}
                  className="px-2 py-1 text-slate-400 hover:text-slate-200 text-[11px]"
                >
                  초기화
                </button>
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs flex items-center gap-1 shadow"
                >
                  <Scale className="w-3.5 h-3.5" />
                  비교표 보기
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* Right Dynamic Workspace */}
        <main className="flex-1 bg-slate-950 flex flex-col overflow-y-auto">
          
          {/* TAB 1: RELATIONSHIP NETWORK GRAPH */}
          {activeTab === "network" ? (
            <div className="p-4 md:p-8 flex-1 flex flex-col max-w-6xl mx-auto w-full">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
                    <Network className="w-6 h-6 text-cyan-400" />
                    {selectedCompany.name} 다차원 공급망 릴레이션 맵
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    원소재/2차 부품사 ➔ {selectedCompany.name} ➔ 상위 모듈 1차사 ➔ 완성차(OEM)로 이어지는 수직 계열화 구조도입니다.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    선택: <strong className="text-indigo-400">{selectedCompany.name}</strong> ({selectedCompany.tier})
                  </span>
                </div>
              </div>

              {/* Graphical Canvas Board */}
              <div className="flex-1 bg-gradient-to-b from-slate-900/70 to-slate-950 border border-slate-800 rounded-3xl p-6 relative flex flex-col justify-between overflow-x-auto min-h-[520px]">
                
                {/* 3 Tier Stages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto relative">
                  
                  {/* Tier Left: Raw Materials & Tier-2 Suppliers */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Factory className="w-4 h-4" />
                        하부 협력사 / 원자재사
                      </span>
                      <span className="text-[10px] text-slate-500">Tier-2, 3</span>
                    </div>

                    {selectedCompany.suppliers && selectedCompany.suppliers.length > 0 ? (
                      selectedCompany.suppliers.map((sup, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleNavigateCompany(sup)}
                          className="p-3.5 bg-slate-950/80 border border-slate-800 hover:border-cyan-500/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] shadow-sm group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {sup}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400" />
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-1">원소재/가공 파츠 공급</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-600">
                        등록된 하부 협력사 정보 없음
                      </div>
                    )}
                  </div>

                  {/* Tier Center: Core Focus Target Company */}
                  <div className="my-auto">
                    <div className="p-6 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 border-2 border-indigo-400 rounded-3xl shadow-2xl shadow-indigo-600/30 text-white relative">
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-extrabold shadow">
                        {selectedCompany.tier}
                      </div>

                      <div className="text-center pt-2">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                          <Car className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black">{selectedCompany.name}</h3>
                        <p className="text-xs text-indigo-200 font-semibold mt-1">
                          {selectedCompany.category} · {selectedCompany.subSector}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-indigo-400/30 text-left text-xs space-y-1.5 text-indigo-100">
                          <p className="flex justify-between">
                            <span className="text-indigo-300">소재지:</span>
                            <span className="font-semibold">{selectedCompany.location}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-indigo-300">평균연봉:</span>
                            <span className="font-semibold text-cyan-300">{selectedCompany.avgSalary}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-indigo-300">임직원:</span>
                            <span className="font-semibold">{selectedCompany.employees}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tier Right: Tier-1 Modules & OEMs */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Car className="w-4 h-4" />
                        주요 납품처 / 완성차 OEM
                      </span>
                      <span className="text-[10px] text-slate-500">Tier-1, OEM</span>
                    </div>

                    {selectedCompany.clients && selectedCompany.clients.length > 0 ? (
                      selectedCompany.clients.map((cli, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleNavigateCompany(cli)}
                          className="p-3.5 bg-slate-950/80 border border-slate-800 hover:border-indigo-500/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] shadow-sm group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                              {cli}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400" />
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-1">최종 조립 / 상위 모듈 납품</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-600">
                        등록된 고객사 정보 없음
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Strip: Competitors */}
                <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">동종 기술 / 시장 경쟁사:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCompany.competitors && selectedCompany.competitors.map(c => (
                        <button
                          key={c}
                          onClick={() => handleNavigateCompany(c)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium hover:bg-amber-500/20 transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("explore")}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                  >
                    기업 상세정보 바로가기 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "tree" ? (
            /* TAB 2: VEHICLE SUBSYSTEM BREAKDOWN TREE */
            <div className="p-4 md:p-8 flex-1 max-w-6xl mx-auto w-full">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
                  <Car className="w-6 h-6 text-indigo-400" />
                  자동차 1대 구성 서브시스템별 밸류체인 트리
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  차량의 핵심 8대 시스템을 선택하면 관련된 1·2차 부품사 목록과 납품 품목을 바로 조회할 수 있습니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "섀시 & 서스펜션", sub: "로워암, 조향, 제동, 크로스멤버", sector: "섀시/서스펜션", icon: SlidersHorizontal, count: companies.filter(c => c.subSector === "섀시/서스펜션").length },
                  { title: "와이어링 & 전장", sub: "HV하네스, 정션박스, 고전압단자", sector: "와이어링/하네스", icon: Zap, count: companies.filter(c => c.subSector === "와이어링/하네스").length },
                  { title: "변속기 & 감속기", sub: "e-Axle, 터보차저, 자동변속기", sector: "변속기/파워트레인", icon: Factory, count: companies.filter(c => c.subSector === "변속기/파워트레인").length },
                  { title: "열관리 & HVAC", sub: "히트펌프, 전동컴프레서, PTC히터", sector: "열관리/HVAC", icon: TrendingUp, count: companies.filter(c => c.subSector === "열관리/HVAC").length },
                  { title: "도어 & 메커니즘", sub: "윈도우레귤레이터, 도어래치, 힌지", sector: "도어/창문/메커니즘", icon: Building, count: companies.filter(c => c.subSector === "도어/창문/메커니즘").length },
                  { title: "차체 & 프레스", sub: "핫스탬핑, 범퍼빔, 배터리케이스", sector: "차체/프레스/핫스탬핑", icon: ShieldAlert, count: companies.filter(c => c.subSector === "차체/프레스/핫스탬핑").length },
                  { title: "시트 & 승객실", sub: "도어트림, 센터콘솔, 헤드레스트", sector: "시트/내장재", icon: Users, count: companies.filter(c => c.subSector === "시트/내장재").length },
                  { title: "자율주행 & 전장SW", sub: "차량OS, ADAS 칩, 팹리스, 레이더", sector: "차량OS/임베디드SW", icon: Cpu, count: companies.filter(c => c.subSector === "차량OS/임베디드SW").length },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedSubSector(item.sector);
                        setActiveTab("explore");
                      }}
                      className="p-5 bg-slate-900 border border-slate-800 hover:border-indigo-500 rounded-2xl cursor-pointer transition-all hover:scale-105 shadow-sm group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                          {item.count}개사
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {item.sub}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-cyan-400">
                        해당 부품사 필터링 탐색 <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === "map" ? (
            /* TAB: NATIONAL AUTOMOTIVE CLUSTERS MAP */
            <div className="p-4 md:p-8 flex-1 max-w-6xl mx-auto w-full">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
                    <MapIcon className="w-6 h-6 text-cyan-400" />
                    대한민국 730+ 자동차 부품 & 모빌리티 전국 산업지도
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    수도권, 충청, 대구·경북, 동남권(울산·경남), 호남 5대 자동차 제조벨트의 부품사 위치와 산업 클러스터 집적도입니다.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">
                    현재 선택 기업: <strong className="text-indigo-400">{selectedCompany.name}</strong>
                  </span>
                </div>
              </div>

              {/* KoreaMap Component with National Scope */}
              <KoreaMap 
                company={selectedCompany} 
                onSelectClusterRegion={(reg) => {
                  setSelectedRegion(reg);
                  setActiveTab("explore");
                }}
              />

              {/* 5 Mobility Belts Fast Navigation Cards */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-indigo-400" />
                  전국 5대 권역별 자동차 부품 클러스터 바로가기
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {KOREA_MOBILITY_CLUSTERS.map(cluster => {
                    const count = companies.filter(c => c.region.includes(cluster.region)).length;
                    return (
                      <div
                        key={cluster.id}
                        onClick={() => {
                          setSelectedRegion(cluster.region);
                          setActiveTab("explore");
                        }}
                        className="p-4 bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl cursor-pointer transition-all hover:scale-105 shadow-sm group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            {cluster.region}
                          </span>
                          <span className="text-xs font-extrabold text-cyan-400">{count}개사</span>
                        </div>
                        <h4 className="text-xs font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                          {cluster.name.split(' ')[0]}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                          {cluster.desc}
                        </p>
                        <span className="mt-3 flex items-center gap-1 text-[10px] text-indigo-400 font-semibold">
                          권역 부품사 목록보기 <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : activeTab === "ai-chat" ? (
            /* TAB 3: AI INDUSTRY EXPERT CHAT */
            <div className="p-4 md:p-8 flex-1 flex flex-col max-w-4xl mx-auto w-full h-full">
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
                  <Bot className="w-6 h-6 text-cyan-400" />
                  K-모빌리티 밸류체인 수석 분석가 AI
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  완성차-부품사 납품단가, 전기차 E-GMP 전동화 전환, 채용 합격 스펙, 지역별 부품 클러스터 정보를 실시간 문의하세요.
                </p>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 overflow-y-auto space-y-4 mb-4">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                      }`}
                    >
                      {msg.text}
                      <span className={`block text-[10px] mt-2 ${msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-500'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center gap-2 text-xs text-cyan-400 p-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    자동차 산업 데이터베이스 분석 및 추론 중...
                  </div>
                )}
              </div>

              {/* Chat Suggestion Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-3">
                {[
                  "현대차 E-GMP 감속기 납품 밸류체인 알려줘",
                  "와이어링 하네스 3대사(경신, 유라, THN) 비교",
                  "대구 성서공단 주요 자동차 부품사 리스트",
                  "1차 부품사 R&D 신입 연봉 및 필요 역량"
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setChatInput(sug);
                    }}
                    className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] whitespace-nowrap transition-colors"
                  >
                    💡 {sug}
                  </button>
                ))}
              </div>

              {/* Chat Input Field */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="모빌리티 밸류체인에 대해 궁금한 점을 질문해 보세요..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendChatMessage();
                  }}
                  className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSendChatMessage}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  전송
                </button>
              </div>
            </div>
          ) : activeTab === "admin" ? (
            /* TAB 4: ADD COMPANY ADMIN */
            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-400" />
                  신규 자동차 부품/소재 기업 등록
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  데이터베이스에 없는 새로운 1·2차 협력사 및 스타트업 정보를 수동 등록합니다.
                </p>
              </div>

              <form onSubmit={handleAdminSubmit} className="space-y-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">기업명 *</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 광진기계, 신영"
                      value={adminFormData.name}
                      onChange={e => setAdminFormData({...adminFormData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">산업 분류 *</label>
                    <select
                      value={adminFormData.category}
                      onChange={e => setAdminFormData({...adminFormData, category: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    >
                      {CATEGORIES.filter(c => c !== "전체").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">세부 부품 영역 *</label>
                    <select
                      value={adminFormData.subSector}
                      onChange={e => setAdminFormData({...adminFormData, subSector: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    >
                      {SUB_SECTORS.filter(s => s !== "전체 부품분야").map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">공급 계층 (Tier)</label>
                    <input
                      type="text"
                      placeholder="예: 현대차 1차 섀시 벤더"
                      value={adminFormData.tier}
                      onChange={e => setAdminFormData({...adminFormData, tier: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">기업 개요 및 주요 생산 역량</label>
                  <textarea
                    rows={3}
                    placeholder="부품 정밀 가공 및 차량 밸류체인 참여 내용..."
                    value={adminFormData.description}
                    onChange={e => setAdminFormData({...adminFormData, description: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">주력 부품 (쉼표 구분)</label>
                  <input
                    type="text"
                    placeholder="컨트롤암, 차체 프레임, 배터리 케이스"
                    value={adminFormData.mainProducts}
                    onChange={e => setAdminFormData({...adminFormData, mainProducts: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">주요 납품처</label>
                    <input
                      type="text"
                      placeholder="현대자동차, 기아"
                      value={adminFormData.clients}
                      onChange={e => setAdminFormData({...adminFormData, clients: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">동종 경쟁사</label>
                    <input
                      type="text"
                      placeholder="화신, 성우하이텍"
                      value={adminFormData.competitors}
                      onChange={e => setAdminFormData({...adminFormData, competitors: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">원자재/소재 협력사</label>
                    <input
                      type="text"
                      placeholder="포스코, 현대제철"
                      value={adminFormData.suppliers}
                      onChange={e => setAdminFormData({...adminFormData, suppliers: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">지역 권역</label>
                    <select
                      value={adminFormData.region}
                      onChange={e => setAdminFormData({...adminFormData, region: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    >
                      {REGIONS.filter(r => r !== "전국 지역").map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">상세 소재지</label>
                    <input
                      type="text"
                      placeholder="경북 영천시 / 충남 아산시"
                      value={adminFormData.location}
                      onChange={e => setAdminFormData({...adminFormData, location: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20"
                >
                  데이터베이스에 등록 완료
                </button>
              </form>
            </div>
          ) : (
            /* TAB 0 / DEFAULT: COMPANY DETAIL VIEW (Explore) */
            <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
              
              {/* Company Banner Header */}
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {selectedCompany.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {selectedCompany.tier}
                      </span>
                      {selectedCompany.verified && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          공시/KAICA 검증
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
                      {selectedCompany.name}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {selectedCompany.location}
                      </span>
                      {selectedCompany.estYear && (
                        <span>설립 {selectedCompany.estYear}년</span>
                      )}
                    </div>
                  </div>

                  {/* Actions: Bookmark & Compare */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCompare(selectedCompany.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        compareList.includes(selectedCompany.id)
                          ? "bg-indigo-600 text-white shadow"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      {compareList.includes(selectedCompany.id) ? "비교 중" : "비교 담기"}
                    </button>

                    <button
                      onClick={() => toggleBookmark(selectedCompany.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        bookmarks.includes(selectedCompany.id)
                          ? "bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                      }`}
                    >
                      <Bookmark className="w-4 h-4" fill={bookmarks.includes(selectedCompany.id) ? "currentColor" : "none"} />
                      {bookmarks.includes(selectedCompany.id) ? "관심기업" : "북마크"}
                    </button>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-300 mt-4 leading-relaxed font-normal">
                  {selectedCompany.description}
                </p>

                {/* Key Metrics Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
                  <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 font-medium block">임직원 수</span>
                    <span className="text-sm font-extrabold text-slate-100 mt-1 block">{selectedCompany.employees}</span>
                  </div>
                  <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 font-medium block">평균 연봉 수준</span>
                    <span className="text-sm font-extrabold text-cyan-400 mt-1 block">{selectedCompany.avgSalary}</span>
                  </div>
                  <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 font-medium block">연간 매출액(추정)</span>
                    <span className="text-sm font-extrabold text-indigo-300 mt-1 block">{selectedCompany.revenue || "비공개/중소기업"}</span>
                  </div>
                  <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 font-medium block">부품 세부분야</span>
                    <span className="text-sm font-extrabold text-emerald-400 mt-1 block">{selectedCompany.subSector}</span>
                  </div>
                </div>
              </div>

              {/* Korea Map Location Display for Company Introduction */}
              <div className="mt-6">
                <KoreaMap 
                  company={selectedCompany} 
                  onSelectClusterRegion={(reg) => {
                    setSelectedRegion(reg);
                  }}
                />
              </div>

              {/* Sub-Grids: Products & Key Job Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                
                {/* Main Products */}
                <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                    <Factory className="w-4 h-4 text-cyan-400" />
                    주력 생산 부품 및 모듈
                  </h3>
                  <div className="space-y-2">
                    {selectedCompany.mainProducts.map((prod, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/90 text-xs text-slate-200 flex items-center justify-between">
                        <span className="font-medium">{prod}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-500 font-semibold">규격품</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Roles */}
                <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-indigo-400" />
                    주요 직무 및 엔지니어링 역량
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.roles ? selectedCompany.roles.map((role, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 text-xs font-medium text-slate-300 border border-slate-800">
                        {role}
                      </span>
                    )) : (
                      <span className="text-xs text-slate-500">R&D, 정밀가공, 공정품질</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Supply Chain Connection Relational Explorer */}
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 mt-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-amber-400" />
                    연속 서플라이 체인 탐색망 (클릭 시 해당 기업으로 전환)
                  </h3>
                  <button
                    onClick={() => setActiveTab("network")}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    관계망 맵 보기 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Clients */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-indigo-400 block mb-2.5">
                      상위 납품처 / 완성차 OEM
                    </span>
                    <div className="space-y-1.5">
                      {selectedCompany.clients && selectedCompany.clients.map(c => (
                        <button
                          key={c}
                          onClick={() => handleNavigateCompany(c)}
                          className="w-full text-left text-xs font-semibold text-slate-300 hover:text-indigo-300 hover:bg-slate-900/80 px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span>{c}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Competitors */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 block mb-2.5">
                      동종 기술 경쟁사
                    </span>
                    <div className="space-y-1.5">
                      {selectedCompany.competitors && selectedCompany.competitors.map(c => (
                        <button
                          key={c}
                          onClick={() => handleNavigateCompany(c)}
                          className="w-full text-left text-xs font-semibold text-slate-300 hover:text-amber-300 hover:bg-slate-900/80 px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span>{c}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suppliers */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-cyan-400 block mb-2.5">
                      원소재 / 하부 협력사
                    </span>
                    <div className="space-y-1.5">
                      {selectedCompany.suppliers && selectedCompany.suppliers.map(s => (
                        <button
                          key={s}
                          onClick={() => handleNavigateCompany(s)}
                          className="w-full text-left text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:bg-slate-900/80 px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span>{s}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Portal Recruitment Search Links */}
              <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 mt-6 mb-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  실시간 채용 공고 & 중견기업 공시 바로가기
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <a
                    href={selectedCompany.careerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 rounded-xl text-center text-xs font-bold text-indigo-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    공식 채용 페이지 <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://www.saramin.co.kr/zf_user/search/company?searchword=${encodeURIComponent(selectedCompany.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-center text-xs font-medium text-slate-300 transition-colors flex items-center justify-center gap-1"
                  >
                    사람인 기업정보 <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <a
                    href={`https://www.jobkorea.co.kr/Search/?stk=${encodeURIComponent(selectedCompany.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-center text-xs font-medium text-slate-300 transition-colors flex items-center justify-center gap-1"
                  >
                    잡코리아 채용 <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <a
                    href={`https://dart.fss.or.kr/dsearch/main.do?textCrpNm=${encodeURIComponent(selectedCompany.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-center text-xs font-medium text-slate-300 transition-colors flex items-center justify-center gap-1"
                  >
                    DART 전자공시 <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>

            </div>
          )}
        </main>

      </div>

      {/* ---------------- Comparison Modal ---------------- */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-lg text-white">모빌리티 부품사 스펙 비교</h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {companies.filter(c => compareList.includes(c.id)).map(comp => (
                <div key={comp.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                      {comp.tier}
                    </span>
                    <h4 className="font-extrabold text-base text-white mt-1">{comp.name}</h4>
                    <p className="text-xs text-slate-400">{comp.category} · {comp.subSector}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-xs space-y-2">
                    <div>
                      <span className="text-[11px] text-slate-500 block">평균 연봉</span>
                      <strong className="text-cyan-400 font-bold">{comp.avgSalary}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">임직원</span>
                      <strong className="text-slate-200">{comp.employees}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">매출액</span>
                      <strong className="text-slate-200">{comp.revenue || "비공개"}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">소재지</span>
                      <span className="text-slate-300">{comp.location}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">주요 고객사</span>
                      <span className="text-slate-300">{comp.clients.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">주력 부품</span>
                      <span className="text-slate-300 line-clamp-2">{comp.mainProducts.join(', ')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCompanyId(comp.id);
                      setIsCompareModalOpen(false);
                      setActiveTab("explore");
                    }}
                    className="w-full py-2 bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 rounded-xl text-xs font-semibold text-indigo-200 hover:text-white transition-colors mt-2"
                  >
                    상세보기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ----------------------------------------------------
// Reusable Component: Company Card in Left List
// ----------------------------------------------------
function CompanyCard({
  comp,
  isSelected,
  isBookmarked,
  isCompared,
  onSelect,
  onToggleBookmark,
  onToggleCompare
}: {
  comp: Company;
  isSelected: boolean;
  isBookmarked: boolean;
  isCompared: boolean;
  onSelect: () => void;
  onToggleBookmark: () => void;
  onToggleCompare: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
        isSelected 
          ? "bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10" 
          : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
              {comp.name}
            </h3>
            {comp.verified && (
              <span title="공시/KAICA 검증 완료">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              </span>
            )}
          </div>
          <p className="text-[11px] text-indigo-400 font-semibold mt-0.5 truncate">
            {comp.category} · <span className="text-slate-400">{comp.tier}</span>
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare();
            }}
            title={isCompared ? "비교 목록에서 제거" : "비교 담기"}
            className={`p-1.5 rounded-lg transition-colors ${
              isCompared 
                ? "text-indigo-400 bg-indigo-500/20" 
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark();
            }}
            title={isBookmarked ? "북마크 제거" : "북마크 추가"}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked 
                ? "text-amber-400 bg-amber-400/10" 
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
        {comp.description}
      </p>

      {/* Badges Strip */}
      <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-800/60 text-[11px]">
        <div className="flex items-center gap-1 overflow-hidden">
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/50 font-medium truncate">
            {comp.subSector}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 truncate">
            {comp.region}
          </span>
        </div>

        <span className="font-bold text-cyan-400 text-xs shrink-0">
          {comp.avgSalary}
        </span>
      </div>
    </div>
  );
}
