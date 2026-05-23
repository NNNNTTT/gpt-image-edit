import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const prompt = formData.get("prompt") as string | null;
    const size = (formData.get("size") as string) || "1024x1024";

    if (!image || !prompt) {
      return NextResponse.json(
        { error: "画像とプロンプトは必須です" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI APIキーが設定されていません" },
        { status: 500 }
      );
    }

    const response = await openai.images.edit({
      model: "gpt-image-2",
      image,
      prompt,
      size: size as "1024x1024" | "1536x1024" | "1024x1536",
    });

    const imageBase64 = response.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "画像の生成に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${imageBase64}`,
    });
  } catch (error) {
    console.error("Image edit error:", error);
    const message =
      error instanceof Error ? error.message : "画像の編集中にエラーが発生しました";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
