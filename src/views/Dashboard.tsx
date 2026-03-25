'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Users, ClipboardList, ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import MetricCard from '@/components/shared/MetricCard';
import { dashboardMetrics, teamByRole, teamByDepartment, horsesByGender, transactionsByDepartment } from '@/data/seed';

import RandomLetterReveal from '@/components/shared/RandomLetterReveal';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const tooltipStyle = { background: 'hsl(270, 3%, 15%)', border: 'none', borderRadius: 8, fontSize: 12, color: 'hsl(320, 30%, 97%)' };

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
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow particle-field card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Items by Role</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={teamByRole} margin={{ bottom: 20 }}>
              <XAxis dataKey="role" tick={{ fontSize: 10, fill: 'hsl(240, 5%, 40%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(240, 5%, 40%)' }} axisLine={false} tickLine={false} width={25} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {teamByRole.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow particle-field card-hover">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">Items by Department</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={teamByDepartment} dataKey="value" nameKey="name" cx="40%" cy="50%" innerRadius={60} outerRadius={95} strokeWidth={0}>
                  {teamByDepartment.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" iconSize={8}
                  formatter={(value) => {
                    const item = teamByDepartment.find(d => d.name === value);
                    const total = teamByDepartment.reduce((s, d) => s + d.value, 0);
                    const pct = item ? Math.round((item.value / total) * 100) : 0;
                    return <span className="text-xs text-muted-foreground ml-1">{pct}% {value}</span>;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-foreground leading-none">100%</p>
              <p className="text-[9px] uppercase tracking-[0.12em] text-primary mt-0.5">Allocation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow card-hover">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">Horses by Gender</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={horsesByGender} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={0}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                {horsesByGender.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

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
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{dept.department}</span>
                    <span className="text-xs font-mono text-foreground">₹{dept.value.toLocaleString()}.00</span>
                  </div>
                  <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: color }} />
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
