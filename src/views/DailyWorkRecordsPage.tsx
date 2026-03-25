'use client';
import { useState, useMemo } from 'react';
import { workRecords } from '@/data/seed';
import { Search, SlidersHorizontal, X, Users, ListChecks, Clock, TrendingUp } from 'lucide-react';
import HorseIcon from '@/components/shared/HorseIcon';
import SelectField from '@/components/shared/SelectField';
import ExportDialog from '@/components/shared/ExportDialog';

const uniqueCategories = [...new Set(workRecords.map(w => w.staffCategory))];

export default function DailyWorkRecordsPage() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');

  const totalHours = workRecords.reduce((sum, wr) => sum + wr.entries.reduce((s, e) => s + e.totalHours, 0), 0);
  const totalTasks = workRecords.reduce((s, w) => s + w.entries.length, 0);
  const avgHours = (totalHours / workRecords.length).toFixed(1);

  const filtered = useMemo(() => workRecords.filter(w => {
    if (search && !w.staffName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory && w.staffCategory !== filterCategory) return false;
    return true;
  }), [search, filterCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Daily Work Records</h1>
          <p className="text-sm text-muted-foreground mt-1">Consolidated view of all daily work</p>
        </div>
        <ExportDialog filename="daily-work-records" trigger={
          <button className="h-9 px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors self-start sm:self-auto shrink-0">
            Export CSV
          </button>
        } />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden group">
          <HorseIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity -rotate-12" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Staff Today</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Users className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(workRecords.length).padStart(2, '0')}</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden group">
          <HorseIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity -rotate-12" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total Tasks</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><ListChecks className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(totalTasks).padStart(2, '0')}</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden group">
          <HorseIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity -rotate-12" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total Hours</span>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center"><Clock className="w-4 h-4 text-success" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalHours}<span className="text-lg text-muted-foreground ml-1">hrs</span></p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden group">
          <HorseIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity -rotate-12" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Avg Hours/Staff</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{avgHours}<span className="text-lg text-muted-foreground ml-1">hrs</span></p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff..." className="w-full h-9 pl-10 pr-8 rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>}
        </div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`h-9 px-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${showFilters || filterCategory ? 'bg-primary/15 text-primary border border-primary/30' : 'bg-surface-container-high text-muted-foreground hover:text-foreground'}`}
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {filterCategory && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3 items-end px-4 py-3 bg-surface-container-highest rounded-xl border border-border/50">
          <div className="w-48">
            <SelectField label="CATEGORY" options={['All', ...uniqueCategories]} value={filterCategory || 'All'} size="sm" onChange={(v: string) => setFilterCategory(v === 'All' ? '' : v)} />
          </div>
          {filterCategory && (
            <button onClick={() => setFilterCategory('')} className="h-9 px-3 rounded-lg text-xs text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors flex items-center gap-1.5">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      )}

      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[550px]">
          <thead>
            <tr className="bg-surface-container-high">
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Staff</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Tasks</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Hours</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Efficiency</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(wr => {
              const hrs = wr.entries.reduce((s, e) => s + e.totalHours, 0);
              const eff = Math.min(100, Math.round((hrs / 8) * 100));
              return (
                <tr key={wr.id} className="border-t border-border/50 hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{wr.staffName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{wr.staffCategory}</td>
                  <td className="px-4 py-3 font-mono text-xs">{wr.entries.length}</td>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{hrs}h</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden max-w-[80px]">
                        <div className={`h-full rounded-full ${eff >= 80 ? 'bg-success' : eff >= 50 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${eff}%` }} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{eff}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{wr.overallRemarks || '-'}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">No records match your filters.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
