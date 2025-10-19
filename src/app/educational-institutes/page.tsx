'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfessionalCard } from '@/components/professionals/professional-card';
import { ThemedHeading } from '@/components/jobs/themed-heading';
import { Profile } from '@/app/lib/data';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { NoResults } from '@/components/ui/no-results';

const institutes: Profile[] = [
  { id: '1', name: 'School of Architecture & Design', role: 'Educational Institute', specialization: 'Architecture', location: 'New York, NY', rating: 4.8, avatarUrl: 'https://images.unsplash.com/photo-1562774053-61a79837a7d0?w=500&q=80' },
  { id: '2', name: 'Metropolis Engineering Institute', role: 'Educational Institute', specialization: 'Civil Engineering', location: 'Los Angeles, CA', rating: 4.9, avatarUrl: 'https://images.unsplash.com/photo-1581093444039-a4170669d8a5?w=500&q=80' },
  { id: '3', name: 'Aura Interior Design Academy', role: 'Educational Institute', specialization: 'Interior', location: 'Chicago, IL', rating: 4.7, avatarUrl: 'https://images.unsplash.com/photo-1572023869257-1c33f7d4a5a3?w=500&q=80' },
  { id: '4', name: 'Veridian Landscape School', role: 'Educational Institute', specialization: 'Landscape', location: 'Houston, TX', rating: 4.9, avatarUrl: 'https://images.unsplash.com/photo-1601344013479-57f3a9b1c78e?w=500&q=80' },
  { id: '5', name: 'Apex Construction College', role: 'Educational Institute', specialization: 'Construction Management', location: 'Phoenix, AZ', rating: 4.6, avatarUrl: 'https://images.unsplash.com/photo-1555963968-d36b2f6f437b?w=500&q=80' },
  { id: '6', name: 'Innovate Architecture School', role: 'Educational Institute', specialization: 'Architecture', location: 'San Francisco, CA', rating: 4.8, avatarUrl: 'https://images.unsplash.com/photo-1511306399029-4364c73a6e8b?w=500&q=80' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const EducationalInstitutesPage = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const specializations = useMemo(() => ['All', ...Array.from(new Set(institutes.map(p => p.specialization).filter(Boolean)))], []);

  const filteredInstitutes = useMemo(() => institutes
    .filter(p => filter === 'All' || p.specialization === filter)
    .filter(p => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const nameMatch = p.name.toLowerCase().includes(lowercasedSearchTerm);
        const specializationMatch = p.specialization ? p.specialization.toLowerCase().includes(lowercasedSearchTerm) : false;
        return nameMatch || specializationMatch;
    }),
    [filter, searchTerm]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center mb-12">
                <ThemedHeading level={1} text="Shape Your Future in the Built Environment" className="text-4xl sm:text-5xl" />
                <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">Discover leading institutions to advance your career in architecture, engineering, and design.</p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card/50 backdrop-blur-sm border border-border/20 p-4 rounded-2xl shadow-lg mb-12 sticky top-4 z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="relative md:col-span-6 lg:col-span-8">
                        <Input
                            type="text"
                            placeholder="Search by name or specialization..."
                            className="w-full p-3 pl-10 h-12 text-base bg-input/70 border-border/50 rounded-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        {searchTerm && (
                            <X onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer" size={20} />
                        )}
                    </div>
                    
                    <div className="md:col-span-6 lg:col-span-4">
                        <Select onValueChange={setFilter} value={filter}>
                            <SelectTrigger className="w-full h-12 text-base bg-input/70 border-border/50 rounded-full">
                                <div className='flex items-center gap-2'>
                                    <SlidersHorizontal size={16} />
                                    <SelectValue placeholder="Filter by specialization" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {specializations.map(spec => (
                                    spec && <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="responsive-grid"
            >
                <AnimatePresence>
                    {filteredInstitutes.length > 0 ? (
                        filteredInstitutes.map(prof => (
                            <ProfessionalCard key={prof.id} profile={prof} />
                        ))
                    ) : (
                        <motion.div layout className="col-span-full mt-16">
                             <NoResults />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    </div>
  );
};

export default EducationalInstitutesPage;
