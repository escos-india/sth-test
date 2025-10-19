'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { Loader, Search, Building, Users, Handshake, GraduationCap, Briefcase, HardHat, Hammer } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchContent } from '@/app/actions/search';
import type { Post, User, Blog } from '@/app/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type SearchResults = {
  posts: Post[];
  users: User[];
  blogs: Blog[];
};

const searchCategories = [
    { name: 'Professionals', icon: <Users />, href: '/professionals' },
    { name: 'Agencies', icon: <Building />, href: '/agencies' },
    { name: 'Material Suppliers', icon: <Handshake />, href: '/material-suppliers' },
    { name: 'Educational Institutes', icon: <GraduationCap />, href: '/educational-institutes' },
    { name: 'Jobs', icon: <Briefcase />, href: '/jobs' }, 
    { name: 'Builders', icon: <HardHat />, href: '/builders' },
    { name: 'Contractors', icon: <Hammer />, href: '/contractors' },
];

const images = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
  "/images/6.png"
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<SearchResults>({ posts: [], users: [], blogs: [] });
  const [showPopover, setShowPopover] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const playAnimation = useCallback(async () => {
    await controls.start({ y: 2, boxShadow: '0 2px 0px hsl(var(--primary))' });
    await controls.start({ y: 0, boxShadow: '0 5px 0px hsl(var(--primary))' });
  }, [controls]);

  const handleSearch = useCallback((searchTerm: string) => {
    if (searchTerm.length > 0) {
      setShowPopover(true);
      startTransition(async () => {
        const res = await searchContent(searchTerm);
        setResults({ ...res, users: [], blogs: [] });
      });
    } else {
      setShowPopover(false);
      setResults({ posts: [], users: [], blogs: [] });
    }
  }, []);
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
        if(query.length > 1) {
            handleSearch(query);
        } else {
            setShowPopover(false);
            setResults({ posts: [], users: [], blogs: [] });
        }
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [query, handleSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      e.preventDefault();
      e.currentTarget.select();
    }
  };

  const hasResults = results.posts.length > 0 || results.users.length > 0 || results.blogs.length > 0;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <AnimatePresence>
            <motion.div
                key={currentImage}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
            >
                {images[currentImage] && (
                <img
                    src={images[currentImage]}
                    alt="Architectural background"
                    className="w-full h-full object-cover object-center filter blur-sm md:blur"
                />
                )}
            </motion.div>
            </AnimatePresence>
            <div 
            className="absolute inset-0 z-10 bg-black/40" 
            ></div>
        </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-20 flex flex-col items-center justify-center h-full pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="w-full max-w-4xl"
        >
           <motion.h1 
            className="text-4xl md:text-6xl font-bold font-headline"
            style={{ color: 'var(--hero-text)', textShadow: 'var(--hero-text-shadow)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Connect & Build
          </motion.h1>
          <motion.h2 
            className="text-lg md:text-xl font-semibold mb-8 text-balance"
            style={{ color: 'var(--hero-text)', textShadow: 'var(--hero-text-shadow)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            The Premier Network for the ACE Industry.
          </motion.h2>
          <Popover open={showPopover && query.length > 1} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    playAnimation();
                    if(query.length > 1) {
                        handleSearch(query);
                    }
                  }}
                >
                  <motion.div 
                      className="relative flex justify-center"
                      onHoverStart={() => setIsExpanded(true)}
                      onHoverEnd={() => { if(query === '') setIsExpanded(false) }}
                  >
                      <motion.div 
                          className="relative flex items-center bg-background/90 dark:bg-black/90 border-2 dark:border-white border-black rounded-full shadow-2xl p-2 transition-colors duration-300"
                          animate={{ width: isExpanded ? '100%' : '3.5rem' }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
                      >
                          <motion.div
                              className="absolute left-0 top-0 bottom-0 flex items-center justify-center"
                              animate={{ width: isExpanded ? '3.5rem' : '100%' }}
                          >
                            <Search className="h-6 w-6 text-muted-foreground" />
                          </motion.div>

                          <Input
                              type="search"
                              placeholder={isExpanded ? "Search for companies, opportunities, topics..." : ""}
                              className={cn(
                                  "pl-12 pr-4 h-14 text-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-foreground rounded-full w-full transition-opacity duration-300",
                                  isExpanded ? 'opacity-100' : 'opacity-0'
                              )}
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              onKeyDown={handleKeyDown}
                              onFocus={() => setIsExpanded(true)}
                              onBlur={() => { if(query === '') setIsExpanded(false) }}
                          />
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: 0.2, type: 'spring', stiffness: 200, damping: 20 } }}
                                exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
                                className="pr-2 flex items-center"
                              >
                                {isPending && <Loader className="animate-spin text-primary h-5 w-5 mr-3" />}
                                <motion.div
                                  animate={controls}
                                  onMouseDown={() => playAnimation()}
                                >
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isPending}
                                        className="h-14 w-28 text-base rounded-full shadow-md hover:shadow-lg transition-all"
                                        style={{
                                            boxShadow: '0 5px 0px hsl(var(--primary))',
                                        }}
                                    >
                                        Search
                                    </Button>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                      </motion.div>
                  </motion.div>
                </form>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] mt-2 max-h-[50vh] overflow-y-auto rounded-xl shadow-2xl border-border bg-background/95 backdrop-blur-sm">
              {isPending && (
                <div className="flex items-center justify-center p-4">
                  <Loader className="animate-spin text-primary" />
                </div>
              )}
              {!isPending && !hasResults && query.length > 2 && (
                <p className="text-center text-muted-foreground p-4">No results found.</p>
              )}
              {hasResults && (
                <div className="p-2">
                  {results.posts.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-semibold uppercase text-muted-foreground px-3 py-2">Community Posts</h3>
                      {results.posts.map(post => (
                        <div key={`post-${post.id}`} className="p-3 hover:bg-accent rounded-md cursor-pointer text-sm font-medium">
                          {post.title}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.users.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-semibold uppercase text-muted-foreground px-3 py-2">People</h3>
                      {results.users.map(user => (
                        <div key={`user-${user.id}`} className="p-3 hover:bg-accent rounded-md cursor-pointer text-sm font-medium">
                          {user.name} - <span className="text-muted-foreground font-normal">{user.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {results.blogs.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase text-muted-foreground px-3 py-2">Blogs</h3>
                      {results.blogs.map(blog => (
                        <div key={`blog-${blog.id}`} className="p-3 hover:bg-accent rounded-md cursor-pointer text-sm font-medium">
                          {blog.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </PopoverContent>
          </Popover>

          <motion.div 
            className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
                {searchCategories.map((category, index) => (
                    <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="shadow-md rounded-full"
                    >
                         <Button 
                            asChild
                            variant="default"
                            className="rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <Link href={category.href} className="flex items-center gap-2 px-4 py-2">
                              {category.icon}
                              <span className="font-semibold">{category.name}</span>
                            </Link>
                        </Button>
                    </motion.div>
                ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
