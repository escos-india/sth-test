
"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { serviceProviderProfiles } from '@/app/lib/data';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Profile } from '@/app/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { NoResults } from '@/components/ui/no-results';

const ServiceProviderCard = ({ provider }: { provider: Profile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
        >
            <Card className="overflow-hidden h-full flex flex-col group text-center">
                <CardHeader className="p-6 bg-muted/20">
                    <div className="mx-auto bg-background rounded-full p-2 border-2 border-primary/10 shadow-sm">
                        <Image
                            src={provider.avatarUrl}
                            alt={`${provider.name} logo`}
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{provider.name}</h3>
                    <p className="text-sm text-primary font-semibold">{provider.specificService}</p>
                    <p className="text-xs text-muted-foreground mt-1">{provider.serviceCategory}</p>
                </CardContent>
                <CardFooter className="p-4 bg-muted/40">
                    <Button asChild className="w-full">
                        <Link href={`/service-providers/${provider.id}`}>Request Quote</Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default function ServiceProvidersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        serviceCategory: [] as string[],
        specificService: [] as string[],
        location: '',
    });
    const [sortBy, setSortBy] = useState('activity');
    
    const serviceCategories = useMemo(() => Array.from(new Set(serviceProviderProfiles.map(p => p.serviceCategory).filter((c): c is string => Boolean(c)))), []);
    const specificServices = useMemo(() => Array.from(new Set(serviceProviderProfiles.map(p => p.specificService).filter((s): s is string => Boolean(s)))), []);

    const handleFilterChange = (type: 'serviceCategory' | 'specificService', value: string) => {
        setFilters(prev => {
            const existing = prev[type] as string[];
            if (existing.includes(value)) {
                return { ...prev, [type]: existing.filter(item => item !== value) };
            } else {
                return { ...prev, [type]: [...existing, value] };
            }
        });
    };

    const clearFilters = () => {
        setFilters({ serviceCategory: [], specificService: [], location: '' });
        setSearchTerm('');
    }
    
    const filteredAndSortedProviders = useMemo(() => {
        return serviceProviderProfiles
            .filter(provider => {
                const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (provider.location && provider.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    provider.specificService?.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = filters.serviceCategory.length === 0 || (provider.serviceCategory && filters.serviceCategory.includes(provider.serviceCategory));
                const matchesService = filters.specificService.length === 0 || (provider.specificService && filters.specificService.includes(provider.specificService));
                const matchesLocation = filters.location === '' || provider.location?.toLowerCase().includes(filters.location.toLowerCase());
                return matchesSearch && matchesCategory && matchesService && matchesLocation;
            })
            .sort((a, b) => {
                if (sortBy === 'followers') {
                    return (b.followers ?? 0) - (a.followers ?? 0);
                }
                if (sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                }
                return (b.activity ?? 0) - (a.activity ?? 0);
            });
    }, [searchTerm, filters, sortBy]);

    const FilterSidebar = () => (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-3">Service Category</h3>
                <div className="space-y-2 h-32 overflow-y-auto pr-2">
                {serviceCategories.map(cat => (
                    <div key={cat} className="flex items-center gap-2">
                        <Checkbox id={`cat-${cat}`} checked={filters.serviceCategory.includes(cat)} onCheckedChange={() => handleFilterChange('serviceCategory', cat)} />
                        <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">{cat}</label>
                    </div>
                ))}
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-3">Specific Service</h3>
                <div className="space-y-2 h-48 overflow-y-auto pr-2">
                {specificServices.map(service => (
                    <div key={service} className="flex items-center gap-2">
                        <Checkbox id={`service-${service}`} checked={filters.specificService.includes(service)} onCheckedChange={() => handleFilterChange('specificService', service)} />
                        <label htmlFor={`service-${service}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">{service}</label>
                    </div>
                ))}
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-3">Location</h3>
                <Input
                    placeholder="e.g., Delhi, IN"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
            </div>
            <Button variant="ghost" onClick={clearFilters} className="w-full justify-start pl-0">Clear Filters</Button>
        </div>
    );
    
    return (
        <div className="bg-background text-foreground">
          <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold font-headline mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Find Specialized ACE Service Providers
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover experts in 3D visualization, Vastu consultation, and more.
              </motion.p>
            </header>
    
            <div className="relative mb-8 z-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search by Service, Name, or Location..."
                className="w-full pl-12 pr-4 py-6 text-base rounded-full shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
    
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold flex items-center"><SlidersHorizontal className="mr-2 h-6 w-6"/> Filters</h2>
                    </div>
                  <FilterSidebar />
                </div>
              </aside>
    
              <main className="lg:col-span-3">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <p className="text-muted-foreground text-sm">
                        Showing <span className="font-bold text-foreground">{filteredAndSortedProviders.length}</span> of {serviceProviderProfiles.length} providers.
                    </p>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <Sheet>
                      <SheetTrigger asChild className="lg:hidden w-full">
                        <Button variant="outline"><SlidersHorizontal className="mr-2 h-4 w-4"/> Filters</Button>
                      </SheetTrigger>
                      <SheetContent>
                        <h2 className="text-2xl font-bold mb-4">Filters</h2>
                        <FilterSidebar />
                      </SheetContent>
                    </Sheet>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activity">Top Active</SelectItem>
                        <SelectItem value="followers">Most Followers</SelectItem>
                        <SelectItem value="name">Alphabetical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
    
                {
                    filteredAndSortedProviders.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAndSortedProviders.map(provider => (
                            <ServiceProviderCard key={provider.id} provider={provider} />
                        ))}
                        </div>
                    ) : (
                        <NoResults />
                    )
                }
              </main>
            </div>
          </div>
        </div>
      );
}
