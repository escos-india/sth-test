
'use client';

import { MotionDiv } from '@/components/utils/motion-div';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Users, Briefcase, Handshake, Building2 } from 'lucide-react';
import { ThemedHeading } from '@/components/jobs/themed-heading';

const faqs = [
  { id: 'faq1', question: 'What is the Sthapati community?', answer: 'It is a professional network dedicated to connecting individuals and companies within the Architecture, Construction, and Engineering (ACE) industries.' },
  { id: 'faq2', question: 'How can I join?', answer: 'You can register for an account on our platform. We offer different membership tiers for professionals, service providers, and academic institutions.' },
  { id: 'faq3', question: 'What are the benefits of joining?', answer: 'Benefits include networking opportunities, access to exclusive job listings, project collaboration tools, and a wealth of industry knowledge.' },
];

const topMembers: { id: number; name: string; contributions: string; avatarUrl: string }[] = [];

const communityBenefits = [
  { icon: <Users className="h-8 w-8 text-primary" />, title: 'Expand Your Network', description: 'Connect with thousands of ACE professionals.' },
  { icon: <Briefcase className="h-8 w-8 text-primary" />, title: 'Find Opportunities', description: 'Discover exclusive job and project openings.' },
  { icon: <Handshake className="h-8 w-8 text-primary" />, title: 'Collaborate & Innovate', description: 'Partner with peers on groundbreaking projects.' },
];

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <MotionDiv 
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <ThemedHeading level={1} text="Welcome to the Sthapati Community" className="text-4xl sm:text-5xl" />
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
          The heart of our platform. A place to connect, collaborate, and innovate with the brightest minds in the ACE industry.
        </p>
      </MotionDiv>

      <MotionDiv className="my-12 sm:my-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Community Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityBenefits.map((benefit, index) => (
             <MotionDiv
              key={benefit.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="text-center h-full bg-card/50 backdrop-blur-sm border-border/20 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4 border border-primary/20">
                    {benefit.icon}
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>

      <MotionDiv className="my-12 sm:my-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Top Active Members</h2>
        <div className="text-center text-muted-foreground py-10 px-6 bg-card/50 backdrop-blur-sm border border-dashed border-border/30 rounded-2xl">
            <Building2 className="mx-auto h-12 w-12 text-primary/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Our Community is Growing!</h3>
            <p className="max-w-md mx-auto">Be among the first to be recognized. As our community grows, top contributors will be featured here. Sign up and start engaging today!</p>
        </div>
      </MotionDiv>

      <MotionDiv className="my-12 sm:my-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map(faq => (
            <AccordionItem key={faq.id} value={faq.id} className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-xl px-4">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-left hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MotionDiv>
    </div>
  );
}
