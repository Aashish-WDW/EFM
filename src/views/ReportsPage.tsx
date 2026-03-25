'use client';
import { BarChart3, DollarSign, Users, Heart, ArrowUpRight, Download, TrendingUp, MoreHorizontal, FileText, Search, Calendar } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart } from 'recharts';

const trendData = [
  { month: 'JAN_24', optimal: 60, actual: 55 },
  { month: 'FEB_24', optimal: 62, actual: 58 },
  { month: 'MAR_24', optimal: 65, actual: 70 },
  { month: 'APR_24', optimal: 68, actual: 82 },
  { month: 'MAY_24', optimal: 70, actual: 75 },
  { month: 'JUN_24', optimal: 72, actual: 68 },
  { month: 'JUL_24', optimal: 74, actual: 72 },
];

const barData = [
  { name: 'STAFFING', value: 45 },
  { name: 'MAINTENANCE', value: 30 },
  { name: 'FEED', value: 55 },
  { name: 'MEDICAL', value: 25 },
  { name: 'LOGISTICS', value: 35 },
];

const reportCategories = [
  { icon: Users, label: 'ATTENDANCE', desc: 'Shift clock-ins, biometric logs, and crew availability matrix.', color: 'bg-primary/10 text-primary' },
  { icon: FileText, label: 'TASK REPORTS', desc: 'Completion rates, milestone tracking, and operational bottlenecks.', color: 'bg-secondary/10 text-secondary' },
  { icon: DollarSign, label: 'EXPENSE REPORTS', desc: 'Stable procurement, maintenance costs, and payroll distribution.', color: 'bg-destructive/10 text-destructive' },
  { icon: Heart, label: 'HORSE HEALTH', desc: 'Vetting history, nutrition tracking, and health risk scoring.', color: 'bg-success/10 text-success' },
];

const recentExports = [
  { name: 'Q3_Financial_Summary.xlsx', by: 'SYS_ADMIN_01', time: '14:20 UTC', icon: 'bg-primary/15 text-primary' },
  { name: 'Daily_Logistics_Matrix.csv', by: 'AUTO_OBSERVER', time: '09:12 UTC', icon: 'bg-success/15 text-success' },
  { name: 'Biosecurity_Audit_Final.xlsx', by: 'VET_MODULE', time: 'YESTERDAY', icon: 'bg-destructive/15 text-destructive' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="label-sm text-muted-foreground text-[10px] truncate uppercase tracking-widest">
            Organization &gt; Analytics &gt; <span className="text-primary">Reports Module</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mt-1">ANALYTICAL REPORTS</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg">System-wide performance matrices and multi-vector data exports.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 px-3 sm:px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors bg-surface-container-high/40">
            <Calendar className="w-4 h-4 text-primary" /> <span className="hidden sm:inline">DATE RANGE</span>
          </button>
          <div className="flex border border-border rounded-lg overflow-hidden h-9">
            <button className="px-3 sm:px-4 text-foreground text-xs font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2 border-r border-border uppercase tracking-wider">
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
            <button className="px-3 sm:px-4 text-foreground text-xs font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2 uppercase tracking-wider">
              EXCEL
            </button>
          </div>
        </div>
      </div>

      {/* Report Category Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {reportCategories.map(cat => (
          <div key={cat.label} className="bg-surface-container-highest rounded-lg p-5 edge-glow hover:glow-primary transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${cat.color} flex items-center justify-center`}>
                <cat.icon className="w-4 h-4" />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); alert(`Downloading ${cat.label} report...`); }}
                  className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border/50"
                  title="Download Report"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <h3 className="font-bold text-foreground text-sm mb-1">{cat.label}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Performance Matrix + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="label-sm text-primary mb-1">PERFORMANCE MATRIX</p>
              <h2 className="heading-md text-foreground">System-wide Efficiency Trend</h2>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> OPTIMAL FLOW</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> ACTUAL DELTA</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(273,100%,80%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(273,100%,80%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,5%,18%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(240,5%,50%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(240,5%,50%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(240,5%,8%)', border: '1px solid hsl(260,5%,18%)', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="optimal" stroke="hsl(240,5%,50%)" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              <Area type="monotone" dataKey="actual" stroke="hsl(273,100%,80%)" strokeWidth={2} fill="url(#gradPrimary)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow border-l-2 border-primary">
            <p className="label-sm text-muted-foreground">TOTAL MANAGED UNITS</p>
            <p className="text-3xl font-bold text-foreground mono-data mt-2">1,284</p>
            <p className="text-xs text-success mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12.4% VARIANCE</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow border-l-2 border-success">
            <p className="label-sm text-muted-foreground">OPERATIONAL UPTIME</p>
            <p className="text-3xl font-bold text-foreground mono-data mt-2">99.98%</p>
            <p className="text-xs text-success mt-2 flex items-center gap-1">🟢 SYSTEM CERTIFIED</p>
          </div>
        </div>
      </div>

      {/* Resource Allocation + Recent Exports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex items-center justify-between mb-4">
            <p className="label-sm text-primary tracking-widest">RESOURCE ALLOCATION (MONTHLY)</p>
            <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(260,5%,18%)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'hsl(240,5%,50%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(240,5%,50%)' }} axisLine={false} tickLine={false} />
              <Bar dataKey="value" fill="hsl(273,100%,80%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="heading-md text-foreground uppercase tracking-wider text-sm">Recent Export Activity</h3>
            <span className="text-[10px] text-muted-foreground bg-surface-container-high px-2 py-1 rounded">Last 24 Hours</span>
          </div>
          <div className="space-y-3">
            {recentExports.map((exp, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className={`w-8 h-8 rounded-lg ${exp.icon} flex items-center justify-center shrink-0`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{exp.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">BY: {exp.by} • {exp.time}</p>
                </div>
                <button className="text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
