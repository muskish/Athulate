"use client";

import { useState, useEffect } from "react";
import { 
  UserCircleIcon, 
  BoltIcon, 
  TrophyIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState<{
    name: string, email: string, avatar?: string,
    sport?: string, dob?: string, height?: number, weight?: number, bio?: string, goals?: string
  } | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const availableAvatars = [
    "/avatars/male_1.png", "/avatars/male_2.png", "/avatars/male_3.png",
    "/avatars/female_1.png", "/avatars/female_2.png", "/avatars/female_3.png", "/avatars/female_4.png", "/avatars/female_5.png"
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          if (data.avatar) setSelectedAvatar(data.avatar);
        }
      } catch (err) {}
    };
    fetchUser();
  }, []);

  const firstName = user ? user.name.split(' ')[0] : "John";
  const lastName = user && user.name.indexOf(' ') !== -1 ? user.name.substring(user.name.indexOf(' ') + 1) : "Doe";
  const email = user ? user.email : "athlete@example.com";

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const fname = formData.get("firstName") as string;
    const lname = formData.get("lastName") as string;
    const emailData = formData.get("email") as string;
    const newName = `${fname} ${lname}`;
    
    const sport = formData.get("sport") as string;
    const dob = formData.get("dob") as string;
    const heightStr = formData.get("height") as string;
    const weightStr = formData.get("weight") as string;
    const bio = formData.get("bio") as string;
    const goals = formData.get("goals") as string;
    
    const payload = {
      name: newName,
      email: emailData,
      avatar: selectedAvatar,
      sport,
      dob,
      height: heightStr ? parseFloat(heightStr) : null,
      weight: weightStr ? parseFloat(weightStr) : null,
      bio,
      goals
    };
    
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const updatedData = await res.json();
        setUser(updatedData);
        setIsEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Cog6ToothIcon className="w-8 h-8 text-electric" />
            Athlete Profile
          </h2>
          <p className="text-slate-500 font-medium">Manage your personal information, biometrics, and training goals.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <CheckIcon className="w-4 h-4" /> Changes Saved
            </span>
          )}
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white border flex items-center gap-2 border-slate-200 text-slate-800 text-sm rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-electric font-bold shadow-sm px-4 py-2 outline-none"
            >
              <PencilSquareIcon className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-white border border-slate-200 text-slate-500 text-sm rounded-lg hover:bg-slate-50 transition-colors font-bold shadow-sm px-4 py-2 outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Card / Header Box */}
        <section className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col items-start gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-electric-dim flex items-center justify-center text-electric text-3xl font-black border border-electric/20 overflow-hidden">
                {(isEditing ? selectedAvatar : user?.avatar) ? (
                  <img src={(isEditing ? selectedAvatar : user?.avatar) as string} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <UserCircleIcon className="w-full h-full text-electric opacity-50 absolute inset-0 -ml-1 -mt-1 scale-110" />
                    <span className="relative z-10">{firstName.charAt(0)}{lastName.charAt(0)}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-900">{user ? user.name : "John Doe"}</h3>
              <p className="text-slate-500 font-medium">Pro Tier Athlete</p>
            </div>
          </div>
          
          {/* Avatar Selector UI (Visible only during edit mode) */}
          {isEditing && (
            <div className="w-full mt-4 pt-6 border-t border-border animate-in fade-in duration-300">
              <label className="block text-sm font-bold text-slate-700 mb-3">Choose Your Avatar</label>
              <div className="flex flex-wrap gap-4">
                {availableAvatars.map((path) => (
                  <div 
                    key={path}
                    onClick={() => setSelectedAvatar(path)}
                    className={`w-16 h-16 rounded-full cursor-pointer overflow-hidden transition-all duration-200 border-2 ${
                      selectedAvatar === path 
                        ? 'border-electric scale-110 shadow-md shadow-electric/20' 
                        : 'border-transparent hover:border-slate-300 hover:scale-105 opacity-70 hover:opacity-100 bg-slate-50'
                    }`}
                  >
                    <img src={path} alt="Avatar option" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Signup Details Section */}
        <section className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-border flex items-center gap-2">
            <BoltIcon className="w-5 h-5 text-electric" />
            <h3 className="font-bold text-slate-900">Account Details</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">First Name</label>
              <input 
                type="text" 
                name="firstName"
                key={firstName}
                defaultValue={firstName} 
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                key={lastName}
                defaultValue={lastName} 
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
              <input 
                type="email" 
                name="email"
                key={email}
                defaultValue={email} 
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Primary Sport Component</label>
              <select 
                name="sport"
                key={user ? (user.sport || "track") : "track"}
                defaultValue={user?.sport || "track"} 
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors"
              >
                <option value="track">Track & Field</option>
                <option value="lifting">Weightlifting</option>
                <option value="crossfit">CrossFit</option>
                <option value="basketball">Basketball</option>
                <option value="other">Other / General Fitness</option>
              </select>
            </div>
          </div>
        </section>

        {/* Biometrics & Additional Info Section */}
        <section className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-border flex items-center gap-2">
            <TrophyIcon className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-slate-900">Biometrics & Goals</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Date of Birth</label>
              <input 
                type="date" 
                name="dob"
                key={user?.dob || "1998-05-15"}
                defaultValue={user?.dob || "1998-05-15"}
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Height (cm)</label>
              <input 
                type="number" 
                name="height"
                key={user?.height || 180}
                defaultValue={user?.height || 180} 
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Weight (kg)</label>
              <input 
                type="number" 
                name="weight"
                key={user?.weight || 75}
                defaultValue={user?.weight || 75} 
                step="0.1"
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Athlete Bio</label>
              <textarea 
                name="bio"
                key={user?.bio || "Dedicated track sprinter aiming for regional qualifiers. Always pushing limits and focusing on neural recovery."}
                rows={3}
                defaultValue={user?.bio || "Dedicated track sprinter aiming for regional qualifiers. Always pushing limits and focusing on neural recovery."}
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors resize-none"
              ></textarea>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Current Milestones / Goals</label>
              <textarea 
                name="goals"
                key={user?.goals || "Shave 0.2s off 100m dash by end of season."}
                rows={2}
                placeholder="e.g. Break 11 seconds in 100m sprint, Squat 1.5x bodyweight"
                defaultValue={user?.goals || "Shave 0.2s off 100m dash by end of season."}
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 font-medium focus:border-electric focus:ring-1 focus:ring-electric bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </section>

        {isEditing && (
          <div className="flex justify-end pt-4 pb-8">
            <button 
              type="submit"
              className="bg-electric hover:bg-electric-hover text-white font-bold rounded-xl px-8 py-3.5 shadow-md shadow-electric/20 transition-all hover:-translate-y-0.5"
            >
              Save Profile Changes
            </button>
          </div>
        )}

      </form>
    </div>
  );
}
