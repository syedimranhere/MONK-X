"use client"

import { useSession, signIn } from "next-auth/react";
import { Loader2, LogIn, Mail } from "lucide-react";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';


import { useEffect } from "react";
export default function SignInPage() {
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingCredentials, setLoadingCredentials] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/home");
    }
  }, [session, router]);

  async function handleCredentials(e) {
    e.preventDefault();
    setLoadingCredentials(true);
    const email = emailref.current.value;
    const password = passwordref.current.value;
    console.log(email, password);

    await signIn("credentials", { email, password, redirect: true });
    setLoadingCredentials(false);
  }

  async function handleGoogleSignIn() {
    setLoadingGoogle(true);
    await signIn("google",);
    setLoadingGoogle(false);
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Azure Depths */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(175% 175% at 50% 90%, #000000 40%, #010133 100%)",
        }}
      />
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="max-w-md w-full bg-neutral-900/60  rounded-2xl p-8 backdrop-blur-md ">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white text-transparent bg-clip-text">
            Welcome Back
          </h1>

          {/* Google Sign In */}
          <div className="mb-8">
            <button
              onClick={handleGoogleSignIn}
              disabled={loadingGoogle}
              className={`w-full flex items-center justify-center gap-3 py-3 rounded-md font-semibold 
              bg-gradient-to-r from-green-800 
              
              ${loadingGoogle ? "opacity-70 cursor-not-allowed" : ""}
            `}
            >
              {loadingGoogle ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
              <span>{loadingGoogle ? "Signing in..." : "Sign in with Google"}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-neutral-900 px-2 text-neutral-400">or</span>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleCredentials} className="space-y-4">
            <input
              type="email"
              name="email"
              ref={emailref}
              placeholder="Email"
              required
              className="w-full px-4 py-3  bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-gray-800 text-sm"
            />
            <input
              ref={passwordref}
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3  bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-gray-800 text-sm"
            />

            <button
              type="submit"
              disabled={loadingCredentials}
              className={`w-full flex items-center justify-center gap-3 py-3 rounded-sm font-semibold 
              bg-gradient-to-r  to-green-600 hover:from-green-500 
              transition-all duration-300 shadow-lg hover:shadow-blue-500/25
              ${loadingCredentials ? "opacity-70 cursor-not-allowed" : ""}
            `}
            >
              {loadingCredentials ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              <span>{loadingCredentials ? "Signing in..." : "Sign in"}</span>
            </button>
          </form>


          <p className="text-center  text-neutral-300 mb-2 text-xs mt-6 ">
            By signing in, you agree to our{" "}
            <a href="#" className="text-gray-500 no-underline hover:underline ">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-500 no-underline hover:underline ">
              Privacy Policy
            </a>.
          </p>
          <div className="flex justify-center text-center gap-1">
            <p className="text-center text-sm ">Dont have an account?  </p>

            <a href="/signup" className="text-gray-500 text-xs hover:underline ">Sign up</a>
          </div>
        </div>
      </div>
    </div>

  );
}