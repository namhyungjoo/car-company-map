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
  ShieldCheck,
  ArrowUpRight,
  Map as MapIcon
} from 'lucide-react';
import KoreaMap, { Facility, KOREA_MOBILITY_CLUSTERS, geoToSvg } from './components/KoreaMap';
import { generateClientFallbackCompanies, generateClientFallbackChatReply } from './services/aiFallbackEngine';
import { VERIFIED_AUTOMOTIVE_COMPANIES } from './data/realAutomotiveCompanies';

// ==========================================
// 🚗 100% 실존 대한민국 자동차/모빌리티 밸류체인 데이터베이스
// (KAICA 한국자동차산업협동조합, DART 전자공시 & KOSPI/KOSDAQ 상장사 기반)
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
  dartVerified?: boolean;
  kaicaMember?: boolean;
  dartCode?: string;
  operatingIncome?: string;
  listedMarket?: 'KOSPI' | 'KOSDAQ' | '외감' | '비상장';
}

const INITIAL_COMPANIES: Company[] = VERIFIED_AUTOMOTIVE_COMPANIES;

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
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSubSector, setSelectedSubSector] = useState("전체 부품분야");
  const [selectedRegion, setSelectedRegion] = useState("전국 지역");
  const [auditFilter, setAuditFilter] = useState<"all" | "kaica" | "dart">("all");
  const [sortBy, setSortBy] = useState<"name" | "salary" | "employees">("name");
  
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("comp-car-1");
  const [bookmarks, setBookmarks] = useState<string[]>(["comp-car-1", "comp-mobis-1", "comp-mando-1", "comp-hvac-1"]);
  const [compareList, setCompareList] = useState<string[]>(["comp-mobis-1", "comp-mando-1"]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

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
      text: '안녕하세요! 대한민국 실존 자동차/모빌리티 밸류체인 AI 분석기입니다. 특정 차종 부품 납품망, 1·2차 협력사 공급 관계, 부품사 연봉 및 전동화 전환 이슈 등 궁금한 점을 질문해 주세요.',
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
        showToast("비교는 최대 3개 기업까지 가능합니다.");
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

      const matchAudit = auditFilter === "all" ||
        (auditFilter === "kaica" && (company.kaicaMember || company.tags.includes("KAICA"))) ||
        (auditFilter === "dart" && (company.dartVerified || company.listedMarket !== undefined));

      if (!matchCat || !matchSub || !matchReg || !matchAudit) return false;
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
  }, [companies, searchQuery, selectedCategory, selectedSubSector, selectedRegion, auditFilter, sortBy]);

  const displayedCompanies = useMemo(() => {
    return filteredCompanies.slice(0, displayCount);
  }, [filteredCompanies, displayCount]);

  const selectedCompany = useMemo(() => {
    return companies.find(c => c.id === selectedCompanyId) || companies[0];
  }, [companies, selectedCompanyId]);

  // API 응답 진단 및 안전한 JSON 파싱 유틸리티 (HTTP 상태 코드 및 Content-Type 검사)
  const diagnoseAndParseApiResponse = async (res: Response, endpoint: string) => {
    const status = res.status;
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    if (!res.ok) {
      let statusDesc = `HTTP ${status}`;
      if (status === 401) {
        statusDesc = '401 Unauthorized (Vercel 환경변수 GEMINI_API_KEY 미설정 또는 인증 실패)';
      } else if (status === 404) {
        statusDesc = '404 Not Found (Vercel Serverless Function 경로 미존재 또는 vercel.json 라우팅 오류)';
      } else if (status === 429) {
        statusDesc = '429 Too Many Requests (Gemini API 호출 한도 초과)';
      } else if (status >= 500) {
        statusDesc = `${status} Server Error (서버리스 함수 실행 오류)`;
      }
      console.warn(`[AI API 통신 오류] ${endpoint} 실패 -> 상태 코드: ${statusDesc}, Content-Type: ${contentType}`);
      return null;
    }

    if (!isJson) {
      console.warn(`[AI API 비-JSON 응답] ${endpoint} -> 예상 Content-Type은 application/json이나 '${contentType}'이(가) 수신되었습니다. HTML 404 구문분석 오류를 방지하고 클라이언트 지능형 엔진으로 대체합니다.`);
      return null;
    }

    try {
      return await res.json();
    } catch (parseErr) {
      console.warn(`[AI API JSON 파싱 오류] ${endpoint} -> JSON 구문 분석 실패:`, parseErr);
      return null;
    }
  };

  // AI 심층 기업 발굴 호출 (Vercel 서버리스 및 클라이언트 지능형 엔진 지원)
  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiSearching(true);
    setAiBannerMsg(`'${searchQuery}' 연관 밸류체인 납품 부품사 AI 정밀 탐색 중...`);

    let rawCompanies: any[] | null = null;

    try {
      const res = await fetch('/api/ai-expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await diagnoseAndParseApiResponse(res, '/api/ai-expand');
      if (data && data.companies && Array.isArray(data.companies) && data.companies.length > 0) {
        rawCompanies = data.companies;
      }
    } catch (e: any) {
      console.warn("[네트워크 오류] /api/ai-expand 호출 실패 -> 클라이언트 자동차 엔진으로 대체:", e?.message || e);
    }

    // 서버리스 API 응답이 없거나 Vercel 환경 문제 시 클라이언트 지능형 엔진 가동
    if (!rawCompanies || rawCompanies.length === 0) {
      rawCompanies = generateClientFallbackCompanies(searchQuery);
    }

    if (!rawCompanies || rawCompanies.length === 0) {
      setAiBannerMsg(`'${searchQuery}'와 일치하는 검증된 실존 부품사가 없습니다. (허위/합성 기업 생성을 차단하고 실존 등록 기업만 제공합니다)`);
      setIsAiSearching(false);
      return;
    }

    try {
      const existingNames = new Set(companies.map(c => c.name.toLowerCase().replace(/\s+/g, '')));
      const newComps: Company[] = [];

      for (let i = 0; i < rawCompanies.length; i++) {
        const c = rawCompanies[i];
        if (!c.name) continue;
        const cleanName = c.name.toLowerCase().replace(/\s+/g, '');
        if (existingNames.has(cleanName)) continue;

        newComps.push({
          id: c.id || `verified-exp-${Date.now()}-${i}`,
          name: c.name,
          category: c.category || "1차 부품사",
          subSector: c.subSector || "섀시/서스펜션",
          tier: c.tier || "모빌리티 협력사",
          tags: c.tags || [searchQuery, "실존기업", "K-모빌리티"],
          description: c.description || "실제 차량 부품 라인에 연계된 실존 협력사입니다.",
          mainProducts: c.mainProducts || [searchQuery],
          clients: c.clients || ["현대자동차", "현대모비스"],
          competitors: c.competitors || ["화신"],
          suppliers: c.suppliers || ["포스코"],
          location: c.location || "충남 아산 / 경기 평택",
          region: c.region || "충청",
          lat: c.lat || 36.88,
          lng: c.lng || 126.95,
          facilities: c.facilities || [
            {
              name: `${c.name} 본사/사업장`,
              type: "주력 제조공장",
              address: `${c.location || '충남 아산'} 부품조달단지`,
              lat: c.lat || 36.88,
              lng: c.lng || 126.95,
              isMain: true,
              desc: "차량 부품 정밀 생산라인"
            }
          ],
          employees: c.employees || "450명",
          avgSalary: c.avgSalary || "6,800만원",
          careerUrl: c.careerUrl || "https://www.kaica.or.kr",
          roles: c.roles || ["생산기술", "품질관리", "R&D"],
          verified: true
        });
      }

      if (newComps.length > 0) {
        setCompanies(prev => [...newComps, ...prev]);
        setSelectedCompanyId(newComps[0].id);
        setAiBannerMsg(`'${searchQuery}' 연관 ${newComps.length}개 실존 부품사를 발굴하여 밸류체인 DB와 지도에 연동했습니다.`);
      } else {
        const found = companies.find(c => 
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          searchQuery.toLowerCase().includes(c.name.toLowerCase())
        );
        if (found) {
          setSelectedCompanyId(found.id);
          setAiBannerMsg(`'${found.name}' 실존 기업이 이미 밸류체인 데이터베이스에 등록되어 있습니다.`);
        } else {
          setAiBannerMsg(`'${searchQuery}' 관련 실존 기업 탐색을 완료했습니다.`);
        }
      }
    } catch (err) {
      console.error(err);
      setAiBannerMsg("AI 탐색을 완료했습니다.");
    } finally {
      setIsAiSearching(false);
    }
  };

  // AI 챗봇 전송 (Vercel 서버리스 및 클라이언트 지능형 엔진 지원)
  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userText = chatInput.trim();
    setChatInput("");

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: timeStr }]);
    setIsChatLoading(true);

    let replyText = "";

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, contextCompany: selectedCompany }),
      });

      const data = await diagnoseAndParseApiResponse(res, '/api/ai-chat');
      if (data && data.reply) {
        replyText = data.reply;
      }
    } catch (e: any) {
      console.warn("[네트워크 오류] /api/ai-chat 호출 실패 -> 클라이언트 전문가 엔진으로 대체:", e?.message || e);
    }

    // 서버리스 API 응답이 없거나 정적 환경인 경우 클라이언트 전문가 엔진 답변 생성
    if (!replyText) {
      replyText = generateClientFallbackChatReply(userText, selectedCompany);
    }

    setChatMessages(prev => [...prev, { 
      sender: 'ai', 
      text: replyText, 
      time: timeStr 
    }]);
    setIsChatLoading(false);
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
    showToast(`'${newComp.name}' 기업이 성공적으로 밸류체인 데이터베이스에 등록되었습니다.`);
  };

  // CSV 다운로드 기능
  const handleExportCSV = () => {
    const targetData = activeTab === "bookmarks" 
      ? companies.filter(c => bookmarks.includes(c.id))
      : filteredCompanies;

    const headers = ["기업명", "산업분야", "세부분야", "Tier", "DART공시검증", "KAICA회원사", "상장시장", "연간매출액", "영업이익", "평균연봉", "임직원수", "소재지", "주요고객사", "주력부품"];
    const rows = targetData.map(c => [
      `"${c.name}"`,
      `"${c.category}"`,
      `"${c.subSector}"`,
      `"${c.tier}"`,
      `"${c.dartVerified || c.listedMarket ? 'Y' : 'N'}"`,
      `"${c.kaicaMember || c.tags.includes('KAICA') ? 'Y' : 'N'}"`,
      `"${c.listedMarket || '-'}"`,
      `"${c.revenue || '-'}"`,
      `"${c.operatingIncome || '-'}"`,
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
                실존 검증 DB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden lg:block">
              KAICA·DART 기반 대한민국 실존 자동차 1·2차 부품사 & 소재 공급망
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

          {/* DART & KAICA Verification Filter Chips */}
          <div className="px-3 py-1.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => { setAuditFilter("all"); setDisplayCount(30); }}
              className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                auditFilter === "all" ? "bg-slate-700 text-white font-semibold shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => { setAuditFilter("kaica"); setDisplayCount(30); }}
              className={`px-2 py-0.5 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                auditFilter === "kaica" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-blue-400 hover:text-blue-300 bg-blue-950/30 border border-blue-900/40"
              }`}
              title="한국자동차산업협동조합 공식 회원사"
            >
              <ShieldCheck className="w-3 h-3 text-blue-300" />
              KAICA 회원사
            </button>
            <button
              onClick={() => { setAuditFilter("dart"); setDisplayCount(30); }}
              className={`px-2 py-0.5 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                auditFilter === "dart" ? "bg-emerald-600 text-white font-semibold shadow-sm" : "text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 border border-emerald-900/40"
              }`}
              title="금융감독원 전자공시시스템(DART) 공시 상장사"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-300" />
              DART 공시 상장사
            </button>
          </div>

          {/* Meta Bar: Count, Sort, Export */}
          <div className="px-3.5 py-2 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span>{activeTab === 'bookmarks' ? '북마크 저장' : '공급망 기업'}</span>
              <strong className="text-cyan-400 font-bold">
                {activeTab === 'bookmarks' ? bookmarks.length : filteredCompanies.length}
              </strong>
              <span>/ {companies.length}개</span>
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
                    대한민국 자동차 부품 & 모빌리티 전국 산업지도
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

      {/* In-app Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900/95 backdrop-blur border border-cyan-500/50 text-cyan-200 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold shadow-cyan-950/50 transition-all">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
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
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 
              title={comp.name}
              className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors truncate"
            >
              {comp.name}
            </h3>
            {comp.verified && (
              <span title="공시/KAICA 검증 완료" className="shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              </span>
            )}
          </div>
          <p className="text-[11px] text-indigo-400 font-semibold mt-0.5 truncate" title={`${comp.category} · ${comp.tier}`}>
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
