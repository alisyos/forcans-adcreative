import { Monitor, Smartphone } from 'lucide-react';

export type Stage = 'scouter' | 'writer' | 'designer';
export type Tone = '친근' | '공지형' | '공감형' | '후기형' | '긴급형' | '정보형';
export type MediaFormat = 'naver_1_1' | 'naver_16_9' | 'naver_2_3' | 'naver_native' | 'coupang_c3' | 'coupang_r1' | 'coupang_g1' | 'coupang_p3';

export const MAX_ITEMS = 4;

export const CATEGORY_OPTIONS = [
  '강아지 덴탈껌',
  '강아지 영양제',
  '펫디저트',
  '강아지 샴푸&위생관리',
] as const;

export interface AdCopy {
  id: number;
  tone: string;
  headline: string;
  subheadline: string;
  body: string;
  cta: string;
  visual_direction: string;
}

export interface ExtraText {
  id: string;
  content: string;
  pos_x: number;
  pos_y: number;
  font_size: number;
  scale_x?: number; // horizontal scale (%)
  scale_y?: number; // vertical scale (%)
  font_color: string;
  font_family?: string;
  font_weight?: string;
  font_style?: string;
  text_decoration?: string;
  letter_spacing?: number;
  background_color?: string;
  opacity?: number;
  rotate: number;
  flip_h?: boolean;
  flip_v?: boolean;
  z_index?: number;
}

export interface AdCut {
  cut_id: number;
  role: string;
  ratio: string;
  prompt_en: string;
  prompt_ko: string;
  headline?: string;
  subheadline?: string;
  body_text?: string;
  cta_text?: string;
  cta_color?: string; // CTA 배경색
  show_logo?: boolean;
  logo_position?: string;
  custom_logo_url?: string;
  reference_image_url?: string;
  logo_size?: number; // 50 ~ 200 (%)
  cta_size?: number; // 80 ~ 150 (%)
  text_overlay?: {
    content?: string;
    sub_content?: string;
    position: string;
    font_color: string;
    sub_font_color?: string; // 서브텍스트 색상
    font_weight?: string;
    sub_font_weight?: string;
    font_family?: string;
    sub_font_family?: string;
    font_style?: string;
    sub_font_style?: string;
    text_decoration?: string;
    sub_text_decoration?: string;
    letter_spacing?: number;
    sub_letter_spacing?: number;
    background_color?: string;
    sub_background_color?: string;
    opacity?: number;
    sub_opacity?: number;
    font_size?: number; // 메인 헤드라인 폰트 배율 (%)
    sub_font_size?: number; // 서브/본문 폰트 배율 (%)
    scale_x?: number; // horizontal scale (%)
    scale_y?: number; // vertical scale (%)
    bg_shadow?: string;
    rotate?: number;
    sub_rotate?: number;
    pos_x?: number; // x좌표 (%) 
    pos_y?: number; // y좌표 (%)
    sub_pos_x?: number; // 서브텍스트 x좌표
    sub_pos_y?: number; // 서브텍스트 y좌표
    flip_h?: boolean;
    sub_flip_h?: boolean;
    flip_v?: boolean;
    sub_flip_v?: boolean;
    z_index?: number;
    sub_z_index?: number;
  };
  extra_texts?: ExtraText[]; // 추가 텍스트들
  logo_flip_h?: boolean;
  logo_flip_v?: boolean;
  logo_rotate?: number;
  logo_pos_x?: number;
  logo_pos_y?: number;
  logo_z_index?: number;
  cta_text_color?: string;
  cta_font_family?: string;
  cta_font_weight?: string;
  cta_font_style?: string;
  cta_text_decoration?: string;
  cta_letter_spacing?: number;
  cta_pos_x?: number;
  cta_pos_y?: number;
  cta_scale_x?: number; // cta horizontal scale
  cta_scale_y?: number; // cta vertical scale
  cta_flip_h?: boolean;
  cta_flip_v?: boolean;
  cta_rotate?: number;
  cta_z_index?: number;
  layout_note?: string;
}

