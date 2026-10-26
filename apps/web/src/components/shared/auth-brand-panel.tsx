import Link from "next/link";
import { LinkoMark } from "@linko/ui";

const PANEL_GRADIENT =
  "bg-gradient-to-br from-[#312E81] via-[#1E1B4B] to-[#0F172A]";

function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="Linko home"
      className="flex w-fit items-center gap-2 rounded-lg focus-visible:outline-white!"
    >
      <LinkoMark
        decorative
        className="size-9 rounded-[25%] shadow-sm shadow-indigo-500/25"
      />
      <span className="font-sans text-xl font-extrabold tracking-tight text-white">
        Link
        <span className="bg-gradient-to-br from-[#FDBA74] to-[#F59E0B] bg-clip-text text-transparent">
          o
        </span>
      </span>
    </Link>
  );
}

function BusinessIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="20 24 410 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M240 104 C 252 84, 258 72, 268 70"
        fill="none"
        stroke="rgba(199,210,254,0.45)"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />

      <rect
        x="52"
        y="100"
        width="216"
        height="150"
        rx="6"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(199,210,254,0.35)"
        strokeWidth="2"
      />
      <rect x="84" y="36" width="150" height="22" rx="11" fill="#FDBA74" />
      <rect x="112" y="44" width="94" height="6" rx="3" fill="#1E1B4B" />

      <rect x="40" y="60" width="240" height="40" fill="#818CF8" />
      <rect x="80" y="60" width="40" height="40" fill="#C7D2FE" />
      <rect x="160" y="60" width="40" height="40" fill="#C7D2FE" />
      <rect x="240" y="60" width="40" height="40" fill="#C7D2FE" />
      <g fill="#818CF8">
        <circle cx="60" cy="100" r="20" />
        <circle cx="140" cy="100" r="20" />
        <circle cx="220" cy="100" r="20" />
        <circle cx="280" cy="100" r="20" />
      </g>
      <g fill="#C7D2FE">
        <circle cx="100" cy="100" r="20" />
        <circle cx="180" cy="100" r="20" />
        <circle cx="260" cy="100" r="20" />
      </g>

      <rect
        x="68"
        y="122"
        width="96"
        height="72"
        rx="6"
        fill="rgba(199,210,254,0.16)"
      />
      <circle cx="94" cy="156" r="14" fill="#FDBA74" />
      <rect x="116" y="142" width="32" height="32" rx="8" fill="#A5B4FC" />
      <rect x="80" y="176" width="72" height="6" rx="3" fill="rgba(255,255,255,0.5)" />

      <rect x="186" y="132" width="50" height="118" rx="5" fill="#4F46E5" />
      <circle cx="226" cy="194" r="3" fill="#FDBA74" />

      <rect x="272" y="156" width="150" height="112" rx="16" fill="rgba(0,0,0,0.25)" />
      <rect x="268" y="150" width="150" height="112" rx="16" fill="#FFFFFF" />
      <rect x="284" y="164" width="48" height="48" rx="12" fill="#EEF2FF" />
      <rect x="296" y="180" width="24" height="22" rx="4" fill="#4F46E5" />
      <path
        d="M300 180 Q 308 166 316 180"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="344" y="170" width="58" height="8" rx="4" fill="#334155" />
      <rect x="344" y="186" width="40" height="6" rx="3" fill="#CBD5E1" />
      <rect x="284" y="226" width="54" height="20" rx="10" fill="#4F46E5" />
      <rect x="350" y="226" width="52" height="20" rx="10" fill="#EEF2FF" />

      <rect x="268" y="40" width="150" height="72" rx="16" fill="#25D366" />
      <path d="M284 110 L 280 124 L 300 112 Z" fill="#25D366" />
      <rect x="284" y="56" width="100" height="8" rx="4" fill="#FFFFFF" />
      <rect x="284" y="72" width="74" height="8" rx="4" fill="rgba(255,255,255,0.85)" />
      <path
        d="M386 96 L 390 100 L 398 91 M 380 96 L 384 100 L 392 91"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x="34"
        y="236"
        width="120"
        height="96"
        rx="16"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.5"
      />
      <rect x="50" y="252" width="60" height="8" rx="4" fill="rgba(255,255,255,0.7)" />
      <g fill="rgba(255,255,255,0.22)">
        <rect x="50" y="270" width="18" height="18" rx="5" />
        <rect x="74" y="270" width="18" height="18" rx="5" />
        <rect x="122" y="270" width="18" height="18" rx="5" />
        <rect x="50" y="294" width="18" height="18" rx="5" />
        <rect x="74" y="294" width="18" height="18" rx="5" />
        <rect x="98" y="294" width="18" height="18" rx="5" />
        <rect x="122" y="294" width="18" height="18" rx="5" />
      </g>
      <rect x="98" y="270" width="18" height="18" rx="5" fill="#FBBF24" />
    </svg>
  );
}

export function AuthBrandPanel({
  panelTitle,
  panelSubtext,
}: {
  panelTitle: string;
  panelSubtext?: string;
}) {
  return (
    <>
      <div
        className={`mx-4 mt-4 rounded-2xl p-4 text-white md:hidden ${PANEL_GRADIENT}`}
      >
        <BrandLogo />
        <p className="mt-3 text-sm font-semibold leading-6">{panelTitle}</p>
      </div>

      <div
        className={`relative isolate hidden overflow-hidden rounded-3xl p-8 text-white md:flex md:flex-col lg:p-10 xl:p-12 ${PANEL_GRADIENT}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_12%,rgba(129,140,248,0.35),transparent_50%)]"
        />
        <BrandLogo />
        <div className="flex min-h-0 flex-1 items-center justify-center py-8">
          <BusinessIllustration className="h-full max-h-[420px] w-full" />
        </div>
        <div className="max-w-lg">
          <p className="text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
            {panelTitle}
          </p>
          {panelSubtext && (
            <p className="mt-4 max-w-md text-base leading-7 text-indigo-100">
              {panelSubtext}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
