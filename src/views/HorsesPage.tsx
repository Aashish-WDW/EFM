'use client';
import { useState, useMemo, useRef } from 'react';
import { Search, Download, Plus, SlidersHorizontal, ChevronLeft, ChevronRight, Zap, BarChart3, ShieldCheck, ClipboardList, MoreVertical, Upload, X, Pencil, Trash2 } from 'lucide-react';
import ExportDialog from '@/components/shared/ExportDialog';
import { horses } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import DatePicker from '@/components/shared/DatePicker';
import HorseIcon from '@/components/shared/HorseIcon';
import RandomLetterReveal from '@/components/shared/RandomLetterReveal';

const statusStyles: Record<string, { dot: string; bg: string; text: string }> = {
  Active: { dot: 'bg-success', bg: 'bg-success/10', text: 'text-success' },
  Resting: { dot: 'bg-primary', bg: 'bg-primary/10', text: 'text-primary' },
  Medical: { dot: 'bg-destructive', bg: 'bg-destructive/10', text: 'text-destructive' },
  Retired: { dot: 'bg-muted-foreground', bg: 'bg-muted', text: 'text-muted-foreground' },
};

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function PerformanceBar({ value }: { value: number }) {
  const bars = 5;
  const filled = Math.round((value / 100) * bars);
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-semibold text-foreground">{value}%</span>
      <div className="flex gap-0.5">
        {Array.from({ length: bars }, (_, i) => (
          <div key={i} className={`w-4 h-1.5 rounded-sm ${i < filled ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>
    </div>
  );
}

function PhotoUpload({ label }: { label: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="flex items-center gap-4">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-16 h-16 rounded-lg border-2 border-dashed border-border bg-surface-container-high flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0 overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <Upload className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="text-sm text-foreground font-medium">Horse Photo</p>
          <p className="text-xs text-muted-foreground">JPG, PNG or WEBP · max 5 MB</p>
          <button type="button" onClick={() => fileRef.current?.click()} className="mt-1 text-xs text-primary font-medium hover:underline">
            {preview ? 'Change photo' : 'Upload photo'}
          </button>
          {preview && (
            <button type="button" onClick={() => setPreview(null)} className="ml-2 text-xs text-destructive hover:underline">Remove</button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}

function AddHorseForm() {
  return (
    <div className="space-y-4 mt-2">
      <PhotoUpload label="HORSE PHOTO" />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>HORSE NAME</label>
          <input type="text" placeholder="e.g. Thunderbolt" className={inp} />
        </div>
        <div>
          <label className={lbl}>PASSPORT NO</label>
          <input type="text" placeholder="EQ-XXXX-XXXX" className={`${inp} mono-data`} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>BREED</label>
          <input type="text" placeholder="e.g. Thoroughbred" className={inp} />
        </div>
        <div>
          <label className={lbl}>COLOR</label>
          <input type="text" placeholder="e.g. Bay" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <SelectField label="GENDER" options={['Stallion', 'Mare']} defaultValue="Stallion" />
        <div>
          <label className={lbl}>HEIGHT (hh)</label>
          <input type="text" placeholder="16.0" className={`${inp} mono-data`} />
        </div>
        <div>
          <label className={lbl}>STABLE #</label>
          <input type="text" placeholder="ST-XX" className={`${inp} mono-data`} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <DatePicker label="DATE OF BIRTH" />
        <SelectField label="STATUS" options={['Active', 'Resting', 'Medical', 'Retired']} defaultValue="Active" />
      </div>
      <SelectField label="ASSIGNED MANAGER" options={['Emma Manager', 'Dr. Director']} defaultValue="Emma Manager" />
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">
        REGISTER HORSE
      </button>
    </div>
  );
}

function EditHorseForm({ horse }: { horse: typeof horses[0] }) {
  return (
    <div className="space-y-4 mt-2">
      <PhotoUpload label="HORSE PHOTO" />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>HORSE NAME</label>
          <input type="text" defaultValue={horse.name} className={inp} />
        </div>
        <div>
          <label className={lbl}>PASSPORT NO</label>
          <input type="text" defaultValue={horse.passportNo} className={`${inp} mono-data`} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>BREED</label>
          <input type="text" defaultValue={horse.breed} className={inp} />
        </div>
        <div>
          <label className={lbl}>COLOR</label>
          <input type="text" placeholder="e.g. Bay" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <SelectField label="GENDER" options={['Stallion', 'Mare']} defaultValue="Stallion" />
        <div>
          <label className={lbl}>HEIGHT (hh)</label>
          <input type="text" placeholder="16.0" className={`${inp} mono-data`} />
        </div>
        <div>
          <label className={lbl}>STABLE #</label>
          <input type="text" placeholder="ST-XX" className={`${inp} mono-data`} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <DatePicker label="DATE OF BIRTH" />
        <SelectField label="STATUS" options={['Active', 'Resting', 'Medical', 'Retired']} defaultValue={horse.status} />
      </div>
      <SelectField label="ASSIGNED MANAGER" options={['Emma Manager', 'Dr. Director']} defaultValue={horse.assignedManager} />
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">
        SAVE CHANGES
      </button>
    </div>
  );
}

function HorseFilterPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="border-t border-border bg-surface-container-low px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Filter Options</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SelectField label="STATUS" options={['All', 'Active', 'Resting', 'Medical', 'Retired']} defaultValue="All" />
        <SelectField label="GENDER" options={['All', 'Stallion', 'Mare']} defaultValue="All" />
        <SelectField label="MANAGER" options={['All', 'Emma Manager', 'Dr. Director']} defaultValue="All" />
        <div className="flex items-end">
          <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-xs font-semibold tracking-wider uppercase">Apply</button>
        </div>
      </div>
    </div>
  );
}

function HorseRowActions({ horse }: { horse: typeof horses[0] }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-7 z-20 w-36 rounded-lg border border-border bg-surface-container-highest shadow-lg py-1 text-sm">
            <button
              onClick={() => { setOpen(false); setEditOpen(true); }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-foreground"
            >
              <Pencil className="w-3.5 h-3.5 text-primary" /> Edit
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-destructive">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </>
      )}
      <FormDialog open={editOpen} onOpenChange={setEditOpen} trigger={<span />} title={`Edit — ${horse.name}`}>
        <EditHorseForm horse={horse} />
      </FormDialog>
    </div>
  );
}

export default function HorsesPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const pageSize = 4;
  const getPerf = (id: string) => { const n = parseInt(id.replace(/\D/g, ''), 10); return 40 + (n * 17 + 13) % 61; };
  const filtered = useMemo(() => horses.filter(h => h.name.toLowerCase().includes(search.toLowerCase())), [search]);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-0.5 bg-primary rounded" /><div className="w-3 h-0.5 bg-primary rounded" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Fleet Management</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
              <RandomLetterReveal text="Horse Directory" />
            </h1>
            <p className="text-muted-foreground mt-2 italic text-sm hidden sm:block">"Stability is the foundation of excellence in equine care and operational data integrity."</p>
          </div>
          <div className="flex items-center gap-3">
            <ExportDialog filename="horses" trigger={
              <button className="inline-flex items-center gap-2 h-10 px-4 sm:px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
                <Download className="w-4 h-4" /><span className="hidden sm:inline">Export</span>
              </button>
            } />
            <FormDialog
              trigger={
                <button className="inline-flex items-center gap-2 h-10 px-4 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all">
                  <Plus className="w-4 h-4" /> Add New Horse
                </button>
              }
              title="Register New Horse"
            >
              <AddHorseForm />
            </FormDialog>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {[
          { label: 'TOTAL FLEET', value: horses.length, sub: '↗ +4 this month', subColor: 'text-primary' },
          { label: 'IN TRAINING', value: 42, bar: true },
          { label: 'AVAILABLE', value: 76, sub: 'Ready for deployment', subColor: 'text-muted-foreground' },
          { label: 'IN RECOVERY', value: 10, sub: '⊘ Requires attention', subColor: 'text-destructive' },
        ].map(card => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-4 sm:p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <HorseIcon className="w-24 h-24" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 relative z-10">{card.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground relative z-10">{card.value}</p>
            {card.sub && <p className={`text-[10px] font-medium uppercase tracking-wider mt-1 relative z-10 ${card.subColor}`}>{card.sub}</p>}
            {card.bar && <div className="mt-2 h-1 w-2/3 bg-primary rounded-full relative z-10" />}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground shrink-0">Active Directory</h2>
          </div>
          <div className="flex-1 flex items-center gap-2 px-4 h-11 rounded-lg border border-border bg-background">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search horses by name..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0); }}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none h-full"
            />
            {search && (
              <button onClick={() => { setSearch(''); setPage(0); }} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`h-11 w-11 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${showFilters ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && <HorseFilterPanel onClose={() => setShowFilters(false)} />}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-t border-border">
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Horse Details</th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Breed</th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Manager</th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Performance</th>
                <th className="px-4 sm:px-6 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {paged.map(horse => {
                const st = statusStyles[horse.status] || statusStyles.Active;
                const initials = horse.assignedManager.split(' ').map(n => n[0]).join('').slice(0, 2);
                return (
                  <tr key={horse.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">{horse.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{horse.name}</p>
                          <p className="text-xs text-muted-foreground">ID: #{horse.passportNo.split('-').pop()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-foreground">{horse.breed}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />{horse.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold text-muted-foreground">{initials}</span>
                        </div>
                        <span className="text-foreground">{horse.assignedManager}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell"><PerformanceBar value={getPerf(horse.id)} /></td>
                    <td className="px-4 sm:px-6 py-4">
                      <HorseRowActions horse={horse} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${i === page ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-xl bg-gradient-to-br from-primary/90 to-primary-dim p-6 sm:p-8 text-primary-foreground">
          <div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Predictive Maintenance</span></div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Inventory Optimization Alert</h3>
          <p className="text-sm opacity-80 max-w-md">Based on historical trends, 12 additional stalls will be required by next quarter.</p>
          <button className="mt-6 w-fit px-5 py-2 rounded-lg border border-primary-foreground/30 text-sm font-medium hover:bg-primary-foreground/10 transition-colors">View Projections</button>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          {[
            { icon: BarChart3, label: 'FLEET HEALTH', value: '94.2% Stable' },
            { icon: ShieldCheck, label: 'COMPLIANCE', value: '100% Verified' },
            { icon: ClipboardList, label: 'MANAGER LOAD', value: '8.4 h/m avg' },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0"><stat.icon className="w-5 h-5 text-muted-foreground" /></div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
