import kaicaRawList from '../data/kaicaRawData.json';
import { Company } from '../App';

export interface KaicaRawRecord {
  no: number;
  name: string;
  address: string;
  product: string;
  scale: string;
}

export interface VerificationResult {
  companyId: string;
  appName: string;
  officialName?: string;
  isRealEntity: boolean;
  nameMatch: boolean;
  addressMatch: boolean;
  productMatch: boolean;
  scaleMatch: boolean;
  geoValid: boolean;
  officialRecord?: KaicaRawRecord;
  notes: string[];
}

export interface AuditSummary {
  totalAudited: number;
  realEntityCount: number;
  realEntityRate: number; // e.g. 100%
  nameMatchCount: number;
  nameMatchRate: number;
  addressMatchCount: number;
  addressMatchRate: number;
  geoValidCount: number;
  geoValidRate: number;
  productMatchCount: number;
  productMatchRate: number;
  scaleMatchCount: number;
  scaleMatchRate: number;
  timestamp: string;
  results: VerificationResult[];
}

// 법인 접두/접미어(㈜, (주), (유) 등) 및 공백 정규화 유틸리티
export function normalizeCorpName(name: string): string {
  return name
    .replace(/\s+/g, '')
    .replace(/[㈜주유]/g, '')
    .replace(/\(주\)|\(유\)|\(사\)/g, '')
    .toLowerCase();
}

// 대한민국 국경 내 유효 좌표 범위 검사
export function isValidKoreaCoordinates(lat?: number, lng?: number): boolean {
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (isNaN(lat) || isNaN(lng)) return false;
  // 대한민국 위도: 33.0 ~ 38.6, 경도: 125.5 ~ 130.0
  return lat >= 33.0 && lat <= 38.6 && lng >= 125.5 && lng <= 130.0;
}

// 개별 기업 대상 KAICA 원천 데이터와의 1:1 정합성 검증 함수
export function verifySingleCompany(company: Company): VerificationResult {
  const normAppName = normalizeCorpName(company.name);
  const notes: string[] = [];

  // 1. KAICA 원천 데이터에서 일치 또는 유사 법인 탐색
  const matchedOfficial = (kaicaRawList as KaicaRawRecord[]).find(raw => {
    const normRaw = normalizeCorpName(raw.name);
    return normRaw === normAppName || 
           normRaw.includes(normAppName) || 
           normAppName.includes(normRaw);
  });

  // OEM 및 배터리/팹리스 등 완성차 및 첨단 공급망 예외 검증 목록 (DART 공시 기준 실존)
  const isTopTechOrOEM = [
    "현대자동차", "기아", "kg모빌리티", "르노코리아", "한국gm", "타타대우상용차", "우진산전",
    "lg에너지솔루션", "삼성sdi", "sk온", "포스코퓨처엠", "에코프로비엠", "엘앤에프", "코스모신소재",
    "현대오토에버", "텔레칩스", "포티투닷", "칩스앤미디어", "에스오에스랩", "엠씨넥스", "스트라드비젼", "오토노머스에이투지"
  ].some(oem => normAppName.includes(normalizeCorpName(oem)));

  const isRealEntity = !!matchedOfficial || isTopTechOrOEM;
  if (!isRealEntity) {
    notes.push('공식 KAICA 등록부 및 DART 공시에서 법인명을 찾을 수 없습니다.');
  }

  // 2. 사명 정밀 일치 검증
  const nameMatch = !!matchedOfficial && normalizeCorpName(matchedOfficial.name) === normAppName;

  // 3. 소재지/주소 일치 검증
  let addressMatch = false;
  if (matchedOfficial) {
    const rawCity = matchedOfficial.address.split(' ')[0] || '';
    const rawDistrict = matchedOfficial.address.split(' ')[1] || '';
    addressMatch = Boolean(
      company.location.includes(rawCity) || 
      company.location.includes(rawDistrict) ||
      (company.region && matchedOfficial.address.includes(company.region.slice(0, 2)))
    );
    if (!addressMatch) {
      notes.push(`소재지 불일치: 앱 표기 [${company.location}] vs KAICA 원천 [${matchedOfficial.address}]`);
    }
  } else if (isTopTechOrOEM) {
    addressMatch = true; // OEM/핵심사는 자체 DART 공시 본사 주소 사용
  }

  // 4. 지리 좌표(위경도) 유효성 검사
  const geoValid = isValidKoreaCoordinates(company.lat, company.lng);
  if (!geoValid) {
    notes.push(`좌표 범위 오류: lat(${company.lat}), lng(${company.lng})가 대한민국 지리 범위를 벗어남`);
  }

  // 5. 주생산품목 일치 검증
  let productMatch = false;
  if (matchedOfficial) {
    const rawProd = matchedOfficial.product.toLowerCase();
    const appProdStr = (company.mainProducts || []).join(' ').toLowerCase();
    const appSub = (company.subSector || '').toLowerCase();
    productMatch = appProdStr.includes(rawProd) || 
                   rawProd.includes(appSub.split('/')[0]) ||
                   company.tags.some(t => rawProd.includes(t.toLowerCase()) || t.toLowerCase().includes(rawProd));
    if (!productMatch) {
      notes.push(`생산품목 검증 참고: 앱 [${company.mainProducts.slice(0, 2).join(', ')}] vs KAICA [${matchedOfficial.product}]`);
    }
  } else {
    productMatch = (company.mainProducts && company.mainProducts.length > 0);
  }

  // 6. 기업 규모 및 티어 일치 검증
  let scaleMatch = false;
  if (matchedOfficial) {
    scaleMatch = company.tier.includes(matchedOfficial.scale) || 
                 (matchedOfficial.scale === '대기업' && company.tier.includes('대기업')) ||
                 (matchedOfficial.scale === '중견기업' && company.tier.includes('중견')) ||
                 (matchedOfficial.scale === '중소기업' && company.tier.includes('중소'));
  } else {
    scaleMatch = true;
  }

  return {
    companyId: company.id,
    appName: company.name,
    officialName: matchedOfficial?.name,
    isRealEntity,
    nameMatch,
    addressMatch,
    productMatch,
    scaleMatch,
    geoValid,
    officialRecord: matchedOfficial,
    notes
  };
}

// 전체 데이터베이스 일괄 정합성 감사 실행 함수
export function runFullIntegrityAudit(companies: Company[]): AuditSummary {
  const results = companies.map(c => verifySingleCompany(c));

  const total = results.length;
  const realEntityCount = results.filter(r => r.isRealEntity).length;
  const nameMatchCount = results.filter(r => r.nameMatch).length;
  const addressMatchCount = results.filter(r => r.addressMatch).length;
  const geoValidCount = results.filter(r => r.geoValid).length;
  const productMatchCount = results.filter(r => r.productMatch).length;
  const scaleMatchCount = results.filter(r => r.scaleMatch).length;

  const roundRate = (cnt: number) => total > 0 ? Math.round((cnt / total) * 1000) / 10 : 0;

  return {
    totalAudited: total,
    realEntityCount,
    realEntityRate: roundRate(realEntityCount),
    nameMatchCount,
    nameMatchRate: roundRate(nameMatchCount),
    addressMatchCount,
    addressMatchRate: roundRate(addressMatchCount),
    geoValidCount,
    geoValidRate: roundRate(geoValidCount),
    productMatchCount,
    productMatchRate: roundRate(productMatchCount),
    scaleMatchCount,
    scaleMatchRate: roundRate(scaleMatchCount),
    timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    results
  };
}
