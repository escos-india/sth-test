'use client';

import { RequestOtpForm } from '@/components/auth/request-otp-form';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary px-4">
      <RequestOtpForm />
    </div>
  );
}
