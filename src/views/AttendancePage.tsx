'use client';
import { useState } from 'react';
import { attendance } from '@/data/seed';
import StatusBadge from '@/components/shared/StatusBadge';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Search, Download, Plus, Users, UserCheck, UserX, Clock } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';
import TimePicker from '@/components/shared/TimePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function MarkAttendanceForm() {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <DatePicker label="DATE" defaultValue={new Date().toISOString().split('T')[0]} />
        <SelectField label="EMPLOYEE" options={['Michael Groom','Rashid Groom','Fahad Groom','Mike Farrier','Sam Vet','James Instructor','Alex Rider','Daniel Maintenance','Lisa Housekeeping','David Guard','John Guard','Tariq Guard','Peter Gardener','Carlos Chef','Maria Kitchen','Omar Driver','Ahmed Jamedar','Anand Jamedar']} placeholder="Select employee..." />
      </div>
      <SelectField label="STATUS" options={['Present', 'Absent', 'Late', 'Half Day']} defaultValue="Present" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TimePicker label="CHECK IN TIME" />
        <TimePicker label="CHECK OUT TIME" />
      </div>
      <div>
        <label className={lbl}>REMARKS</label>
        <textarea placeholder="Optional remarks..." rows={2} className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none resize-none" />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Mark Attendance</button>
    </div>
  );
}

export default function AttendancePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Present' | 'Absent' | 'Late' | 'Half Day'>('All');

  const filtered = attendance.filter(a => {
    if (filter !== 'All' && a.status !== filter) return false;
    if (search && !a.employeeName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const present = attendance.filter(a => a.status === 'Present').length;
  const absent = attendance.filter(a => a.status === 'Absent').length;
  const late = attendance.filter(a => a.status === 'Late').length;
  const rate = ((present / attendance.length) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Mark Team Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">Daily attendance tracking & compliance</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 px-3 sm:px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <FormDialog trigger={
            <button className="h-9 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Mark Attendance</span><span className="sm:hidden">Mark</span>
            </button>
          } title="Mark Attendance">
            <MarkAttendanceForm />
          </FormDialog>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total Staff</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Users className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(attendance.length).padStart(2, '0')}</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Attendance Rate</span>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center"><UserCheck className="w-4 h-4 text-success" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{rate}<span className="text-lg text-muted-foreground ml-1">%</span></p>
          <div className="mt-2 h-1.5 rounded-full bg-surface-container-high overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${rate}%` }} /></div>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Absent Today</span>
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center"><UserX className="w-4 h-4 text-destructive" /></div>
          </div>
          <p className="text-3xl font-bold text-destructive">{String(absent).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-destructive mt-1">⚠ Requires Coverage</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Late Arrivals</span>
            <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center"><Clock className="w-4 h-4 text-warning" /></div>
          </div>
          <p className="text-3xl font-bold text-warning">{String(late).padStart(2, '0')}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee..." className="w-full h-9 pl-10 pr-4 rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex flex-wrap gap-1 bg-surface-container-high rounded-lg p-1 w-fit">
          {(['All', 'Present', 'Absent', 'Late', 'Half Day'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="bg-surface-container-high">
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Employee</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Marked At</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-t border-border/50 hover:bg-surface-container-high/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.date}</td>
                <td className="px-4 py-3 font-medium text-foreground">{a.employeeName}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{a.markedAt}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
