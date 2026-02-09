import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// HSL string "217 91% 55%" → hex
function hslToHex(hslStr: string): string {
  try {
    const parts = hslStr.trim().split(/\s+/);
    const h = parseFloat(parts[0]) || 0;
    const s = (parseFloat(parts[1]) || 0) / 100;
    const l = (parseFloat(parts[2]) || 0) / 100;

    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  } catch {
    return "#3b82f6";
  }
}

// hex → HSL string "217 91% 55%"
function hexToHsl(hex: string): string {
  try {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  } catch {
    return "217 91% 55%";
  }
}

interface ColorPickerProps {
  label: string;
  description?: string;
  value: string; // HSL string
  onChange: (hsl: string) => void;
}

export function ColorPicker({ label, description, value, onChange }: ColorPickerProps) {
  const [hex, setHex] = useState(() => hslToHex(value));

  useEffect(() => {
    setHex(hslToHex(value));
  }, [value]);

  const handleColorChange = (newHex: string) => {
    setHex(newHex);
    onChange(hexToHsl(newHex));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-3 w-full h-10 px-3 rounded-md border border-input bg-background hover:bg-accent/10 transition-colors cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded border shadow-sm flex-shrink-0"
              style={{ backgroundColor: hex }}
            />
            <span className="text-sm text-muted-foreground">{hex.toUpperCase()}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 space-y-3" align="start">
          <p className="text-sm font-medium">Escolha a cor</p>
          <input
            type="color"
            value={hex}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-48 h-36 cursor-pointer border-0 p-0 bg-transparent"
          />
          <Input
            value={hex}
            onChange={(e) => {
              if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                handleColorChange(e.target.value);
              }
              setHex(e.target.value);
            }}
            placeholder="#3B82F6"
            className="font-mono text-sm"
          />
        </PopoverContent>
      </Popover>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}