export const TONE_CONFIG: Record<Tone, { color: string, bg: string, border: string, dot: string }> = {
  '친근': { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', dot: '#fb7185' },
  '공지형': { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: '#3b82f6' },
  '공감형': { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: '#10b981' },
  '후기형': { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: '#f59e0b' },
  '긴급형': { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: '#ef4444' },
  '정보형': { color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', dot: '#8b5cf6' },
};

export const MEDIA_OPTIONS: { id: MediaFormat, label: string, icon: any, ratio: string, w: number, h: number, desc: string, group: string }[] = [
  { id: 'naver_1_1', label: '1:1 피드', icon: Monitor, ratio: '1200×1200', w: 1200, h: 1200, desc: '네이버 피드/웹툰', group: 'Naver' },
  { id: 'naver_16_9', label: '가로 피드', icon: Monitor, ratio: '1200×628', w: 1200, h: 628, desc: '네이버 16:9 피드 배너', group: 'Naver' },
  { id: 'naver_2_3', label: '세로 모바일', icon: Smartphone, ratio: '1200×1800', w: 1200, h: 1800, desc: '네이버 세로형 피드', group: 'Naver' },
  { id: 'naver_native', label: '네이티브', icon: Monitor, ratio: '342×228', w: 342, h: 228, desc: '네이버 리스트형 썸네일', group: 'Naver' },
  { id: 'coupang_c3', label: 'C3 메인세로', icon: Smartphone, ratio: '325×600', w: 325, h: 600, desc: '쿠팡 C3 메인 상단', group: 'Coupang' },
  { id: 'coupang_r1', label: 'R1 로켓배송', icon: Monitor, ratio: '768×324', w: 768, h: 324, desc: '쿠팡 로켓/P-Top 상단', group: 'Coupang' },
  { id: 'coupang_g1', label: 'G1 골드박스', icon: Monitor, ratio: '980×140', w: 980, h: 140, desc: '쿠팡 극초장축 배너', group: 'Coupang' },
  { id: 'coupang_p3', label: 'P3 중단', icon: Monitor, ratio: '1080×200', w: 1080, h: 200, desc: '쿠팡 3단 카테고리 배너', group: 'Coupang' }
];

export const CTR_DATA: Record<string, { target: string, ctr: number, color: string }[]> = {
  '친근': [
    { target: '20대 여성', ctr: 4.8, color: 'bg-rose-500' },
    { target: '30대 여성', ctr: 5.2, color: 'bg-rose-500' },
    { target: '20대 남성', ctr: 2.9, color: 'bg-rose-300' },
    { target: '40대 여성', ctr: 4.1, color: 'bg-rose-400' },
  ],
  '공지형': [
    { target: '20대 여성', ctr: 3.1, color: 'bg-blue-300' },
    { target: '30대 여성', ctr: 4.0, color: 'bg-blue-400' },
    { target: '20대 남성', ctr: 4.4, color: 'bg-blue-400' },
    { target: '40대 여성', ctr: 4.7, color: 'bg-blue-500' },
  ],
  '공감형': [
    { target: '20대 여성', ctr: 6.1, color: 'bg-emerald-500' },
    { target: '30대 여성', ctr: 5.6, color: 'bg-emerald-500' },
    { target: '20대 남성', ctr: 3.2, color: 'bg-emerald-300' },
    { target: '40대 여성', ctr: 4.3, color: 'bg-emerald-400' },
  ],
  '후기형': [
    { target: '20대 여성', ctr: 5.4, color: 'bg-amber-500' },
    { target: '30대 여성', ctr: 5.9, color: 'bg-amber-500' },
    { target: '20대 남성', ctr: 3.6, color: 'bg-amber-300' },
    { target: '40대 여성', ctr: 5.1, color: 'bg-amber-400' },
  ],
  '긴급형': [
    { target: '20대 여성', ctr: 5.0, color: 'bg-red-400' },
    { target: '30대 여성', ctr: 4.6, color: 'bg-red-400' },
    { target: '20대 남성', ctr: 5.8, color: 'bg-red-500' },
    { target: '40대 여성', ctr: 4.2, color: 'bg-red-300' },
  ],
  '정보형': [
    { target: '20대 여성', ctr: 4.2, color: 'bg-violet-400' },
    { target: '30대 여성', ctr: 4.5, color: 'bg-violet-400' },
    { target: '20대 남성', ctr: 5.3, color: 'bg-violet-500' },
    { target: '40대 여성', ctr: 4.0, color: 'bg-violet-300' },
  ],
};
