import type { LucideIcon } from "lucide-react";

export type SessionStatus = "running" | "paused" | "done";

export type Session = {
  id: string;
  title: string;
  project: string;
  updated: string;
  status: SessionStatus;
  tokens: string;
};

export type MessageRole = "user" | "assistant" | "tool";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  meta: string;
  name?: string;
  status?: "complete" | "running" | "waiting";
};

export type PluginStatus = "connected" | "available" | "syncing";
export type PluginSource = "Curated" | "Workspace" | "Created";

export type Plugin = {
  id: string;
  name: string;
  icon: string;
  source: PluginSource;
  status: PluginStatus;
  description: string;
  lastUsed: string;
  permissions: string[];
  skills: string[];
};

export type Activity = {
  id: string;
  label: string;
  detail: string;
  time: string;
  state: "done" | "active" | "queued";
};

export type IconComponent = LucideIcon;

export const sessions: Session[] = [
  {
    id: "frontend-replica",
    title: "Build Codex replica",
    project: "epsys / frontend",
    updated: "Now",
    status: "running",
    tokens: "38k",
  },
  {
    id: "plugin-directory",
    title: "Plugin directory setup",
    project: "personal tools",
    updated: "14 min",
    status: "paused",
    tokens: "11k",
  },
  {
    id: "ui-review",
    title: "Review dashboard layout",
    project: "design system",
    updated: "Yesterday",
    status: "done",
    tokens: "24k",
  },
  {
    id: "docs-agent",
    title: "Summarize API docs",
    project: "research chat",
    updated: "Mon",
    status: "done",
    tokens: "7k",
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    meta: "You · frontend/AGENTS.md",
    content:
      "In the frontend folder, make an exact replica of Codex where people can chat, connect plugins, and manage the current workspace.",
  },
  {
    id: "m2",
    role: "assistant",
    meta: "Codex · planning",
    content:
      "I will inspect the Next app, keep the work scoped to frontend, and build a stateful Codex-style workbench with chat, plugins, context, approvals, and activity.",
  },
  {
    id: "m3",
    role: "tool",
    name: "terminal",
    meta: "Context gathered",
    status: "complete",
    content:
      "Read AGENTS.md, package.json, app/page.tsx, globals.css, layout.tsx, and the local Next 16 App Router docs.",
  },
  {
    id: "m4",
    role: "assistant",
    meta: "Codex · implementation",
    content:
      "The app is ready to become a full-screen workspace: left rail for threads, center chat, right inspector for plugins and activity, with local mock interactions for connection and sending.",
  },
];

export const plugins: Plugin[] = [
  {
    id: "github",
    name: "GitHub",
    icon: "github",
    source: "Curated",
    status: "connected",
    description: "Read repositories, inspect PRs, address comments, and open draft pull requests.",
    lastUsed: "2 min ago",
    permissions: ["Read repositories", "Create branches", "Open pull requests"],
    skills: ["review", "fix ci", "yeet"],
  },
  {
    id: "browser",
    name: "Browser",
    icon: "browser",
    source: "Curated",
    status: "connected",
    description: "Open local pages, capture screenshots, and verify the frontend in context.",
    lastUsed: "5 min ago",
    permissions: ["Open localhost", "Capture screenshots", "Inspect console"],
    skills: ["appshots", "visual qa"],
  },
  {
    id: "figma",
    name: "Figma",
    icon: "figma",
    source: "Workspace",
    status: "available",
    description: "Create frames, generate diagrams, and keep code mapped to components.",
    lastUsed: "Not used",
    permissions: ["Read files", "Create design nodes", "Update components"],
    skills: ["design", "code connect"],
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: "mail",
    source: "Curated",
    status: "available",
    description: "Search mail, summarize threads, triage inboxes, and draft replies.",
    lastUsed: "Not used",
    permissions: ["Search mail", "Read threads", "Create drafts"],
    skills: ["triage", "reply"],
  },
  {
    id: "slack",
    name: "Slack",
    icon: "slack",
    source: "Workspace",
    status: "syncing",
    description: "Summarize channels, gather launch context, and draft team updates.",
    lastUsed: "Syncing",
    permissions: ["Read channels", "Search messages", "Draft updates"],
    skills: ["summarize", "handoff"],
  },
  {
    id: "sites",
    name: "Sites",
    icon: "rocket",
    source: "Curated",
    status: "available",
    description: "Publish prototypes and internal apps with workspace sign-in.",
    lastUsed: "Not used",
    permissions: ["Create sites", "Deploy builds", "Invite workspace"],
    skills: ["share", "deploy"],
  },
  {
    id: "security",
    name: "Codex Security",
    icon: "shield",
    source: "Curated",
    status: "available",
    description: "Scan authorized code, triage findings, and review security changes.",
    lastUsed: "Not used",
    permissions: ["Read code", "Run scans", "Export findings"],
    skills: ["scan", "triage"],
  },
  {
    id: "local-mcp",
    name: "Local MCP",
    icon: "database",
    source: "Created",
    status: "connected",
    description: "Expose local tools and shared project resources through MCP servers.",
    lastUsed: "12 min ago",
    permissions: ["List resources", "Call local tools", "Read workspace metadata"],
    skills: ["tools", "resources"],
  },
];

export const activities: Activity[] = [
  {
    id: "a1",
    label: "Read workspace",
    detail: "Mapped the frontend folder and local agent rules.",
    time: "17:41",
    state: "done",
  },
  {
    id: "a2",
    label: "Installed icons",
    detail: "Added lucide-react for native toolbar and plugin glyphs.",
    time: "17:45",
    state: "done",
  },
  {
    id: "a3",
    label: "Build interface",
    detail: "Creating chat, plugin, context, and activity surfaces.",
    time: "Now",
    state: "active",
  },
  {
    id: "a4",
    label: "Verify app",
    detail: "Run lint and production build after the UI lands.",
    time: "Next",
    state: "queued",
  },
];

export const contextFiles = [
  "frontend/app/page.tsx",
  "frontend/app/globals.css",
  "frontend/AGENTS.md",
  "frontend/package.json",
];
