import { useState } from 'react';
import { TIMETABLE_DAYS, type TimetableSession } from '../data/gymContent';

interface TimetableSectionProps {
  sessions: TimetableSession[];
}

type DayFilter = 'All Days' | TimetableSession['day'];

export function TimetableSection({ sessions }: TimetableSectionProps) {
  const [selectedDay, setSelectedDay] = useState<DayFilter>('All Days');

  const filterTabs: DayFilter[] = ['All Days', ...TIMETABLE_DAYS];

  const daysToRender =
    selectedDay === 'All Days' ? TIMETABLE_DAYS : TIMETABLE_DAYS.filter((d) => d === selectedDay);

  return (
    <div className="space-y-8">
      {/* Functional Day Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter class schedule by day"
        className="flex flex-wrap gap-2 border-b border-white/10 pb-5"
      >
        {filterTabs.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedDay(day)}
              className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#C8F135] text-[#090A0C]'
                  : 'border border-white/15 bg-[#121418] text-[#A1A7B3] hover:border-white/30 hover:text-[#F4F5F7]'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Static Weekly Timetable Grid */}
      <div className="space-y-8">
        {daysToRender.map((day) => {
          const daySessions = sessions.filter((s) => s.day === day);
          return (
            <div key={day} className="border border-white/10 bg-[#121418]">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#181B20] px-5 py-3.5">
                <h3 className="font-display text-xl font-bold tracking-tight text-[#F4F5F7]">
                  {day}
                </h3>
                <span className="text-xs text-[#A1A7B3] tabular-nums">
                  {daySessions.length} {daySessions.length === 1 ? 'Session' : 'Sessions'}
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {daySessions.map((session) => (
                  <div
                    key={session.id}
                    className="grid gap-3 px-5 py-4 sm:grid-cols-12 sm:items-center sm:gap-4"
                  >
                    <div className="font-mono text-sm font-medium text-[#C8F135] tabular-nums sm:col-span-3">
                      {session.time}
                    </div>
                    <div className="sm:col-span-5">
                      <p className="text-base font-semibold text-[#F4F5F7]">{session.className}</p>
                      <p className="mt-0.5 text-xs text-[#A1A7B3]">
                        {session.category} · {session.duration}
                      </p>
                    </div>
                    <div className="text-sm text-[#A1A7B3] sm:col-span-4 sm:text-right">
                      Coach: <span className="text-[#F4F5F7]">{session.trainer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
