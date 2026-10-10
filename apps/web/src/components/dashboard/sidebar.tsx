import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { MOCK_BUSINESS } from "@/lib/mock-data";
import { BusinessIdentity } from "./business-identity";
import { DashboardNav } from "./dashboard-nav";

export function Sidebar() {
  return (
    <aside className="hidden h-dvh w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-100 px-5 py-5">
        <BusinessIdentity business={MOCK_BUSINESS} />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <DashboardNav business={MOCK_BUSINESS} />
      </div>
      <div className="border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={() => toast.info("Sign out will be available when authentication is added.")}
          className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Log out
        </button>
      </div>
    </aside>
  );
}
