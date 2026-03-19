import WorkoutCard from "@/components/WorkoutCard";
import ProgressChart from "@/components/ProgressChart";
import AICoachSuggestion from "@/components/AICoachSuggestion";
import ActivityHeatmap from "@/components/ActivityHeatmap";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-1">Welcome back, Athlete!</h2>
          <p className="text-slate-500 font-medium">Here's your performance snapshot and AI recommendations for today.</p>
        </div>
        
        {/* Select Sport Dropdown / Filter (Mockup implementation) */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-bold text-slate-400">DISCIPLINE</label>
          <select className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-electric focus:border-electric block p-2.5 font-bold shadow-sm outline-none cursor-pointer">
            <option>Powerlifting</option>
            <option>Track & Field</option>
            <option>Basketball</option>
            <option>CrossFit</option>
          </select>
        </div>
      </header>

      {/* AI Suggestions Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AICoachSuggestion 
            suggestion="Based on your sleep metrics tonight (HRV dropped 12%), recommend swapping Heavy Squats for a light Active Recovery session."
            metricFocus="Recovery & HRV"
            impact="Avoids overtraining; optimizes CNS recovery."
          />
          <AICoachSuggestion 
            suggestion="You've been consistently hitting your protein macros but falling short on carbs. Increase carb intake by 50g pre-workout today."
            metricFocus="Nutrition"
            impact="Improved energy for high-intensity intervals."
          />
        </div>
      </section>

      {/* Analytics & Streak Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <ProgressChart />
         <ActivityHeatmap />
      </section>

      {/* Workouts Section */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-electric pl-3">Suggested Workouts</h3>
          <button className="text-sm text-electric hover:text-electric-hover transition-colors font-bold flex items-center gap-1">
            View Library
            <span className="bg-electric-dim px-2 py-0.5 rounded-full text-xs">24</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkoutCard 
            title="Active Recovery Flow" 
            duration="30 min" 
            intensity="Low" 
            muscleGroup="Full Body Mobility" 
            imageUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop"
          />
          <WorkoutCard 
            title="Explosive Power" 
            duration="45 min" 
            intensity="High" 
            muscleGroup="Legs & Core" 
            imageUrl="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"
          />
          <WorkoutCard 
            title="Upper Body Hypertrophy" 
            duration="60 min" 
            intensity="Medium" 
            muscleGroup="Chest & Back" 
            imageUrl="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop"
          />
        </div>
      </section>
    </div>
  );
}
