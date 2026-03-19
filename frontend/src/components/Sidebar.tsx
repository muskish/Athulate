"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  HomeIcon, 
  ClipboardDocumentCheckIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  BoltIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{name: string, email: string, avatar?: string} | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);
  
  return (
    <aside className="w-64 bg-surface border-r border-border hidden md:flex flex-col shadow-sm z-10">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-electric w-8 h-8 rounded-lg flex items-center justify-center shadow-md shadow-electric/20">
          <BoltIcon className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Athulation</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <SidebarItem href="/dashboard" icon={<HomeIcon className="w-5 h-5"/>} label="Dashboard" active={pathname === "/dashboard"} />
        <SidebarItem href="/workouts" icon={<ClipboardDocumentCheckIcon className="w-5 h-5"/>} label="Workouts" active={pathname?.startsWith("/workouts")} />
        <SidebarItem href="/nutrition" icon={<ChartBarIcon className="w-5 h-5"/>} label="Nutrition" active={pathname?.startsWith("/nutrition")} />
        <SidebarItem href="/guidance" icon={<AcademicCapIcon className="w-5 h-5"/>} label="Guidance" active={pathname?.startsWith("/guidance")} />
        <SidebarItem href="/recovery" icon={<ChartBarIcon className="w-5 h-5"/>} label="Recovery" active={pathname?.startsWith("/recovery")} />
        <SidebarItem href="/community" icon={<UserGroupIcon className="w-5 h-5"/>} label="Community" active={pathname?.startsWith("/community")} />
      </nav>
      <div className="p-4 border-t border-border mt-auto mb-4">
        <Link href="/profile" className="flex items-center gap-3 hover:bg-surface-hover p-2 rounded-lg cursor-pointer transition-colors group overflow-hidden">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-electric-dim flex items-center justify-center text-electric font-bold border border-electric/20 group-hover:bg-electric group-hover:text-white transition-colors overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" alt="User Avatar" />
            ) : (
              user ? user.name.charAt(0).toUpperCase() : "A"
            )}
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-sm font-bold text-foreground truncate">{user ? user.name : "Athlete Settings"}</p>
            <p className="text-xs text-slate-500 font-medium truncate">{user ? user.email : "Manage Profile"}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}

function SidebarItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium ${
        active 
          ? "bg-electric text-white shadow-md shadow-electric/20" 
          : "text-slate-500 hover:text-slate-900 hover:bg-surface-hover"
      }`}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
    </Link>
  );
}
