"use client";

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Week 1", volume: 12000 },
  { name: "Week 2", volume: 13500 },
  { name: "Week 3", volume: 14200 },
  { name: "Week 4", volume: 13800 },
  { name: "Week 5", volume: 15600 },
  { name: "Week 6", volume: 17100 },
];

export default function ProgressChart() {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 h-96 flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Volume Progression</h3>
          <p className="text-sm text-slate-500 font-medium">Total weight lifted over 6 weeks</p>
        </div>
        <div className="bg-electric-dim text-electric px-3 py-1 rounded-full text-sm font-bold">
          Lifting
        </div>
      </div>
      
      <div className="flex-1 min-h-0 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#ffffff", 
                borderColor: "#e2e8f0", 
                borderRadius: "8px", 
                color: "#0f172a",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
              itemStyle={{ color: "#FF5722", fontWeight: "bold" }}
              labelStyle={{ color: "#64748b", fontWeight: "600", marginBottom: "4px" }}
            />
            <Line 
              type="monotone" 
              dataKey="volume" 
              stroke="#FF5722" 
              strokeWidth={4}
              dot={{ fill: "#ffffff", stroke: "#FF5722", strokeWidth: 3, r: 5 }}
              activeDot={{ r: 8, fill: "#FF5722", stroke: "#ffffff", strokeWidth: 3 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
