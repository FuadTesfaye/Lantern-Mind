import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
