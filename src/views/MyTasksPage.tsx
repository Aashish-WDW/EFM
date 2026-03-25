'use client';
import { useState } from 'react';
import { Clock, Package, Play, SlidersHorizontal, Users, Thermometer, TrendingDown, BarChart3 } from 'lucide-react';
import { tasks } from '@/data/seed';
import horseImg1 from '@/assets/horse-task-1.jpg';
import horseImg2 from '@/assets/horse-task-2.jpg';
import horseImg3 from '@/assets/horse-task-3.jpg';

const myTasks = tasks.filter(t => t.assignedTo === 'Admin User' || t.assignedTo === 'Michael Groom' || t.assignedTo === 'Sam Vet');

const categoryMap: Record<string, string> = {
  Medical: 'PRIORITY ALPHA',
  Exercise: 'CONDITIONING',
  Inspection: 'DAILY CHECK',
  Feed: 'FEED PROTOCOL',
  Grooming: 'GROOMING',
  Maintenance: 'MAINTENANCE',
};

const taskImages = [horseImg1, horseImg2, horseImg3];

const filters = ['All Tasks', 'High Priority', 'Medication', 'Training'] as const;

const groundSupport = [
  { initials: 'MK', name: 'Marcus K.', role: 'STABLE LEAD', online: true },
  { initials: 'SL', name: 'Sarah L.', role: 'EQUINE VET', online: true },
  { initials: 'DJ', name: 'David J.', role: 'MAINTENANCE', online: false },
];

export default function MyTasksPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All Tasks');
  const [search, setSearch] = useState('');

  const filtered = myTasks.filter(t => {
    if (activeFilter === 'High Priority') return t.priority === 'Critical' || t.priority === 'High';
    if (activeFilter === 'Medication') return t.taskType === 'Medical';
    if (activeFilter === 'Training') return t.taskType === 'Exercise';
    return true;
  }).filter(t => !search || t.taskName.toLowerCase().includes(search.toLowerCase()) || t.horseName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">My Assigned Tasks</h1>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
            OBSERVED: 24 MAY 2024 &nbsp;·&nbsp; SHIFT: MORNING ALPHA
          </p>
        </div>
        <div className="w-full lg:w-auto bg-surface-container-highest rounded-xl p-4 edge-glow flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary">78%</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Operational Efficiency</p>
            <p className="text-lg font-bold text-foreground">Progress Matrix</p>
          </div>
        </div>
      </div>

      {/* Filters + Search Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shrink-0 ${
                activeFilter === f
                  ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_-3px_rgba(var(--primary-rgb),0.2)]'
                  : 'bg-surface-container-high text-muted-foreground hover:text-foreground border border-transparent hover:bg-surface-container-highest'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Filter task ID or horse name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 w-full px-4 pr-10 rounded-lg bg-surface-container-high text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
          />
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Task Cards */}
        <div className="space-y-4">
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground">No assigned tasks</div>}
          {filtered.map((task, i) => {
            const category = categoryMap[task.taskType] || task.taskType.toUpperCase();
            const img = taskImages[i % taskImages.length];
            const time = new Date(task.scheduledDatetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            const extraInfo = task.taskType === 'Medical' ? 'IV Antibiotic' :
              task.taskType === 'Exercise' ? `20 Mins` : 'Supplies Ready';

            return (
              <div key={task.id} className="bg-surface-container-high rounded-xl overflow-hidden edge-glow border border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-44 h-48 sm:h-44 shrink-0 overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={task.horseName} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-primary/30 text-primary bg-primary/10">
                          {category}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono opacity-60">ID: {task.id.toUpperCase()}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-tight">{task.taskName}</h3>
                      <p className="text-sm text-primary/90 mt-1 font-medium">{task.horseName} · {task.horseName !== 'N/A' ? `Stall ${Math.floor(Math.random() * 500)}` : 'General'}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary/60" /> {time}</span>
                        <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-primary/60" /> {extraInfo}</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button className="flex items-center gap-2 px-6 py-2 rounded-lg border border-primary/20 bg-primary/5 text-sm font-semibold text-foreground hover:bg-primary/20 hover:border-primary/40 hover:text-primary transition-all active:scale-95 shadow-lg shadow-black/10">
                        Start Task <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-4">
          {/* Shift Focus */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Shift Focus</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Vet Protocols</span>
                <span className="text-sm font-bold text-foreground">90%</span>
              </div>
              <div className="w-full h-1 rounded-full bg-surface-container-high">
                <div className="h-1 rounded-full bg-primary" style={{ width: '90%' }} />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Training Logs</span>
                <span className="text-sm font-bold text-foreground">45%</span>
              </div>
              <div className="w-full h-1 rounded-full bg-surface-container-high">
                <div className="h-1 rounded-full bg-primary" style={{ width: '45%' }} />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              <span className="text-primary font-semibold">Note:</span> Heavy traffic in Arena B scheduled for 11:00. Rescheduling "Midnight Runner" session might be required.
            </p>
          </div>

          {/* Ground Support */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Ground Support</h3>
            </div>
            <div className="space-y-3">
              {groundSupport.map(s => (
                <div key={s.initials} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {s.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-primary">{s.role}</p>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full ${s.online ? 'bg-success' : 'bg-muted-foreground/40'}`} />
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2.5 rounded-lg border border-muted-foreground/20 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors">
              Open Comms Cluster
            </button>
          </div>

          {/* Environmental Sync */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Environmental Sync</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-foreground tracking-tight">18.4°C</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> STABLE STASIS OPTIMAL
                </p>
              </div>
              <Thermometer className="w-8 h-8 text-muted-foreground/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/30 text-[10px] uppercase tracking-widest text-muted-foreground text-center sm:text-left">
        <span>© 2024 EFM Kinetic Observatory. All Rights Reserved.</span>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success" /> System Status</span>
          <span>Support</span>
        </div>
      </footer>
    </div>
  );
}
