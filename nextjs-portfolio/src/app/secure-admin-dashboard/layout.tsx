"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/secure-admin-dashboard/login') {
      setAuthenticated(true);
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          setAuthenticated(true);
        } else {
          router.push("/secure-admin-dashboard/login");
        }
      } catch (err) {
        router.push("/secure-admin-dashboard/login");
      }
    };
    verify();
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-white/10 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (pathname === '/secure-admin-dashboard/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row pt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass border-r border-white/10 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-6">Admin Panel</h2>
        
        <nav className="flex flex-col gap-2 flex-grow">
          <Link href="/secure-admin-dashboard" className="px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors interactive">
            Dashboard
          </Link>
          <Link href="/secure-admin-dashboard?tab=gallery" className="px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors interactive">
            Manage Gallery
          </Link>
          <Link href="/secure-admin-dashboard?tab=certs" className="px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors interactive">
            Manage Certificates
          </Link>
          <Link href="/secure-admin-dashboard?tab=messages" className="px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors interactive">
            Messages
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-auto text-left interactive"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
