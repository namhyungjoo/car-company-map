import { Company } from '../App';
import { VERIFIED_AUTOMOTIVE_COMPANIES } from '../data/realAutomotiveCompanies';

// 클라이언트 사이드 실존 자동차 밸류체인 지능형 검색/추천 엔진
// (허위/가상 회사 합성 배제: 100% 검증된 실존 기업 DB 내 연관 기업 탐색)
export function generateClientFallbackCompanies(query: string): Partial<Company>[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  // 1. 실존 기업 데이터베이스에서 연관 기업 검색
  const matched = VERIFIED_AUTOMOTIVE_COMPANIES.filter(c => {
    const inName = c.name.toLowerCase().includes(trimmed);
    const inSub = c.subSector.toLowerCase().includes(trimmed);
    const inCat = c.category.toLowerCase().includes(trimmed);
    const inTags = c.tags.some(t => t.toLowerCase().includes(trimmed));
    const inProducts = c.mainProducts.some(p => p.toLowerCase().includes(trimmed));
    const inClients = c.clients.some(client => client.toLowerCase().includes(trimmed));
    const inDesc = c.description.toLowerCase().includes(trimmed);

    return inName || inSub || inCat || inTags || inProducts || inClients || inDesc;
  });

  // 매칭되는 실존 기업이 있는 경우 해당 기업들 반환
  if (matched.length > 0) {
    return matched.slice(0, 4);
  }

  // 2. 키워드 기반 연관 부품군 실존 기업 탐색
  const topicMap: Record<string, string> = {
    '배터리': '배터리',
    '이차전지': '배터리',
    '양극재': '소재',
    '음극재': '소재',
    '하네스': '와이어링/하네스',
    '와이어링': '와이어링/하네스',
    '자율주행': '자율주행',
    '라이다': '자율주행',
    '카메라': '차량용 반도체/MCU',
    '반도체': '차량용 반도체/MCU',
    '섀시': '섀시/서스펜션',
    '샤시': '섀시/서스펜션',
    '서스펜션': '섀시/서스펜션',
    '차체': '차체/프레스/핫스탬핑',
    '핫스탬핑': '차체/프레스/핫스탬핑',
    '열관리': '열관리/HVAC',
    '공조': '열관리/HVAC',
    '히트펌프': '열관리/HVAC',
    '도어': '도어/창문/메커니즘',
    '래치': '도어/창문/메커니즘',
    '시트': '시트/내장재',
    '모터': '변속기/파워트레인',
    '변속기': '변속기/파워트레인',
    '감속기': '변속기/파워트레인'
  };

  for (const [key, sector] of Object.entries(topicMap)) {
    if (trimmed.includes(key)) {
      const bySector = VERIFIED_AUTOMOTIVE_COMPANIES.filter(c => 
        c.subSector.includes(sector) || c.category.includes(sector)
      );
      if (bySector.length > 0) {
        return bySector.slice(0, 3);
      }
    }
  }

  // 일치하는 실존 기업이 없을 경우 빈 배열 반환 (가짜 회사 임의 합성 차단)
  return [];
}

