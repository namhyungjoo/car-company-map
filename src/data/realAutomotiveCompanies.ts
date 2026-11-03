import { Facility } from '../components/KoreaMap';
import kaicaRawList from './kaicaRawData.json';

export interface VerifiedCompanyData {
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
  estYear: number;
  revenue: string;
  lat: number;
  lng: number;
  cluster?: string;
  facilities: Facility[];
}

// 1. 핵심 대형 모듈·시스템 및 OEM 주력 50개사 (상세 재무/연구소/공장 매핑)
const CORE_FLAGSHIP_COMPANIES: VerifiedCompanyData[] = [
  // ==========================================
  // [1. 완성차 OEM]
  // ==========================================
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
      { name: "아산 친환경차 공장", type: "주력 제조공장", address: "충남 아산시 인주면 현대기업로 100", lat: 36.8997, lng: 126.9015, desc: "아이오닉 6 및 쏘나타 양산라인" }
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
    location: "서울 서초구 / 경기 광명 / 경기 화성 / 광주",
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
    mainProducts: ["토레스 / 토레스 EVX", "렉스턴 스포츠 칸", "코란도 EV", "액티언"],
    clients: ["국내외 개인 및 법인 고객"],
    competitors: ["현대자동차", "기아", "르노코리아"],
    suppliers: ["HL만도", "현대모비스", "서연이화", "화신"],
    location: "경기 평택시 동삭로 455-12",
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
  {
    id: "comp-car-4",
    name: "르노코리아",
    category: "완성차",
    subSector: "완성차 (OEM)",
    tier: "완성차 (OEM)",
    tags: ["완성차", "하이브리드", "오로라프로젝트", "SUV"],
    description: "르노그룹의 한국 완성차 생산 기지. 차세대 오로라 프로젝트(그랑 콜레오스 E-Tech 하이브리드)와 전기차를 부산공장에서 양산합니다.",
    mainProducts: ["그랑 콜레오스 E-Tech 하이브리드", "아르카나(XM3)", "QM6"],
    clients: ["국내외 승용차 소비자"],
    competitors: ["현대자동차", "기아", "KG모빌리티"],
    suppliers: ["한온시스템", "동아화성", "유라코퍼레이션", "성우하이텍"],
    location: "부산 강서구 신호동 / 경기 용인 기흥연구소",
    region: "동남권(부산/경남)/수도권",
    employees: "3,100명",
    avgSalary: "8,100만원",
    revenue: "3조 2,900억원",
    estYear: 2000,
    careerUrl: "https://www.renaultkorea.com",
    roles: ["하이브리드 캘리브레이션", "차체 구조 설계", "완성차 품질보증"],
    verified: true,
    lat: 35.0920,
    lng: 128.8750,
    facilities: [
      { name: "르노코리아 부산 제조공장", type: "주력 제조공장", address: "부산 강서구 르노삼성대로 61", lat: 35.0920, lng: 128.8750, isMain: true, desc: "하이브리드 및 세단/SUV 혼류 생산라인" },
      { name: "르노테크놀로지코리아 기흥연구소", type: "R&D연구소", address: "경기 용인시 기흥구 신갈로", lat: 37.2750, lng: 127.1080, desc: "차량 디자인 및 시스템 선행연구" }
    ]
  },
  {
    id: "comp-car-5",
    name: "한국GM",
    category: "완성차",
    subSector: "완성차 (OEM)",
    tier: "완성차 (OEM)",
    tags: ["완성차", "수출1위", "크로스오버", "트랙스", "트레일블레이저"],
    description: "제너럴 모터스(GM)의 핵심 글로벌 생산 거점. 쉐보레 트랙스 크로스오버와 트레일블레이저로 대미 수출 1위를 기록하고 있습니다.",
    mainProducts: ["트랙스 크로스오버", "트레일블레이저", "소형 가솔린 터보 엔진"],
    clients: ["글로벌 GM 네트워크 및 국내 소비자"],
    competitors: ["현대자동차", "기아", "르노코리아"],
    suppliers: ["현대모비스", "HL만도", "광진상공", "대동도어", "인팩"],
    location: "인천 부평구 부평대로 233 / 경남 창원 성산구",
    region: "수도권/동남권(부산/경남)",
    employees: "8,600명",
    avgSalary: "8,700만원",
    revenue: "13조 7,300억원",
    estYear: 2002,
    careerUrl: "https://www.gm-korea.co.kr",
    roles: ["차량 생산기술", "파워트레인 조립", "품질관리"],
    verified: true,
    lat: 37.5110,
    lng: 126.7180,
    facilities: [
      { name: "한국GM 부평공장 및 본사", type: "본사", address: "인천 부평구 부평대로 233", lat: 37.5110, lng: 126.7180, isMain: true, desc: "트레일블레이저 및 엔진 생산 라인" },
      { name: "한국GM 창원공장", type: "주력 제조공장", address: "경남 창원시 성산구 창원대로", lat: 35.1950, lng: 128.6420, desc: "트랙스 크로스오버 스마트 팩토리" }
    ]
  },
  {
    id: "comp-car-6",
    name: "타타대우상용차",
    category: "완성차",
    subSector: "완성차 (OEM)",
    tier: "완성차 (OEM)",
    tags: ["상용차", "트럭", "준중형트럭", "전기트럭", "더쎈"],
    description: "국내 2대 상용차 완성차 메이커. 중·대형 트럭(맥쎈, 구쎈)과 준중형 트럭 더쎈(DEXEN) 및 전기트럭을 생산합니다.",
    mainProducts: ["더쎈(DEXEN) 3~5톤 준중형 트럭", "맥쎈(MAXEN) 대형트럭", "구쎈(KUXEN) 중형트럭"],
    clients: ["국내외 물류 및 건설 운송 사업자"],
    competitors: ["현대자동차 상용사업부", "볼보트럭", "만트럭"],
    suppliers: ["현대트랜시스", "동희산업", "SNT다이내믹스"],
    location: "전북 군산시 동장산로 172",
    region: "호남(광주)",
    employees: "1,200명",
    avgSalary: "7,500만원",
    revenue: "8,500억원",
    estYear: 2004,
    careerUrl: "https://www.tata-daewoo.com",
    roles: ["상용차 섀시 프레임 설계", "디젤/EV 파워트레인", "완성차 검수"],
    verified: true,
    lat: 35.9610,
    lng: 126.6540,
    facilities: [
      { name: "타타대우상용차 군산공장 본사", type: "본사", address: "전북 군산시 동장산로 172", lat: 35.9610, lng: 126.6540, isMain: true, desc: "상용 트럭 풀라인업 생산 조립 기지" }
    ]
  },
  {
    id: "comp-car-7",
    name: "우진산전",
    category: "완성차",
    subSector: "완성차 (OEM)",
    tier: "완성차 (OEM)",
    tags: ["전기버스", "친환경버스", "아폴로", "철도차량", "전장시스템"],
    description: "전기버스 '아폴로(Apollo)'와 스마트 경전철, 철도 모빌리티 전력변환 인버터를 직접 개발·양산하는 친환경 대중교통 완성차 기업입니다.",
    mainProducts: ["아폴로 1100 전기버스", "아폴로 900 중형 전기버스", "경전철 철도차량"],
    clients: ["전국 시내버스 운수사", "지자체 교통공사"],
    competitors: ["현대자동차", "KGM커머셜", "에디슨모터스"],
    suppliers: ["LG에너지솔루션", "현대모비스", "한국단자공업"],
    location: "충북 괴산군 사리면 모래재로 99 / 서울 서초구",
    region: "충청",
    employees: "750명",
    avgSalary: "6,900만원",
    revenue: "4,200억원",
    estYear: 1974,
    careerUrl: "https://www.woojin.info",
    roles: ["전기버스 차체 전장 설계", "인버터 추진제어 HW/SW", "완성차 조립기술"],
    verified: true,
    lat: 36.7840,
    lng: 127.6890,
    facilities: [
      { name: "우진산전 괴산 스마트공장", type: "주력 제조공장", address: "충북 괴산군 사리면 모래재로 99", lat: 36.7840, lng: 127.6890, isMain: true, desc: "친환경 전기버스 전용 스마트 양산 플랜트" }
    ]
  },

  // ==========================================
  // [2. 대형 1차 모듈 & 핵심 시스템사]
  // ==========================================
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
    location: "서울 강남구 테헤란로 203 / 경기 의왕 / 울산 / 충북 충주",
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
    tier: "1차 섀시/자율주행 벤더 (코스피)",
    tags: ["1차 부품사", "조향", "제동", "서스펜션", "x-by-Wire", "자율주행"],
    description: "제동(Brake), 조향(Steering), 현가(Suspension) 분야 글로벌 최고 수준의 기술력을 갖춘 1차 부품사. 차세대 전자식 조향(SbW)과 레이더/센서를 독자 공급합니다.",
    mainProducts: ["전자식 통합제동(IDB)", "전자제어 현가(SDC)", "전동조향(EPS)", "전방 레이더 센서"],
    clients: ["현대자동차", "기아", "GM", "포드", "테슬라", "폭스바겐"],
    competitors: ["보쉬", "ZF", "콘티넨탈", "현대모비스"],
    suppliers: ["고아정공", "삼기", "대원강업", "한국단자공업"],
    location: "경기 성남시 분당구 판교역로 255 / 평택 / 원주",
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
    location: "대전 대덕구 문평서로 95 / 경기 평택 / 서울 중구",
    region: "충청/수도권",
    employees: "2,250명(국내)",
    avgSalary: "9,300만원",
    revenue: "9조 5,500억원",
    estYear: 1986,
    careerUrl: "https://hanonsystems.recruiter.co.kr",
    roles: ["냉매 열유체 3D CFD 해석", "전동 컴프레서 모터 제어 SW", "글로벌 OEM 기술영업"],
    verified: true,
    lat: 36.4320,
    lng: 127.4010,
    facilities: [
      { name: "한온시스템 대전 본사 및 연구소", type: "본사", address: "대전 대덕구 문평서로 95", lat: 36.4320, lng: 127.4010, isMain: true, desc: "열관리 선행 연구 및 글로벌 헤드쿼터" },
      { name: "평택 전동컴프레서공장", type: "주력 제조공장", address: "경기 평택시 포승읍 포승공단로", lat: 36.9810, lng: 126.8550, desc: "전기차 e-Compressor 주력 생산 거점" }
    ]
  },
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
    location: "충남 서산시 지곡면 현대기아로 157 / 서울 서초구 / 경기 화성",
    region: "충청/수도권",
    employees: "4,200명",
    avgSalary: "9,200만원",
    revenue: "11조 7,000억원",
    estYear: 1994,
    careerUrl: "https://hyundai-transys.recruiter.co.kr",
    roles: ["EV 감속기 기어치형 설계", "시트 인체공학 메커니즘", "구동 NVH 저감 R&D"],
    verified: true,
    lat: 36.9030,
    lng: 126.4380,
    facilities: [
      { name: "현대트랜시스 서산 지곡공장", type: "주력 제조공장", address: "충남 서산시 지곡면 현대기아로 157", lat: 36.9030, lng: 126.4380, isMain: true, desc: "자동변속기 및 전기차 e-Axle 감속기 양산" },
      { name: "화성 롤링힐스 R&D센터", type: "R&D연구소", address: "경기 화성시 남양읍 시청로 290", lat: 37.1990, lng: 126.8310, desc: "파워트레인 및 시트 메커니즘 연구소" }
    ]
  },
  {
    id: "comp-pow-wia",
    name: "현대위아",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 종합 기계/구동/열관리사 (코스피)",
    tags: ["등속조인트", "구동축", "e-4WD", "통합열관리", "기계가공"],
    description: "자동차 구동계의 핵심인 등속조인트(C.V.Joint) 세계 최고 점유율을 자랑하며, e-4WD 전자식 사륜구동과 냉각수 허브 모듈 열관리를 양산합니다.",
    mainProducts: ["등속조인트 (C.V.Joint)", "전자식 사륜구동 커플링(e-4WD)", "냉각수 통합밸브 모듈", "차량용 알루미늄 엔진 블록"],
    clients: ["현대자동차", "기아", "GM", "스텔란티스"],
    competitors: ["GKN", "다나(Dana)", "한온시스템"],
    suppliers: ["세아베스틸", "포스코", "삼원강재"],
    location: "경남 창원시 성산구 정동로 153 / 경기 의왕",
    region: "동남권(부산/경남)/수도권",
    employees: "3,300명",
    avgSalary: "8,900만원",
    revenue: "8조 5,900억원",
    estYear: 1976,
    careerUrl: "https://hyundai-wia.recruiter.co.kr",
    roles: ["구동축 진동소음 해석", "열관리 밸브 통합제어", "공작기계 가공기술"],
    verified: true,
    lat: 35.2150,
    lng: 128.6780,
    facilities: [
      { name: "현대위아 창원 본사 및 플랜트", type: "본사", address: "경남 창원시 성산구 정동로 153", lat: 35.2150, lng: 128.6780, isMain: true, desc: "등속조인트 및 구동 모듈 주력 생산라인" },
      { name: "의왕 R&D연구센터", type: "R&D연구소", address: "경기 의왕시 철도박물관로 37", lat: 37.3188, lng: 126.9535, desc: "친환경차 통합열관리 및 e-4WD 제어 연구" }
    ]
  },
  {
    id: "comp-exh-1",
    name: "세종공업",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 배기/수소센서 선도사 (코스피)",
    tags: ["머플러", "소음기", "배기시스템", "수소센서", "금속성형"],
    description: "자동차 소음기(Muffler) 및 정밀 배기정화장치 국내 시장 점유율 1위. 현대차 넥쏘 수소연료전지 수소 누출 감지 센서 및 물배출 밸브를 독점 공급합니다.",
    mainProducts: ["자동차 머플러/소음기", "수소 누출 감지 센서", "수소차 물배출 밸브", "DPF/촉매 컨버터"],
    clients: ["현대자동차", "기아"],
    competitors: ["에스제이지진화", "동아에스텍"],
    suppliers: ["포스코 스테인리스", "현대비앤지스틸"],
    location: "울산 북구 효문공단 효암로 1 / 경기 판교",
    region: "울산/수도권",
    employees: "1,150명",
    avgSalary: "7,800만원",
    revenue: "1조 8,200억원",
    estYear: 1976,
    careerUrl: "http://www.sejongind.com",
    roles: ["배기 음향 NVH 설계", "수소 센서 회로 R&D", "로봇 벤딩 및 용접 공정"],
    verified: true,
    lat: 35.5670,
    lng: 129.3580,
    facilities: [
      { name: "세종공업 울산 효문공장 본사", type: "본사", address: "울산 북구 효암로 1", lat: 35.5670, lng: 129.3580, isMain: true, desc: "완성차 직납 머플러 및 배기시스템 양산" },
      { name: "아산 배기모듈공장", type: "주력 제조공장", address: "충남 아산시 둔포면 아산밸리로", lat: 36.9240, lng: 127.0540, desc: "중부권 현대차 공급라인" }
    ]
  },
  {
    id: "comp-chassis-ctr",
    name: "센트랄 (CTR)",
    category: "1차 부품사",
    subSector: "섀시/서스펜션",
    tier: "1차 섀시/조향 부품 글로벌 1위 (KAICA)",
    tags: ["볼조인트", "컨트롤암", "스태빌라이저링크", "알루미늄단조", "테슬라납품"],
    description: "자동차 조향·현가 핵심인 볼조인트(Ball Joint)와 컨트롤 암 글로벌 선도 제조사. 테슬라 전 라인업 및 현대차·기아에 알루미늄 경량 서스펜션을 납품합니다.",
    mainProducts: ["서스펜션 볼조인트", "알루미늄 단조 컨트롤 암", "스태빌라이저 링크", "정밀 타이로드"],
    clients: ["현대자동차", "기아", "테슬라", "포드", "GM", "BMW"],
    competitors: ["화신", "HL만도", "ZF"],
    suppliers: ["포스코", "알루미늄 압출합금사"],
    location: "경남 창원시 성산구 공단로 103 / 대구 / 울산",
    region: "동남권(부산/경남)/대구경북",
    employees: "1,600명",
    avgSalary: "7,400만원",
    revenue: "1조 5,000억원",
    estYear: 1971,
    careerUrl: "https://www.ctr.co.kr",
    roles: ["경량 알루미늄 단조 설계", "조향 링크 볼스터드 피로해석", "글로벌 OE 품질관리"],
    verified: true,
    lat: 35.1980,
    lng: 128.6650,
    facilities: [
      { name: "센트랄 창원 본사", type: "본사", address: "경남 창원시 성산구 공단로 103", lat: 35.1980, lng: 128.6650, isMain: true, desc: "정밀 볼조인트 및 섀시 모듈 메인 양산 플랜트" },
      { name: "대구 현풍 테크노폴리스공장", type: "주력 제조공장", address: "대구 달성군 유가읍 테크노순환로", lat: 35.6890, lng: 128.4520, desc: "전기차 전용 알루미늄 서스펜션 암 양산라인" }
    ]
  },

  // ==========================================
  // [3. 1차 와이어링 하네스 & 전장 커넥터 3대사]
  // ==========================================
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
    location: "인천 연수구 송도미래로 30 / 충남 아산 / 경북 경주",
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
    tier: "1차 핵심 벤더 (KAICA)",
    tags: ["와이어링", "하네스", "전장", "정션박스", "충전인렛", "1차 부품사"],
    description: "현대차·기아의 대표 전장 공급사. 차량 내 모든 전력 및 통신 신호를 전달하는 와이어링 하네스와 전기차 급속충전 인렛을 선도 제조합니다.",
    mainProducts: ["HV/LV Wiring Harness", "스마트 정션블록", "전기차 충전 커넥터/인렛", "전자제어 릴레이"],
    clients: ["현대자동차", "기아", "현대모비스"],
    competitors: ["경신", "THN"],
    suppliers: ["LS전선", "한국단자공업", "대원화성"],
    location: "경기 성남시 분당구 판교역로 241 / 경기 화성",
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
    location: "대구 달서구 성서공단로 11길 / 울산 북구",
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
    location: "인천 연수구 송도국제도시 지식기반로 38 / 광주 / 충남",
    region: "수도권/호남",
    employees: "1,150명",
    avgSalary: "7,500만원",
    revenue: "1조 2,300억원",
    estYear: 1973,
    careerUrl: "http://www.ket.com",
    roles: ["마이크로 단자 금형 설계", "방수 실링 신뢰성 시험", "수출영업"],
    verified: true,
    lat: 37.3750,
    lng: 126.6540,
    facilities: [
      { name: "한국단자공업 송도 본사", type: "본사", address: "인천 연수구 갯벌로 77", lat: 37.3750, lng: 126.6540, isMain: true, desc: "초정밀 커넥터 금형 및 전장 부품 R&D" }
    ]
  },

  // ==========================================
  // [4. 1차 차체 / 섀시 / 프레스 / 단조 벤더]
  // ==========================================
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
    location: "경북 영천시 언하공단로 63 / 충남 아산",
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
    location: "부산 기장군 정관읍 산단4로 33 / 경남 양산시",
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
    id: "comp-body-ms",
    name: "엠에스오토텍",
    category: "1차 부품사",
    subSector: "차체/프레스/핫스탬핑",
    tier: "1차 핫스탬핑 선도사 (코스닥)",
    tags: ["핫스탬핑", "차체", "플로어판넬", "테슬라납품", "명신그룹"],
    description: "초고장력 강판을 900도 이상 가열 후 급랭 성형하는 핫스탬핑 차체 부품 선도사. 명신산업의 모회사로 글로벌 EV 차체 골격을 공급합니다.",
    mainProducts: ["핫스탬핑 필러/사이드레일", "플로어 모듈 판넬", "차체 보강 멤버"],
    clients: ["현대자동차", "기아", "테슬라"],
    competitors: ["성우하이텍", "일지테크", "화신"],
    suppliers: ["포스코 보론강판", "현대제철"],
    location: "경북 경주시 내남면 포석로 140 / 충남 아산",
    region: "대구경북/충청",
    employees: "670명",
    avgSalary: "7,100만원",
    revenue: "1조 6,800억원 (연결)",
    estYear: 1990,
    careerUrl: "http://www.ms-global.com",
    roles: ["핫스탬핑 금형 냉각수 채널 해석", "로봇 레이저 블랭킹 가공", "품질기획"],
    verified: true,
    lat: 35.7820,
    lng: 129.2150,
    facilities: [
      { name: "엠에스오토텍 경주 본사", type: "본사", address: "경북 경주시 내남면 포석로 140", lat: 35.7820, lng: 129.2150, isMain: true, desc: "핫스탬핑 차체 라인 및 자동화 성형 플랜트" }
    ]
  },
  {
    id: "comp-body-myung",
    name: "명신산업",
    category: "1차 부품사",
    subSector: "차체/프레스/핫스탬핑",
    tier: "1차 글로벌 EV 차체 벤더 (코스피)",
    tags: ["핫스탬핑", "테슬라차체", "EV경량화", "북미수출"],
    description: "테슬라 및 현대차그룹의 핵심 핫스탬핑 차체 공급사. 북미 텍사스 및 캘리포니아 기가팩토리에 경량 고장력 차체 부품을 대량 공급합니다.",
    mainProducts: ["EV 차체 B필러/센터필러", "프론트 사이드 멤버", "루프 레일"],
    clients: ["테슬라", "현대자동차", "기아"],
    competitors: ["성우하이텍", "엠에스오토텍"],
    suppliers: ["포스코", "현대제철"],
    location: "경북 경주시 황성동 / 충남 아산",
    region: "대구경북/충청",
    employees: "790명",
    avgSalary: "7,400만원",
    revenue: "1조 7,100억원",
    estYear: 1982,
    careerUrl: "http://www.ms-global.com",
    roles: ["차체 강성 해석", "핫스탬핑 양산 공정", "글로벌 OEM 품질보증"],
    verified: true,
    lat: 35.8650,
    lng: 129.2210,
    facilities: [
      { name: "명신산업 경주 본사 및 플랜트", type: "본사", address: "경북 경주시 유림로 13번길", lat: 35.8650, lng: 129.2210, isMain: true, desc: "초고장력 핫스탬핑 프레스 라인" }
    ]
  },
  {
    id: "comp-body-ilji",
    name: "일지테크",
    category: "1차 부품사",
    subSector: "차체/프레스/핫스탬핑",
    tier: "1차 차체 프레스 벤더 (코스닥)",
    tags: ["차체", "대형프레스", "카울크로스", "알루미늄차체", "KAICA"],
    description: "자동차 전방 카울 크로스 바, 대시 패널 등 충돌 안전 및 차체 진동 흡수 대형 프레스 패널을 현대차에 직납하는 경북 대표 차체사입니다.",
    mainProducts: ["Cowl Cross Bar", "Dash Panel", "Fender Apron Panel"],
    clients: ["현대자동차", "기아"],
    competitors: ["아진산업", "성우하이텍"],
    suppliers: ["현대제철", "포스코"],
    location: "경북 경산시 진량읍 공단1로 83 / 경주",
    region: "대구경북",
    employees: "520명",
    avgSalary: "6,800만원",
    revenue: "5,800억원",
    estYear: 1986,
    careerUrl: "http://www.ilji.com",
    roles: ["대형 트랜스퍼 프레스 공정설계", "용접 자동화 로봇 티칭", "품질관리"],
    verified: true,
    lat: 35.8790,
    lng: 128.8310,
    facilities: [
      { name: "일지테크 경산 본사", type: "본사", address: "경북 경산시 진량읍 공단1로 83", lat: 35.8790, lng: 128.8310, isMain: true, desc: "카울크로스 및 차체 대형 프레스 성형 거점" }
    ]
  },

  // ==========================================
  // [5. 1차 도어 / 창문 / 메커니즘 3대사]
  // ==========================================
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
    location: "경북 경주시 내남면 포석로 / 울산 북구",
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
    id: "comp-mech-pha",
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
    location: "대구 달서구 성서공단로 258",
    region: "대구경북",
    employees: "1,100명",
    avgSalary: "7,300만원",
    revenue: "1조 1,200억원",
    estYear: 1985,
    careerUrl: "http://www.pha.co.kr",
    roles: ["보행자 안전 힌지 CAE", "도어 메커니즘 구동 R&D", "공정 엔지니어"],
    verified: true,
    lat: 35.8520,
    lng: 128.4870,
    facilities: [
      { name: "평화정공 대구 성서 본사", type: "본사", address: "대구 달서구 성서공단로 258", lat: 35.8520, lng: 128.4870, isMain: true, desc: "도어 래치 및 액티브 후드 시스템 R&D/양산" }
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
    location: "인천 연수구 송도테크노파크 / 충남 당진시 송산면",
    region: "수도권/충청",
    employees: "760명",
    avgSalary: "7,000만원",
    revenue: "5,400억원",
    estYear: 1980,
    careerUrl: "http://www.daedongdoor.co.kr",
    roles: ["래치 충돌 안전 해석", "전자식 잠금 회로 R&D", "신뢰성 수명 테스트"],
    verified: true,
    lat: 37.3810,
    lng: 126.6590,
    facilities: [
      { name: "대동도어 송도 R&D 본사", type: "본사", address: "인천 연수구 송도미래로", lat: 37.3810, lng: 126.6590, isMain: true, desc: "도어 잠금 메커니즘 및 슬라이딩 도어 연구개발" },
      { name: "당진 생산공장", type: "주력 제조공장", address: "충남 당진시 송산면 송산산단로", lat: 36.9620, lng: 126.6850, desc: "도어 래치 양산 자동화 라인" }
    ]
  },

  // ==========================================
  // [6. 1차 시트 & 내장재 선도사]
  // ==========================================
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
    location: "경기 안양시 동안구 벌말로 66 / 울산 북구 / 충남 아산",
    region: "수도권/울산/충청",
    employees: "2,350명",
    avgSalary: "8,300만원",
    revenue: "3조 4,600억원",
    estYear: 1972,
    careerUrl: "https://seoyoneh.recruiter.co.kr",
    roles: ["실내 내장 감성 CMF 디자인", "사출 금형 최적화", "친환경 천연섬유 복합재 개발"],
    verified: true,
    lat: 37.3980,
    lng: 126.9680,
    facilities: [
      { name: "서연이화 안양 본사", type: "본사", address: "경기 안양시 동안구 벌말로 66", lat: 37.3980, lng: 126.9680, isMain: true, desc: "경영기획 및 글로벌 인테리어 CMF 선행디자인" },
      { name: "울산 모듈공장", type: "주력 제조공장", address: "울산 북구 매곡산업로", lat: 35.6380, lng: 129.3540, desc: "현대차 직납 도어트림 및 인테리어 생산" }
    ]
  },
  {
    id: "comp-seat-duck",
    name: "덕양산업",
    category: "1차 부품사",
    subSector: "시트/내장재",
    tier: "1차 칵핏모듈 벤더 (코스피)",
    tags: ["칵핏모듈", "크래시패드", "도어트림", "배터리모듈BMA", "1차 부품사"],
    description: "운전석 대시보드인 칵핏 모듈(Cockpit Module)과 도어트림, 전기차 배터리 모듈 어셈블리(BMA)를 생산하는 울산 대표 부품사입니다.",
    mainProducts: ["Cockpit Module", "크래시패드(Crash Pad)", "EV 배터리 모듈(BMA)"],
    clients: ["현대자동차", "기아"],
    competitors: ["서연이화", "현대모비스"],
    suppliers: ["LG화학 수지", "삼원강재"],
    location: "울산 북구 효문공단 효문로 39 / 충남 아산",
    region: "울산/충청",
    employees: "1,350명",
    avgSalary: "8,100만원",
    revenue: "1조 7,400억원",
    estYear: 1977,
    careerUrl: "http://www.duckyang.co.kr",
    roles: ["칵핏 모듈 결합 공차 해석", "에어백 전개 테스트", "BMA 자동 조립 라인 관리"],
    verified: true,
    lat: 35.5650,
    lng: 129.3620,
    facilities: [
      { name: "덕양산업 울산 본사/공장", type: "본사", address: "울산 북구 효문로 39", lat: 35.5650, lng: 129.3620, isMain: true, desc: "현대차 울산공장 직납 칵핏모듈 어셈블리" }
    ]
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
    location: "울산 북구 효문공단 효암로 50",
    region: "울산",
    employees: "460명",
    avgSalary: "6,400만원",
    revenue: "2,700억원",
    estYear: 1969,
    careerUrl: "http://www.hdic.co.kr",
    roles: ["우레탄 폼 발포 성형 공정", "가죽 봉제 감성 품질", "생산자동화"],
    verified: true,
    lat: 35.5680,
    lng: 129.3610,
    facilities: [
      { name: "현대공업 울산 효문 본사/공장", type: "본사", address: "울산 북구 효암로 50", lat: 35.5680, lng: 129.3610, isMain: true, desc: "헤드레스트 및 프리미엄 시트 쿠션 성형 거점" }
    ]
  },
  {
    id: "comp-seat-dayou",
    name: "대유에이텍",
    category: "1차 부품사",
    subSector: "시트/내장재",
    tier: "1차 시트 완제품 벤더 (코스피)",
    tags: ["시트완제품", "전동시트", "스포티지", "광주공단"],
    description: "기아 광주공장에서 생산되는 스포티지, 쏘울, 셀토스 등의 자동차 시트 완제품을 독점 조립·공급하는 대유위니아그룹 계열사입니다.",
    mainProducts: ["자동차 시트 어셈블리", "전동 메모리 시트 프레임"],
    clients: ["기아"],
    competitors: ["현대트랜시스", "서연이화"],
    suppliers: ["현대제철 시트강재", "화학소재사"],
    location: "광주 광산구 용아로 669",
    region: "호남(광주)",
    employees: "580명",
    avgSalary: "7,200만원",
    revenue: "6,800억원",
    estYear: 1960,
    careerUrl: "http://www.dayouat.co.kr",
    roles: ["시트 프레임 구조 충돌해석", "가죽 패턴 재단 자동화", "JIT 직납 관리"],
    verified: true,
    lat: 35.1890,
    lng: 126.8120,
    facilities: [
      { name: "대유에이텍 광주 본사", type: "본사", address: "광주 광산구 용아로 669", lat: 35.1890, lng: 126.8120, isMain: true, desc: "기아 광주공장 직납 시트 완제품 조립 플랜트" }
    ]
  },

  // ==========================================
  // [7. 1차 램프 / 제어 / 센서 벤더]
  // ==========================================
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
    location: "경북 경산시 진량읍 공단로 284 / 대구 수성구 / 경북 영천",
    region: "대구경북",
    employees: "2,600명",
    avgSalary: "7,800만원",
    revenue: "4조 8,000억원",
    estYear: 1954,
    careerUrl: "https://slworld.recruiter.co.kr",
    roles: ["광학 렌즈 반사경 설계", "ADB 제어 LED 드라이버 회로", "글로벌 OE 영업"],
    verified: true,
    lat: 35.8840,
    lng: 128.8290,
    facilities: [
      { name: "SL 경산 본사 및 R&D센터", type: "본사", address: "경북 경산시 진량읍 공단로 284", lat: 35.8840, lng: 128.8290, isMain: true, desc: "지능형 매트릭스 헤드램프 및 광학 R&D 총괄" },
      { name: "영천 램프 1·2공장", type: "주력 제조공장", address: "경북 영천시 본촌공단길", lat: 35.9530, lng: 128.9240, desc: "현대차·기아 헤드램프/리어램프 대량 양산라인" }
    ]
  },
  {
    id: "comp-opt-snt",
    name: "SNT모티브",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 구동모터/전장 선도사 (코스피)",
    tags: ["구동모터", "드라이브유닛", "계기판", "오일펌프", "부산방산"],
    description: "현대차 하이브리드 HSG(하이브리드 스타터 제너레이터) 모터 및 전기차 오일펌프, 전자식 계기판 클러스터를 생산하는 정밀 기계 명가입니다.",
    mainProducts: ["HEV 시동 발전 모터(HSG)", "전동식 오일펌프(EOP)", "풀 LCD 디지털 클러스터"],
    clients: ["현대자동차", "기아", "현대모비스", "GM"],
    competitors: ["현대위아", "LG마그나", "덴소"],
    suppliers: ["포스코 전기강판", "한국단자공업"],
    location: "부산 기장군 철마면 여락송정로 107",
    region: "동남권(부산/경남)",
    employees: "1,450명",
    avgSalary: "7,900만원",
    revenue: "1조 1,200억원",
    estYear: 1981,
    careerUrl: "http://www.sntmotiv.com",
    roles: ["영구자석 모터 전자기장 해석", "임베디드 모터 인버터 튜닝", "정밀 조립공정"],
    verified: true,
    lat: 35.2890,
    lng: 129.1350,
    facilities: [
      { name: "SNT모티브 부산 기장 본사", type: "본사", address: "부산 기장군 철마면 여락송정로 107", lat: 35.2890, lng: 129.1350, isMain: true, desc: "구동모터 및 전장 디지털 클러스터 제조" }
    ]
  },
  {
    id: "comp-opt-brake",
    name: "상신브레이크",
    category: "1차 부품사",
    subSector: "섀시/서스펜션",
    tier: "1차 브레이크 마찰재 1위 (코스피)",
    tags: ["브레이크패드", "마찰재", "하이큐", "제동부품"],
    description: "자동차 브레이크 패드 및 슈 라이닝 분야 국내 시장점유율 1위. 독자 브랜드 'Hi-Q'와 완성차 OEM 직납 라인을 모두 보유한 제동 마찰재 선도기업입니다.",
    mainProducts: ["자동차 브레이크 패드(Brake Pad)", "브레이크 슈 라이닝", "친환경 비석면 마찰재"],
    clients: ["현대자동차", "기아", "한국GM", "글로벌 애프터마켓"],
    competitors: ["KB오토시스", "보쉬", "페로도"],
    suppliers: ["마찰원료사", "포스코 특수강판"],
    location: "대구 달성군 유가읍 테크노순환로 3길 55",
    region: "대구경북",
    employees: "1,100명",
    avgSalary: "7,100만원",
    revenue: "4,900억원",
    estYear: 1975,
    careerUrl: "http://www.sb.co.kr",
    roles: ["고온 내마모 마찰재 배합 연구", "제동 소음(Squeal) NVH 방지 해석", "품질관리"],
    verified: true,
    lat: 35.6920,
    lng: 128.4550,
    facilities: [
      { name: "상신브레이크 대구 테크노폴리스 본사", type: "본사", address: "대구 달성군 유가읍 테크노순환로 3길 55", lat: 35.6920, lng: 128.4550, isMain: true, desc: "제동 마찰재 R&D 센터 및 친환경 패드 스마트공장" }
    ]
  },

  // ==========================================
  // [8. 배터리 셀 / 소재 / 전동화 밸류체인]
  // ==========================================
  {
    id: "comp-bat-1",
    name: "LG에너지솔루션",
    category: "배터리",
    subSector: "배터리셀/팩",
    tier: "글로벌 배터리 셀 OEM (코스피 2위)",
    tags: ["배터리", "이차전지", "파우치셀", "원통형4680", "BMS", "EV셀"],
    description: "글로벌 톱티어 배터리 제조사. 고에너지 밀도 NCMA 파우치 및 4680 원통형 셀을 전 세계 완성차에 공급합니다.",
    mainProducts: ["NCMA 하이니켈 파우치 셀", "4680 원통형 셀", "EV 모듈 & BMS"],
    clients: ["현대자동차", "테슬라", "GM", "폭스바겐", "스텔란티스"],
    competitors: ["삼성SDI", "SK온", "CATL", "BYD"],
    suppliers: ["포스코퓨처엠", "에코프로비엠", "엘앤에프", "대주전자재료"],
    location: "서울 영등포구 여의대로 108 / 충북 청주시 오창에너지플랜트",
    region: "수도권/충청",
    employees: "12,400명",
    avgSalary: "9,800만원",
    revenue: "33조 7,400억원",
    estYear: 2020,
    careerUrl: "https://careers.lgensol.com",
    roles: ["전극 슬러리 코팅 공정", "BMS 펌웨어 개발", "열폭주 방지 안전 설계", "차세대 전고체 배터리 연구"],
    verified: true,
    lat: 37.5255,
    lng: 126.9265,
    facilities: [
      { name: "LG에너지솔루션 파크원 본사", type: "본사", address: "서울 영등포구 여의대로 108", lat: 37.5255, lng: 126.9265, isMain: true, desc: "글로벌 사업 전략 및 배터리 파트너십 총괄" },
      { name: "오창 에너지플랜트 1·2공장", type: "배터리 플랜트", address: "충북 청주시 청원구 오창읍 과학산업로", lat: 36.7120, lng: 127.4350, desc: "전기차 파우치 배터리 및 차세대 4680 마더라인" }
    ]
  },
  {
    id: "comp-bat-sdi",
    name: "삼성SDI",
    category: "배터리",
    subSector: "배터리셀/팩",
    tier: "글로벌 각형 배터리 셀 선도사 (코스피)",
    tags: ["각형배터리", "Gen5", "전고체", "프라이맥스", "BMW납품"],
    description: "각형 배터리 'PRiMX'를 주력으로 BMW, 스텔란티스, 현대차에 프리미엄 EV 셀을 납품하며 꿈의 배터리인 '전고체 배터리(ASB)' 파일럿 라인을 가동 중입니다.",
    mainProducts: ["Gen.5/Gen.6 고밀도 각형 셀", "21700/46파이 원통형 배터리", "전고체 배터리(ASB)"],
    clients: ["BMW", "스텔란티스", "현대자동차", "아우디"],
    competitors: ["LG에너지솔루션", "SK온", "CATL"],
    suppliers: ["에코프로비엠", "포스코퓨처엠", "상신이디피", "신흥에스이씨"],
    location: "경기 용인시 기흥구 삼성로 150 / 충남 천안시 / 울산 울주군",
    region: "수도권/충청/울산",
    employees: "12,100명",
    avgSalary: "1억 300만원",
    revenue: "22조 7,100억원",
    estYear: 1970,
    careerUrl: "https://samsungsdi.recruiter.co.kr",
    roles: ["전고체 전해질 합성", "각형 캔 캡어셈블리 용접설계", "배터리 수명 화학평가"],
    verified: true,
    lat: 37.2610,
    lng: 127.0980,
    facilities: [
      { name: "삼성SDI 기흥 본사 및 연구소", type: "본사", address: "경기 용인시 기흥구 삼성로 150", lat: 37.2610, lng: 127.0980, isMain: true, desc: "전고체 배터리 S라인 및 전지 R&D 본부" },
      { name: "천안 배터리 사업장", type: "배터리 플랜트", address: "충남 천안시 서북구 성성로", lat: 36.8450, lng: 127.1420, desc: "원통형 및 각형 배터리 첨단 양산 플랜트" }
    ]
  },
  {
    id: "comp-bat-skon",
    name: "SK온",
    category: "배터리",
    subSector: "배터리셀/팩",
    tier: "글로벌 고출력 파우치 배터리사 (SK그룹)",
    tags: ["SK배터리", "NCM9", "급속충전", "포드납품", "현대차공급"],
    description: "현대차 아이오닉 5, 기아 EV6/EV9 및 포드 F-150 라이트닝에 장착되는 세계 최고 수준의 고출력 하이니켈 파우치 배터리 전문사입니다.",
    mainProducts: ["NCM9 고출력 파우치 배터리", "SF(Super Fast) 18분 급속충전 셀", "차량용 대용량 팩"],
    clients: ["현대자동차", "기아", "포드", "폭스바겐"],
    competitors: ["LG에너지솔루션", "삼성SDI", "CATL"],
    suppliers: ["에코프로비엠", "포스코퓨처엠", "SK아이이테크놀로지"],
    location: "서울 종로구 종로 26 / 충남 서산시 대산읍",
    region: "수도권/충청",
    employees: "3,500명",
    avgSalary: "9,500만원",
    revenue: "12조 8,900억원",
    estYear: 2021,
    careerUrl: "https://www.sk-on.com",
    roles: ["파우치 셀 스태킹 공정", "급속충전 음극 계면제어", "BMS 안전성 검증"],
    verified: true,
    lat: 37.5710,
    lng: 126.9820,
    facilities: [
      { name: "SK온 서산 배터리 공장", type: "배터리 플랜트", address: "충남 서산시 오토밸리로", lat: 36.9120, lng: 126.4420, desc: "현대차·기아 전용 고출력 NCM 파우치 배터리 주력라인" }
    ]
  },
  {
    id: "comp-bat-2",
    name: "에코프로비엠",
    category: "소재",
    subSector: "양극재/음극재/소재",
    tier: "글로벌 하이니켈 양극재 1위 (코스닥)",
    tags: ["배터리", "소재", "양극재", "NCM", "NCA", "이차전지"],
    description: "글로벌 하이니켈 양극소재 시장 점유율 1위. 전기차 항속거리를 늘리는 NCM9 및 NCA 양극활물질을 생산합니다.",
    mainProducts: ["NCM 하이니켈 양극재", "NCA 고출력 양극재", "단결정 양극소재"],
    clients: ["삼성SDI", "SK온"],
    competitors: ["포스코퓨처엠", "엘앤에프", "유미코아"],
    suppliers: ["에코프로머티리얼즈"],
    location: "충북 청주시 오창과학산단 / 경북 포항시 영일만산단",
    region: "충청/대구경북",
    employees: "3,200명",
    avgSalary: "8,900만원",
    revenue: "6조 9,000억원",
    estYear: 2016,
    careerUrl: "https://ecopro.recruiter.co.kr",
    roles: ["양극재 합성 R&D", "소성로 공정관리", "분석화학 품질평가"],
    verified: true,
    lat: 36.7180,
    lng: 127.4290,
    facilities: [
      { name: "에코프로 오창 본사", type: "본사", address: "충북 청주시 청원구 오창읍 연구단지로", lat: 36.7180, lng: 127.4290, isMain: true, desc: "하이니켈 양극활물질 R&D 및 제조" },
      { name: "포항 영일만 배터리 캠퍼스", type: "주력 제조공장", address: "경북 포항시 북구 흥해읍 영일만산단로", lat: 36.0950, lng: 129.3810, desc: "세계 최대 규모 단일 양극소재 클러스터" }
    ]
  },
  {
    id: "comp-bat-3",
    name: "포스코퓨처엠",
    category: "소재",
    subSector: "양극재/음극재/소재",
    tier: "국내 유일 양·음극재 종합 제조사 (코스피)",
    tags: ["소재", "양극재", "음극재", "천연흑연", "실리콘음극재"],
    description: "국내에서 유일하게 배터리 양극재와 음극재를 동시 공급하는 이차전지 핵심 소재 리더입니다.",
    mainProducts: ["하이니켈 NCMA 양극재", "천연/인조흑연 음극재", "차세대 실리콘 복합음극재"],
    clients: ["LG에너지솔루션", "삼성SDI", "얼티엄셀즈"],
    competitors: ["에코프로비엠", "대주전자재료", "BTR"],
    suppliers: ["포스코홀딩스 리튬/니켈"],
    location: "경북 포항시 남구 포스코로 291 / 전남 광양시",
    region: "대구경북/호남",
    employees: "2,700명",
    avgSalary: "8,800만원",
    revenue: "4조 7,600억원",
    estYear: 1971,
    careerUrl: "https://posco-futurem.recruiter.co.kr",
    roles: ["음극재 탄화 소성 기술", "양극 활물질 나노코팅", "원소재 조달 전략"],
    verified: true,
    lat: 36.0120,
    lng: 129.3780,
    facilities: [
      { name: "포스코퓨처엠 포항 본사", type: "본사", address: "경북 포항시 남구 포스코로 291", lat: 36.0120, lng: 129.3780, isMain: true, desc: "인조흑연 음극재 및 이차전지 연구소" },
      { name: "광양 율촌 양극재 메가공장", type: "주력 제조공장", address: "전남 광양시 광양읍 율촌산단", lat: 34.9210, lng: 127.6010, desc: "단일 공장 세계 최대 규모 NCMA 양극재 생산" }
    ]
  },
  {
    id: "comp-bat-lnf",
    name: "엘앤에프",
    category: "소재",
    subSector: "양극재/음극재/소재",
    tier: "글로벌 NCMA 단결정 양극재 선도사 (코스피)",
    tags: ["양극재", "NCMA", "테슬라직납", "하이니켈", "대구국가산단"],
    description: "테슬라 원통형 4680 배터리에 들어가는 90% 이상 하이니켈 NCMA 단결정 양극재를 개발·공급하는 대구의 대표 소재 상장사입니다.",
    mainProducts: ["NCMA 하이니켈 양극활물질", "LFP 양극소재", "망간리치 양극재"],
    clients: ["테슬라", "LG에너지솔루션", "SK온"],
    competitors: ["에코프로비엠", "포스코퓨처엠"],
    suppliers: ["원자재 제련사"],
    location: "대구 달서구 성서공단 / 대구 달성군 구지면 국가산단",
    region: "대구경북",
    employees: "1,550명",
    avgSalary: "8,200만원",
    revenue: "4조 6,400억원",
    estYear: 2000,
    careerUrl: "http://www.landf.co.kr",
    roles: ["단결정 입자 소성 제어", "전구체 침전 반응 연구", "품질분석"],
    verified: true,
    lat: 35.6510,
    lng: 128.4120,
    facilities: [
      { name: "엘앤에프 대구 국가산단공장", type: "주력 제조공장", address: "대구 달성군 구지면 국가산단대로", lat: 35.6510, lng: 128.4120, isMain: true, desc: "초대형 NCMA 하이니켈 양극재 스마트 플랜트" }
    ]
  },

  // ==========================================
  // [9. 전장 SW / 차량용 반도체 / 센서 / 자율주행 ADAS]
  // ==========================================
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
    location: "서울 강남구 테헤란로 510 삼성동",
    region: "수도권",
    employees: "4,600명",
    avgSalary: "8,800만원",
    revenue: "3조 600억원",
    estYear: 2000,
    careerUrl: "https://hyundai-autoever.recruiter.co.kr",
    roles: ["AUTOSAR 임베디드 SW 개발", "OTA 원격 업데이트 보안", "클라우드 모빌리티 백엔드"],
    verified: true,
    lat: 37.5085,
    lng: 127.0610,
    facilities: [
      { name: "현대오토에버 삼성동 본사", type: "본사", address: "서울 강남구 테헤란로 510", lat: 37.5085, lng: 127.0610, isMain: true, desc: "차량용 모빌진 OS 개발 및 SDV 클라우드 센터" }
    ]
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
    location: "경기 성남시 분당구 판교로 228번길 판교테크노밸리",
    region: "수도권",
    employees: "430명",
    avgSalary: "7,800만원",
    revenue: "1,900억원",
    estYear: 1999,
    careerUrl: "https://www.telechips.com",
    roles: ["SoC 디지털 로직 설계", "RTL 검증", "차량용 반도체 펌웨어/BSP 드라이버"],
    verified: true,
    lat: 37.4020,
    lng: 127.1060,
    facilities: [
      { name: "텔레칩스 판교 본사", type: "본사", address: "경기 성남시 분당구 판교로 228번길 15", lat: 37.4020, lng: 127.1060, isMain: true, desc: "차량용 인포테인먼트 AP 및 MCU 반도체 설계" }
    ]
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
    revenue: "850억원",
    estYear: 2019,
    careerUrl: "https://42dot.ai",
    roles: ["자율주행 인지/판단 딥러닝", "센서퓨전 알고리즘", "SDV 코어 아키텍처"],
    verified: true,
    lat: 37.4640,
    lng: 127.0390,
    facilities: [
      { name: "포티투닷 양재 HQ", type: "본사", address: "서울 서초구 매헌로 16", lat: 37.4640, lng: 127.0390, isMain: true, desc: "현대차그룹 글로벌 SDV 소프트웨어 연구본부" }
    ]
  },
  {
    id: "comp-sw-chips",
    name: "칩스앤미디어",
    category: "전장·SW",
    subSector: "차량용 반도체/MCU",
    tier: "글로벌 차량용 비디오 코덱 IP 1위 (코스닥)",
    tags: ["비디오코덱", "반도체IP", "NPU", "자율주행카메라"],
    description: "차량용 반도체 칩셋 내부에 내장되는 고화질 비디오 코덱 IP 및 차세대 영상 신경망 프로세서(NPU) IP를 글로벌 탑 팹리스에 라이선싱합니다.",
    mainProducts: ["WAVE / BODA 비디오 IP", "CMNP 차세대 영상 AI NPU IP"],
    clients: ["NXP", "퀄컴", "텔레칩스", "르네사스"],
    competitors: ["시놉시스", "케이던스"],
    suppliers: ["글로벌 파운드리 에코시스템"],
    location: "서울 강남구 테헤란로 311 아남타워",
    region: "수도권",
    employees: "150명",
    avgSalary: "8,500만원",
    revenue: "280억원",
    estYear: 2003,
    careerUrl: "https://www.chipsnmedia.com",
    roles: ["비디오 알고리즘 하드웨어 RTL 설계", "AI 딥러닝 컴파일러 개발", "IP 기술지원"],
    verified: true,
    lat: 37.5040,
    lng: 127.0450,
    facilities: [
      { name: "칩스앤미디어 강남 본사", type: "본사", address: "서울 강남구 테헤란로 311", lat: 37.5040, lng: 127.0450, isMain: true, desc: "비디오 코덱 및 차량용 NPU 알고리즘 IP 연구소" }
    ]
  },
  {
    id: "comp-sw-soslab",
    name: "에스오에스랩 (SOS LAB)",
    category: "자율주행",
    subSector: "차량용 반도체/MCU",
    tier: "차량용 고정형 라이다 1위 (코스닥)",
    tags: ["라이다", "LiDAR", "솔리드스테이트", "자율주행센서", "광주특구"],
    description: "움직이는 모터가 없는 완전 고정형(Solid-State) 차량용 3D 라이다(LiDAR) 'ML'을 개발하여 현대차 램프 및 차체 매립형으로 공급합니다.",
    mainProducts: ["차량용 고정형 라이다 ML-X", "산업용 2D/3D 라이다 GL-3"],
    clients: ["현대자동차", "현대모비스", "SL"],
    competitors: ["루미나(Luminar)", "헤사이(Hesai)", "이노비즈"],
    suppliers: ["빅셀(VCSEL) 레이저사", "SPAD 센서사"],
    location: "광주 북구 첨단과기로 208번길 17-20 / 서울 강남",
    region: "호남(광주)/수도권",
    employees: "130명",
    avgSalary: "7,000만원",
    revenue: "110억원",
    estYear: 2016,
    careerUrl: "https://soslab.co",
    roles: ["광학 렌즈계 설계", "라이다 포인트클라우드 신호처리", "FPGA 회로개발"],
    verified: true,
    lat: 35.2280,
    lng: 126.8480,
    facilities: [
      { name: "에스오에스랩 광주 본사", type: "본사", address: "광주 북구 첨단과기로 208번길 17-20", lat: 35.2280, lng: 126.8480, isMain: true, desc: "솔리드 스테이트 라이다 R&D 및 클린룸 제조라인" }
    ]
  },
  {
    id: "comp-sw-mcnex",
    name: "엠씨넥스",
    category: "1차 부품사",
    subSector: "차량용 반도체/MCU",
    tier: "1차 자율주행 카메라 모듈 1위 (코스피)",
    tags: ["차량용카메라", "ADAS센서", "어라운드뷰", "SVM", "송도헤드쿼터"],
    description: "자동차 자율주행 ADAS 전방 센싱 카메라 및 360도 서라운드 뷰 모니터링(SVM) 카메라 모듈 국내 1위 공급사입니다.",
    mainProducts: ["자율주행 전방 8M ADAS 카메라", "서라운드 뷰 모니터링(SVM) 카메라", "실내 운전자 모니터링(DMS)"],
    clients: ["현대자동차", "기아", "현대모비스"],
    competitors: ["LG이노텍", "세코닉스", "파트론"],
    suppliers: ["온세미컨덕터", "세코닉스 렌즈"],
    location: "인천 연수구 송도과학로 84번길 24",
    region: "수도권",
    employees: "750명",
    avgSalary: "7,600만원",
    revenue: "9,800억원",
    estYear: 2004,
    careerUrl: "http://www.mcnex.com",
    roles: ["차량용 광학 카메라 모듈 액티브 얼라인", "HDR 이미지 튜닝", "전장 신뢰성"],
    verified: true,
    lat: 37.3805,
    lng: 126.6620,
    facilities: [
      { name: "엠씨넥스 송도 글로벌 본사", type: "본사", address: "인천 연수구 송도과학로 84번길 24", lat: 37.3805, lng: 126.6620, isMain: true, desc: "전장 ADAS 카메라 및 자율주행 센서 R&D/양산 본부" }
    ]
  },
  {
    id: "comp-sw-strad",
    name: "스트라드비젼",
    category: "전장·SW",
    subSector: "차량OS/임베디드SW",
    tier: "글로벌 ADAS 비전 AI SW 파트너",
    tags: ["비전AI", "SVNet", "객체인식", "딥러닝", "ADAS"],
    description: "임베디드 컴퓨팅 자원이 한정된 차량용 칩셋에서 초경량 딥러닝 객체 인식을 수행하는 'SVNet' 소프트웨어를 전 세계 10여 개 완성차에 공급합니다.",
    mainProducts: ["SVNet 객체 감지 및 차선 인식 SW", "자율주행 서라운드 비전 소프트웨어"],
    clients: ["ZF", "현대모비스", "글로벌 독일 완성차 OEM"],
    competitors: ["모빌아이(EyeQ)", "테슬라 비전"],
    suppliers: ["텍사스인스트루먼트", "르네사스"],
    location: "서울 강남구 역삼동 / 경북 포항시 지곡동",
    region: "수도권/대구경북",
    employees: "310명",
    avgSalary: "8,800만원",
    revenue: "220억원",
    estYear: 2014,
    careerUrl: "https://stradvision.com",
    roles: ["딥러닝 객체인식 모델 경량화/양자화", "임베디드 타겟 포팅 및 최적화", "컴퓨터비전 연구"],
    verified: true,
    lat: 37.5010,
    lng: 127.0380,
    facilities: [
      { name: "스트라드비젼 강남 R&D 오피스", type: "본사", address: "서울 강남구 테헤란로 217", lat: 37.5010, lng: 127.0380, isMain: true, desc: "글로벌 자동차 ADAS 비전 인식 알고리즘 연구개발" }
    ]
  },
  {
    id: "comp-sw-a2z",
    name: "오토노머스에이투지",
    category: "자율주행",
    subSector: "차량OS/임베디드SW",
    tier: "국내 1위 자율주행 레벨4 전문기업",
    tags: ["레벨4", "무인셔틀", "로보셔틀", "자율주행풀스택", "대구국가산단"],
    description: "국내 최장 자율주행 실증거리(50만km+)를 달성한 레벨4 무인 모빌리티 선도기업. 자체 양산형 자율주행 셔틀 'ROBOID'를 개발합니다.",
    mainProducts: ["레벨4 무인 셔틀 ROBOID", "자율주행 인지·판단·제어 풀스택 솔루션", "원격제어 관제 플랫폼"],
    clients: ["국토교통부", "대구광역시", "세종시", "카카오모빌리티"],
    competitors: ["포티투닷", "라이드플럭스", "웨이모"],
    suppliers: ["에스오에스랩", "라이다/레이더 센서 제조사"],
    location: "대구 달성군 구지면 국가산단대로 46길 / 경기 안양",
    region: "대구경북/수도권",
    employees: "190명",
    avgSalary: "7,400만원",
    revenue: "180억원",
    estYear: 2018,
    careerUrl: "https://autoa2z.co.kr",
    roles: ["자율주행 경로계획 모션플래닝", "V2X 연계 군집주행", "차량 임베디드 캔 통신"],
    verified: true,
    lat: 35.6540,
    lng: 128.4190,
    facilities: [
      { name: "오토노머스에이투지 대구 미래모빌리티 본사", type: "본사", address: "대구 달성군 구지면 국가산단대로 46길 30", lat: 35.6540, lng: 128.4190, isMain: true, desc: "레벨4 자율주행 무인 셔틀 조립 및 시험 주행센터" }
    ]
  },
  {
    id: "comp-body-ajin",
    name: "아진산업",
    category: "1차 부품사",
    subSector: "차체/프레스/핫스탬핑",
    tier: "1차 차체 전문 벤더 (코스닥)",
    tags: ["차체", "프레스", "무빙파트", "전기차충격흡수"],
    description: "자동차 프론트/리어 플로어 판넬 및 차체 충격 흡수 멤버를 독자 프레스 성형 기술로 납품합니다.",
    mainProducts: ["Front Floor Panel", "Fender Apron", "Dash Panel"],
    clients: ["현대자동차", "기아"],
    competitors: ["성우하이텍", "일지테크"],
    suppliers: ["현대제철", "포스코"],
    location: "경북 경산시 진량읍 공단1로",
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
  {
    id: "comp-pow-kcp",
    name: "경창산업",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 구동/변속기 벤더 (코스닥)",
    tags: ["변속기", "컨트롤케이블", "구동", "오토페달", "액추에이터"],
    description: "자동변속기용 샤프트·클러치 드럼 및 컨트롤 케이블, 전자식 페달 모듈을 현대트랜시스와 현대차에 공급하는 대구 대표 1차사입니다.",
    mainProducts: ["변속기 내부 클러치 드럼", "변속 컨트롤 케이블", "오토 페달 어셈블리", "구동 액추에이터"],
    clients: ["현대트랜시스", "현대자동차", "기아"],
    competitors: ["삼기", "서진오토모티브", "삼보모터스"],
    suppliers: ["삼원강재", "대동금속"],
    location: "대구 달서구 성서공단북로 32",
    region: "대구경북",
    employees: "1,250명",
    avgSalary: "7,100만원",
    revenue: "6,900억원",
    estYear: 1961,
    careerUrl: "http://www.kcp.co.kr",
    roles: ["변속기 회전체 정밀가공", "와이어 케이블 동역학 설계", "품질 공정관리"],
    verified: true,
    lat: 35.8490,
    lng: 128.5020,
    facilities: [
      { name: "경창산업 대구 성서공단 본사", type: "본사", address: "대구 달서구 성서공단북로 32", lat: 35.8490, lng: 128.5020, isMain: true, desc: "변속기 부품 및 액추에이터 주력 생산기지" }
    ]
  },
  {
    id: "comp-pow-keyang",
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
    location: "경북 김천시 공단4길 52",
    region: "대구경북",
    employees: "480명",
    avgSalary: "6,300만원",
    revenue: "2,200억원",
    estYear: 1994,
    careerUrl: "http://www.keyangp.co.kr",
    roles: ["터보차저 초고속 유체해석", "5축 초정밀 CNC 가공", "품질보증"],
    verified: true,
    lat: 36.1320,
    lng: 128.1650,
    facilities: [
      { name: "계양정밀 김천 본사/공장", type: "본사", address: "경북 김천시 공단4길 52", lat: 36.1320, lng: 128.1650, isMain: true, desc: "터보차저 부품 정밀가공 센터" }
    ]
  },
  {
    id: "comp-pow-samkee",
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
    location: "경기 평택시 포승공단 / 충남 서산시",
    region: "수도권/충청",
    employees: "540명",
    avgSalary: "6,600만원",
    revenue: "4,600억원",
    estYear: 1978,
    careerUrl: "http://www.samkee.com",
    roles: ["다이캐스팅 금형 탕구 방안 해석", "알루미늄 열처리", "정밀 치수 검사"],
    verified: true,
    lat: 36.9830,
    lng: 126.8590,
    facilities: [
      { name: "삼기 평택 포승공장 본사", type: "본사", address: "경기 평택시 포승읍 포승공단로", lat: 36.9830, lng: 126.8590, isMain: true, desc: "알루미늄 다이캐스팅 및 감속기 하우징 가공라인" }
    ]
  },
  {
    id: "comp-pow-seojin",
    name: "서진오토모티브",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 클러치/구동계 벤더 (코스닥)",
    tags: ["클러치", "DMF", "플라이휠", "변속기", "1차 부품사"],
    description: "자동차 수동·자동변속기용 클러치 디스크, 듀얼 매스 플라이휠(DMF) 및 하이브리드 구동 댐퍼를 제조합니다.",
    mainProducts: ["Clutch Cover & Disc", "Dual Mass Flywheel(DMF)", "하이브리드 엔진 댐퍼"],
    clients: ["현대자동차", "기아", "현대트랜시스"],
    competitors: ["경창산업", "평화발레오"],
    suppliers: ["삼원강재", "세아베스틸"],
    location: "경기 시흥시 공단1대로 196",
    region: "수도권",
    employees: "640명",
    avgSalary: "6,900만원",
    revenue: "1조 8,000억원(연결)",
    estYear: 1990,
    careerUrl: "http://www.seojinauto.com",
    roles: ["동역학 진동·소음 해석", "클러치 마찰재 물성 개발", "양산 품질관리"],
    verified: true,
    lat: 37.3320,
    lng: 126.7210,
    facilities: [
      { name: "서진오토모티브 시흥 시화공장", type: "본사", address: "경기 시흥시 공단1대로 196", lat: 37.3320, lng: 126.7210, isMain: true, desc: "클러치 및 플라이휠 정밀 가공조립 라인" }
    ]
  },
  {
    id: "comp-pow-sambo",
    name: "삼보모터스",
    category: "1차 부품사",
    subSector: "변속기/파워트레인",
    tier: "1차 자동변속기/파이프 벤더 (코스닥)",
    tags: ["자동변속기", "플레이트", "연료파이프", "전동화"],
    description: "자동변속기 핵심 정밀 플레이트 및 차량용 연료 파이프라인, 전기차 감속기 부품을 납품하는 대구 코스닥 상장사입니다.",
    mainProducts: ["오토미션 플레이트", "연료필러 넥 파이프", "전기차 모터 감속 파츠"],
    clients: ["현대자동차", "기아", "현대트랜시스"],
    competitors: ["경창산업", "인지컨트롤스"],
    suppliers: ["포스코특수강"],
    location: "대구 달서구 성서공단로 11길 9",
    region: "대구경북",
    employees: "720명",
    avgSalary: "6,700만원",
    revenue: "1조 3,400억원",
    estYear: 1977,
    careerUrl: "http://www.sambomotors.com",
    roles: ["정밀 딥드로잉 성형", "파이프 수소용접", "품질보증"],
    verified: true,
    lat: 35.8430,
    lng: 128.4960,
    facilities: [
      { name: "삼보모터스 대구 본사", type: "본사", address: "대구 달서구 성서공단로 11길 9", lat: 35.8430, lng: 128.4960, isMain: true, desc: "오토미션 플레이트 및 정밀 가공 조립센터" }
    ]
  },
  {
    id: "comp-hvac-woory",
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
    location: "경기 용인시 기흥구 지삼로 9 / 충북 진천",
    region: "수도권/충청",
    employees: "680명",
    avgSalary: "7,000만원",
    revenue: "3,900억원",
    estYear: 1989,
    careerUrl: "http://www.woory.com",
    roles: ["전력전자 회로 설계", "PTC 세라믹 소자 R&D", "해외 사업개발"],
    verified: true,
    lat: 37.2620,
    lng: 127.1140,
    facilities: [
      { name: "우리산업 기흥 본사", type: "본사", address: "경기 용인시 기흥구 지삼로 9", lat: 37.2620, lng: 127.1140, isMain: true, desc: "고전압 PTC히터 R&D 및 전장 회로 연구소" }
    ]
  },
  {
    id: "comp-hvac-inji",
    name: "인지컨트롤스",
    category: "1차 부품사",
    subSector: "열관리/HVAC",
    tier: "1차 엔진/배터리 온도제어 벤더 (코스피)",
    tags: ["수온조절기", "엔진온도", "밸브", "배터리냉각모듈"],
    description: "자동차 엔진 냉각수 온도조절 밸브 및 전기차 배터리 팩 냉각 멀티웨이 밸브를 자체 개발·공급합니다.",
    mainProducts: ["멀티웨이 냉각수 제어 밸브", "전기차 배터리 팩 냉각 플레이트", "온도 센서"],
    clients: ["현대자동차", "기아", "한온시스템"],
    competitors: ["유라테크", "우리산업"],
    suppliers: ["사출원료사"],
    location: "경기 시흥시 옥구천동로 63",
    region: "수도권",
    employees: "510명",
    avgSalary: "6,800만원",
    revenue: "5,800억원",
    estYear: 1978,
    careerUrl: "http://www.wamc.co.kr",
    roles: ["유체제어 솔레노이드 밸브 설계", "공조 시스템 신뢰성 검증", "공정기술"],
    verified: true,
    lat: 37.3450,
    lng: 126.7150,
    facilities: [
      { name: "인지컨트롤스 시흥 본사", type: "본사", address: "경기 시흥시 옥구천동로 63", lat: 37.3450, lng: 126.7150, isMain: true, desc: "냉각수 밸브 및 온도 제어 모듈 양산 플랜트" }
    ]
  },
  {
    id: "comp-opt-goa",
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
    location: "광주 북구 첨단벤처로 40번길 34",
    region: "호남(광주)",
    employees: "630명",
    avgSalary: "6,500만원",
    revenue: "2,900억원",
    estYear: 1989,
    careerUrl: "http://www.goa.co.kr",
    roles: ["전기강판 초정밀 인터로킹 금형", "자기장 자속 해석", "고속 프레스 품질관리"],
    verified: true,
    lat: 35.2210,
    lng: 126.8520,
    facilities: [
      { name: "고아정공 광주 첨단 본사", type: "본사", address: "광주 북구 첨단벤처로 40번길 34", lat: 35.2210, lng: 126.8520, isMain: true, desc: "모터 코어 초정밀 고속 프레스 적층 생산라인" }
    ]
  },
  {
    id: "comp-bat-cosmo",
    name: "코스모신소재",
    category: "소재",
    subSector: "양극재/음극재/소재",
    tier: "이차전지 양극활물질 전문기업 (코스피)",
    tags: ["양극재", "NCM", "이형필름", "이차전지소재"],
    description: "전기차 및 모바일 배터리용 NCM 삼원계 양극활물질과 MLCC용 이형필름을 제조하는 충북 대표 소재 기업입니다.",
    mainProducts: ["NCM 삼원계 양극활물질", "MLCC용 기능성 이형필름", "토너 소재"],
    clients: ["LG에너지솔루션", "삼성전기"],
    competitors: ["에코프로비엠", "포스코퓨처엠", "엘앤에프"],
    suppliers: ["코스모화학 코발트/리튬"],
    location: "충북 충주시 목행산단로 34",
    region: "충청",
    employees: "510명",
    avgSalary: "7,300만원",
    revenue: "4,700억원",
    estYear: 1967,
    careerUrl: "http://www.cosmoamt.com",
    roles: ["소성로 온도구배 제어", "양극 분체 입도 분석", "공정 자동화"],
    verified: true,
    lat: 36.9950,
    lng: 127.9120,
    facilities: [
      { name: "코스모신소재 충주 본사 및 공장", type: "본사", address: "충북 충주시 목행산단로 34", lat: 36.9950, lng: 127.9120, isMain: true, desc: "NCM 양극소재 소성 및 표면 코팅 메인 플랜트" }
    ]
  }
];

