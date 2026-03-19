"use client";

import Link from "next/link";
import { BoltIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-electric/10 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-orange-400/10 rounded-full blur-3xl opacity-70"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <Link href="/">
            <div className="bg-electric w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-electric/30 hover:scale-105 transition-transform">
              <BoltIcon className="w-8 h-8 text-white" />
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-slate-600">
          Or{' '}
          <Link href="/signup" className="font-bold text-electric hover:text-electric-hover transition-colors">
            create a new athlete profile
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10 border border-slate-100">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold mb-6 text-center">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric sm:text-sm bg-slate-50 hover:bg-white transition-colors"
                  placeholder="athlete@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="mt-2 text-slate-900">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric sm:text-sm bg-slate-50 hover:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-electric focus:ring-electric text-slate-900"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-electric hover:text-electric-hover transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 hover:shadow-md disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <img className="h-5 w-5 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
                  Google
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.12-.76 3.65-.79 1.77.03 2.97.74 3.73 1.84-2.83 1.58-2.3 5.4 0 6.6-1.01 2.37-2.39 3.54-2.46 3.62L17.05 20zM12.03 7.25C11.83 4.29 14.15 2 16.71 2c.24 3.32-2.67 5.76-5.69 5.25z"/>
                  </svg>
                  Apple
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
