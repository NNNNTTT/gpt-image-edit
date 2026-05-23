"use client";

import { History } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

export interface HistoryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: Date;
}

interface EditHistoryProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  selectedId: string | null;
}

export function EditHistory({ items, onSelect, selectedId }: EditHistoryProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <History className="w-4 h-4" />
        編集履歴
      </h3>
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedId === item.id
                  ? "border-primary"
                  : "border-transparent hover:border-primary/30"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.prompt}
                width={120}
                height={90}
                className="w-[120px] h-[90px] object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
