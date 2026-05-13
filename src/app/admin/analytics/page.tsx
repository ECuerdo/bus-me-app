import AdminHeader from "@/app/_components/AdminHeader";
import AnalyticsModule from "@/modules/admin/analytics/AnalyticsModule";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Page() {
    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <AdminHeader 
                breadcrumbs={[
                    { label: "Admin Dashboard", href: "/admin" },
                    { label: "Market Intelligence" }
                ]} 
            />
            <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-10 scroll-smooth">
                <AnalyticsModule />
            </main>
        </div>
    );
}
