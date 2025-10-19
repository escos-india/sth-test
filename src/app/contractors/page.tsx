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

const contractors: Profile[] = [
  { id: '1', name: 'A-Z Renovations', role: 'Contractor', specialization: 'General Contractor', rating: 4.8, location: 'New York, NY', avatarUrl: 'https://randomuser.me/api/portraits/men/21.jpg' },
  { id: '2', name: 'Precision Electrical', role: 'Contractor', specialization: 'Electrical Contractor', rating: 4.9, location: 'Los Angeles, CA', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: '3', name: 'Flow Right Plumbing', role: 'Contractor', specialization: 'Plumbing Contractor', rating: 4.7, location: 'Chicago, IL', avatarUrl: 'https://randomuser.me/api/portraits/men/23.jpg' },
  { id: '4', name: 'Cool HVAC Solutions', role: 'Contractor', specialization: 'HVAC Contractor', rating: 4.9, location: 'Houston, TX', avatarUrl: 'https://randomuser.me/api/portraits/men/24.jpg' },
  { id: '5', name: 'Perfect Paint Jobs', role: 'Contractor', specialization: 'Painting Contractor', rating: 4.6, location: 'Phoenix, AZ', avatarUrl: 'https://randomuser.me/api/portraits/men/25.jpg' },
  { id: '6', name: 'Vertex Masonry', role: 'Contractor', specialization: 'Masonry Contractor', rating: 4.8, location: 'New York, NY', avatarUrl: 'https://randomuser.me/api/portraits/men/26.jpg' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const ContractorsPage = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const specializations = useMemo(() => ['All', ...Array.from(new Set(contractors.map(p => p.specialization).filter(Boolean)))], []);

  const filteredContractors = useMemo(() => contractors
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
                <ThemedHeading level={1} text="Hire Expert Contractors" className="text-4xl sm:text-5xl" />
                <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">Find reliable contractors for every phase of your project.</p>
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
                            placeholder="Search by name or service..."
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
                                    <SelectValue placeholder="Filter by service" />
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
                    {filteredContractors.length > 0 ? (
                        filteredContractors.map(prof => (
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

export default ContractorsPage;
