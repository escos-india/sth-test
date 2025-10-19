'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isDashboardPage = pathname === '/sthapati/dashboard';
  const headerClasses = cn(
    'sticky top-0 z-50 w-full transition-all duration-300',
    {
      'bg-transparent text-foreground': isHomePage && !isScrolled,
      'bg-background/90 text-foreground shadow-md backdrop-blur-sm': !isHomePage || isScrolled,
    }
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden sm:flex flex-col">
                <span className="text-xl font-bold leading-tight">sthāpati</span>
                <span className="text-xs leading-tight">The Master Creator</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
            {isDashboardPage ? (
                <Button asChild className="rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                    <Link href="/sthapati/login">
                        Logout
                    </Link>
                </Button>
            ) : (
                <div className="hidden sm:flex items-center gap-2">
                    <Button asChild className="rounded-full">
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                    <Button asChild className="rounded-full">
                        <Link href="/register">
                            Get Started
                        </Link>
                    </Button>
                </div>
            )}
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                        <Link href="/" className="flex items-center gap-2">
                            <Logo className="w-8 h-8" />
                            <span className="text-xl font-bold">Sthapati</span>
                        </Link>
                    </div>
                    <nav className="flex-grow grid gap-4 p-6 text-base font-medium">
                        {/* The mobile navigation links have also been removed */}
                    </nav>
                    <div className="p-4 border-t mt-auto space-y-4">
                        {isDashboardPage ? (
                            <Button asChild className="w-full bg-red-500 text-white hover:bg-red-600">
                                <Link href="/sthapati/login">
                                    Logout
                                </Link>
                            </Button>
                        ) : (
                            <div className="flex flex-col gap-2">
                               <Button asChild className="w-full">
                                    <Link href="/login">
                                        Login
                                    </Link>
                                </Button>
                                <Button asChild className="w-full">
                                    <Link href="/register">
                                        Get Started
                                    </Link>
                                </Button>
                            </div>
                        )}
                         <div className="flex items-center gap-2">
                           <ModeToggle />
                           <span className="text-sm text-muted-foreground">Switch Theme</span>
                       </div>
                    </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
