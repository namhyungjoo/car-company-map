import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI client if key exists
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// POST /api/ai-expand: 자동차 밸류체인 연관 기업 발굴
app.post('/api/ai-expand', async (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required' });
  }

  const trimmed = query.trim();

  // If Gemini API Key is configured, use Gemini
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const prompt = `당신은 대한민국 자동차 및 모빌리티 산업 밸류체인(KAICA 한국자동차산업협동조합, DART 전자공시) 전문 산업 분석가입니다.
사용자 검색어: "${trimmed}"

이 검색어와 직결되거나 해당 부품/소재/SW를 완성차 또는 상위 1차 벤더에 납품하는 실제 한국 중견·강소 부품사 2곳을 심층 발굴하여 아래 순수 JSON 형식으로 반환하세요.

응답 형식 (JSON Array):
[
  {
    "name": "정확한 실존 회사명",
    "category": "완성차 | 1차 부품사 | 2차 부품사 | 전장·SW | 소재 | 배터리 | 자율주행 | 정비·서비스 중 하나",
    "subSector": "섀시/서스펜션 | 와이어링/하네스 | 도어/창문/메커니즘 | 열관리/HVAC | 변속기/파워트레인 | 차체/프레스/핫스탬핑 | 시트/내장재 | 램프/광학 | 배터리셀/팩 | 양극재/음극재/소재 | 차량용 반도체/MCU | 차량OS/임베디드SW 중 하나",
    "tier": "예: 현대차 1차 샤시 벤더, 2차 정밀가공사, Tier-1 모빌리티 SW 파트너",
    "tags": ["태그1", "태그2", "${trimmed}"],
    "description": "실제 자동차 부품/시스템 납품 내역 및 기술 경쟁력 2문장",
    "mainProducts": ["주요부품1", "주요부품2", "주요부품3"],
    "clients": ["고객사1 (예: 현대자동차, 현대모비스)", "고객사2"],
    "competitors": ["동종 경쟁사1", "동종 경쟁사2"],
    "suppliers": ["원소재/가공 협력사1", "협력사2"],
    "location": "본사 또는 주요 공장 위치 (예: 경북 영천, 충남 아산, 울산 북구)",
    "employees": "인원수 (예: 850명)",
    "avgSalary": "평균연봉 (예: 7,200만원)",
    "careerUrl": "공식 웹사이트 또는 채용 URL",
    "roles": ["채용/주요 직무1", "직무2", "직무3"]
  }
]`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ companies: parsed, source: 'gemini' });
      }
    } catch (apiError) {
      console.error('Gemini API call error:', apiError);
    }
  }

  // 실존하지 않는 가상 회사 임의 합성을 차단하고 안전하게 빈 배열 반환
  res.json({ companies: [], source: 'fallback' });
});

// POST /api/ai-chat: 밸류체인 질의응답 분석기
app.post('/api/ai-chat', async (req: Request, res: Response) => {
  const { message, contextCompany } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `당신은 대한민국 700+ 자동차 부품 산업 밸류체인(완성차 OEM -> 현대모비스/HL만도/한온시스템 1차사 -> 2/3차 가공 협력사 -> 소재/반도체)을 꿰뚫고 있는 수석 자동차 산업 애널리스트입니다.
질문에 대해 신뢰성 높은 산업 통계, 주요 부품 공급 단가/품질 기준, 주요 플레이어 간 역학 관계, 취업/이직 시 고려해야 할 회사 경쟁력을 명확하고 전문적인 한국어로 답변해 주세요.`;

      const prompt = `[현재 선택된 기업 맥락]: ${contextCompany ? JSON.stringify(contextCompany) : '선택된 기업 없음'}
[사용자 질문]: ${message}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      return res.json({ reply: response.text || '답변을 생성하지 못했습니다.' });
    } catch (err) {
      console.error('Chat AI error:', err);
    }
  }

  // Fallback intelligent response
  res.json({
    reply: `대한민국 자동차 산업 생태계는 완성차(현대차/기아)를 정점으로 모비스, 만도, 한온시스템, 현대트랜시스 등 핵심 1차 벤더와 경신, 화신, 성우하이텍, 광진상공 등 700여 개 강소 부품사가 긴밀한 JIT(적기공급) 체인으로 묶여 있습니다.

질문하신 내용과 관련하여:
1. **공급망 티어(Tier)**: 1차사는 완성차 직납 및 모듈화 역량이 핵심이며, 2차사는 정밀 프레스, 알루미늄 다이캐스팅, 사출 및 열처리 기술이 수익성을 좌우합니다.
2. **미래 전동화 대응**: 배터리 케이스(BPA), 열관리 히트펌프, 전동식 파워트레인(e-Axle) 및 고전압 와이어링으로 빠르게 체질 개선을 이룬 기업들이 높은 기업가치와 연봉을 형성하고 있습니다.`,
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 K-Mobility Value Chain App running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
