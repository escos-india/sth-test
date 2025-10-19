'use client';

import { motion } from 'framer-motion';
import { JobPosting } from '@/app/lib/data';
import { Briefcase, MapPin, DollarSign, Clock, Bookmark, Building } from 'lucide-react';

interface JobProfileCardProps {
  job: JobPosting;
  onSelect: (job: JobPosting) => void;
  isSelected: boolean;
}

export const JobProfileCard = ({ job, onSelect, isSelected }: JobProfileCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => onSelect(job)}
      className={`bg-card/60 backdrop-blur-sm border ${isSelected ? 'border-primary shadow-primary/20' : 'border-border/20'} rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-xl hidden sm:block">
                <Building className="text-primary" size={24} />
            </div>
            <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                <p className="text-sm text-primary font-semibold">{job.companyName}</p>
            </div>
        </div>
        <motion.div whileTap={{ scale: 0.9 }}>
            <Bookmark className={`text-muted-foreground hover:text-primary transition-colors ${isSelected ? 'fill-primary text-primary' : ''}`} />
        </motion.div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 truncate"><MapPin size={16} /><span>{job.location}</span></div>
        <div className="flex items-center gap-2"><Briefcase size={16} /><span>{job.jobType}</span></div>
        <div className="flex items-center gap-2"><DollarSign size={16} /><span>$80k - $120k</span></div>
        <div className="flex items-center gap-2"><Clock size={16} /><span>Posted 2 days ago</span></div>
      </div>
    </motion.div>
  );
};