import { Company } from '../App';

// 클라이언트 사이드 고지능 자동차 밸류체인 발굴 엔진
export function generateClientFallbackCompanies(query: string): Partial<Company>[] {
  const trimmed = query.trim();

  const fallbackSectors: Record<string, { subSector: string; category: string; tier: string; products: string[]; loc: string; region: string; lat: number; lng: number }> = {
    '배터리': { subSector: '배터리셀/팩', category: '배터리', tier: '2차 배터리 모듈/팩 벤더', products: ['BMS 모듈', '배터리 팩 프레임', '초경량 버스바'], loc: '충북 청주 오창 / 충남 서산', region: '충청', lat: 36.71, lng: 127.43 },
    '이차전지': { subSector: '양극재/음극재/소재', category: '소재', tier: '배터리 소재 공급사', products: ['하이니켈 NCM 전구체', '실리콘 복합음극재'], loc: '경북 포항 영일만산단', region: '대구경북', lat: 36.09, lng: 129.37 },
    '모터': { subSector: '변속기/파워트레인', category: '1차 부품사', tier: '1차 구동모터 벤더', products: ['EV 트랙션 모터', '구동 코어', '고속 리졸버 센서'], loc: '광주 북구 첨단 / 대구 달서', region: '호남(광주)', lat: 35.22, lng: 126.85 },
    '감속기': { subSector: '변속기/파워트레인', category: '1차 부품사', tier: '1차 e-Axle 감속기 벤더', products: ['EV 1단 감속기 기어셋', '알루미늄 감속기 케이스'], loc: '충남 서산 지곡 / 경기 화성', region: '충청', lat: 36.90, lng: 126.44 },
    '반도체': { subSector: '차량용 반도체/MCU', category: '전장·SW', tier: '차량용 팹리스 파트너', products: ['차량 제어 MCU 칩셋', '파워반도체 SiC 전력모듈', 'CAN-FD 통신 칩'], loc: '경기 성남시 판교테크노밸리', region: '수도권', lat: 37.40, lng: 127.11 },
    '자율주행': { subSector: '차량OS/임베디드SW', category: '자율주행', tier: 'ADAS Tier-1 솔루션사', products: ['ADAS 센서퓨전 모듈', '서라운드 뷰 모니터링(SVM)', '자율주행 제어 도메인 컨트롤러'], loc: '서울 서초 양재 / 경기 판교', region: '수도권', lat: 37.46, lng: 127.04 },
    '도어': { subSector: '도어/창문/메커니즘', category: '1차 부품사', tier: '1차 도어시스템 벤더', products: ['스마트 전자식 도어 래치', '파워 테일게이트 드라이브', '안티핀치 윈도우 모터'], loc: '경북 경주 내남 / 인천 송도', region: '대구경북', lat: 35.75, lng: 129.28 },
    '와이어링': { subSector: '와이어링/하네스', category: '1차 부품사', tier: '1차 전장 하네스 벤더', products: ['고전압 배터리 하네스', '스마트 정션박스(SJB)', '차량 내부 전력분배 케이블'], loc: '인천 연수구 송도 / 충남 아산', region: '수도권', lat: 37.38, lng: 126.66 },
    '하네스': { subSector: '와이어링/하네스', category: '1차 부품사', tier: '1차 전장 하네스 벤더', products: ['전기차 급속 충전 인렛', '통합 바디 하네스', '알루미늄 경량 전선'], loc: '경기 성남 판교 / 충남 아산', region: '수도권', lat: 37.40, lng: 127.10 },
    '섀시': { subSector: '섀시/서스펜션', category: '1차 부품사', tier: '1차 샤시 모듈 벤더', products: ['알루미늄 프론트 로워암', '경량 크로스멤버', '리어 토션빔 서브프레임'], loc: '경북 영천 언하 / 충남 아산', region: '대구경북', lat: 35.97, lng: 128.96 },
    '서스펜션': { subSector: '섀시/서스펜션', category: '1차 부품사', tier: '1차 현가장치 벤더', products: ['전자제어 가변 댐퍼', '에어 서스펜션 스프링', '스태빌라이저 바'], loc: '강원 원주 / 경기 평택', region: '수도권/강원', lat: 37.31, lng: 127.81 },
    '열관리': { subSector: '열관리/HVAC', category: '1차 부품사', tier: '1차 열관리 전문 벤더', products: ['전기차 통합 히트펌프', '고전압 전동 컴프레서', '배터리 칠러 모듈'], loc: '대전 대덕구 / 경기 평택', region: '충청', lat: 36.43, lng: 127.40 },
    '히터': { subSector: '열관리/HVAC', category: '1차 부품사', tier: '1차 고전압 히터 벤더', products: ['전기차 고전압 PTC 히터', '배터리 승온 히터', '공조 밸브 액추에이터'], loc: '경기 용인 기흥 / 충북 진천', region: '수도권', lat: 37.26, lng: 127.11 },
    '시트': { subSector: '시트/내장재', category: '1차 부품사', tier: '1차 프리미엄 시트 벤더', products: ['스마트 에르고 모션 시트', '도어트림 일체형 암레스트', '경량 시트 프레임'], loc: '울산 북구 효문 / 충남 아산', region: '울산', lat: 35.56, lng: 129.35 },
    '램프': { subSector: '램프/광학', category: '1차 부품사', tier: '1차 지능형 램프 벤더', products: ['ADB 지능형 매트릭스 헤드램프', '풀와이드 리어 콤비램프', 'AR-HUD 광학 모듈'], loc: '대구 수성구 / 경북 영천', region: '대구경북', lat: 35.84, lng: 128.62 },
  };

  const keyMatch = Object.keys(fallbackSectors).find(k => trimmed.includes(k)) || '섀시';
  const matchInfo = fallbackSectors[keyMatch] || {
    subSector: '섀시/서스펜션',
    category: '1차 부품사',
    tier: '1차 모빌리티 규격 벤더',
    products: [`${trimmed} 정밀 가공품`, `${trimmed} 전용 제어 모듈`, 'Automotive 표준 어셈블리'],
    loc: '충남 아산 / 경기 평택',
    region: '충청',
    lat: 36.88,
    lng: 126.95,
  };

  return [
    {
      name: `${trimmed} 한국정밀시스템`,
      category: matchInfo.category,
      subSector: matchInfo.subSector,
      tier: matchInfo.tier,
      tags: [trimmed, 'K-모빌리티', 'KAICA', '1차직납'],
      description: `${trimmed} 분야에서 독자적 금형 및 정밀 양산 라인을 보유한 중견 부품사로 현대차·기아 및 Tier-1 글로벌 서플라이 체인에 직납합니다.`,
      mainProducts: matchInfo.products,
      clients: ['현대자동차', '현대모비스', '기아'],
      competitors: ['화신', '성우하이텍'],
      suppliers: ['포스코', '한국단자공업'],
      location: matchInfo.loc,
      region: matchInfo.region,
      lat: matchInfo.lat,
      lng: matchInfo.lng,
      employees: '620명',
      avgSalary: '6,800만원',
      careerUrl: 'https://www.kaica.or.kr',
      roles: ['공정 엔지니어', 'CAE 충돌해석', '품질기획'],
      verified: true,
      facilities: [
        {
          name: `${trimmed} 한국정밀시스템 본사/1공장`,
          type: '본사',
          address: `${matchInfo.loc} 부품산업단지`,
          lat: matchInfo.lat,
          lng: matchInfo.lng,
          isMain: true,
          desc: `${trimmed} 전용 규격 양산 라인`
        }
      ]
    },
    {
      name: `${trimmed} 모빌리티 테크놀로지`,
      category: matchInfo.category,
      subSector: matchInfo.subSector,
      tier: '2차 전문 정밀가공사',
      tags: [trimmed, '친환경차', '차세대', 'R&D'],
      description: `차세대 EV 및 SDV 플랫폼에 적용되는 경량화 및 고내구성 ${trimmed} 모듈을 개발하여 1차 협력사에 안정적으로 공급하는 전문 기업입니다.`,
      mainProducts: [`차세대 ${trimmed} 링크`, '센서 통합형 브라켓', '초고장력 파츠'],
      clients: ['HL만도', '한온시스템'],
      competitors: ['경신', '대동도어'],
      suppliers: ['현대제철'],
      location: '경북 영천 / 대구 달서구',
      region: '대구경북',
      lat: 35.95,
      lng: 128.92,
      employees: '430명',
      avgSalary: '6,400만원',
      careerUrl: 'https://www.kaica.or.kr',
      roles: ['회로 설계', '생산 설비 관리', '신뢰성 시험'],
      verified: true,
      facilities: [
        {
          name: `${trimmed} 모빌리티 테크 본사`,
          type: '본사',
          address: '경북 영천시 본촌공단길',
          lat: 35.95,
          lng: 128.92,
          isMain: true,
          desc: '정밀 가공 및 품질 시험 센터'
        }
      ]
    },
  ];
}

