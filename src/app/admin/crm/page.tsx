import AdminHeader from "@/app/_components/AdminHeader";
import CrmModule from "@/modules/admin/crm/CrmModule";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Page() {
    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <AdminHeader 
                breadcrumbs={[
                    { label: "Admin Dashboard", href: "/admin" },
                    { label: "Safety & Compliance" }
                ]} 
            />
            <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-10 scroll-smooth">
                <CrmModule />
            </main>
        </div>
    );
}
