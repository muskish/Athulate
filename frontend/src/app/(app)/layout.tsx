import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
import { BoltIcon } from "@heroicons/react/24/outline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athulation | High-Performance Athlete Training",
  description: "Advanced AI-driven athlete management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex h-screen w-full overflow-hidden bg-background text-foreground relative`}>
      <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
          {/* Mobile Header */}
          <header className="md:hidden shrink-0 h-16 border-b border-border bg-surface flex items-center px-4 shadow-sm z-10 w-full">
            <BoltIcon className="w-6 h-6 text-electric mr-2" />
            <span className="font-bold text-lg text-foreground">Athulation</span>
          </header>
          
          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="w-full p-4 md:p-8 pb-24 mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
        
        {/* Global Chatbot UI */}
        <Chatbot />
    </div>
  );
}
