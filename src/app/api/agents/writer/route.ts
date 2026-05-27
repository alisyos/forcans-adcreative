import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getAgentPrompt, parseJSON } from '@/lib/agents';

// Unifying all agents to use OpenAI current flagship models for stability
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

// 선택된 스타일 톤별 화법 가이드 (선택 톤 한 가지로 4안 모두 작성)
const TONE_GUIDE: Record<string, string> = {
  '친근': '친구에게 말하듯 편안하고 다정한 구어체, 거리감 없는 따뜻한 화법',
  '공지형': '공식 안내·발표처럼 명료하고 신뢰감 있는 고지 화법',
  '공감형': '사용자의 상황과 감정을 먼저 알아주고 공감하는 부드러운 화법',
  '후기형': '실제 사용자 리뷰·경험담처럼 생생한 1인칭 추천 화법',
  '긴급형': '지금 행동해야 한다는 긴박감과 한정성을 강조하는 강한 푸시 화법',
  '정보형': '핵심 정보·수치·USP를 간결하고 정확하게 전달하는 신뢰 중심 화법',
};

export async function POST(req: Request) {
  try {
    const { scoutData, category, tone, productName, customCopy } = await req.json();
    const systemPrompt = await getAgentPrompt('writer');

    // 핵심 카피/훅은 선택 입력 — 값이 있을 때만 프롬프트에 반영
    const hookLine = customCopy?.trim()
      ? `\n핵심 카피/훅 (반드시 4안에 자연스럽게 녹일 것): ${customCopy.trim()}`
      : '';

    // Using standard OpenAI Chat Completions API with gpt-4o
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `카테고리: ${category || '미지정'}\n제품명: ${productName || '미지정'}${hookLine}\n선택된 스타일 톤: ${tone || '기본'} (${TONE_GUIDE[tone] ?? '기본 화법'})\n\n위의 정보와 아래 제공된 <트렌드 분석 데이터>를 바탕으로 배너 광고에 최적화된 카피 4안을 작성하라.\n\n### 필독 요구사항:\n1. **톤 일관성 (최우선)**: 4안 모두 반드시 위에 지정된 단일 스타일 톤 '${tone || '기본'}'으로 작성하라. 다른 톤을 섞지 말 것. 각 카피의 'tone' 필드에는 정확히 '${tone || '기본'}'를 기입할 것.\n2. **제품 반영**: 모든 카피는 위 제품명 '${productName || '미지정'}'의 광고임이 드러나도록, 제품의 특성과 이름을 자연스럽게 반영하라.\n3. **핵심 카피/훅 반영**: '핵심 카피/훅'이 제공된 경우 그 메시지·혜택을 4안 전반에 반영하되, 톤에 맞게 자연스럽게 변주하라. (제공되지 않았다면 트렌드 데이터 기반으로 작성)\n4. **4안 차별화**: 톤은 동일하게 유지하되, 헤드라인·훅·소구 앵글(혜택 강조 / 상황 묘사 / 호기심 자극 / 가치 제안 등)은 4안이 서로 다르게 구성하라.\n5. **글자 수 제약**: 헤드라인은 최대 15자 이내로 짧고 강렬하게 작성할 것.\n6. **안티-클리셰**: 데이터의 'tired_phrases'는 절대 사용하지 말고 신선한 Hook을 만들 것.\n\n반드시 아래의 JSON 형식으로만 응답하라:\n\`\`\`json\n{\n  "category": "...",\n  "insight_applied": "...",\n  "copies": [\n    {\n      "id": 1,\n      "tone": "${tone || '기본'}",\n      "headline": "...",\n      "subheadline": "...",\n      "body": "...",\n      "cta": "...",\n      "visual_direction": "...",\n      "color_mood": [],\n      "keywords_used": []\n    }\n    // 동일한 '${tone || '기본'}' 톤으로 앵글만 달리하여 총 4개 작성 (모든 copy의 tone 값은 '${tone || '기본'}')\n  ]\n}\n\`\`\`\n\n<트렌드 분석 데이터>\n${JSON.stringify(scoutData)}`
        }
      ]
    });

    const raw = response.choices?.[0]?.message?.content || "{}";
    const parsed = parseJSON(raw);
    
    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Writer Agent Error (GPT-5.4):", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
