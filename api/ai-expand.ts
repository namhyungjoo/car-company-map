import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  try {
    // CORS & JSON headers
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed', message: 'POST method required' });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    } else if (Buffer.isBuffer(body)) {
      try {
        body = JSON.parse(body.toString('utf-8'));
      } catch {
        body = {};
      }
    }

    const query = body?.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Bad Request', message: '검색어(query) 파라미터가 필요합니다.' });
    }

    const trimmed = query.trim();

    // 1. Try Gemini API if GEMINI_API_KEY is available in server environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `당신은 대한민국 자동차 및 모빌리티 산업 밸류체인(KAICA 한국자동차산업협동조합, DART 전자공시) 전문 산업 분석가입니다.
사용자 검색어: "${trimmed}"

[중요 제약조건]:
- 반드시 한국 증시(KOSPI/KOSDAQ) 상장사, KAICA 정회원사, 국가산업단지 입주사 등 실제로 실존하는 대한민국 정식 법인 부품사만 반환해야 합니다.
- 임의의 가상 회사명(예: ~시스템, ~오토텍 합성)을 절대 지어내지 마십시오.
- 일치하는 실존 기업이 없으면 빈 배열 []을 반환하십시오.

응답 형식 (순수 JSON Array):
[
  {
    "name": "공식 실존 법인명",
    "category": "완성차 | 1차 부품사 | 2차 부품사 | 전장·SW | 소재 | 배터리 | 자율주행 중 하나",
    "subSector": "섀시/서스펜션 | 와이어링/하네스 | 도어/창문/메커니즘 | 열관리/HVAC | 변속기/파워트레인 | 차체/프레스/핫스탬핑 | 시트/내장재 | 램프/광학 | 배터리셀/팩 | 양극재/음극재/소재 | 차량용 반도체/MCU | 차량OS/임베디드SW 중 하나",
    "tier": "예: 현대차 1차 샤시 벤더, 2차 정밀가공사",
    "tags": ["태그1", "태그2", "${trimmed}"],
    "description": "실제 자동차 부품/시스템 납품 내역 및 기술 경쟁력 2문장",
    "mainProducts": ["주요부품1", "주요부품2"],
    "clients": ["고객사1 (예: 현대자동차)", "고객사2"],
    "competitors": ["실제 경쟁사1", "경쟁사2"],
    "suppliers": ["원소재/가공 협력사"],
    "location": "실제 본사 또는 주요 공장 소재지",
    "employees": "인원수",
    "avgSalary": "평균연봉",
    "careerUrl": "공식 웹사이트 URL",
    "roles": ["주요 채용 직무"]
  }
]`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        });

        const text = response.text || '';
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return res.status(200).json({ companies: parsed, source: 'gemini' });
        }
      } catch (apiError: any) {
        console.warn('[Serverless AI Warning] Gemini API unavailable or quota limit:', apiError?.status || apiError?.message || 'Unknown error');
      }
    }

    // 2. 가짜 회사를 임의로 합성하지 않고, 실존 기업 풀에서 매칭하거나 빈 배열 반환
    return res.status(200).json({ companies: [], source: 'fallback' });
  } catch (error: any) {
    console.error('[Serverless Fatal Catch] ai-expand error:', error?.message || 'Server error');
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: '요청을 처리하는 중 서버 오류가 발생했습니다.' 
    });
  }
}
