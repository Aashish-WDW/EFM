'use client';
import { dailyRegister } from '@/data/seed';
import StatusBadge from '@/components/shared/StatusBadge';
import { Search, SlidersHorizontal, X, ClipboardCheck, UserCheck, UserX, Clock } from 'lucide-react';
import { useState, useMemo } from 'react';
import HorseIcon from '@/components/shared/HorseIcon';
import SelectField from '@/components/shared/SelectField';
import ExportDialog from '@/components/shared/ExportDialog';

export default function DailyRegisterPage() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = useMemo(() => dailyRegister.filter(d => {
    if (search && !d.groomName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus && d.status !== filterStatus) return false;
    return true;
  }), [search, filterStatus]);

  const checkedIn = dailyRegister.filter(d => d.status === 'Checked In').length;
  const checkedOut = dailyRegister.filter(d => d.status === 'Checked Out').length;
  const absent = dailyRegister.filter(d => d.status === 'Absent').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Daily Register</h1>
          <p className="text-sm text-muted-foreground mt-1">Groom check-in and check-out records</p>
        </div>
        <ExportDialog filename="daily-register" trigger={
          <button className="h-9 px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors self-start sm:self-auto shrink-0">
            Export CSV
          </button>
        } />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden group">
          <HorseIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity -rotate-12" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total Grooms</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><ClipboardCheck className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(dailyRegister.length).padStart(2, '0')}</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden group">
          <HorseIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity -rotate-12" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Checked In</span>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center"><UserCheck className="w-4 h-4 text-success" /></div>
          </div>
          <p className="text-3xl font-bold text-success">{String(checkedIn).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-success mt-1">Active Now</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden group">
          <HorseIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity -rotate-12" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Checked Out</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Clock className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(checkedOut).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-1">Shift Complete</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden group">
          <HorseIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity -rotate-12" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Absent</span>
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center"><UserX className="w-4 h-4 text-destructive" /></div>
          </div>
          <p className="text-3xl font-bold text-destructive">{String(absent).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-destructive mt-1">Requires Attention</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groom..." className="w-full h-9 pl-10 pr-8 rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>}
        </div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`h-9 px-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${showFilters || filterStatus ? 'bg-primary/15 text-primary border border-primary/30' : 'bg-surface-container-high text-muted-foreground hover:text-foreground'}`}
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {filterStatus && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3 items-end px-4 py-3 bg-surface-container-highest rounded-xl border border-border/50">
          <div className="w-44">
            <SelectField label="STATUS" options={['All', 'Checked In', 'Checked Out', 'Absent']} value={filterStatus || 'All'} size="sm" onChange={(v: string) => setFilterStatus(v === 'All' ? '' : v)} />
          </div>
          {filterStatus && (
            <button onClick={() => setFilterStatus('')} className="h-9 px-3 rounded-lg text-xs text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors flex items-center gap-1.5">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      )}

      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[440px]">
          <thead>
            <tr className="bg-surface-container-high">
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Groom</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Check In</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Check Out</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} className="border-t border-border/50 hover:bg-surface-container-high/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{d.date}</td>
                <td className="px-4 py-3 font-medium text-foreground">{d.groomName}</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{d.checkInTime}</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{d.checkOutTime || <span className="text-success">Active</span>}</td>
                <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">No records match your filters.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
