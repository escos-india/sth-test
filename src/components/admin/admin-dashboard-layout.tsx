'use client';

import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Package,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Logo from '@/components/ui/logo';
import { ThemeToggle } from '../utils/theme-toggle';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/approvals', label: 'User Approvals', icon: CheckSquare },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/payments', label: 'Payments', icon: DollarSign },
  { href: '/admin/audit-logs', label: 'Audit Logs', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function SidebarNav({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex flex-col gap-2 px-2',
        isCollapsed ? 'items-center' : 'items-stretch'
      )}
    >
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} legacyBehavior passHref>
          <Button
            variant={pathname === link.href ? 'secondary' : 'ghost'}
            className={cn(
              'justify-start',
              isCollapsed ? 'w-10 h-10 p-0' : 'w-full'
            )}
            title={isCollapsed ? link.label : undefined}
          >
            <link.icon className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">{link.label}</span>}
          </Button>
        </Link>
      ))}
    </nav>
  );
}

function MobileNav() {
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async () => {
      // This is a mock logout. In a real app, this would clear session/token.
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/admin/login');
    }

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:hidden">
      <Link href="/admin" className="flex items-center gap-2 font-semibold">
        <Logo className="h-8 w-8" />
        <span className="">Sthapati Admin</span>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                <Link
                    href="/admin"
                    className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                    <Logo className="h-8 w-8" />
                    <span className="sr-only">Sthapati</span>
                </Link>
                {navLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                    </Link>                ))}
                </nav>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
     // This is a mock logout. In a real app, this would clear session/token.
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    router.push('/admin/login');
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <div
        className={cn(
          'hidden border-r bg-background lg:flex lg:flex-col transition-[width] duration-300',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center border-b px-4 shrink-0">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-semibold"
          >
            <Logo className="h-8 w-8" />
            {!isCollapsed && <span>Sthapati Admin</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <SidebarNav isCollapsed={isCollapsed} />
        </div>
        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <MobileNav />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
