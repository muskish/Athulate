"use client";

import { useState } from "react";
import { 
  MegaphoneIcon, 
  CalendarDateRangeIcon, 
  TrophyIcon, 
  UserPlusIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

type PostCategory = 'All' | 'Events' | 'Competitions' | 'Personal Training';

interface Post {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    isOrg: boolean;
    role?: string;
  };
  category: PostCategory;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
  hasLiked?: boolean;
}

const mockPosts: Post[] = [
  {
    id: "post1",
    author: {
      name: "Global Athletics Federation",
      avatarUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=100&auto=format&fit=crop",
      isOrg: true
    },
    category: "Events",
    content: "Registration is now OPEN for the 2026 Summer Track & Field Invitational! Early bird pricing ends this Friday. Open to all amateur and pro athletes.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607fa8211?q=80&w=800&auto=format&fit=crop",
    timestamp: "2 hours ago",
    likes: 412,
    comments: 48,
    hasLiked: false
  },
  {
    id: "post2",
    author: {
      name: "Sarah Jenkins",
      avatarUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=100&auto=format&fit=crop",
      isOrg: false,
      role: "Elite CrossFit Competitor"
    },
    category: "Competitions",
    content: "Just secured my spot for the Regional Qualifiers next month! Been dialing in my nutrition and sleep via Athulation. Who else is competing in the Women's Rx division? Let's go! 😤🔥",
    timestamp: "5 hours ago",
    likes: 89,
    comments: 12,
    hasLiked: true
  },
  {
    id: "post3",
    author: {
      name: "Ironclad Barbell Club",
      avatarUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&auto=format&fit=crop",
      isOrg: true
    },
    category: "Personal Training",
    content: "Looking to break your deadlift plateau? Coach Marcus has exactly 2 open slots left for his 12-week Powerlifting Peak cycle starting Monday. DM for details or book through the Guidance tab.",
    timestamp: "1 day ago",
    likes: 56,
    comments: 4,
    hasLiked: false
  },
  {
    id: "post4",
    author: {
      name: "David Alaba",
      avatarUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop",
      isOrg: false,
      role: "Track Sprinter"
    },
    category: "Events",
    content: "Hosting a free sprint mechanics clinic this weekend at the municipal track! We'll cover block starts, drive phase, and top-end speed mechanics. All levels welcome. See you at 9 AM Saturday! ⚡️",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop",
    timestamp: "2 days ago",
    likes: 231,
    comments: 34,
    hasLiked: false
  }
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState<PostCategory>("All");
  const [posts, setPosts] = useState(mockPosts);

  const filters: { label: PostCategory; icon: any }[] = [
    { label: "All", icon: MegaphoneIcon },
    { label: "Events", icon: CalendarDateRangeIcon },
    { label: "Competitions", icon: TrophyIcon },
    { label: "Personal Training", icon: UserPlusIcon },
  ];

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          hasLiked: !post.hasLiked,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter(post => activeFilter === "All" || post.category === activeFilter);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Community</h2>
          <p className="text-slate-500 font-medium">Connect with athletes, discover events, and find training opportunities.</p>
        </div>
        <button className="bg-electric hover:bg-electric-hover text-white font-bold px-5 py-2.5 rounded-full shadow-sm shadow-electric/20 transition-all self-start md:self-auto">
          Create Post
        </button>
      </header>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Feed Column */}
        <div className="flex-1 space-y-6">
          
          {/* Filters */}
          <div className="bg-white border text-slate-800 border-slate-200 rounded-xl p-2 shadow-sm flex overflow-x-auto scrollbar-hide">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button 
                  key={filter.label}
                  onClick={() => setActiveFilter(filter.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                    activeFilter === filter.label 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeFilter === filter.label ? "text-electric" : ""}`} />
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white border text-slate-800 border-slate-200 rounded-xl shadow-sm overflow-hidden">
                
                {/* Post Header */}
                <div className="p-5 flex items-start gap-4">
                  <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900">{post.author.name}</h4>
                      {post.author.isOrg && <CheckBadgeIcon className="w-5 h-5 text-electric" title="Verified Organization" />}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{post.author.role || (post.author.isOrg ? 'Organization' : 'Athlete')} • {post.timestamp}</p>
                  </div>
                  <span className="bg-orange-50 text-orange-600 border border-orange-100 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <div className="px-5 pb-4">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </div>

                {/* Optional Image */}
                {post.imageUrl && (
                  <div className="w-full h-64 sm:h-80 md:h-96 bg-slate-100">
                    <img src={post.imageUrl} alt="Post image" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Post Actions (Likes, Comments) */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-6">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${post.hasLiked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'}`}
                  >
                    {post.hasLiked ? <HeartIcon className="w-5 h-5" /> : <HeartOutline className="w-5 h-5" />}
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-electric transition-colors">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-electric transition-colors ml-auto">
                    <ShareIcon className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
                 <p className="text-slate-500 font-medium">No posts found in this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar (Trending/Suggested) */}
        <div className="lg:w-80 space-y-6">
          
          {/* Upcoming Events Mini-card */}
          <div className="bg-white border text-slate-800 border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CalendarDateRangeIcon className="w-5 h-5 text-electric" /> Upcoming Nearby
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start border-l-2 border-orange-500 pl-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">City Marathon 2026</p>
                  <p className="text-xs text-slate-500">Sunday • 6:00 AM • Downtown</p>
                </div>
              </div>
              <div className="flex gap-3 items-start border-l-2 border-electric pl-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">CrossFit Open 26.1</p>
                  <p className="text-xs text-slate-500">Mar 24 • Global Virtual</p>
                </div>
              </div>
            </div>
            <button className="w-full text-xs font-bold text-electric hover:text-electric-hover transition-colors mt-4 text-left">
              View all events →
            </button>
          </div>
          
          {/* Top Organizations Mini-card */}
          <div className="bg-white border text-slate-800 border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckBadgeIcon className="w-5 h-5 text-electric" /> Featured Orgs
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 leading-tight">Ironclad Barbell</p>
                  <p className="text-xs text-slate-500">Powerlifting Gym</p>
                </div>
                <button className="text-xs font-bold text-electric bg-electric/10 px-2 py-1 rounded">Follow</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
