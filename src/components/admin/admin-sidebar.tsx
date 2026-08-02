import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Users, FileText, Mail, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs">
            V
          </div>
          <span>Velorah Admin</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5 flex-shrink-0")} aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <Link
          to="/"
          className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
          Exit Admin
        </Link>
      </div>
    </div>
  );
}
