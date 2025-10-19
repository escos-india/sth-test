
"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GoogleIcon } from "@/components/ui/google-icon";
import Logo from "@/components/ui/logo";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  contactNumber: z.string().regex(/^[0-9]{10}$/, { message: "Please enter a valid 10-digit contact number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  userType: z.string({ required_error: "Please select your role." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is a placeholder function.
    console.log(values);
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
    }, 2000)
  }

  function handleGoogleSignIn() {
    // This is a placeholder function.
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-[1fr_1.2fr] bg-card shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Column: Branding */}
        <div className="hidden lg:flex flex-col justify-center p-10 bg-muted/40">
          <Logo className="h-8 w-auto mb-6" />
          <h1 className="text-3xl font-bold font-headline text-primary">Welcome to the Network.</h1>
          <p className="text-muted-foreground mt-2">
            Connect, collaborate, and build the future of the ACE industry. Create your account to get started.
          </p>
        </div>

        {/* Right Column: Form */}
        <div className="p-8 sm:p-10 space-y-6">
          <div className="text-left">
            <h1 className="text-2xl font-bold font-headline">Create an Account</h1>
            <p className="text-muted-foreground text-sm">Join the premier professional network for the ACE industry.</p>
          </div>

          <Button variant="outline" className="w-full bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200" onClick={handleGoogleSignIn} disabled={isLoading}>
            <GoogleIcon className="mr-3 h-5 w-5" />
            {isLoading ? "Signing up..." : "Sign up with Google"}
          </Button>

          <div className="flex items-center space-x-3">
            <hr className="flex-grow border-border" />
            <span className="text-muted-foreground text-xs font-semibold">OR</span>
            <hr className="flex-grow border-border" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a...</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="aspirant">Aspirant (Student/Job Seeker)</SelectItem>
                          <SelectItem value="professional">Professional (Architect, Engineer)</SelectItem>
                          <SelectItem value="builder">Builder/Developer</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="supplier">Material Supplier</SelectItem>
                          <SelectItem value="institute">Educational Institute</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="9876543210" {...field} maxLength={10} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full !mt-6 bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
          
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Login here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
