import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  DayAdherenceRecord,
  formatFriendlyDate,
} from '../utils/medicationLogStorage';
import {
  Activity,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Info,
} from 'lucide-react';

interface AdherenceHistoryChartProps {
  records: DayAdherenceRecord[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  onSeedDemoHistory?: () => void;
}

export const AdherenceHistoryChart: React.FC<AdherenceHistoryChartProps> = ({
  records,
  selectedDate,
  onSelectDate,
  onSeedDemoHistory,
}) => {
  // Aggregate statistics for the 7 days
  const summary = useMemo(() => {
    const validDays = records.filter((r) => r.totalScheduled > 0);
    if (validDays.length === 0) {
      return {
        avgAdherence: 0,
        perfectDays: 0,
        totalTaken: 0,
        totalScheduled: 0,
        hasHistory: false,
      };
    }

    const totalScheduled = validDays.reduce((acc, r) => acc + r.totalScheduled, 0);
    const totalTaken = validDays.reduce((acc, r) => acc + r.scheduledTaken, 0);
    const avgAdherence =
      totalScheduled > 0 ? Math.round((totalTaken / totalScheduled) * 100) : 0;
    const perfectDays = validDays.filter((r) => r.adherencePercentage === 100).length;
    const hasHistory = records.some(
      (r) => !r.isToday && r.scheduledTaken > 0
    );

    return {
      avgAdherence,
      perfectDays,
      totalTaken,
      totalScheduled,
      hasHistory,
    };
  }, [records]);

  // Color selection helper based on adherence percentage
  const getBarColor = (item: DayAdherenceRecord) => {
    if (item.totalScheduled === 0) return '#e2e8f0'; // no scheduled doses
    if (item.adherencePercentage === 100) return '#10b981'; // emerald-500
    if (item.adherencePercentage >= 75) return '#0284c7'; // sky-600
    if (item.adherencePercentage >= 50) return '#38bdf8'; // sky-400
    if (item.adherencePercentage > 0) return '#f59e0b'; // amber-500
    return '#cbd5e1'; // slate-300 (0%)
  };

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const data: DayAdherenceRecord = payload[0].payload;

    return (
      <div className="p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 text-xs z-50 min-w-[170px]">
        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-100">
          <span className="font-bold text-slate-800">
            {data.dayLabel} ({data.formattedDate})
          </span>
          {data.isToday && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-800">
              Today
            </span>
          )}
        </div>

        {data.totalScheduled === 0 ? (
          <p className="text-slate-500 italic text-[11px]">No scheduled doses</p>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Adherence:</span>
              <span
                className={`font-black text-xs ${
                  data.adherencePercentage === 100
                    ? 'text-emerald-700'
                    : data.adherencePercentage >= 75
                    ? 'text-sky-700'
                    : 'text-amber-700'
                }`}
              >
                {data.adherencePercentage}%
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Doses Taken:</span>
              <span className="font-semibold text-slate-800">
                {data.scheduledTaken} / {data.totalScheduled}
              </span>
            </div>

            {data.sosCount > 0 && (
              <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-100 text-[10px]">
                <span className="text-slate-400">SOS Doses:</span>
                <span className="font-semibold text-sky-700">+{data.sosCount} logged</span>
              </div>
            )}
          </div>
        )}

        <p className="mt-2 text-[10px] text-sky-700 font-medium text-center">
          Click bar to view day
        </p>
      </div>
    );
  };

  return (
    <div
      id="historical-adherence-chart-card"
      className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs transition-all"
    >
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                7-Day Adherence Trend
              </h2>
              <p className="text-[11px] text-slate-500">
                Daily completion rate (taken vs. scheduled doses) over the past week
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
            <span className="text-slate-500 text-[11px]">7-Day Avg:</span>
            <span
              className={`font-black ${
                summary.avgAdherence >= 80
                  ? 'text-emerald-700'
                  : summary.avgAdherence >= 50
                  ? 'text-sky-700'
                  : 'text-amber-700'
              }`}
            >
              {summary.avgAdherence}%
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-[11px]">
              {summary.perfectDays}/7 Days at 100%
            </span>
          </div>

          {onSeedDemoHistory && !summary.hasHistory && (
            <button
              type="button"
              id="seed-demo-history-btn"
              onClick={onSeedDemoHistory}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
              title="Populate past week with realistic demo adherence data to preview the full trend"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Simulate Past Week</span>
            </button>
          )}
        </div>
      </div>

      {/* Chart Visual Canvas */}
      <div className="mt-4 pt-2">
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={records}
              margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="dayLabel"
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
                tick={(props) => {
                  const { x, y, payload } = props;
                  const record = records.find((r) => r.dayLabel === payload.value);
                  const isSelected = record && record.date === selectedDate;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={14}
                        textAnchor="middle"
                        fill={isSelected ? '#0369a1' : '#64748b'}
                        fontSize={11}
                        fontWeight={isSelected ? 700 : 500}
                      >
                        {payload.value}
                      </text>
                    </g>
                  );
                }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                unit="%"
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
                tick={{ fill: '#64748b', fontSize: 10 }}
              />
              <ReferenceLine
                y={100}
                stroke="#10b981"
                strokeDasharray="4 4"
                strokeOpacity={0.6}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar
                dataKey="adherencePercentage"
                radius={[6, 6, 0, 0]}
                maxBarSize={44}
                className="cursor-pointer"
                onClick={(data: any) => {
                  if (data && data.date) {
                    onSelectDate(data.date);
                  }
                }}
              >
                {records.map((entry) => {
                  const isSelected = entry.date === selectedDate;
                  const color = getBarColor(entry);
                  return (
                    <Cell
                      key={`cell-${entry.date}`}
                      fill={color}
                      stroke={isSelected ? '#0369a1' : undefined}
                      strokeWidth={isSelected ? 2.5 : 0}
                      className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                      onClick={() => onSelectDate(entry.date)}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend & Interactive Day Strip */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-500">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-slate-700">Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
              <span>100% Target Met</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-sky-600" />
              <span>75-99%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-sky-400" />
              <span>50-74%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
              <span>&lt; 50%</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Click any bar to inspect doses for that day</span>
          </div>
        </div>
      </div>
    </div>
  );
};
