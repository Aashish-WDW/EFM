'use client';
import { useState } from 'react';
import { workRecords } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Search, Download, Plus, Wrench, Clock, ListChecks } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';
import TimePicker from '@/components/shared/TimePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function NewWorkRecordForm() {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="STAFF MEMBER" options={['Michael Groom', 'Rashid Groom', 'Fahad Groom', 'Mike Farrier', 'Sam Vet', 'Daniel Maintenance', 'Peter Gardener', 'Omar Driver']} placeholder="Select staff..." />
        <DatePicker label="DATE" defaultValue={new Date().toISOString().split('T')[0]} />
      </div>
      <div>
        <label className={lbl}>TASK DESCRIPTION</label>
        <input type="text" placeholder="e.g. Stable cleaning, Equipment repair..." className={inp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TimePicker label="START TIME" />
        <TimePicker label="END TIME" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>LOCATION / ZONE</label>
          <input type="text" placeholder="e.g. Stable Wing A" className={inp} />
        </div>
        <SelectField label="STATUS" options={['Completed', 'In Progress', 'Pending']} defaultValue="Completed" />
      </div>
      <div>
        <label className={lbl}>REMARKS</label>
        <textarea placeholder="Optional remarks..." rows={2} className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none resize-none" />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Create Record</button>
    </div>
  );
}

export default function WorkRecordPage() {
  const [search, setSearch] = useState('');
  const totalHours = workRecords.reduce((s, w) => s + w.entries.reduce((a, e) => a + e.totalHours, 0), 0);
  const totalTasks = workRecords.reduce((s, w) => s + w.entries.length, 0);
  const filtered = workRecords.filter(w => !search || w.staffName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Work Record</h1>
          <p className="text-sm text-muted-foreground mt-1">Staff work activity logs</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 px-3 sm:px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <FormDialog trigger={
            <button className="h-9 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Record
            </button>
          } title="New Work Record">
            <NewWorkRecordForm />
          </FormDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Staff on Record</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Wrench className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(workRecords.length).padStart(2, '0')}</p>
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Tasks Completed</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><ListChecks className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(totalTasks).padStart(2, '0')}</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff..." className="w-full h-9 pl-10 pr-4 rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {filtered.map(wr => (
        <div key={wr.id} className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{wr.staffName}</h3>
              <p className="text-xs text-muted-foreground">{wr.staffCategory} · <span className="font-mono">{wr.date}</span></p>
            </div>
            <span className="text-xs font-mono font-bold text-primary shrink-0">{wr.entries.reduce((s, e) => s + e.totalHours, 0)}h total</span>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[450px]">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Task</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Morning</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Afternoon</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {wr.entries.map(e => (
                <tr key={e.id} className="border-t border-border/50 hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-3 py-2 font-medium text-foreground">{e.taskDescription}</td>
                  <td className="px-3 py-2 font-mono text-xs">{e.morningHours}h</td>
                  <td className="px-3 py-2 font-mono text-xs">{e.afternoonHours}h</td>
                  <td className="px-3 py-2 font-mono text-xs font-bold text-primary">{e.totalHours}h</td>
                  <td className="px-3 py-2 text-muted-foreground">{e.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {wr.overallRemarks && <p className="mt-3 text-xs text-muted-foreground border-t border-border/50 pt-3">Overall: {wr.overallRemarks}</p>}
        </div>
      ))}
    </div>
  );
}
