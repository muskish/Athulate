import { PlayCircleIcon } from "@heroicons/react/24/solid";

interface WorkoutCardProps {
  title: string;
  duration: string;
  intensity: string;
  muscleGroup: string;
  imageUrl?: string;
}

export default function WorkoutCard({ title, duration, intensity, muscleGroup, imageUrl }: WorkoutCardProps) {
  // Use a predefined placeholder gradient if no URL is provided
  const bgImage = imageUrl 
    ? `url(${imageUrl})`
    : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-electric/30 transition-all group flex flex-col">
      <div 
        className="relative w-full h-48 flex items-center justify-center cursor-pointer bg-cover bg-center"
        style={{ backgroundImage: bgImage }}
      >
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors" />
        {/* Video Placeholder Play Button */}
        <div className="z-10 bg-white/90 rounded-full p-1 shadow-md hidden group-hover:block transition-all transform scale-90 group-hover:scale-100">
          <PlayCircleIcon className="w-12 h-12 text-electric" />
        </div>
        
        {/* Intensity Badge top right */}
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm">
          🔥 {intensity}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs font-bold text-electric uppercase tracking-wider mb-1">{muscleGroup}</div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{title}</h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
           <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
             <span className="text-slate-400">⏱</span> {duration}
           </span>
           <button className="text-electric font-semibold text-sm hover:text-electric-hover transition-colors">
              Start &rarr;
           </button>
        </div>
      </div>
    </div>
  );
}
