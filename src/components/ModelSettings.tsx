"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface ModelSettingsProps {
  size: string;
  onSizeChange: (size: string) => void;
}

export function ModelSettings({ size, onSizeChange }: ModelSettingsProps) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-semibold">
        <Settings className="w-4 h-4 text-primary" />
        モデルと設定
      </Label>
      <div className="space-y-2">
        <div>
          <Label className="text-xs text-muted-foreground">モデル</Label>
          <Select defaultValue="gpt-image-2" disabled>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-image-2">gpt-image-2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">画像サイズ</Label>
          <Select value={size} onValueChange={(v) => { if (v) onSizeChange(v); }}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-56">
              <SelectItem value="1024x1024">1024 × 1024（正方形）</SelectItem>
              <SelectItem value="1536x1024">1536 × 1024（横長）</SelectItem>
              <SelectItem value="1024x1536">1024 × 1536（縦長）</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
