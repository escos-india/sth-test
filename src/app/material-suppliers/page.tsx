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

const suppliers: Omit<Profile, 'avatarUrl'>[] = [
  { id: '1', name: 'BuildRight Bricks', role: 'Material Supplier', specialization: 'Bricks', location: 'New York, NY', rating: 4.8 },
  { id: '2', name: 'Solid Sands', role: 'Material Supplier', specialization: 'Sand', location: 'Los Angeles, CA', rating: 4.9 },
  { id: '3', name: 'Rock Solid Aggregates', role: 'Material Supplier', specialization: 'Aggregates', location: 'Chicago, IL', rating: 4.7 },
  { id: '4', name: 'Everstrong Cement', role: 'Material Supplier', specialization: 'Cement', location: 'Houston, TX', rating: 4.9 },
  { id: '5', name: 'Steel Beams Inc.', role: 'Material Supplier', specialization: 'Steel', location: 'Phoenix, AZ', rating: 4.6 },
  { id: '6', name: 'Fine Woods', role: 'Material Supplier', specialization: 'Wood', location: 'Philadelphia, PA', rating: 4.8 },
  { id: '7', name: 'Classic Tiles', role: 'Material Supplier', specialization: 'Tiles', location: 'San Antonio, TX', rating: 4.9 },
  { id: '8', name: 'Flow Plumbings', role: 'Material Supplier', specialization: 'Plumbing', location: 'San Diego, CA', rating: 4.7 },
];

const materialImages: { [key: string]: string } = {
    Bricks: 'https://images.unsplash.com/photo-1557894675-6057933392e2?w=500&q=80',
    Sand: 'https://images.unsplash.com/photo-1588961358333-143a4dba87b0?w=500&q=80',
    Aggregates: 'https://images.unsplash.com/photo-1593348981657-548b8a7b9d1f?w=500&q=80',
    Cement: 'https://images.unsplash.com/photo-1591979929255-b4b6c339a1f5?w=500&q=80',
    Steel: 'https://images.unsplash.com/photo-1521626350353-833535233190?w=500&q=80',
    Wood: 'https://images.unsplash.com/photo-1506437942396-64e4216a7153?w=500&q=80',
    Tiles: 'https://images.unsplash.com/photo-1598001859732-55502476d042?w=500&q=80',
    Plumbing: 'https://images.unsplash.com/photo-1601121141348-15c269004993?w=500&q=80',
}

const suppliersWithImages: Profile[] = suppliers.map(s => ({ ...s, avatarUrl: s.specialization ? materialImages[s.specialization] || '' : '' }));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const MaterialSuppliersPage = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const specializations = useMemo(() => ['All', ...Array.from(new Set(suppliers.map(p => p.specialization).filter(Boolean)))], []);

  const filteredSuppliers = useMemo(() => suppliersWithImages
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
                <ThemedHeading level={1} text="Source Your Building Materials" className="text-4xl sm:text-5xl" />
                <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">Find the highest quality materials from trusted suppliers to ensure your project's success.</p>
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
                            placeholder="Search by supplier or material..."
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
                                    <SelectValue placeholder="Filter by material" />
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
                    {filteredSuppliers.length > 0 ? (
                        filteredSuppliers.map(prof => (
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

export default MaterialSuppliersPage;
