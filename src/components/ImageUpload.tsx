"use client";

import { useCallback, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ImageUploadProps {
  image: File | null;
  preview: string | null;
  onImageChange: (file: File | null) => void;
}

export function ImageUpload({ image, preview, onImageChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && isValidImage(file)) {
        onImageChange(file);
      }
    },
    [onImageChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidImage(file)) {
      onImageChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-semibold">
        <Upload className="w-4 h-4 text-primary" />
        画像をアップロード
      </Label>
      {preview ? (
        <div className="relative rounded-lg overflow-hidden border">
          <Image
            src={preview}
            alt="アップロード画像"
            width={400}
            height={300}
            className="w-full h-40 object-cover"
          />
          <button
            onClick={() => {
              onImageChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="px-3 py-2 bg-muted text-xs text-muted-foreground truncate">
            {image?.name}
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors"
        >
          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            編集したい画像をドラッグ&ドロップ、
            <br />
            またはクリックしてアップロード
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPEG, WebP (最大 25MB)
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

function isValidImage(file: File): boolean {
  const validTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!validTypes.includes(file.type)) {
    alert("PNG, JPEG, WebP のいずれかを選択してください");
    return false;
  }
  if (file.size > 25 * 1024 * 1024) {
    alert("ファイルサイズは25MB以下にしてください");
    return false;
  }
  return true;
}
