export type Bi = { zh: string; en: string };

export type Stat = { value: string; label: Bi };

export type Work = {
  slug: string;
  name: Bi;
  org: Bi;
  status: Bi;
  desc: Bi;
  stats: Stat[];
  href: string;
  period?: Bi;
  case: {
    background: Bi;
    did: Bi[];
    results: Bi[];
  };
  links?: { label: string; href: string }[];
};

export type Role = {
  period: Bi;
  title: Bi;
  note: Bi;
  current?: boolean;
};

export const profile = {
  name: { zh: "Robin Ren", en: "Robin Ren" },
  subtitle: { zh: "Founding Engineer · Hangzhou", en: "Founding Engineer · Hangzhou" },
  headline: {
    zh: { before: "创始工程师，把 ", accent: "AI 产品", after: "从 0 做到 1。" },
    en: { before: "Founding engineer building ", accent: "AI products", after: " from zero to one." },
  },
  intro: {
    zh: ["Apache Answer PMC 成员，前思否前端架构师。", "12 年，从前端到跨端、全栈，再到 AI Agent。"],
    en: ["Apache Answer PMC member, ex-SegmentFault frontend architect.", "12 years — from web to cross-platform, full-stack, and now AI agents."],
  },
  tags: [
    { zh: "AI 产品与 Agent", en: "AI products & agents" },
    { zh: "开源", en: "Open source" },
    { zh: "端到端交付", en: "End-to-end delivery" },
  ] as Bi[],
  now: { zh: "Founding Engineer\n@ MindFly Lab", en: "Founding Engineer\n@ MindFly Lab" },
  shipping: "MindMux · brain.md",
  based: { zh: "杭州 Hangzhou", en: "Hangzhou, China" },
  links: {
    github: "https://github.com/robinv8",
    linkedin: "https://www.linkedin.com/in/robin-ren-791ab742a/",
  },
};

