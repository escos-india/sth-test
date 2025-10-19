'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SthapatiLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email === 'sthapati@gmail.com' && password === 'admin') {
      document.cookie = 'admin-auth=true; path=/;';
      router.push('/sthapati/dashboard');
    } else {
      setIsLoading(false);
      // Handle login failure (e.g., show an error message)
      // For now, we'll just clear the password
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Sthapati</h1>
        <p className="text-xl">Your Platform, Your Control.</p>
      </div>
      <div className="w-1/2 bg-background flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-background/50 backdrop-blur-md rounded-2xl border border-border">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Admin Login</h2>
          <div className="relative mb-6">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-lg border border-input appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email Address
            </label>
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-lg border border-input appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password
            </label>
          </div>
          <button
            type="submit" // Changed to type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-foreground mx-auto"></div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
