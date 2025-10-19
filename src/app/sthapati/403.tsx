'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Custom403() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">403</h1>
        <p className="text-2xl font-semibold mt-4">Access Denied</p>
        <p className="text-lg mt-2 mb-8">You do not have permission to view this page.</p>
        <Button onClick={() => router.push('/sthapati/login')}>
          Return to Login Page
        </Button>
      </div>
    </div>
  );
}
