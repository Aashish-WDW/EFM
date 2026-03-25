'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Users, ClipboardList, ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import MetricCard from '@/components/shared/MetricCard';
import { dashboardMetrics, teamByRole, teamByDepartment, horsesByGender, transactionsByDepartment } from '@/data/seed';
import RandomLetterReveal from '@/components/shared/RandomLetterReveal';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const tooltipStyle = {
  background: 'hsl(270, 3%, 15%)',
  border: '1px solid hsl(260, 5%, 22%)',
  borderRadius: 8,
  fontSize: 12,
  color: 'hsl(320, 30%, 97%)',
  padding: '8px 12px',
};

// Shortened role labels for the bar chart
const roleAbbrev: Record<string, string> = {
  'Guard': 'Guard',
  'Groom': 'Groom',
  'Gardener': 'Garden.',
  'Housekeeping': 'H/K',
  'Electrician': 'Electr.',
  'Ground Supervisor': 'Grd.Sup',
  'Riding Boy': 'Riding',
  'Rider': 'Rider',
  'Instructor': 'Instr.',
  'Farrier': 'Farrier',
  'Jamedar': 'Jamedar',
  'Stable Manager': 'St.Mgr',
  'Executive Accounts': 'Ex.Acc',
  'Executive Admin': 'Ex.Adm',
  'Restaurant Manager': 'Rest.Mgr',
  'Kitchen Helper': 'Kit.Hlp',
  'Waiter': 'Waiter',
  'Director': 'Director',
  'Super Admin': 'S.Admin',
  'Veterinarian': 'Vet',
  'Chef': 'Chef',
  'Accountant': 'Acct.',
  'Maintenance': 'Maint.',
  'Kitchen Staff': 'Kit.Stf',
  'Driver': 'Driver',
  'Senior Executive Admin': 'Sr.Adm',
};

const roleChartData = teamByRole.map(r => ({
  ...r,
  shortRole: roleAbbrev[r.role] ?? r.role.slice(0, 7),
}));

function CustomBarLabel({ x, y, width, value }: { x?: number; y?: number; width?: number; value?: number }) {
  if (!value || value === 0) return null;
  return (
    <text x={(x ?? 0) + (width ?? 0) / 2} y={(y ?? 0) - 4} textAnchor="middle" fontSize={9} fill="hsl(240,5%,55%)" fontWeight={600}>
      {value}
    </text>
  );
}

export default function Dashboard() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();

  const [clock, setClock] = useState('');
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <div className="shimmer-border rounded-xl p-5 bg-surface-container-highest">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight hover-glow-text">
          <RandomLetterReveal text={`${greeting}, Admin User`} />
        </h1>
        <p className="text-xs text-muted-foreground mt-1 tracking-wide font-mono">
          {dateStr} — <span className="text-primary font-semibold">{clock}</span> — <span className="text-primary">SYSTEM STATUS: OPTIMAL</span>
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <MetricCard icon={Package} title="Total Horses" value={dashboardMetrics.totalHorses} subtitle="Registered Assets" subtitleColor="destructive" />
        <MetricCard icon={Users} title="Total Staff / Users" value={dashboardMetrics.totalStaff} subtitle="Active Sessions" subtitleColor="primary" />
        <MetricCard icon={ClipboardList} title="Pending Tasks" value={dashboardMetrics.pendingTasks} subtitle="Queue Clear" subtitleColor="destructive" variant="success" />
        <MetricCard icon={ShieldAlert} title="Audit Logs / Issues" value={dashboardMetrics.auditLogs} subtitle="No Critical Vulnerabilities" subtitleColor="destructive" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Items by Role - Bar Chart */}
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow particle-field card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Staff by Role</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={roleChartData}
              margin={{ top: 16, right: 8, left: 0, bottom: 60 }}
              barCategoryGap="30%"
            >
              <XAxis
                dataKey="shortRole"
                tick={{ fontSize: 9, fill: 'hsl(240, 5%, 50%)', fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-40}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'hsl(240, 5%, 45%)' }}
                axisLine={false}
                tickLine={false}
                width={22}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, _name, props) => [value, props.payload?.role ?? 'Count']}
                cursor={{ fill: 'hsl(240,5%,20%)', radius: 4 }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} label={<CustomBarLabel />}>
                {roleChartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Items by Department - Donut */}
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow particle-field card-hover">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">Staff by Department</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative shrink-0" style={{ width: 180, height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={teamByDepartment}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="hsl(240,5%,10%)"
                  >
                    {teamByDepartment.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold text-foreground leading-none">100%</p>
                <p className="text-[9px] uppercase tracking-[0.12em] text-primary mt-0.5">Allocated</p>
              </div>
            </div>
            <div className="flex-1 space-y-2 w-full">
              {teamByDepartment.map(d => {
                const total = teamByDepartment.reduce((s, x) => s + x.value, 0);
                const pct = Math.round((d.value / total) * 100);
                return (
                  <div key={d.name}>
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.fill }} />
                        <span className="text-[11px] text-foreground font-medium truncate max-w-[110px]">{d.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground ml-2 shrink-0">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-container overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: d.fill }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Horses by Gender */}
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow card-hover">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">Horses by Gender</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative shrink-0" style={{ width: 160, height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={horsesByGender}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={68}
                    strokeWidth={2}
                    stroke="hsl(240,5%,10%)"
                  >
                    {horsesByGender.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 w-full">
              {horsesByGender.map(g => (
                <div key={g.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: g.fill }} />
                      <span className="text-sm font-medium text-foreground">{g.name}s</span>
                    </div>
                    <span className="text-sm font-bold mono-data" style={{ color: g.fill }}>{g.value}</span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(g.value / horsesByGender.reduce((s, x) => s + x.value, 0)) * 100}%` }}
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

        {/* Transactions by Department */}
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow card-hover">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">Transactions by Department</h3>
          <div className="space-y-3">
            {transactionsByDepartment.map((dept, i) => {
              const max = Math.max(...transactionsByDepartment.map(d => d.value));
              const pct = (dept.value / max) * 100;
              const color = teamByDepartment[i]?.fill || 'hsl(273, 100%, 80%)';
              return (
                <div key={dept.department}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{dept.department}</span>
                    <span className="text-xs font-mono text-foreground">₹{dept.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
