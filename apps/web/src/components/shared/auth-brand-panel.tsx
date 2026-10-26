import Link from "next/link";
import { LinkoMark } from "@linko/ui";
import { AuthFlowDemo } from "./auth-flow-demo";

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
        <div className="flex min-h-0 flex-1 items-center justify-center py-6">
          <AuthFlowDemo />
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
