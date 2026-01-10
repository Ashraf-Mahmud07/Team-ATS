import logo from "@/assets/icons/logo.jpg"
import logoIcon from "@/assets/icons/logo.jpg"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function TeamSwitcher() {
    const { open } = useSidebar()
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="cursor-default">
                    <div className={cn("flex aspect-square items-center justify-center rounded-md hover:border-[#004141] w-full", open ? "size-38" : "size-8")}>
                        <img src={open ? logo : logoIcon} alt="Logo" />
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
