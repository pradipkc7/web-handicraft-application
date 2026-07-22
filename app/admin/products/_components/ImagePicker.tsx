"use client";
import { useEffect, useRef } from "react";

export type PickedImage = {
  file?: File;
  path?: string; // already-uploaded path (existing product image)
  preview: string;
};

const getImageUrl = (path: string) =>
  (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088") + path;

export const toPickedImages = (paths: string[]): PickedImage[] =>
  paths.map((path) => ({ path, preview: getImageUrl(path) }));

export default function ImagePicker({
  images,
  onChange,
}: {
  images: PickedImage[];
  onChange: (images: PickedImage[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrls = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const added = Array.from(files).map((file) => {
      const preview = URL.createObjectURL(file);
      objectUrls.current.push(preview);
      return { file, preview };
    });
    onChange([...images, ...added]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAt = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative h-20 w-20 shrink-0">
            <img
              src={img.preview}
              alt={`Product image ${i + 1}`}
              className="h-20 w-20 rounded-md object-cover ring-2 ring-gray-200"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white shadow-sm transition-opacity hover:opacity-90"
            >
              ✕
            </button>
          </div>
        ))}

        <label className="group flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-indigo-400 hover:bg-indigo-50/40">
          <svg
            className="text-gray-400 group-hover:text-indigo-500"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="text-[10px] text-gray-400 group-hover:text-indigo-600">
            Add
          </span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => addFiles(e.target.files)}
          />
        </label>
      </div>
      <p className="text-[10px] text-gray-400">JPG, PNG, WEBP · up to 5MB each</p>
    </div>
  );
}
