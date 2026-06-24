"use client";

import {
  Bot,
  Code2,
  FilePlus2,
  Globe2,
  ImagePlus,
  Paperclip,
  Play,
  Send,
  SlidersHorizontal,
  TerminalSquare,
  UserRound,
} from "lucide-react";
import type { FormEvent, KeyboardEvent } from "react";
import type { ChatMessage } from "./mock-data";

type ChatPanelProps = {
  messages: ChatMessage[];
  draft: string;
  mode: string;
  contextEnabled: boolean;
  contextFiles: string[];
  onDraftChange: (value: string) => void;
  onModeChange: (value: string) => void;
  onToggleContext: () => void;
  onSend: () => void;
  onShowPlugins: () => void;
  onShowActivity: () => void;
};

const modes = ["Plan", "Code", "Review"];

export function ChatPanel({
  messages,
  draft,
  mode,
  contextEnabled,
  contextFiles,
  onDraftChange,
  onModeChange,
  onToggleContext,
  onSend,
  onShowPlugins,
  onShowActivity,
}: ChatPanelProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSend();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dedbd2] bg-[#fbfaf7] px-4 py-3 lg:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm text-[#6b655c]">
            <span className="truncate">epsys</span>
            <span>/</span>
            <span className="truncate font-medium text-[#24231f]">frontend</span>
          </div>
          <h1 className="mt-1 truncate text-lg font-semibold text-[#1f1e1a]">Build Codex replica</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-9 rounded-lg border border-[#d3d0c7] bg-[#f4f1e9] p-1">
            {modes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onModeChange(item)}
                className={`rounded-md px-3 text-sm font-medium ${
                  mode === item
                    ? "bg-[#22211e] text-white"
                    : "text-[#5d584f] hover:bg-[#e6e2d8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            type="button"
            title="Open terminal"
            onClick={onShowActivity}
            className="grid size-9 place-items-center rounded-md border border-[#d3d0c7] bg-white text-[#514c44] hover:bg-[#f4f1e9]"
          >
            <TerminalSquare size={17} />
          </button>
          <button
            type="button"
            title="Open plugins"
            onClick={onShowPlugins}
            className="grid size-9 place-items-center rounded-md border border-[#d3d0c7] bg-white text-[#514c44] hover:bg-[#f4f1e9]"
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border-t border-[#dedbd2] bg-[#fbfaf7] px-4 py-4 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-lg border border-[#cfcac0] bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#ebe7de] px-3 py-2">
            <button
              type="button"
              onClick={onToggleContext}
              className={`flex h-8 items-center gap-2 rounded-md px-2 text-sm font-medium ${
                contextEnabled
                  ? "bg-[#e5f2ea] text-[#1f6d48]"
                  : "bg-[#f0eee8] text-[#6f6a61]"
              }`}
            >
              <Code2 size={15} />
              Auto context
            </button>
            {contextFiles.slice(0, 3).map((file) => (
              <span
                key={file}
                className="max-w-[180px] truncate rounded-md bg-[#f4f1e9] px-2 py-1 text-xs text-[#5d584f]"
              >
                {file}
              </span>
            ))}
          </div>

          <textarea
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            className="max-h-40 min-h-24 w-full resize-none bg-transparent px-3 py-3 text-sm leading-6 text-[#24231f] outline-none placeholder:text-[#8a847a]"
            placeholder="Ask Codex anything..."
          />

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#ebe7de] px-3 py-2">
            <div className="flex items-center gap-1">
              <button type="button" title="Attach file" className="grid size-8 place-items-center rounded-md text-[#5d584f] hover:bg-[#f2efe7]">
                <Paperclip size={16} />
              </button>
              <button type="button" title="Attach image" className="grid size-8 place-items-center rounded-md text-[#5d584f] hover:bg-[#f2efe7]">
                <ImagePlus size={16} />
              </button>
              <button type="button" title="Add file context" className="grid size-8 place-items-center rounded-md text-[#5d584f] hover:bg-[#f2efe7]">
                <FilePlus2 size={16} />
              </button>
              <button type="button" title="Web search" className="grid size-8 place-items-center rounded-md text-[#5d584f] hover:bg-[#f2efe7]">
                <Globe2 size={16} />
              </button>
              <button type="button" title="Run task" className="grid size-8 place-items-center rounded-md text-[#5d584f] hover:bg-[#f2efe7]">
                <Play size={16} />
              </button>
            </div>
            <button
              type="submit"
              disabled={!draft.trim()}
              className="flex h-9 items-center gap-2 rounded-md bg-[#22211e] px-3 text-sm font-semibold text-white hover:bg-[#35332e] disabled:cursor-not-allowed disabled:bg-[#c7c2b8] disabled:text-[#6f6a61]"
            >
              <Send size={15} />
              Send
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const isTool = message.role === "tool";

  if (isTool) {
    return (
      <article className="rounded-lg border border-[#d7d3c8] bg-[#27251f] text-[#f4f1e9]">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="flex items-center gap-2 text-xs font-medium">
            <TerminalSquare size={14} />
            {message.name ?? "tool"}
          </div>
          <span className="text-xs text-[#bdb7ab]">{message.meta}</span>
        </div>
        <p className="px-3 py-3 font-mono text-xs leading-5 text-[#d9d3c7]">{message.content}</p>
      </article>
    );
  }

  return (
    <article className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#22211e] text-white">
          <Bot size={17} />
        </div>
      )}
      <div
        className={`max-w-[680px] rounded-lg border px-4 py-3 ${
          isUser
            ? "border-[#cfcac0] bg-[#f0eee8] text-[#25231f]"
            : "border-[#dedbd2] bg-white text-[#25231f]"
        }`}
      >
        <div className="mb-2 text-xs text-[#6f6a61]">{message.meta}</div>
        <p className="text-sm leading-6">{message.content}</p>
      </div>
      {isUser && (
        <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#d7d3c8] text-[#3f3a33]">
          <UserRound size={17} />
        </div>
      )}
    </article>
  );
}
