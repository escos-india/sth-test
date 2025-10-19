"use client";

import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { JobPosting } from '@/app/lib/data';

interface JobListingCardProps {
  job: JobPosting;
}

export function JobListingCard({ job }: JobListingCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm mt-1">
          <Building2 className="h-4 w-4 mr-1" /> {job.companyName}
          <MapPin className="h-4 w-4 ml-4 mr-1" /> {job.location}
          <Briefcase className="h-4 w-4 ml-4 mr-1" /> {job.jobType}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{job.description}</p>
        <Link href={`/jobs/${job.id}`}>
          <Button variant="outline">View & Apply</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
