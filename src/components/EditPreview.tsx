"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface EditPreviewProps {
  imageUrl: string | null;
  isLoading: boolean;
}

export function EditPreview({ imageUrl, isLoading }: EditPreviewProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold">編集プレビュー</h2>
      <p className="text-xs text-muted-foreground">
        編集された画像がここに表示されます
      </p>
      <div className="relative rounded-xl border bg-muted/30 overflow-hidden aspect-[4/3] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">画像を編集中...</p>
          </div>
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt="編集後の画像"
            fill
            className="object-contain"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="w-16 h-16 opacity-20" />
            <p className="text-sm">
              左のパネルから画像をアップロードして編集を開始
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
