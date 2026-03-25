'use client';
import { useState } from 'react';
import { inspectionRounds } from '@/data/seed';
import StatusBadge from '@/components/shared/StatusBadge';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Search, Download, Plus, ClipboardCheck, AlertTriangle, CheckCircle2, Eye } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';
import TimePicker from '@/components/shared/TimePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function NewRoundForm() {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>INSPECTOR</label>
          <input type="text" placeholder="e.g. David Guard" className={inp} />
        </div>
        <SelectField label="ZONE / AREA" options={['Stable Wing A', 'Stable Wing B', 'Feed Storage', 'Tack Room', 'Medical Bay', 'Perimeter']} defaultValue="Stable Wing A" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <DatePicker label="DATE" defaultValue={new Date().toISOString().split('T')[0]} />
        <TimePicker label="TIME" />
      </div>
      <SelectField label="OVERALL STATUS" options={['Passed', 'Issues Found', 'Pending']} defaultValue="Passed" />
      <div>
        <label className={lbl}>FINDINGS / NOTES</label>
        <textarea placeholder="Describe any issues or observations..." rows={3} className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none resize-none" />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Start Round</button>
    </div>
  );
}

export default function InspectionRoundsPage() {
  const [filter, setFilter] = useState<'All' | 'Passed' | 'Issues Found' | 'Pending'>('All');
  const filtered = inspectionRounds.filter(ir => filter === 'All' || ir.status === filter);

  const passed = inspectionRounds.filter(ir => ir.status === 'Passed').length;
  const issues = inspectionRounds.filter(ir => ir.status === 'Issues Found').length;
  const totalItems = inspectionRounds.reduce((s, ir) => s + ir.items.length, 0);
  const okItems = inspectionRounds.reduce((s, ir) => s + ir.items.filter(i => i.status === 'OK').length, 0);
  const efficiency = ((okItems / totalItems) * 100).toFixed(1);

  const [selectedId, setSelectedId] = useState<string | null>(inspectionRounds[0]?.id || null);
  const selected = inspectionRounds.find(ir => ir.id === selectedId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Operational Rounds</h1>
          <p className="text-sm text-muted-foreground mt-1">Facility maintenance tracking & hygiene compliance</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 px-3 sm:px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <FormDialog trigger={
            <button className="h-9 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Round
            </button>
          } title="New Inspection Round">
            <NewRoundForm />
          </FormDialog>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total Efficiency</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><ClipboardCheck className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{efficiency}<span className="text-lg text-muted-foreground ml-1">%</span></p>
          <div className="mt-2 h-1.5 rounded-full bg-surface-container-high overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${efficiency}%` }} /></div>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Rounds Passed</span>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-success" /></div>
          </div>
          <p className="text-3xl font-bold text-success">{String(passed).padStart(2, '0')}</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Issues Found</span>
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-destructive" /></div>
          </div>
          <p className="text-3xl font-bold text-destructive">{String(issues).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-destructive mt-1">⚠ Requires Immediate Action</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Active Inspectors</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Eye className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(new Set(inspectionRounds.map(ir => ir.inspectorName)).size).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-1">On Duty</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-surface-container-high rounded-lg p-1 w-fit">
        {(['All', 'Passed', 'Issues Found', 'Pending'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{f}</button>
        ))}
      </div>

      {/* Split layout: Schedule stream + Detail panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Schedule Stream */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-primary" /> Schedule Stream</h2>
          {filtered.map(ir => (
            <button key={ir.id} onClick={() => setSelectedId(ir.id)} className={`w-full text-left rounded-xl p-4 border transition-all ${selectedId === ir.id ? 'border-primary bg-primary/5' : 'border-border/50 bg-surface-container-highest hover:border-primary/30'}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-foreground">{ir.area}</h3>
                <StatusBadge status={ir.status} />
              </div>
              <p className="text-xs text-muted-foreground">Inspector: {ir.inspectorName} · <span className="font-mono">{ir.date}</span></p>
              <p className="text-xs text-muted-foreground mt-1">{ir.items.length} items checked</p>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-surface-container-highest rounded-xl p-6 edge-glow">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Inspection Protocol: {selected.area}</h2>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">Report ID: #RND-{selected.date.replace(/-/g, '')}-{selected.id.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold text-primary">{Math.round((selected.items.filter(i => i.status === 'OK').length / selected.items.length) * 100)}%</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center"><ClipboardCheck className="w-3.5 h-3.5 text-primary" /></span>
                  Checklist Items
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selected.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-high/50">
                      {item.status === 'OK'
                        ? <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                        : <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                      }
                      <div>
                        <p className="text-sm text-foreground">{item.item}</p>
                        {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selected.notes && (
                <div className="mt-5 p-3 rounded-lg bg-surface-container-high/50 border border-border/50">
                  <p className="text-xs text-muted-foreground">Notes: {selected.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border/50">
                <button className="h-9 px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors">Save Draft</button>
                <button className="h-9 px-5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium">Finalize Round</button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-highest rounded-xl p-12 edge-glow text-center text-muted-foreground">
              Select an inspection round to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
