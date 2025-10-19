
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navLinks = [
  { href: '/community', label: 'Community' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

const resourceLinks = [
    { href: '#', label: 'Blog' },
    { href: '#', label: 'Help Center' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'API Docs' },
];

const socialLinks = [
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Github, href: '#', name: 'GitHub' },
    { icon: Mail, href: 'mailto:contact@sthupati.com', name: 'Email' },
];


export function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              The premier professional network for the Architecture, Construction, and Engineering industries. Connect, collaborate, and build your future with us.
            </p>
            <Link href="/about" className="text-sm font-medium text-primary hover:underline">
                Learn More
            </Link>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex items-center space-x-4">
                <TooltipProvider>
                    {socialLinks.map((social) => (
                        <Tooltip key={social.name}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={social.href}
                                    aria-label={social.name}
                                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
                                >
                                    <social.icon className="h-6 w-6" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{social.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Sthapati. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
