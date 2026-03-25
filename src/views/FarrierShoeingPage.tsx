'use client';
import { useState, useMemo } from 'react';
import { farrierShoeings } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Hammer, AlertTriangle, CheckCircle, Calendar, SlidersHorizontal, Search, X, Plus } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';
import ExportDialog from '@/components/shared/ExportDialog';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function AddShoeingForm() {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="HORSE" options={['Thunder', 'Storm', 'Blaze', 'Midnight', 'Shadow', 'Spirit']} placeholder="Select Horse..." />
        <div>
          <label className={lbl}>FARRIER</label>
          <input type="text" placeholder="e.g. Mike Farrier" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <DatePicker label="SCHEDULED DATE" />
        <SelectField label="STATUS" options={['Scheduled', 'Completed', 'Overdue']} defaultValue="Scheduled" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="SHOE TYPE" options={['Standard Steel', 'Aluminum', 'Rubber', 'Therapeutic']} defaultValue="Standard Steel" />
        <SelectField label="HOOF CONDITION" options={['Good', 'Fair', 'Poor']} defaultValue="Good" />
      </div>
      <div>
        <label className={lbl}>NOTES</label>
        <input type="text" placeholder="Optional notes..." className={inp} />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Add Record</button>
    </div>
  );
}

const uniqueFarriers = [...new Set(farrierShoeings.map(f => f.farrierName))];

export default function FarrierShoeingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFarrier, setFilterFarrier] = useState('');
  const perPage = 5;

  const filtered = useMemo(() => farrierShoeings.filter(f => {
    if (search && !f.horseName.toLowerCase().includes(search.toLowerCase()) && !f.farrierName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus && f.status !== filterStatus) return false;
    if (filterFarrier && f.farrierName !== filterFarrier) return false;
    return true;
  }), [search, filterStatus, filterFarrier]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const completedCount = farrierShoeings.filter(f => f.status === 'Completed').length;
  const overdueCount = farrierShoeings.filter(f => f.status === 'Overdue').length;
  const scheduledCount = farrierShoeings.filter(f => f.status === 'Scheduled').length;

  const hasActiveFilters = filterStatus || filterFarrier;
  const clearFilters = () => { setFilterStatus(''); setFilterFarrier(''); };

  const kpis = [
    { label: 'TOTAL RECORDS', value: farrierShoeings.length, sub: 'All shoeing entries', subColor: 'text-muted-foreground', icon: Hammer },
    { label: 'COMPLETED', value: String(completedCount).padStart(2, '0'), sub: 'Successfully shoed', subColor: 'text-success', icon: CheckCircle },
    { label: 'OVERDUE', value: String(overdueCount).padStart(2, '0'), sub: 'Requires immediate attention', subColor: 'text-destructive', icon: AlertTriangle },
    { label: 'SCHEDULED', value: String(scheduledCount).padStart(2, '0'), sub: 'Upcoming appointments', subColor: 'text-primary', icon: Calendar },
  ];

  const statusStyle: Record<string, string> = {
    Completed: 'text-success bg-success/15',
    Overdue: 'text-destructive bg-destructive/15',
    Scheduled: 'text-primary bg-primary/15',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Farrier <span className="text-primary">Shoeing</span></h1>
          <p className="text-sm text-muted-foreground mt-1">Track shoeing schedules, records, and farrier assignments.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <ExportDialog filename="farrier-shoeing" trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors">Export</button>
          } />
          <FormDialog trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Record
            </button>
          } title="Add Shoeing Record">
            <AddShoeingForm />
          </FormDialog>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase flex items-center gap-2">
              <k.icon className="w-3.5 h-3.5 text-primary" /> {k.label}
            </p>
            <p className="text-4xl font-bold text-foreground mt-2 mono-data">{k.value}</p>
            <p className={`text-xs mt-1 ${k.subColor}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border">
          <h2 className="text-base sm:text-lg font-bold text-foreground">Shoeing Records</h2>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search horse or farrier..."
                className="h-8 pl-8 pr-3 w-48 rounded-lg bg-surface-container-high text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-3 h-3" /></button>}
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`p-2 rounded-lg transition-colors ${showFilters || hasActiveFilters ? 'bg-primary/15 text-primary' : 'bg-surface-container-high text-muted-foreground hover:text-foreground'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="px-3 sm:px-6 py-4 border-b border-border bg-surface-container-high/50">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="w-full sm:hidden mb-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                    placeholder="Search horse or farrier..."
                    className="h-9 pl-8 pr-3 w-full rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
              </div>
              <div className="w-40">
                <SelectField label="STATUS" options={['All', 'Scheduled', 'Completed', 'Overdue']} value={filterStatus || 'All'} size="sm" onChange={(v: string) => { setFilterStatus(v === 'All' ? '' : v); setCurrentPage(1); }} />
              </div>
              <div className="w-44">
                <SelectField label="FARRIER" options={['All', ...uniqueFarriers]} value={filterFarrier || 'All'} size="sm" onChange={(v: string) => { setFilterFarrier(v === 'All' ? '' : v); setCurrentPage(1); }} />
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="h-9 px-3 rounded-lg text-xs text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors flex items-center gap-1.5">
                  <X className="w-3 h-3" /> Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr className="border-b border-border">
              {['HORSE', 'SHOEING DATE', 'NEXT DUE', 'FARRIER', 'NOTES', 'STATUS'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(f => (
              <tr key={f.id} className="border-b border-border/50 hover:bg-surface-container-high/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-xs font-bold text-primary">{f.horseName.charAt(0)}</div>
                    <span className="font-semibold text-sm text-foreground">{f.horseName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 mono-data text-xs text-foreground">{f.shoeingDate}</td>
                <td className="px-6 py-4">
                  <span className={`mono-data text-xs ${f.status === 'Overdue' ? 'text-destructive font-bold' : 'text-foreground'}`}>{f.nextDueDate}</span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{f.farrierName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{f.notes || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusStyle[f.status] || ''}`}>
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-muted-foreground">No records match your filters.</td></tr>
            )}
          </tbody>
        </table>
        </div>
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground mono-data hidden sm:block">Displaying {paginated.length} of {filtered.length} records</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded text-xs font-medium ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
