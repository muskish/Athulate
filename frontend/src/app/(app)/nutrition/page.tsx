"use client";

import { useState } from "react";
import { PhotoIcon, ChartPieIcon, CheckCircleIcon, FireIcon } from "@heroicons/react/24/solid";

interface IntakeEntry {
  id: string;
  time: string;
  type: 'Meal' | 'Snack' | 'Hydration';
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const mockSchedule: IntakeEntry[] = [
  { id: '1', time: '08:00 AM', type: 'Meal', description: 'Oatmeal with Protein Powder & Berries', calories: 450, protein: 35, carbs: 55, fats: 10 },
  { id: '2', time: '10:30 AM', type: 'Hydration', description: 'Electrolyte Water (750ml)', calories: 15, protein: 0, carbs: 3, fats: 0 },
  { id: '3', time: '01:00 PM', type: 'Meal', description: 'Grilled Chicken Salad with Quinoa', calories: 600, protein: 50, carbs: 45, fats: 20 },
  { id: '4', time: '04:00 PM', type: 'Snack', description: 'Greek Yogurt & Almonds', calories: 250, protein: 20, carbs: 15, fats: 12 },
];

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Nutrition & Fueling</h2>
        <p className="text-slate-500 font-medium">Track your intake and optimize your macros for peak performance.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input + Analysis */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Input Card */}
          <div className="bg-white border text-slate-800 border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Log Nutrition</h3>
            
            {/* Toggle Text/Image */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-4 w-full md:w-64">
              <button 
                onClick={() => setActiveTab('text')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md py-1.5 text-sm font-bold transition-colors ${activeTab === 'text' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Text Entry
              </button>
              <button 
                onClick={() => setActiveTab('image')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md py-1.5 text-sm font-bold transition-colors ${activeTab === 'image' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <PhotoIcon className="w-4 h-4" /> Image Scan
              </button>
            </div>

            {/* Form */}
            {activeTab === 'text' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">What did you eat/drink?</label>
                  <textarea 
                    rows={3} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-electric focus:border-electric outline-none resize-none"
                    placeholder="e.g. 2 scrambled eggs, 1 slice whole wheat toast, 500ml water"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                     <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold">
                       <option>Meal</option>
                       <option>Snack</option>
                       <option>Supplement</option>
                       <option>Hydration</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                     <input type="time" defaultValue="12:00" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <PhotoIcon className="w-12 h-12 text-slate-400 mb-3" />
                <p className="text-sm font-bold text-slate-700">Click to upload or drag & drop</p>
                <p className="text-xs text-slate-500 mt-1">AI will automatically analyze the meal components</p>
              </div>
            )}
            
            <button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors">
              Analyze & Log
            </button>
          </div>

          {/* Analysis & AI Suggestion Block */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-5 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex items-center gap-2 mb-4">
               <ChartPieIcon className="w-6 h-6 text-electric" />
               <h3 className="text-xl font-bold text-slate-900">AI Nutritional Analysis</h3>
            </div>
            
            <p className="text-sm font-medium text-slate-700 mb-4 leading-relaxed">
               Based on your daily logs so far, you have consumed <span className="font-bold">1,315 kcal</span>. 
               You are tracking well on <span className="font-bold text-emerald-600">Protein (105g)</span>, but 
               currently lacking in <span className="font-bold text-rose-500">Complex Carbohydrates</span> needed for your planned Heavy Squat session later today.
            </p>
            
            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
               <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                 <CheckCircleIcon className="w-4 h-4 text-electric" /> Actionable Suggestion
               </h4>
               <p className="text-sm text-slate-600">
                 Add a pre-workout snack 60 minutes before training. Recommendation: <span className="font-bold text-slate-800">1 banana and 40g of oats</span> to top up glycogen stores.
               </p>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Schedule / Macro Tracker */}
        <div className="lg:col-span-1 border-l border-slate-200 pl-0 lg:pl-8 mt-8 lg:mt-0">
          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <FireIcon className="w-6 h-6 text-electric" />
            Daily Intake
          </h3>
          
          {/* Quick Macro Overview */}
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg mb-6 border border-slate-100">
            <div className="text-center">
              <span className="block text-xs font-bold text-slate-500 uppercase">Protein</span>
              <span className="block text-sm font-bold text-blue-600">105/180g</span>
            </div>
            <div className="text-center">
              <span className="block text-xs font-bold text-slate-500 uppercase">Carbs</span>
              <span className="block text-sm font-bold text-rose-500">118/350g</span>
            </div>
            <div className="text-center">
              <span className="block text-xs font-bold text-slate-500 uppercase">Fats</span>
              <span className="block text-sm font-bold text-amber-500">42/75g</span>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
            <button className="flex-1 bg-white text-slate-900 shadow-sm rounded-md py-1.5 text-sm font-bold">Today</button>
            <button className="flex-1 text-slate-500 hover:text-slate-900 py-1.5 text-sm font-bold transition-colors">Week</button>
            <button className="flex-1 text-slate-500 hover:text-slate-900 py-1.5 text-sm font-bold transition-colors">Month</button>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {mockSchedule.map((entry, idx) => (
              <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-electric shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0 md:group-odd:text-right md:group-even:pl-4">
                  <div className="flex flex-col bg-white border border-slate-200 p-3 rounded-lg shadow-sm hover:border-electric/50 transition-colors">
                    <span className="text-xs font-bold text-electric mb-1">{entry.time} • {entry.type}</span>
                    <span className="text-sm font-bold text-slate-900 leading-tight mb-2">{entry.description}</span>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-auto md:group-odd:justify-end">
                      <span>🔥 {entry.calories} kcal</span>
                      <span>🥩 {entry.protein}g</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Upcoming Slot Marker */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-slate-200 bg-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0 md:group-odd:text-right md:group-even:pl-4 opacity-50">
                  <span className="text-xs font-bold text-slate-400">07:30 PM • Dinner</span>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
