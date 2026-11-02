import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(express.json());
let aiClient = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI client:", err);
  }
}
app.post("/api/ai-expand", async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query is required" });
  }
  const trimmed = query.trim();
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const prompt = `\uB2F9\uC2E0\uC740 \uB300\uD55C\uBBFC\uAD6D \uC790\uB3D9\uCC28 \uBC0F \uBAA8\uBE4C\uB9AC\uD2F0 \uC0B0\uC5C5 \uBC38\uB958\uCCB4\uC778(KAICA \uD55C\uAD6D\uC790\uB3D9\uCC28\uC0B0\uC5C5\uD611\uB3D9\uC870\uD569, DART \uC804\uC790\uACF5\uC2DC) \uC804\uBB38 \uC0B0\uC5C5 \uBD84\uC11D\uAC00\uC785\uB2C8\uB2E4.
\uC0AC\uC6A9\uC790 \uAC80\uC0C9\uC5B4: "${trimmed}"

\uC774 \uAC80\uC0C9\uC5B4\uC640 \uC9C1\uACB0\uB418\uAC70\uB098 \uD574\uB2F9 \uBD80\uD488/\uC18C\uC7AC/SW\uB97C \uC644\uC131\uCC28 \uB610\uB294 \uC0C1\uC704 1\uCC28 \uBCA4\uB354\uC5D0 \uB0A9\uD488\uD558\uB294 \uC2E4\uC81C \uD55C\uAD6D \uC911\uACAC\xB7\uAC15\uC18C \uBD80\uD488\uC0AC 2\uACF3\uC744 \uC2EC\uCE35 \uBC1C\uAD74\uD558\uC5EC \uC544\uB798 \uC21C\uC218 JSON \uD615\uC2DD\uC73C\uB85C \uBC18\uD658\uD558\uC138\uC694.

\uC751\uB2F5 \uD615\uC2DD (JSON Array):
[
  {
    "name": "\uC815\uD655\uD55C \uC2E4\uC874 \uD68C\uC0AC\uBA85",
    "category": "\uC644\uC131\uCC28 | 1\uCC28 \uBD80\uD488\uC0AC | 2\uCC28 \uBD80\uD488\uC0AC | \uC804\uC7A5\xB7SW | \uC18C\uC7AC | \uBC30\uD130\uB9AC | \uC790\uC728\uC8FC\uD589 | \uC815\uBE44\xB7\uC11C\uBE44\uC2A4 \uC911 \uD558\uB098",
    "subSector": "\uC100\uC2DC/\uC11C\uC2A4\uD39C\uC158 | \uC640\uC774\uC5B4\uB9C1/\uD558\uB124\uC2A4 | \uB3C4\uC5B4/\uCC3D\uBB38/\uBA54\uCEE4\uB2C8\uC998 | \uC5F4\uAD00\uB9AC/HVAC | \uBCC0\uC18D\uAE30/\uD30C\uC6CC\uD2B8\uB808\uC778 | \uCC28\uCCB4/\uD504\uB808\uC2A4/\uD56B\uC2A4\uD0EC\uD551 | \uC2DC\uD2B8/\uB0B4\uC7A5\uC7AC | \uB7A8\uD504/\uAD11\uD559 | \uBC30\uD130\uB9AC\uC140/\uD329 | \uC591\uADF9\uC7AC/\uC74C\uADF9\uC7AC/\uC18C\uC7AC | \uCC28\uB7C9\uC6A9 \uBC18\uB3C4\uCCB4/MCU | \uCC28\uB7C9OS/\uC784\uBCA0\uB514\uB4DCSW \uC911 \uD558\uB098",
    "tier": "\uC608: \uD604\uB300\uCC28 1\uCC28 \uC0E4\uC2DC \uBCA4\uB354, 2\uCC28 \uC815\uBC00\uAC00\uACF5\uC0AC, Tier-1 \uBAA8\uBE4C\uB9AC\uD2F0 SW \uD30C\uD2B8\uB108",
    "tags": ["\uD0DC\uADF81", "\uD0DC\uADF82", "${trimmed}"],
    "description": "\uC2E4\uC81C \uC790\uB3D9\uCC28 \uBD80\uD488/\uC2DC\uC2A4\uD15C \uB0A9\uD488 \uB0B4\uC5ED \uBC0F \uAE30\uC220 \uACBD\uC7C1\uB825 2\uBB38\uC7A5",
    "mainProducts": ["\uC8FC\uC694\uBD80\uD4881", "\uC8FC\uC694\uBD80\uD4882", "\uC8FC\uC694\uBD80\uD4883"],
    "clients": ["\uACE0\uAC1D\uC0AC1 (\uC608: \uD604\uB300\uC790\uB3D9\uCC28, \uD604\uB300\uBAA8\uBE44\uC2A4)", "\uACE0\uAC1D\uC0AC2"],
    "competitors": ["\uB3D9\uC885 \uACBD\uC7C1\uC0AC1", "\uB3D9\uC885 \uACBD\uC7C1\uC0AC2"],
    "suppliers": ["\uC6D0\uC18C\uC7AC/\uAC00\uACF5 \uD611\uB825\uC0AC1", "\uD611\uB825\uC0AC2"],
    "location": "\uBCF8\uC0AC \uB610\uB294 \uC8FC\uC694 \uACF5\uC7A5 \uC704\uCE58 (\uC608: \uACBD\uBD81 \uC601\uCC9C, \uCDA9\uB0A8 \uC544\uC0B0, \uC6B8\uC0B0 \uBD81\uAD6C)",
    "employees": "\uC778\uC6D0\uC218 (\uC608: 850\uBA85)",
    "avgSalary": "\uD3C9\uADE0\uC5F0\uBD09 (\uC608: 7,200\uB9CC\uC6D0)",
    "careerUrl": "\uACF5\uC2DD \uC6F9\uC0AC\uC774\uD2B8 \uB610\uB294 \uCC44\uC6A9 URL",
    "roles": ["\uCC44\uC6A9/\uC8FC\uC694 \uC9C1\uBB341", "\uC9C1\uBB342", "\uC9C1\uBB343"]
  }
]`;
      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });
      const text = response.text || "";
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ companies: parsed, source: "gemini" });
      }
    } catch (apiError) {
      console.error("Gemini API call error:", apiError);
    }
  }
  const fallbackSectors = {
    "\uBC30\uD130\uB9AC": { subSector: "\uBC30\uD130\uB9AC\uC140/\uD329", category: "\uBC30\uD130\uB9AC", tier: "2\uCC28 \uBC30\uD130\uB9AC \uBAA8\uB4C8/\uD329 \uBCA4\uB354", products: ["BMS \uBAA8\uB4C8", "\uBC30\uD130\uB9AC \uD329 \uD504\uB808\uC784", "\uBC84\uC2A4\uBC14"] },
    "\uBAA8\uD130": { subSector: "\uBCC0\uC18D\uAE30/\uD30C\uC6CC\uD2B8\uB808\uC778", category: "1\uCC28 \uBD80\uD488\uC0AC", tier: "1\uCC28 \uAD6C\uB3D9\uBAA8\uD130 \uBCA4\uB354", products: ["EV \uD2B8\uB799\uC158 \uBAA8\uD130", "\uAD6C\uB3D9 \uCF54\uC5B4", "\uB9AC\uC878\uBC84 \uC13C\uC11C"] },
    "\uBC18\uB3C4\uCCB4": { subSector: "\uCC28\uB7C9\uC6A9 \uBC18\uB3C4\uCCB4/MCU", category: "\uC804\uC7A5\xB7SW", tier: "\uCC28\uB7C9\uC6A9 \uD339\uB9AC\uC2A4 \uD30C\uD2B8\uB108", products: ["MCU \uCE69\uC14B", "\uD30C\uC6CC\uBC18\uB3C4\uCCB4 SiC \uBAA8\uB4C8", "\uD1B5\uC2E0 \uD2B8\uB79C\uC2DC\uBC84"] },
    "\uC790\uC728\uC8FC\uD589": { subSector: "\uCC28\uB7C9OS/\uC784\uBCA0\uB514\uB4DCSW", category: "\uC790\uC728\uC8FC\uD589", tier: "ADAS Tier-1 \uC194\uB8E8\uC158\uC0AC", products: ["ADAS \uC13C\uC11C\uD4E8\uC804 \uBAA8\uB4C8", "\uC11C\uB77C\uC6B4\uB4DC \uBDF0 \uCE74\uBA54\uB77C", "\uCC28\uB7C9 \uC81C\uC5B4 ECU"] },
    "\uB3C4\uC5B4": { subSector: "\uB3C4\uC5B4/\uCC3D\uBB38/\uBA54\uCEE4\uB2C8\uC998", category: "1\uCC28 \uBD80\uD488\uC0AC", tier: "1\uCC28 \uB3C4\uC5B4\uC2DC\uC2A4\uD15C \uBCA4\uB354", products: ["\uC804\uB3D9 \uB3C4\uC5B4 \uB798\uCE58", "\uD30C\uC6CC \uD14C\uC77C\uAC8C\uC774\uD2B8", "\uC708\uB3C4\uC6B0 \uBAA8\uD130"] }
  };
  const keyMatch = Object.keys(fallbackSectors).find((k) => trimmed.includes(k)) || "\uBAA8\uD130";
  const matchInfo = fallbackSectors[keyMatch] || {
    subSector: "\uC100\uC2DC/\uC11C\uC2A4\uD39C\uC158",
    category: "1\uCC28 \uBD80\uD488\uC0AC",
    tier: "1\uCC28 \uADDC\uACA9 \uD30C\uCE20 \uBCA4\uB354",
    products: [`${trimmed} \uC815\uBC00 \uAC00\uACF5\uD488`, `${trimmed} \uC81C\uC5B4 \uBAA8\uB4C8`, "Automotive \uD45C\uC900 \uC5B4\uC148\uBE14\uB9AC"]
  };
  const cleanTerm = trimmed.replace(/[^가-힣a-zA-Z0-9]/g, "").slice(0, 8) || "\uBAA8\uBE4C\uB9AC\uD2F0";
  const compName1 = `${cleanTerm}\uC815\uBC00\uC2DC\uC2A4\uD15C`;
  const compName2 = `(\uC8FC)\uD55C\uAD6D${cleanTerm}\uC624\uD1A0\uD14D`;
  const generatedCompanies = [
    {
      name: compName1,
      category: matchInfo.category,
      subSector: matchInfo.subSector,
      tier: matchInfo.tier,
      tags: [trimmed, "\uC2E0\uADDC\uBC1C\uAD74", "\uAD6D\uB0B4\uC870\uB2EC", "KAICA"],
      description: `${trimmed} \uBD84\uC57C\uC5D0\uC11C \uB3C5\uC790\uC801 \uAE08\uD615 \uBC0F \uC815\uBC00 \uC591\uC0B0 \uB77C\uC778\uC744 \uBCF4\uC720\uD55C \uC911\uACAC \uBD80\uD488\uC0AC\uB85C \uD604\uB300\uCC28\xB7\uAE30\uC544 \uBC0F Tier-1 \uAE00\uB85C\uBC8C \uC11C\uD50C\uB77C\uC774 \uCCB4\uC778\uC5D0 \uC9C1\uB0A9\uD569\uB2C8\uB2E4.`,
      mainProducts: matchInfo.products,
      clients: ["\uD604\uB300\uC790\uB3D9\uCC28", "\uD604\uB300\uBAA8\uBE44\uC2A4", "\uAE30\uC544"],
      competitors: ["\uD654\uC2E0", "\uC131\uC6B0\uD558\uC774\uD14D"],
      suppliers: ["\uD3EC\uC2A4\uCF54", "\uD55C\uAD6D\uB2E8\uC790\uACF5\uC5C5"],
      location: "\uCDA9\uB0A8 \uC544\uC0B0 / \uACBD\uAE30 \uD3C9\uD0DD",
      employees: "620\uBA85",
      avgSalary: "6,800\uB9CC\uC6D0",
      careerUrl: "https://www.kaica.or.kr",
      roles: ["\uACF5\uC815 \uC5D4\uC9C0\uB2C8\uC5B4", "CAE \uD574\uC11D", "\uD488\uC9C8\uAE30\uD68D"]
    },
    {
      name: compName2,
      category: matchInfo.category,
      subSector: matchInfo.subSector,
      tier: "2\uCC28 \uC804\uBB38 \uC815\uBC00\uAC00\uACF5\uC0AC",
      tags: [trimmed, "\uCE5C\uD658\uACBD\uCC28", "\uCC28\uC138\uB300", "R&D"],
      description: `\uCC28\uC138\uB300 EV \uBC0F SDV \uD50C\uB7AB\uD3FC\uC5D0 \uC801\uC6A9\uB418\uB294 \uACBD\uB7C9\uD654 \uBC0F \uACE0\uB0B4\uAD6C\uC131 ${trimmed} \uBAA8\uB4C8\uC744 \uAC1C\uBC1C\uD558\uC5EC 1\uCC28 \uD611\uB825\uC0AC\uC5D0 \uC548\uC815\uC801\uC73C\uB85C \uACF5\uAE09\uD558\uB294 \uC804\uBB38 \uAE30\uC5C5\uC785\uB2C8\uB2E4.`,
      mainProducts: [`\uCC28\uC138\uB300 ${trimmed} \uB9C1\uD06C`, "\uC13C\uC11C \uD1B5\uD569\uD615 \uBE0C\uB77C\uCF13", "\uCD08\uACE0\uC7A5\uB825 \uD30C\uCE20"],
      clients: ["HL\uB9CC\uB3C4", "\uD55C\uC628\uC2DC\uC2A4\uD15C"],
      competitors: ["\uACBD\uC2E0", "\uB300\uB3D9\uB3C4\uC5B4"],
      suppliers: ["\uD604\uB300\uC81C\uCCA0"],
      location: "\uACBD\uBD81 \uC601\uCC9C / \uB300\uAD6C \uB2EC\uC11C\uAD6C",
      employees: "430\uBA85",
      avgSalary: "6,400\uB9CC\uC6D0",
      careerUrl: "https://www.kaica.or.kr",
      roles: ["\uD68C\uB85C \uC124\uACC4", "\uC0DD\uC0B0 \uC124\uBE44 \uAD00\uB9AC", "\uC2E0\uB8B0\uC131 \uC2DC\uD5D8"]
    }
  ];
  res.json({ companies: generatedCompanies, source: "fallback" });
});
app.post("/api/ai-chat", async (req, res) => {
  const { message, contextCompany } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `\uB2F9\uC2E0\uC740 \uB300\uD55C\uBBFC\uAD6D 700+ \uC790\uB3D9\uCC28 \uBD80\uD488 \uC0B0\uC5C5 \uBC38\uB958\uCCB4\uC778(\uC644\uC131\uCC28 OEM -> \uD604\uB300\uBAA8\uBE44\uC2A4/HL\uB9CC\uB3C4/\uD55C\uC628\uC2DC\uC2A4\uD15C 1\uCC28\uC0AC -> 2/3\uCC28 \uAC00\uACF5 \uD611\uB825\uC0AC -> \uC18C\uC7AC/\uBC18\uB3C4\uCCB4)\uC744 \uAFF0\uB6AB\uACE0 \uC788\uB294 \uC218\uC11D \uC790\uB3D9\uCC28 \uC0B0\uC5C5 \uC560\uB110\uB9AC\uC2A4\uD2B8\uC785\uB2C8\uB2E4.
\uC9C8\uBB38\uC5D0 \uB300\uD574 \uC2E0\uB8B0\uC131 \uB192\uC740 \uC0B0\uC5C5 \uD1B5\uACC4, \uC8FC\uC694 \uBD80\uD488 \uACF5\uAE09 \uB2E8\uAC00/\uD488\uC9C8 \uAE30\uC900, \uC8FC\uC694 \uD50C\uB808\uC774\uC5B4 \uAC04 \uC5ED\uD559 \uAD00\uACC4, \uCDE8\uC5C5/\uC774\uC9C1 \uC2DC \uACE0\uB824\uD574\uC57C \uD560 \uD68C\uC0AC \uACBD\uC7C1\uB825\uC744 \uBA85\uD655\uD558\uACE0 \uC804\uBB38\uC801\uC778 \uD55C\uAD6D\uC5B4\uB85C \uB2F5\uBCC0\uD574 \uC8FC\uC138\uC694.`;
      const prompt = `[\uD604\uC7AC \uC120\uD0DD\uB41C \uAE30\uC5C5 \uB9E5\uB77D]: ${contextCompany ? JSON.stringify(contextCompany) : "\uC120\uD0DD\uB41C \uAE30\uC5C5 \uC5C6\uC74C"}
[\uC0AC\uC6A9\uC790 \uC9C8\uBB38]: ${message}`;
      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.3
        }
      });
      return res.json({ reply: response.text || "\uB2F5\uBCC0\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4." });
    } catch (err) {
      console.error("Chat AI error:", err);
    }
  }
  res.json({
    reply: `\uB300\uD55C\uBBFC\uAD6D \uC790\uB3D9\uCC28 \uC0B0\uC5C5 \uC0DD\uD0DC\uACC4\uB294 \uC644\uC131\uCC28(\uD604\uB300\uCC28/\uAE30\uC544)\uB97C \uC815\uC810\uC73C\uB85C \uBAA8\uBE44\uC2A4, \uB9CC\uB3C4, \uD55C\uC628\uC2DC\uC2A4\uD15C, \uD604\uB300\uD2B8\uB79C\uC2DC\uC2A4 \uB4F1 \uD575\uC2EC 1\uCC28 \uBCA4\uB354\uC640 \uACBD\uC2E0, \uD654\uC2E0, \uC131\uC6B0\uD558\uC774\uD14D, \uAD11\uC9C4\uC0C1\uACF5 \uB4F1 700\uC5EC \uAC1C \uAC15\uC18C \uBD80\uD488\uC0AC\uAC00 \uAE34\uBC00\uD55C JIT(\uC801\uAE30\uACF5\uAE09) \uCCB4\uC778\uC73C\uB85C \uBB36\uC5EC \uC788\uC2B5\uB2C8\uB2E4.

\uC9C8\uBB38\uD558\uC2E0 \uB0B4\uC6A9\uACFC \uAD00\uB828\uD558\uC5EC:
1. **\uACF5\uAE09\uB9DD \uD2F0\uC5B4(Tier)**: 1\uCC28\uC0AC\uB294 \uC644\uC131\uCC28 \uC9C1\uB0A9 \uBC0F \uBAA8\uB4C8\uD654 \uC5ED\uB7C9\uC774 \uD575\uC2EC\uC774\uBA70, 2\uCC28\uC0AC\uB294 \uC815\uBC00 \uD504\uB808\uC2A4, \uC54C\uB8E8\uBBF8\uB284 \uB2E4\uC774\uCE90\uC2A4\uD305, \uC0AC\uCD9C \uBC0F \uC5F4\uCC98\uB9AC \uAE30\uC220\uC774 \uC218\uC775\uC131\uC744 \uC88C\uC6B0\uD569\uB2C8\uB2E4.
2. **\uBBF8\uB798 \uC804\uB3D9\uD654 \uB300\uC751**: \uBC30\uD130\uB9AC \uCF00\uC774\uC2A4(BPA), \uC5F4\uAD00\uB9AC \uD788\uD2B8\uD38C\uD504, \uC804\uB3D9\uC2DD \uD30C\uC6CC\uD2B8\uB808\uC778(e-Axle) \uBC0F \uACE0\uC804\uC555 \uC640\uC774\uC5B4\uB9C1\uC73C\uB85C \uBE60\uB974\uAC8C \uCCB4\uC9C8 \uAC1C\uC120\uC744 \uC774\uB8EC \uAE30\uC5C5\uB4E4\uC774 \uB192\uC740 \uAE30\uC5C5\uAC00\uCE58\uC640 \uC5F0\uBD09\uC744 \uD615\uC131\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.`
  });
});
async function startServer() {
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} K-Mobility Value Chain App running on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
