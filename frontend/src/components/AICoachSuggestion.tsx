import { SparklesIcon, LightBulbIcon } from "@heroicons/react/24/solid";

interface AICoachSuggestionProps {
  suggestion: string;
  metricFocus: string;
  impact: string;
}

export default function AICoachSuggestion({ suggestion, metricFocus, impact }: AICoachSuggestionProps) {
  return (
    <div className="bg-white border text-foreground border-border rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Decorative side accent */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-electric" />
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 mb-3 ml-2">
          <div className="bg-orange-100 p-1.5 rounded-md">
             <SparklesIcon className="w-4 h-4 text-electric" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">AI Insight</h3>
        </div>
        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
          {metricFocus}
        </span>
      </div>
      
      <p className="text-slate-700 text-base font-medium mb-4 leading-relaxed ml-2 pl-1 border-l-2 border-slate-100">
        {suggestion}
      </p>
      
      <div className="text-sm text-slate-500 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
        <LightBulbIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
           <span className="font-bold text-slate-700 block mb-0.5">Impact:</span> 
           {impact}
        </div>
      </div>
    </div>
  );
}
