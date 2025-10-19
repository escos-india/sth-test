'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Filter, X, Briefcase } from 'lucide-react';
import { JobPosting } from '@/app/lib/data';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemedHeading } from '@/components/jobs/themed-heading';
import { NoResults } from '@/components/ui/no-results';
import { AspirantJobCard } from '@/components/aspirants/aspirant-job-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const jobPostings: JobPosting[] = [
    {
        id: '1',
        title: 'Junior Architect',
        companyName: 'Studio Arch',
        location: 'New York, NY',
        description: 'Assist in creating architectural designs for various projects.',
        jobType: 'Full-time',
        experienceLevel: 'Entry-level',
        industry: 'Architecture'
    },
    {
        id: '2',
        title: 'Construction Intern',
        companyName: 'BuildWell Inc.',
        location: 'San Francisco, CA',
        description: 'Gain hands-on experience on construction sites and in project management.',
        jobType: 'Internship',
        experienceLevel: 'Internship',
        industry: 'Construction'
    },
    {
        id: '3',
        title: 'Graduate Civil Engineer',
        companyName: 'InfraStruct',
        location: 'Chicago, IL',
        description: 'Join our team of experienced engineers working on large-scale infrastructure projects.',
        jobType: 'Full-time',
        experienceLevel: 'Entry-level',
        industry: 'Engineering'
    },
    {
        id: '4',
        title: 'Architectural Assistant',
        companyName: 'DesignScapes',
        location: 'Boston, MA',
        description: 'Support senior architects in drafting, modeling, and project documentation.',
        jobType: 'Part-time',
        experienceLevel: 'Entry-level',
        industry: 'Architecture'
    },
    {
        id: '5',
        title: 'Project Management Trainee',
        companyName: 'Constructive Solutions',
        location: 'Austin, TX',
        description: 'A training program for aspiring project managers in the construction industry.',
        jobType: 'Full-time',
        experienceLevel: 'Entry-level',
        industry: 'Construction'
    },
    {
        id: '6',
        title: 'Structural Engineering Intern',
        companyName: 'StrongFoundations',
        location: 'Miami, FL',
        description: 'An opportunity for engineering students to learn about structural design and analysis.',
        jobType: 'Internship',
        experienceLevel: 'Internship',
        industry: 'Engineering'
    }
];

export default function AspirantsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        jobType: [] as string[],
        experienceLevel: [] as string[],
        industry: [] as string[],
    });
    const [sortBy, setSortBy] = useState('postedDate');

    const jobTypes = useMemo(() => Array.from(new Set(jobPostings.map(p => p.jobType).filter(Boolean))), []);
    const experienceLevels = useMemo(() => Array.from(new Set(jobPostings.map(p => p.experienceLevel).filter(Boolean))), []);
    const industries = useMemo(() => Array.from(new Set(jobPostings.map(p => p.industry).filter(Boolean))), []);

    const handleFilterChange = (type: 'jobType' | 'experienceLevel' | 'industry', value: string) => {
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
        setFilters({ jobType: [], experienceLevel: [], industry: [] });
    }

    const filteredAndSortedJobs = useMemo(() => {
        return jobPostings
            .filter(job => {
                const lowercasedSearchTerm = searchTerm.toLowerCase();
                const matchesSearch = job.title.toLowerCase().includes(lowercasedSearchTerm) ||
                    job.companyName.toLowerCase().includes(lowercasedSearchTerm) ||
                    job.location.toLowerCase().includes(lowercasedSearchTerm);
                const matchesJobType = filters.jobType.length === 0 || filters.jobType.includes(job.jobType);
                const matchesExperience = filters.experienceLevel.length === 0 || filters.experienceLevel.includes(job.experienceLevel);
                const matchesIndustry = filters.industry.length === 0 || filters.industry.includes(job.industry);
                return matchesSearch && matchesJobType && matchesExperience && matchesIndustry;
            })
            .sort((a, b) => {
                if (sortBy === 'title') {
                    return a.title.localeCompare(b.title);
                }
                // Add more robust date sorting if available
                return 0;
            });
    }, [searchTerm, filters, sortBy]);

    const FilterSidebar = ({ className }: { className?: string }) => (
        <div className={className}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center"><Filter className="mr-3 h-5 w-5 text-primary"/> Filters</h2>
                <Button variant="ghost" onClick={clearFilters} className="text-sm text-muted-foreground hover:text-foreground">Clear all</Button>
            </div>
            <Accordion type="multiple" defaultValue={['jobType', 'experienceLevel', 'industry']} className="w-full">
                <FilterSection title="Job Type" options={jobTypes} type="jobType" />
                <FilterSection title="Experience Level" options={experienceLevels} type="experienceLevel" />
                <FilterSection title="Industry" options={industries} type="industry" />
            </Accordion>
        </div>
    );

    const FilterSection = ({ title, options, type }: { title: string, options: string[], type: keyof typeof filters }) => (
        <AccordionItem value={type}>
            <AccordionTrigger className="font-semibold">{title}</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {options.map(option => (
                    <div key={option} className="flex items-center gap-3">
                        <Checkbox id={`${type}-${option}`} checked={filters[type].includes(option)} onCheckedChange={() => handleFilterChange(type, option)} />
                        <label htmlFor={`${type}-${option}`} className="text-sm font-medium text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">{option}</label>
                    </div>
                ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );

    return (
        <div className="bg-background text-foreground">
          <div className="container mx-auto px-4 py-8 sm:py-12">
            <header className="text-center mb-10">
              <ThemedHeading level={1} text="Find Your Next Opportunity" className="text-4xl sm:text-5xl" />
              <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">Explore thousands of curated openings in the architecture, construction, and engineering industries.</p>
            </header>
    
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-4 z-10 mb-8 bg-card/70 backdrop-blur-md border border-border/20 p-2 rounded-full shadow-lg flex items-center"
            >
              <Search className="absolute left-5 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search by Job Title, Company, or Location..."
                className="w-full pl-10 pr-4 py-3 text-base bg-transparent border-none focus:ring-0 rounded-full h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
    
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-28">
                  <FilterSidebar />
                </div>
              </aside>
    
              <main className="lg:col-span-3">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <p className="text-muted-foreground text-sm w-full md:w-auto text-center md:text-left">
                        Showing <span className="font-bold text-foreground">{filteredAndSortedJobs.length}</span> of {jobPostings.length} opportunities.
                    </p>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Sheet>
                      <SheetTrigger asChild className="lg:hidden w-full">
                        <Button variant="outline" className="w-full flex-1"><SlidersHorizontal className="mr-2 h-4 w-4"/> Filters</Button>
                      </SheetTrigger>
                      <SheetContent className="bg-card/95 backdrop-blur-sm">
                         <FilterSidebar className="mt-8"/>
                      </SheetContent>
                    </Sheet>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full md:w-[180px] flex-1">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postedDate">Most Recent</SelectItem>
                        <SelectItem value="title">Alphabetical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
    
                {
                    filteredAndSortedJobs.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                            initial="hidden"
                            animate="visible"
                        >
                        {filteredAndSortedJobs.map(job => (
                           <motion.div
                             key={job.id}
                             variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                             className="hover:shadow-lg transition-shadow duration-300 rounded-xl"
                           >
                            <AspirantJobCard job={job} />
                           </motion.div>
                        ))}
                        </motion.div>
                    ) : (
                        <div className="mt-16">
                           <NoResults />
                        </div>
                    )
                }
              </main>
            </div>
          </div>
        </div>
      );
}
