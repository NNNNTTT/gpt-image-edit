"use client";

import { Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";

const PRESETS = [
  "背景をぼかす",
  "空を夕焼けに変更",
  "画像を水彩画風に変換",
  "不要なオブジェクトを除去",
  "明るさとコントラストを調整",
  "季節を冬に変更",
];

interface PresetPromptsProps {
  onSelect: (prompt: string) => void;
}

export function PresetPrompts({ onSelect }: PresetPromptsProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-semibold">
        <Sparkles className="w-4 h-4 text-primary" />
        おすすめプロンプト
      </Label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => onSelect(preset)}
            className="text-xs px-3 py-1.5 rounded-full border bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
