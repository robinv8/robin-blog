export const agentTokenUsageProject = {
  slug: "agent-token-usage",
  no: "01",
  zh: "Agent Token 用量",
  en: "Agent Token Usage",
  statusZh: "记录中",
  statusEn: "logging",
  started: "2026-08",
  descZh:
    "本机 coding agent 的按月 token 用量。先记在项目页；数据来自 ccusage 读本地会话，未接自动更新。",
  descEn:
    "Monthly token usage across local coding agents. Logged here first. Numbers come from ccusage reading local sessions; live refresh is not wired yet.",
  dataPath: "/data/token-usage.json",
} as const;

export const localProjects = [agentTokenUsageProject];
