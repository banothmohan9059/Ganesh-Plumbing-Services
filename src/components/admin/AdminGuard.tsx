"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import Link from "next/link";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser && !pathname.includes("/admin/login")) {
        router.push("/admin/login");
        setLoading(false);
      } else if (currentUser && pathname.includes("/admin/login")) {
        router.push("/admin/dashboard");
        setLoading(false);
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    }, (error) => {
      console.error("Auth error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/10">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Checking credentials...</p>
        </div>
      </div>
    );
  }

  // If on login page, just render it without the sidebar
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  // If not authenticated (and somehow didn't redirect), don't render children
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6 overflow-x-auto">
          <Link href="/admin/dashboard" className={`text-sm font-medium whitespace-nowrap transition-colors ${pathname === '/admin/dashboard' ? 'text-brand-600' : 'text-muted-foreground hover:text-foreground'}`}>Leads CRM</Link>
          <Link href="/admin/services" className={`text-sm font-medium whitespace-nowrap transition-colors ${pathname === '/admin/services' ? 'text-brand-600' : 'text-muted-foreground hover:text-foreground'}`}>Services</Link>
          <Link href="/admin/locations" className={`text-sm font-medium whitespace-nowrap transition-colors ${pathname === '/admin/locations' ? 'text-brand-600' : 'text-muted-foreground hover:text-foreground'}`}>Service Areas</Link>
          <Link href="/admin/gallery" className={`text-sm font-medium whitespace-nowrap transition-colors ${pathname === '/admin/gallery' ? 'text-brand-600' : 'text-muted-foreground hover:text-foreground'}`}>Gallery</Link>
          <Link href="/admin/media" className={`text-sm font-medium whitespace-nowrap transition-colors ${pathname === '/admin/media' ? 'text-brand-600' : 'text-muted-foreground hover:text-foreground'}`}>Media</Link>
          <Link href="/admin/reviews" className={`text-sm font-medium whitespace-nowrap transition-colors ${pathname === '/admin/reviews' ? 'text-brand-600' : 'text-muted-foreground hover:text-foreground'}`}>Reviews</Link>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
