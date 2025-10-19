'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';

const formSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits.' }),
});

export function AdminOtpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const identifier = searchParams.get('identifier');
    if (!identifier) {
        toast({ variant: "destructive", title: "Missing Identifier", description: "Could not find the user identifier. Please start the process again."});
        setIsLoading(false);
        return;
    }

    try {
        // --- BACKEND INTEGRATION POINT ---
        // This function should call your backend API to verify the OTP.
        // The backend would check the OTP against the stored hash.
        console.log("Verifying OTP:", { identifier, otp: values.otp });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

        // On success, the backend should return a temporary, single-use token for resetting the password.
        const resetToken = "mock-reset-token-from-api";

        toast({
            title: 'OTP Verified',
            description: 'You can now reset your password.',
        });
        
        // Navigate to the reset password page with the token
        router.push(`/admin/reset-password?token=${resetToken}`);

    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Invalid OTP',
            description: error.message || 'The OTP you entered is incorrect. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} maxLength={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify & Proceed
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
