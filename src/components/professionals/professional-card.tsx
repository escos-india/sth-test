'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Profile } from '@/app/lib/data';
import { Star, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProfessionalCardProps {
  profile: Profile;
}

export const ProfessionalCard = ({ profile }: ProfessionalCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 20 },
    },
    exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      layout
      variants={cardVariants}
      exit="exit"
      className="w-full [perspective:1000px]"
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative w-full rounded-3xl shadow-lg group [transform-style:preserve-3d] aspect-[4/5] sm:aspect-[3/4]"
      >
        {/* Front of the card */}
        <div
          className="absolute inset-0 w-full h-full bg-card/50 [backface-visibility:hidden] transition-transform duration-700 group-hover:[transform:rotateY(180deg)] rounded-3xl border border-border/20 overflow-hidden"
        >
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
            <h3 className="text-xl sm:text-2xl font-bold text-shadow">{profile.name}</h3>
            <p className="text-primary font-semibold text-sm sm:text-base">{profile.specialization}</p>
            <div className="flex items-center mt-2">
              <Star className="text-yellow-400 fill-yellow-400" size={16} />
              <span className="ml-1.5 text-sm font-medium">{profile.rating}</span>
            </div>
          </div>
        </div>

        {/* Back of the card */}
        <div
          className="absolute inset-0 w-full h-full bg-card/80 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] transition-transform duration-700 group-hover:[transform:rotateY(0deg)] rounded-3xl border border-border/20 overflow-hidden"
        >
            <Image src={profile.avatarUrl} alt={profile.name} width={72} height={72} className="rounded-full mx-auto border-4 border-primary/50 shadow-lg mb-3"/>
            <h4 className="text-lg sm:text-xl font-bold text-foreground">{profile.name}</h4>
            <p className="text-primary font-semibold mb-2 text-sm sm:text-base">{profile.specialization}</p>
            <p className="text-muted-foreground text-xs sm:text-sm mb-4">{profile.location}</p>
            
            <div className="space-y-3 w-full max-w-[200px] mx-auto">
                <Button variant="outline" size="sm" className="w-full gap-2">
                    <Mail size={14} />
                    <span>Email</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-2">
                    <Phone size={14} />
                    <span>Call</span>
                </Button>
                <Button size="sm" className="w-full gap-2">
                    <MessageSquare size={14} />
                    <span>Message</span>
                </Button>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