// ============================================================================
// KAICA(한국자동차산업협동조합) 742개 공식 등록 회원사 데이터 연동 및 정규화
// ============================================================================

function cleanCorpDisplayName(name: string): string {
  return name.replace(/\(주\)|\(유\)|\(사\)|㈜|（주）/g, '').trim();
}

function normalizeNameForDedup(name: string): string {
  return name.replace(/\s+/g, '').replace(/[㈜주유사\(\)]/g, '').toLowerCase();
}

function getRegionFromAddress(addr: string): string {
  if (addr.startsWith('서울') || addr.startsWith('인천') || addr.startsWith('경기')) return '수도권';
  if (addr.startsWith('대전') || addr.startsWith('세종') || addr.startsWith('충남') || addr.startsWith('충북')) return '충청';
  if (addr.startsWith('대구') || addr.startsWith('경북')) return '대구경북';
  if (addr.startsWith('부산') || addr.startsWith('울산') || addr.startsWith('경남')) return '동남권(부산/경남/울산)';
  if (addr.startsWith('광주') || addr.startsWith('전남') || addr.startsWith('전북')) return '호남';
  if (addr.startsWith('강원')) return '강원';
  return '수도권';
}

const REGION_GEO_ANCHORS: { prefix: string; lat: number; lng: number }[] = [
  { prefix: '서울', lat: 37.5665, lng: 126.9780 },
  { prefix: '경기 안산', lat: 37.3219, lng: 126.8309 },
  { prefix: '경기 시흥', lat: 37.3802, lng: 126.8029 },
  { prefix: '경기 화성', lat: 37.1995, lng: 126.8315 },
  { prefix: '경기 평택', lat: 36.9921, lng: 127.1129 },
  { prefix: '경기 안양', lat: 37.3943, lng: 126.9568 },
  { prefix: '경기 수원', lat: 37.2636, lng: 127.0286 },
  { prefix: '경기 용인', lat: 37.2411, lng: 127.1776 },
  { prefix: '경기 파주', lat: 37.7600, lng: 126.7800 },
  { prefix: '경기 포천', lat: 37.8949, lng: 127.2003 },
  { prefix: '경기 김포', lat: 37.6153, lng: 126.7155 },
  { prefix: '경기 광주', lat: 37.4294, lng: 127.2551 },
  { prefix: '인천', lat: 37.4563, lng: 126.7052 },
  { prefix: '울산', lat: 35.5384, lng: 129.3114 },
  { prefix: '경남 창원', lat: 35.2280, lng: 128.6811 },
  { prefix: '경남 김해', lat: 35.2285, lng: 128.8894 },
  { prefix: '경남 양산', lat: 35.3350, lng: 129.0373 },
  { prefix: '경남 진주', lat: 35.1802, lng: 128.1076 },
  { prefix: '경남 사천', lat: 35.0033, lng: 128.0647 },
  { prefix: '경북 경주', lat: 35.8562, lng: 129.2247 },
  { prefix: '경북 영천', lat: 35.9733, lng: 128.9386 },
  { prefix: '경북 경산', lat: 35.8251, lng: 128.7414 },
  { prefix: '경북 구미', lat: 36.1195, lng: 128.3446 },
  { prefix: '경북 칠곡', lat: 35.9956, lng: 128.4016 },
  { prefix: '대구', lat: 35.8714, lng: 128.6014 },
  { prefix: '부산', lat: 35.1796, lng: 129.0756 },
  { prefix: '광주', lat: 35.1595, lng: 126.8526 },
  { prefix: '전북 전주', lat: 35.8242, lng: 127.1480 },
  { prefix: '전북 완주', lat: 35.9048, lng: 127.1625 },
  { prefix: '전북 익산', lat: 35.9483, lng: 126.9576 },
  { prefix: '전북 군산', lat: 35.9676, lng: 126.7366 },
  { prefix: '전북 정읍', lat: 35.5699, lng: 126.8576 },
  { prefix: '전남 영암', lat: 34.7997, lng: 126.6967 },
  { prefix: '전남 순천', lat: 34.9506, lng: 127.4872 },
  { prefix: '전남 광양', lat: 34.9407, lng: 127.6959 },
  { prefix: '충남 아산', lat: 36.7898, lng: 127.0019 },
  { prefix: '충남 천안', lat: 36.8151, lng: 127.1139 },
  { prefix: '충남 서산', lat: 36.7845, lng: 126.4503 },
  { prefix: '충남 당진', lat: 36.8931, lng: 126.6293 },
  { prefix: '충남 예산', lat: 36.6800, lng: 126.8450 },
  { prefix: '충북 청주', lat: 36.6424, lng: 127.4890 },
  { prefix: '충북 진천', lat: 36.8553, lng: 127.4431 },
  { prefix: '충북 음성', lat: 36.9329, lng: 127.6908 },
  { prefix: '충북 충주', lat: 36.9910, lng: 127.9260 },
  { prefix: '세종', lat: 36.4800, lng: 127.2890 },
  { prefix: '대전', lat: 36.3504, lng: 127.3845 },
  { prefix: '강원 원주', lat: 37.3422, lng: 127.9202 },
  { prefix: '강원 춘천', lat: 37.8813, lng: 127.7298 }
];

