import Link from "next/link";
import { MOCK_BUSINESS } from "@/lib/mock-data";
import { getDashboardSectionTitle } from "@/lib/nav";
import { getTerms } from "@/lib/business-config";

export default async function DashboardPlaceholderPage({
  params,
}: {
  params: Promise<{ placeholder: string[] }>;
}) {
  const { placeholder } = await params;
  const pathname = `/dashboard/${placeholder.join("/")}`;
  const title = getDashboardSectionTitle(pathname, getTerms(MOCK_BUSINESS));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-indigo-700">Business workspace</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
        This workspace section is planned for an upcoming milestone.
      </p>
      <Link
        href="/dashboard"
        className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Back to dashboard
      </Link>
    </section>
  );
}
