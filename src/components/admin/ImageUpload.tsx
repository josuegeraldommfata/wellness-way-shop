import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  aspectRatio?: "square" | "banner" | "auto";
  className?: string;
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  aspectRatio = "auto",
  className,
  placeholder = "Arraste uma imagem ou clique para selecionar",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    square: "aspect-square",
    banner: "aspect-[16/9] md:aspect-[3/1]",
    auto: "min-h-[150px]",
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem (JPG, PNG, etc.)");
      return;
    }

    // Convert to base64 for localStorage storage (mock)
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleInputChange}
        className="hidden"
        id="image-upload"
      />

      {value ? (
        <div
          className={cn(
            "relative rounded-lg overflow-hidden border-2 border-border bg-muted",
            aspectClasses[aspectRatio]
          )}
        >
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-1" />
              Trocar
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleRemove}
            >
              <X className="h-4 w-4 mr-1" />
              Remover
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "border-2 border-dashed rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center p-6 text-center",
            aspectClasses[aspectRatio],
            isDragging
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{placeholder}</p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            JPG, PNG, WebP ou GIF
          </p>
        </div>
      )}
    </div>
  );
}

interface MultiImageUploadProps {
  values: string[];
  onChange: (values: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function MultiImageUpload({
  values,
  onChange,
  maxImages = 5,
  className,
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const newImages: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      if (values.length + newImages.length >= maxImages) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        processed++;
        if (processed === files.length || values.length + newImages.length >= maxImages) {
          onChange([...values, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newValues = [...values];
    const [moved] = newValues.splice(fromIndex, 1);
    newValues.splice(toIndex, 0, moved);
    onChange(newValues);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        className="hidden"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {values.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden border-2 border-border bg-muted group"
          >
            <img src={image} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="h-8 w-8"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {index === 0 && (
              <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                Principal
              </span>
            )}
          </div>
        ))}

        {values.length < maxImages && (
          <div
            onClick={() => inputRef.current?.click()}
            className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all flex flex-col items-center justify-center"
          >
            <Upload className="h-6 w-6 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Adicionar</span>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {values.length}/{maxImages} imagens • A primeira será a imagem principal
      </p>
    </div>
  );
}
