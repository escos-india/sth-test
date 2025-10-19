'use client';

import { motion } from 'framer-motion';
import { SlidersHorizontal, DollarSign, MapPin, Briefcase, BarChart, X } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const specialties = ['Architecture', 'Civil Engineering', 'Interior Design', 'BIM', 'Landscape', 'Urban Planning'];
const experienceLevels = ['Entry Level', 'Mid-Level', 'Senior Level', 'Director', 'Principal'];
const locations = ['All', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Remote', 'Houston, TX'];

export const FilterSidebar = () => {
  const [salary, setSalary] = useState(50);
  const [location, setLocation] = useState('All');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card/60 backdrop-blur-sm border border-border/20 rounded-2xl p-4 sm:p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="text-primary h-5 w-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Filters</h3>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden">
              <X className="h-5 w-5"/>
          </Button>
      </div>
      
      <div className="space-y-6 custom-scrollbar pr-1 overflow-y-auto h-[calc(100%-4rem)]">
        {/* Salary Range */}
        <FilterSection icon={DollarSign} title="Salary Range">
          <div className="px-1">
            <input 
              type="range" 
              min="20" 
              max="200" 
              value={salary} 
              onChange={(e) => setSalary(parseInt(e.target.value))} 
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>$20k</span>
              <span className='font-bold text-primary'>${salary}k</span>
              <span>$200k+</span>
            </div>
          </div>
        </FilterSection>
        
        {/* Location */}
        <FilterSection icon={MapPin} title="Location">
           <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full bg-input/70 text-base h-11">
                <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
                {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
            </SelectContent>
        </Select>
        </FilterSection>

        {/* Specialty */}
        <FilterSection icon={Briefcase} title="Specialty">
          <div className="space-y-3">
            {specialties.map(spec => (
              <div key={spec} className="flex items-center space-x-3">
                <Checkbox id={spec} />
                <Label htmlFor={spec} className="text-sm font-normal text-foreground/80">{spec}</Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Experience Level */}
        <FilterSection icon={BarChart} title="Experience Level">
          <RadioGroup defaultValue="all" className="space-y-2">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="all" id="exp-all" />
              <Label htmlFor="exp-all" className="font-normal text-foreground/80">All Levels</Label>
            </div>
            {experienceLevels.map(level => (
              <div key={level} className="flex items-center space-x-3">
                <RadioGroupItem value={level} id={level} />
                <Label htmlFor={level} className="font-normal text-foreground/80">{level}</Label>
              </div>
            ))}
          </RadioGroup>
        </FilterSection>
      </div>
    </motion.div>
  );
};

const FilterSection = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="border-t border-border/20 pt-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-4">
          <Icon className="h-4 w-4" /> {title}
        </h4>
        {children}
    </div>
);
