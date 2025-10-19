
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

type PasswordStrengthMeterProps = {
  password?: string;
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;

    // Award every unique letter until 5 symbols
    const letters = {} as Record<string, boolean>;
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = true;
    }
    score += Object.keys(letters).length * 4;

    // Bonus points for mixing it up
    const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (const check in variations) {
      variationCount += variations[check as keyof typeof variations] === true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    
    return Math.min(100, Math.max(0, score));
  };

  const strength = getStrength(password);

  const getStrengthColor = (s: number) => {
    if (s < 30) return 'bg-red-500';
    if (s < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getStrengthLabel = (s: number) => {
    if (s < 30) return 'Weak';
    if (s < 60) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="mt-2">
      <div className="relative h-2 w-full rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-300", getStrengthColor(strength))}
          style={{ width: `${strength}%` }}
        />
      </div>
      {password && <p className="text-xs mt-1 text-muted-foreground">{getStrengthLabel(strength)}</p>}
    </div>
  );
};
