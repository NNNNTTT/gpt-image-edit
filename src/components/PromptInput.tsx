"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptInput({ value, onChange }: PromptInputProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-semibold">
        <Pencil className="w-4 h-4 text-primary" />
        編集の指示を入力
      </Label>
      <Textarea
        placeholder="空を夕焼けに変更してください。建物はそのままにしてください。"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="resize-none"
      />
      <p className="text-xs text-muted-foreground">
        日本語で指示して、画像にどの変更を加えるかを入力してください
      </p>
    </div>
  );
}
