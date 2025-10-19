'use client';

import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { ThemedHeading } from '@/components/jobs/themed-heading';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center flex flex-col items-center"
            >
                <Newspaper className="w-20 h-20 sm:w-24 sm:h-24 text-primary mb-6" />
                <ThemedHeading level={1} text="Coming Soon!" className="text-4xl sm:text-5xl" />
                <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                    We're currently curating a collection of insightful articles, case studies, and industry news. Check back soon for valuable content tailored for the ACE community.
                </p>
            </motion.div>
        </div>
    </div>
  );
}
