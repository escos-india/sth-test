'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface ThemedHeadingProps {
  text: string;
  level: 1 | 2;
  className?: string;
}

export const ThemedHeading = ({ text, level, className }: ThemedHeadingProps) => {
  const { theme } = useTheme();

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const headingStyles = {
    color: theme === 'dark' ? '#00E5FF' : '#0A2540',
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <HeadingTag style={headingStyles} className={`font-bold tracking-tight ${className}`}>
        {text}
      </HeadingTag>
    </motion.div>
  );
};