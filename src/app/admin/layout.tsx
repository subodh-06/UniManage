"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { adminData } from "@/data/adminData"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" data={adminData} />
      <SidebarInset>
        <SiteHeader Dname="Admin Dashboard" />
        <div className="flex flex-1 flex-col w-full">
          <div className="@container/main flex flex-1 flex-col gap-2 p-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
