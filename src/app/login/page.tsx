
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
import { GoogleIcon } from "@/components/ui/google-icon";
import Logo from "@/components/ui/logo";
import { useState } from "react";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Please enter your password." }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl mx-auto lg:grid lg:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden bg-card">
            {/* Left Column */}
            <motion.div 
                className="hidden lg:flex flex-col justify-center p-12 bg-muted/40 relative overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="absolute inset-0 bg-[url('/images/5.png')] bg-cover bg-center filter blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/30"></div>
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    >
                        <Link href="/">
                            <Logo className="h-12 w-auto text-white" />
                        </Link>
                    </motion.div>
                    <motion.h1 
                        className="text-4xl font-bold font-headline mt-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    >
                        Welcome Back
                    </motion.h1>
                    <motion.p 
                        className="text-lg text-white/80 mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                    >
                        Sign in to access your professional network.
                    </motion.p>
                </div>
            </motion.div>

            {/* Right Column */}
            <motion.div 
                className="p-8 sm:p-12 flex flex-col justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="lg:hidden text-center mb-8">
                    <Link href="/" className="inline-block mb-4">
                        <Logo className="h-10 w-auto" />
                    </Link>
                    <h1 className="text-2xl font-bold font-headline">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm">Sign in to access your professional network.</p>
                </div>

                <Button variant="outline" className="w-full bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 shadow-sm" onClick={handleGoogleSignIn} disabled={isLoading}>
                    <GoogleIcon className="mr-3 h-5 w-5" />
                    {isLoading ? "Signing in..." : "Sign in with Google"}
                </Button>

                <div className="flex items-center space-x-3 my-6">
                    <hr className="flex-grow border-border" />
                    <span className="text-muted-foreground text-xs font-semibold">OR</span>
                    <hr className="flex-grow border-border" />
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                <Input placeholder="name@example.com" {...field} className="h-12" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                    <FormLabel>Password</FormLabel>
                                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
                                </div>
                                <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} className="h-12"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <Button type="submit" className="w-full !mt-8 h-12 text-base font-semibold" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </Form>
                
                <p className="text-center text-sm text-muted-foreground mt-8">
                    Don't have an account? <Link href="/register" className="font-semibold text-primary hover:underline">Register here</Link>
                </p>
            </motion.div>
        </div>
    </div>
  );
}
