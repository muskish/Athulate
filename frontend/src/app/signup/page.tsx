"use client";

import Link from "next/link";
import { BoltIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    const name = `${firstName} ${lastName}`;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Signup failed");
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
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-[30rem] h-[30rem] bg-electric/10 rounded-full blur-3xl opacity-70"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <Link href="/">
            <div className="bg-electric w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-electric/30 hover:scale-105 transition-transform">
              <BoltIcon className="w-8 h-8 text-white" />
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-electric hover:text-electric-hover transition-colors">
            Sign in instead
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10 border border-slate-100">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold mb-6 text-center">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-slate-700">First Name</label>
                <div className="mt-2">
                  <input
                    id="firstName" name="firstName" type="text" required
                    className="block w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric sm:text-sm bg-slate-50 hover:bg-white transition-colors"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-slate-700">Last Name</label>
                <div className="mt-2">
                  <input
                    id="lastName" name="lastName" type="text" required
                    className="block w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric sm:text-sm bg-slate-50 hover:bg-white transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700">Email address</label>
              <div className="mt-2">
                <input
                  id="email" name="email" type="email" autoComplete="email" required
                  className="block w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric sm:text-sm bg-slate-50 hover:bg-white transition-colors"
                  placeholder="athlete@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700">Password</label>
              <div className="mt-2">
                <input
                  id="password" name="password" type="password" required
                  className="block w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric sm:text-sm bg-slate-50 hover:bg-white transition-colors"
                  placeholder="Create a strong password"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="sport" className="block text-sm font-bold text-slate-700">Primary Sport</label>
              <div className="mt-2 text-slate-900">
                <select id="sport" name="sport" className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 font-medium focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric sm:text-sm bg-slate-50 hover:bg-white cursor-pointer transition-colors">
                  <option value="track">Track & Field</option>
                  <option value="lifting">Weightlifting</option>
                  <option value="crossfit">CrossFit</option>
                  <option value="basketball">Basketball</option>
                  <option value="other">Other / General Fitness</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms" name="terms" type="checkbox" required
                className="h-4 w-4 rounded border-slate-300 text-electric focus:ring-electric text-slate-900"
              />
              <label htmlFor="terms" className="ml-2 block text-sm font-medium text-slate-600">
                I agree to the <a href="#" className="font-bold text-electric hover:text-electric-hover">Terms of Service</a> and <a href="#" className="font-bold text-electric hover:text-electric-hover">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-xl bg-electric px-4 py-3.5 text-sm font-bold text-white shadow-sm shadow-electric/20 hover:bg-electric-hover hover:scale-[1.01] transition-all focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
