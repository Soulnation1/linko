"use client";

import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export type ImageUploadProps = {
  label: string;
  value?: string | null;
  onChange: (file: File | null) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
};

export function ImageUpload({
  label,
  value = null,
  onChange,
  onError,
  disabled = false,
}: ImageUploadProps) {
  const [localPreview, setLocalPreview] = useState<{
    forValue: string | null | undefined;
    url: string;
  } | null>(null);
  const [error, setError] = useState("");
  const previewUrl =
    localPreview?.forValue === value ? localPreview.url : value;

  useEffect(
    () => () => {
      if (localPreview?.url.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview.url);
      }
    },
    [localPreview],
  );

  const setUploadError = (message: string) => {
    setError(message);
    onError?.(message);
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setUploadError("Image must be 5 MB or smaller.");
      return;
    }

    setError("");
    setLocalPreview({ forValue: value, url: URL.createObjectURL(file) });
    onChange(file);
  };

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-slate-800">
        {label}
      </span>
      {previewUrl ? (
        <div className="relative w-fit">
          {/* The uploader receives user-selected image files for local preview. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={`${label} preview`}
            className="size-28 rounded-xl border border-slate-200 object-cover"
          />
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              setLocalPreview(null);
              setError("");
              onChange(null);
            }}
            aria-label={`Remove ${label.toLowerCase()}`}
            className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-50 disabled:opacity-50"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <label
          className={`flex min-h-28 w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 text-center text-sm text-slate-600 hover:border-indigo-400 hover:bg-indigo-50/40 ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <ImagePlus className="mb-2 size-5 text-slate-500" aria-hidden="true" />
          <span className="font-semibold text-slate-800">Choose an image</span>
          <span className="mt-1 text-xs">Image file, up to 5 MB</span>
          <input
            type="file"
            accept="image/*"
            disabled={disabled}
            className="sr-only"
            onChange={(event) => {
              handleFile(event.currentTarget.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
        </label>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
