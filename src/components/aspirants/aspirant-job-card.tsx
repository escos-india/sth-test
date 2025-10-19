import { JobPosting, Profile } from "@/app/lib/data";
import { ThemedHeading } from "@/components/jobs/themed-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';
import { Briefcase, Clock, MapPin } from "lucide-react";

interface AspirantJobCardProps {
    job: JobPosting;
}

export const AspirantJobCard = ({ job }: AspirantJobCardProps) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const renderTag = (icon: React.ReactNode, label: string) => (
        <div className="flex items-center gap-2 bg-secondary/50 text-secondary-foreground text-xs px-3 py-1.5 rounded-full">
            {icon}
            <span className="font-semibold">{label}</span>
        </div>
    );

    return (
        <motion.div variants={cardVariants}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 w-full h-full flex flex-col">
                <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-primary font-bold">{job.companyName}</p>
                            <h3 className="text-xl font-bold text-foreground mt-1">{job.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-2"><MapPin size={14} className="mr-2" /> {job.location}</div>
                        </div>
                        {/* Placeholder for a company logo if available */}
                    </div>

                    <p className="text-sm text-muted-foreground/80 flex-grow mb-4 leading-relaxed">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                        {renderTag(<Briefcase size={14} />, job.jobType)}
                        {renderTag(<Clock size={14} />, job.experienceLevel)}
                    </div>

                    <Separator className="my-auto"/>

                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                        <Button variant="default">Apply Now</Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};