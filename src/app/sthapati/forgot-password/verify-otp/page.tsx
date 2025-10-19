'use client';

import { VerifyOtpForm } from '@/components/auth/verify-otp-form';

export default function VerifyOtpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary px-4">
      <VerifyOtpForm />
    </div>
  );
}
