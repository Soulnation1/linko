"use client";

import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { IconButton } from "@/components/ui";

export function PublicLinkPill({ slug }: { slug: string }) {
  const publicUrl = () => `${window.location.origin}/${slug}/cart-preview`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl());
      toast.success("Business link copied");
    } catch {
      toast.error("Could not copy the business link. Please copy it from the address bar.");
    }
  };

  const previewPage = () => {
    window.open(publicUrl(), "_blank", "noopener,noreferrer");
  };

  const buttonClass = "size-8 rounded-md hover:bg-white hover:text-indigo-700";

  return (
    <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
      <span className="max-w-44 truncate text-xs font-medium text-slate-600">
        /{slug}
      </span>
      <IconButton label="Copy public business link" onClick={copyLink} className={buttonClass}>
        <Copy className="size-4" aria-hidden="true" />
      </IconButton>
      <IconButton label="Preview public business page" onClick={previewPage} className={buttonClass}>
        <ExternalLink className="size-4" aria-hidden="true" />
      </IconButton>
    </div>
  );
}
