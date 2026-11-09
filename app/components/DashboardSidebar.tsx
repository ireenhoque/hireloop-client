"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
    Briefcase,
    FileText,
    LayoutDashboard,
    Settings,
    Users,
    type LucideIcon,
} from "lucide-react"

type Role = "seeker" | "recruiter" | "admin"

type MenuItem = {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
    seeker: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { id: "jobs", name: "Browse Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
        { id: "applications", name: "My Applications", url: "/dashboard/seeker/applications", icon: FileText },
        { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],
    recruiter: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { id: "jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
        { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
        { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
    ],
    admin: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
        { id: "jobs", name: "Manage Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
        { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ],
}

export function DashboardSidebar() {
    const { data: session, isPending } = useSession();
    const role = session?.user?.role || 'seeker';

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItemsByRole[role].map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton render={<a href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}