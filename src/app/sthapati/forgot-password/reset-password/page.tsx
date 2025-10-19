'use client';

import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary px-4">
      <ResetPasswordForm />
    </div>
  );
}
