import Link from "next/link";
import { BoltIcon, ChartBarIcon, ChatBubbleLeftRightIcon, UserGroupIcon, AcademicCapIcon, FireIcon } from "@heroicons/react/24/solid";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-electric w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-electric/30">
                <BoltIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">Athulation</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Athletes</a>
              <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
                <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-electric transition-colors">
                  Log in
                </Link>
                <Link href="/signup" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors shadow-sm">
                  Sign up free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-50 border-b border-slate-100 py-24 lg:py-32">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-electric/10 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-orange-400/10 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Text */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6">
                <FireIcon className="w-4 h-4" /> Next-Gen Athlete OS
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-6">
                Train <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-blue-600">Smarter.</span><br/>
                Recover <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Faster.</span>
              </h1>
              <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed max-w-xl">
                Athulation is the ultimate high-performance platform. Connect with elite coaches, track pinpoint analytics, optimize your macros, and unlock your true physical potential with AI-driven insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="bg-electric hover:bg-blue-600 text-white text-center font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl shadow-electric/20 text-lg">
                  Start Training Now
                </Link>
                <Link href="#features" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-center font-bold px-8 py-4 rounded-full transition-all text-lg shadow-sm">
                  View Features
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-4 text-sm font-semibold text-slate-500">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-slate-50" src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=100&auto=format&fit=crop" alt="User 1" />
                  <img className="w-10 h-10 rounded-full border-2 border-slate-50" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&auto=format&fit=crop" alt="User 2" />
                  <img className="w-10 h-10 rounded-full border-2 border-slate-50" src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop" alt="User 3" />
                </div>
                <div>Join 10,000+ elite athletes</div>
              </div>
            </div>
            
            {/* Hero Image / Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-electric/20 to-orange-400/20 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop" 
                alt="Athlete training" 
                className="relative rounded-3xl shadow-2xl border-4 border-white object-cover h-[600px] w-full"
              />
              
              {/* Floating UI Card Mockup */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FireIcon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Streak</p>
                  <p className="text-xl font-black text-slate-900">42 Days</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-electric uppercase tracking-widest mb-2">Platform Features</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Everything you need to break your plateau.</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ChartBarIcon className="w-6 h-6 text-white" />}
              title="Advanced Analytics"
              desc="Track workouts, set PRs, and map out your progression over time with our custom dashboards and heatmaps."
              color="bg-slate-900"
            />
            <FeatureCard 
              icon={<ChartBarIcon className="w-6 h-6 text-white"/>} // Reusing Chart icon for macro logic
              title="Smart Nutrition"
              desc="Log meals with photos, get AI macro breakdowns, and receive timely fueling suggestions to match your training."
              color="bg-electric"
            />
            <FeatureCard 
              icon={<AcademicCapIcon className="w-6 h-6 text-white" />}
              title="Pro Guidance"
              desc="Book 1-on-1 sessions, get form feedback, and chat with strength coaches, dietitians, and sports psychologists."
              color="bg-orange-500"
            />
            <FeatureCard 
              icon={<ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />}
              title="AI Coach"
              desc="Your personal AI assistant available 24/7. Get workout adjustments, dynamic recovery tips, and immediate answers."
              color="bg-blue-500"
            />
            <FeatureCard 
              icon={<UserGroupIcon className="w-6 h-6 text-white" />}
              title="Community Feed"
              desc="Connect with your team. Share PRs, analyze routines, and compete on local leaderboards."
              color="bg-teal-500"
            />
            <FeatureCard 
              icon={<BoltIcon className="w-6 h-6 text-white" />}
              title="Recovery Metrics"
              desc="Sync with HRV monitors and wearables. Prevent overtraining through dynamic load balancing."
              color="bg-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div id="testimonials" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-electric/20 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black text-center mb-16 tracking-tight">Trusted by the dedicated.</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-slate-900">
            {/* Reviews */}
            <ReviewCard 
              text="This app completely changed my programming. The AI coach spotted a flaw in my training volume I never would have caught."
              name="Sarah Jenkins"
              role="CrossFit Athlete"
              image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=150&auto=format&fit=crop"
            />
            <ReviewCard 
              text="The Guidance tab is a game-changer. Speaking directly to a sports dietitian helped me nail my weight category without losing strength."
              name="Marcus Thorne"
              role="Powerlifter"
              image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=150&auto=format&fit=crop"
            />
            <ReviewCard 
              text="Clean UI, blazing fast, and doesn't overwhelm you with useless data. Just the metrics that matter for getting faster."
              name="David Alaba"
              role="Track Sprinter"
              image="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=150&auto=format&fit=crop"
            />
          </div>
        </div>
      </div>
      
      {/* Footer / Final CTA */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="bg-electric w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-electric/30 mb-6">
            <BoltIcon className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-6">Ready to reach the next level?</h2>
          <Link href="/signup" className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-8 py-4 rounded-full transition-colors mb-12">
            Create Your Free Account
          </Link>
          <p className="text-slate-400 font-medium text-sm">© 2026 Athulation Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-md ${color}`}>
        {icon}
      </div>
      <h4 className="text-xl font-black text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-600 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function ReviewCard({ text, name, role, image }: { text: string, name: string, role: string, image: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col">
      <div className="flex gap-1 text-amber-500 mb-6">
        {[1,2,3,4,5].map(i => <StarFilledIcon key={i} />)}
      </div>
      <p className="text-slate-700 font-medium mb-8 flex-1 leading-relaxed text-lg">"{text}"</p>
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h5 className="font-bold text-slate-900">{name}</h5>
          <p className="text-sm text-slate-500 font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
}

function StarFilledIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
  );
}
