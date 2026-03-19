"use client";

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays } from 'date-fns';

// Helper to generate some mock data for the heatmap
const generateMockData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 180; i++) {
    // Random chance to have a workout today
    if (Math.random() > 0.4) {
      data.push({
        date: subDays(today, i),
        count: Math.floor(Math.random() * 4) + 1 // Intensity 1-4
      });
    }
  }
  return data;
};

export default function ActivityHeatmap() {
  const endDate = new Date();
  const startDate = subDays(endDate, 180); // 6 months back
  const data = generateMockData();

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Training Streak</h3>
          <p className="text-sm text-slate-500 font-medium">Activity over the last 6 months</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
          <div className="w-3 h-3 rounded-sm bg-orange-200"></div>
          <div className="w-3 h-3 rounded-sm bg-orange-400"></div>
          <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
          <div className="w-3 h-3 rounded-sm bg-electric"></div>
          <span>More</span>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-[700px]">
          <style dangerouslySetInnerHTML={{__html: `
            .react-calendar-heatmap text {
              font-size: 8px;
              fill: #64748b;
            }
            .react-calendar-heatmap rect {
              rx: 2px;
              ry: 2px;
            }
            .color-empty { fill: #f1f5f9; }
            .color-scale-1 { fill: #ffedd5; }
            .color-scale-2 { fill: #fdba74; }
            .color-scale-3 { fill: #f97316; }
            .color-scale-4 { fill: #FF5722; }
          `}} />
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={data}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
            showWeekdayLabels={true}
          />
        </div>
      </div>
    </div>
  );
}
