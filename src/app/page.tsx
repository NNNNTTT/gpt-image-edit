"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { ImageUpload } from "@/components/ImageUpload";
import { PromptInput } from "@/components/PromptInput";
import { PresetPrompts } from "@/components/PresetPrompts";
import { ModelSettings } from "@/components/ModelSettings";
import { EditPreview } from "@/components/EditPreview";
import { EditHistory, HistoryItem } from "@/components/EditHistory";
import { PromptHistory } from "@/components/PromptHistory";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Wand2, Download, PlusCircle } from "lucide-react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [promptHistory, setPromptHistory] = useState<
    { prompt: string; timestamp: Date }[]
  >([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(
    null
  );

  const handleImageChange = useCallback((file: File | null) => {
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  }, []);

  const handleEdit = async () => {
    if (!image || !prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("prompt", prompt);
      formData.append("size", size);

      const res = await fetch("/api/edit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "編集に失敗しました");
      }

      setResultImage(data.imageUrl);
      setSelectedHistoryId(null);

      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        imageUrl: data.imageUrl,
        prompt,
        timestamp: new Date(),
      };
      setHistory((prev) => [newItem, ...prev]);
      setPromptHistory((prev) => [
        { prompt, timestamp: new Date() },
        ...prev,
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setResultImage(item.imageUrl);
    setSelectedHistoryId(item.id);
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = `edited-${Date.now()}.png`;
    a.click();
  };

  const handleNewEdit = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImage(null);
    setImagePreview(null);
    setResultImage(null);
    setSelectedHistoryId(null);
    setPrompt("");
    setError(null);
    setHistory([]);
    setPromptHistory([]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* 左サイドバー */}
        <aside className="w-80 border-r p-5 overflow-y-auto flex flex-col gap-5 flex-shrink-0">
          <ImageUpload
            image={image}
            preview={imagePreview}
            onImageChange={handleImageChange}
          />
          <Separator />
          <PromptInput value={prompt} onChange={setPrompt} />
          {/* <PresetPrompts onSelect={setPrompt} /> */}
          <Separator />
          <ModelSettings size={size} onSizeChange={setSize} />
          <Button
            onClick={handleEdit}
            disabled={!image || !prompt.trim() || isLoading}
            className="w-full mt-auto"
            size="lg"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isLoading ? "編集中..." : "編集を実行"}
          </Button>
        </aside>

        {/* メインエリア */}
        <main className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
          <EditPreview imageUrl={resultImage} isLoading={isLoading} />

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <EditHistory
            items={history}
            onSelect={handleHistorySelect}
            selectedId={selectedHistoryId}
          />

          {resultImage && (
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                ダウンロード
              </Button>
              <Button variant="outline" onClick={handleNewEdit}>
                <PlusCircle className="w-4 h-4 mr-2" />
                新しい編集を開始
              </Button>
            </div>
          )}
        </main>

        {/* 右サイドバー */}
        <aside className="w-72 border-l p-5 overflow-y-auto flex-shrink-0">
          <PromptHistory
            items={promptHistory}
            onSelect={(p) => setPrompt(p)}
          />
        </aside>
      </div>
    </div>
  );
}
