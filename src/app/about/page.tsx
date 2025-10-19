
'use client';

import { MotionDiv } from '@/components/utils/motion-div';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Linkedin, Lightbulb, Rss, Building, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const innovations = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Networking',
      description: 'Our platform leverages AI to suggest relevant connections and opportunities, helping you grow your professional network faster.',
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: 'Comprehensive Industry Hub',
      description: 'Sthapati serves as a central hub for all stakeholders in the Architecture, Construction, and Engineering (ACE) industries.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Community-Centric Platform',
      description: 'We foster a collaborative environment where professionals, suppliers, and aspirants can connect, share knowledge, and innovate together.',
    },
    {
      icon: <Rss className="h-8 w-8 text-primary" />,
      title: 'Real-Time Collaboration',
      description: 'Work together on projects with integrated tools for communication and file sharing, ensuring seamless collaboration across teams.',
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground mb-4">
          About Sthapati
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Our vision is to build the world&apos;s most comprehensive and intelligent platform for the Architecture, Construction, and Engineering (ACE) industries.
        </p>
      </MotionDiv>

      <div className="my-12 md:my-16">
        <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border border-border/20 rounded-3xl shadow-lg">
            <div className="md:flex md:items-center">
              <div className="md:flex-shrink-0 text-center p-6 md:p-0 md:pl-8">
                <Avatar className="h-36 w-36 sm:h-48 sm:w-48 rounded-full mx-auto shadow-lg border-4 border-primary/30">
                  <AvatarImage src="https://media.licdn.com/dms/image/C4D03AQHNTp5j93D3fQ/profile-displayphoto-shrink_800_800/0/16436031264b3?e=1728518400&v=beta&t=mS8kF9_y-s2RkC0K-8SCm3J_zh-3jXpORpYyYj5J3A4" alt="Bhooshan Pooranik" className="object-cover" />
                  <AvatarFallback>BP</AvatarFallback>
                </Avatar>
              </div>
              <div className="p-6 md:p-8 text-center md:text-left">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl font-bold">Bhooshan Pooranik</CardTitle>
                  <p className="text-primary font-semibold">Founder & CEO</p>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <p className="text-muted-foreground">
                    An innovator at the intersection of technology and architecture, Bhooshan is dedicated to empowering professionals in the ACE industry. His vision for Sthapati is to create a connected ecosystem that fosters growth, collaboration, and innovation.
                  </p>
                  <Link href="https://www.linkedin.com/in/sthapati-india/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="mt-4 rounded-full">
                      <Linkedin className="h-5 w-5 mr-2" />
                      Connect on LinkedIn
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </div>
          </Card>
        </MotionDiv>
      </div>

      <MotionDiv className="text-center my-12 md:my-16">
        <h2 className="text-3xl font-bold font-headline mb-8">Our Innovations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {innovations.map((item, index) => (
            <MotionDiv
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/20 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-col items-center text-center gap-4">
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </div>
  );
}