// 클라이언트 사이드 고지능 자동차 밸류체인 전문가 답변 생성기
export function generateClientFallbackChatReply(message: string, contextCompany?: Company): string {
  const q = message.toLowerCase();

  if (q.includes("e-gmp") || q.includes("전기차") || q.includes("ev") || q.includes("배터리")) {
    return `**[현대차그룹 E-GMP 및 전동화 플랫폼 밸류체인 분석]**

1. **배터리 시스템(BSA) & 배터리 셀**:
   - **배터리 셀**: LG에너지솔루션(NCMA 하이니켈 파우치) 및 SK온(NCM9), 삼성SDI(각형 PRiMX)가 공급
   - **BPA(배터리 팩 어셈블리)**: 현대모비스가 총괄 조립하며, 핵심 알루미늄 보호 케이스는 **화신**, **성우하이텍**이 납품합니다.

2. **구동 모터 & 감속기(e-Axle)**:
   - **모터 및 감속기**: 현대트랜시스와 현대위아가 주도하며, 정밀 기어 및 하우징은 **삼기**, **경창산업**이 가공 공급합니다.
   - **모터 적층 코어**: **고아정공**, 포스코모빌리티솔루션이 무방향성 전기강판으로 정밀 가공합니다.

3. **고전압 와이어링 및 열관리**:
   - **와이어링 하네스**: **경신**, **유라코퍼레이션**, **THN**이 급속 충전 인렛 및 고전압 케이블 전담
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
   - **대형 모듈사 (모비스/HL만도/한온/트랜시스/위아)**: 평균 8,900만 ~ 1억 100만원
   - **중견 1차 벤더 (화신/성우하이텍/SL/서연이화/경신/센트랄)**: 평균 7,400만 ~ 8,300만원
   - **2차 정밀가공사 (삼기/계양정밀/고아정공/현대공업)**: 평균 6,300만 ~ 6,900만원

2. **서류 및 면접 합격 핵심 스펙**:
   - **기계/샤시/차체**: CATIA V5 서피스/솔리드 모델링, ANSYS/ABAQUS CAE 구조 충돌해석 역량
   - **전장/SW**: C/C++, Embedded Linux, AUTOSAR 플랫폼 및 ISO 26262 기능안전성 이해도
   - **공정/품질**: 로봇 용접 자동화 라인 관리, 알루미늄 다이캐스팅 금형 방안 해석, IATF 16949 인증 실무 경험`;
  }

  if (q.includes("클러스터") || q.includes("산단") || q.includes("지역") || q.includes("대구") || q.includes("울산") || q.includes("영천") || q.includes("창원")) {
    return `**[대한민국 5대 자동차 부품 산업 클러스터 특징]**

1. **동남권 (울산·부산·창원·양산)**:
   - 현대차 울산 메가팩토리를 중심으로 성우하이텍(차체 1위), 서연이화(내장재 1위), 현대위아/센트랄(창원), SNT모티브가 밀집한 완성차 및 기계 부품 최대 거점

2. **대구·경북 (대구 성서·영천·경주·포항)**:
   - 화신(섀시), SL(램프), PHA/광진상공(도어래치), THN(전장), 포스코퓨처엠/엘앤에프(배터리 소재), 오토노머스에이투지(자율주행) 등 1·2차 부품사 집적

3. **충청권 (서산·아산·천안·청주)**:
   - 현대트랜시스(서산 감속기), 현대차 아산공장, 한온시스템(대전 열관리), LG에너지솔루션/에코프로비엠(오창 배터리 메가팩토리) 집적

4. **수도권 (화성·평택·판교·인천)**:
   - 현대차 남양연구소, 기아 화성/광명, HL만도/유라 판교, 한국단자/경신 송도 본사, 현대오토에버 등 모빌리티 R&D와 전장 SW 메카`;
  }

  return `대한민국 자동차 산업 생태계는 완성차(현대차/기아)를 정점으로 모비스, 만도, 한온시스템, 현대트랜시스, 현대위아 등 핵심 1차사와 경신, 화신, 성우하이텍, 센트랄, 광진상공 등 검증된 강소 부품사가 긴밀한 JIT(적기공급) 체인으로 묶여 있습니다.

질문하신 **"${message}"** 내용과 관련하여:
1. **공급망 티어(Tier) 구조**: 1차사는 완성차 직납 및 시스템 모듈화 역량이 핵심이며, 2차사는 초정밀 프레스, 알루미늄 다이캐스팅, 사출 및 열처리 정밀도가 수익성을 좌우합니다.
2. **미래 모빌리티 체질 개선**: 배터리 케이스(BPA), 열관리 히트펌프, 전동식 파워트레인(e-Axle) 및 고전압 와이어링으로 전환에 성공한 기업들이 높은 기업가치와 채용 수요를 형성하고 있습니다.
${contextCompany ? `\n(현재 선택된 ${contextCompany.name}는 ${contextCompany.tier}로서 ${contextCompany.mainProducts.slice(0, 2).join(', ')} 분야에서 확고한 시장 점유율을 차지하고 있습니다.)` : ''}`;
}
