'use client';
import { useState } from 'react';
import { gateRegister } from '@/data/seed';
import StatusBadge from '@/components/shared/StatusBadge';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Search, Download, Plus, DoorOpen, DoorClosed, Car, Clock, Shield, Users } from 'lucide-react';
import TimePicker from '@/components/shared/TimePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function LogEntryForm() {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="OPERATION TYPE" options={['Entry', 'Exit']} defaultValue="Entry" />
        <SelectField label="PERSON TYPE" options={['Staff', 'Visitor', 'Contractor', 'Delivery']} defaultValue="Staff" />
      </div>
      <div>
        <label className={lbl}>FULL NAME</label>
        <input type="text" placeholder="e.g. Ahmed Al Rashid" className={inp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TimePicker label="ENTRY TIME" />
        <TimePicker label="EXIT TIME" placeholder="Leave blank if entering" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>VEHICLE NO.</label>
          <input type="text" placeholder="e.g. DXB-A-12345" className={inp} />
        </div>
        <div>
          <label className={lbl}>ID / BADGE</label>
          <input type="text" placeholder="e.g. EMP-001" className={inp} />
        </div>
      </div>
      <div>
        <label className={lbl}>PURPOSE OF VISIT</label>
        <input type="text" placeholder="e.g. Routine stable inspection" className={inp} />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Log Entry</button>
    </div>
  );
}

export default function GateRegisterPage() {
  const [filter, setFilter] = useState<'All' | 'Entry' | 'Exit'>('All');
  const [search, setSearch] = useState('');

  const filtered = gateRegister.filter(g => {
    if (filter !== 'All' && g.operationType !== filter) return false;
    if (search && !g.personName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const onSite = gateRegister.filter(g => !g.exitTime).length;
  const totalEntries = gateRegister.filter(g => g.operationType === 'Entry').length;
  const visitors = gateRegister.filter(g => g.personType === 'Visitor').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Gate Register</h1>
          <p className="text-sm text-muted-foreground mt-1">Entry & exit control log</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 px-3 sm:px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <FormDialog trigger={
            <button className="h-9 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Log Entry
            </button>
          } title="Log Entry">
            <LogEntryForm />
          </FormDialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total Entries</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><DoorOpen className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground tracking-tight">{String(totalEntries).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-1">Today</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Currently On Site</span>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center"><Users className="w-4 h-4 text-success" /></div>
          </div>
          <p className="text-3xl font-bold text-success tracking-tight">{String(onSite).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-success mt-1">Active Personnel</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Visitors</span>
            <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center"><Shield className="w-4 h-4 text-warning" /></div>
          </div>
          <p className="text-3xl font-bold text-warning tracking-tight">{String(visitors).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-1">Registered Today</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Vehicles Logged</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Car className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground tracking-tight">{String(gateRegister.length).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-1">Total Records</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name..." className="w-full h-9 pl-10 pr-4 rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex gap-1 bg-surface-container-high rounded-lg p-1 w-fit">
          {(['All', 'Entry', 'Exit'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="bg-surface-container-high">
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Person</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Entry</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Exit</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Vehicle</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(g => (
              <tr key={g.id} className="border-t border-border/50 hover:bg-surface-container-high/50 transition-colors">
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${g.operationType === 'Entry' ? 'text-success' : 'text-destructive'}`}>
                    {g.operationType === 'Entry' ? <DoorOpen className="w-3.5 h-3.5" /> : <DoorClosed className="w-3.5 h-3.5" />}
                    {g.operationType}
                  </span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={g.personType} /></td>
                <td className="px-4 py-3 font-medium text-foreground">{g.personName}</td>
                <td className="px-4 py-3"><span className="font-mono text-xs text-muted-foreground">{new Date(g.entryTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span></td>
                <td className="px-4 py-3">
                  {g.exitTime
                    ? <span className="font-mono text-xs text-muted-foreground">{new Date(g.exitTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    : <span className="inline-flex items-center gap-1 text-xs text-success font-medium"><Clock className="w-3 h-3" /> On site</span>
                  }
                </td>
                <td className="px-4 py-3"><span className="font-mono text-xs text-foreground">{g.vehicleNo}</span></td>
                <td className="px-4 py-3 text-muted-foreground">{g.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
