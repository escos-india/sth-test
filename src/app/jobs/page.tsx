'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemedHeading } from '@/components/jobs/themed-heading';
import { FilterSidebar } from '@/components/jobs/filter-sidebar';
import { JobProfileCard } from '@/components/jobs/job-profile-card';
import { JobDetailsPanel } from '@/components/jobs/job-details-panel';
import { JobPosting } from '@/app/lib/data';
import { Menu, X } from 'lucide-react';

// Dummy data
const jobs: JobPosting[] = [
  { id: '1', title: 'Architectural Designer', companyName: 'Future Homes', location: 'New York, NY', jobType: 'Full-time', description: 'Passionate about creating innovative and sustainable architectural designs? Join our team to work on groundbreaking projects that redefine urban living.', experienceLevel: 'Mid-Level', industry: 'Architecture' },
  { id: '2', title: 'Civil Engineer', companyName: 'City Builders', location: 'Los Angeles, CA', jobType: 'Full-time', description: 'We are seeking a skilled civil engineer to oversee the construction of public works projects, ensuring they are safe, sustainable, and completed on time.', experienceLevel: 'Senior-Level', industry: 'Civil Engineering' },
  { id: '3', title: 'Project Manager', companyName: 'Construct Inc.', location: 'Chicago, IL', jobType: 'Contract', description: 'Lead and manage large-scale construction projects from conception to completion. Strong leadership and organizational skills are a must.', experienceLevel: 'Senior-Level', industry: 'Construction' },
  { id: '4', title: 'Interior Designer', companyName: 'Modern Spaces', location: 'Houston, TX', jobType: 'Part-time', description: 'Bring your creative vision to life and transform residential and commercial spaces into functional and beautiful environments.', experienceLevel: 'Entry-Level', industry: 'Interior Design' },
  { id: '5', title: 'Landscape Architect', companyName: 'Green Scapes', location: 'Phoenix, AZ', jobType: 'Full-time', description: 'Design and create stunning outdoor spaces that harmonize with the natural environment. Expertise in native plant species is a plus.', experienceLevel: 'Mid-Level', industry: 'Landscape Architecture' },
  { id: '6', title: 'BIM Specialist', companyName: 'Digital Construction', location: 'Remote', jobType: 'Remote', description: 'Utilize your expertise in Building Information Modeling (BIM) to create and manage digital models for complex construction projects.', experienceLevel: 'Mid-Level', industry: 'Construction' },
];

const JobsPage = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(jobs[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleSelectJob = (job: JobPosting) => {
    setSelectedJob(job);
    if (window.innerWidth < 768) {
      setIsDetailsOpen(true);
    }
  };
  
  const handleCloseDetails = () => {
    setSelectedJob(null);
    setIsDetailsOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <main className="flex-grow">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <div className="text-center mb-12">
                    <ThemedHeading level={1} text="Explore Job Opportunities" className="text-4xl sm:text-5xl" />
                    <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Find your next career move in the Architecture, Engineering, and Construction industry.</p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Mobile Filter Button and Panel */}
                    <div className="lg:hidden mb-6">
                        <motion.button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)} 
                            className="flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-3 rounded-lg w-full justify-center shadow-sm"
                            whileTap={{ scale: 0.98 }}
                        >
                            {isFilterOpen ? <X size={20}/> : <Menu size={20} />} Filters
                        </motion.button>
                        <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-card/50 p-6 rounded-lg shadow-md">
                                    <FilterSidebar />
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop Filter Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
                        <div className="sticky top-24">
                            <h2 className="text-2xl font-bold mb-4">Filters</h2>
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 grid grid-cols-12 gap-8">
                        <motion.div 
                            className="col-span-12 md:col-span-5 h-[calc(100vh-18rem)] overflow-y-auto pr-2 custom-scrollbar"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="space-y-4">
                                {jobs.map(job => (
                                    <JobProfileCard 
                                        key={job.id} 
                                        job={job} 
                                        onSelect={handleSelectJob} 
                                        isSelected={selectedJob?.id === job.id} 
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <div className="hidden md:block md:col-span-7">
                             <div className="sticky top-24 h-[calc(100vh-18rem)]">
                                <AnimatePresence mode="wait">
                                    {selectedJob ? (
                                        <JobDetailsPanel 
                                            key={selectedJob.id} 
                                            job={selectedJob} 
                                            onClose={handleCloseDetails} 
                                        />
                                    ) : (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex items-center justify-center h-full bg-card/50 rounded-2xl"><p className="text-muted-foreground">Select a job to see details</p></motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* Mobile Job Details Modal */}
        <AnimatePresence>
            {isDetailsOpen && selectedJob && (
            <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 150, damping: 30 }}
                className="md:hidden fixed inset-0 bg-background z-50 overflow-y-auto pt-12"
            >
                <JobDetailsPanel job={selectedJob} onClose={handleCloseDetails} />
            </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default JobsPage;