export const works: Work[] = [
  {
    slug: "brain-md",
    name: { zh: "brain.md", en: "brain.md" },
    org: { zh: "开源 · Apache-2.0", en: "Open source · Apache-2.0" },
    status: { zh: "v0.3.0", en: "v0.3.0" },
    desc: {
      zh: "给 coding agents 的项目记忆层：一个 BRAIN.md 协议文件加零依赖 CLI，把项目的决策、约束和需求写成纯 Markdown，住在仓库里，随 git 流动。",
      en: "A project memory layer for coding agents: one BRAIN.md protocol file plus a zero-dependency CLI that keeps decisions, constraints and requirements as plain Markdown in your repo.",
    },
    stats: [
      { value: "550+★", label: { zh: "stars", en: "stars" } },
      { value: "#1", label: { zh: "贡献者", en: "contributor" } },
      { value: "v0.3.0", label: { zh: "由我发布", en: "released by me" } },
    ],
    href: "https://github.com/mindmuxai/brain.md",
    period: { zh: "2026 — 至今", en: "2026 — now" },
    case: {
      background: {
        zh: "coding agents 每次开新会话都会忘掉项目的决策和约束。brain.md 是 MindMux 背后那套 brain 的开源规格层，可以独立使用：项目记忆写成纯 Markdown，住在仓库里，随 git 流动。",
        en: "Coding agents forget a project's decisions and constraints every new session. brain.md is the open-source spec layer behind MindMux's brain, usable on its own: project memory as plain Markdown that lives in the repo and moves with git.",
      },
      did: [
        { zh: "主导 CLI 与规格的开发，是仓库提交最多的贡献者。", en: "Lead development of the CLI and the spec; top contributor to the repo." },
        {
          zh: "发布 v0.3.0：MCP 优先的接入方式，以及 Codex SessionStart 支持。",
          en: "Shipped v0.3.0: MCP-first wiring and Codex SessionStart support.",
        },
      ],
      results: [
        { zh: "Apache-2.0 开源，GitHub 约 550+ star。", en: "Open source under Apache-2.0, 550+ GitHub stars." },
        { zh: "文档站 projectbrain.md。", en: "Docs at projectbrain.md." },
      ],
    },
    links: [
      { label: "GitHub", href: "https://github.com/mindmuxai/brain.md" },
      { label: "projectbrain.md", href: "https://projectbrain.md" },
    ],
  },
  {
    slug: "apache-answer",
    name: { zh: "Apache Answer", en: "Apache Answer" },
    org: { zh: "Apache · 创始工程师 / PMC", en: "Apache · Founding Eng. / PMC" },
    status: { zh: "顶级项目", en: "top-level project" },
    desc: {
      zh: "开源问答平台，从思否内部孵化，捐赠 Apache 并于 2024 年毕业为顶级项目。我从第一天参与，负责前端核心维护，主导插件系统与官方插件仓库。",
      en: "An open-source Q&A platform, incubated inside SegmentFault, donated to Apache and graduated as a top-level project in 2024. On it from day one as a core frontend maintainer; I lead the plugin system and official plugins repo.",
    },
    stats: [
      { value: "15.7k★", label: { zh: "stars", en: "stars" } },
      { value: "318", label: { zh: "主仓提交", en: "commits" } },
      { value: "#1", label: { zh: "插件仓", en: "plugins repo" } },
    ],
    href: "https://answer.apache.org",
    period: { zh: "2022 — 至今", en: "2022 — now" },
    case: {
      background: {
        zh: "Answer 是一套开源问答平台，可以搭建社区论坛、帮助中心或团队知识库。它起源于思否内部，2022 年开源，之后捐赠给 Apache 软件基金会，2024 年 12 月从孵化器毕业，成为顶级项目。",
        en: "Answer is an open-source Q&A platform for community forums, help centers and team knowledge bases. It started inside SegmentFault, was open-sourced in 2022, donated to the Apache Software Foundation, and graduated from the incubator as a top-level project in December 2024.",
      },
      did: [
        { zh: "从项目第一天参与，是前端核心维护者。", en: "On the project from day one as a core frontend maintainer." },
        {
          zh: "主导插件系统：插件注册、pluginKit、编辑器插件机制，并维护官方插件仓库。",
          en: "Lead the plugin system — plugin registration, pluginKit, the editor plugin mechanism — and maintain the official plugins repo.",
        },
        {
          zh: "全程经历从内部项目到开源、捐赠 Apache、毕业成为顶级项目的过程。",
          en: "Went through the whole path from internal project to open source, Apache donation and graduation.",
        },
      ],
      results: [
        { zh: "毕业时成为首批 PMC 成员之一。", en: "One of the first PMC members at graduation." },
        { zh: "主仓库 318 次提交；插件仓库 196 次提交，贡献者第一。", en: "318 commits to the main repo; 196 to the plugins repo, its top contributor." },
        { zh: "项目约 1.57 万 GitHub star。", en: "About 15.7k GitHub stars." },
      ],
    },
    links: [
      { label: "answer.apache.org", href: "https://answer.apache.org" },
      { label: "GitHub", href: "https://github.com/apache/answer" },
      { label: "plugins", href: "https://github.com/apache/answer-plugins" },
    ],
  },
  {
    slug: "segmentfault-nextjs",
    name: { zh: "思否主站 → Next.js", en: "SegmentFault → Next.js" },
    org: { zh: "SegmentFault · 前端架构师", en: "SegmentFault · Frontend Architect" },
    status: { zh: "已上线", en: "in production" },
    desc: {
      zh: "主导老牌开发者社区从 PHP 模板渐进式迁移到 Next.js：按路由逐步切换、新旧并存、业务不停。维护成本、性能、SEO 与发布节奏全面改善。",
      en: "Led the incremental migration of a long-running developer community from PHP templates to Next.js — route by route, old and new side by side, no downtime. Better maintainability, performance, SEO and release cadence.",
    },
    stats: [
      { value: "2–3", label: { zh: "人", en: "engineers" } },
      { value: "6–12", label: { zh: "个月", en: "months" } },
      { value: "lead", label: { zh: "我的角色", en: "my role" } },
    ],
    href: "https://segmentfault.com",
    case: {
      background: {
        zh: "思否是国内老牌开发者社区。主站长期基于 PHP 模板渲染，页面和业务逻辑深度耦合，旧系统越来越难维护，每次迭代和改版的成本都在上升。",
        en: "SegmentFault is a long-running Chinese developer community. The main site was rendered from PHP templates for years, with pages and business logic tightly coupled; it kept getting harder to maintain, and every iteration or redesign cost more.",
      },
      did: [
        {
          zh: "主导迁移：制定方案、设计架构并编写核心代码，带 2 到 3 人的前端小组，用半年到一年完成。",
          en: "Led the migration — planned it, designed the architecture and wrote the core code — with a 2–3 person frontend team over 6–12 months.",
        },
        {
          zh: "渐进式迁移：按页面和路由逐步切换，新旧系统并存运行，线上业务不停。",
          en: "Incremental rollout: switched page by page and route by route, old and new running side by side, with no downtime.",
        },
        { zh: "基于 Next.js 服务端渲染，保证社区内容的搜索引擎收录。", en: "Server-side rendering on Next.js to keep community content indexable." },
        {
          zh: "前端从模板里解耦，形成独立的工程、构建和发布流程。",
          en: "Pulled the frontend out of the templates into its own codebase, build and release pipeline.",
        },
      ],
      results: [
        { zh: "主站至今稳定运行在 Next.js 上，公开可验证。", en: "The main site still runs on Next.js today — publicly verifiable." },
        {
          zh: "维护成本和开发效率明显改善，新功能和改版不再被旧模板拖累。",
          en: "Maintenance cost and developer productivity improved; features and redesigns are no longer held back by the old templates.",
        },
        { zh: "页面性能提升，SEO 在迁移过程中保持稳定并有所提升。", en: "Faster pages; SEO held steady through the migration and improved." },
        { zh: "发布节奏更快。", en: "A faster release cadence." },
      ],
    },
    links: [{ label: "segmentfault.com", href: "https://segmentfault.com" }],
  },
];

export const career: Role[] = [
  {
    period: { zh: "2026.03 — 至今", en: "2026.03 — now" },
    title: { zh: "MindFly Lab · Founding Engineer", en: "MindFly Lab · Founding Engineer" },
    note: { zh: "从零打造 MindMux 与 brain.md", en: "Building MindMux and brain.md from scratch" },
    current: true,
  },
  {
    period: { zh: "2022.10 — 至今", en: "2022.10 — now" },
    title: { zh: "Apache Answer · 创始工程师 / PMC", en: "Apache Answer · Founding Engineer / PMC" },
    note: { zh: "前端核心维护，插件系统；2024 年成为 PMC 成员", en: "Core frontend maintainer, plugin system; PMC member since 2024" },
  },
  {
    period: { zh: "2020.06 — 2026.02", en: "2020.06 — 2026.02" },
    title: { zh: "SegmentFault 思否 · 前端架构师", en: "SegmentFault · Frontend Architect" },
    note: { zh: "主站迁移 Next.js，前端架构与工程化", en: "Main site migration to Next.js, frontend architecture and tooling" },
  },
  {
    period: { zh: "2014 — 2020", en: "2014 — 2020" },
    title: { zh: "更早 · 电商与创业公司", en: "Earlier · e-commerce & startups" },
    note: { zh: "前端与跨端 App；三个月自学 React Native 上线双端", en: "Web and cross-platform apps; learned React Native in three months and shipped iOS + Android" },
  },
];
