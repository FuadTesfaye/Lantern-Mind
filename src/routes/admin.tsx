import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate({ to: "/admin/login" });
      } else {
        setIsAuthenticated(true);
      }
      setIsChecking(false);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate({ to: "/admin/login" });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

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
  );
}
