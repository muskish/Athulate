"use client";

import { useState } from "react";
import { 
  ChatBubbleLeftRightIcon, 
  CalendarDaysIcon, 
  VideoCameraIcon,
  StarIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";

interface Professional {
  id: string;
  name: string;
  role: string;
  specialty: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  availability: string;
}

const professionals: Professional[] = [
  {
    id: "p1",
    name: "Marcus Thorne",
    role: "Training Coach",
    specialty: "Strength & Conditioning",
    rating: 4.9,
    reviews: 124,
    imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop",
    availability: "Available Today"
  },
  {
    id: "p2",
    name: "Sarah Jenkins",
    role: "Gym Coach",
    specialty: "Form Correction & Mobility",
    rating: 4.8,
    reviews: 89,
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    availability: "Next slots: Tomorrow"
  },
  {
    id: "p3",
    name: "Dr. Elena Rostova",
    role: "Dietitian",
    specialty: "Sports Nutrition & Macros",
    rating: 5.0,
    reviews: 201,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
    availability: "Available Today"
  },
  {
    id: "p4",
    name: "James Chen",
    role: "Sports Psychologist",
    specialty: "Mental Resilience & Focus",
    rating: 4.9,
    reviews: 156,
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop",
    availability: "Next slots: Fri, 10 AM"
  }
];

export default function GuidancePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Training", "Nutrition", "Mental"];

  const getFilteredProfessionals = () => {
    if (activeFilter === "All") return professionals;
    if (activeFilter === "Training") return professionals.filter(p => p.role.includes("Coach"));
    if (activeFilter === "Nutrition") return professionals.filter(p => p.role.includes("Dietitian"));
    if (activeFilter === "Mental") return professionals.filter(p => p.role.includes("Psychologist"));
    return professionals;
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Professional Guidance</h2>
        <p className="text-slate-500 font-medium">Connect with top-tier coaches, dietitians, and sports psychologists.</p>
      </header>
      
      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors shadow-sm ${
              activeFilter === filter 
                ? "bg-slate-900 text-white" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid of Professionals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {getFilteredProfessionals().map(pro => (
          <div key={pro.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
            
            {/* Header / Image Area */}
            <div className="h-32 bg-slate-100 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${pro.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <span className="bg-electric text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {pro.role}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full backdrop-blur-md ${
                  pro.availability.includes('Today') ? 'bg-emerald-500/80 text-white' : 'bg-white/20 text-white'
                }`}>
                  {pro.availability}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-1">
                  {pro.name}
                  <CheckBadgeIcon className="w-5 h-5 text-electric" />
                </h3>
              </div>
              <p className="text-sm font-semibold text-slate-500 mb-3">{pro.specialty}</p>
              
              <div className="flex items-center gap-1 text-sm font-bold text-slate-700 mb-6">
                <StarIcon className="w-5 h-5 text-amber-500" />
                {pro.rating} <span className="text-slate-400 font-medium">({pro.reviews} reviews)</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-lg transition-colors text-sm">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" /> Chat
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-lg transition-colors text-sm">
                    <VideoCameraIcon className="w-4 h-4" /> Feedback
                  </button>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-electric hover:bg-electric-hover text-white font-bold py-3 rounded-lg shadow-sm transition-colors mt-2">
                  <CalendarDaysIcon className="w-5 h-5 -ml-1 text-white/80" /> Book Appointment
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