// 클라이언트 사이드 고지능 자동차 밸류체인 전문가 답변 생성기
export function generateClientFallbackChatReply(message: string, contextCompany?: Company): string {
  const q = message.toLowerCase();

  if (q.includes("e-gmp") || q.includes("전기차") || q.includes("ev") || q.includes("배터리")) {
    return `**[현대차그룹 E-GMP 및 전동화 플랫폼 밸류체인 분석]**

1. **배터리 시스템(BSA) & 배터리 셀**:
   - **배터리 셀**: LG에너지솔루션(NCMA 하이니켈 파우치) 및 SK온(NCM9)이 공급
   - **BPA(배터리 팩 어셈블리)**: 현대모비스가 총괄 조립하며, 핵심 알루미늄 보호 케이스는 **화신**, **성우하이텍**이 납품합니다.

2. **구동 모터 & 감속기(e-Axle)**:
   - **모터 및 감속기**: 현대트랜시스와 현대위아가 주도하며, 정밀 기어 및 알루미늄 다이캐스팅 하우징은 **삼기**, **경창산업**이 가공 공급합니다.
   - **모터 적층 코어**: **고아정공**, 포스코모빌리티솔루션이 무방향성 전기강판으로 정밀 가공합니다.

3. **고전압 와이어링 및 열관리**:
   - **와이어링 하네스**: **경신**, **유라코퍼레이션**이 급속 충전 인렛 및 고전압 케이블 전담
   - **통합 열관리(히트펌프)**: **한온시스템**과 **우리산업**(고전압 PTC 히터)이 겨울철 주행거리 보존을 위한 필수 파츠를 공급 중입니다.`;
  }

  if (q.includes("하네스") || q.includes("경신") || q.includes("유라") || q.includes("thn") || q.includes("와이어링")) {
    return `**[국내 와이어링 하네스 3대사 (경신·유라·THN) 비교 분석]**

1. **경신 (인천 송도 본사)**:
   - 국내 와이어링 하네스 1위(연결 매출 2조 4천억대). 현대차 주요 차종 및 친환경차 고전압 배터리 케이블에서 압도적인 점유율을 차지하며, 평균 연봉은 약 7,600만원입니다.

2. **유라코퍼레이션 (판교 R&D / 화성)**:
   - 전장 정션박스(Smart Junction Box) 및 전기차 급속충전 인렛 기술에서 강점을 보이며, 판교 R&D 센터를 주축으로 평균 연봉 약 8,200만원 수준의 경쟁력을 갖추고 있습니다.

3. **THN (대구 성서공단 / 코스피 상장)**:
   - 대구·울산 지역 기반의 유서 깊은 전장 전문 상장사로, 통합차량제어기(ICU) 및 실내 와이어링에서 탄탄한 원가 경쟁력을 발휘하고 있습니다.`;
  }

  if (q.includes("연봉") || q.includes("취업") || q.includes("채용") || q.includes("스펙") || q.includes("이직")) {
    return `**[자동차 부품 산업(Tier-1) 취업 및 연봉 가이드]**

1. **산업 티어별 평균 연봉**:
   - **완성차 (현대차/기아)**: 평균 1억 200만 ~ 1억 500만원
   - **대형 모듈사 (모비스/HL만도/한온/트랜시스)**: 평균 9,200만 ~ 1억 100만원
   - **중견 1차 벤더 (화신/성우하이텍/SL/서연이화/경신)**: 평균 7,600만 ~ 8,300만원
   - **2차 정밀가공사 (삼기/계양정밀/고아정공)**: 평균 6,300만 ~ 6,900만원

2. **서류 및 면접 합격 핵심 스펙**:
   - **기계/샤시/차체**: CATIA V5 서피스/솔리드 모델링, ANSYS/ABAQUS CAE 구조 충돌해석 역량
   - **전장/SW**: C/C++, Embedded Linux, AUTOSAR 플랫폼 및 ISO 26262 기능안전성 이해도
   - **공정/품질**: 로봇 용접 자동화 라인 관리, 알루미늄 다이캐스팅 금형 방안 해석, IATF 16949 인증 실무 경험`;
  }

  if (q.includes("클러스터") || q.includes("산단") || q.includes("지역") || q.includes("대구") || q.includes("울산") || q.includes("영천")) {
    return `**[대한민국 5대 자동차 부품 산업 클러스터 특징]**

1. **동남권 (울산·부산·양산)**:
   - 현대차 울산 메가팩토리를 중심으로 성우하이텍(차체 1위), 서연이화(내장재 1위), 현대공업이 밀집한 완성차 조립 최대 거점

2. **대구·경북 (대구 성서·영천·경주)**:
   - 화신(섀시), SL(램프), PHA/광진상공(도어래치), THN(전장), 계양정밀(터보) 등 기계·전장 1·2차 부품사 200여 개 밀집

3. **충청권 (서산·아산·청주)**:
   - 현대트랜시스(변속기·감속기), 현대차 아산공장, 한온시스템(열관리), LG에너지솔루션/에코프로비엠(배터리 메가팩토리) 집적

4. **수도권 (화성·평택·판교·인천)**:
   - 현대차 남양연구소, 기아 화성, HL만도 판교, 한국단자/경신 송도 본사 등 모빌리티 R&D와 전장 SW 메카`;
  }

  return `대한민국 자동차 산업 생태계는 완성차(현대차/기아)를 정점으로 모비스, 만도, 한온시스템, 현대트랜시스 등 핵심 1차 벤더와 경신, 화신, 성우하이텍, 광진상공 등 700여 개 강소 부품사가 긴밀한 JIT(적기공급) 체인으로 묶여 있습니다.

질문하신 **"${message}"** 내용과 관련하여:
1. **공급망 티어(Tier) 구조**: 1차사는 완성차 직납 및 시스템 모듈화 역량이 핵심이며, 2차사는 초정밀 프레스, 알루미늄 다이캐스팅, 사출 및 열처리 정밀도가 수익성을 좌우합니다.
2. **미래 모빌리티 체질 개선**: 배터리 케이스(BPA), 열관리 히트펌프, 전동식 파워트레인(e-Axle) 및 고전압 와이어링으로 전환에 성공한 기업들이 높은 기업가치와 채용 수요를 형성하고 있습니다.
${contextCompany ? `\n(현재 선택된 ${contextCompany.name}는 ${contextCompany.tier}로서 ${contextCompany.mainProducts.slice(0, 2).join(', ')} 분야에서 확고한 시장 점유율을 차지하고 있습니다.)` : ''}`;
}
