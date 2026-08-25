export type WorkStatus = "live-charging" | "live" | "writing" | "shipped-quiet" | "local";

export type Work = {
  id: string;
  zh: string;
  en: string;
  /** Optional mono tag shown in both languages, e.g. brain.md */
  aka?: string;
  url?: string;
  descZh: string;
  descEn: string;
  status: WorkStatus;
};

export const WORK_STATUS: Record<WorkStatus, { zh: string; en: string }> = {
  "live-charging": { zh: "在线 · 收费", en: "LIVE · CHARGING" },
  live: { zh: "在线", en: "LIVE" },
  writing: { zh: "在写", en: "WRITING" },
  "shipped-quiet": { zh: "已上线 · 安静", en: "SHIPPED · QUIET" },
  local: { zh: "本地", en: "LOCAL" },
};

/** Current public works. Token-use is a separate log, not a product here. */
export const WORKS: Work[] = [
  {
    id: "dipian",
    zh: "底片",
    en: "DIPIAN",
    url: "https://dipian.robinren.me",
    descZh: "拍歪了，不要紧，帮你改成最好看的一张。",
    descEn: "Same subject, better camera position.",
    status: "live-charging",
  },
  {
    id: "aura",
    zh: "Aura",
    en: "Aura",
    url: "https://aura.robinren.me",
    descZh: "每日一版。",
    descEn: "Overnight digest.",
    status: "live",
  },
  {
    id: "jiuzhou",
    zh: "九州志",
    en: "JIUZHOU",
    url: "https://jiuzhou.world",
    descZh: "方志写作。卷一：杭州·临安。不是软件产品。",
    descEn: "Gazetteer writing. Vol. I: Hangzhou · Lin'an. Not a software product.",
    status: "writing",
  },
  {
    id: "huixin",
    zh: "会心",
    en: "HUIXIN",
    url: "https://huixin.robinren.me",
    descZh: "卡住时下一句刚刚好。微信回复助手。",
    descEn: "The next line, when you are stuck. A WeChat reply helper.",
    status: "shipped-quiet",
  },
  {
    id: "md-converter",
    zh: "md-converter",
    en: "md-converter",
    url: "https://md.robinren.me",
    descZh: "大文件 / 扫描件转 Markdown。",
    descEn: "Large files and scans to Markdown.",
    status: "live",
  },
  {
    id: "mindmux",
    zh: "MindMux",
    en: "MindMux",
    aka: "brain.md",
    descZh: "本地知识中间件，以及 brain.md 规范。",
    descEn: "Local knowledge middleware, and the brain.md standard.",
    status: "local",
  },
  {
    id: "project-prompt",
    zh: "Project Prompt",
    en: "Project Prompt",
    url: "https://project-prompt.com",
    descZh: "写一条智能体能做完的 Goal。",
    descEn: "Write the Goal that agents finish.",
    status: "live",
  },
];
