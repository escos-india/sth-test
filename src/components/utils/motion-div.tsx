'use client';

import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import React from 'react';

type MotionDivProps = HTMLMotionProps<'div'>;

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function MotionDiv({
  children,
  variants,
  initial,
  whileInView,
  animate,
  transition,
  ...props
}: MotionDivProps) {
  // Check if any custom animation is passed
  const hasCustomAnimation =
    variants || initial || whileInView || animate || transition;

  if (hasCustomAnimation) {
    return (
      <motion.div
        variants={variants}
        initial={initial}
        whileInView={whileInView}
        animate={animate}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // Use default animation
  return (
    <motion.div
      variants={defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
