import { MOCK_BUSINESS } from "@/lib/mock-data";
import { BusinessIdentity } from "./business-identity";
import { DashboardNav } from "./dashboard-nav";
import { LogoutButton } from "./logout-button";

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
        <LogoutButton />
      </div>
    </aside>
  );
}
