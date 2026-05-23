"use client";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun, ImageIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
          <ImageIcon className="w-5 h-5" />
        </div>
        <h1 className="text-lg font-bold">GPT Image Editor</h1>
        <Badge variant="secondary" className="text-xs">
          Beta
        </Badge>
      </div>
      {mounted && (
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-muted-foreground" />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) =>
              setTheme(checked ? "dark" : "light")
            }
          />
          <Moon className="w-4 h-4 text-muted-foreground" />
          <Label className="sr-only">ダークモード切替</Label>
        </div>
      )}
    </header>
  );
}
