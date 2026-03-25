'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, DollarSign, Users, Heart, TrendingUp, Activity, ArrowUpRight,
  Calendar, Filter, ChevronDown, Maximize2, Download, RefreshCw
} from 'lucide-react';
import {
  Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  Bar, BarChart, PieChart, Pie, Cell, Legend, Treemap, RadialBarChart, RadialBar
} from 'recharts';
import RandomLetterReveal from '@/components/shared/RandomLetterReveal';
import HorseIcon from '@/components/shared/HorseIcon';
import { dashboardMetrics, teamByRole, teamByDepartment, horsesByGender, transactionsByDepartment, horses, teamMembers, tasks } from '@/data/seed';

const tooltipStyle = { background: 'hsl(240 5% 10%)', border: '1px solid hsl(260 5% 18%)', borderRadius: 8, fontSize: 11, color: 'hsl(320, 30%, 97%)' };

// Animated counter hook
function useCounter(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [target, duration]);
  return val;
}

// Power BI-style KPI Tile
function KpiTile({ icon: Icon, label, value, subtitle, color, sparkData }: {
  icon: React.ElementType; label: string; value: number | string; subtitle: string; color: string;
  sparkData?: number[];
}) {
  const counterVal = useCounter(typeof value === 'number' ? value : 0);
  const numVal = typeof value === 'number' ? counterVal : value;
  return (
    <div className="bg-surface-container-highest rounded-xl p-5 edge-glow card-hover leather-grain relative overflow-hidden group">
      {/* Horse silhouette watermark */}
      <div className="absolute -right-3 -bottom-3 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
        <HorseIcon className="w-24 h-24" />
      </div>
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground relative z-10">{label}</p>
      <p className="text-3xl font-bold text-foreground mt-1 mono-data animate-count relative z-10">{numVal}</p>
      <div className="flex items-center justify-between mt-2 relative z-10">
        <p className="text-[10px] text-muted-foreground">{subtitle}</p>
        {sparkData && (
          <div className="flex items-end gap-0.5 h-4">
            {sparkData.map((v, i) => (
              <div key={i} className="w-1 rounded-t bg-primary/40" style={{ height: `${(v / Math.max(...sparkData)) * 100}%` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Filter chip
function FilterChip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
        active ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-surface-container-high text-muted-foreground border border-transparent hover:border-white/10'
      }`}
    >
      {label}
    </button>
  );
}

// Chart Card wrapper (Power BI style)
function ChartCard({ title, subtitle, children, className = '' }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-surface-container-highest rounded-xl edge-glow card-hover overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">{title}</h3>
          {subtitle && <p className="text-[9px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="px-5 pb-4">{children}</div>
    </div>
  );
}

// Trend data
const monthlyTrend = [
  { month: 'JAN', horses: 20, staff: 22, score: 78 },
  { month: 'FEB', horses: 21, staff: 23, score: 80 },
  { month: 'MAR', horses: 22, staff: 24, score: 82 },
  { month: 'APR', horses: 22, staff: 24, score: 85 },
  { month: 'MAY', horses: 23, staff: 25, score: 83 },
  { month: 'JUN', horses: 24, staff: 26, score: 87 },
];

const taskStatusData = [
  { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, fill: 'hsl(120 60% 50%)' },
  { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length, fill: 'hsl(273 100% 80%)' },
  { name: 'Pending', value: tasks.filter(t => t.status === 'Pending').length, fill: 'hsl(40 100% 60%)' },
  { name: 'Overdue', value: tasks.filter(t => t.status === 'Overdue').length, fill: 'hsl(0 70% 55%)' },
];

const horseBreedData = horses.reduce((acc, h) => {
  const existing = acc.find(a => a.name === h.color);
  if (existing) existing.value++;
  else acc.push({ name: h.color, value: 1 });
  return acc;
}, [] as { name: string; value: number }[]);

const gaugeData = [
  { name: 'Score', value: 87, fill: 'hsl(273 100% 80%)' },
];

export default function AnalysisPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Stable Ops', 'Ground Ops', 'Accounts', 'Restaurant'];

  return (
    <div className="space-y-5">
      {/* Header - Power BI style toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-0.5 bg-primary rounded" /><div className="w-3 h-0.5 bg-primary rounded" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Intelligence Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            <RandomLetterReveal text="Analysis" />
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 rounded-lg border border-border text-muted-foreground text-xs flex items-center gap-1.5 hover:text-foreground transition-colors">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
          <button className="h-8 px-3 rounded-lg border border-border text-muted-foreground text-xs flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Download className="w-3 h-3" /> Export
          </button>
        </div>
      </div>

      {/* Filter Slicer Bar (Power BI style) */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-3.5 h-3.5 text-muted-foreground" />
        {filters.map(f => (
          <FilterChip key={f} label={f} active={activeFilter === f} onClick={() => setActiveFilter(f)} />
        ))}
      </div>

      {/* KPI Tiles Row */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 stagger-children">
        <KpiTile icon={HorseIcon} label="Total Horses" value={dashboardMetrics.totalHorses} subtitle="+2 this quarter" color="bg-primary/15 text-primary" sparkData={[12, 15, 18, 20, 22, 24]} />
        <KpiTile icon={Users} label="Active Staff" value={dashboardMetrics.totalStaff} subtitle="100% checked in" color="bg-success/15 text-success" sparkData={[20, 21, 22, 24, 25, 26]} />
        <KpiTile icon={Activity} label="Task Completion" value="94%" subtitle="+5% vs last week" color="bg-primary/15 text-primary" />
        <KpiTile icon={TrendingUp} label="Operational Score" value={87} subtitle="Grade: A−" color="bg-success/15 text-success" sparkData={[78, 80, 82, 85, 83, 87]} />
      </div>

      {/* Main chart grid - Power BI tile layout */}
      <div className="grid grid-cols-12 gap-3">
        {/* Trend Area Chart - large tile */}
        <ChartCard title="Facility Growth Trend" subtitle="Monthly overview" className="col-span-12 lg:col-span-8">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="gradHorses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(273 100% 80%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(273 100% 80%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradStaff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(120 60% 50%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(120 60% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 5% 15%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(240 5% 45%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(240 5% 45%)' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="horses" stroke="hsl(273 100% 80%)" strokeWidth={2} fill="url(#gradHorses)" name="Horses" />
              <Area type="monotone" dataKey="staff" stroke="hsl(120 60% 50%)" strokeWidth={2} fill="url(#gradStaff)" name="Staff" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Operational Score Gauge */}
        <ChartCard title="Op. Score" subtitle="Current rating" className="col-span-6 lg:col-span-4">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={gaugeData} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'hsl(240 5% 12%)' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <p className="text-3xl font-bold text-primary mono-data">87</p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">/ 100</p>
            </div>
          </div>
        </ChartCard>

        {/* Staff by Role */}
        <ChartCard title="Staff by Role" subtitle="Distribution" className="col-span-12 lg:col-span-6">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={teamByRole.filter(r => r.count > 0).slice(0, 10)} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(240 5% 45%)' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="role" type="category" width={100} tick={{ fontSize: 9, fill: 'hsl(240 5% 55%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>
                {teamByRole.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Task Status Donut */}
        <ChartCard title="Task Status" subtitle="Current breakdown" className="col-span-6 lg:col-span-3">
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={taskStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} strokeWidth={0}>
                  {taskStatusData.map((_, i) => <Cell key={i} fill={taskStatusData[i].fill} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{tasks.length}</p>
                <p className="text-[8px] uppercase tracking-widest text-primary">Tasks</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-1 justify-center">
            {taskStatusData.map(s => (
              <span key={s.name} className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.fill }} /> {s.name}
              </span>
            ))}
          </div>
        </ChartCard>

        {/* Horse Coat Colors */}
        <ChartCard title="Horses by Coat" subtitle="Color distribution" className="col-span-6 lg:col-span-3">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={horseBreedData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} strokeWidth={0}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {horseBreedData.map((_, i) => {
                  const colors = ['hsl(30 60% 45%)', 'hsl(0 0% 45%)', 'hsl(25 70% 40%)', 'hsl(0 0% 15%)'];
                  return <Cell key={i} fill={colors[i % colors.length]} />;
                })}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Allocation */}
        <ChartCard title="Department Allocation" subtitle="Team distribution" className="col-span-12 lg:col-span-6">
          <div className="relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={teamByDepartment} dataKey="value" nameKey="name" cx="35%" cy="50%" innerRadius={55} outerRadius={85} strokeWidth={0}>
                  {teamByDepartment.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" iconSize={8}
                  formatter={(value) => {
                    const item = teamByDepartment.find(d => d.name === value);
                    const total = teamByDepartment.reduce((s, d) => s + d.value, 0);
                    const pct = item ? Math.round((item.value / total) * 100) : 0;
                    return <span className="text-[10px] text-muted-foreground ml-1">{pct}% {value}</span>;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute left-[35%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-xl font-bold text-foreground">{teamMembers.length}</p>
              <p className="text-[8px] uppercase tracking-[0.12em] text-primary">Staff</p>
            </div>
          </div>
        </ChartCard>

        {/* Financial Summary */}
        <ChartCard title="Financial Overview" subtitle="Revenue & expenses" className="col-span-12 lg:col-span-6">
          <div className="space-y-3 mt-2">
            {transactionsByDepartment.map((dept, i) => {
              const max = Math.max(...transactionsByDepartment.map(d => d.value));
              const pct = (dept.value / max) * 100;
              const colors = ['hsl(273 100% 80%)', 'hsl(120 60% 50%)', 'hsl(200 80% 55%)', 'hsl(40 100% 60%)', 'hsl(340 90% 60%)'];
              return (
                <div key={dept.department}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{dept.department}</span>
                    <span className="text-xs font-mono text-foreground">₹{dept.value.toLocaleString()}.00</span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: colors[i % colors.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>

      {/* Horses by Gender - bottom wide tile */}
      <ChartCard title="Horse Inventory by Gender" subtitle="Stallions vs Mares">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={horsesByGender} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} strokeWidth={0}>
                {horsesByGender.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center">
            <div className="space-y-3 w-full">
              {horsesByGender.map(g => (
                <div key={g.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{g.name}s</span>
                    <span className="text-sm font-bold mono-data" style={{ color: g.fill }}>{g.value}</span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(g.value / horses.length) * 100}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: g.fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