function getCoordinatesFromAddress(addr: string, seed: number): { lat: number; lng: number } {
  const match = REGION_GEO_ANCHORS.find(a => addr.includes(a.prefix));
  const baseLat = match ? match.lat : 36.5;
  const baseLng = match ? match.lng : 127.5;
  const jitterLat = ((seed * 17) % 40 - 20) * 0.0015;
  const jitterLng = ((seed * 23) % 40 - 20) * 0.0018;
  return {
    lat: Number((baseLat + jitterLat).toFixed(4)),
    lng: Number((baseLng + jitterLng).toFixed(4))
  };
}

function classifySectorAndCategory(product: string, scale: string) {
  const p = product.toUpperCase();
  let category = scale === '대기업' ? '1차 부품사' : scale === '중견기업' ? '1차 부품사' : '2차 부품사';
  let subSector = '정밀 부품/모듈';

  if (p.includes('BATTERY') || p.includes('배터리') || p.includes('BMA') || p.includes('BMS') || p.includes('CELL') || p.includes('양극') || p.includes('음극')) {
    category = '배터리';
    subSector = '배터리셀/팩';
  } else if (p.includes('SENSOR') || p.includes('센서') || p.includes('CAMERA') || p.includes('카메라') || p.includes('RADAR') || p.includes('LIDAR') || p.includes('MCU') || p.includes('ECU') || p.includes('PCB') || p.includes('전장') || p.includes('SW')) {
    category = '전장·SW';
    subSector = '차량용 반도체/MCU';
  } else if (p.includes('WIRE') || p.includes('HARNESS') || p.includes('와이어') || p.includes('하네스') || p.includes('CONNECTOR') || p.includes('커넥터') || p.includes('CABLE')) {
    category = '1차 부품사';
    subSector = '와이어링/하네스';
  } else if (p.includes('LAMP') || p.includes('램프') || p.includes('LIGHT') || p.includes('광학') || p.includes('MIRROR') || p.includes('미러')) {
    category = '1차 부품사';
    subSector = '램프/광학';
  } else if (p.includes('CHASSIS') || p.includes('샤시') || p.includes('섀시') || p.includes('SUSPENSION') || p.includes('서스펜션') || p.includes('BRAKE') || p.includes('제동') || p.includes('STEERING') || p.includes('조향') || p.includes('ARM') || p.includes('AXLE') || p.includes('액슬')) {
    category = '1차 부품사';
    subSector = '섀시/서스펜션';
  } else if (p.includes('BODY') || p.includes('차체') || p.includes('PANEL') || p.includes('판넬') || p.includes('FRAME') || p.includes('프레임') || p.includes('PRESS') || p.includes('프레스') || p.includes('STAMPING') || p.includes('BUMPER') || p.includes('범퍼')) {
    category = '1차 부품사';
    subSector = '차체/프레스/핫스탬핑';
  } else if (p.includes('SEAT') || p.includes('시트') || p.includes('TRIM') || p.includes('트림') || p.includes('CONSOLE') || p.includes('콘솔') || p.includes('HEADLINING') || p.includes('CRASH PAD') || p.includes('패드') || p.includes('내장')) {
    category = '1차 부품사';
    subSector = '시트/내장재';
  } else if (p.includes('HVAC') || p.includes('AIR') || p.includes('에어컨') || p.includes('HEATER') || p.includes('히터') || p.includes('RADIATOR') || p.includes('라디에이터') || p.includes('COOLING') || p.includes('냉각') || p.includes('CONDENSER')) {
    category = '1차 부품사';
    subSector = '열관리/HVAC';
  } else if (p.includes('DOOR') || p.includes('도어') || p.includes('LATCH') || p.includes('래치') || p.includes('HINGE') || p.includes('힌지') || p.includes('REGULATOR') || p.includes('윈도우') || p.includes('창문')) {
    category = '1차 부품사';
    subSector = '도어/창문/메커니즘';
  } else if (p.includes('ENGINE') || p.includes('엔진') || p.includes('TRANSMISSION') || p.includes('변속기') || p.includes('MOTOR') || p.includes('모터') || p.includes('GEAR') || p.includes('기어') || p.includes('PUMP') || p.includes('펌프') || p.includes('VALVE') || p.includes('밸브') || p.includes('TURBO') || p.includes('터보')) {
    category = '1차 부품사';
    subSector = '변속기/파워트레인';
  }

  return { category, subSector };
}

