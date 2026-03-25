'use client';
import { useState } from 'react';
import { groomWorksheets } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Search, Download, Plus, ClipboardList, Clock, CheckCircle2 } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';
import TimePicker from '@/components/shared/TimePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function NewWorksheetForm() {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="GROOM NAME" options={['Michael Groom', 'Rashid Groom', 'Fahad Groom']} defaultValue="Michael Groom" />
        <DatePicker label="DATE" defaultValue={new Date().toISOString().split('T')[0]} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="HORSE" options={['Thunder', 'Storm', 'Blaze', 'Midnight', 'Shadow', 'Spirit']} placeholder="Select Horse..." />
        <div>
          <label className={lbl}>STABLE NO.</label>
          <input type="text" placeholder="e.g. A-01" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TimePicker label="START TIME" />
        <TimePicker label="END TIME" />
      </div>
      <div>
        <label className={lbl}>TASK / ACTIVITY</label>
        <input type="text" placeholder="e.g. Grooming, feeding, stable cleaning..." className={inp} />
      </div>
      <div>
        <label className={lbl}>NOTES</label>
        <textarea placeholder="Optional remarks..." rows={2} className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none resize-none" />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Create Worksheet</button>
    </div>
  );
}

export default function GroomWorksheetPage() {
  const [search, setSearch] = useState('');
  const totalHours = groomWorksheets.reduce((s, w) => s + w.entries.reduce((a, e) => a + e.totalHours, 0), 0);
  const totalEntries = groomWorksheets.reduce((s, w) => s + w.entries.length, 0);

  const filtered = groomWorksheets.filter(w => !search || w.groomName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Groom Worksheet</h1>
          <p className="text-sm text-muted-foreground mt-1">Daily groom activity & stable care records</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 px-3 sm:px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <FormDialog trigger={
            <button className="h-9 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New Worksheet</span><span className="sm:hidden">New</span>
            </button>
          } title="New Worksheet">
            <NewWorksheetForm />
          </FormDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Active Grooms</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><ClipboardList className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(groomWorksheets.length).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-1">On Duty Today</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total Hours</span>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center"><Clock className="w-4 h-4 text-success" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalHours}<span className="text-lg text-muted-foreground ml-1">hrs</span></p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Horses Serviced</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(totalEntries).padStart(2, '0')}</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groom..." className="w-full h-9 pl-10 pr-4 rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {filtered.map(ws => (
        <div key={ws.id} className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{ws.groomName}</h3>
              <p className="text-xs text-muted-foreground font-mono">{ws.date}</p>
            </div>
            <span className="text-xs text-muted-foreground">{ws.overallRemarks}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-container-high">
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Horse</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Morning</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Afternoon</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Woodchips</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Bichali</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Boo Sa</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {ws.entries.map(e => (
                  <tr key={e.id} className="border-t border-border/50 hover:bg-surface-container-high/50 transition-colors">
                    <td className="px-3 py-2 font-medium text-foreground">{e.horseName}</td>
                    <td className="px-3 py-2 font-mono text-xs">{e.morningHours}h</td>
                    <td className="px-3 py-2 font-mono text-xs">{e.afternoonHours}h</td>
                    <td className="px-3 py-2 font-mono text-xs font-bold text-primary">{e.totalHours}h</td>
                    <td className="px-3 py-2">{e.woodchips ? <span className="text-success">✓</span> : <span className="text-muted-foreground">-</span>}</td>
                    <td className="px-3 py-2">{e.bichali ? <span className="text-success">✓</span> : <span className="text-muted-foreground">-</span>}</td>
                    <td className="px-3 py-2">{e.booSa ? <span className="text-success">✓</span> : <span className="text-muted-foreground">-</span>}</td>
                    <td className="px-3 py-2 text-muted-foreground">{e.remarks || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
