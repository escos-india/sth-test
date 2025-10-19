'use client';

import { motion } from 'framer-motion';
import { JobPosting } from '@/app/lib/data';
import { X, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobDetailsPanelProps {
  job: JobPosting | null;
  onClose: () => void;
}

export const JobDetailsPanel = ({ job, onClose }: JobDetailsPanelProps) => {
  if (!job) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-2xl shadow-xl h-full flex flex-col"
    >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border/20">
            <div className="flex justify-between items-center mb-4">
                <Button onClick={onClose} variant="ghost" size="icon" className="md:hidden">
                    <ArrowLeft size={20} />
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                        <Share2 size={18} />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Bookmark size={18} />
                    </Button>
                </div>
                <Button onClick={onClose} variant="ghost" size="icon" className="hidden md:inline-flex">
                    <X size={24} />
                </Button>
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{job.title}</h2>
                <p className="text-lg sm:text-xl text-primary font-semibold">{job.companyName}</p>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">{job.location}</p>
            </div>
        </div>

        {/* Content */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground/90">Job Description</h4>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{job.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground/90">Responsibilities</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm sm:text-base leading-relaxed">
                        <li>Collaborate with senior architects on large-scale projects.</li>
                        <li>Produce detailed blueprints and make necessary corrections.</li>
                        <li>Compile project specifications.</li>
                        <li>Contribute to team meetings and brainstorming sessions.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground/90">Qualifications</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm sm:text-base leading-relaxed">
                        <li>Bachelor's degree in Architecture or related field.</li>
                        <li>2+ years of experience in architectural design.</li>
                        <li>Proficient in AutoCAD, Revit, and SketchUp.</li>
                        <li>Strong portfolio of previous work.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Footer with Apply Button */}
        <div className="p-4 sm:p-6 border-t border-border/20 mt-auto">
             <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0px 8px 25px rgba(0, 229, 255, 0.4)'}}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground font-bold py-3 sm:py-4 rounded-xl text-base sm:text-lg shadow-lg"
             >
                Apply Now
            </motion.button>
        </div>
    </motion.div>
  );
};