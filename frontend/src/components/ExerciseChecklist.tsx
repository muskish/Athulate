"use client";

import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as OutlineCheck } from "@heroicons/react/24/outline";

interface Set {
  id: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface Exercise {
  id: string;
  name: string;
  target: string;
  videoUrl?: string;
  sets: Set[];
}

export default function ExerciseChecklist({ exercise }: { exercise: Exercise }) {
  const [sets, setSets] = useState<Set[]>(exercise.sets);

  const toggleSet = (id: number) => {
    setSets(sets.map(s => 
      s.id === id ? { ...s, completed: !s.completed } : s
    ));
  };

  return (
    <div className="bg-white border text-slate-800 border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
      <div className="flex flex-col md:flex-row">
        {/* Video Placeholder */}
        <div 
          className="md:w-1/3 h-48 md:h-auto bg-slate-100 flex items-center justify-center bg-cover bg-center border-b md:border-b-0 md:border-r border-slate-200"
          style={{ backgroundImage: `url(${exercise.videoUrl || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop'})` }}
        >
           <div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
             Demo Video
           </div>
        </div>
        
        {/* Exercise Details & Checklist */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{exercise.name}</h3>
              <p className="text-sm font-semibold text-electric uppercase tracking-wider">{exercise.target}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="grid grid-cols-4 text-xs font-bold text-slate-500 uppercase tracking-wider px-2 pb-1 border-b border-slate-100">
              <span className="col-span-1 text-center">Set</span>
              <span className="col-span-1 text-center">kg/lbs</span>
              <span className="col-span-1 text-center">Reps</span>
              <span className="col-span-1 text-center">Done</span>
            </div>
            
            {sets.map((set, index) => (
              <div 
                key={set.id} 
                className={`grid grid-cols-4 items-center py-2 px-2 rounded-lg transition-colors ${
                  set.completed ? "bg-orange-50/50" : "hover:bg-slate-50"
                }`}
              >
                <span className="col-span-1 text-center font-bold text-slate-700">{index + 1}</span>
                <span className="col-span-1 text-center font-semibold text-slate-600 bg-white border border-slate-200 rounded-md py-1 shadow-sm mx-1">{set.weight}</span>
                <span className="col-span-1 text-center font-semibold text-slate-600 bg-white border border-slate-200 rounded-md py-1 shadow-sm mx-1">{set.reps}</span>
                <div className="col-span-1 flex justify-center">
                  <button 
                    onClick={() => toggleSet(set.id)}
                    className="focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-1 rounded-full transition-transform hover:scale-110 active:scale-95"
                  >
                    {set.completed ? (
                      <CheckCircleIcon className="w-8 h-8 text-electric" />
                    ) : (
                      <OutlineCheck className="w-8 h-8 text-slate-300 hover:text-electric transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
