import ExerciseChecklist from "@/components/ExerciseChecklist";

// Mock data
const mockRoutine = [
  {
    id: "ex1",
    name: "Barbell Back Squat",
    target: "Quads & Glutes",
    videoUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop",
    sets: [
      { id: 1, weight: 135, reps: 10, completed: true },
      { id: 2, weight: 185, reps: 8, completed: false },
      { id: 3, weight: 225, reps: 5, completed: false },
    ]
  },
  {
    id: "ex2",
    name: "Romanian Deadlift",
    target: "Hamstrings",
    videoUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop",
    sets: [
      { id: 1, weight: 135, reps: 10, completed: false },
      { id: 2, weight: 155, reps: 8, completed: false },
      { id: 3, weight: 185, reps: 6, completed: false },
    ]
  }
];

export default function WorkoutsPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* Motivational Quote Banner */}
      <div className="bg-slate-900 border-l-4 border-electric rounded-r-xl p-6 mb-8 shadow-sm">
        <blockquote className="text-xl font-bold text-white italic">
          "The hard days are what make you stronger."
        </blockquote>
        <p className="text-electric mt-2 font-semibold text-sm">— Aly Raisman</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Today's Workout & Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Today's Protocol</h2>
            <span className="bg-orange-100 text-electric px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Lower Body Power
            </span>
          </div>

          <div>
            {mockRoutine.map(exercise => (
              <ExerciseChecklist key={exercise.id} exercise={exercise} />
            ))}
          </div>

          <button className="w-full bg-electric hover:bg-electric-hover text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all active:scale-[0.98]">
            Complete Workout
          </button>
        </div>

        {/* Right Column: Planner & Schedule */}
        <div className="lg:col-span-1 border-l border-slate-200 pl-0 lg:pl-8 mt-8 lg:mt-0">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            📅 Schedule Planner
          </h2>

          {/* Simple Tab Mockup */}
          <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
            <button className="flex-1 bg-white text-slate-900 shadow-sm rounded-md py-1.5 text-sm font-bold">Week</button>
            <button className="flex-1 text-slate-500 hover:text-slate-900 py-1.5 text-sm font-bold transition-colors">Month</button>
          </div>

          {/* Schedule List */}
          <div className="space-y-4">
            <ScheduleItem day="Mon" date="12" title="Lower Body Power" status="completed" />
            <ScheduleItem day="Tue" date="13" title="Active Recovery" status="completed" />
            <ScheduleItem day="Wed" date="14" title="Upper Body Hyper" status="active" />
            <ScheduleItem day="Thu" date="15" title="Rest Day" status="upcoming" />
            <ScheduleItem day="Fri" date="16" title="Conditioning" status="upcoming" />
            <ScheduleItem day="Sat" date="17" title="Heavy Deadlifts" status="upcoming" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleItem({ day, date, title, status }: { day: string, date: string, title: string, status: 'completed' | 'active' | 'upcoming' }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
      status === 'active' ? 'bg-orange-50/50 border-electric shadow-sm' : 
      status === 'completed' ? 'bg-slate-50 border-slate-200 opacity-60' : 
      'bg-white border-slate-100 hover:border-slate-300'
    }`}>
      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-md bg-slate-100 shrink-0">
        <span className="text-xs font-bold text-slate-500 uppercase">{day}</span>
        <span className="text-lg font-bold text-slate-900 leading-none">{date}</span>
      </div>
      <div>
        <h4 className={`font-bold text-sm ${status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
          {title}
        </h4>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {status === 'active' ? 'Today' : status === 'completed' ? 'Done' : 'Planned'}
        </p>
      </div>
    </div>
  );
}