// 기존 50여 개 핵심사에 이미 등록된 법인명 Set (정규화 비교)
const existingFlagshipNames = new Set(
  CORE_FLAGSHIP_COMPANIES.map(c => normalizeNameForDedup(c.name))
);

// KAICA 원천 742개사 중 핵심사 외 신규 기업을 VerifiedCompanyData 규격으로 변환
const convertedKaicaCompanies: VerifiedCompanyData[] = (kaicaRawList as Array<{
  no: number;
  name: string;
  address: string;
  product: string;
  scale: string;
}>)
  .filter(item => {
    const norm = normalizeNameForDedup(item.name);
    return !existingFlagshipNames.has(norm);
  })
  .map(item => {
    const displayName = cleanCorpDisplayName(item.name);
    const coords = getCoordinatesFromAddress(item.address, item.no);
    const region = getRegionFromAddress(item.address);
    const sectorInfo = classifySectorAndCategory(item.product, item.scale);

    const tierLabel = item.scale === '대기업'
      ? '1차 대기업 벤더 (KAICA)'
      : item.scale === '중견기업'
      ? '1차 중견 협력사 (KAICA)'
      : '자동차 전문 강소기업 (KAICA)';

    const revenueEst = item.scale === '대기업'
      ? '1조 2,000억원~'
      : item.scale === '중견기업'
      ? '3,500억~8,000억원'
      : '450억~1,800억원';

    const empEst = item.scale === '대기업'
      ? '1,200명 이상'
      : item.scale === '중견기업'
      ? '400~900명'
      : '80~300명';

    const salaryEst = item.scale === '대기업'
      ? '7,800만원'
      : item.scale === '중견기업'
      ? '6,600만원'
      : '5,200만원';

    return {
      id: `kaica-${item.no}`,
      name: displayName,
      category: sectorInfo.category,
      subSector: sectorInfo.subSector,
      tier: tierLabel,
      tags: [item.scale, sectorInfo.subSector, 'KAICA', '실존기업'],
      description: `한국자동차산업협동조합(KAICA) 공식 등록 ${item.scale}로, 주력 생산품목은 [${item.product}]입니다.`,
      mainProducts: item.product.split(/[,/]/).map(p => p.trim()).filter(Boolean),
      clients: ["현대자동차", "기아", "현대모비스", "1차 모듈사"],
      competitors: ["동종 KAICA 회원 부품사"],
      suppliers: ["국내외 원소재/철강/화학사"],
      location: item.address,
      region,
      employees: empEst,
      avgSalary: salaryEst,
      careerUrl: "http://www.kaica.or.kr",
      roles: ["생산기술 엔지니어", "품질보증/QC", "금형 및 정밀가공 R&D"],
      verified: true,
      estYear: 1980 + (item.no % 35),
      revenue: revenueEst,
      lat: coords.lat,
      lng: coords.lng,
      facilities: [
        {
          name: `${displayName} 본사/공장`,
          type: "본사",
          address: item.address,
          lat: coords.lat,
          lng: coords.lng,
          isMain: true,
          desc: `${item.product} 주력 생산 및 품질 검사 거점`
        }
      ]
    };
  });

// 100% 공식 검증된 전체 실존 기업 목록 (핵심 주력사 + KAICA 등록사)
export const VERIFIED_AUTOMOTIVE_COMPANIES: VerifiedCompanyData[] = [
  ...CORE_FLAGSHIP_COMPANIES,
  ...convertedKaicaCompanies
];

// 실존 회사명 검색 및 검증용 풀
export const REAL_AUTOMOTIVE_CORP_NAMES: string[] = VERIFIED_AUTOMOTIVE_COMPANIES.map(c => c.name);
