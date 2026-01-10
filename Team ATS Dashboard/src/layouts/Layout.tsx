import { AppSidebar } from "@/components/ui/app-sidebar";
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <SidebarProvider style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            } className="flex w-full min-h-screen">
                <AppSidebar />
                <SidebarInset>
                    <SiteHeader />
                    <div className="@container/main p-4 lg:p-6">
                        <Outlet />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}