"use client";

import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PromptHistoryProps {
  items: { prompt: string; timestamp: Date }[];
  onSelect: (prompt: string) => void;
}

export function PromptHistory({ items, onSelect }: PromptHistoryProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        プロンプト履歴
      </h3>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          編集を実行するとプロンプトが履歴に追加されます
        </p>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-2 pr-2">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => onSelect(item.prompt)}
                className="w-full text-left p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <p className="text-sm line-clamp-2">{item.prompt}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.timestamp.toLocaleTimeString("ja-JP")}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
