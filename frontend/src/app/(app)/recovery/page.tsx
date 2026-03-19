"use client";

import { useState } from "react";
import { 
  MoonIcon, 
  HeartIcon, 
  ShieldExclamationIcon, 
  PhoneIcon,
  PlusCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  hospital: string;
}

interface Injury {
  id: string;
  bodyPart: string;
  date: string;
  status: 'Active' | 'Recovered';
  notes: string;
}

const medicalContacts: Doctor[] = [
  { id: 'd1', name: 'Dr. Sarah Mitchell', specialty: 'Orthopedic Surgeon', phone: '+1 (555) 123-4567', email: 's.mitchell@sportsmed.com', hospital: 'Elite Sports Clinic' },
  { id: 'd2', name: 'Dr. James Wilson', specialty: 'Sports Physiotherapist', phone: '+1 (555) 987-6543', email: 'j.wilson@physiohealth.org', hospital: 'Advanced Rehab Center' },
  { id: 'd3', name: 'Dr. Emily Chen', specialty: 'Chiropractor', phone: '+1 (555) 456-7890', email: 'e.chen@spinealign.com', hospital: 'Peak Performance Chiro' },
];

const injuriesList: Injury[] = [
  { id: 'i1', bodyPart: 'Right Shoulder', date: '2026-03-10', status: 'Active', notes: 'Mild rotator cuff inflammation. Avoiding overhead presses.' },
  { id: 'i2', bodyPart: 'Left Knee', date: '2025-11-15', status: 'Recovered', notes: 'Patellar tendinitis. Fully rehabbed, continuing isolation exercises.' },
];

export default function RecoveryPage() {
  const [sleepHours, setSleepHours] = useState("7");
  const [sleepTime, setSleepTime] = useState("23:30");
  const [sleepQuality, setSleepQuality] = useState<'Excellent' | 'Good' | 'Fair' | 'Poor'>('Good');

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Recovery & Wellness</h2>
        <p className="text-slate-500 font-medium">Monitor your sleep, track injuries, and connect with medical professionals.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column: Sleep Tracking & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Sleep Input Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MoonIcon className="w-6 h-6 text-electric" /> Sleep Logger
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Hours Slept</label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2">
                  <input 
                    type="number" 
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-slate-900 focus:outline-none"
                    min="0" max="24" step="0.5"
                  />
                  <span className="text-sm font-bold text-slate-500">hrs</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Bedtime</label>
                <input 
                  type="time" 
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="w-full h-[46px] bg-slate-50 border border-slate-200 rounded-lg px-3 text-lg font-bold text-slate-900 focus:ring-electric focus:border-electric outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Quality</label>
                <select 
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(e.target.value as any)}
                  className="w-full h-[46px] bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-bold text-slate-900 focus:ring-electric focus:border-electric outline-none cursor-pointer"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors">
              Log Sleep Data
            </button>
          </div>

          {/* Sleep Analysis & Recommendations */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-indigo-600" /> AI Sleep Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div className="bg-white/80 p-4 rounded-lg border border-indigo-50">
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recommended Rest</p>
                 <p className="text-2xl font-black text-slate-900">8.5 <span className="text-lg text-slate-500">hours</span></p>
                 <p className="text-xs text-indigo-600 font-semibold mt-1">Based on yesterday's high strain</p>
               </div>
               <div className="bg-white/80 p-4 rounded-lg border border-indigo-50">
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pattern Insight</p>
                 <p className="text-sm font-bold text-slate-800">Delayed Onset detected.</p>
                 <p className="text-xs text-slate-500 mt-1">Sleeping at {sleepTime} reduces deep sleep cycles. Try shifting bedtime to 22:30.</p>
               </div>
            </div>
            
            <p className="text-sm font-medium text-slate-700">
               <span className="font-bold text-indigo-700">Suggestion:</span> Your current 7 hours is insufficient for central nervous system (CNS) recovery. Consider a 20-minute nap today before 3 PM, and optimize your bedroom temperature for a deeper sleep tonight.
            </p>
          </div>
        </div>

        {/* Right Column: Daily Readiness & Muscle Soreness */}
        <div className="lg:col-span-1 border-l border-slate-200 pl-0 lg:pl-8 mt-8 lg:mt-0">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HeartIcon className="w-6 h-6 text-rose-500" /> Daily Readiness
          </h3>
          
          <div className="bg-white border text-slate-800 border-slate-200 rounded-xl p-6 shadow-sm mb-6 text-center text-slate-900">
            <div className="relative inline-flex items-center justify-center mb-2">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251" strokeDashoffset="251" className="text-orange-500" style={{ strokeDashoffset: '75', transition: 'stroke-dashoffset 1s ease-out' }} />
              </svg>
              <span className="absolute text-3xl font-black text-slate-900">70</span>
            </div>
            <p className="font-bold text-slate-700">Moderate Recovery</p>
            <p className="text-xs text-slate-500 mt-1">Ready for moderate intensity training.</p>
          </div>

          <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Muscle Soreness Map</h4>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
             <div className="flex items-center justify-between mb-2">
               <span className="text-sm font-semibold text-slate-700">Quads</span>
               <div className="flex gap-1"><span className="w-8 h-2 bg-orange-500 rounded-full"/><span className="w-8 h-2 bg-slate-200 rounded-full"/><span className="w-8 h-2 bg-slate-200 rounded-full"/></div>
             </div>
             <div className="flex items-center justify-between mb-2">
               <span className="text-sm font-semibold text-slate-700">Hamstrings</span>
               <div className="flex gap-1"><span className="w-8 h-2 bg-orange-300 rounded-full"/><span className="w-8 h-2 bg-slate-200 rounded-full"/><span className="w-8 h-2 bg-slate-200 rounded-full"/></div>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-sm font-semibold text-slate-700">Chest</span>
               <div className="flex gap-1"><span className="w-8 h-2 bg-slate-200 rounded-full"/><span className="w-8 h-2 bg-slate-200 rounded-full"/><span className="w-8 h-2 bg-slate-200 rounded-full"/></div>
             </div>
          </div>
          <button className="w-full text-xs font-bold text-electric hover:text-electric-hover transition-colors">
            + Update Soreness Map
          </button>
        </div>
      </div>

      {/* Injury Tracking Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldExclamationIcon className="w-7 h-7 text-amber-500" /> Injury Tracking
          </h3>
          <button className="flex items-center gap-1 text-sm font-bold text-electric hover:text-electric-hover transition-colors">
            <PlusCircleIcon className="w-5 h-5" /> Log New Injury
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {injuriesList.map(injury => (
            <div key={injury.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold text-slate-900">{injury.bodyPart}</h4>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  injury.status === 'Active' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {injury.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold mb-3">Logged: {injury.date}</p>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {injury.notes}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Medical Help Option */}
      <section>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
          Medical Directory
        </h3>
        <p className="text-slate-500 font-medium mb-6">Quick access to your curated medical professionals for consultations and emergencies.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {medicalContacts.map(doc => (
            <div key={doc.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="mb-4">
                <h4 className="text-lg font-bold text-slate-900">{doc.name}</h4>
                <p className="text-sm font-semibold text-electric">{doc.specialty}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{doc.hospital}</p>
              </div>
              <div className="mt-auto space-y-3">
                <a href={`tel:${doc.phone}`} className="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-electric transition-colors bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <PhoneIcon className="w-4 h-4 text-slate-400" /> {doc.phone}
                </a>
                <a href={`mailto:${doc.email}`} className="flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-electric transition-colors p-2">
                  <span className="text-slate-400">@</span> {doc.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
