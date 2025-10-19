'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Profile } from '@/app/lib/data';
import { Star, MapPin, Check, Plus } from 'lucide-react';

interface MaterialCardProps {
  supplier: Profile;
  materialImage: string;
}

export const MaterialCard = ({ supplier, materialImage }: MaterialCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 70, damping: 20 },
    },
  };

  return (
    <motion.div 
      variants={cardVariants}
      layout
      className="bg-card/60 backdrop-blur-sm border border-border/20 rounded-2xl overflow-hidden group relative shadow-lg"
    >
      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
        <Image
          src={materialImage}
          alt={supplier.specialization || supplier.name}
          layout='fill'
          objectFit='cover'
          className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"/>
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
          {supplier.specialization}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-1">{supplier.name}</h3>
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin size={14} className="mr-1.5" /> {supplier.location}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={16} className="fill-current"/>
            <span className="font-bold text-sm text-foreground">{supplier.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-500 font-semibold">
            <Check size={16} />
            <span>Available</span>
          </div>
        </div>
      </div>

      <motion.div 
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))' }} 
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-2 bg-primary/80 text-primary-foreground font-bold py-3 px-6 rounded-full text-sm"
        >
            <Plus size={18}/>
            Request Quote
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
