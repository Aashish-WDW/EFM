'use client';
import { useState, useMemo } from 'react';
import { medicineLogs } from '@/data/seed';
import { Pill, AlertTriangle, CheckCircle, Activity, SlidersHorizontal, Search, X } from 'lucide-react';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import DatePicker from '@/components/shared/DatePicker';
import ExportDialog from '@/components/shared/ExportDialog';

function AddMedicineLogForm() {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-2 gap-3">
        <DatePicker label="DATE" />
        <SelectField label="HORSE" options={['Shadow','Maximus','Leon','Cadillac','Alta Strada']} defaultValue="Shadow" />
      </div>
      <div><label className="label-sm text-muted-foreground block mb-1.5">MEDICINE NAME</label><input type="text" placeholder="e.g. Anti-Inflammatory Paste" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label-sm text-muted-foreground block mb-1.5">DOSAGE</label><input type="text" placeholder="e.g. 1 tube" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" /></div>
        <SelectField label="ADMINISTERED BY" options={['Sam Vet','Michael Groom','Mike Farrier']} defaultValue="Sam Vet" />
      </div>
      <div><label className="label-sm text-muted-foreground block mb-1.5">NOTES</label><textarea placeholder="Additional notes..." rows={3} className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none resize-none" /></div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">LOG ADMINISTRATION</button>
    </div>
  );
}

const uniqueHorses = [...new Set(medicineLogs.map(m => m.horseName))];
const uniqueAdmins = [...new Set(medicineLogs.map(m => m.administeredBy))];

export default function MedicineLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterHorse, setFilterHorse] = useState('');
  const [filterAdmin, setFilterAdmin] = useState('');
  const perPage = 5;

  const filtered = useMemo(() => medicineLogs.filter(m => {
    if (search && !m.horseName.toLowerCase().includes(search.toLowerCase()) && !m.medicineName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterHorse && m.horseName !== filterHorse) return false;
    if (filterAdmin && m.administeredBy !== filterAdmin) return false;
    return true;
  }), [search, filterHorse, filterAdmin]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const hasActiveFilters = filterHorse || filterAdmin;
  const clearFilters = () => { setFilterHorse(''); setFilterAdmin(''); };

  const kpis = [
    { label: 'TOTAL ADMINISTRATIONS', value: medicineLogs.length, sub: '↗ 3 today', subColor: 'text-success', icon: Pill },
    { label: 'UNIQUE MEDICINES', value: new Set(medicineLogs.map(m => m.medicineName)).size, sub: 'Active formulary', subColor: 'text-muted-foreground', icon: Activity },
    { label: 'HORSES TREATED', value: new Set(medicineLogs.map(m => m.horseName)).size, sub: 'This week', subColor: 'text-muted-foreground', icon: CheckCircle },
    { label: 'PENDING FOLLOW-UPS', value: '02', sub: '⚠ Requires attention', subColor: 'text-warning', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Medicine <span className="text-primary">Logs</span></h1>
          <p className="text-sm text-muted-foreground mt-1">Track medicine administration records and treatment history.</p>
        </div>
        <div className="flex gap-2">
          <ExportDialog filename="medicine-logs" trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors">Export</button>
          } />
          <FormDialog trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all">+ Add Log</button>
          } title="Add Medicine Log">
            <AddMedicineLogForm />
          </FormDialog>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-surface-container-highest rounded-xl p-4 sm:p-5 edge-glow relative overflow-hidden">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase flex items-center gap-2">
              <k.icon className="w-3.5 h-3.5 text-primary" /> {k.label}
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mono-data">{k.value}</p>
            <p className={`text-xs mt-1 ${k.subColor}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-foreground">Administration Log</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary uppercase tracking-wider hidden sm:inline-block">LiveSync</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search horse or medicine..."
                className="h-8 pl-8 pr-3 w-52 rounded-lg bg-surface-container-high text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
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
          <div className="px-4 sm:px-6 py-4 border-b border-border bg-surface-container-high/50">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="w-full sm:hidden mb-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                    placeholder="Search horse or medicine..."
                    className="h-9 pl-8 pr-3 w-full rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
              </div>
              <div className="w-44">
                <SelectField label="HORSE" options={['All', ...uniqueHorses]} value={filterHorse || 'All'} size="sm" onChange={(v: string) => { setFilterHorse(v === 'All' ? '' : v); setCurrentPage(1); }} />
              </div>
              <div className="w-44">
                <SelectField label="ADMINISTERED BY" options={['All', ...uniqueAdmins]} value={filterAdmin || 'All'} size="sm" onChange={(v: string) => { setFilterAdmin(v === 'All' ? '' : v); setCurrentPage(1); }} />
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
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                {['DATE', 'HORSE', 'MEDICINE', 'DOSAGE', 'NOTES', 'BY'].map(h => (
                  <th key={h} className="px-4 sm:px-6 py-3 text-left text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(m => (
                <tr key={m.id} className="border-b border-border/50 hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-4 sm:px-6 py-4 mono-data text-xs text-foreground">{m.date}</td>
                  <td className="px-4 sm:px-6 py-4 font-semibold text-sm text-foreground">{m.horseName}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-foreground">{m.medicineName}</td>
                  <td className="px-4 sm:px-6 py-4 mono-data text-sm text-foreground">{m.dosage}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{m.notes || '—'}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-foreground">{m.administeredBy}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-muted-foreground">No records match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground mono-data">Displaying {paginated.length} of {filtered.length}</span>
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
